ds = {};
ds.isPrototypeOf = (obj, proto) => {
	if (!obj || !proto) return false;
	let next = obj.__proto__;
	while (next && next != Object) {
		if (next == proto) return true;
		next = next.__proto__;
	}
	return false;
}
ds.isPromise = obj => toString.call(obj) == '[object Promise]';
ds.isObject = obj => toString.call(obj) == '[object Object]';
ds.isArray = obj => Array.isArray(obj);
ds.isFunction = obj => toString.call(obj) == '[object Function]' || toString.call(obj) == '[object AsyncFunction]';
ds.isString = obj => toString.call(obj) == '[object String]';
ds.isNumber = obj => toString.call(obj) == '[object Number]' && isFinite(obj) && obj != Number.POSITIVE_INFINITY && obj != Number.NEGATIVE_INFINITY;
ds.isDate = obj => toString.call(obj) == '[object Date]';
ds.isBool = obj => obj === true || obj === false;
ds.asString = value => {
	if (ds.isnull(value)) return '';
	if (ds.isString(value)) return value;
	return `${value}`;
}
ds.isnull = a => (a === null || a === undefined);
ds.ifnull = (a, b) => ds.isnull(a) ? b : a;
ds.isset = a => !ds.isnull(a);
ds.intersects = (a, b) => a.some(i => b.includes(i));
ds.allKeys = obj => {
	let keys = [];
	for (let key in obj) keys.push(key);
	return keys;
}
ds.get = (obj, path) => {
	if (ds.isnull(obj)) throw new Error('ds.get: obj argument is required.');
	if (ds.isnull(path)) throw new Error('ds.get: path argument is required.');
    for (let i = 0, path_arr = path.split('.'), len = path_arr.length; i < len; i++) {
        obj = obj[path_arr[i]];
        if (obj === null || obj === undefined) return obj;
    }
    return obj;
}
ds.set = (obj, path, value) => {
	if (!obj) throw new Error('ds.set: "obj" argument is required.');
	if (!path) throw new Error('ds.set: "path" argument is required.');
    for (let i = 0, path_arr = path.split('.'), len = path_arr.length; i < len; i++) {
    	if (i == path_arr.length - 1) obj[path_arr[i]] = value;
    	else if (obj[path_arr[i]] === null || obj[path_arr[i]] === undefined) obj[path_arr[i]] = {};
    	obj = obj[path_arr[i]];
    }
}
ds.destruct = obj => {
	const ret = [];
	const proc = (obj, path) => {
		Object.keys(obj).forEach(key => {
			const value = obj[key];
			if (toString.call(value) == '[object Object]') proc(value, [...path, key]);
			else ret.push({ path: [...path, key], value });
		});
	}
	proc(obj, []);
	return ret;
}
ds.construct = sets => {
	const ret = {};
	ds.patch(ret, sets);
	return ret;
}
ds.patch = (obj, sets) => {
	for (const set of sets) {
		let dst = obj;
		for (let i = 0; i < (set.path.length - 1); i++) {
			const key = set.path[i];
			if (!dst.hasOwnProperty(key))
				dst[key] = {};
			dst = dst[key];
		}
		const key = set.path[set.path.length - 1];
		dst[key] = set.value;
	}
	return obj;
}
ds.diff = (obj1, obj2) => {
	const sets1 = ds.destruct(obj1);
	const sets2 = ds.destruct(obj2);
	const diff = [];
	for (const set of sets2) {
		const path = set.path.join('/');
		const found = sets1.find(s => s.path.join('/') == path);
		if (found) {
			const equals = (JSON.stringify(found.value) === JSON.stringify(set.value));
			if (equals) {}
			else diff.push(JSON.parse(JSON.stringify(set)));
		} else diff.push(JSON.parse(JSON.stringify(set)));
	}
	return diff;
}
ds.ensurePath = (obj, path, defaultValue) => {
	if (ds.isnull(obj)) throw new Error('ds.ensurePath: obj argument is required.');
	if (ds.isnull(path)) throw new Error('ds.ensurePath: path argument is required.');
	let ptr = obj;
	let props = path.split('/');
	props.forEach((prop, index) => {
		if (!ptr[prop]) ptr[prop] = index == props.length - 1 ? defaultValue : {};
		ptr = ptr[prop];
	});
	return ptr;
}
ds.distinct = arr => {
	return arr.reduce((acc, item) => { if (!acc.includes(item)) acc.push(item); return acc; }, []);
}
ds.filter = (arr, filter) => {
	let result = [];
	arr.forEach(item => {
		let ok = true;
		for (let key in filter) {
			ok = (filter[key] == item[key]);
			if (!ok) break;
		}
		if (ok) result.push(item);
	});
	return result;
}
ds.assign = (dst, src, props) => {
	(props || []).forEach(prop => {
		if (src.hasOwnProperty(prop)) dst[prop] = src[prop];
	});
	return dst;
}
ds.validate = (target, scheme, options) => {
	const check_type = (target, type) => type === Array ? Array.isArray(target) : target === (new type(target)).valueOf();
	const check_allowed = (target, allowed) => allowed.includes(target);
	const check_allowedCI = (target, allowed) => {
		let allowedCI = allowed.map(i => ds.isFunction(i.toLowerCase) ? i.toLowerCase() : i);
		let targetCI = ds.isFunction(target.toLowerCase) ? target.toLowerCase() : target;
		return allowedCI.includes(targetCI);
	};
	const type_name = type => ({ [Object]: 'Object', [Array]: 'Array', [Number]: 'Number', [Boolean]: 'Boolean', [Function]: 'Function', [String]: 'String' })[type] || type.toString();
	const error = message => {
		if (options.raise) throw new Error(message);
		else return message;
	}
	options = Object.assign({ raise: true, __targetPath: '' }, options);
	scheme = [Object, Array, Number, Boolean, Function, String].includes(scheme) ? { type: scheme } : scheme;
	if (target === null || target === undefined || target === '') return scheme.optional ? null : error(`Value is required${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
	if (scheme.hasOwnProperty('type') && !check_type(target, scheme.type)) return error(`Value ${target} is not ${type_name(scheme.type)}${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
	if (scheme.hasOwnProperty('allowed')) {
		if (Array.isArray(target)) {
			for (let item of target) {
				if (!check_allowed(item, scheme.allowed)) return error(`Value ${item} is out of allowed values [${scheme.allowed}]${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
			}

		} else if (!check_allowed(target, scheme.allowed)) return error(`Value ${target} is out of allowed values [${scheme.allowed}]${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
	}
	if (scheme.hasOwnProperty('allowedCI')) {
		if (Array.isArray(target)) {
			for (let item of target) {
				if (!check_allowedCI(item, scheme.allowedCI)) return error(`Value ${item} is out of allowed values [${scheme.allowedCI}]${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
			}

		} else if (!check_allowedCI(target, scheme.allowedCI)) return error(`Value ${target} is out of allowed values [${scheme.allowedCI}]${options.__targetPath ? ` at ${options.__targetPath}` : ''}.`);
	}
	if (scheme.hasOwnProperty('props')) {
		let props = Object.keys(scheme.props);
		for (let prop of props) {
			let value = target[prop];
			let res = ds.validate(
				value,
				scheme.props[prop],
				Object.assign(ds.clone(options), { __targetPath: options.__targetPath + `/${prop}` })
			)
			if (res) return res;
		}
	}
	if (scheme.hasOwnProperty('items')) {
		for (let i = 0; i < target.length; i++) {
			let item = target[i];
			let res = ds.validate(
				item,
				scheme.items,
				Object.assign(ds.clone(options), { __targetPath: options.__targetPath + `[${i}]` })
			)
			if (res) return res;
		}
	}
	return null;
}
ds.clone = (obj, options) => {
	if (ds.isnull(obj)) return null;
	if (ds.isnull(options)) return JSON.parse(JSON.stringify(obj));
	let new_obj = null;
	if (ds.isObject(obj)) new_obj = {};
	else if (ds.isArray(obj)) new_obj = [];
	else return JSON.parse(JSON.stringify(obj));
	Object.keys(obj).forEach(key => {
		if (options.exclude && options.exclude.includes(key)) return;
		if (ds.isObject(obj[key])) {
			if (options.depth > 0) new_obj[key] = ds.clone(obj[key], { depth: options.depth - 1, exclude: options.exclude });
		} else if (ds.isArray(obj[key])) {
			if (options.depth > 0) new_obj[key] = obj[key].map(item => ds.clone(item, { depth: options.depth - 1, exclude: options.exclude }));
		} else new_obj[key] = obj[key];
	});
	return new_obj;
}
ds.sort = (arr, key, type = String, asc = true) => {
	arr.sort((a, b) => {
		if (new type(a[key]) < new type(b[key])) return (asc ? -1 : 1);
		else if (new type(a[key]) > new type(b[key])) return (asc ? 1 : -1);
		else return 0;
	});
}
ds.join = (arr1, arr2, key1, key2, toKey, notFoundValue = null) => {
	arr1.forEach(row1 => {
		row1[toKey] = notFoundValue;
		for (let row2 of arr2) {
			if (row1[key1] == row2[key2]) {
				row1[toKey] = row2;
				break;
			}
		}
	});
}
ds.group = (arr, key) => {
	const result = {};
	arr.forEach(item => {
		if (!result[item[key]]) result[item[key]] = [];
		result[item[key]].push(item);
	});
	return result;
}
ds.treefy = (arr, idKey, parentKey, containerKey, startWith) => {
	const proc = item => {
		item[containerKey] = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][parentKey] && arr[i][parentKey] == item[idKey]) {
				let new_item = arr[i];
				item[containerKey].push(new_item);
				proc(new_item);
			}
		}
	}
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][parentKey] == startWith) {
			result.push(arr[i]);
			proc(result[result.length - 1]);
		}
	}
	return result;
}
ds.subTree = (arr, key, parentKey, startWith) => {
	var result = [];
	var __level = function(parentValue) {
		for (let item of arr) {
			if (item[parentKey] == parentValue) {
				result.push(item);
				__level(item[key]);
			}
		}
	}
	var root_item = arr.find(item => item[key] == startWith);
	if (root_item) {
		result.push(root_item);
		__level(startWith);
	}
	return result;
}
ds.arr2dict = (arr, key) => {
	var result = {};
	arr.forEach(item => result[item[key]] = item);
	return result;
}
ds.dict2arr = obj => {
	return Object.keys(obj).map(key => obj[key]);
}
ds.args2arr = str => {
	let res = [''];
	let q = false;
	for (let i = 0; i < str.length; i++) {
		if (str[i] == '"') (q = !q, res.push(''));
		else if (str[i] == ' ' && !q) res.push('');
		else res[res.length - 1] += str[i];
	}
	return res.filter(i => !!i);
}
ds.args2obj = str => {
	let len = str.length;
	let quote = null;
	let tokens = [''];
	const token_new = () => tokens.push('');
	const token_concat = val => tokens[tokens.length - 1] += val;
	for (let i = 0; i < len; i++) {
		let c = str[i];
		if (c == '"') {
			if (quote == '"') quote = null;
			else if (quote == null) quote = '"';
			else token_concat(c);
		} else if (c == "'") {
			if (quote == "'") quote = null;
			else if (quote == null) quote = "'";
			else token_concat(c);
		} else if (c == ',') {
			if (quote) token_concat(c);
			else token_new();
		} else if (c == ':') {
			if (quote) token_concat(c);
			else token_new();
		} else if (c == ' ') {
			if (quote) token_concat(c);
			else token_new();
		} else token_concat(c);
	}
	if (quote) throw new Error('ds.args2obj: Unable to parse string, open quote found "' + str + '".');
	tokens = tokens.filter(t => !!t);
	let obj = {};
	for (let i = 0; i < tokens.length; i++) {
		obj[tokens[i]] = tokens[i + 1]
		i++;
	}
	return obj;
}
ds.last = arr => ds.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : null;
ds.times = n => { let res = []; for (let i = 0; i < n; i++) res.push(i); return res; };
ds.global = () => {
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('ds.global: Unable to locate global object');
};
ds.lzwEncode = s => {
    var dict = {};
    var data = (s + '').split('');
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) phrase += currChar;
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i = 0; i < out.length; i++) out[i] = String.fromCharCode(out[i]);
    return out.join('');
}
ds.lzwDecode = s => {
    var dict = {};
    var data = (s + '').split('');
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) phrase = data[i];
        else phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join('');
}
ds.throttle = (fn, ms) => {
	if (!ds.throttle.__interval) ds.throttle.__interval = {};
	let fn_string = fn.toString();
	if (ds.throttle.__interval[fn_string]) return;
	ds.throttle.__interval[fn_string] = setTimeout(() => ds.throttle.__interval[fn_string] = null, ms);
	fn();
}
ds.debounce = (fn, ms) => {
	if (!ds.debounce.__interval) ds.debounce.__interval = {};
	let fn_string = fn.toString();
	if (ds.debounce.__interval[fn_string]) clearInterval(ds.debounce.__interval[fn_string]);
	ds.debounce.__interval[fn_string] = setTimeout(() => {
		ds.debounce.__interval[fn_string] = null;
		fn();
	}, ms);
}
ds.distance = (x1, y1, x2, y2) => Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
ds.angle = (cx, cy, x, y) => {
	let ta = Math.atan2(y - cy, x - cx) * 180 / Math.PI; // range (-180, 180)
	if (ta < 0) ta = 360 + ta; // range (0, 360)
	ta += 90; // make top is 0;
	if (ta > 360) ta = ta - 360;
	return ta;
}
ds.rotate = (cx, cy, x, y, angle) => {
    let rad = (Math.PI / 180) * (-angle),
        cos = Math.cos(rad),
        sin = Math.sin(rad),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [ nx, ny ];
}
ds.rectEdgePoint = (rx, ry, rw, rh, px, py) => {
	let rcx = rx + (rw / 2);
	let rcy = ry + (rh / 2);
	let A = Math.atan2(Math.abs(rcy - py), Math.abs(px - rcx));
	let R_v = rh / 2;
	let R_h = rw / 2;
	let L_cot = R_v * (1 / Math.tan(A));
	let L_tan = R_h * Math.tan(A);
	let L = L_cot;
	let ex = 0, ey = 0;
	if (L_cot > R_h) {
		ex = rcx <= px ? rx + rw : rx;
		ey = rcy >= py ? rcy - L_tan : rcy + L_tan;
	} else {
		ex = rcx <= px ? rcx + L : rcx - L;
		ey = rcy >= py ? rcy - R_v : rcy + R_v;
	}
	return [ex, ey];
}
ds.rectClosestPoint = (rx, ry, rw, rh, px, py) => {
	let rr = rx + rw;
	let rb = ry + rh;
	if (px < rx && py < ry) return [rx, ry];
	else if (px > rr && py < ry) return [rr, ry];
	else if (px > rr && py > rb) return [rr, rb];
	else if (px < rx && py > rb) return [rx, rb];
	else if (px < rx) return [rx, py];
	else if (px > rr) return [rr, py];
	else if (py < ry) return [px, ry];
	else if (py > rb) return [px, rb];
	else return [px, py];
}
ds.rectIntersect = (x1, y1, w1, h1, x2, y2, w2, h2) => {
	let r1 = x1 + w1;
	let b1 = y1 + h1;
	let r2 = x2 + w2;
	let b2 = y2 + h2;
  	return !(x2 > r1 || r2 < x1 || y2 > b1 || b2 < y1);
}
ds.pointInRect = (px, py, rx, ry, rw, rh) => {
	let rr = rx + rw;
	let rb = ry + rh;
	return px >= rx && px <= rr && py >= ry && py <= rb;
}
ds.lineClosestPoint = (x1, y1, x2, y2, px, py) => {
	const lerp = (a, b, x) => (a + x * (b - a));
    let dx = x2 - x1;
    let dy = y2 - y1;
    let t = (( px - x1 ) * dx + ( py - y1 ) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    return [ lerp(x1, x2, t), lerp(y1, y2, t) ];
}
ds.b64encode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, a) => String.fromCharCode('0x' + a)));
ds.b64decode = str => decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
// javascript-obfuscator:disable
ds.evalScope = (expr, scope, this_) => {
	const skip = key => !['new', 'extend', 'init', 'free', 'shared', 'if', 'else', 'for', 'return', 'scope', 'switch', 'break', 'continue', 'case'].includes(key);
	let code = '';
	if (ds.isArray(scope)) {
		let arg_names = [], arg_vals = [];
		scope.forEach((item, index) => {
			ds.allKeys(item).filter(skip).forEach(key => {
				arg_names.push(key);
				arg_vals.push('scope[' + index.toString() + '].' + key);
			});
		});
		code = '(function(' + arg_names.join(',') + ') { return ' + expr + '; }).call(this_,' + arg_vals.join(',') + ')';
	} else code = '(function(' + ds.allKeys(scope).filter(skip).join(',') + ') { return ' + expr + '; }).call(this_,' + ds.allKeys(scope).filter(skip).map(key => 'scope.' + key).join(',') + ')';
	try {
		return eval(code);
	} catch(e) {
		console.log(expr);
		console.log(e);
		throw e;
	}
}
// javascript-obfuscator:enable
ds.md5 = a => {function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=Array(f-1),h=0,i=0;i<c;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var d,e,b="",c="";for(e=0;e<=3;e++)d=a>>>8*e&255,c="0"+d.toString(16),b+=c.substr(c.length-2,2);return b}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);d<128?b+=String.fromCharCode(d):d>127&&d<2048?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var p,q,r,s,t,u,v,w,x,o=Array(),y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),o=l(a),u=1732584193,v=4023233417,w=2562383102,x=271733878,p=0;p<o.length;p+=16)q=u,r=v,s=w,t=x,u=h(u,v,w,x,o[p+0],y,3614090360),x=h(x,u,v,w,o[p+1],z,3905402710),w=h(w,x,u,v,o[p+2],A,606105819),v=h(v,w,x,u,o[p+3],B,3250441966),u=h(u,v,w,x,o[p+4],y,4118548399),x=h(x,u,v,w,o[p+5],z,1200080426),w=h(w,x,u,v,o[p+6],A,2821735955),v=h(v,w,x,u,o[p+7],B,4249261313),u=h(u,v,w,x,o[p+8],y,1770035416),x=h(x,u,v,w,o[p+9],z,2336552879),w=h(w,x,u,v,o[p+10],A,4294925233),v=h(v,w,x,u,o[p+11],B,2304563134),u=h(u,v,w,x,o[p+12],y,1804603682),x=h(x,u,v,w,o[p+13],z,4254626195),w=h(w,x,u,v,o[p+14],A,2792965006),v=h(v,w,x,u,o[p+15],B,1236535329),u=i(u,v,w,x,o[p+1],C,4129170786),x=i(x,u,v,w,o[p+6],D,3225465664),w=i(w,x,u,v,o[p+11],E,643717713),v=i(v,w,x,u,o[p+0],F,3921069994),u=i(u,v,w,x,o[p+5],C,3593408605),x=i(x,u,v,w,o[p+10],D,38016083),w=i(w,x,u,v,o[p+15],E,3634488961),v=i(v,w,x,u,o[p+4],F,3889429448),u=i(u,v,w,x,o[p+9],C,568446438),x=i(x,u,v,w,o[p+14],D,3275163606),w=i(w,x,u,v,o[p+3],E,4107603335),v=i(v,w,x,u,o[p+8],F,1163531501),u=i(u,v,w,x,o[p+13],C,2850285829),x=i(x,u,v,w,o[p+2],D,4243563512),w=i(w,x,u,v,o[p+7],E,1735328473),v=i(v,w,x,u,o[p+12],F,2368359562),u=j(u,v,w,x,o[p+5],G,4294588738),x=j(x,u,v,w,o[p+8],H,2272392833),w=j(w,x,u,v,o[p+11],I,1839030562),v=j(v,w,x,u,o[p+14],J,4259657740),u=j(u,v,w,x,o[p+1],G,2763975236),x=j(x,u,v,w,o[p+4],H,1272893353),w=j(w,x,u,v,o[p+7],I,4139469664),v=j(v,w,x,u,o[p+10],J,3200236656),u=j(u,v,w,x,o[p+13],G,681279174),x=j(x,u,v,w,o[p+0],H,3936430074),w=j(w,x,u,v,o[p+3],I,3572445317),v=j(v,w,x,u,o[p+6],J,76029189),u=j(u,v,w,x,o[p+9],G,3654602809),x=j(x,u,v,w,o[p+12],H,3873151461),w=j(w,x,u,v,o[p+15],I,530742520),v=j(v,w,x,u,o[p+2],J,3299628645),u=k(u,v,w,x,o[p+0],K,4096336452),x=k(x,u,v,w,o[p+7],L,1126891415),w=k(w,x,u,v,o[p+14],M,2878612391),v=k(v,w,x,u,o[p+5],N,4237533241),u=k(u,v,w,x,o[p+12],K,1700485571),x=k(x,u,v,w,o[p+3],L,2399980690),w=k(w,x,u,v,o[p+10],M,4293915773),v=k(v,w,x,u,o[p+1],N,2240044497),u=k(u,v,w,x,o[p+8],K,1873313359),x=k(x,u,v,w,o[p+15],L,4264355552),w=k(w,x,u,v,o[p+6],M,2734768916),v=k(v,w,x,u,o[p+13],N,1309151649),u=k(u,v,w,x,o[p+4],K,4149444226),x=k(x,u,v,w,o[p+11],L,3174756917),w=k(w,x,u,v,o[p+2],M,718787259),v=k(v,w,x,u,o[p+9],N,3951481745),u=c(u,q),v=c(v,r),w=c(w,s),x=c(x,t);var O=m(u)+m(v)+m(w)+m(x);return O.toLowerCase()};
ds.nextId = (function() { let seq = 1, rnd = parseInt((Math.random() * 100), 10); return () => rnd.toString(16) + (new Date()).getTime().toString(36) + (++seq).toString(36); })();
ds.assert = (value, descr = null, errp = Error) => {
	if (descr && !descr.includes('"')) descr = `"${descr}"`;
	const valueAssert = {
		equals(rvalue) {
			if ((isset || !optional) && value !== rvalue) throw new errp(`${ descr || 'Assert:' } value "${value}" is not equal to "${rvalue}".`);
			return this;
		},
		oneOf(allowed) {
			if (!ds.isArray(allowed)) throw new errp('Assert: "oneOf" accepts only array as first argument.');
			if ((isset || !optional) && !allowed.includes(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not one of "${allowed.join(', ')}".`);
			return this;
		}
	}
	const objectAssert = Object.assign(Object.create(valueAssert), {
		hasOwnProperty(prop) {
			const props = ds.isArray(prop) ? prop : [prop];
			if ((isset || !optional) && !props.every(p => value.hasOwnProperty(p))) throw new errp(`${ descr || 'Assert:' } object has no own property "${prop}".`);
			return this;
		},
		hasProperty(prop) {
			const props = ds.isArray(prop) ? prop : [prop];
			if ((isset || !optional) && !props.every(p => p in value)) throw new errp(`${ descr || 'Assert:' } object has no property "${prop}".`);
			return this;
		},
		prototypeOf(proto) {
			if ((isset || !optional) && !ds.isPrototypeOf(value, proto)) throw new errp(`${ descr || 'Assert:' } object is not prototype of "${proto}".`);
			return this;
		}
	});
	const arrayAssert = Object.assign(Object.create(valueAssert), {
		lengthOf(len) {
			if ((isset || !optional) && !(value.length == len)) throw new errp(`${ descr || 'Assert:' } array is not length of "${len}".`);
			return this;
		},
		notEmpty() {
			if ((isset || !optional) && (value.length == 0)) throw new errp(`${ descr || 'Assert:' } array "${value}" is empty.`);
			return this;
		}
	});
	const numberAssert = Object.assign(Object.create(valueAssert), {
		greaterThan(rvalue) {
			if ((isset || !optional) && !(value > rvalue)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not more than "${rvalue}".`);
			return this;
		},
		greaterThanOrEquals(rvalue) {
			if ((isset || !optional) && !(value >= rvalue)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not more than or equal to "${rvalue}".`);
			return this;
		},
		lessThan(rvalue) {
			if ((isset || !optional) && !(value < rvalue)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not less than "${rvalue}".`);
			return this;
		},
		lessThanOrEquals(rvalue) {
			if ((isset || !optional) && !(value <= rvalue)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not less than or equal to "${rvalue}".`);
			return this;
		},
		odd() {
			if ((isset || !optional) && (value % 2) == 0) throw new errp(`${ descr || 'Assert:' } value "${value}" is not odd.`);
			return this;
		},
		even() {
			if ((isset || !optional) && (value % 2) != 0) throw new errp(`${ descr || 'Assert:' } value "${value}" is not even.`);
			return this;
		},
		inRange(from, to) {
			if ((isset || !optional) && (value < from || value > to)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not in range ${from}..${to}.`);
			return this;
		}
	});
	const stringAssert = Object.assign(Object.create(valueAssert), {
		lengthOf(len) {
			if ((isset || !optional) && !(value.length == len)) throw new errp(`${ descr || 'Assert:' } string "${value}" is not length of "${len}".`);
			return this;
		},
		notEmpty() {
			if ((isset || !optional) && (value.length == 0)) throw new errp(`${ descr || 'Assert:' } string "${value}" is empty.`);
			return this;
		}
	});
	const functionAssert = Object.assign(Object.create(valueAssert), {
	});
	const finalAssert = Object.assign(Object.create(valueAssert), {
		object() {
			if ((isset || !optional) && !ds.isObject(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not an object.`);
			return objectAssert;
		},
		array() {
			if ((isset || !optional) && !ds.isArray(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not an array.`);
			return arrayAssert;
		},
		number() {
			if ((isset || !optional) && !ds.isNumber(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not a number.`);
			return numberAssert;
		},
		string() {
			if ((isset || !optional) && !ds.isString(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not a string.`);
			return stringAssert;
		},
		bool() {
			if ((isset || !optional) && !ds.isBool(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not a bool.`);
			return valueAssert;
		},
		function() {
			if ((isset || !optional) && !ds.isFunction(value)) throw new errp(`${ descr || 'Assert:' } value "${value}" is not a function.`);
			return functionAssert;
		}
	});
	let isset = (value !== null && value !== undefined);
	let optional = false;
	return {
		optional: () => {
			optional = true;
			return finalAssert;
		},
		required: () => {
			optional = false;
			if (value === null || value === undefined) throw new errp(`${ descr || 'Assert:' } value is required.`);
			return finalAssert;
		}
	}
}
ds.isNode = () => (typeof process != 'undefined') && (process.cwd !== null) && (process.cwd !== undefined);
ds.isBrowser = () => (typeof window != 'undefined') && (typeof document != 'undefined');
ds.Events = function() {
	const supported_events = {};
	for (let arg of arguments) {
		let kv = arg.split(':');
		let name = kv[0];
		let type = kv[1] ? kv[1] : 'multiple';
		if (!['multiple', 'single'].includes(type)) throw new Error('ds.Events: Type of event "' + type + '" not supported.');
		supported_events[name] = type;
	}
	return function(target) {
		target._supported_events = Object.assign({}, target._supported_events ? target._supported_events : {}, supported_events);
		target.on = function(event, fn) {
			if (!event) throw new Error('ds.Events: event is required.');
			if (!fn) throw new Error('ds.Events: callback is required.');
			if (!ds.isFunction(fn)) {
				throw new Error('ds.Events: callback is not function.');
			}
			const self = this;
			const on_each = event => {
				if (!self._supported_events[event]) throw new Error('ds.Events: Event "' + event + '" not supported.');
				let prop_name = '_on' + event;
				if (self._supported_events[event] == 'multiple') {
					if (!self[prop_name]) self[prop_name] = [fn];
					else self[prop_name].push(fn);
				} else self[prop_name] = fn;
			}
			(ds.isArray(event) ? event : [event]).forEach(on_each);
			return self;
		};
		target.off = function(event, fn) {
			const self = this;
			const on_each = event => {
				if (!self._supported_events[event]) throw new Error('ds.Events: Event "' + event + '" not supported.');
				let prop_name = '_on' + event;
				if (self._supported_events[event] == 'multiple') self[prop_name] = (self[prop_name] || []).filter(a => a != fn);
				else {
					if (self[prop_name] === fn) delete self[prop_name];
				}
			}
			(ds.isArray(event) ? event : [event]).forEach(on_each);
			return self;
		};
		target._trigger = function(event, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
			const self = this;
			if (!self._supported_events[event]) throw new Error('ds.Events: Event "' + event + '" not supported.');
			if (self._disableEvents) return;
			let prop_name = '_on' + event;
			if (self._supported_events[event] == 'multiple') {
				if (ds.isArray(self[prop_name])) {
					return self[prop_name].map(fn => fn.call(self, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));
				}
				else return [];
			} else {
				if (self[prop_name]) return self[prop_name].call(self, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
			}
		};
		target._triggerAsync = function(event, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
			const self = this;
			return Promise.resolve(self._trigger(event, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));
		}
	}
}
ds.Object = {
	init() { },
	free() { this.__freed = true; delete this; },
	new(args) {
		let obj = Object.create(this);
		Object.assign(obj, args);
		obj.init();
		return obj;
	},
	extend(obj, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10) {
		Object.setPrototypeOf(obj, this);
		if (m1) m1(obj);	if (m2) m2(obj);
		if (m3) m3(obj);	if (m4) m4(obj);
		if (m5) m5(obj);	if (m6) m6(obj);
		if (m7) m7(obj);	if (m8) m8(obj);
		if (m9) m9(obj);	if (m10) m10(obj);
		return obj;
	},
	shared(args) {
		return this.__shared_instance || (this.__shared_instance = this.new(args));
	}
}
ds.Emitter = ds.Object.extend({
	_observers: null,
	matches(origin, mask) {
		const self = this;
		let origin_arr = origin.split('.').map(item => item.trim());
		if (origin_arr.includes('*')) throw 'ds.Emitter: "*" not supported in origin for notification.';
		let mask_arr = mask.split('.').map(item => item.trim());
		for (let i = 0; i < origin_arr.length && i < mask_arr.length; i++) {
			if (origin_arr[i] != mask_arr[i] && mask_arr[i] != '*') return false;
		}
		return true;
	},
	on(origins, fn) {
		const self = this;
		let observer = { origins: origins, fn: fn, ignoreOnce: [], enabled: true };
		self._observers.push(observer);
		return observer;
	},
	once(origins, fn) {
		const self = this;
		self.on(origins, (p, o, u) => { fn(p, o, u); return false; });
	},
	remove(observer) {
		const self = this;
		let index = self._observers.indexOf(observer);
		if (index != -1) self._observers.splice(index, 1);
	},
	emit(origin, payload, user) {
		const self = this;
		let remove_list = [];
		self._observers.filter(observer => observer.enabled).forEach(observer => {
			let origin_masks = toString.call(observer.origins) == '[object Array]' ? observer.origins : [observer.origins];
			for (let origin_mask of origin_masks) {
				let matches = self.matches(origin, origin_mask);
				if (matches) {
					let ignore_mask = observer.ignoreOnce.find(mask => self.matches(origin, mask));
					if (ignore_mask) {
						observer.ignoreOnce.splice(observer.ignoreOnce.indexOf(ignore_mask), 1);
						break;
					}
					let result = observer.fn(payload, origin, user);
					if (result !== true && result !== false) throw 'ds.Emitter: Observer funcion must return either True or False strictly, to determine whether observer should be removed or not.';
					if (result === false) remove_list.push(observer);
					break;
				}
			}
		});
		remove_list.forEach(observer => self.remove(observer));
	},
	init() {
		const self = this;
		ds.Object.init.call(self);
		self._observers = [];
	}
});
ds.Date = ds.Object.extend({
	MONTH_NAMES: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	MONTH_NAMES_EN_SHORT: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	DAY_NAMES: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	DAY_IDS: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
	DATEPART_MS: {
		week: (7 * 24 * 60 * 60 * 1000),
		day: (24 * 60 * 60 * 1000),
		hour: (60 * 60 * 1000),
		minute: (60 * 1000),
		second: 1000,
		millisecond: 1
	},
	d: null,
	m: null,
	y: null,
	h: null,
	mi: null,
	s: null,
	ms: null,
	dn: null,
	fromDate(dateTime) {
		const self = this;
		self.d = dateTime.getDate();
		self.m = dateTime.getMonth() + 1; //!!!
		self.y = dateTime.getFullYear();
		self.h = dateTime.getHours();
		self.mi = dateTime.getMinutes();
		self.s = dateTime.getSeconds();
		self.ms = dateTime.getMilliseconds();
		self.dn = dateTime.getDay();
	},
	toDate() {
		const self = this;
		return new Date(self.y, self.m - 1, self.d, self.h, self.mi, self.s, self.ms);
	},
	fromISO(isoString) {
		const self = this;
		if (ds.isnull(isoString)) {
			self.fromDate(new Date(0));
			return;
		}
		if (!isoString.includes('-')) throw 'ds.Date: Only format supported is yyyy-MM-dd HH:mm:ss,SSS';
		const __incorrect = function(str) {
			if (!str) return true;
			for (let i = 0; i < str.length; i++) if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(str[i])) return true;
			return false;
		}
		var y = isoString.substr(0, 4);
		var m = isoString.substr(5, 2);
		var d = isoString.substr(8, 2);
		var h = isoString.substr(11, 2) || '00';
		var mi = isoString.substr(14, 2) || '00';
		var s = isoString.substr(17, 2) || '00';
		var ms = isoString.substr(20, 3) || '000';
		if (__incorrect(y)) throw 'ds.Date: Unable to parse ISO Date string, YYYY is incorrect, "' + y + '".';
		if (__incorrect(m)) throw 'ds.Date: Unable to parse ISO Date string, MM is incorrect, "' + m + '".';
		if (__incorrect(d)) throw 'ds.Date: Unable to parse ISO Date string, DD is incorrect, "' + d + '".';
		if (__incorrect(h)) throw 'ds.Date: Unable to parse ISO Date string, HH is incorrect, "' + h + '".';
		if (__incorrect(mi)) throw 'ds.Date: Unable to parse ISO Date string, MM is incorrect, "' + mi + '".';
		if (__incorrect(s)) throw 'ds.Date: Unable to parse ISO Date string, SS is incorrect, "' + s + '".';
		if (__incorrect(ms)) throw 'ds.Date: Unable to parse ISO Date string, SSS is incorrect, "' + ms + '".';
		var y_int = parseInt(y, 10);
		var m_int = parseInt(m, 10);
		var d_int = parseInt(d, 10);
		var h_int = parseInt(h, 10);
		var mi_int = parseInt(mi, 10);
		var s_int = parseInt(s, 10);
		var ms_int = parseInt(ms, 10);
		if (m_int < 1 || m_int > 12) throw 'ds.Date: Unable to parse ISO Date string, month part is incorrect "' + m_int.toString() + '".';
		if (d_int < 1 || d_int > 31) throw 'ds.Date: Unable to parse ISO Date string, day part is incorrect "' + d_int.toString() + '".';
		if (h_int < 0 || h_int > 23) throw 'ds.Date: Unable to parse ISO Date string, hours part is incorrect "' + h_int.toString() + '".';
		if (mi_int < 0 || mi_int > 59) throw 'ds.Date: Unable to parse ISO Date string, minutes part is incorrect "' + mi_int.toString() + '".';
		if (s_int < 0 || s_int > 59) throw 'ds.Date: Unable to parse ISO Date string, seconds part is incorrect "' + s_int.toString() + '".';
		self.y = y_int;
		self.m = m_int;
		self.d = d_int;
		self.h = h_int;
		self.mi = mi_int;
		self.s = s_int;
		self.ms = ms_int;
		self.dn = self.toDate().getDay();
	},
	toISO() {
		const self = this;
		return self.y.toString() + '-' +
			self.m.toString().padStart(2, '0') + '-' +
			self.d.toString().padStart(2, '0') + 'T' +
			self.h.toString().padStart(2, '0') + ':' +
			self.mi.toString().padStart(2, '0') + ':' +
			self.s.toString().padStart(2, '0') + '.' +
			self.ms.toString().padStart(3, 0);
	},
	toISODate() {
		const self = this;
		return self.y.toString() + '-' +
			self.m.toString().padStart(2, '0') + '-' +
			self.d.toString().padStart(2, '0');
	},
	toISODateTime() {
		const self = this;
		return self.y.toString() + '-' +
			self.m.toString().padStart(2, '0') + '-' +
			self.d.toString().padStart(2, '0') + 'T' +
			self.h.toString().padStart(2, '0') + ':' +
			self.mi.toString().padStart(2, '0') + ':' +
			self.s.toString().padStart(2, '0');
	},
	diff(datepart, target) {
		const self = this;
		if (!ds.isPrototypeOf(target, ds.Date)) target = ds.Date.newFromDate(target);
		datepart = datepart.toLowerCase();
		var diff = Math.abs(self.toDate() - target.toDate());
		var divide_by = { w: 604800000, d: 86400000, h: 3600000, m: 60000, s: 1000 };
		return Math.floor(diff / divide_by[datepart]);
	},
	diffText(target, nowText = 'сейчас') {
		const self = this;
		var d_diff = self.diff('d', target);
		var h_diff = self.diff('h', target);
		var m_diff = self.diff('m', target);
		if (d_diff > 0) {
			var d = d_diff;
			var h = h_diff - (24 * d_diff);
			return d.toString() + 'д ' + h.toString() + 'ч';
		} else if (h_diff > 0) {
			var h = h_diff;
			var m = m_diff - (60 * h_diff);
			return h.toString() + 'ч ' + m.toString() + 'м';
		} else if (m_diff > 0) return m_diff.toString() + 'м';
		else return nowText;
	},
	add(value, datepart) {
		const self = this;
		ds.assert(value, 'ds.Date.add: "value"').required().number();
		ds.assert(datepart, 'ds.Date.add: "datepart"').required().oneOf(['week', 'day', 'hour', 'minute', 'second', 'millisecond']);
		return ds.Date.newFromDate(
			new Date(
				self.toDate().getTime() + (value * ds.Date.DATEPART_MS[datepart])
			)
		);
	},
	subtract(value, datepart) {
		const self = this;
		ds.assert(value, 'ds.Date.subtract: "value"').required().number();
		ds.assert(datepart, 'ds.Date.subtract: "datepart"').required().oneOf(['week', 'day', 'hour', 'minute', 'second', 'millisecond']);
		return ds.Date.newFromDate(
			new Date(
				self.toDate().getTime() - (value * ds.Date.DATEPART_MS[datepart])
			)
		);
	},
	YYYYMMDD_HH() {
		const self = this;
		return self.y.toString() + '-' +
				self.m.toString().padStart(2, '0') + '-' +
				self.d.toString().padStart(2, '0') + '-' +
				self.h.toString().padStart(2, '0');
	},
	YYYYMMDD_HHMM() {
		const self = this;
		return self.y.toString() + '-' +
				self.m.toString().padStart(2, '0') + '-' +
				self.d.toString().padStart(2, '0') + '-' +
				self.h.toString().padStart(2, '0') + ':' +
				self.mi.toString().padStart(2, '0');
	},
	DDMMYYYY_HHMM() {
		const self = this;
		return self.d.toString().padStart(2, '0') + '.' +
				self.m.toString().padStart(2, '0') + '.' +
				self.y.toString() + ' ' +
				self.h.toString().padStart(2, '0') + ':' +
				self.mi.toString().padStart(2, '0');
	},
	DDMMYYYY_HHMMSS() {
		const self = this;
		return self.d.toString().padStart(2, '0') + '.' +
				self.m.toString().padStart(2, '0') + '.' +
				self.y.toString() + ' ' +
				self.h.toString().padStart(2, '0') + ':' +
				self.mi.toString().padStart(2, '0') + ':' +
				self.s.toString().padStart(2, '0');
	},
	DDMMYYYY() {
		const self = this;
		return self.d.toString().padStart(2, '0') + '.' +
				self.m.toString().padStart(2, '0') + '.' +
				self.y.toString();
	},
	DDMMYYYY_Day() {
		const self = this;
		return self.DDMMYYYY() + ' ' + self.DAY_NAMES[self.toDate().getDay()];
	},
	DDMONTHYYYY() {
		const self = this;
		return self.d.toString().padStart(2, '0') + ' ' +
				self.MONTH_NAMES[self.m - 1] + ' ' +
				self.y.toString();
	},
	YYYY_MON_EN() {
		const self = this;
		return self.y.toString() + '_' + self.MONTH_NAMES_EN_SHORT[self.m - 1];
	},
	YYYY_MON_DD_EN() {
		const self = this;
		return self.y.toString() + '_' + self.MONTH_NAMES_EN_SHORT[self.m - 1] + '_' + self.d.toString().padStart(2, '0');
	},
	HHMM() {
		const self = this;
		return self.h.toString().padStart(2, '0') + ':' +
				self.mi.toString().padStart(2, '0');
	},
	HHMMSS() {
		const self = this;
		return self.h.toString().padStart(2, '0') + ':' +
				self.mi.toString().padStart(2, '0') + ':' +
				self.s.toString().padStart(2, '0');
	},
	init() {
		const self = this;
		var dt = new Date();
		self.d = self.d || dt.getDate();
		self.m = self.m || dt.getMonth() + 1; //!!!
		self.y = self.y || dt.getFullYear();
		self.h = self.h || dt.getHours();
		self.mi = self.mi || dt.getMinutes();
		self.s = self.s || dt.getSeconds();
		self.ms = self.ms || dt.getMilliseconds();
		self.dn = self.dn || dt.getDay();
		if (self.m < 1 || self.m > 12) throw 'ds.Date: Month part is incorrect "' + self.m.toString() + '".';
		if (self.d < 1 || self.d > 31) throw 'ds.Date: Day part is incorrect "' + self.d.toString() + '".';
		if (self.h < 0 || self.h > 23) throw 'ds.Date: Hours part is incorrect "' + self.h.toString() + '".';
		if (self.mi < 0 || self.mi > 59) throw 'ds.Date: Minutes part is incorrect "' + self.mi.toString() + '".';
		if (self.s < 0 || self.s > 59) throw 'ds.Date: Seconds part is incorrect "' + self.s.toString() + '".';
	},
	newFromISO(isostring) {
		var dt = ds.Date.new();
		dt.fromISO(isostring);
		return dt;
	},
	newFromDate(dateTime) {
		var dt = ds.Date.new();
		dt.fromDate(dateTime);
		return dt;
	}
});
ds.Lock = ds.Object.extend({
	_active: false,
	_queue: null,
	acquire() {
		const self = this;
		return new Promise(resolve => {
			if (!self._active) {
				self._active = true;
				resolve();
			} else self._queue.push(resolve);
		});
	},
	release() {
		const self = this;
		if (self._queue.length > 0) self._queue.shift()();
		else self._active = false;
	},
	init() {
		const self = this;
		self._queue = [];
	}
});
ds.Tracker = ds.Object.extend({
	active: true,
	getTrace(call) {
		const self = this;
		let calls = [];
		let next = call;
		while (next) {
			calls.unshift(call);
			next = call.parent;
		}
		return calls.map((call, index) => call.op.padStart(index)).join('\\');
	},
	track(parent_call, op, args, fn) {
		const self = this;
		if (!self.active) return fn(null);
		const call = {
			parent: parent_call,
			op: op,
			args: args,
			level: (parent_call ? parent_call.level + 1 : 0),
			error: null,
			children: []
		};
		if (parent_call) parent_call.children.push(call);
		try { self._trigger('op_begin', call, null); } catch(e) { console.log('Error in tracker event "op_begin": ' + e.stack); }
		try {
			const ret_val = fn(call);
			try { self._trigger('op_end', call, null); } catch(e) { console.log('Error in tracker event "op_end": ' + e.stack); }
			return ret_val;
		} catch(e) {
			call.error = e;
			try { self._trigger('op_end', call, e); } catch(e) { console.log('Error in tracker event "op_end": ' + e.stack); }
			throw e;
		}
	}
}, ds.Events('op_begin', 'op_end'));
ds.Audit = ds.Object.extend({
	SEVERITY: ['INFO', 'WARNING', 'ERROR'],
	_last_module: null,
	_last_filename: null,
	_libfs: null,
	_libpath: null,
	_isNode: false,
	file: true,
	output: true,
	module: null,
	user: null,
	_format(a) { return (a || '').toString().replace('\t', ' ').replace('\n', ' '); },
	_getFileName() {
		const self = this;
		if (!self._isNode) return;
		if (self.module != self._last_module) {
			const f1 = self._libpath.join(process.cwd(), 'logs');
			const f2 = process.cwd();
			self._last_module = self.module;
			self._last_filename = self._libpath.join((self._libfs.existsSync(f1) ? f1 : f2), `${self.module}.log`);
		}
		return self._last_filename;
	},
	message(sev, msg) {
		const self = this;
		if (ds.isnull(msg)) throw new Error(`ds.Audit: "msg" is required.`);
		if (ds.isnull(self.user)) throw new Error(`ds.Audit: "self.user" is required.`);
		if (!self.SEVERITY.includes(sev)) throw new Error(`ds.Audit: "sev" must be one of "${self.SEVERITY}".`);
		const dt = ds.Date.new().toISODateTime().replace('T', ' ');
		const log = `${self._format(dt)}\t${self._format(sev)}\t${self._format(self.user)}\t${self._format(msg)}`;
		if (self.output) {
			if (sev == 'INFO') console.log(log);
			else if (sev == 'WARNING') console.log(ds.yellow(log));
			else if (sev == 'ERROR') console.log(ds.red(log));
		} if (self.file && ds.isNode()) self._libfs.appendFileSync(self._getFileName(), log + '\n');
	},
	init() {
		const self = this;
		if (ds.isnull(self.module)) throw new Error('ds.Audit: "module" required.');
		if (ds.isNode()) {
			self._isNode = true;
			self._libfs = require('fs');
			self._libpath = require('path');
		}
	}
});
ds.Responder = ds.Object.extend({
	_pending: null,
	_worker: null,
	children: null,
	parent: null,
	name: null,
	worker: false,
	workerPath: null,
	_isRootResponder() {
		const self = this;
		return !self.parent;
	},
	_getRootResponder() {
		const self = this;
		if (!self.parent) return self;
		else return self.parent._getRootResponder();
	},
	_processMessage(message) {
		const self = this;
		ds.assert(message, 'Responder::_processMessage: "message"').required().object();
		ds.assert(message.validated, 'Responder::_processMessage: "message.validated"').required().equals(true);
		if (self.worker) self._worker.postMessage(message);
		else self.respondTo(message, { type: 'error', message: 'Message not accepted' });
	},
	_receiveMessage(message) {
		const self = this;
		ds.assert(message, 'Responder::_receiveMessage: "message"').required().object();
		ds.assert(message.validated, 'Responder::_receiveMessage: "message.validated"').required().equals(true);
		if (!['*', self.name].includes(message.receiver)) throw new Error(`Message with receiver "${message.receiver}" is not meant for responder with name "${self.name}"`);
		if (ds.isset(self._pending[message.id])) {
			const fn = self._pending[message.id];
			delete self._pending[message.id];
			fn.call(null, message);
		} else self._processMessage(message);
	},
	_sendMessage(message) {
		const self = this;
		ds.assert(message, 'Responder::_sendMessage: "message"').required().object();
		ds.assert(message.validated, 'Responder::_sendMessage: "message.validated"').required().equals(true);
		if (message.receiver == '*') {
			if (message.type == 'result') throw new Error(`Message cannot be "result" type and "*" as receiver, sender: "${message.sender}"`);
			else (self._isRootResponder() ? self.children : self._getRootResponder().children).forEach(r => r._receiveMessage(message));
		} else if (message.receiver == self.name) self._receiveMessage(message);
		else {
			const responder = self.children.find(r => r.name == message.receiver);
			if (responder) responder._receiveMessage(message);
			else {
				if (self.parent) self.parent._sendMessage(message);
				else throw new Error(`Responder with name "${message.receiver}" not found on parent "${self.name}"`);
			}
		}
	},
	respondTo(message, with_) {
		const self = this;
		ds.assert(message, 'Responder::respondTo: "message"').required().object();
		ds.assert(message.validated, 'respondTo: "message.validated"').required().equals(true);
		const reply = Object.assign(with_, { id: message.id, sender: self.name, receiver: message.sender });
		ds.assert(reply, 'Responder::respondTo: "reply"').required().object();
		ds.assert(reply.id, 'Responder::respondTo: "reply.id"').required().string().notEmpty();
		ds.assert(reply.type, 'Responder::respondTo: "reply.type"').required().string().notEmpty();
		ds.assert(reply.sender, 'Responder::respondTo: "reply.sender"').required().string().notEmpty();
		ds.assert(reply.receiver, 'Responder::respondTo: "reply.receiver"').required().string().notEmpty();
		reply.validated = true;
		self._sendMessage(reply);
	},
	postMessage(message, callback) {
		const self = this;
		ds.assert(message, 'Responder::postMessage: "message"').required().object();
		ds.assert(message.type, 'Responder::postMessage: "message.type"').required().string().notEmpty();
		ds.assert(message.receiver, 'Responder::postMessage: "message.receiver"').required().string().notEmpty();
		message.id = ds.nextId();
		message.sender = self.name;
		message.validated = true;
		if (message.receiver == message.sender) throw new Error(`Restricted to post messages to itself, sender: "${message.sender}", receiver: "${message.receiver}"`);
		self._pending[message.id] = callback;
		self._sendMessage(message);
	},
	dispatchMessage(message, receiver) {
		const self = this;
		ds.assert(message, 'Responder::dispatchMessage: "message"').required().object();
		ds.assert(message.validated, 'Responder::dispatchMessage: "message.validated"').required().equals(true);
		ds.assert(receiver, "receiver").required().string().notEmpty();
		message.receiver = receiver;
		if (message.receiver == self.name) throw new Error(`Restricted to dispatch messages to itself, receiver: "${message.receiver}", dispatcher: "${self.name}"`);
		self._sendMessage(message);
	},
	init() {
		const self = this;
		ds.assert(self.name, 'Responder::init: "responder.name"').required().string().notEmpty();
		self._pending = {};
		self.children = [];
		if (self.parent) {
			if (self.parent.children.some(r => r.name == self.name)) throw new Error(`Responder "${self.name}" already registered on parent "${self.parent.name}"`);
			self.parent.children.push(self);
		}
		if (self.worker) {
			if (ds.isNode()) {
				ds.assert(self.workerPath, 'Responder::init: "workerPath"').required().string().notEmpty();
				self._worker = require('child_process').fork(self.workerPath);
				self._worker.on('message', message => {
					ds.assert(message, 'Responder::init: "message"').required().object();
					ds.assert(message.validated, 'Responder::init: "message.validated"').required().equals(true);
					self._sendMessage(message);
				});
			} else {
				throw new Error('Workers not implemented in browser yet, but it will be soon...');
			}
		}
	},
	free() {
		const self = this;
		if (self.parent) {
			self.parent.children = self.parent.children.filter(r => r != self);
			self.parent = null;
		}
		if (self._worker) {
			if (ds.isNode()) self._worker.kill();
			else {};
			self._worker = null;
		}
	}
});
if (ds.isNode()) {
	(() => {
		const libfs = require('fs');
		const libpath = require('path');
		const libcrypto = require('crypto');
		ds.red = a => `\x1b[31m${a}\x1b[0m`;
		ds.green = a => `\x1b[32m${a}\x1b[0m`;
		ds.yellow = a => `\x1b[33m${a}\x1b[0m`;
		ds.rm = p => { if (libfs.existsSync(p)) libfs.unlinkSync(p); };
		ds.rmrf = p => {
		    if (libfs.existsSync(p)) {
		        libfs.readdirSync(p).forEach(f => {
		            const pp = libpath.join(p, f);
		            if (libfs.lstatSync(pp).isDirectory()) rmrf(pp);
		            else libfs.unlinkSync(pp);
		        });
		        libfs.rmdirSync(p);
		    }
		}
		ds.cp = (s, d) => {
			const p = (libfs.existsSync(d) && libfs.lstatSync(d).isDirectory()) ? libpath.join(d, libpath.basename(s)) : d;
		    libfs.writeFileSync(p, libfs.readFileSync(s));
		}
		ds.cprf = (s, d, options) => {
			options = Object.assign({ contentsOnly: false }, options);
		    const p = options.contentsOnly ? d : libpath.join(d, libpath.basename(s));
		    if (!libfs.existsSync(p)) libfs.mkdirSync(p, { recursive: true });
		    if (libfs.lstatSync(s).isDirectory()) {
		        libfs.readdirSync(s).forEach(f => {
		            const pp = libpath.join(s, f);
		            if (libfs.lstatSync(pp).isDirectory()) cprf(pp, p, null);
		            else cp(pp, p);
		        });
		    }
		}
		ds.ht_begin = () => process.hrtime();
		ds.ht_end = ht => (ht = process.hrtime(ht), ht[0] == 0 ? (Math.floor(ht[1] / 1e6).toString() + ' ms') : (ht[0].toString() + ' s, ' + Math.floor(ht[1] / 1e6).toString() + ' ms'));
		const rnds8 = new Uint8Array(16);
		const byte2hex = [];
		for (let i = 0; i < 256; i++)
			byte2hex.push((i + 0x100).toString(16).substr(1));
		ds.uuid = () => {
			const rnds = libcrypto.randomFillSync(rnds8);
			rnds[6] = rnds[6] & 0x0f | 0x40;
			rnds[8] = rnds[8] & 0x3f | 0x80;
			return (byte2hex[rnds[0]] + byte2hex[rnds[1]] + byte2hex[rnds[2]] + byte2hex[rnds[3]] + '-' + byte2hex[rnds[4]] + byte2hex[rnds[5]] + '-' + byte2hex[rnds[6]] + byte2hex[rnds[7]] + '-' + byte2hex[rnds[8]] + byte2hex[rnds[9]] + '-' + byte2hex[rnds[10]] + byte2hex[rnds[11]] + byte2hex[rnds[12]] + byte2hex[rnds[13]] + byte2hex[rnds[14]] + byte2hex[rnds[15]]).toLowerCase();
		};
	})();
}