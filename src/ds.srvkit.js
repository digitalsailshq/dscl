// dependencies...
if (typeof ds == 'undefined') throw 'ds.srvkit: ds module required.';
// namespace...
ds.srvkit = {};
// libs...
var fsLib = require('fs');
var urlLib = require('url');
var pathLib = require('path');
var zlibLib = require('zlib');
var streamLib = require('stream');
// classes...
ds.srvkit.Daemon = ds.Object.extend({
	_signalHandler(signal) {
		const self = this;
		self._uninstallHandlers();
		self._triggerAsync('stop')
			.catch(() => {})
			.then(() => process.kill(process.pid, signal));
	},
	_installHandlers() {
		const self = this;
		ds.srvkit.Daemon.__active_daemon = true;
		process.on('SIGINT', self._sigintHandler = self._signalHandler.bind(self, 'SIGINT'));
		//process.on('SIGHUP', self._sighupHandler = self._signalHandler.bind(self, 'SIGHUP'));
		process.on('SIGQUIT', self._sigquitHandler = self._signalHandler.bind(self, 'SIGQUIT'));
		process.on('SIGTERM', self._sigtermHandler = self._signalHandler.bind(self, 'SIGTERM'));
	},
	_uninstallHandlers() {
		const self = this;
		process.removeListener('SIGINT', self._sigintHandler);
        //process.removeListener('SIGHUP', self._sighupHandler);
        process.removeListener('SIGQUIT', self._sigquitHandler);
        process.removeListener('SIGTERM', self._sigtermHandler);
        ds.srvkit.Daemon.__active_daemon = false;
	},
	start() {
		const self = this;
		if (ds.srvkit.Daemon.__active_daemon) throw new Error('ds.srvkit.Daemon: One daemon already activated.');
		self._installHandlers();
		self._triggerAsync('start').then(() => process.stdin.resume());
	},
	stop() {
		const self = this;
		self._triggerAsync('stop')
			.catch(() => {})
			.then(() => process.exit());
	}
}, ds.Events('start', 'stop'));
ds.srvkit.RequestHandler = ds.Object.extend({
	request(req, res, next) { },
	getFn() { const self = this; return (req, res, next) => self.request(req, res, next); }
});
ds.srvkit.FavIconHandler = ds.srvkit.RequestHandler.extend({
	server: null,
	faviconPath: null,
	request(req, res, next) {
		const self = this;
		if (!self.server) throw 'ds.srvkit.FavIconHandler: Server not specified.';
		if (req.urlJSON[0] == 'favicon.ico' && self.faviconPath) {
			res.endFile(pathLib.join(self.server._rootPath, self._faviconPath));
			return;
		}
		next();
	}
});
ds.srvkit.AliasHandler = ds.srvkit.RequestHandler.extend({
	server: null,
	_aliases: null,
	add(alias, path, options) {
		const self = this;
		self._aliases.push({ alias: alias, path: path, options: options });
	},
	request(req, res, next) {
		const self = this;
		if (!self.server) throw new Error('ds.srvkit.AliasHandler: Server not specified.');
		for (let alias of self._aliases) {
			if (alias.alias == req.urlJSON.path) {
				if (ds.isArray(alias.path)) {
					const opts = Object.assign({ contentType: null, separator: null }, alias.options);
					if (opts.contentType === null || opts.contentType === undefined) throw new Error('ds.srvkit.AliasHandler: "options.contentType" is required when sending concatenated files.');
					const arr = [];
					alias.path.forEach((p, i) => {
						arr.push(fsLib.readFileSync(p));
						if ((i != (alias.path.length - 1)) && opts.separator) arr.push(Buffer.from(opts.separator));
					})
					res.endBuffer(Buffer.concat(arr), opts);
				} else res.endFile(alias.path);
				return;
			}
		}
		next();
	},
	init() {
		const self = this;
		self._aliases = [];
	}
});
ds.srvkit.StaticHandler = ds.srvkit.RequestHandler.extend({
	server: null,
	getPathMatches(req) {
		const self = this;
		let matches = [];
		for (let static_ of self._statics) {
			var match = false;
			var i = 0;
			if (static_.path_parts.length > 0) {
				for (let part of static_.path_parts) {
					match = part == req.urlJSON[i];
					i++;
					if (!match) break;
				}
			} else match = true;
			if (match) {
				matches.push({
					filePath: pathLib.join(static_.local_path, req.url.split('?')[0].split('/').filter(i => i != '').slice(static_.path_parts.length).join('/')),
					pathParts: JSON.parse(JSON.stringify(static_.path_parts))
				});
			}
		}
		return matches;
	},
	add(path, local_path) {
		const self = this;
		self._statics.push({
			path: path,
			path_parts: urlLib.parse(path).pathname.split('/').filter(i => i != ''),
			local_path: local_path,
			local_path_parts: local_path.split('/').filter(i => i != '')
		});
	},
	request(req, res, next) {
		const self = this;
		if (!self.server) throw 'ds.srvkit.StaticHandler: Server not specified.';
		let matches = self.getPathMatches(req);
		if (matches.length == 0) { next(); return; }
		matches.sort((a, b) => b.pathParts.length - a.pathParts.length);
		res.endFile(matches[0].filePath);
	},
	init() {
		const self = this;
		self._statics = [];
	}
});
ds.srvkit.OptionsHandler = ds.srvkit.RequestHandler.extend({
	allowCredentials: false,
	allowOrigins: null,
	allowMethods: null,
	allowHeaders: null,
	maxAge: 600,
	request(req, res, next) {
		const self = this;
		res.setHeader('Access-Control-Max-Age', self.maxAge);
		if (self.allowOrigins
			&& req.headers['origin']
			&& self.allowOrigins.includes(req.headers['origin'])) res.setHeader('Access-Control-Allow-Origin', req.headers['origin']);
		if (self.allowMethods) res.setHeader('Access-Control-Allow-Methods', self.allowMethods);
		if (self.allowHeaders) res.setHeader('Access-Control-Allow-Headers', self.allowHeaders);
		if (self.allowCredentials) res.setHeader('Access-Control-Allow-Credentials', 'true');
		if (req.method.toLowerCase() == 'options') {
			res.statusCode = 200;
			res.end();
			return;
		}
		next();
	}
});
ds.srvkit.SessionHandler = ds.srvkit.RequestHandler.extend({
	sessions: null,
	idletime: 600000, // ms...
	createSession() {
		const self = this;
		var dateTime = new Date();
		var session = {
			id: ds.nextId(),
			dateTime: dateTime
		};
		self.sessions.push(session);
		return session;
	},
	sessionIsExpired(session) {
		const self = this;
		if (!session) return false;
		var dateTime = new Date();
		var diff = dateTime - session.dateTime;
		return diff >= self.idletime;
	},
	expired(session) {
		const self = this;
		if (!session) return;
		self._trigger('expired', session);
	},
	touch(session) {
		const self = this;
		session.dateTime = new Date();
	},
	request(req, res, next) {
		const self = this;
		if (!req.cookieJSON.sid) {
			req.session = self.createSession();
			res.setCookiePair('sid', req.session.id);
		} else req.session = self.sessions.find(session => session.id == req.cookieJSON.sid);
		if (!req.session || self.sessionIsExpired(req.session)) {
			if (req.session) self.expired(req.session);
			req.session = self.createSession();
			res.setCookiePair('sid', req.session.id);
		}
		self.touch(req.session);
		next();
	},
	init() {
		const self = this;
		self.sessions = [];
	}
}, ds.Events('expired'));
ds.srvkit.SSEConnection = ds.Object.extend({
	_interval: null,
	session: null,
	req: null,
	res: null,
	send(data) {
		const self = this;
		self.res.write('data: ' + JSON.stringify(data) + '\n\n');
	},
	init() {
		const self = this;
		if (!self.req) throw new Error('ds.srvkit.SSEConnection: req is required.');
		if (!self.res) throw new Error('ds.srvkit.SSEConnection: res is required.');
		self.req.session.sse_connection = self;
		self.res.on('close', () => self.free());
		self.res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
		self._interval = setInterval(() => self.send({ type: 'noop' }), 5000);
	},
	free() {
		const self = this;
		clearInterval(self._interval);
		if (!self.res.finished) self.res.end();
		self.req.session.sse_connection = null;
		ds.Object.free.call(self);
	}
});
ds.srvkit.SSEHandler = ds.srvkit.RequestHandler.extend({
	url: null,
	request(req, res, next) {
		const self = this;
		if (req.urlJSON.join('/') != self.url) next();
		else {
			if (!req.session) throw new Error('ds.srvkit.SSEHandler: Server side events handler must go after session handler.');
			if (req.session.sse_connection) req.session.sse_connection.free();
			ds.srvkit.SSEConnection.new({ req: req, res: res });
		}
	},
	init() {
		const self = this;
		ds.srvkit.RequestHandler.init.call(self);
		if (!self.url) throw new Error('ds.srvkit.SSEHandler: url is required.');
		self.url = self.url.split('/').filter(a => !!a).join('/');
	}
});
ds.srvkit.Router = ds.srvkit.RequestHandler.extend({
	_routes: null,
	_createRoute(method, pattern, func, func1, func2, func3, func4) {
		const self = this;
		if (method == null) throw 'ds.srvkit.Router: Method can\'t be null.';
		if (pattern == null || pattern == '') throw 'ds.srvkit.Router: Pattern can\'t be null.';
		if (func == null) throw 'ds.srvkit.Router: Function can\'t be null.';
		method = method.toLowerCase();
		arr = pattern.split('/').filter(item => item.length != 0);
		var hash = '';
		var route = {
			hash: '',
			method: method,
			items: [],
			count: arr.length,
			fns: [func, func1, func2, func3, func4].filter(func => !!func)
		};
		arr.forEach(arrItem => {
			var item = {
				type: arrItem.charAt(0) == ':' ? 'param' : 'static',
				name: arrItem.charAt(0) == ':' ? arrItem.slice(1) : arrItem
			};
			route.items.push(item);
			hash += (arrItem.charAt(0) == ':' ? ':' : arrItem) + '/';
		});
		route.hash = method + '|' + hash.slice(0, -1);
		if (self._routes.filter(r => r.hash == route.hash).length > 0) throw 'ds.srvkit.Router: Route pattern is duplicate.';
		self._routes.push(route);
	},
	get(pattern, func, func1, func2, func3, func4) { this._createRoute('get', pattern, func, func1, func2, func3, func4); },
	put(pattern, func, func1, func2, func3, func4) { this._createRoute('put', pattern, func, func1, func2, func3, func4); },
	post(pattern, func, func1, func2, func3, func4) { this._createRoute('post', pattern, func, func1, func2, func3, func4); },
	patch(pattern, func, func1, func2, func3, func4) { this._createRoute('patch', pattern, func, func1, func2, func3, func4); },
	delete(pattern, func, func1, func2, func3, func4) { this._createRoute('delete', pattern, func, func1, func2, func3, func4); },
	request(req, res, next) {
		const self = this;
		var matchRoutes = self._routes.filter(route => req.method.toLowerCase() == route.method && req.urlJSON.length == route.count);
		if (matchRoutes.length != 0) {
			var fn = function(n) {
				matchRoutes = matchRoutes.filter(route => route.items[n].type == 'param' || (route.items[n].name == req.urlJSON[n] && route.items[n].type == 'static'));
				if (n + 1 < req.urlJSON.length) fn(n + 1);
			}
			fn(0);
			if (matchRoutes.length == 1) {
				var route = matchRoutes[0];
				req.params = {};
				for (let i = 0; i < route.items.length; i++) if (route.items[i].type == 'param') req.params[route.items[i].name] = req.urlJSON[i];
				var __idx = 0;
				var __next = function() {
					var fn = route.fns[__idx++];
					if (fn) fn(req, res, __next);
				}
				__next();
				return;
			}
		}
		next();
	},
	init() {
		const self = this;
		self._routes = [];
	}
});
var __body2json = function(req) {
	try {
		return JSON.parse(req.body == '' ? '{}' : req.body);
	} catch(e) {
		if (req.body.indexOf('&')) {
			var result = {};
			var arr = req.body.split('&');
			arr.forEach(function(item) {
				var kv = item.split('=').map((v) => v.trim());
				result[kv[0]] = kv[1];
			});
			return result;
		}
		return { data: req.body }
	}
}
var __query2json = function(req) {
	var parsedUrl = urlLib.parse(req.url);
	if (!parsedUrl.query) return {};
	var result = {};
	parsedUrl.query.split('&').forEach((kv) => {
		var kvArr = kv.split('=');
		result[kvArr[0]] = decodeURIComponent(kvArr[1]);
	});
	return result;
}
var __cookie2json = function(req) {
	if (!req.headers.cookie) return {};
	var result = {};
	req.headers.cookie.split(';').forEach(function(coo) {
		var coo = coo.replace('=', '|'); // replace only first occurance...
		var kv = coo.split('|').map(function(v) { return v.trim(); });
		result[kv[0]] = kv[1];
	});
	return result;
}
var __url2json = function(req, indexPath) {
	var path = urlLib.parse(req.url).pathname;
	if ((path == '' || path == '/') && indexPath) path = indexPath;
	var result = path.split('/').filter(i => i != '');
	result.path = path;
	return result;
}
var __set_cookie_pair = function(key, value) {
	var cookie = this.getHeader('Set-Cookie');
	var cookieJSON = {};
	if (cookie) cookie.split(';').forEach(kv => {
		var kvp = kv.split('=');
		if (kvp.length != 2) return;
		cookieJSON[kvp[0]] = kvp[1];
	});
	cookieJSON[key] = value;
	var cookie = '';
	Object.keys(cookieJSON).forEach(key => cookie += key + '=' + cookieJSON[key].toString() + ';');
	this.setHeader('Set-Cookie', cookie);
}
var __template_process = function(template, args) {
	template = template.trim();
	var __seq = 0;
	var __build_tree = function(template) {
		var line_n = 0;
		var lines = template.split('\n');
		var sections = [];
		var root = { command: ['@root'], children: [], parent: null };
		var currentNode = root;
		for (let line of lines) {
			var trim_line = line.trim();
			if (trim_line[0] == '@') {
				var command = trim_line.split(' ');
				if (['@include'].includes(command[0])) currentNode.children.push({ command: command, parent: currentNode, children: [] });
				else if (command[0] == '@end') currentNode = currentNode.parent;
				else if (command[0].substr(0, 2) == '@@') {
					var node = { command: command, parent: currentNode, children: [] };
					currentNode.children.push(node);
					sections.push(node);
				} else {
					var node = { command: command, parent: currentNode, children: [] };
					currentNode.children.push(node);
					currentNode = node;
				}
			} else currentNode.children.push(line);
		}
		return {
			root: root,
			sections: sections
		};
	}
	var __process_node = function(node, item) {
		var result = '';
		// javascript-obfuscator:disable
		var __exec = function(expr, args_, item) {
			var vars = '';
			for (let key in args) {
				try {
					eval('var ' + key + ' = null;'); // to avoid declaring variable with keyword name...
					vars += '\n\tvar ' + key + ' = args_[\'' + key + '\'];';
				} catch(e) { } 
			}
			return eval('(function() {' + vars + '\n\treturn ' + expr + ';\n})()');
		}
		// javascript-obfuscator:enable
		var __process_children = function(item) {
			node.children.forEach(node => result += __process_node(node, item));
			var expressions = result.match(/\<\@(.*?)\@\>/g);
			if (expressions) expressions.forEach(expression => {
				if (expression.trim()[2] == '=') result = result.replace(expression, __exec(expression.slice(3, -2), args, item));
				else {
					__exec(expression.slice(2, -2), args, item);
					result = result.replace(expression, '');
				}
			});
		}
		if (typeof node == 'string') return node + '\n';
		if (typeof node == 'object') {
			if (node.command[0] == '@root') __process_children(item);
			if (node.command[0] == '@extend') {
				var tree = __build_tree(eval(node.command[1]));
				tree.sections.forEach(function(section_node) {
					node.children.forEach(function(child_node) {
						if (child_node.command[0] == '@part' && ('@@' + child_node.command[1]) == section_node.command[0]) {
							child_node.command = ['@root'];
							var section_node_index = section_node.parent.children.indexOf(section_node);
							section_node.parent.children.splice(section_node_index, 1, child_node);
						}
					});
				});
				node.children = [tree.root];
				__process_children(item);
			}
			if (node.command[0] == '@each') {
				var array = __exec(node.command[1], args, item);
				if (array) array.forEach(item => __process_children(item));
			}
			if (node.command[0] == '@include') {
				var tree = __build_tree(eval(node.command[1]));
				node.children = [tree.root];
				__process_children(item);
			}
			if (node.command[0] == '@if') {
				var condition = node.command.slice(1).join(' ');
				var condition_result = __exec(condition, args, item);
				if (condition_result) __process_children(item);
			}
		}
		return result;
	}
	var tree = __build_tree(template);
	var result = __process_node(tree.root, null);
	return result;
}
ds.srvkit.Server = ds.srvkit.RequestHandler.extend({
	_middlewares: null,
	_rootPath: null,
	indexPath: null,
	compress: true,
	use(middleware) {
		const self = this;
		self._middlewares.push(middleware);
		if (typeof middleware != 'function') middleware.server = self;
	},
	request(req, res) {
		const self = this;
		const compress = self.compress && (req.headers['accept-encoding'] || '').includes('gzip');
		res.endJSONError = function(error) {
			var result = JSON.stringify({ status: 'error', message: error });
			if (compress) {
				result = zlibLib.gzipSync(result, { level: 1 });
				this.setHeader('Content-Encoding', 'gzip');
			}
			this.statusCode = 200;
			this.setHeader('Content-Length', Buffer.byteLength(result, 'utf8'));
			this.setHeader('Content-Type', 'application/json');
			this.end(result);
		};
		res.endJSON = function(data, meta) {
			var result = JSON.stringify({ status: 'success', data: data, meta: meta });
			if (compress) {
				result = zlibLib.gzipSync(result, { level: 1 });
				this.setHeader('Content-Encoding', 'gzip');
			}
			this.statusCode = 200;
			this.setHeader('Content-Length', Buffer.byteLength(result, 'utf8'));
			this.setHeader('Content-Type', 'application/json');
			this.end(result);
		};
		res.endHTML = function(html) {
			if (compress) {
				html = zlibLib.gzipSync(html, { level: 1 });
				this.setHeader('Content-Encoding', 'gzip');
			}
			this.statusCode = 200;
			this.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
			this.setHeader('Content-Type', 'text/html');
			this.end(html);
		};
		res.endTemplate = function(path, args) {
			this.endHTML(__template_process(fsLib.readFileSync(path).toString(), args));
		};
		res.endFile = function(path) {
			if (!fsLib.existsSync(path)) {
				this.writeHead(404);
				this.end();
			} else {
				this.setHeader('Cache-Control', 'public, max-age=3600');
				const MIMETypes = {
					'css': 	'text/css',
					'html': 'text/html',
					'js': 	'text/javascript',
					'png': 	'image/png',
					'jpg': 	'image/jpeg',
					'jpeg': 'image/jpeg',
					'svg':  'image/svg+xml'
				};
				var mType = MIMETypes[pathLib.extname(path).substring(1)];
				if (mType) this.setHeader('Content-Type', mType);
				const raw = fsLib.createReadStream(path);
				if (compress) {
					this.setHeader('Content-Encoding', 'gzip');
					raw.pipe(zlibLib.createGzip()).pipe(this);
				} else raw.pipe(this);
			}
		};
		res.endBuffer = function(buf, options) {
			this.statusCode = 200;
			this.setHeader('Cache-Control', 'public, max-age=3600');
			if (options.contentType) this.setHeader('Content-Type', options.contentType);
			if (compress) {
				this.setHeader('Content-Encoding', 'gzip');
				const strm = new streamLib.PassThrough();
				strm.end(buf);
				strm.pipe(zlibLib.createGzip()).pipe(this);
			} else this.end(buf);
		};
		res.endLocation = function(url, cookie) {
			this.statusCode = 302;
			this.setHeader('Location', encodeURI(url));
			if (cookie) this.setHeader('Set-Cookie', cookie);
			this.end();
		};
		res.setCookiePair = __set_cookie_pair;
		req.body = '';
		req.on('error', err => console.log(err));
		req.on('data', data => req.body += data);
		req.on('end', function() {
			try {
				// parse...
				req.bodyJSON = __body2json(req);
				req.queryJSON = __query2json(req);
				req.cookieJSON = __cookie2json(req);
				req.urlJSON = __url2json(req, self.indexPath);
				// middlewares...
				if (self._middlewares.length == 0) throw 'ds.srvkit.Server: No middlewares set.';
				var __idx = 0;
				var __next = function() {
					var middleware = self._middlewares[__idx];
					__idx++;
					if (!middleware) {
						res.endJSONError('ds.srvkit.Server: Wrong path "' + req.url + '".');
						return;
					}
					var fn = typeof middleware == 'function' ? middleware : middleware.getFn();
					if (fn) fn(req, res, __next);
					else res.endJSONError('ds.srvkit.Server: Wrong path "' + req.url + '".');
				}
				__next();
			} catch(e) {
				res.endJSONError(e.toString() + (e['stack'] ? ('<br/>Stack<br/>----------<br/>' + e.stack) : ''));
			}
		});
	},
	init() {
		const self = this;
		self._middlewares = [];
		self._rootPath = process.cwd();
	}
});