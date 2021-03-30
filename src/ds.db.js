// dependencies...
if (typeof ds == 'undefined') throw 'ds module required.';
// namespace...
ds.db = { SQL_LOG: true, SQL_LOG_THRESHOLD: 500 };
// libs...
const fslib = require('fs');
const pathlib = require('path');
// consts...
ds.db.datatypes = [
	{ driver: 'libpq', id: 'bigint', decl: 'bigint', common: 'int' },
	{ driver: 'libpq', id: 'int8', decl: 'bigint', common: 'int' },
	{ driver: 'libpq', id: 'int4', decl: 'int', common: 'int' },
	{ driver: 'libpq', id: 'int2', decl: 'smallint', common: 'int' },
	{ driver: 'libpq', id: 'numeric', decl: 'numeric', common: 'float' },
	{ driver: 'libpq', id: 'varchar', decl: 'varchar', common: 'string' },
	{ driver: 'libpq', id: 'date', decl: 'date', common: 'date' },
	{ driver: 'libpq', id: 'timestamp', decl: 'timestamp', common: 'datetime' },
	{ driver: 'libpq', id: 'int2', decl: 'smallint', common: 'bool' }, // <-- 1 ordinal
	{ driver: 'libpq', id: 'bool', decl: 'boolean', common: 'bool' },  // <-- 2 ordinal
	{ driver: 'libpq', id: 'text', decl: 'text', common: 'text' },
	{ driver: 'odbc', id: 'int', decl: 'int', common: 'int' },
	{ driver: 'odbc', id: 'bigint', decl: 'intbig', common: 'int' },
	{ driver: 'odbc', id: 'numeric', decl: 'numeric', common: 'float' },
	{ driver: 'odbc', id: 'nvarchar', decl: 'nvarchar', common: 'string' },
	{ driver: 'odbc', id: 'date', decl: 'date', common: 'date' },
	{ driver: 'odbc', id: 'datetime', decl: 'datetime', common: 'datetime' },
	{ driver: 'odbc', id: 'tinyint', decl: 'tinyint', common: 'bool' }, // <-- 1 ordinal
	{ driver: 'odbc', id: 'bool', decl: 'boolean', common: 'bool' }, 	// <-- 2 ordinal
	{ driver: 'odbc', id: 'nvarchar', decl: 'nvarchar(max)', common: 'text' }
]
ds.db.preprocessor = {
	now: conn => {
		if (conn.__type == 'libpq') return 'now()';
		else if (conn.__type == 'odbc') return 'getdate()';
		else throw new Error('ds.db.preprocessor.now: Connection type "' + conn.__type + '" is not supported.');
	},
	days_past: (conn, field) => {
		if (conn.__type == 'libpq') return 'date_part(\'day\', now() - ' + field + ')';
		else if (conn.__type == 'odbc') return 'datepart(day, getdate() - ' + field + ')';
		else throw new Error('ds.db.preprocessor.days_past: Connection type "' + conn.__type + '" is not supported.');
	},
	year: (conn, expr) => {
		if (conn.__type == 'libpq') return 'date_part(\'year\', ' + expr + ')';
		else if (conn.__type == 'odbc') return 'datepart(year, ' + expr + ')';
		else throw new Error('ds.db.preprocessor.year: Connection type "' + conn.__type + '" is not supported.');
	},
	month: (conn, expr) => {
		if (conn.__type == 'libpq') return 'date_part(\'month\', ' + expr + ')';
		else if (conn.__type == 'odbc') return 'datepart(month, ' + expr + ')';
		else throw new Error('ds.db.preprocessor.month: Connection type "' + conn.__type + '" is not supported.');
	},
	day: (conn, expr) => {
		if (conn.__type == 'libpq') return 'date_part(\'day\', ' + expr + ')';
		else if (conn.__type == 'odbc') return 'datepart(day, ' + expr + ')';
		else throw new Error('ds.db.preprocessor.day: Connection type "' + conn.__type + '" is not supported.');
	},
	string: (conn, size) => {
		if (conn.__type == 'libpq') return size == 'max' ? 'text' : `varchar(${size || '4000'})`;
		else if (conn.__type == 'odbc') return `nvarchar(${size || 'max'})`;
	},
	int: conn => {
		if (conn.__type == 'libpq') return 'int';
		else if (conn.__type == 'odbc') return 'int';
	},
	bigint: conn => {
		if (conn.__type == 'libpq') return 'bigint';
		else if (conn.__type == 'odbc') return 'bigint';
	},
	smallint: conn => {
		if (conn.__type == 'libpq') return 'smallint';
		else if (conn.__type == 'odbc') return 'smallint';
	},
	float: conn => {
		if (conn.__type == 'libpq') return 'numeric';
		else if (conn.__type == 'odbc') return 'numeric';
	},
	datetime: conn => {
		if (conn.__type == 'libpq') return 'timestamp';
		else if (conn.__type == 'odbc') return 'datetime';
	},
	bool: conn => {
		if (conn.__type == 'libpq') return 'smallint';
		else if (conn.__type == 'odbc') return 'tinyint';
	},
	text: conn => {
		if (conn.__type == 'libpq') return 'text';
		else if (conn.__type == 'odbc') return `nvarchar(max)`;
	},
	ident: (conn, expr) => {
		if (conn.__type == 'libpq') return `"${expr}"`;
		else if (conn.__type == 'odbc') return `[${expr}]`;
		else return expr;
	},
	identity: (conn, name) => {
		if (conn.__type == 'libpq') return `"${name}" bigserial primary key`;
		else if (conn.__type == 'odbc') return `[${name}] bigint identity(1, 1) primary key`;
		else return `${name} primary key`;
	}
}
// logging..
ds.db.__log = (severity, message) => {
	if (!ds.db.__log_path) {
		const opt1 = pathlib.join(process.cwd(), 'logs');
		const opt2 = process.cwd();
		if (fslib.existsSync(opt1)) ds.db.__log_path = pathlib.join(opt1, 'sql.log');
		else ds.db.__log_path = pathlib.join(opt2, 'sql.log');
	}
	const date = (new Date()).toISOString().replace('T', ' ').replace('Z', '');
	const log = `${date} ${(severity || '').toString().toUpperCase()} ${message || ''}\n`;
	fslib.appendFileSync(ds.db.__log_path, log);
}
// odbc for sqlsrv...
ds.db.__odbc_exec = (conn, sql, args) => {
	for (let key in args) {
		if (Number.isInteger(args[key]) || Number.isFinite(args[key])) args[key] = args[key].toString();
		else if (args[key] === undefined) args[key] = null;
	}
	const exec_args = [];
	const exec_sql = sql.replace(/\:\w+/g, a => (args || {}).hasOwnProperty(a.substr(1)) ? (exec_args.push(args[a.substr(1)]), '?') : a);
	const res = (() => {
					try { return conn.queryResultSync(exec_sql, exec_args); }
					catch(e) { e.__sql = exec_sql; e.__args = exec_args; throw e; };
				})();
	const data = res.fetchAllSync().map(row => {
		Object.keys(row).forEach(key => {
			if (ds.isDate(row[key]))
				row[key] = ds.Date.newFromDate(row[key]).toISODateTime();
		})
		return row;
	});
	const fields = res.getColumnNamesSync().map(c => ({ name: c, type: null }));
	const rowCount = res.getRowCountSync();
	res.closeSync();
	return { fields: fields, data: data, rowCount: rowCount };
}
ds.db.__odbc_connect = options => {
	const conn = require('odbc')();
	conn.__type = 'odbc';
	conn.catalog = options.catalog;
	conn.openSync((() => {
		const r = `Driver={${options.odbc_driver || 'ODBC Driver 13 for SQL Server'}};server=${options.host};database=${options.catalog};`;
		return (options.odbc_trusted) ? `${r}Trusted_Connection=Yes;` : `${r}uid=${options.user};pwd=${options.password};`;
	})());
	return conn;
}
ds.db.__odbc_disconnect = conn => {
	conn.closeSync();
}
// libpq...
ds.db.__libpq_parse_value = (value, type_oid) => {
	const parse_int = () => parseInt(value, 10);
	const parse_float = () => (new Number(value)).valueOf();
	const parse_bool = () => value === 'TRUE' || value === 't' || value === 'true' || value === 'y' || value === 'yes' || value === 'on' || value === '1';
	const parse_date = () => ds.Date.newFromISO(value).toISODateTime();
	switch (type_oid) {
		case 21: return parse_int(); break; // int2
		case 23: return parse_int(); break; // int4
		case 26: return parse_int(); break; // oid
		case 700: return parse_float(); break; // float4/real
		case 701: return parse_float(); break; // float8/double
		case 16: return parse_bool(); break;
		case 20: return parse_int(); break;
		case 21: return parse_int(); break;
		case 23: return parse_int(); break;
		case 26: return parse_int(); break;
		case 1700: return parse_float(); break;
		case 700: return parse_float(); break;
		case 701: return parse_float(); break;
		case 16: return parse_bool(); break;
		case 1114: return parse_date(); break;
		case 1184: return parse_date(); break;
		case 1115: return parse_date(); break;
		case 1182: return parse_date(); break;
		case 1185: return parse_date(); break;
		case 1082: return parse_date(); break;
		default: return value;
	}
}
ds.db.__libpq_exec = (conn, sql, args) => {
	const push_arg = arg => (exec_args.push(arg), '$' + exec_args.length.toString());
	const exec_args = [];
	const exec_sql = sql.replace(/\:\w+/g, a => (args || {}).hasOwnProperty(a.substr(1)) ? push_arg(args[a.substr(1)]) : a);
	conn.execParams(exec_sql, exec_args);
	if (conn.resultStatus() == 'PGRES_TUPLES_OK') {
		const fields = [];
		const data = [];
		for (let i = 0; i < conn.nfields(); i++) fields.push({ name: conn.fname(i), type: conn.ftype(i) });
		for (let r = 0; r < conn.ntuples(); r++) {
			const row = {};
			for (let f = 0; f < fields.length; f++) {
				if (conn.getisnull(r, f)) row[fields[f].name] = null;
				else row[fields[f].name] = ds.db.__libpq_parse_value(conn.getvalue(r, f), fields[f].type);
			}
			data.push(row);
		}
		return { fields: fields, data: data, rowCount: data.length };
	} else if (conn.resultStatus() == 'PGRES_COMMAND_OK') {
		return { rowCount: conn.cmdTuples() };
	} else throw new Error(`ds.db.__libpq_exec: Error executing command: "${conn.resultErrorMessage()}"\n${exec_sql}\n${JSON.stringify(exec_args)}`);
}
ds.db.__libpq_connect = options => {
	if (!ds.db.__libpq_lib) ds.db.__libpq_lib = require('libpq');
	const conn = new ds.db.__libpq_lib();
	conn.__type = 'libpq';
	conn.catalog = options.catalog;
	conn.connectSync('postgresql://' + options.user + ':' + options.password + '@' + options.host + ':' + (options.port || '5432') + '/' + options.catalog);
	conn.exec('SET client_min_messages TO WARNING');
	return conn;
}
ds.db.__libpq_disconnect = conn => {
	conn.finish();
}
// common...
ds.db.__begin = conn => {
	if (conn.__type == 'libpq') ds.db.exec(conn, 'begin');
	else if (conn.__type == 'odbc') conn.beginTransactionSync();
	else throw new Error('ds.db.begin: Connection type "' + conn.__type + '" is not supported.');
}
ds.db.__commit = conn => {
	if (conn.__type == 'libpq') ds.db.exec(conn, 'commit');
	else if (conn.__type == 'odbc') conn.commitTransactionSync();
	else throw new Error('ds.db.commit: Connection type "' + conn.__type + '" is not supported.');
}
ds.db.__rollback = conn => {
	if (conn.__type == 'libpq') ds.db.exec(conn, 'rollback');
	else if (conn.__type == 'odbc') conn.rollbackTransactionSync();
	else throw new Error('ds.db.rollback: Connection type "' + conn.__type + '" is not supported.');
}
// preprocessor...
ds.db.__preprocess_sql = (conn, sql) => {
	return sql.replace(/\{\{(.*?)\}\}/g, a => {
		const args = ds.args2arr(a.slice(2, -2));
		const fn = ds.db.preprocessor[args[0]];
		if (!fn) throw new Error('ds.db.__preprocess_sql: Macro command "' + args[0] + '" is not supported.');
		return fn.apply(null, [conn].concat(args.slice(1)));
	});
}
ds.db.__ident = (conn, name) => {
	if (conn.__type == 'odbc') return `[${name}]`;
	else return `"${name}"`;
}
// db...
ds.db.connect = options => {
	if (!options) throw new Error('ds.db.connect: "options" is required.');
	if (options.type == 'libpq') return ds.db.__libpq_connect(options);
	else if (options.type == 'odbc') return ds.db.__odbc_connect(options);
	else throw new Error('ds.db.connect: Connection type "' + options.type + '" is not supported.');
}
ds.db.disconnect = conn => {
	if (!conn) throw new Error('ds.db.disconnect: "conn" is required.');
	if (conn.__type == 'libpq') return ds.db.__libpq_disconnect(conn);
	else if (conn.__type == 'odbc') return ds.db.__odbc_disconnect(conn);
	else throw new Error('ds.db.disconnect: Connection type "' + conn.__type + '" is not supported.');
}
ds.db.exec = (conn, sql, args) => {
	if (!conn) throw new Error('ds.db.exec: "conn" is required.');
	if (!sql) throw new Error('ds.db.exec: "sql" is required.');
	const exec_sql = ds.db.__preprocess_sql(conn, sql);
	const start_t = (new Date()).getTime();
	try {
		let res;
		if (conn.__type == 'libpq') res = ds.db.__libpq_exec(conn, exec_sql, args);
		else if (conn.__type == 'odbc') res = ds.db.__odbc_exec(conn, exec_sql, args);
		else throw new Error('ds.db.exec: Connection type "' + conn.__type + '" is not supported.');
		const end_t = (new Date()).getTime();
		const duration_t = (end_t - start_t);
		if ((ds.db.SQL_LOG == true) && (duration_t > ds.db.SQL_LOG_THRESHOLD))
			ds.db.__log('INFO', `${duration_t} took query "${sql}" with args "${JSON.stringify(args || {})}"`);
		ds.db.__last_sql = sql;
		ds.db.__last_args = args;
		ds.db.__last_duration = duration_t;
		return res;
	} catch(e) {
		ds.db.__log('ERROR', (e.message || e.toString()) + ': ' + (e.__sql || sql).replace(/\n/g, '') + ' ' + JSON.stringify((e.__args || args) || {}));
		throw e;
	}
}
ds.db.transaction = (conn, fn) => {
	if (!conn) throw new Error('ds.db.transaction: "conn" is required.');
	if (!fn) throw new Error('ds.db.transaction: "fn" is required.');
	if (conn.__transaction) return fn();
	else {
		ds.db.__begin(conn);
		conn.__transaction = true;
		try {
			const value = fn();
			ds.db.__commit(conn);
			conn.__transaction = false;
			return value;
		} catch(e) {
			try { ds.db.__rollback(conn); }
			catch(e) { }
			conn.__transaction = false;
			throw e;
		}
	}
}
ds.db.select = (conn, table_name, fields, args) => {
	if (!conn) throw new Error('ds.db.select: "conn" is required.');
	if (!table_name) throw new Error('ds.db.select: "table_name" is required.');
	if (!fields) throw new Error('ds.db.select: "fields" is required.');
	if (fields != '*' && !Array.isArray(fields)) throw new Error('ds.db.select: "fields" must be array or equal "*".');
	const sql = `select ${fields == '*' ? '*' : (fields.map(f => `"${f}"`).join(', '))} from "${table_name}"` +
				(Object.keys(args || {}).length > 0 ? ` where ${Object.keys(args).map(key => `"${key}" = :${key}`).join(' and ')}` : '');
	return ds.db.exec(conn, sql, args);
}
ds.db.insert = (conn, table_name, args, return_id) => {
	if (!conn) throw new Error('ds.db.insert: "conn" is required.');
	if (!table_name) throw new Error('ds.db.insert: "table_name" is required.');
	if (!args) throw new Error('ds.db.insert: "args" is required.');
	let sql = 'insert into ' + ds.db.__ident(conn, table_name) + ' ';
	if (Object.keys(args).length > 0) {
		const sql_fields = '(' + Object.keys(args).map(key => ds.db.__ident(conn, key)).join(',') + ') ';
		const sql_values = 'values (' + Object.keys(args).map(key => ':' + key).join(',') + ') ';
		if (return_id) {
			if (conn.__type == 'libpq') sql += sql_fields + sql_values + 'returning id';
			else if (conn.__type == 'odbc') sql += sql_fields + 'output inserted.id ' + sql_values;
			else throw new Error('ds.db.insert: Connection type "' + conn.__type + '" is not supported.');
		} else sql += sql_fields + sql_values;
	} else {
		if (return_id) {
			if (conn.__type == 'libpq') sql += 'default values returning ' + ds.db.__ident(conn, 'id');
			else if (conn.__type == 'odbc') sql += 'output inserted.id default values';
			else throw new Error('ds.db.insert: Connection type "' + conn.__type + '" is not supported.');
		} else sql += 'default values';
	}
	const res = ds.db.exec(conn, sql, args);
	return return_id ? res.data[0].id : true;
}
ds.db.update = (conn, table_name, args, f1, v1, f2, v2, f3, v3) => {
	if (!conn) throw new Error('ds.db.update: "conn" is required.');
	if (!table_name) throw new Error('ds.db.update: "table_name" is required.');
	if (!args) throw new Error('ds.db.update: "args" is required.');
	if (!f1) throw new Error('ds.db.update: "f1" is required.');
	if (!v1) throw new Error('ds.db.update: "v1" is required.');
	const exec_args = Object.assign({}, args);
	let exec_sql = 'update ' + ds.db.__ident(conn, table_name) + ' set ' + Object.keys(exec_args).map(key => ds.db.__ident(conn, key) + ' = :' + key).join(' ,') + ' where ' + ds.db.__ident(conn, f1) + ' = :__v1';
	exec_args['__v1'] = v1;
	if (f2) {
		exec_sql += ' and ' + ds.db.__ident(conn, f2) + ' = :__v2';
		exec_args['__v2'] = v2;
	}
	if (f3) {
		exec_sql += ' and ' + ds.db.__ident(conn, f3) + ' = :__v3';
		exec_args['__v3'] = v3;
	}
	const res = ds.db.exec(conn, exec_sql, exec_args);
	return res.rowCount;
}
ds.db.delete = (conn, table_name, f1, v1, f2, v2, f3, v3) => {
	if (!conn) throw new Error('ds.db.delete: "conn" is required.');
	if (!table_name) throw new Error('ds.db.delete: "table_name" is required.');
	if (!f1) throw new Error('ds.db.delete: "f1" is required.');
	if (!v1) throw new Error('ds.db.delete: "v1" is required.');
	const exec_args = {};
	let exec_sql = 'delete from ' + ds.db.__ident(conn, table_name) + ' where ' + ds.db.__ident(conn, f1) + ' = :__v1';
	exec_args['__v1'] = v1;
	if (f2) {
		exec_sql += ' and ' + ds.db.__ident(conn, f2) + ' = :__v2';
		exec_args['__v2'] = v2;
	}
	if (f3) {
		exec_sql += ' and ' + ds.db.__ident(conn, f3) + ' = :__v3';
		exec_args['__v3'] = v3;
	}
	const res = ds.db.exec(conn, exec_sql, exec_args);
	return res.rowCount;
}
ds.db.merge = (conn, table_name, args, f1, v1, f2, v2, f3, v3) => {
	if (!conn) throw new Error('ds.db.merge: "conn" is required.');
	if (!table_name) throw new Error('ds.db.merge: "table_name" is required.');
	if (!args) throw new Error('ds.db.merge: "args" is required.');
	if (!f1) throw new Error('ds.db.merge: "f1" is required.');
	if (!v1) throw new Error('ds.db.merge: "v1" is required.');
	const sel_args = {};
	let sql = 'select count(*) as qty from ' + ds.db.__ident(conn, table_name) + ' where ' + ds.db.__ident(conn, f1) + ' = :__v1';
	sel_args['__v1'] = v1;
	if (f2) {
		sql += ' and ' + ds.db.__ident(conn, f2) + ' = :__v2';
		sel_args['__v2'] = v2;
	}
	if (f3) {
		sql += ' and ' + ds.db.__ident(conn, f3) + ' = :__v3';
		sel_args['__v3'] = v3;
	}
	if (ds.db.exec(conn, sql, sel_args).data[0].qty > 0) return ds.db.update(conn, table_name, args, f1, v1, f2, v2, f3, v3).rowCount;
	else {
		const ins_args = Object.assign({}, args, { [f1]: v1 });
		if (f2) ins_args[f2] = v2;
		if (f3) ins_args[f3] = v3;
		return ds.db.insert(conn, table_name, ins_args, false).rowCount;
	}
}
ds.db.table_exists = (conn, table_name, catalog, schema) => {
	if (!conn) throw new Error('ds.db.table_exists: "conn" is required.');
	if (!table_name) throw new Error('ds.db.table_exists: "table_name" is required.');
	let count;
	if (conn.__type == 'libpq') count = ds.db.__libpq_exec(conn, 'select 1 from "information_schema"."tables" where "table_name" = :name and "table_catalog" = :catalog and "table_schema" = :schema', { name: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'public') }).data.length;
	else if (conn.__type == 'odbc') count = ds.db.__odbc_exec(conn, 'select 1 from "information_schema"."tables" where "table_name" = :name and "table_catalog" = :catalog and "table_schema" = :schema', { name: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'dbo') }).data.length;
	else throw new Error(`ds.db.table_exists: Connection type "${conn.__type}" not supported.`);
	if (count == 0) return false;
	if (count > 1) throw new Error('ds.db.table_exists: More than one table found by name "' + table_name + '".');
	return true;
}
ds.db.field_exists = (conn, field_name, table_name, catalog, schema) => {
	if (!conn) throw new Error('ds.db.field_exists: "conn" is required.');
	if (!field_name) throw new Error('ds.db.field_exists: "field_name" is required.');
	if (!table_name) throw new Error('ds.db.field_exists: "table_name" is required.');
	let count;
	if (conn.__type == 'libpq') count = ds.db.__libpq_exec(conn, 'select 1 from "information_schema"."columns" where "column_name" = :name and "table_name" = :table and "table_catalog" = :catalog and "table_schema" = :schema', { name: field_name, table: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'public') }).data.length;
	else if (conn.__type == 'odbc') count = ds.db.__odbc_exec(conn, 'select 1 from "information_schema"."columns" where "column_name" = :name and "table_name" = :table and "table_catalog" = :catalog and "table_schema" = :schema', { name: field_name, table: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'dbo') }).data.length;
	else throw new Error(`ds.db.field_exists: Connection type "${conn.__type}" not supported.`);
	if (count == 0) return false;
	if (count > 1) throw new Error('ds.db.field_exists: More than one column found by name "' + field_name + '".');
	return true;
}
ds.db.fieldlist_exists = (conn, field_list, table_name, catalog, schema) => {
	if (!conn) throw new Error('ds.db.fieldlist_exists: "conn" is required.');
	if (!field_list) throw new Error('ds.db.fieldlist_exists: "field_list" is required.');
	if (!table_name) throw new Error('ds.db.fieldlist_exists: "table_name" is required.');
	if (!Array.isArray(field_list)) throw new Error('ds.db.fieldlist_exists: "field_list" is not an array.');
	return field_list.map(field_name => ({ name: field_name, exists: ds.db.field_exists(conn, field_name, table_name, catalog, schema) }));
}
ds.db.field_info = (conn, field_name, table_name, catalog, schema) => {
	if (!conn) throw new Error('ds.db.field_info: "conn" is required.');
	if (!field_name) throw new Error('ds.db.field_info: "field_name" is required.');
	if (!table_name) throw new Error('ds.db.field_info: "table_name" is required.');
	if (!ds.db.field_exists(conn, field_name, table_name, catalog, schema)) throw new Error(`ds.db.field_info: Field "${field_name}" does not exist in table "${table_name}".`);
	let row;
	if (conn.__type == 'libpq') row = ds.db.__libpq_exec(conn, 'select * from "information_schema"."columns" where "column_name" = :name and "table_name" = :table and "table_catalog" = :catalog and "table_schema" = :schema', { name: field_name, table: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'public') }).data[0];
	else if (conn.__type == 'odbc') row = ds.db.__odbc_exec(conn, 'select * from "information_schema"."columns" where "column_name" = :name and "table_name" = :table and "table_catalog" = :catalog and "table_schema" = :schema', { name: field_name, table: table_name, catalog: (catalog || conn.catalog), schema: (schema || 'dbo') }).data[0];
	else throw new Error(`ds.db.field_info: Connection type "${conn.__type}" not supported.`);
	const datatype = ds.db.datatypes.find(dt => dt.driver == conn.__type && dt.id == row.udt_name).id;
	if (!datatype) throw new Error(`ds.db.field_info: Datatype info not found for field "${field_name}" with data type "${row.udt_name}".`);
	return {
		name: field_name,
		datatype: datatype,
		length: row.character_maximum_length,
		nullable: row.is_nullable.toLowerCase() == 'yes' ? true : false,
		default: row.column_default
	}
}
ds.db.drop_table = (conn, table_name) => {
	const exists = ds.db.table_exists(conn, table_name);
	if (exists) {
		if (conn.__type == 'libpq') ds.db.exec(conn, `drop table "${table_name}"`);
		else if (conn.__type == 'odbc') ds.db.exec(conn, `drop table [${table_name}]`);
		else throw new Error(`ds.db.drop_table: Connection type "${conn.__type}" not supported.`);
	}
}
ds.db.drop_field = (conn, table_name, field_name) => {
	const exists = ds.db.table_exists(conn, table_name);
	if (exists) {
		if (conn.__type == 'libpq') ds.db.exec(conn, `alter table "${table_name}" drop column "${field_name}"`);
		else if (conn.__type == 'odbc') ds.db.exec(conn, `alter table [${table_name}] drop column [${field_name}]`);
		else throw new Error(`ds.db.drop_field: Connection type "${conn.__type}" not supported.`);
	}
}
ds.db.create_table_as = (conn, table_name, query) => {
	const exists = ds.db.table_exists(conn, table_name);
	if (!exists) {
		if (conn.__type == 'libpq') ds.db.exec(conn, `create table "${table_name}" as ${query}`);
		else if (conn.__type == 'odbc') ds.db.exec(conn, `select * into [${table_name}] from (${query}) as t`);
		else throw new Error(`ds.db.create_table_as: Connection type "${conn.__type}" not supported.`);
	} else throw new Error(`ds.db.create_table_as: Table "${table_name}" already exists.`);
}