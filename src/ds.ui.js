// dependencies...
if (typeof ds == 'undefined') throw 'ds.ui: ds module required.';
// ui...
ds.ui = {};
ds.ui.__styles = `
	html, body { margin: 0px; height: 100%; overflow: hidden; font-family: "Proxima Nova", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: normal; font-style: normal; font-size: 14px; }
	ul { list-style: none; margin: 0px; padding: 0px; }
	textarea, input[type="text"] { font-family: "Proxima Nova", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 14px; }
	textarea:focus, input:focus { outline: 0; }
	a { color: var(--text-color-link); text-decoration: none; }
	:root { --text-color: #333; --text-color-gray: #888888; --text-color-blue: #459fd8; --text-color-link: #3b73af; --text-color-red: #d85b45; --text-color-green: #009834; --text-color-yellow: #ffc700; --text-color-dimmed: #888888ab; --text-color-error: #a94442; --text-color-warning: #9a7639; --text-color-info: #31708f; --text-color-success: #3c763d; --border-color: #d7d7d7; --border-color-light: #efefef; --border-color-blue: #4AA7F0; --border-color-red: #d85b45; --border-color-error: #d04437; --border-color-warning: #ffd580; --border-color-info: #4AA7F0; --border-color-success: #d6e9c6; --background-color-light: #f9f9f9; --background-color: #f5f5f5; --background-color-selected: rgba(0, 0, 0, 0.04); --background-color-highlighted: #ebf2f9; --background-color-error: #f2dede; --background-color-warning: #fff7cb; --background-color-info: #d9edf7; --background-color-success: #dff0d8; --image-dimmed-filter: opacity(0.35); }
	.app { width: 100%; height: 100%; color: var(--text-color); }
	body * { flex-shrink: 0; }
	.row { display: flex; flex-flow: row; }
	.row-rev { display: flex; flex-flow: row-reverse; }
	.col { display: flex; flex-flow: column; }
	.col.mid { justify-content: center; }
	.row.mid { align-items: center; }
	.col.cen { align-items: center; }
	.row.cen { justify-content: center; }
	.col.right { align-items: flex-end; }
	.row.right { justify-content: flex-end; }
	.row.baseline { align-items: baseline; }
	.flex { flex: 1; min-height: 1px; min-width: 1px; }
	.wrap { flex-wrap: wrap; }
	.shrink { flex-shrink: 1; min-width: 0px; }
	.scroll { overflow-y: auto; }
	.oyh { overflow-y: hidden; }
	.oxh { overflow-x: hidden; }
	.oya { overflow-y: auto; }
	.oxa { overflow-x: auto; }
	.nosel { user-select: none; }
	.bt { border-top-width: 1px; border-top-style: solid; border-top-color: var(--border-color); }
	.br { border-right-width: 1px; border-right-style: solid; border-right-color: var(--border-color); }
	.bb { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: var(--border-color); }
	.bl { border-left-width: 1px; border-left-style: solid; border-left-color: var(--border-color); }
	.so { box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3); }
	.so2 { box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.075); }
	.pso { box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .2); }
	.sti { box-shadow: inset 0px 4px 4px -4px rgba(0, 0, 0, 0.09); }
	.rnd { border-radius: 50%; }
	.pt05 { padding-top: 4px; }
	.pr05 { padding-right: 6px; }
	.pb05 { padding-bottom: 4px; }
	.pl05 { padding-left: 6px; }
	.mt05 { margin-top: 4px; }
	.mr05 { margin-right: 6px; }
	.mb05 { margin-bottom: 4px; }
	.ml05 { margin-left: 6px; }
	.-mt05 { margin-top: -4px; }
	.-mr05 { margin-right: -6px; }
	.-mb05 { margin-bottom: -4px; }
	.-ml05 { margin-left: -6px; }
	.pt075 { padding-top: 6px; }
	.pr075 { padding-right: 9px; }
	.pb075 { padding-bottom: 6px; }
	.pl075 { padding-left: 9px; }
	.mt075 { margin-top: 6px; }
	.mr075 { margin-right: 9px; }
	.mb075 { margin-bottom: 6px; }
	.ml075 { margin-left: 9px; }
	.-mt075 { margin-top: -6px; }
	.-mr075 { margin-right: -9px; }
	.-mb075 { margin-bottom: -6px; }
	.-ml075 { margin-left: -9px; }
	.pt { padding-top: 8px; }
	.pr { padding-right: 12px; }
	.pb { padding-bottom: 8px; }
	.pl { padding-left: 12px; }
	.mt { margin-top: 8px; }
	.mr { margin-right: 12px; }
	.mb { margin-bottom: 8px; }
	.ml { margin-left: 12px; }
	.-mt { margin-top: -8px; }
	.-mr { margin-right: -12px; }
	.-mb { margin-bottom: -8px; }
	.-ml { margin-left: -12px; }
	.pt15 { padding-top: 12px; }
	.pr15 { padding-right: 18px; }
	.pb15 { padding-bottom: 12px; }
	.pl15 { padding-left: 18px; }
	.mt15 { margin-top: 12px; }
	.mr15 { margin-right: 18px; }
	.mb15 { margin-bottom: 12px; }
	.ml15 { margin-left: 18px; }
	.-mt15 { margin-top: -12px; }
	.-mr15 { margin-right: -18px; }
	.-mb15 { margin-bottom: -12px; }
	.-ml15 { margin-left: -18px; }
	.pt2 { padding-top: 16px; }
	.pr2 { padding-right: 24px; }
	.pb2 { padding-bottom: 16px; }
	.pl2 { padding-left: 24px; }
	.mt2 { margin-top: 16px; }
	.mr2 { margin-right: 24px; }
	.mb2 { margin-bottom: 16px; }
	.ml2 { margin-left: 24px; }
	.-mt2 { margin-top: -16px; }
	.-mr2 { margin-right: -24px; }
	.-mb2 { margin-bottom: -16px; }
	.-ml2 { margin-left: -24px; }
	.pt3 { padding-top: 24px; }
	.pr3 { padding-right: 36px; }
	.pb3 { padding-bottom: 24px; }
	.pl3 { padding-left: 36px; }
	.mt3 { margin-top: 24px; }
	.mr3 { margin-right: 36px; }
	.mb3 { margin-bottom: 24px; }
	.ml3 { margin-left: 36px; }
	.-mt3 { margin-top: -24px; }
	.-mr3 { margin-right: -36px; }
	.-mb3 { margin-bottom: -24px; }
	.-ml3 { margin-left: -36px; }
	.pt4 { padding-top: 32px; }
	.pr4 { padding-right: 48px; }
	.pb4 { padding-bottom: 32px; }
	.pl4 { padding-left: 48px; }
	.mt4 { margin-top: 32px; }
	.mr4 { margin-right: 48px; }
	.mb4 { margin-bottom: 32px; }
	.ml4 { margin-left: 48px; }
	.-mt4 { margin-top: -32px; }
	.-mr4 { margin-right: -48px; }
	.-mb4 { margin-bottom: -32px; }
	.-ml4 { margin-left: -48px; }
	.ty1 { transform: translateY(1px); }
	.ty2 { transform: translateY(2px); }
	.ty-1 { transform: translateY(-1px); }
	.ty-2 { transform: translateY(-2px); }
	.tx1 { transform: translateX(1px); }
	.tx2 { transform: translateX(2px); }
	.tx-1 { transform: translateX(-1px); }
	.tx-2 { transform: translateX(-2px); }
	.tx1.ty1 { transform: translate(1px, 1px); }
	.tx1.ty2 { transform: translate(1px, 2px); }
	.tx2.ty1 { transform: translate(2px, 1px); }
	.tx2.ty2 { transform: translate(2px, 2px); }
	.tx1.ty-1 { transform: translate(1px, -1px); }
	.tx1.ty-2 { transform: translate(1px, -2px); }
	.tx2.ty-1 { transform: translate(2px, -1px); }
	.tx2.ty-2 { transform: translate(2px, -2px); }
	.tx-1.ty1 { transform: translate(-1px, 1px); }
	.tx-1.ty2 { transform: translate(-1px, 2px); }
	.tx-2.ty1 { transform: translate(-2px, 1px); }
	.tx-2.ty2 { transform: translate(-2px, 2px); }
	.tx-1.ty-1 { transform: translate(-1px, -1px); }
	.tx-1.ty-2 { transform: translate(-1px, -2px); }
	.tx-2.ty-1 { transform: translate(-2px, -1px); }
	.tx-2.ty-2 { transform: translate(-2px, -2px); }
	.tx-50 { transform: translateX(-50%); }
	.ty-50 { transform: translateY(-50%); }
	.tx-50.ty-50 { transform: translate(-50%, -50%); }
	.lnk { color: var(--text-color-link); cursor: pointer; }
	.lnk:hover { text-decoration: underline; }
	.lnkp:hover *.lnk { text-decoration: underline; }
	.tac { text-align: center; }
	.tar { text-align: right; }
	.tam { text-align: middle; }
	.wsnw { white-space: nowrap; }
	.ib { display: inline-block; }
	.abs { position: absolute; }
	.bvl { text-shadow: rgb(255, 255, 255) 0px 1px 0px; }
	.norm { color: var(--text-color); }
	.white { color: white; }
	.gray { color: var(--text-color-gray); }
	.lightgray { color: #b3b3b3; }
	.blue { color: var(--text-color-blue); }
	.navy { color: var(--text-color-link); }
	.red { color: var(--text-color-red); }
	.green { color: var(--text-color-green); }
	.yellow { color: var(--text-color-yellow); }
	.err { color: var(--text-color-error); }
	.war { color: var(--text-color-warning); }
	.info { color: var(--text-color-info); }
	.succ { color: var(--text-color-success); }
	.strong { font-weight: bold; -webkit-font-smoothing: antialiased; }
	.sm { font-size: 12px; }
	.xsm { font-size: 10px; }
	.xxsm { font-size: 8px; }
	.lg { font-size: 16px; }
	.xlg { font-size: 18px; }
	.xxlg { font-size: 20px; }
	.fs13 { font-size: 13px; }
	.fs12 { font-size: 12px; }
	.fs11 { font-size: 11px; }
	.fs10 { font-size: 10px; }
	.fs9 { font-size: 9px; }
	.fs8 { font-size: 8px; }
	.fs14 { font-size: 14px; }
	.fs15 { font-size: 15px; }
	.fs16 { font-size: 16px; }
	.fs17 { font-size: 17px; }
	.fs18 { font-size: 18px; }
	.vatt { vertical-align: text-top; }
	.vat { vertical-align: top; }
	.vam { vertical-align: middle; }
	.thvr, .thvr * { color: var(--text-color-dimmed); }
	.thvr:hover, .thvr:hover *, .thvr.thvra, .thvr.thvra * { color: var(--text-color); }
	.dhvr.dhvrc, .dhvr .dhvrc { filter: var(--image-dimmed-filter); }
	.dhvr.dhvrc:hover, .dhvr:hover .dhvrc, .dhvr.dhvra.dhvrc, .dhvr.dhvra .dhvrc { filter: opacity(1); }
	.vhvr.vhvrc, .vhvr .vhvrc { visibility: hidden; }
	/*.vhvr:hover .vhvrc, .vhvr.vhvra .vhvrc { visibility: visible; }*/
	.vhvr.vhvrc:hover, .vhvr:hover .vhvrc, .vhvr.vhvra.vhvrc, .vhvr.vhvra .vhvrc { visibility: visible; }
	.dhvr2.dhvrc2, .dhvr2 .dhvrc2 { filter: var(--image-dimmed-filter); }
	.dhvr2.dhvrc2:hover, .dhvr2:hover .dhvrc2, .dhvr2.dhvra2.dhvrc2, .dhvr2.dhvra2 .dhvrc2 { filter: opacity(1); }
	.vhvr2.vhvrc2, .vhvr2 .vhvrc2 { visibility: hidden; }
	.vhvr2.vhvrc2:hover, .vhvr2:hover .vhvrc2, .vhvr2.vhvra2.vhvrc2, .vhvr2.vhvra2 .vhvrc2 { visibility: visible; }
	.hvr:hover, .hvra { background-color: var(--background-color-selected); }
	.hnd { cursor: pointer; }
	.op025 { opacity: 0.25; }
	.op05 { opacity: 0.5; }
	.op075 { opacity: 0.75; }
	.bkl { background-color: var(--background-color-light); }
	.bk { background-color: var(--background-color); }
	.bkw { background-color: white; }
	.bki { background-color: var(--background-color-info); }
	.bke { background-color: var(--background-color-error); }
	.bkwr { background-color: var(--background-color-warning); }
	.bks { background-color: var(--background-color-success); }
	.bkwg { background: linear-gradient(white, var(--background-color)); }
	.bsb { box-sizing: border-box; }
	.bsc { box-sizing: content-box; }
	.w01 { width: 10px; }
	.w02 { width: 20px; }
	.w03 { width: 30px; }
	.w04 { width: 40px; }
	.w05 { width: 50px; }
	.w07 { width: 70px; }
	.w08 { width: 80px; }
	.w09 { width: 90px; }
	.w1 { width: 100px; }
	.w11 { width: 110px; }
	.w12 { width: 120px; }
	.w13 { width: 130px; }
	.w14 { width: 140px; }
	.w15 { width: 150px; }
	.w16 { width: 160px; }
	.w17 { width: 170px; }
	.w18 { width: 180px; }
	.w19 { width: 190px; }
	.w2 { width: 200px; }
	.w25 { width: 250px; }
	.w275 { width: 275px; }
	.w3 { width: 300px; }
	.w35 { width: 350px; }
	.w4 { width: 400px; }
	.w45 { width: 450px; }
	.w5 { width: 500px; }
	.w55 { width: 550px; }
	.w6 { width: 600px; }
	.w65 { width: 650px; }
	.h05 { height: 50px; }
	.h06 { height: 60px; }
	.h01 { height: 10px; }
	.h02 { height: 20px; }
	.h03 { height: 30px; }
	.h04 { height: 40px; }
	.h05 { height: 50px; }
	.h07 { height: 70px; }
	.h08 { height: 80px; }
	.h09 { height: 90px; }
	.h1 { height: 100px; }
	.h2 { height: 200px; }
	.h3 { height: 300px; }
	.h4 { height: 400px; }
	.h5 { height: 500px; }
	.h6 { height: 600px; }
	.x64 { height: 64px; width: 64px; }
	.x48 { height: 48px; width: 48px; }
	.x42 { height: 42px; width: 42px; }
	.x36 { height: 36px; width: 36px; }
	.x32 { height: 32px; width: 32px; }
	.x28 { height: 28px; width: 28px; }
	.x26 { height: 26px; width: 26px; }
	.x24 { height: 24px; width: 24px; }
	.x23 { height: 23px; width: 23px; }
	.x22 { height: 22px; width: 22px; }
	.x21 { height: 21px; width: 21px; }
	.x20 { height: 20px; width: 20px; }
	.x19 { height: 19px; width: 19px; }
	.x18 { height: 18px; width: 18px; }
	.x17 { height: 17px; width: 17px; }
	.x16 { height: 16px; width: 16px; }
	.x15 { height: 15px; width: 15px; }
	.x14 { height: 14px; width: 14px; }
	.x13 { height: 13px; width: 13px; }
	.x12 { height: 12px; width: 12px; }
	.x11 { height: 11px; width: 11px; }
	.x10 { height: 10px; width: 10px; }
	.x9 { height: 9px; width: 9px; }
	.x8 { height: 8px; width: 8px; }
	.x7 { height: 7px; width: 7px; }
	.x6 { height: 6px; width: 6px; }
	.x5 { height: 5px; width: 5px; }
	.x4 { height: 4px; width: 4px; }
	.rtt180 { transform: rotate(180deg); }
	.ndt:empty { position: relative; min-height: 28px; }
	.ndt:empty::after { content: "нет данных"; position: absolute; top: 7px; text-align: center; font-size: 12px; color: gray; left: 50%; transform: translateX(-50%); }
	[data-badge] { position: relative; }
	[data-badge]::after { content: attr(data-badge); position: absolute; display: block; background-color: red; color: white; border-radius: 50%; top: -2px; right: -2px; width: 14px; height: 14px; text-align: center; font-family: "Open Sans", sans-serif; font-size: 9px; padding-top: 2px; box-sizing: border-box; }
	.__xmdlpnl_bk { position: absolute; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); left: 0px; top: 0px; z-index: 19; }
	.__xmdlpnl { position: absolute; border: 1px solid rgb(180, 180, 180); border-radius: 4px; box-shadow: 0px 0px 5px rgba(1, 1, 1, 0.2); left: 50%; top: 35%; transform: translate(-50%, -35%); }
	.__xfltctrl { position: absolute; z-index: 11; box-shadow: 0px 0px 50px rgba(1, 1, 1, 0.2); --border-color: #c1c1c1; }
	.__sbpad { padding-right: 16px; }
	@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(359deg); } }
	.spin { animation: spin 2s infinite linear; }
	@keyframes shake { from, to { transform: translate3d(0, 0, 0); } 10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); } 20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); } }
	.shake { animation-name: shake; animation-duration: 1s; animation-fill-mode: both; }
	@keyframes dimbk { 0% { background-color: rgba(0, 0, 0, 0); } 100% { background-color: rgba(0, 0, 0, 0.5); } }
	.dimbk { animation-name: dimbk; animation-duration: 3s; background-color: rgba(0, 0, 0, 0.5); }
	@keyframes lightenbk { 0% { background-color: rgba(255, 255, 255, 0); } 100% { background-color: rgba(255, 255, 255, 0.7); } }
	.lightenbk { animation-name: lightenbk; animation-duration: 3s; background-color: rgba(255, 255, 255, 0.7); }
	@keyframes rotate-forever { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
	.spinner { animation-duration: 0.75s; animation-iteration-count: infinite; animation-name: rotate-forever; animation-timing-function: linear; width: 10px; height: 10px; border: 3px solid #e4e4e4; border-right-color: transparent; border-radius: 50%; display: inline-block; }`;
ds.ui.__json2css = function(json, pretty_print = false) {
	let css = '';
	for (let selector in json) {
		css += selector + ' {';
		for (let property in json[selector]) css += (pretty_print ? '\n\t' : ' ') + property + ': ' + json[selector][property] + ';';
		css += (pretty_print ? '\n' : ' ') + '}' + (pretty_print ? '\n' : ' ');
	}
	return css;
}
ds.ui.__parsestyles = function(styles) {
	var hash = null;
	if (typeof styles == 'object') hash = ds.md5(JSON.stringify(styles));
	else if (typeof styles == 'string') hash = ds.md5(styles);
	else throw 'ds.ui.__parsestyles: Styles argument must be object or string.';
	var style_element = document.querySelector('#__ds_ui__styles');
	if (!style_element) {
		style_element = document.createElement('style');
		style_element.setAttribute('id', '__ds_ui__styles');
		document.head.appendChild(style_element);
	}
	var styles_str = style_element.textContent;
	if (styles_str.includes(hash)) return;
	styles_str += '\n/* ' + hash + ' */\n';
	styles_str += (typeof styles == 'object' ? ds.ui.__json2css(styles) : styles);
	style_element.textContent = styles_str;
}
ds.ui.__template_compile = function(template, scope, this_) {
	template = template.trim();
	const build_tree = template => {
		let lines = template.split('\n');
		let line_n = 0;
		let parts = [];
		let root_node = { args: ['@root'], children: [], parent: null };
		let current_node = root_node;
		for (let line of lines) {
			let trim_line = line.trim();
			if (trim_line[0] == '@') {
				let args = trim_line.split(' ');
				if (['@include'].includes(args[0])) current_node.children.push({ args: args, parent: current_node, children: [] });
				else if (args[0] == '@end') current_node = current_node.parent;
				else if (args[0].substr(0, 2) == '@@') {
					let node = { args: args, parent: current_node, children: [] };
					current_node.children.push(node);
					parts.push(node);
				} else {
					let node = { args: args, parent: current_node, children: [] };
					current_node.children.push(node);
					current_node = node;
				}
			} else current_node.children.push(line);
		}
		return { root_node: root_node, parts: parts };
	}
	const process_node = node => {
		let result = '';
		let process_children = () => node.children.forEach(node => result += process_node(node));
		if (typeof node == 'string') return node + '\n';
		if (typeof node == 'object') {
			if (node.args[0] == '@root') process_children();
			else if (node.args[0] == '@extend') {
				let tree = build_tree(eval(node.args[1]));
				tree.parts.forEach(part_node => {
					node.children.forEach(child_node => {
						if (!child_node.args) throw new Error('ds.ui.__template_compile: Invalid @extend syntax.');
						if (child_node.args[0] == '@slot' && ('@@' + child_node.args[1]) == part_node.args[0]) {
							child_node.args = ['@root'];
							let part_node_index = part_node.parent.children.indexOf(part_node);
							part_node.parent.children.splice(part_node_index, 1, child_node);
							child_node.__part_processed = true;
						}
					});
				});
				node.children
				.filter(child_node => child_node.args[0] == '@slot' && !child_node.__part_processed)
				.forEach(child_node => {
					tree.root_node.children.forEach(tree_child_node => {
						if (tree_child_node.args[0] == '@extend') tree_child_node.children.push(child_node);
					});
				});
				node.children = [tree.root_node];
				process_children();
			} else if (node.args[0] == '@include') {
				let tree = build_tree(eval(node.args[1]));
				node.children = [tree.root_node];
				process_children();
			} else if (node.args[0] == '@if') {
				let condition = node.args.slice(1).join(' ');
				let condition_result = ds.evalScope(condition, scope, this_);
				if (condition_result) process_children();
			}
		}
		return result;
	}
	return process_node(build_tree(template).root_node, null).replace(/{{[\s\S]+?}}/g, a => '{{' + encodeURI(a.slice(2, -2).trim()) + '}}');
}
ds.ui.__template_process = function(template, parent_directive, root_constraint = false) {
	template = template.trim();
	const clone_node = (node, from_attr_index, attr_length) => {
		let new_node = document.createElement(node.tagName);
		new_node.innerHTML = node.innerHTML;
		for (let i = from_attr_index; i < attr_length; i++) new_node.setAttribute(node.attributes[i].name, node.attributes[i].value);
		return new_node;
	}
	const process_node = (node, parent) => {
		let needs_process_children = true;
		if (node.toString().includes('Element]')) {
			let length = node.attributes.length;
			for (let i = 0; i < length; i++) {
				let attribute = node.attributes[i];
				if (attribute.name[0] == '#' || attribute.name == 'x-ref') {
					let mod_name = attribute.name[0] == '#' ? attribute.name.slice(1) : attribute.value;
					if (mod_name.includes('-')) {
						mod_name = mod_name.split('-').map(token => token[0].toUpperCase() + token.slice(1)).join('');
						mod_name = mod_name[0].toLowerCase() + mod_name.slice(1);
					}
					ds.ui.__RefDirective.new({ node: node, name: mod_name, parent: parent });
				} else if (attribute.name == 'x-if') {
					for (let x = 0; x < length; x++) {
						if (node.attributes[x].name == 'x-for') throw 'ds.ui.__template_process: You cannot use "x-if" and "x-for" on the same DOM node.';
					}
					parent = ds.ui.__IfDirective.new({ node: node, expression: attribute.value, parent: parent });
				} else if (attribute.name == 'x-show') ds.ui.__ShowDirective.new({ node: node, expression: attribute.value, parent: parent });
				else if (attribute.name == 'x-view') ds.ui.__ViewDirective.new({ node: node, expression: attribute.value, parent: parent });
				else if (attribute.name.slice(0, 4) == 'x-on') ds.ui.__EventDirective.new({ node: node, event: attribute.name.split(':')[1], expression: attribute.value, parent: parent });
				else if (attribute.name == 'x-for') {
					for (let x = 0; x < length; x++) {
						if (node.attributes[x].name == 'x-if') throw 'ds.ui.__template_process: You cannot use "x-if" and "x-for" on the same DOM node.';
					}
					ds.ui.__ForDirective.new({ node: node, expression: attribute.value, template: clone_node(node, i + 1, length).outerHTML, parent: parent });
					needs_process_children = false;
					break;
				} else if (attribute.name.slice(0, 6) == 'x-bind') ds.ui.__TextDirective.new({ object: node, key: attribute.name.split(':')[1], expression: attribute.value, parent: parent, bind: true });
				else if (attribute.value.includes('{{') && attribute.value.includes('}}')) {
					ds.ui.__TextDirective.new({ object: attribute, key: 'value', expression: attribute.value, parent: parent });
				}
			}
		} else if (node.toString().includes('Text]') && node.textContent.includes('{{') && node.textContent.includes('}}')) {
			ds.ui.__NodeDirective.new({ node: node, parent: parent });
		}
		if (!needs_process_children) return;
		for (let i = 0; i < node.childNodes.length; i++) process_node(node.childNodes[i], parent);
	}
	let wrapper_element = document.createElement('div');
	wrapper_element.innerHTML = template;
	if (root_constraint && wrapper_element.children.length == 0) throw new Error('ds.ui.__template_process: Template is incorrect, 0 elements are created.');
	if (root_constraint && wrapper_element.children.length > 1) throw new Error('ds.ui.__template_process: Template must contain one root element.');
	if (root_constraint && wrapper_element.children[0].hasAttribute('x-for')) throw new Error('ds.ui.__template_process: You can\'t use "x-for" directive for root element.');
	if (root_constraint && wrapper_element.children[0].hasAttribute('x-if')) throw new Error('ds.ui.__template_process: You can\'t use "x-if" directive for root element.');
	process_node(wrapper_element, parent_directive);
	return [].map.call(wrapper_element.childNodes, node => node); // <-- to convert it to regular array of elements...
}
ds.ui.__exprparts_transpile = function(expr) {
	// lazy assignment...
	return expr.replace(/[A-Za-z0-9._]+\s+\|\|\=/g, m => {
		const [l, r] = m.split('||=');
		if (l === null || l === undefined || l === '') return m;
		else return `${l.trim()} = ${l.trim()} ||`;
	});
};
ds.ui.__exprparts_exec = function(parts, scope, this_) {
	const proc = (result, prev_result) => {
		if (result === null || result === undefined) return null;
		else if (ds.isFunction(result)) {
			if (ds.isArray(prev_result)) return prev_result.map(result);
			else return result.call(null, prev_result);
		} else return result;
	}
	const next = (index, prev_result) => {
		if (parts[index] === null || parts[index] === undefined) return prev_result;
		let result = ds.evalScope(ds.ui.__exprparts_transpile(parts[index]), scope, this_);
		if (ds.isPromise(result)) return result.then(result => next(index + 1, proc(result, prev_result)));
		else return next(index + 1, proc(result, prev_result));
	}
	return next(0, null);
}
ds.ui.__Directive = ds.Object.extend({
	parent: null,
	children: null,
	scope: null,
	this: null,
	extendScope() {
		const self = this;
		var args = [];
		for (let i = 0; i < arguments.length; i++) args.push(arguments[i]);
		return ds.isArray(self.scope) ? self.scope.concat(args) : [self.scope].concat(args);
	},
	update() { },
	updateChildren() {
		const self = this;
		self.children.forEach(directive => directive.update());
	},
	init() {
		const self = this;
		if (!self.children) self.children = [];
		if (self.parent) self.parent.children.push(self);
		if (!self.scope) self.scope = self.parent ? self.parent.scope : null;
		if (!self.this) self.this = self.parent ? self.parent.this : null;
		if (!self.scope) throw new Error('ds.ui.__Directive: Scope required.');
		if (!self.this) throw new Error('ds.ui.__Directive: "this" required.');
	},
	free() {
		const self = this;
		self.children.forEach(directive => directive.free());
		self.children = [];
		ds.Object.free.call(self);
	}
});
ds.ui.__NodeDirective = ds.ui.__Directive.extend({
	_anchor_node: null,
	_nodes: null,
	_exprs: null,
	node: null,
	_removeNodes(nodes) {
		const self = this;
		nodes.forEach(node => {
			if (node.__view && node.__view.free && ds.isFunction(node.__view.free)) node.__view.free();
			node.__view = null;
			node.remove();
		});
	},
	_processExprResult(value) {
		const self = this; 
		var nodes = [];
		if (ds.isArray(value)) {
			value.filter(item => item !== undefined && item !== null).forEach(item => {
				if (item instanceof HTMLElement) nodes.push(item);
				else if (item instanceof Node) nodes.push(item);
				else if (item.element && item.element instanceof HTMLElement) nodes.push(item.element)
				else if (item.element && item.element instanceof Node) nodes.push(item.element)
				else if (ds.isFunction(item)) nodes.push(document.createTextNode(item()));
				else nodes.push(document.createTextNode(item));
			});
		} else {
			if (value === null || value === undefined) nodes.push(document.createTextNode(''));
			else if (value instanceof HTMLElement) nodes.push(value);
			else if (value instanceof Node) nodes.push(value);
			else if (value.element && value.element instanceof HTMLElement) nodes.push(value.element);
			else if (value.element && value.element instanceof Node) nodes.push(value.element);
			else if (ds.isFunction(value)) nodes.push(document.createTextNode(value()));
			else nodes.push(document.createTextNode(value));
		};
		return nodes;
	},
	_processResults(results) {
		const self = this;
		if (self.__freed) return; // <-- if there is an async directives they might finish when view is already freed.
		var new_nodes = [];
		results.forEach(node => {
			if (ds.isArray(node)) new_nodes = new_nodes.concat(node);
			else new_nodes.push(node);
		});
		if (new_nodes.length == 0) new_nodes = [document.createComment('')];
		if (self._nodes.length == new_nodes.length && self._nodes.every((node, index) => new_nodes[index] == node)) return;
		var prev_nodes = self._nodes;
		var parentNode = self._anchor_node.parentNode;
		var insertFragment = document.createDocumentFragment();
		new_nodes.forEach(node => insertFragment.appendChild(node));
		parentNode.insertBefore(insertFragment, self._anchor_node);
		new_nodes.forEach(node => {
			var node_index_in_prev = prev_nodes.indexOf(node);
			if (node_index_in_prev > -1) {
				prev_nodes.splice(node_index_in_prev, 1);
			}
		});
		self._removeNodes(prev_nodes);
		self._nodes = new_nodes;
	},
	update() {
		const self = this;
		ds.ui.__Directive.update.call(self);
		var results = [];
		for (let part of self._exprs) {
			if (part.type == 'text') {
				if (part.text.trim() != '') results.push(document.createTextNode(part.text));
			} else if (part.type == 'expr') {
				var result = ds.ui.__exprparts_exec(part.parts, self.scope, self.this);
				if (ds.isPromise(result)) results.push(result.then(value => self._processExprResult(value)));
				else results.push(self._processExprResult(result));
			}
		};
		if (results.some(ds.isPromise)) Promise.all(results).then(results => self._processResults(results));
		else self._processResults(results);
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.node) throw new Error('ds.ui.__NodeDirective: Node required.');
		self._nodes = [self.node];
		self._exprs = self.node.textContent.trim().split('{{').join('$$${{').split('}}').join('}}$$$').split('$$$').map(item => {
			if (item.slice(0, 2) == '{{' && item.slice(-2) == '}}') return { type: 'expr', parts: decodeURI(item.slice(2, -2).trim()).split('|>').map(expr => expr.trim()) };
			else return { type: 'text', text: item };
		});
		self._anchor_node = document.createTextNode('');
		self.node.textContent = '';
		self.node.parentNode.insertBefore(self._anchor_node, self.node);
	},
	free() {
		const self = this;
		self._removeNodes(self._nodes);
		ds.ui.__Directive.free.call(self);
	}
});
ds.ui.__RefDirective = ds.ui.__Directive.extend({
	node: null,
	name: null,
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.node) throw new Error('ds.ui.__RefDirective: Node required.');
		if (!self.name) throw new Error('ds.ui.__RefDirective: Name required.');
		self.this[self.name] = self.node;
	}
});
ds.ui.__IfDirective = ds.ui.__Directive.extend({
	_emptyNode: null,
	_lastResult: null,
	_lastNode: null,
	node: null,
	expression: null,
	update() {
		const self = this;
		ds.ui.__Directive.update.call(self);
		var result = ds.evalScope(self.expression, self.scope, self.this);
		if (self._lastResult !== result) {
			self._lastResult = result;
			if (!result) {
				self._lastNode.parentNode.replaceChild(self._emptyNode, self._lastNode);
				self._lastNode = self._emptyNode;
			} else {
				self._lastNode.parentNode.replaceChild(self.node, self._lastNode);
				self._lastNode = self.node;
			}
		}
		if (result) self.updateChildren();
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.expression) throw new Error('ds.ui.__IfDirective: Expression required.');
		if (!self.node) throw new Error('ds.ui.__IfDirective: Node required.');
		self._emptyNode = document.createComment('');
		self._lastNode = self.node;
	}
});
ds.ui.__ShowDirective = ds.ui.__Directive.extend({
	_lastResult: null,
	node: null,
	expression: null,
	update() {
		const self = this;
		ds.ui.__Directive.update.call(self);
		var result = ds.evalScope(self.expression, self.scope, self.this);
		if (self._lastResult !== result) {
			self._lastResult = result;
			if (result) self.node.style.display = '';
			else self.node.style.display = 'none';	
		}
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.expression) throw 'ds.ui.__ShowDirective: Expression required.';
		if (!self.node) throw 'ds.ui.__ShowDirective: Node required.';
	}
});
ds.ui.__ForDirective = ds.ui.__Directive.extend({
	_arrayName: null,
	_itemName: null,
	_iteratorType: null,
	_nodes: null,
	node: null,
	expression: null,
	template: null,
	options: null,
	_processEachItem(item, index, array) {
		const self = this;
		var item_scope = {
			[self._itemName]: item,
			index: index,
			array: array
		}; 
		var root_directive = ds.ui.__Directive.new({ parent: self, scope: self.extendScope(item_scope) });
		var element = ds.ui.__template_process(self.template, root_directive)[0];
		root_directive.updateChildren();
		if (self._options.preserve_element) item[self._options.preserve_element] = element;
		if (self._options.preserve_item) element[self._options.preserve_item] = item;
		return element;
	},
	update() {
		const self = this;
		ds.ui.__Directive.update.call(self);
		var new_nodes = [];
		var array = ds.evalScope(self._arrayName, self.scope, self.this);
		if (array) {
			self.children = [];
			if (self._iteratorType == 'of') {
				array.forEach((item, index) => new_nodes.push(self._processEachItem(item, index, array)));
			} else {
				Object.keys(array).forEach((item, index) => new_nodes.push(self._processEachItem(item, index, array)));
			}	
		}
		var parent_node = self._nodes[0].parentNode;
		if (new_nodes.length == 0) new_nodes = [document.createComment('')];
		new_nodes.forEach(node => parent_node.insertBefore(node, self._nodes[0]));
		self._nodes.forEach(node => parent_node.removeChild(node));
		self._nodes = new_nodes;
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.expression) throw 'ds.ui.__ForDirective: Expression required.';
		if (!self.node) throw 'ds.ui.__ForDirective: Node required.';
		if (!self.template) throw 'ds.ui.__ForDirective: Template required.';
		let [for_expression, options] = self.expression.split(' | ').map(i => i.trim());
		if (for_expression.includes(' of ')) {
			[self._itemName, self._arrayName] = for_expression.split(' of ').map(i => i.trim());
			self._iteratorType = 'of';
		} else if (for_expression.includes(' in ')) {
			[self._itemName, self._arrayName] = for_expression.split(' in ').map(i => i.trim());
			self._iteratorType = 'in';
		}
		self._options = options ? ds.args2obj(options) : {};
		if (!self._arrayName || !self._itemName || !self._iteratorType) throw 'ds.ui.__ForDirective: Invalid each expression "' + self.expression + '".';
		if (['view', 'self'].includes(self._itemName)) throw 'ds.ui.__ForDirective: Forbidden array item name in each expression "' + self.expression + '".';
		self._nodes = [self.node];
	},
	free() {
		const self = this;
		ds.ui.__Directive.free.call(self);
	}
});
ds.ui.__EventDirective = ds.ui.__Directive.extend({
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.expression) throw 'ds.ui.__EventDirective: Expression required.';
		if (!self.node) throw 'ds.ui.__EventDirective: Node required.';
		if (!self.event) throw 'ds.ui.__EventDirective: Event required.';
		self.node.addEventListener(self.event, function(e) {
			ds.evalScope(self.expression, self.extendScope({ e: e, self: self.this }), this);
		});
	}
});
ds.ui.__TextDirective = ds.ui.__Directive.extend({
	_parts: null,
	object: null,
	key: null,
	expression: null,
	bind: false,
	update() {
		const self = this;
		ds.ui.__Directive.update.call(self);
		const setValue = value => {
			if (self.bind) {
				if (value === null || value === undefined || value === '') {
					if (!!self.object.hasAttribute && self.object.hasAttribute(self.key))
						self.object[self.key] = value;
				} else self.object[self.key] = value;
			} else self.object[self.key] = value;
		}
		var results = [];
		for (let part of self._parts) {
			if (part.type == 'text') results.push(part.text);
			else if (part.type == 'expr') {
				var result = ds.ui.__exprparts_exec(part.parts, self.scope, self.this);
				if (ds.isPromise(result)) results.push(result.then(value => value === null || value === undefined ? '' : value.toString()));
				else results.push(result === null || result === undefined ? '' : result.toString());
			}
		};
		if (results.some(ds.isPromise)) Promise.all(results).then(results => setValue(results.join('')));
		else setValue(results.join(''));
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.object) throw 'ds.ui.__TextDirective: Object required.';
		if (!self.key) throw 'ds.ui.__TextDirective: Key required.';
		if (!self.expression) throw 'ds.ui.__TextDirective: Key required.';
		self._parts = self.expression.split('{{').join('$$${{').split('}}').join('}}$$$').split('$$$').map(item => {
			if (item.slice(0, 2) == '{{' && item.slice(-2) == '}}') return { type: 'expr', parts: decodeURI(item.slice(2, -2).trim()).split('|>').map(expr => expr.trim()) };
			else return { type: 'text', text: item };
		});
	}
});
ds.ui.__PropertyDirective = ds.ui.__Directive.extend({
	node: null,
	expression: null,
	property: null,
	update() {
		const self = this;
		self.node[self.property] = ds.evalScope(self.expression, self.scope, self.this);
	},
	init() {
		const self = this;
		ds.ui.__Directive.init.call(self);
		if (!self.expression) throw 'ds.ui.__PropertyDirective: Expression required.';
		if (!self.node) throw 'ds.ui.__PropertyDirective: Node required.';
		if (!self.property) throw 'ds.ui.__PropertyDirective: Property required.';
	}
});
ds.ui.__parsestyles(ds.ui.__styles);
ds.ui.View = ds.Object.extend({
	_rootDirective: null,
	_tagName: 'div',
	_className: '', // <-- always living classes...
	_visible: true,
	className: '', // <-- extra classes by user...
	style: null, // <-- extra styles by user...
	template: null,
	this: null,
	element: null,
	get visible() { return this._visible; },
	set visible(value) {
		this._visible = value;
		if (this.element) this.element.style.setProperty('display', this._visible ? '' : 'none');
		if (this._visible) this.onshow();
	},
	setProps(props) {
		const self = this;
		Object.keys(props).forEach(key => self['_' + key] = props[key]);
		self.update();
		return self;
	},
	onshow() { },
	onresize() { },
	fadeIn() {
		const self = this;
		self.element.style.opacity = 0;
		self.visible = true;
		return new Promise((resolve, reject) => {
			ds.ui.element_animate(self.element, 50, { opacity: 0 }, { opacity: 1 }, () => {
				resolve();
			});	
		});
	},
	fadeOut() {
		const self = this;
		if (!self._visible) return Promise.resolve(true);
		self.element.style.opacity = 1;
		return new Promise((resolve, reject) => {
			ds.ui.element_animate(self.element, 50, { opacity: 1 }, { opacity: 0 }, () => {
				self.visible = false;
				resolve();
			});	
		});
	},
	appendTo(element) {
		const self = this;
		element.appendChild(self.element);
	},
	update() {
		const self = this;
		if (!self.element) return;
		if (self._rootDirective) self._rootDirective.updateChildren();
		((self._className || '') + ' ' + (self.className || '')).split(' ').filter(c => !!c).forEach(c => self.element.classList.add(c));
		self.element.style.setProperty('display', self.visible ? '' : 'none');
		Object.keys(self.style || {}).forEach(key => self.element.style.setProperty(key, (self.style || {})[key]));
		return self;
	},
	needsUpdate() {
		const self = this;
		if (self._needsUpdate_promise) return self._needsUpdate_promise;
		return self._needsUpdate_promise = new Promise(resolve => {
			window.requestAnimationFrame(() => {
				self._needsUpdate_promise = null;
				if (self.__freed) return;
				try { self.update(); }
				finally { resolve(); }
			});
		});
	},
	init() {
		const self = this;
		if (!self.this) self.this = self;
		if (!self._tagName && !self.template) throw 'ds.ui.View: Template or TagName not specified.';
		if (self.template) {
			self._rootDirective = ds.ui.__Directive.new({ scope: [{ self: self.this }], this: self.this });
			self._compiledTemplate = ds.ui.__template_compile(self.template, [{ self: self.this }], self.this);
			self.element = ds.ui.__template_process(self._compiledTemplate, self._rootDirective, true)[0];
		} else self.element = document.createElement(self._tagName);
		self.update();
		self.element.__view = self;
	},
	free() {
		const self = this;
		if (self._rootDirective) self._rootDirective.free();
		if (self.element) self.element.remove();
		self._rootDirective = null;
		self.element = null;
		ds.Object.free.call(self);
	},
	extend(obj, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10) {
		if (obj.hasOwnProperty('styles')) ds.ui.__parsestyles(obj.styles);
		return ds.Object.extend.call(this, obj, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10);
	}
});
ds.ui.Controller = ds.Object.extend({
	template: null, // <-- this is used first
	viewClass: null,
	view: null,
	_load() {
		const self = this;
		if (!self.viewClass && !self.template) throw 'ds.ui.Controller: ViewClass and Template not specified.';
		if (self.template) self.viewClass = ds.ui.View.extend({ template: self.template });
		self.view = self.viewClass.new({ this: self });
		self.onload();
	},
	onload() {},
	free() {
		const self = this;
		if (self.view) self.view.free();
		self.view = null;
		ds.Object.free.call(self);
	},
	new(args) {
		var obj = ds.Object.new.call(this, args);
		obj._load();
		return obj;
	},
	extend(obj, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10) {
		if (obj.hasOwnProperty('styles')) ds.ui.__parsestyles(obj.styles);
		return ds.Object.extend.call(this, obj, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10);
	}
});
ds.ui.Floating = function(target) {
	if (!ds.isPrototypeOf(target, ds.ui.View)
	&& !ds.isPrototypeOf(target, ds.ui.Controller)) throw 'ds.ui.Floating: Target must be View or Controller subprototype.';
	ds.Events('open', 'close')(target);
	target._initFloating = function() {
		const self = this;
		if (self.__floating_inited) return;
		let element = ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element;
		self._floatingDragInfo = { start: { left: 0, top: 0 } };
		self._floatingDragHelper = ds.ui.DragHelper.new();
		self._floatingDragHelper.on('begin', () => {
			self._floatingDragInfo.start.left = element.offsetLeft;
			self._floatingDragInfo.start.top = element.offsetTop;
		});
		self._floatingDragHelper.on('drag', offset => {
			let left = self._floatingDragInfo.start.left + offset.x;
			let top = self._floatingDragInfo.start.top + offset.y;
			if (top < 0) top = 0;
			if (left < 0) left = 0;
			if ((top + element.clientHeight) > window.innerHeight) top = window.innerHeight - element.clientHeight;
			if ((left + element.clientWidth) > window.innerWidth) left = window.innerWidth - element.clientWidth;
			element.style.setProperty('left', left.toString() + 'px');
			element.style.setProperty('top', top.toString() + 'px');
		});
		self.__floating_inited = true;
	}
	target.openFloating = function(options) {
		const self = this;
		let element = ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element;
		options = Object.assign({ center: false, x: 0, y: 0 }, options);
		self._initFloating();
		element.classList.add('__xfltctrl');
		document.body.appendChild(element);
		if (options.center) {
			element.style.setProperty('left', parseInt(((document.body.clientWidth - element.clientWidth) / 2), 10).toString() + 'px');
			element.style.setProperty('top', parseInt(((document.body.clientHeight - element.clientHeight) / 2) * 0.75, 10).toString() + 'px');
		} else if ((options.x !== null || options.x !== undefined) && (options.y !== null || options.y !== undefined)) {
			element.style.setProperty('left', options.x.toString() + 'px');
			element.style.setProperty('top', options.y.toString() + 'px');
		}
		self._trigger('open');
	}
	target.closeFloating = function() {
		const self = this;
		let element = ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element;
		element.classList.remove('__xfltctrl');
		element.remove();
		self._trigger('close');
		if (self.freeOnClose) self.free();
	}
}
ds.ui.Modal = function(target) {
	if (!ds.isPrototypeOf(target, ds.ui.View)
	&& !ds.isPrototypeOf(target, ds.ui.Controller)) throw 'ds.ui.Modal: Target must be View or Controller subprototype.';
	ds.Events('open', 'close')(target);
	target.closeModal = function(modalResult) {
		const self = this;
		let element = ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element;
		element.classList.remove('__xmdlpnl');
		element.remove();
		self.__background_element.remove();
		self.__background_element = null;
		if (ds.isFunction(self.__modal_callback)) self.__modal_callback.call(null, modalResult);
		self._trigger('close');
		if (self.freeOnClose) self.free();
	}
	target.openModal = function(callback) {
		const self = this;
		let element = ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element;
		element.classList.add('__xmdlpnl');
		self.__modal_callback = callback;
		self.__background_element = ds.ui.element('div.__xmdlpnl_bk[style="visibility:hidden"]', document.body);
		self.__background_element.appendChild(element);
		self.__background_element.style.setProperty('visibility', 'visible');
		self._trigger('open');
	}
}
ds.ui.Popup = function(target) {
	if (!ds.isPrototypeOf(target, ds.ui.View)
	&& !ds.isPrototypeOf(target, ds.ui.Controller)) throw 'ds.ui.Popup: Target must be View or Controller subprototype.';
	ds.Events('open', 'close')(target);
	target.closePopup = function() {
		const self = this;
		if (!self._popupPopupHelper) return;
		self._popupPopupHelper.close();
	}
	target.openPopup = function(x, y) {
		const self = this;
		if (!self._popupPopupHelper) {
			self._popupPopupHelper = ds.ui.PopupHelper.new({ target: ds.isPrototypeOf(self, ds.ui.Controller) ? self.view.element : self.element });
			self._popupPopupHelper.on('open', self._trigger('open'));
			self._popupPopupHelper.on('close', () => {
				self._trigger('close');
				if (self.freeOnClose) self.free();
			});
		}
		self._popupPopupHelper.open(x, y);
	}
}
ds.ui.FloatingController = ds.ui.Controller.extend({
	template: `<div class="col bk bl bt br bb bkw {{ this.className }}">
					<div class="row mid pl bk nosel" x-on:mousedown="self._floatingDragHelper.begin()">
						<div class="flex">
							{{ this.text }}
							@@title
						</div>
						<div class="row mid cen dhvr hnd" style="width:32px;height:27px;" x-on:click="self.closeFloating()">
							<img class="dhvrc tam" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iY3Jvc3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgcG9pbnRzPSIxMS41MyAxLjUzIDEwLjQ3IDAuNDcgNiA0Ljk0IDEuNTMgMC40NyAwLjQ3IDEuNTMgNC45NCA2IDAuNDcgMTAuNDcgMS41MyAxMS41MyA2IDcuMDYgMTAuNDcgMTEuNTMgMTEuNTMgMTAuNDcgNy4wNiA2Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" />
						</div>
					</div>
					<div class="pl pr pb pt">
						@@body
					</div>
					<div class="row pb">
						<div class="row flex pl">
							@@buttons_left
						</div>
						<div class="row pr">
							@@buttons_right
						</div>
					</div>
				</div>`,
	className: null,
	text: null,
	freeOnClose: true
}, ds.ui.Floating);
ds.ui.ModalController = ds.ui.Controller.extend({
	template: `<div class="col bk {{ this.className }}">
					<div class="row mid bb pl pt pr pb">
						<div x-ref="title_element" class="flex strong bvl">{{ this.text }}</div>
						{{ this.closeBtn = this.closeBtn || ds.ui.Button.new({ text: '<i class="fa fa-close gray bvl"></i>', flat: true, small: true })
							.on('click', () => this.closeModal('cancel')) }}
					</div>
					<div x-ref="content_element" class="col flex pl pt2 pr pb2 bkw">
						@@content
					</div>
					<div class="row bt">
						<div x-ref="footer_left_element" class="pl pb pt flex row">
							{{ this.cancelBtn = this.cancelBtn || ds.ui.Button.new({ text: 'Отмена' })
								.on('click', () => this.closeModal('cancel')) }}
							@@footer_left
						</div>
						<div x-ref="footer_right_element" class="pr pb pt row">
							@@footer_right
						</div>
					</div>
				</div>`,
	className: '',
	text: null,
	freeOnClose: true
}, ds.ui.Modal);
ds.ui.MessageBox = ds.ui.View.extend({
	styles: `.__xmsgbox {
				width: 450px;
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
				background-color: white;
				border-width: 0px !important;
				border-radius: 0px !important; }`,
	template: `<div class="__xmsgbox">
					<div style="height:3px; background-color: {{ this._getTopLineBGColor() }}"></div>
					<div class="pl2 pr2 mt2 xlg"><i class="fa {{ this._getIconClassName() }} fa-lg mr"></i>{{ this.text }}</div>
					<div class="mt2 pl2 pr2">{{ this._getBody() }}</div>
					<div class="mt2 mb row">
						<div class="row mid pl">
							{{ this._left_buttons }}
						</div>
						<div class="flex"></div>
						<div class="row mid pr __xmsgbox_rbtns">
							{{ this._right_buttons }}
						</div>
					</div>
				</div>`,
	_left_buttons: null,
	_right_buttons: null,
	_kind: 'info', // info, warning, error, confirmation
	_text: 'Information',
	_body: 'Here is no any body yet, but you can set it by prop "body", go ahead!',
	freeOnClose: true,
	get kind() { return this._kind; },
	set kind(value) { this._kind = value; this.needsUpdate() },
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate() },
	get body() { return this._body; },
	set body(value) { this._body = value; this.needsUpdate() },
	_getTopLineBGColor() { return ({ info: '#3498db', warning: '#f1c40f', error: '#e62e09', confirmation: '#3498db' })[this.kind] },
	_getIconClassName() { return ({ info: 'fa-info-circle blue', warning: 'fa-warning yellow', error: 'fa-times-circle red', confirmation: 'fa-question-circle blue' })[this.kind] },
	_getBody() {
		const self = this;
		if (ds.isPrototypeOf(self.body, ds.ui.View)) return [self.body]
		else if (ds.isPrototypeOf(self.body, HTMLElement)) return [self.body];
		else {
			let nodes = [];
			let wrapper = ds.ui.element('<div>' + self.body.toString() + '</div>');
			for (let i = 0; i < wrapper.childNodes.length; i++) nodes.push(wrapper.childNodes.item(i));
			return nodes;	
		}
	},
	_formatText(template, args) {
		return (template || '').replace(/\$\d*/g, a => {
			let arg = args[a.slice(1)];
			return arg ? ('<strong>' + arg + '</strong>') : '';
		});
	},
	setFormatBody(template, args) {
		const self = this;
		self.body = self._formatText(template, args);
	},
	addLeftButton(options) {
		const self = this;
		options = Object.assign({}, options, { flat: true });
		let btn = ds.ui.Button.new(options);
		btn.on('click', e => self.closeModal(options.modalResult || 'cancel'));
		self._left_buttons.push(btn);
		self.update();
		return btn;
	},
	addRightButton(options) {
		const self = this;
		options = Object.assign({}, options, { flat: false });
		let btn = ds.ui.Button.new(options);
		btn.on('click', e => self.closeModal(options.modalResult || 'cancel'));
		self._right_buttons.push(btn);
		self.update();
		return btn;
	},
	init() {
		const self = this;
		self._left_buttons = [];
		self._right_buttons = [];
		ds.ui.View.init.call(self);
	},
	// static...
	confirmDelete(body, args) {
		const msgBox = ds.ui.MessageBox.new({ kind: 'confirmation', text: 'Удаление' });
		msgBox.setFormatBody(body, args);
		msgBox.addLeftButton({ text: 'Отмена' });
		msgBox.addRightButton({ text: 'Удалить', primary: true, modalResult: 'ok' });
		return new Promise((resolve, reject) => msgBox.openModal(resolve));
	},
	prompt(options, callback) {
		if (ds.isString(options)) options = { kind: 'confirmation', text: options, body: null, args: [] };
		else options = Object.assign({ kind: 'confirmation', text: '', body: null, args: [] }, options);
		const msgBox = ds.ui.MessageBox.new({ kind: options.kind, text: options.text });
		msgBox.body = ds.ui.View.new({
			template: `<div class="col">
							<div class="{{ this.body ? 'mb05' : '' }}">{{ this.body }}</div>
							{{ this.textEdit = this.textEdit || ds.ui.TextEdit.new() }}
						</div>`,
			body: ds.ui.MessageBox._formatText(options.body, options.args)
		});
		msgBox.addLeftButton({ text: 'Отмена' });
		msgBox.addRightButton({ text: 'OK', primary: true, modalResult: 'ok' });
		msgBox.openModal(mr => {
			if (ds.isFunction(callback)) callback(mr, msgBox.body.textEdit.value);
		});
		return msgBox;
	},
	confirm(options, callback) {
		if (ds.isString(options)) options = { kind: 'confirmation', text: options, body: null, args: [] };
		else options = Object.assign({ kind: 'confirmation', text: '', body: null, args: [] }, options);
		const msgBox = ds.ui.MessageBox.new({ kind: options.kind, text: options.text });
		msgBox.setFormatBody(options.body, options.args);
		msgBox.addLeftButton({ text: 'Отмена' });
		msgBox.addRightButton({ text: 'Продолжить', primary: true, modalResult: 'ok' });
		msgBox.openModal(callback);
		return msgBox;
	},
	alert(options, callback) {
		if (ds.isString(options)) options = { kind: 'info', text: options, body: null, args: [] };
		else options = Object.assign({ kind: 'info', text: '', body: null, args: [] }, options);
		const msgBox = ds.ui.MessageBox.new({ kind: options.kind, text: options.text });
		msgBox.setFormatBody(options.body, options.args);
		msgBox.addRightButton({ text: 'OK', primary: true, modalResult: 'ok' });
		msgBox.openModal(callback);
		return msgBox;
	}
}, ds.ui.Modal);
ds.ui.PopupHelper = ds.Object.extend({
	styles: `:root { --pptrgt-arw-bk: white; }
			 .__pptrgt { position: absolute !important; z-index: 19; }
			 .__pptrgt-tr::before, .__pptrgt-tr::after { content: ""; position: absolute; border-style: solid; right: -16px; top: var(--pptrgt-arw-pos); }
			 .__pptrgt-tr::before { border-color: transparent transparent transparent var(--border-color); border-width: 8px; }
			 .__pptrgt-tr::after { border-color: transparent transparent transparent var(--pptrgt-arw-bk); border-width: 7px; transform: translate(-2px, 1px) }
			 .__pptrgt-tl::before, .__pptrgt-tl::after { content: ""; position: absolute; border-style: solid; left: -16px; top: var(--pptrgt-arw-pos); }
			 .__pptrgt-tl::before { border-color: transparent var(--border-color) transparent transparent; border-width: 8px; }
			 .__pptrgt-tl::after { border-color: transparent var(--pptrgt-arw-bk) transparent transparent; border-width: 7px; transform: translate(2px, 1px); }
			 .__pptrgt-tb::before, .__pptrgt-tb::after { content: ""; position: absolute; border-style: solid; bottom: -16px; left: var(--pptrgt-arw-pos); }
			 .__pptrgt-tb::before { border-color: var(--border-color) transparent transparent transparent; border-width: 8px; }
			 .__pptrgt-tb::after { border-color: var(--pptrgt-arw-bk) transparent transparent transparent; border-width: 7px; transform: translate(1px, -2px) }
			 .__pptrgt-tt::before, .__pptrgt-tt::after { content: ""; position: absolute; border-style: solid; top: -16px; left: var(--pptrgt-arw-pos); }
			 .__pptrgt-tt::before { border-color: transparent transparent var(--border-color) transparent; border-width: 8px; }
			 .__pptrgt-tt::after { border-color: transparent transparent var(--pptrgt-arw-bk) transparent; border-width: 7px; transform: translate(1px, 2px); }
			 .__pptrgt-rw { max-width: var(--pptrgt-max-width); }
			 .__pptrgt-rh { max-height: var(--pptrgt-max-height); }
			 .__pptrgt_mw { max-width: var(--pptrgt-max-width); }
			 .__pptrgt_mh { max-height: var(--pptrgt-max-height); }`,
	_one_listener: null,
	_sip_listener: null,
	_scr_listener: null,
	_scr_timeout: null,
	_target_rect: null,
	_related_rect: null,
	_x: null,
	_y: null,
	direction: 'down',
	alignment: 'left',
	related: null,
	target: null,
	offset: null,
	triangle: false,
	triangleBkColor: 'white',
	closeOnBCRChange: true,
	isOpened() { return this.target && this.target.__popup_opened; },
	close() {
		const self = this;
		if (!self.target.__popup_opened) return;
		self._trigger('before_close');
		self._x = null;
		self._y = null;
		self.target.__popup_opened = false;
		self.target.classList.remove('__pptrgt', '__pptrgt-tt', '__pptrgt-tb', '__pptrgt-tl', '__pptrgt-tr', '__pptrgt-rh', '__pptrgt-rw', '__pptrgt-mh', '__pptrgt-mw');
		self.target.style.display = 'none';
		self.target.style.setProperty('--pptrgt-arw-pos', null);
		self.target.style.setProperty('--pptrgt-arw-bk', null);
		self.target.style.setProperty('--pptrgt-max-width', null);
		self.target.style.setProperty('--pptrgt-max-height', null);
		self.target.removeEventListener('click', self._sip_listener);
		document.removeEventListener('click', self._one_listener, { once: true });
		window.removeEventListener('scroll', self._scr_listener, { capture: true });
		self._trigger('close');
	},
	open(x, y) {
		const self = this;
		if (!self.target) throw new Error('ds.ui.PopupHelper: Target element must be specified.');
		if (self.target.__popup_opened) return;
		self._trigger('before_open');
		self._x = x;
		self._y = y;
		self.target.style.opacity = 0;
		self.target.style.display = '';
		self.target.classList.add('__pptrgt');
		document.body.appendChild(self.target);
		self.adjust();
		self.target.style.opacity = 1;
		self.target.__popup_opened = true;
		self.target.addEventListener('click', self._sip_listener);
		setTimeout(() => {
			document.addEventListener('click', self._one_listener, { once: true });
			window.addEventListener('scroll', self._scr_listener, { capture: true });
		}, 0);
		self._trigger('open');
	},
	adjust() {
		const self = this;
		self.offset = Object.assign({ left: 0, top: 0 }, self.offset);
		const set_limits = (mw, mh) => {
			if (self._target_rect.width > mw) {
				self.target.classList.add('__pptrgt_mw');
				self.target.style.setProperty('--pptrgt-max-width', mw.toString() + 'px' );
				self._target_rect = ds.ui.element_rects(self.target).inner;
			}
			if (self._target_rect.height > mh) {
				self.target.classList.add('__pptrgt_mh');
				self.target.style.setProperty('--pptrgt-max-height', mh.toString() + 'px' );
				self._target_rect = ds.ui.element_rects(self.target).inner;
			}
		}
		const set_vertical_limits = (rc) => {
			const h1 = rc.top;
			const h2 = window.innerHeight - (rc.top + rc.height);
			const mw = window.innerWidth;
			const mh = Math.max(h1, h2);
			set_limits(mw, mh);
		}
		const set_horizontal_limits = (rc) => {
			const w1 = rc.left;
			const w2 = window.innerWidth - (rc.left + rc.width);
			const mw = Math.max(w1, w2);
			const mh = window.innerHeight;
			set_limits(mw, mh);
		}
		const direction_down = () => {
			position.top = self._related_rect.bottom;
			if (self.triangle) {
				position.top += TRIANGLE_SIZE;
				self.target.classList.remove('__pptrgt-tb');
				self.target.classList.add('__pptrgt-tt');
			}
		}
		const direction_up = () => {
			position.top = self._related_rect.top - self._target_rect.height;
			if (self.triangle) {
				position.top -= TRIANGLE_SIZE;
				self.target.classList.remove('__pptrgt-tt');
				self.target.classList.add('__pptrgt-tb');
			}
		}
		const direction_left = () => {
			position.left = self._related_rect.left - self._target_rect.width;
			if (self.triangle) {
				position.left -= TRIANGLE_SIZE;
				self.target.classList.remove('__pptrgt-tl');
				self.target.classList.add('__pptrgt-tr');
			}
		}
		const direction_right = () => {
			position.left = self._related_rect.right;
			if (self.triangle) {
				position.left += TRIANGLE_SIZE;
				self.target.classList.remove('__pptrgt-tr');
				self.target.classList.add('__pptrgt-tl');
			}
		}
		const alignment_left = () => position.left = self._related_rect.left;
		const alignment_right = () => position.left = self._related_rect.right - self._target_rect.width;
		const alignment_center = () => position.left = self._related_rect.left - ((self._target_rect.width - self._related_rect.width) / 2);
		const alignment_top = () => position.top = self._related_rect.top;
		const alignment_bottom = () => position.top = self._related_rect.bottom - self._target_rect.height;
		const alignment_middle = () => position.top = self._related_rect.top - ((self._target_rect.height - self._related_rect.height) / 2);
		const offset_h = (a = 1) => { position.left += (self.offset.left * a); };
		const offset_v = (a = 1) => { position.top += (self.offset.top * a); };
		const fit_horizontal = () => {
			if (position.right() > window.innerWidth) correction.left -= position.right() - window.innerWidth;
			else if (position.left < 0) correction.left += Math.abs(position.left);
		}
		const fit_vertical = () => {
			if (position.bottom() > window.innerHeight) correction.top -= position.bottom() - window.innerHeight;
			else if (position.top < 0) correction.top += Math.abs(position.top);
		}
		const TRIANGLE_SIZE = 8;
		let position = { left: 0, top: 0, width: 0, height: 0, bottom() { return this.top + this.height; }, right() { return this.left + this.width; }, triangle_pos: 0 };
		let correction = { left: 0, top: 0 };
		self._target_rect = ds.ui.element_rects(self.target).inner;
		self._related_rect = self.related ? ds.ui.element_rects(self.related).border : null;
		position.width = self._target_rect.width;
		position.height = self._target_rect.height;
		if (self._x !== null && self._x !== undefined && self._y !== null && self._y !== undefined) {
			position.left = self._x;
			position.top = self._y;
			// set_limits({ left: position.left, top: position.top, width: 0, height: 0 });
			fit_horizontal();
			fit_vertical();
		} else {
			if (!self.related) throw new Error('ds.ui.PopupHelper: "related" property must be set or pass "x" and "y" to open function.');
			if (self.direction == 'down') {
				set_vertical_limits({ left: self._related_rect.left, top: self._related_rect.top, width: self._related_rect.width, height: self._related_rect.height });
				direction_down();
				offset_v();
				if (self.alignment == 'left') {
					alignment_left();
					offset_h();
					if (position.right() > window.innerWidth) {
						alignment_right();
						offset_h(-1);
					}
				} else if (self.alignment == 'right') {
					alignment_right();
					offset_h();
					if (position.left < 0) {
						alignment_left();
						offset_h(-1);
					}
				} else if (self.alignment == 'center') {
					alignment_center();
					offset_h();
					fit_horizontal();
				} else throw new Error('ds.ui.popup: Alignment "' + self.alignment + '" not supported.');
				if (position.bottom() > window.innerHeight) {
					direction_up();
					offset_v(-1);
					if (position.top < 0) {
						direction_down();
						offset_v();
					}
				}
				position.triangle_pos = Math.floor(self._related_rect.left - position.left + (self._related_rect.width / 2));
				position.triangle_pos -= correction.left;
				position.triangle_pos -= TRIANGLE_SIZE;
			} else if (self.direction == 'up') {
				set_vertical_limits({ left: self._related_rect.left, top: self._related_rect.top, width: self._related_rect.width, height: self._related_rect.height });
				direction_up();
				offset_v();
				if (self.alignment == 'left') {
					alignment_left();
					offset_h();
					if (position.right() > window.innerWidth) {
						alignment_right();
						offset_h(-1);
					}
				} else if (self.alignment == 'right') {
					alignment_right();
					offset_h();
					if (position.left < 0) {
						alignment_left();
						offset_h(-1);
					}
				} else if (self.alignment == 'center') {
					alignment_center();
					offset_h();
					fit_horizontal();
				} else throw new Error('ds.ui.popup: Alignment "' + self.alignment + '" not supported.');
				if (position.top < 0) {
					direction_down();
					offset_v(-1);
					if (position.bottom() > window.innerHeight) {
						direction_up();
						offset_v();
					}
				}
				position.triangle_pos = Math.floor(self._related_rect.left - position.left + (self._related_rect.width / 2));
				position.triangle_pos -= correction.left;
				position.triangle_pos -= TRIANGLE_SIZE;
			} else if (self.direction == 'left') {
				set_horizontal_limits({ left: self._related_rect.left, top: self._related_rect.top, width: self._related_rect.width, height: self._related_rect.height });
				direction_left();
				offset_h()
				if (self.alignment == 'top') {
					alignment_top();
					offset_v();
					if (position.bottom() > window.innerHeight) {
						alignment_bottom();
						offset_v(-1);
					}
				} else if (self.alignment == 'bottom') {
					alignment_bottom();
					offset_v();
					if (position.top < 0) {
						alignment_top();
						offset_v(-1);
					}
				} else if (self.alignment == 'middle') {
					alignment_middle();
					offset_v();
					fit_vertical();
				} else throw new Error('ds.ui.popup: Alignment "' + self.alignment + '" not supported.');
				if (position.left < 0) {
					direction_right();
					offset_h(-1);
					if (position.right() > window.innerWidth) {
						direction_left();
						offset_h();
					}
				}
				position.triangle_pos = Math.floor(self._related_rect.top - position.top + (self._related_rect.height / 2));
				position.triangle_pos -= correction.top;
				position.triangle_pos -= TRIANGLE_SIZE;
			} else if (self.direction == 'right') {
				set_horizontal_limits({ left: self._related_rect.left, top: self._related_rect.top, width: self._related_rect.width, height: self._related_rect.height });
				direction_right();
				offset_h();
				if (self.alignment == 'top') {
					alignment_top();
					offset_v();
					if (position.bottom() > window.innerHeight) {
						alignment_bottom();
						offset_v(-1);
					}
				} else if (self.alignment == 'bottom') {
					alignment_bottom();
					offset_v();
					if (position.top < 0) {
						alignment_top();
						offset_v(-1);
					}
				} else if (self.alignment == 'middle') {
					alignment_middle();
					offset_v();
					fit_vertical();
				} else throw new Error('ds.ui.popup: Alignment "' + self.alignment + '" not supported.');
				if (position.right() > window.innerWidth) {
					direction_left();
					offset_h(-1);
					if (position.left < 0) {
						direction_right();
						offset_h();
					}
				}
				position.triangle_pos = Math.floor(self._related_rect.top - position.top + (self._related_rect.height / 2));
				position.triangle_pos -= correction.top;
				position.triangle_pos -= TRIANGLE_SIZE;
			}
		}
		self.target.style.left = (position.left + correction.left).toString() + 'px';
		self.target.style.top = (position.top + correction.top).toString() + 'px';
		self.target.style.setProperty('--pptrgt-arw-pos', position.triangle_pos.toString() + 'px');
		self.target.style.setProperty('--pptrgt-arw-bk', self.triangleBkColor || 'white');
	},
	init() {
		const self = this;
		self._one_listener = e => self.close();
		self._sip_listener = e => e.stopImmediatePropagation();
		self._scr_listener = e => {
			if (!self.closeOnBCRChange || !self.related || self._scr_timeout) return;
			self._scr_timeout = setTimeout(() => self._scr_timeout = null, 50);
			let bcr = self.related.getBoundingClientRect();
			if (bcr.left != self._related_rect.left || bcr.top != self._related_rect.top) self.close();
		};
		self.offset = Object.assign({ left: 0, top: 0 }, self.offset);
	}
}, ds.Events('open', 'close', 'before_open', 'before_close'));
ds.ui.__parsestyles(ds.ui.PopupHelper.styles);
ds.ui.DragHelper = ds.Object.extend({
	_dragging: false,
	_draggingPastSmallOffset: false,
	_onceOptions: null,
	beginPosition: null,
	position: null,
	cursor: null,
	begin(options) {
		const self = this;
		self._dragging = true;
		self._draggingPastSmallOffset = false;
		self._onceOptions = options;
	},
	end() {
		const self = this;
		self._dragging = false;
		self._draggingPastSmallOffset = false;
		self._onceOptions = null;
	},
	init() {
		const self = this;
		self.beginPosition = { x: 0, y: 0 };
		self.position = { x: 0, y: 0 };
		ds.ui.element_on(document, 'mousedown', e => {
			if (self.__freed) return false;
			self.beginPosition = {x: e.pageX, y: e.pageY};
			if (!self._dragging) return true;
			self._trigger('begin', self.beginPosition, e);
			if (self._onceOptions && ds.isFunction(self._onceOptions.begin)) self._onceOptions.begin(self.beginPosition, e);
			document.body.style.cursor = self.cursor;
			return true;
		});
		ds.ui.element_on(document, 'mousemove', e => {
			if (self.__freed) return false;
			self.position.x = e.pageX;
			self.position.y = e.pageY;
			var offset = {	x: self.position.x - self.beginPosition.x,
							y: self.position.y - self.beginPosition.y  };
			if (!self._dragging) return true;
			if (Math.abs(offset.x) > 3 || Math.abs(offset.y) > 3 || self._draggingPastSmallOffset) {
				self._draggingPastSmallOffset = true;
				self._trigger('drag', offset, self.position, self.beginPosition, e);
				if (self._onceOptions && ds.isFunction(self._onceOptions.drag)) self._onceOptions.drag(offset, self.position, self.beginPosition, e);
			}
			return true;
		});
		ds.ui.element_on(document, 'mouseup', e => {
			if (self.__freed) return false;
			var offset = {	x: e.pageX - self.beginPosition.x,
							y: e.pageY - self.beginPosition.y  };
			if (!self._dragging) return true;
			if (Math.abs(offset.x) > 3 || Math.abs(offset.y) > 3 || self._draggingPastSmallOffset) {
				self._trigger('end', offset, self.position, self.beginPosition, e);
				if (self._onceOptions && ds.isFunction(self._onceOptions.end)) self._onceOptions.end(offset, self.position, self.beginPosition, e);
			}
			document.body.style.cursor = null;
			self.end();
			return true;
		});
	}
}, ds.Events('begin', 'drag', 'end'));
ds.ui.Cell = ds.ui.View.extend({
	EMPTY_IMG: 'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
	styles: `.__xcell { overflow: hidden; }
			.__xcell.__nowrap { white-space: nowrap; }
			.__xcell.__disabled > * { opacity: 0.5 }
			.__xcell.__xcell_gi > img { filter: opacity(0.5); }
			.__xcell.__xcell_gi:hover > img { filter: none; }
			.__xcell.__selected.__xcell_gi > img { filter: none; }
			/* add position:relative only when call has image (to prevent scroll issue) */
			.__xcell.__xcell_img16 { position: relative; padding-left: 26px; min-height: 16px; }
			.__xcell.__xcell_img24 { position: relative; padding-left: 34px; min-height: 21px; padding-top: 4px; }
			.__xcell.__xcell_img32 { position: relative; padding-left: 42px; min-height: 25px; padding-top: 8px; }
			.__xcell > img { position: absolute; left: 0px; top: 1px; }
			.__xcell > span { vertical-align: middle; }
			/*.__xcell.__xcell_img24 > span { margin-top: 4px; }
			.__xcell.__xcell_img32 > span { margin-top: 10px; }*/
			.__xcell.__xcell_img16 > img { width: 16px; height: 16px; }
			.__xcell.__xcell_img24 > img { width: 24px; height: 24px; }
			.__xcell.__xcell_img32 > img { width: 32px; height: 32px; }
			.__xcell.__xcell_img_circle > img { border-radius: 50%; }
			.__xcell_tag { font-size: 11px; font-weight: bold; line-height: 14px; white-space: nowrap; border-style: solid; border-width: 1px; border-radius: 3px; padding: 0px 5px; }
			.__xcell_tag.__yellow { background-color: #ffd351; border-color: #ffd351; color: #594300; }
			.__xcell_tag.__yellow.__hollow { background-color: #fff; border-color: #ffe28c; color: #594300; }
			.__xcell_tag.__green { background-color: #009834; border-color: #009834; color: #fff; }
			.__xcell_tag.__green.__hollow { background-color: #fff; border-color: #b2d8b9; color: #14892c; }
			.__xcell_tag.__red { background-color: #d85b45; border-color: #d85b45; color: #fff; }
			.__xcell_tag.__red.__hollow { background-color: #fff; border-color: #e8a29b; color: #d04437; }
			.__xcell_tag.__blue { background-color: #459fd8; border-color: #459fd8; color: #fff; }
			.__xcell_tag.__blue.__hollow { background-color: #fff; border-color: #459fd8; color: #2884bd; }
			.__xcell_tag.__navy { background-color: #4a6785; border-color: #4a6785; color: #fff; }
			.__xcell_tag.__navy.__hollow { background-color: #fff; border-color: #c2cbd6; color: #4a6785 }
			.__xcell_tag:not(.__hollow) { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
			.__xcell > .__xcell_txt { margin-right: 8px; }
			.__xcell > .__xcell_tag { margin-right: 8px; }
			.__xcell > .__xcell_badge { font-size: 10px; display: inline-block; transform: translateY(-4px); margin-right: 8px; margin-left: -2px; }
			.__xcell > span:last-child { margin-right: 0px; }
			.__xcell > .__xcell_edt {
				border: #4aa7f0 1px solid;		box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset;
				background-color: white;		outline: none;
				overflow-x: hidden;				padding: 2px;
				cursor: text; 					min-width: 24px }`,
	_className: '__xcell',
	textClassName: 'fs14',
	imageClassName: '',
	badgeClassName: '',
	_image: null,
	_imageSize: 'x16',
	_text: '',
	_tag: null,
	_tagHollow: false,
	_tagColor: 'navy',
	_tagWrap: false,
	_highlightedText: '',
	_grayImage: false,
	_circleImage: false,
	_textAlign: 'left',
	_nowrap: false,
	_narrow: false,
	_badge: null,
	_tagDescription: null,
	_selected: false,
	_disabled: false,
	_editable: false,
	set disabled(value) { this._disabled = value; this.needsUpdate(); },
	get disabled() { return this._disabled; },
	set selected(value) { this._selected = value; this.needsUpdate(); },
	get selected() { return this._selected; },
	get badge() { return this._badge; },
	set badge(value) { this._badge = value; this.needsUpdate(); },
	get nowrap() { return this._nowrap; },
	set nowrap(value) { this._nowrap = value; this.needsUpdate(); },
	get narrow() { return this._narrow; },
	set narrow(value) { this._narrow = value; this.needsUpdate(); },
	get image() { return this._image; },
	set image(value) { this._image = value; this.needsUpdate(); },
	get imageSize() { return this._imageSize; },
	set imageSize(value) { this._imageSize = value; this.needsUpdate(); },
	get text() { return this._text; },
	set text(value) { this._text = ds.asString(value); this.needsUpdate(); },
	get highlightedText() { return this._highlightedText; },
	set highlightedText(value) { this._highlightedText = value; this.needsUpdate(); },
	get tag() { return this._tag; },
	set tag(value) { this._tag = value; this.needsUpdate(); },
	get tagHollow() { return this._tagHollow; },
	set tagHollow(value) { this._tagHollow = value; this.needsUpdate(); },
	get tagColor() { return this._tagColor; },
	set tagColor(value) { this._tagColor = value; this.needsUpdate(); },
	get tagWrap() { return this._tagWrap; },
	set tagWrap(value) { this._tagWrap = value; this.needsUpdate(); },
	get tagDescription() { this._tagDescription },
	set tagDescription(value) { this._tagDescription = value; this.needsUpdate(); },
	get grayImage() { return this._grayImage; },
	set grayImage(value) { this._grayImage = value; this.needsUpdate(); },
	get circleImage() { return this._circleImage; },
	set circleImage(value) { this._circleImage = value; this.needsUpdate(); },
	get textAlign() { return this._textAlign; },
	set textAlign(value) { this._textAlign = value; this.needsUpdate(); },
	get editable() { return this._editable; },
	set editable(value) { this._editable = value; this.needsUpdate(); },
	_getTag() {
		const self = this;
		if (!['yellow', 'green', 'red', 'blue', 'navy'].includes(self._tagColor)) throw 'ds.ui.Cell: Color not supported "' + self._tagColor + '".';
		return `<span class="__xcell_tag __${self._tagColor}${self._tagHollow ? ' __hollow' : ''}">${self._tag.toUpperCase()}</span>`;
	},
	_getText() {
		const self = this;
		if (self._highlightedText) {
			const text_uc = ds.ui.element((`<div>${self._text || ''}</div>`).toUpperCase()).innerHTML;
			const htext_uc = (self._highlightedText || '').toUpperCase();
			const pos = text_uc.indexOf(htext_uc);
			if (pos == -1) return self._text;
			else {
				const len = htext_uc.length;
				return self._text.substr(0, pos) + `<span class="strong bkwr">${self._text.substr(pos, len)}</span>${self._text.substr(pos + len)}`;	
			}
		} else return self._text;
	},
	edit(onapply) {
		const self = this;
		const apply = () => {
			span_element.removeEventListener('focusout', focusout);
			span_element.removeAttribute('contenteditable');
			span_element.classList.remove('__xcell_edt');
			let old_value = self.text;
			let new_value = span_element.textContent;
			self.text = new_value;
			if (onapply) onapply(new_value, old_value);
			self.needsUpdate();
		}
		const cancel = () => {
			span_element.removeEventListener('focusout', focusout);
			span_element.removeAttribute('contenteditable');
			span_element.classList.remove('__xcell_edt');
			self.needsUpdate();
			window.getSelection().removeAllRanges();
		}
		const keydown = e => {
			if (e.keyCode == 27) e.preventDefault(), cancel();
			else if (e.keyCode == 13) e.preventDefault(), apply();
		}
		const focusout = e => apply();
		let span_element = self.element.querySelector('span.__xcell_txt');
		span_element.classList.add('__xcell_edt');
		span_element.setAttribute('contenteditable', true);
		span_element.addEventListener('keydown', keydown);
		span_element.addEventListener('focusout', focusout);
		span_element.focus();
		document.execCommand('selectAll', false, null);
	},
	update() {
		const self = this;
		ds.ui.View.update.call(self);
		if (!self.element) return;
		if (!['x16', 'x24', 'x32'].includes(self._imageSize)) throw 'ds.ui.Cell: Wrong value for imageSize property. supported "x16", "x24", "x36"';
		if (!['left', 'center', 'right'].includes(self._textAlign)) throw 'ds.ui.Cell: Wrong value for textAlign property. supported "left", "center", "right"';
		var img_part = '';
		var parts = [];
		if (self._image) img_part = `<img src="${self._image}" class="${self.imageClassName}">`;
		let text = self._getText();
		if (text) parts.push(`<span class="__xcell_txt ${self.textClassName}">${text}</span>`);
		if (self._badge) parts.push(`<span class="__xcell_badge ${self.badgeClassName}">${self._badge}</span>`);
		if (self._tagWrap) parts.push('<br/>');
		if (self._tag) parts.push(self._getTag());
		if (self._tagDescription) parts.push(`<span class="__xcell_tag_descr">${self._tagDescription}</span>`);
		self.element.innerHTML = img_part + parts.join('');
		ds.ui.element_classif( self.element,
			'__disabled', 		self._disabled,
			'__selected', 		self._selected,
			'__xcell_gi', 		self._grayImage,
			'__xcell_img16', 	self._image && self._imageSize == 'x16',
			'__xcell_img24', 	self._image && self._imageSize == 'x24',
			'__xcell_img32', 	self._image && self._imageSize == 'x32',
			'__xcell_img_circle', self._circleImage,
			'tac', 				self._textAlign == 'center',
			'tar', 				self._textAlign == 'right',
			'__nowrap', 		self._nowrap,
			'__narrow', 		self._narrow
		);
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.element.addEventListener('click', e => self._trigger('click', e));
	}
}, ds.Events('click'));
ds.ui.Splitter = ds.ui.View.extend({
	styles: `.__xspl_v { width: 7px; min-width: 7px; max-width: 7px; cursor: ew-resize; resize: both; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMnB4IiBoZWlnaHQ9IjEycHgiIHZpZXdCb3g9IjAgMCAyIDEyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGcgaWQ9InNwbGl0dGVyX2hhbmRsZV92IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYxIiBmaWxsPSIjQ0JDQkNCIiB4PSIwIiB5PSIxIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIj48L3JlY3Q+CiAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02MS1Db3B5IiBmaWxsPSIjRThFOEU4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIj48L3JlY3Q+CiAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02MS1Db3B5LTMiIGZpbGw9IiNDQkNCQ0IiIHg9IjAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiPjwvcmVjdD4KICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYxLUNvcHktMiIgZmlsbD0iI0U4RThFOCIgeD0iMCIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNjEtQ29weS01IiBmaWxsPSIjQ0JDQkNCIiB4PSIwIiB5PSIxMSIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNjEtQ29weS00IiBmaWxsPSIjRThFOEU4IiB4PSIwIiB5PSIxMCIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgPC9nPgo8L3N2Zz4='); background-repeat: no-repeat; background-position: center; }
			.__xspl_h { height: 7px; min-height: 7px; max-height: 7px; cursor: row-resize; resize: both; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIycHgiIHZpZXdCb3g9IjAgMCAxMiAyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGcgaWQ9InNwbGl0dGVyX2hhbmRsZV9oIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYxIiBmaWxsPSIjQ0JDQkNCIiB4PSIxMCIgeT0iMSIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNjEtQ29weSIgZmlsbD0iI0U4RThFOCIgeD0iMTAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiPjwvcmVjdD4KICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYxLUNvcHktNSIgZmlsbD0iI0NCQ0JDQiIgeD0iMCIgeT0iMSIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtNjEtQ29weS00IiBmaWxsPSIjRThFOEU4IiB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSIxIj48L3JlY3Q+CiAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS02MS1Db3B5LTMiIGZpbGw9IiNDQkNCQ0IiIHg9IjUiIHk9IjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiPjwvcmVjdD4KICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTYxLUNvcHktMiIgZmlsbD0iI0U4RThFOCIgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMSI+PC9yZWN0PgogICAgPC9nPgo8L3N2Zz4='); background-repeat: no-repeat; background-position: center; }`,
	target: null,
	align: 'left',
	overflow: null,
	orientation: 'vertical',
	_startSize: 0,
	_windowResize_defer: null,
	_dragHelper: null,
	update() {
		const self = this;
		ds.ui.View.update.call(self);
		self.element.style.margin = '0px';
		if (self.orientation == 'vertical') {
			self.element.classList.remove('__xspl_h');
			self.element.classList.add('__xspl_v');
		} else {
			self.element.classList.remove('__xspl_v');
			self.element.classList.add('__xspl_h');
		}
		if (self.overflow) {
			if (self.overflow == 'left') self.element.style.marginLeft = '-7px';
			if (self.overflow == 'top') self.element.style.marginTop = '-7px';
			if (self.overflow == 'right') self.element.style.marginRight = '-7px';
			if (self.overflow == 'bottom') self.element.style.marginBottom = '-7px';	
		}
		if (self.align == 'left' || self.align == 'top') self.target = self.element.previousElementSibling;
		if (self.align == 'right' || self.align == 'bottom') self.target = self.element.nextElementSibling;
		if (!self.target) return;
		self.element.style.zIndex = self.target.style.zIndex + 1;
		self.element.addEventListener('mousedown', function(e) {
			e.preventDefault();
			self._dragHelper.begin();
		});
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self._dragHelper = ds.ui.DragHelper.new();
		self._dragHelper.on('begin', () => {
			self._startSize = (self.align == 'left' || self.align == 'right') ? self.target.offsetWidth : self.target.offsetHeight;
		});
		self._dragHelper.on('drag', offset => {
			if (self.align == 'left') self.target.style.width = (self._startSize + offset.x).toString() + 'px';
			if (self.align == 'right') self.target.style.width = (self._startSize - offset.x).toString() + 'px';
			if (self.align == 'top') self.target.style.height = (self._startSize + offset.y).toString() + 'px';
			if (self.align == 'bottom') self.target.style.height = (self._startSize - offset.y).toString() + 'px';
			if (!self._windowResize_defer) {
				self._windowResize_defer = setTimeout(function() {
					ds.ui.element_trigger(window, 'resize');
					self._windowResize_defer = null;
				}, 5);	
			}
		});
		self.needsUpdate();
	},
	free() {
		const self = this;
		self._dragHelper.free();
		ds.ui.View.free.call(self);
	}
});
ds.ui.Spoiler = ds.ui.View.extend({
	styles: `.__xspol { font-size: 10px; font-weight: bold; cursor: pointer; user-select: none; }
			.__xspol > * { color: var(--text-color-link); }`,
	template: `<span class="__xspol" x-on:click="self.expanded = !self.expanded">
					<span x-if="this.caret"><i class="fa fa-caret-{{ this.expanded ? 'down' : 'right' }}"></i>&nbsp;</span>
					<span>{{ ((this.expanded ? this.closeText : this.openText) || this.text || '').toUpperCase() }}</span>
				</span>`,
	_text: null,
	_openText: null,
	_closeText: null,
	_expanded: false,
	_caret: true,
	get expanded() { return this._expanded; },
	set expanded(value) { this._expanded = value; this.needsUpdate(); this._trigger('expand', value); },
	get openText() { return this._openText; },
	set openText(value) { this._openText = value; this.needsUpdate(); },
	get closeText() { return this._closeText; },
	set closeText(value) { this._closeText = value; this.needsUpdate(); },
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate(); },
	get caret() { return this._caret; },
	set caret(value) { this._caret = value; this.needsUpdate(); }
}, ds.Events('expand'))
ds.ui.Button = ds.ui.View.extend({
	styles: `.__xbtn {
				display: flex;
				flex-flow: row;
				align-items: center;
				min-height: 29px;
				box-sizing: border-box;
				background-color: rgb(245, 246, 247);
				border-style: solid;
				border-width: 1px;
				border-color: rgb(204, 204, 204);
				border-radius: 3px;
				padding: 0px 11px 0px 11px;
				cursor: pointer;
				color: var(--text-color);
				user-select: none;
				text-shadow: rgb(255, 255, 255) 0px 1px 0px;
				/*box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.75),
							inset 0px -1px 0px 0px rgba(0, 0, 0, 0.035);*/  }
			.__xbtn img.__xbtn_img { width: 16px; height: 16px; }
			.__xbtn.__small {
				font-size: 12px;
				padding-left: 6px;
				padding-right: 6px;
				min-height: 26px; }
			.__xbtn.__narrow:not(.__small) {
				padding-left: 7px;
				padding-right: 7px; }
			.__xbtn.__grayed:not(:hover):not(:active):not(.__down):not(.__droppeddown) { color: gray; }
			.__xbtn.__white { background-color: white; }
			.__xbtn:hover, .__xbtn.__hover { 
				background-color: rgb(235, 236, 237);
				border-color: rgb(153, 153, 153); }
			.__xbtn.__flat:not(:hover):not(:active):not(.__down):not(.__droppeddown):not(.__hover) {
				border-color: transparent;
				background-color: transparent; }
			.__xbtn:active, .__xbtn.__down {
				border-color: rgb(204, 204, 204);
				background-color: rgb(245, 245, 245);
				box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset; }
			.__xbtn.__droppeddown {
				background-color: rgb(245, 245, 245);
				border-color: rgb(204, 204, 204);
				box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset;
				border-bottom-left-radius: 0px !important;
				border-bottom-right-radius: 0px !important; }
			.__xbtn.__primary {
				font-weight: bold;
				color: white;
				background-color: rgb(53, 114, 176);
				text-shadow: none; border-color: rgb(53, 114, 176);
				-webkit-font-smoothing: antialiased; }
			.__xbtn.__primary:hover { background-color: rgb(42, 103, 165); }
			.__xbtn.__primary:active {
				background-color: rgb(53, 114, 176);
				box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset; }
			.__xbtn.__green {
				font-weight: bold;
				color: white;
				background-color: #009834;
				text-shadow: none;
				border-color: #009834;
				-webkit-font-smoothing: antialiased; }
			.__xbtn.__green:hover { background-color: #008a30; }
			.__xbtn.__green:active {
				background-color: #009834;
				box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset; }
			.__xbtn.__danger {
				font-weight: bold;
				color: white;
				background-color: #d04437;
				text-shadow: none;
				border-color: #d04437;
				-webkit-font-smoothing: antialiased; }
			.__xbtn.__danger:hover {
				background-color: #c9302c;
				border-color: #c9302c; }
			.__xbtn.__disabled {
				opacity: 0.4;
				cursor: default;
				pointer-events: none; }
			.__xbtn .__xbtn_drpdwncaret {
				color: var(--text-color);
				font-size: 10px;
				margin-left: 6px;
				margin-right: -2px;
				transform: translateY(-1px); }
			.__xbtn.__small .__xbtn_drpdwncaret { transform: translateY(0px); }
			.__xbtn.__primary .__xbtn_drpdwncaret { color: white; }
			.btn-grp .__xbtn { margin-left: -1px; }
			.btn-grp .__xbtn:hover, .btn-grp .__xbtn.__hover {
				position: relative;
				z-index: 2; }
			.btn-grp .__xbtn { border-radius: 0px; }
			.btn-grp .__xbtn:first-child {
				border-top-left-radius: 3px;
				border-bottom-left-radius: 3px;
				margin-left: 0px; }
			.btn-grp .__xbtn:last-child {
				border-top-right-radius: 3px;
				border-bottom-right-radius: 3px; }
			.btn-grp .__xbtn:last-child:first-child { border-radius: 3px; }`,
	_className: '__xbtn',
	_grayed: false,
	_down: false,
	_flat: false,
	_dropdown: false,
	_droppeddown: false,
	_white: false,
	_primary: false,
	_green: false,
	_danger: false,
	_narrow: false,
	_small: false,
	_disabled: false,
	_hover: false,
	_text: null,
	_image: null,
	_imageDim: false,
	_hint: '',
	get grayed() { return this._grayed; },
	set grayed(value) { this._grayed = value; this.needsUpdate(); },
	get down() { return this._down; },
	set down(value) { this._down = value; this.needsUpdate(); },
	get flat() { return this._flat; },
	set flat(value) { this._flat = value; this.needsUpdate(); },
	get dropdown() { return this._dropdown; },
	set dropdown(value) { this._dropdown = value; this.needsUpdate(); },
	get droppeddown() { return this._droppeddown; },
	set droppeddown(value) { this._droppeddown = value; this.needsUpdate(); },
	get white() { return this._white; },
	set white(value) { this._white = value; this.needsUpdate(); },
	get primary() { return this._primary; },
	set primary(value) { this._primary = value; this.needsUpdate(); },
	get green() { return this._green; },
	set green(value) { this._green = value; this.needsUpdate(); },
	get danger() { return this._danger; },
	set danger(value) { this._danger = value; this.needsUpdate(); },
	get narrow() { return this._narrow; },
	set narrow(value) { this._narrow = value; this.needsUpdate(); },
	get small() { return this._small; },
	set small(value) { this._small = value; this.needsUpdate(); },
	get disabled() { return this._disabled; },
	set disabled(value) { this._disabled = value; this.needsUpdate(); },
	get hover() { return this._hover; },
	set hover(value) { this._hover = value; this.needsUpdate(); },
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate(); },
	get image() { return this._image; },
	set image(value) { this._image = value; this.needsUpdate(); },
	get imageDim() { return this._imageDim; },
	set imageDim(value) { this._imageDim = value; this.needsUpdate(); },
	get hint() { return this._hint; },
	set hint(value) { this._hint = value; this.needsUpdate(); },
	_render_ddcaret() {
		const self = this;
		let caret_element = self.element.querySelector('.__xbtn_drpdwncaret');
		if (self.dropdown) {
			if (!caret_element) caret_element = ds.ui.element('<i class="fa fa-caret-down __xbtn_drpdwncaret"></i>', self.element);
		} else {
			if (caret_element) self.element.removeChild(caret_element);
		}
	},
	update() {
		const self = this;
		ds.ui.View.update.call(self);
		if (!self.element) return;
		self.element.setAttribute('title', self._hint);
		self.element.innerHTML = '';
		ds.ui.element_classif(
			self.element,
			'__down', 			self.down,
			'__grayed', 		self.grayed,
			'__flat', 			self.flat,
			'__droppeddown', 	self.droppeddown,
			'__white', 			self.white,
			'__primary', 		self.primary,
			'__green', 			self.green,
			'__danger', 		self.danger,
			'__narrow', 		self.narrow,
			'__small', 			self.small,
			'__disabled', 		self.disabled,
			'__hover', 			self.hover,
			'dhvr',				self.imageDim,
			'dhvra',			self.down || self.droppeddown,
		);
		if (self.image) ds.ui.element('<img srcset="' + self.image + ' 1x, ' + self.image.replace('.png', '@2x.png') + ' 2x" class="__xbtn_img dhvrc" />', self.element);
		if (self.text) ds.ui.element(`<span${ self.image ? ' class="ml075"' : '' }>${ self.text }</span>`, self.element);
		self._render_ddcaret();
	},
	disabledWhile(fn) {
		const self = this;
		return (async () => {
			const prev_disabled = self.disabled;
			try {
				self.disabled = true;
				await fn();
			} finally {
				self.disabled = prev_disabled;
			}
		})();
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.element.addEventListener('click', e => {
			if (self.disabled) return;
			self._trigger('click', e);
		});
	}
}, ds.Events('click'));
ds.ui.DropDownButton = ds.ui.Button.extend({
	_dropdown: true,
	menu: null,
	init() {
		const self = this;
		ds.ui.Button.init.call(self);
		self.menu = ds.ui.Menu.new();
		self.menu.popupHelper.related = self.element;
		self.menu.popupHelper.offset = { top: -1 };
		self.menu.on('before_open', () => self.droppeddown = true);
		self.menu.on('close', () => self.droppeddown = false);
		self.on('click', e => self.menu.open());
	}
});
ds.ui.__DropdownButton = ds.ui.View.extend({
	styles: `.__xddbtn:hover .__xbtn:not(:active), .__xddbtn.__hover .__xbtn:not(:active) { border-color: rgb(204, 204, 204) !important }
			.__xddbtn:hover .__xbtn:hover:not(:active):not(.__down), .__xddbtn.hover .__xbtn:hover:not(:active):not(.__down) { border-color: rgb(153, 153, 153) !important }
			.__xddbtn_mnubtn {
				position: relative;
				padding-left: 4px;
				padding-right: 4px; }
			.__xddbtn_mnubtn:not(:hover)::after {
				content: "";				position: absolute;
				left: -1px;					top: 0px;
				height: 70%;				width: 1px;
				background-color: rgba(204, 204, 204, 0.75);
				transform: translateY(20%); }
			.__xddbtn_mnubtn .fa-caret-down {
				font-size: 10px;
	    		transform: translateY(-1px); }`,
	_className: '__xddbtn ib btn-grp',
	_text: '',
	_grayed: false,
	_down: false,
	_flat: false,
	_droppeddown: false,
	_white: false,
	_primary: false,
	_green: false,
	_danger: false,
	_narrow: false,
	_small: false,
	_disabled: false,
	_hover: false,
	button: null,
	menuButton: null,
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate(); },
	get grayed() { return this._grayed; },
	set grayed(value) { this._grayed = value; this.needsUpdate(); },
	get down() { return this._down; },
	set down(value) { this._down = value; this.needsUpdate(); },
	get flat() { return this._flat; },
	set flat(value) { this._flat = value; this.needsUpdate(); },
	get droppeddown() { return this._droppeddown; },
	set droppeddown(value) { this._droppeddown = value; this.needsUpdate(); },
	get white() { return this._white; },
	set white(value) { this._white = value; this.needsUpdate(); },
	get primary() { return this._primary; },
	set primary(value) { this._primary = value; this.needsUpdate(); },
	get green() { return this._green; },
	set green(value) { this._green = value; this.needsUpdate(); },
	get danger() { return this._danger; },
	set danger(value) { this._danger = value; this.needsUpdate(); },
	get narrow() { return this._narrow; },
	set narrow(value) { this._narrow = value; this.needsUpdate(); },
	get small() { return this._small; },
	set small(value) { this._small = value; this.needsUpdate(); },
	get disabled() { return this._disabled; },
	set disabled(value) { this._disabled = value; this.needsUpdate(); },
	get hover() { return this._hover; },
	set hover(value) { this._hover = value; this.needsUpdate(); },
	update() {
		const self = this;
		ds.ui.View.update.call(self);
		ds.ui.element_classif(self.element, '__hover', self.hover);
		if (self.button) {
			self.button.text = self.text;
			self.button.grayed = self.grayed;
			self.button.down = self.down;
			self.button.flat = self.flat;
			self.button.white = self.white;
			self.button.primary = self.primary;
			self.button.green = self.green;
			self.button.danger = self.danger;
			self.button.narrow = self.narrow;
			self.button.small = self.small;
			self.button.disabled = self.disabled;
		}
		if (self.menuButton) {
			self.menuButton.grayed = self.grayed;
			self.menuButton.flat = self.flat;
			self.menuButton.droppeddown = self.droppeddown;
			self.menuButton.white = self.white;
			self.menuButton.primary = self.primary;
			self.menuButton.green = self.green;
			self.menuButton.danger = self.danger;
			self.menuButton.small = self.small;
			self.menuButton.disabled = self.disabled;
		}
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.button = ds.ui.Button.new();
		self.button.on('click', e => self._trigger('click', e));
		self.element.appendChild(self.button.element);
		self.menuButton = ds.ui.Button.new({ text: '<i class="fa fa-caret-down"></i>', className: '__xddbtn_mnubtn' });
		self.menuButton.on('click', e => self._trigger('menu', e));
		self.element.appendChild(self.menuButton.element);
		self.update();
	}
}, ds.Events('click', 'menu'));
ds.ui.Calendar = ds.ui.View.extend({
	DAY_CONVERT: [6,0,1,2,3,4,5],
	styles: `.__xcal { max-width: 210px; min-width: 210px; }`,
	template: `<div class="__xcal">
					<div x-ref="header_element" class="__xcal_hdr row mid bk bb bvl">
						<div class="__xcal_hdr_prev hnd hvr pl pt pr pb thvr sm" x-on:click="self.prev()"><i class="fa fa-caret-left"></i></div>
						<div x-ref="month_element" class="__xcal_hdr_mnth flex fs11 strong tac"></div>
						<div class="__xcal_hdr_now hnd hvr pl pt pr pb thvr sm" x-on:click="self.now(), self._trigger('select', self.value)"><i class="fa fa-calendar sm"></i></div>
						<div class="__xcal_hdr_next hnd hvr pl pt pr pb thvr sm" x-on:click="self.next()"><i class="fa fa-caret-right"></i></div>
					</div>
					<div x-ref="days_element" class="row">
						<div class="strong flex fs11 strong tac pt pb">${ ds.Date.DAY_NAMES[1].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb">${ ds.Date.DAY_NAMES[2].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb">${ ds.Date.DAY_NAMES[3].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb">${ ds.Date.DAY_NAMES[4].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb">${ ds.Date.DAY_NAMES[5].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb red">${ ds.Date.DAY_NAMES[6].toUpperCase() }</div>
						<div class="strong flex fs11 strong tac pt pb red">${ ds.Date.DAY_NAMES[0].toUpperCase() }</div>
					</div>
					<div x-ref="calendar_element" class="__xcal_cal"></div>
				</div>`,
	_noPast: false,
	_value: null,
	get value() { return this._value; },
	set value(value) {
		const self = this;
		self._value = value;
		if (self._value) self._value.setHours(0, 0, 0, 0);
		self.needsUpdate();
		self._trigger('change', self._value);
	},
	get noPast() { return this._noPast; },
	set noPast(value) {
		const self = this;
		self._noPast = value;
		self.needsUpdate();
	},
	now() { this.value = new Date(); },
	next() {
		const self = this;
		let value = self._value;
		if (!value) value = new Date();
		let month = value.getMonth();
		let year = value.getFullYear();
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
		self.value = new Date(year, month, 1);
	},
	prev() {
		const self = this;
		let value = self._value;
		if (!value) value = new Date();
		let month = value.getMonth();
		let year = value.getFullYear();
		month--;
		if (month < 0) {
			month = 11;
			year--;
		}
		self.value = new Date(year, month, 1);
	},
	update() {
		const self = this;
		if (!self.element) return;
		let today = new Date();
		today.setHours(0, 0, 0, 0);
		let value = self._value;
		if (!value) value = today;
		let curr_month = value.getMonth();
		let curr_year = value.getFullYear();
		let curr_date = value.getDate();
		self.month_element.innerHTML = ds.Date.MONTH_NAMES[curr_month].toUpperCase() + '&nbsp;' + curr_year.toString();
		self.calendar_element.innerHTML = '';
		let days = new Date(curr_year, curr_month + 1, 0).getDate();
		let matrix = {};
		for (let i = 0; i < 6; i++) {
			matrix[i] = { element: ds.ui.element(`<div class="row"></div>`, self.calendar_element), cells: {} };
			for (let j = 0; j < 7; j++) matrix[i].cells[j] = { element: ds.ui.element(`<div class="flex tac pt pb sm">&nbsp;</div>`, matrix[i].element) };
		}
		let row_n = 0;
		for (let day_n = 1; day_n <= days; day_n++) {
			let date = new Date(curr_year, curr_month, day_n);
			date.setHours(0, 0, 0, 0);
			var cell_n = self.DAY_CONVERT[date.getDay()];
			matrix[row_n].cells[cell_n].element.classList.add('hvr', 'hnd', '__xcal_cell');
			matrix[row_n].cells[cell_n].element.setAttribute('date-date', day_n);
			matrix[row_n].cells[cell_n].element.setAttribute('date-month', curr_month);
			matrix[row_n].cells[cell_n].element.setAttribute('date-year', curr_year);
			matrix[row_n].cells[cell_n].element.innerHTML = day_n;
			if (cell_n == 5 || cell_n == 6) matrix[row_n].cells[cell_n].element.classList.add('gray');
			if (date.getTime() == today.getTime()) {
				matrix[row_n].cells[cell_n].element.classList.add('bl', 'bt', 'br', 'bb');
				matrix[row_n].cells[cell_n].element.style.setProperty('border-color', 'var(--border-color-blue)');
			}
			if (day_n == curr_date) {
				matrix[row_n].cells[cell_n].element.style.setProperty('background-color', '#ebf2f9');
				matrix[row_n].cells[cell_n].element.classList.add('strong');
				matrix[row_n].cells[cell_n].element.classList.remove('gray');
			}
			if (self._noPast && (date < today)) {
				matrix[row_n].cells[cell_n].element.classList.add('lightgray');
				matrix[row_n].cells[cell_n].element.classList.remove('hvr', 'hnd', '__xcal_cell');
			}
			if (cell_n == 6) row_n++;
		}
	},
	init() {
		var self = this;
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.element, 'click', '.__xcal_cell', function(e) {
			if (self.__freed) return false;
			if (!this.hasAttribute('date-date') || !this.hasAttribute('date-month') || !this.hasAttribute('date-year')) return true;
			let date = this.getAttribute('date-date');
			let month = this.getAttribute('date-month');
			let year = this.getAttribute('date-year');
			self.value = new Date(year, month, date);
			self._trigger('select', self.value);
			return true;
		});
	}
}, ds.Events('change', 'select'));
ds.ui.Edit = ds.ui.View.extend({
	styles: `.__xedt { display: flex; flex-flow: row; }
			.__xedt .__xedt_prts { display: flex; flex-flow: row; flex: 1; }
			.__xedt .__xedt_lbl { padding-right: 18px; margin-top: 5px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; box-sizing: border-box; width: var(--xedt-lbl-width, 132); }
			.__xedt .__xedt_lbl .__xedt_lbl_txt { position: relative; color: var(--text-color-gray); }
			.__xedt.__xedt_ral .__xedt_lbl { text-align: right; }
			.__xedt.__xedt_lal .__xedt_lbl { text-align: left; padding-right: 6px; }
			.__xedt.__mandatory .__xedt_lbl > .__xedt_lbl_txt::after {
				content: '';		position: absolute;
				top: -1px;			right: -10px;
				width: 10px;		height: 10px;
				background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARUlEQVR4AWOAgQsu5v8ZSAIIjaVAbA4yAEqXkmpAMxDfABkApZtJNYARiHtABkBpRlIN0AbiK0AcBMQrQHyGkQdGwSgAAPtCJnBUV/TSAAAAAElFTkSuQmCC'); }
			.__xedt.__lbltop { flex-flow: column; }
			.__xedt.__lbltop { flex: none; }
			.__xedt.__lbltop .__xedt_lbl { padding-right: 6px; margin-top: 0px; width: inherit; }`,
	template: `<div class="__xedt {{ this._getRootClassList().join(' ') }}">
					<div x-if="this.label" class="__xedt_lbl" style="--xedt-lbl-width: {{ this.labelWidth }}px;"><span class="__xedt_lbl_txt">{{ this.label }}</span></div>
					<div class="__xedt_prts">
						@@parts	
					</div>
				</div>`,
	_loadingPrevDisabled: null,
	_lastChangedValue: null,
	_dataKey: null,
	_dataObject: null,
	_textAlign: 'left',
	_mandatory: false,
	_disabled: false,
	_readOnly: false,
	_inline: false,
	_required: false,
	_label: '',
	_labelWidth: 132, //128
	_labelOnTop: false,
	_small: false,
	get label() { return this._label; },
	set label(value) { this._label = value; this.needsUpdate(); },
	get labelWidth() { return this._labelWidth; },
	set labelWidth(value) { this._labelWidth = value; this.needsUpdate(); },
	get labelOnTop() { return this._labelOnTop; },
	set labelOnTop(value) { this._labelOnTop = value; this.needsUpdate(); },
	get mandatory() { return this._mandatory; },
	set mandatory(value) { this._mandatory = value; this.needsUpdate(); },
	get inline() { return this._inline; },
	set inline(value) { this._inline = value; this.needsUpdate(); },
	get textAlign() { return this._textAlign; },
	set textAlign(value) { this._textAlign = value; this.needsUpdate(); },
	get disabled() { return this._disabled; },
	set disabled(value) { this._disabled = value; this.needsUpdate(); },
	get readOnly() { return this._readOnly; },
	set readOnly(value) { this._readOnly = value; this.needsUpdate(); },
	get required() { return this._required; },
	set required(value) { this._required = value; this.needsUpdate(); },
	get small() { return this._small; },
	set small(value) { this._small = value; this.needsUpdate(); },
	get value() { return this._getValue(); },
	set value(value) {
		const self = this;
		const passed_value = self._passValue(value);
		if (self._lastChangedValue !== passed_value) {
			self._setValue(passed_value);
			self._setValueToDataObject(passed_value);
			self._lastChangedValue = passed_value;
			self._trigger('change', passed_value);
		}
		self.needsUpdate();
	},
	get dataObject() { return this._dataObject; },
	set dataObject(value) {
		const self = this;
		self._dataObject = value;
		if (self._dataObject) self._dataObject.on('load', self._onDataLoad.bind(self));
		if (self._dataKey && self._dataObject.isLoaded()) setTimeout(() => self._onDataLoad(), 0);
	},
	get dataKey() { return this._dataKey; },
	set dataKey(value) {
		const self = this;
		self._dataKey = value;
		if (self._dataKey && self._dataObject && self._dataObject.isLoaded()) setTimeout(() => self._onDataLoad(), 0);
	},
	_passValue(value) { return value; },
	_getValue() {},
	_setValue(value) {},
	_getRootClassList() {
		const self = this;
		let rootClassList = [self.textAlign == 'right' ? '__xedt_ral' : '__xedt_lal'];
		self.mandatory && rootClassList.push('__mandatory');
		self.disabled && rootClassList.push('__disabled');
		self.readOnly && rootClassList.push('__readonly');
		self.required && rootClassList.push('__required');
		self.inline && rootClassList.push('__inline');
		self.small && rootClassList.push('__small');
		self.labelOnTop && rootClassList.push('__lbltop');
		return rootClassList;
	},
	_setValueToDataObject(value) {
		const self = this;
		if (self._dataObject) {
			if (!self.dataKey) throw new Error('ds.ui.Edit: dataKey not specified.');
			if (self.mandatory && (value === null || value === undefined || value === '')) { /* do not set */ }
			else self._dataObject.set(self.dataKey, value);
		}
	},
	_onDataLoad() {
		const self = this;
		if (!self.element) return;
		let value;
		if (self._dataObject && self._dataKey && self._dataObject.isLoaded()) value = self._passValue(self._dataObject.get(self.dataKey));
		else value = self._getValue();
		self._setValue(value);
		self._lastChangedValue = value;
		self.needsUpdate();
	},
	loadingShow() {
		const self = this;
		self._loadingPrevDisabled = !!self.disabled;
		self.disabled = true;
	},
	loadingHide() {
		const self = this;
		if (self._loadingPrevDisabled === true || self._loadingPrevDisabled === false) self.disabled = self._loadingPrevDisabled;
		else {} // somebody called "loadingHide" without preceeding "loadingShow"...
	},
	loadingWhile(fn) {
		const self = this;
		if (!ds.isFunction(fn)) throw new Error('ds.ui.Edit: "fn" must be function.');
		(async () => {
			self.loadingShow();
			try { await fn(); }
			finally { self.loadingHide(); }
		})();
	},
	isEmpty() { return this.value === null || this.value === undefined || this.value === ''; },
	clear() {
		const self = this;
		self._lastChangedValue = undefined; // <-- !!
		self.value = null;
	},
	focus() {}
}, ds.Events('change'));
ds.ui.TextEdit = ds.ui.Edit.extend({
	InlineButton: ds.ui.View.extend({
		styles: `.__xedt_inline_btn:last-child { margin-right: 4px; }`,
		template: `<div	class="__xedt_inline_btn thvr hnd col mid cen"
						style="min-width: 20px;"
						x-on:mousedown="self._trigger('click'), e.preventDefault()">{{ ds.ui.element(this._text || '') }}</div>`,
		_text: '',
		get text() { return this._text; },
		set text(value) { this._text = value; this.needsUpdate() }
	}, ds.Events('click')),
	InlineSeparator: ds.ui.View.extend({ template: `<div class="bl" style="width: 1px; height: 11px; margin: 7px 2px 0px 2px;"></div>` }),
	styles: `.__xedt_frm {
				border: rgb(204, 204, 204) 1px solid;		box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset;
				background-color: white;					flex-wrap: wrap;
				overflow-x: hidden;							cursor: text;
				position: relative;	}
			.__xedt .__xedt_frm:hover { border-color: rgb(170, 170, 170); z-index: 2; }
			.__xedt .__xedt_frm input {
				flex: 1;					background-color: transparent;
				border: 0px solid;			padding: 3px 6px;
				margin: 0px;				min-height: 18px;  }
			.__xedt .__xedt_frm textarea {
				flex: 1;					background-color: transparent;
				border: 0px solid;			padding: 3px 6px;
				margin: 0px;				resize: none;
				height: calc(100% - 6px);	min-height: 18px;  }
			.__xedt .__xedt_frm .__xedt_frm_img { padding-left: 6px; padding-top: 4px; }
			.__xedt .__xedt_frm .__xedt_frm_img img { max-width: 16px; max-height: 16px; }
			.__xedt.__focused .__xedt_frm {
				border-color: #4aa7f0; 		/* #4a6785 #55acee */
				box-shadow: none;			z-index: 9;	}
			.__xedt.__pendingchanges:not(.__disabled) .__xedt_frm { border-color: #f0c74c; }
			.__xedt.__required:not(.__disabled) .__xedt_frm { border-color: #d04437; z-index: 2; }
			.__xedt.__disabled .__xedt_frm { background-color: var(--background-color); }
			.__xedt.__inline:not(.__droppeddown):not(.__frmhot):not(.__focused) .__xedt_frm:not(:hover) {
				border-color: transparent; 	background-color: transparent;
				box-shadow: none;	}
			.__xedt.__dark:not(.__focused) .__xedt_frm { background-color: rgba(0, 0, 0, 0.05) !important }
			.__xedt .__xedt_btn {
				border-radius: 0px; 		margin-left: -1px;
				padding-right: 0px;			height: 26px; 
				padding-left: 0px; 			min-height: 26px;
				min-width: 24px;			justify-content: center;  }
			.__xedt .__xedt_btn:hover { z-index: 2; }
			.__xedt.__inline:not(.__droppeddown):not(.__frmhot):not(.__focused) .__xedt_btn { display: none; }
			.__xedt .__xedt_clbtn { display: none; }
			.__xedt.__clearbtn .__xedt_clbtn { display: flex; }
			.__xedt.__disabled .__xedt_btn { display: none; }`,
	template: `@extend ds.ui.Edit.template
					@slot parts
						<div x-ref="frame_element" class="row flex __xedt_frm __xedt_frmhot_trgt" x-on:click="self._getInputElement().focus()">
							@@frame
							<div class="__xedt_frm_img" style="display:{{ this.image ? '' : 'none'; }}">
								<img src="{{ this.image || 'data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' }}" />	
							</div>
							<input x-ref="input_element" x-if="!this._textareaMode" type="text" size="1" maxlength="{{ this.maxLength.toString() }}" placeholder="{{ this.placeholder }}" />
							<textarea x-ref="textarea_element" x-if="this._textareaMode" maxlength="{{ this.maxLength.toString() }}" placeholder="{{ this.placeholder }}"></textarea>
							{{ this._inlineElements }}
						</div>
						@@buttons
						<div x-ref="buttons_element" class="row"></div>
						{{ this._clearBtn = this._clearBtn || ds.ui.Button.new({ hint: 'Очистить', text: '<i class="fa fa-trash-o gray sm"></i>', className: '__xedt_btn __xedt_clbtn __xedt_frmhot_trgt' })
							.on('click', () => this.clear()) }}
						@@parts
					@end
				@end`,
	_pendingchanges: false,
	_textareaMode: false,
	_inlineElements: null,
	_clearButton: false,
	_placeholder: '',
	_maxLength: 1000,
	_applyOnInput: false,
	_dark: false,
	_image: null,
	_pattern: null,
	get clearButton() { return this._clearButton; },
	set clearButton(value) { this._clearButton = value; this.needsUpdate(); },
	get placeholder() { return this._placeholder; },
	set placeholder(value) { this._placeholder = value; this.needsUpdate(); },
	get maxLength() { return this._maxLength; },
	set maxLength(value) { this._maxLength = value; this.needsUpdate(); },
	get applyOnInput() { return this._applyOnInput; },
	set applyOnInput(value) { this._applyOnInput = value; this.needsUpdate(); },
	get dark() { return this._dark; },
	set dark(value) { this._dark = value; this.needsUpdate(); },
	get image() { return this._image; },
	set image(value) { this._image = value; this.needsUpdate(); },
	get pattern() { return this._pattern; },
	set pattern(value) { this._pattern = value; this.needsUpdate(); },
	_getValue() {
		if (!this._getInputElement()) return null;
		if (this._getInputElement().value == '') return null;
		return this._getInputElement().value;
	},
	_setValue(value) {
		const input_element = this._getInputElement();
		if (input_element) {
			if (input_element.value !== value) input_element.value = value;
			this._pendingchanges = false;
		}
		else setTimeout(() => {
			let input_element = this._getInputElement();
			if (input_element) {
				if (input_element.value !== value) input_element.value = value;
				this._pendingchanges = false;
			}
		}, 0);
	},
	_getRootClassList() {
		const self = this;
		let rootClassList = ds.ui.Edit._getRootClassList.call(self);
		self.clearButton && rootClassList.push('__clearbtn');
		self.dark && rootClassList.push('__dark');
		(self._pendingchanges) && rootClassList.push('__pendingchanges');
		self.element.classList.contains('__focused') && rootClassList.push('__focused');
		return rootClassList;
	},
	_getInputElement() {
		const self = this;
		return self._textareaMode ? self.textarea_element : self.input_element;
	},
	_applyChanges() {
		const self = this;
		if (self.disabled) return;
		const val = self._getInputElement().value;
		self.value = (val == '' ? null : val);
	},
	_onFocusOut() {
		const self = this;
		if (!self.applyOnInput) self._applyChanges();
	},
	_onKeyPress(e) {
		const self = this;
		if (e.keyCode == 13) {
			if (self._textareaMode) return;
			self._onReturn();
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	},
	_onCut() {},
	_onCopy() {},
	_onPaste() {},
	_onInput() {
		const self = this;
		self._trigger('input', self._getInputElement().value);
		if (self.applyOnInput) self._applyChanges();
	},
	_onReturn() {
		const self = this;
		if (!self.applyOnInput) self._applyChanges();
		self._getInputElement().setSelectionRange(0, self._getInputElement().value.length);
		self._trigger('return');
	},
	addButton(options) {
		const self = this;
		let btn = ds.ui.Button.new(options);
		btn.element.classList.add('__xedt_btn');
		btn.element.classList.add('__xedt_frmhot_trgt');
		self.buttons_element.appendChild(btn.element);
		return btn;
	},
	addInlineButton(options) {
		const self = this;
		let btn = self.InlineButton.new(options);
		self._inlineElements.push(btn);
		self.needsUpdate();
		return btn;
	},
	addInlineSeparator(options) {
		const self = this;
		let sep = self.InlineSeparator.new(options);
		self._inlineElements.push(sep);
		self.needsUpdate();
		return sep;
	},
	update() {
		const self = this;
		ds.ui.Edit.update.call(self);
		if (!self.element) return;
		if (self.disabled || self.readOnly) self._getInputElement().setAttribute('readonly', 'true');
		else self._getInputElement().removeAttribute('readonly');
	},
	clear() {
		const self = this;
		if (self.readOnly) return;
		if (self.disabled) return;
		self._lastChangedValue = undefined; // <-- !!
		self.value = null;
		self._getInputElement().value = '';
	},
	focus() { this._getInputElement().focus(); },
	loadingShow() {
		const self = this;
		ds.ui.Edit.loadingShow.call(self);
		if (self._loading_element) return;
		self._loading_element = ds.ui.element(`<div class="abs ty-50 x16" style="top:50%;right:4px;"><div class="spinner"></div></div>`, self.frame_element);
	},
	loadingHide() {
		const self = this;
		ds.ui.Edit.loadingHide.call(self);
		if (!self._loading_element) return;
		self._loading_element.remove();
		self._loading_element = null;
	},
	init() {
		const self = this;
		ds.ui.Edit.init.call(self);
		self._inlineElements = [];
		self._getInputElement().addEventListener('cut', e => self._onCut(e));
		self._getInputElement().addEventListener('copy', e => self._onCopy(e));
		self._getInputElement().addEventListener('paste', e => self._onPaste(e));
		self._getInputElement().addEventListener('focusin', e => self.element.classList.add('__focused'));
		self._getInputElement().addEventListener('focusout', e => { self.element.classList.remove('__focused'); self._onFocusOut(); });
		self._getInputElement().addEventListener('input', e => {
			self._onInput();
			if (!self.applyOnInput) {
				self._pendingchanges = true;
				self.element.classList.add('__pendingchanges');
			}
		});
		self._getInputElement().addEventListener('keypress', e => {
			self._onKeyPress(e);
		});
		ds.ui.element_on(self.element, 'mouseover', '.__xedt_frmhot_trgt', e => {
			if (self.__freed) return false;
			self.element.classList.add('__frmhot');
			return true;
		});
		ds.ui.element_on(self.element, 'mouseout', '.__xedt_frmhot_trgt', e => {
			if (self.__freed) return false;
			self.element.classList.remove('__frmhot');
			return true;
		});
	}
}, ds.Events('return', 'input'));
ds.ui.MultilineTextEdit = ds.ui.TextEdit.extend({
	_ROW_HEIGHT: 20,
	_textareaMode: true,
	autoHeight: true,
	maxHeight: null,
	maxLength: 5000,
	rows: 1,
	_onInput() {
		const self = this;
		ds.ui.TextEdit._onInput.call(self);
		self._updateHeight();
	},
	_setValue(value) {
		const self = this;
		ds.ui.TextEdit._setValue.call(self, value);
		self._updateHeight();
	},
	_updateHeight() {
		const self = this;
		if (!self.frame_element || !self._getInputElement()) return;
		self.frame_element.style.minHeight = '24px';
		self.frame_element.style.maxHeight = self.maxHeight ? (self.maxHeight.toString() + 'px') : null;
		if (self.autoHeight) {
			self.frame_element.style.height = '24px';
			self.frame_element.style.height = (self._getInputElement().scrollHeight).toString() + 'px';	
		} else self.frame_element.style.height = (self._ROW_HEIGHT * self.rows).toString() + 'px';	
	},
	update() {
		const self = this;
		ds.ui.TextEdit.update.call(self);
		self._updateHeight();
	},
	init() {
		const self = this;
		ds.ui.TextEdit.init.call(self);
		ds.ui.element_whenvisible(self._getInputElement(), () => self.update());
	}
});
ds.ui.NumberEdit = ds.ui.TextEdit.extend({
	_precision: 2,
	_separator: ',',
	get separator() { return this._separator; },
	set separator(value) {
		if (![',', '.'].includes(value)) throw new Error('ds.ui.NumberEdit: "separator" can be "," or "." only.');
		this._separator = value;
		this.needsUpdate();
	},
	get precision() { return this._precision; },
	set precision(value) {
		if (value < 0) throw new Error('ds.ui.NumberEdit: "precision" cannot be negative.');
		if (value > 10) throw new Error('ds.ui.NumberEdit: "precision" cannot be greater than 10.');
		this._precision = value;
		this.needsUpdate();
	},
	_passValue(value) {
		const self = this;
		if (value === null || value === undefined || value === '') return null;
		else {
			const num_src = value.toString().replace(',', '.');
			if (!isFinite(num_src)) throw new Error('ds.ui.NumberEdit: Invalid number "' + num_src + '".');
			const num_dst = (new Number((new Number(num_src)).toFixed(self._precision))).valueOf();
			return num_dst;	
		}
	},
	_getValue() {
		const self = this;
		const input_element = self._getInputElement();
		if (!input_element) return null;
		else return self._passValue(input_element.value);
	},
	_setValue(value) {
		const input_element = this._getInputElement();
		const num_value = (ds.ifnull(value, '')).toString().replace('.', this._separator);
		if (input_element) {
			if (input_element.value !== num_value) input_element.value = num_value;
			this._pendingchanges = false;
		}
		else setTimeout(() => {
			let input_element = this._getInputElement();
			if (input_element) {
				if (input_element.value !== num_value) input_element.value = num_value;
				this._pendingchanges = false;
			}
		}, 0);
	},
	_insertText(separator, precision, current_value, selection_start, selection_end, insert_value) {
		const self = this;
		if (!separator) throw new Error('_insertByTextMask: "separator" is required.');
		if (!insert_value) throw new Error('_insertByTextMask: "insert_value" is required.');
		precision = precision || 0;
		current_value = ds.ifnull(current_value, '').toString();
		selection_start = selection_start || 0;
		selection_end = selection_end || 0;
		insert_value = ds.ifnull(insert_value, '').toString();
		const value_arr = current_value.split('');
		const insert_arr = insert_value.split('');
		if (selection_start > value_arr.length || selection_start < 0) throw new Error('_insertByTextMask: "selection_start" out of index, value: "' + current_value + '", index: "' + selection_start + '".');
		if (selection_end > value_arr.length || selection_end < 0) throw new Error('_insertByTextMask: "selection_end" out of index, value: "' + current_value + '", index: "' + selection_end + '".');
		const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', separator];
		if (insert_arr.some(c => !allowed.includes(c))) return false;
		if (precision == 0 && (insert_arr.includes('.') || insert_arr.includes(','))) return false;
		value_arr.splice(selection_start, (selection_end - selection_start));
		const pos = selection_start;
		const sep = value_arr.includes(',') ? ',' : (value_arr.includes('.') ? '.' : null);
		if (sep) {
			if (insert_arr.includes('.') || insert_arr.includes(',')) return false;
			const sep_idx = sep ? value_arr.indexOf(sep) : -1;
			const dec_arr = sep ? value_arr.slice(0, sep_idx) : [];
			const prc_arr = sep ? value_arr.slice(sep_idx + 1, value_arr.length) : [];
			if (pos <= sep_idx) {
				[].splice.apply(dec_arr, [pos, 0].concat(insert_arr));
				return dec_arr.concat([sep]).concat(prc_arr).join('');
			} else {
				const rem = precision - prc_arr.length;
				if (insert_arr.length > rem) return false;
				else {
					const prc_pos = pos - dec_arr.length - 1;
					[].splice.apply(prc_arr, [prc_pos, 0].concat(insert_arr));
					return dec_arr.concat([sep]).concat(prc_arr).join('');
				}
			}
		} else {
			[].splice.apply(value_arr, [pos, 0].concat(insert_arr));
			return value_arr.join('');
		}
	},
	_onKeyPress(e) {
		const self = this;
		if (e.keyCode == 13) {
			self._onReturn();
			e.preventDefault();
			e.stopImmediatePropagation();
			return;
		}
		const input_value = ds.ifnull(self._getInputElement().value, '');
		const new_value = self._insertText(self._separator, self._precision, input_value, self._getInputElement().selectionStart, self._getInputElement().selectionEnd, e.key);
		if (new_value) {
			// allow...
		} else {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	},
	_onPaste(e) {
		const self = this;
		const paste_data = e.clipboardData.getData('text');
		const input_value = ds.ifnull(self._getInputElement().value, '');
		const new_value = self._insertText(self._separator, self._precision, input_value, self._getInputElement().selectionStart, self._getInputElement().selectionEnd, paste_data);
		if (new_value) {
			// allow...
		} else {
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
});
ds.ui.CheckboxEdit = ds.ui.Edit.extend({
	styles: `.__xedt .__xedt_cbox { position: relative; width: 14px; height: 14px; margin-top: 5px; margin-bottom: 5px; border: rgb(204, 204, 204) 1px solid; background-color: white; box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset; cursor: pointer; }
			.__xedt .__xedt_cbox:hover { border-color: rgb(170, 170, 170); z-index: 2; }
			.__xedt.__checked .__xedt_cbox::after { content: ""; position: absolute; width: 10px; height: 8px; left: 2px; top: 3px; background-size: 10px 8px; background-position: center; background-repeat: no-repeat; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABGdBTUEAALGPC/xhBQAAAPtJREFUOBGtkrERwjAMRe2wRTxCCpqkZ4VUFAxDlqFgBhr6VBQpWCBbcOZ/ne0zhpgkoDvZsi09KVKU+lGapqlixCY+LLUB21trL2VZFuM4Xhm/GuhgJwDJ2BljNKGa1KWSwCRca/2AbosYlvYjfvN2Bnbo+34IwLquO5R/Y4APTvcvsDP9pYcOdsSZCVr0445+DHTwMgdGXw3HipW55kq86wc/QbLOhQmQSy6A70jmp8mjShPKpVvClKeg9MtVH8Noh/+QPWPvcNdC/bC4eztbGfxEApCnCag45j5THNzyAuTdJ+hcGOPfgCkUMAsNE+f7auGgqKsB/wh8AnTbtdDy2XnCAAAAAElFTkSuQmCC'); }
			.__xedt.__disabled .__xedt_cbox { background-color: var(--background-color); cursor: default; }
			.__xedt.__required .__xedt_cbox { border-color: #d04437; z-index: 2; }
			.__xedt.__inline .__xedt_cbox { margin-left: 7px; }`,
	_cbox_element: null,
	_value: null,
	passive: false,
	trueValue: 1,
	falseValue: 0,
	get checked() { return this.isChecked(); },
	set checked(value) { this.value = value ? this.trueValue : this.falseValue; },
	_getValue() { return this._value; },
	_setValue(value) { this._value = value; this.needsUpdate(); },
	isChecked() { return this._value == this.trueValue; },
	isEmpty() { return this.value != this.trueValue && this.value != this.falseValue; },
	update() {
		const self = this;
		ds.ui.Edit.update.call(self);
		if (!self.element) return;
		ds.ui.element_classif(self.element, '__checked', self.isChecked());
	},
	init() {
		const self = this;
		ds.ui.Edit.init.call(self);
		self._cbox_element = ds.ui.element('div.__xedt_cbox');
		self.element.insertBefore(self._cbox_element, self.element.querySelector('.__xedt_prts'));
		ds.ui.element_on(self.element, 'click', 'div.__xedt_cbox', function(e) {
			if (self.__freed) return false;
			if (self.passive) return true;
			if (self._disabled) return true;
			self.value = self.isChecked() ? self.falseValue : self.trueValue;
			return true;
		});
	}
});
ds.ui.DropDownEdit = ds.ui.TextEdit.extend({
	template: `@extend ds.ui.TextEdit.template
					@slot buttons
						{{ this._openBtn = this._openBtn || ds.ui.Button.new({ text: '<i class="fa fa-caret-down gray sm"></i>', className: '__xedt_btn __xedt_ddbtn __xedt_frmhot_trgt' })
							.on('click', () => {
								this._onOpenClick();
								this.open();
							}) }}
					@end
					@slot parts
						<div x-ref="dropdown_element" class="bl bt br bb bkw so2 col" style="display:none;">
							@@dropdown
						</div>
						@@parts
					@end
				@end`,
	_onOpenClick() {},
	_onCanOpen() { return true },
	_onBeforeOpen() {},
	_onOpen() {},
	_onClose() {},
	open() {
		const self = this;
		if (!self._onCanOpen()) return;
		self.dropdown_element.style.setProperty('width', ds.ui.element_rects(self.frame_element).inner.width.toString() + 'px');
		self._onBeforeOpen();
		self._popupHelper.open();
	},
	close() {
		const self = this;
		self._popupHelper.close();
		self._onClose();
	},
	init() {
		const self = this;
		ds.ui.TextEdit.init.call(self);
		self._popupHelper = ds.ui.PopupHelper.new({
			related: self.frame_element,
			target: self.dropdown_element,
			align: 'left',
			direction: 'down',
			offset: { top: -1 }
		});
		self._popupHelper.on('open', () => {
			self.element.classList.add('__droppeddown');
			self._openBtn.droppeddown = true;
			self._onOpen();
		});
		self._popupHelper.on('close', () => {
			if (self.element) {
				self.element.classList.remove('__droppeddown');
				self._openBtn.droppeddown = false;
			}
		});
	}
});
ds.ui.LookupEdit = ds.ui.DropDownEdit.extend({
	styles: `.__xedt_frm_chk_itm { border-style: solid; border-width: 1px; border-radius: 3px; padding: 0px 6px; margin: 2px 0px 2px 2px; background-color: #d2e7fb; border-color: #d2e7fb; color: #333; }`,
	template: `@extend ds.ui.DropDownEdit.template
					@slot frame
						{{ this._getCheckedLabels() }}
					@end
					@slot dropdown
						{{ this.listView = this.listView || ds.ui.ListView.new({ className: 'flex', selectable: true })
							.on('select', index => this._onSelectItem(index))
							.on('check', (index, checked) => this._onCheckItem(index, checked))
							.on('options', index => ({ hover: true, hand: true, checkbox: this.multiple })) }}
					@end
				@end`,
	_multiple: false,
	_dataSet: null,
	_nameKey: 'name',
	_imageKey: 'image',
	_imagePrefix: '',
	_defaultImage: null,
	_valueKey: 'id',
	_value: null,
	get multiple() { return this._multiple; },
	set multiple(value) { this._multiple = value; this.needsUpdate(); },
	get dataSet() { return this._dataSet; },
	set dataSet(value) {
		const self = this;
		self._dataSet = value;
		if (self._dataSet) {
			self._dataSet.on('load', () => self._onDataLoad());
			self._onDataLoad();	
		}
		self.needsUpdate();
	},
	get nameKey() { return this._nameKey; },
	set nameKey(value) { this._nameKey = value; this.needsUpdate(); },
	get imageKey() { return this._imageKey; },
	set imageKey(value) { this._imageKey = value; this.needsUpdate(); },
	get imagePrefix() { return this._imagePrefix; },
	set imagePrefix(value) { this._imagePrefix = value; this.needsUpdate(); },
	get defaultImage() { return this._defaultImage; },
	set defaultImage(value) { this._defaultImage = value; this.needsUpdate(); },
	get valueKey() { return this._valueKey; },
	set valueKey(value) { this._valueKey = value; this.needsUpdate(); },
	_getValue() { return this._value; },
	_setValue(value) {
		const self = this;
		if (self.multiple) {
			self._pendingchanges = false;
			if (value === null || value === undefined) value = [];
			else value = (ds.isArray(value) ? value : [value]);
			self._value = value;
			if (!self.dataSet || !self.valueKey || !self.nameKey) {
				self._image = null;
				self._getInputElement().value = '';
				self.listView.unselect();
				return;
			}
			self._value = self._value.filter(v => !!self.dataSet.data.find(item => ds.get(item, self.valueKey) == v));
		} else {
			self._value = value;
			if (ds.isnull(value)) {
				self._pendingchanges = false;
				self._value = null;
				self._image = null;
				self._getInputElement().value = '';
				self.listView.unselect();
				return;
			}
			if (!self.dataSet || !self.valueKey || !self.nameKey) {
				self._image = null;
				self._getInputElement().value = '';
				self.listView.unselect();
				return;
			}
			let item = self._dataSet.data.find(i => i[self.valueKey] == value);
			if (!item) {
				self._image = null;
				self._getInputElement().value = '';
				self.listView.unselect();
				return;
			}
			const image = self.imageKey ? ds.get(item, self.imageKey) : null;
			if (image) self._image = self.imagePrefix + image;
			else if (self.defaultImage) self._image = self._imagePrefix + self.defaultImage;
			else self._image = null;
			self._getInputElement().value = ds.get(item, self.nameKey);
			self._pendingchanges = false;
		}
	},
	_applyChanges() {
		const self = this;
		if (self.disabled) return;
		if (!self._dataSet) return;
		if (!self._nameKey) return;
		const text = self._getInputElement().value;
		if (self.multiple) { }
		else {
			const item = self._dataSet.data.find(i => ds.get(i, self.nameKey) == text);
			if (item && (self.value != item[self.valueKey])) {
				self._lastChangedValue = undefined; // <-- !!
				self.value = item[self.valueKey];
				self.close();
			}
		}
	},
	_onInput() {
		const self = this;
		if (!self._dataSet) return;
		let input_value = self._getInputElement().value;
		self.listView._search = input_value ? input_value.toString() : null;
		self.listView.update();
		self._popupHelper.adjust();
		self.open();
	},
	_onOpenClick() {
		const self = this;
		if (!!self.listView.search) self.listView.search = null;
	},
	_onCanOpen() {
		const self = this;
		if (!self.dataSet || !self.valueKey || self.readOnly || self.disabled) return false;
		return true;
	},
	_onBeforeOpen() {
		const self = this;
		if (self.multiple) {
			self.listView.checkAll(false, false);
			self.listView.check(self.value, true, false);
		} else {
			let item = self._dataSet.data.find(i => ds.get(i, self.valueKey) == self.value);
			self.listView.select(self._dataSet.data.indexOf(item), false);	
		}
	},
	_onSelectItem(index) {
		const self = this;
		if (self.disabled) return;
		self._lastChangedValue = undefined; // <-- to force set value...
		self.value = ds.get(self._dataSet.data[index], self.valueKey);
		self._trigger('select', self.value);
		self.close();
	},
	_onCheckItem(index, checked) {
		const self = this;
		if (self.disabled) return;
		if (!self.dataSet || !self.valueKey) return;
		if (self._value === null || self._value === undefined) self._value = [];
		else if (!ds.isArray(self._value)) self._value = [self._value];
		let value = ds.get(self.dataSet.data[index], self.valueKey);
		if (checked) self.value = self.value.concat(value);
		else self.value = self.value.filter(v => v != value);
		self._trigger('check', value, checked);
		self._getInputElement().value = '';
		self.needsUpdate().then(() => self._popupHelper.adjust());
	},
	_getCheckedLabels() {
		const self = this;
		if (!self.multiple || self.isEmpty() || !self.dataSet || !self.nameKey || !self.valueKey) return [];
		return (ds.isArray(self.value) ? self.value : [self.value])
				.map(value => self.dataSet.data.find(item => ds.get(item, self.valueKey) == value))
				.map(item => ds.get(item, self.nameKey))
				.map(text => ({ element: ds.ui.element('<div class="__xedt_frm_chk_itm">' + text + '</div>') }));
	},
	isEmpty() { return this.value === null || this.value === undefined || this.value === '' || (ds.isArray(this.value) && this.value.length == 0); },
	update() {
		const self = this;
		ds.ui.DropDownEdit.update.call(self);
		if (self.listView) {
			if (self.listView.idKey != self.valueKey) self.listView.idKey = self.valueKey;
			if (self.listView.nameKey != self.nameKey) self.listView.nameKey = self.nameKey;
			if (self.listView.imageKey != self.imageKey) self.listView.imageKey = self.imageKey;
			if (self.listView.imagePrefix != self.imagePrefix) self.listView.imagePrefix = self.imagePrefix;
			if (self.listView.defaultImage != self.defaultImage) self.listView.defaultImage = self.defaultImage;
			if (self.listView.dataSet != self.dataSet) self.listView.dataSet = self.dataSet;
		}
	}
}, ds.Events('select', 'check'));
ds.ui.TreeLookupEdit = ds.ui.DropDownEdit.extend({
	template: `@extend ds.ui.DropDownEdit.template
					@slot dropdown
						{{ this.treeView = this.treeView || ds.ui.TreeView.new({ className: 'flex' })
							.on('count', item => this._getCount(item))
							.on('item', (item, index) => this._getItem(item, index))
							.on('cell', item => this._trigger('cell', item))
							.on('select', node => this._onSelectItem(node))
							.on('options', item => this._getOptions(item)) }}
					@end
				@end`,
	_items: null,
	_value: null,
	_valueKey: 'id',
	_nameKey: 'name',
	_imageKey: 'image',
	_imagePrefix: null,
	_defaultImage: null,
	get nameKey() { return this._nameKey; },
	set nameKey(value) { this._nameKey = value; this.needsUpdate(); },
	get imageKey() { return this._imageKey; },
	set imageKey(value) { this._imageKey = value; this.needsUpdate(); },
	get imagePrefix() { return this._imagePrefix; },
	set imagePrefix(value) { this._imagePrefix = value; this.needsUpdate(); },
	get defaultImage() { return this._defaultImage; },
	set defaultImage(value) { this._defaultImage = value; this.needsUpdate(); },
	get valueKey() { return this._valueKey; },
	set valueKey(value) { this._valueKey = value; this.needsUpdate(); },
	_getValue() { return this._value; },
	_setValue(value) {
		const self = this;
		self._value = value;
		(async () => {
			let node = await self.treeView.findNode(value, self.valueKey);
			if (!node) {
				self._value = null;
				self._image = null;
				self.treeView.unselect();
				return;
			}
			let image = ds.get(node.item, self.imageKey);
			if (image) self._image = self.imagePrefix + image;
			else if (self.defaultImage) self._image = self._imagePrefix + self.defaultImage;
			else self._image = null;
			self._getInputElement().value = node.getBranch().map(node => node.item[self.nameKey]).join(' / ');;
			self.element.classList.remove('__pendingchanges');
			self.needsUpdate();
		})();
	},
	_applyChanges() { }, // <-- do not remove!...
	_onInput() { }, // <-- do not remove!...
	_onCanOpen() {
		const self = this;
		if (self.readOnly || self.disabled) return false;
		return true;
	},
	async _onBeforeOpen() {
		const self = this;
		let node = await self.treeView.findNode(self.value, self.valueKey);
		if (node) self.treeView.select(node, false);
	},
	_onSelectItem(node) {
		const self = this;
		if (self.disabled) return;
		self.value = node.getBranch().map(node => node.item[self.valueKey]).join('.');
		self._trigger('select', self.value);
		self.close();
	},
	async _getCount(item) {
		const self = this;
		if (!item) {
			self._items = (await self._trigger('children', null)) || [];
			return self._items.length;
		} else {
			item._items = (await self._trigger('children', item)) || [];
			return item._items.length;
		}
	},
	async _getItem(item, index) {
		const self = this;
		return item ? item._items[index] : self._items[index];
	},
	_getOptions(item) {
		const self = this;
		let has_children = this._trigger('has_children', item);
		if (has_children === null || has_children === undefined) has_children = true;
		return {
			clickAction: 'select',
			has_children: has_children
		}
	},
	update() {
		const self = this;
		ds.ui.DropDownEdit.update.call(self);
		self.treeView.update();
	},
	init() {
		const self = this;
		ds.ui.DropDownEdit.init.call(self);
		self.on('cell', item => {
			let image = ds.get(item, self.imageKey) || self.defaultImage;
			let cell_args = {
				image: self.imageKey && image ? (self.imagePrefix + image) : null,
				text: ds.get(item, self.nameKey),
				className: 'ml mr mt mb'
			}
			return ds.ui.Cell.new(cell_args);
		});
	}
}, ds.Events('children:single', 'has_children:single', 'cell:single', 'select'));
ds.ui.DateTimeEdit = ds.ui.DropDownEdit.extend({
	template: `@extend ds.ui.DropDownEdit.template
					@slot dropdown
						{{ this.calendar = this.calendar || ds.ui.Calendar.new({ className: 'flex' })
							.on('change', value => {
								this.value = ds.Date.newFromDate(value).toISODate();
								this.calendar.needsUpdate().then(() => this._popupHelper.adjust());
							})
							.on('select', () => this.close()) }}
					@end
				@end`,
	_dateValue: null,
	_value: null,
	_valueKey: 'id',
	get valueKey() { return this._valueKey; },
	set valueKey(value) { this._valueKey = value; this.needsUpdate(); },
	_getValue() { return this._value; },
	_setValue(value) {
		const self = this;
		self._value = value;
		if (!self._value) {
			self._dateValue = null;
			self._getInputElement().value = null;
			self.calendar._disableEvents = true;
			self.calendar.value = null;
			self.calendar._disableEvents = false;
		} else {
			self._dateValue = new Date(self._value);
			self._getInputElement().value = ds.Date.newFromDate(self._dateValue).DDMMYYYY();
			if (self._dateValue != self.calendar.value) {
				self.calendar._disableEvents = true;
				self.calendar.value = self._dateValue;
				self.calendar._disableEvents = false;
			}	
		}
	},
	_applyChanges() { }, // <-- do not remove!...
	_onInput() { }, // <-- do not remove!...
	_onCanOpen() {
		const self = this;
		if (self.readOnly || self.disabled) return false;
		return true;
	},
	update() {
		const self = this;
		ds.ui.DropDownEdit.update.call(self);
		self.calendar.update();
	},
	init() {
		const self = this;
		ds.ui.DropDownEdit.init.call(self);
		self.dropdown_element.style.setProperty('min-width', '210px');
		self.dropdown_element.style.setProperty('max-width', '210px');
		self._openBtn.text = `<i class="fa fa-calendar sm gray"></i>`;
		self.calendar._disableEvents = true;
		self.calendar.now();
		self.calendar._disableEvents = false;
	}
}, ds.Events('select'));
ds.ui.ListView = ds.ui.View.extend({
	styles: `.__xlstvw { overflow-y: auto; position: relative; display: flex; flex-flow: column; }
			 .__xlstvw .__xlstvw_item { position: relative; }
			 .__xlstvw .__xlstvw_item.__hvr:hover:not(.__selected) { background-color: var(--background-color-selected); }
			 .__xlstvw .__xlstvw_item.__selected { background-color: var(--background-color-highlighted); }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_cbox { font-size: 0px; cursor: pointer; }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_cbox > div:first-child { position: relative; display: inline-block; width: 14px; height: 14px; border: rgb(204, 204, 204) 1px solid; background-color: white; box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset; }
			 .__xlstvw .__xlstvw_item:hover .__xlstvw_item_cbox > div:first-child { border-color: rgb(170, 170, 170); z-index: 2 }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_cbox.__checked > div:first-child::after { content: ""; position: absolute; width: 10px; height: 8px; left: 2px; top: 3px; background-size: 10px 8px; background-image: url(\data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABGdBTUEAALGPC/xhBQAAAPtJREFUOBGtkrERwjAMRe2wRTxCCpqkZ4VUFAxDlqFgBhr6VBQpWCBbcOZ/ne0zhpgkoDvZsi09KVKU+lGapqlixCY+LLUB21trL2VZFuM4Xhm/GuhgJwDJ2BljNKGa1KWSwCRca/2AbosYlvYjfvN2Bnbo+34IwLquO5R/Y4APTvcvsDP9pYcOdsSZCVr0445+DHTwMgdGXw3HipW55kq86wc/QbLOhQmQSy6A70jmp8mjShPKpVvClKeg9MtVH8Noh/+QPWPvcNdC/bC4eztbGfxEApCnCag45j5THNzyAuTdJ+hcGOPfgCkUMAsNE+f7auGgqKsB/wh8AnTbtdDy2XnCAAAAAElFTkSuQmCC\) }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_actn { position: absolute; top: 0px; bottom: 0px; width: 28px; right: calc(28px * var(--action-index)); visibility: hidden; }
			 .__xlstvw .__xlstvw_item:hover .__xlstvw_item_actn { visibility: visible; }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_actn:hover { background-color: var(--background-color-selected); }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_actn > * { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0.25; }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_actn:hover > * { opacity: 1; }
			 .__xlstvw .__xlstvw_item .__xlstvw_item_cell { flex: 1; }
			 .__xlstvw_tshdw { position: absolute; left: 0px; top: 0px; right: 0px; height: 11px; pointer-events: none; box-shadow: inset 0px 10px 8px -10px #cccccc67; }
			 .__xlstvw_bshdw { position: absolute; left: 0px; bottom: 0px; right: 0px; height: 11px; pointer-events: none; box-shadow: inset 0px -10px 8px -10px #cccccc67; }`,
	template: `<div class="__xlstvw">
					<div x-ref="items_element" class="col flex scroll">
						<div x-for="item of this.items | preserve_element: element, preserve_item: __item"
							 	class="__xlstvw_item row mid{{ item.options.hover ? ' __hvr' : '' }}{{ item.options.hand ? ' hnd' : '' }}{{ item.selected ? ' __selected' : '' }} {{ item.options.className || '' }}"
							 	style="{{ !item.visible ? 'display:none;' : ''; }}">
							{{ item.checkbox_element }}
							{{ item.cell }}
							{{ item.action_elements }}
						</div>
					</div>
					<div x-ref="innerTopShadow_element" style="display:none;" class="__xlstvw_tshdw"></div>
					<div x-ref="innerBottomShadow_element" style="display:none;" class="__xlstvw_bshdw"></div>
				</div>`,
	_topShadowVisible: false,
	_bottomShadowVisible: false,
	_scrollShadow: false,
	_actions: null,
	_search: null,
	_dataSet: null,
	items: null,
	_selectable: false,
	_wrap: false,
	_trueDataValue: 1,
	_falseDataValue: 0,
	_idKey: 'id',
	_nameKey: 'name',
	_imageKey: 'type.image',
	_checkKey: '__checked',
	_imagePrefix: '/assets/sandbox/',
	_defaultImage: null,
	_cellArgs: null,
	selectedIndex: -1,
	keepSelection: false,
	cellPrototype: ds.ui.Cell.extend({ className: 'ml mr mt mb' }),
	get selectable() { return this._selectable; },
	set selectable(value) { this._selectable = value; this.needsUpdate(); },
	get wrap() { return this._wrap; },
	set wrap(value) { this._wrap = value; this.needsUpdate(); },
	get trueDataValue() { return this._trueDataValue; },
	set trueDataValue(value) { this._trueDataValue = value; this.needsUpdate(); },
	get falseDataValue() { return this._falseDataValue; },
	set falseDataValue(value) { this._falseDataValue = value; this.needsUpdate(); },
	get idKey() { return this._idKey; },
	set idKey(value) { this._idKey = value; this.needsUpdate(); },
	get nameKey() { return this._nameKey; },
	set nameKey(value) { this._nameKey = value; this.needsUpdate(); },
	get imageKey() { return this._imageKey; },
	set imageKey(value) { this._imageKey = value; this.needsUpdate(); },
	get checkKey() { return this._checkKey; },
	set checkKey(value) { this._checkKey = value; this.needsUpdate(); },
	get imagePrefix() { return this._imagePrefix; },
	set imagePrefix(value) { this._imagePrefix = value; this.needsUpdate(); },
	get defaultImage() { return this._defaultImage; },
	set defaultImage(value) { this._defaultImage = value; this.needsUpdate(); },
	get search() { return this._search; },
	set search(value) { this._search = value; this.needsUpdate(); },
	get cellArgs() { return this._cellArgs },
	set cellArgs(value) { this._cellArgs = value; this.needsUpdate(); },
	get dataSet() { return this._dataSet; },
	set dataSet(value) {
		if (!value) throw 'ds.ui.ListView: DataSet value cannot be null.';
		if (this._dataSet == value) return;
		if (this._dataSet) this._dataSet.off('load', this._dataSetOnLoad);
		this._dataSet = value;
		if (!this._dataSetOnLoad) this._dataSetOnLoad = () => this.needsUpdate();
		this._dataSet.on('load', this._dataSetOnLoad);
		if (this._dataSet.isLoaded()) this.needsUpdate();
	},
	get scrollShadow() { return this._scrollShadow; },
	set scrollShadow(value) { this._scrollShadow = value; this.needsUpdate(); },
	_checkInnerShadows() {
		const self = this;
		if (!self._scrollShadow) return;
		setTimeout(() => {
			if (self.items_element.scrollTop == 0 && self._topShadowVisible) {
				self.innerTopShadow_element.style.display = 'none';
				self._topShadowVisible = false;
			}
			if (self.items_element.scrollTop > 0 && !self._topShadowVisible) {
				self.innerTopShadow_element.style.display = '';
				self._topShadowVisible = true;
			}
			if ((self.items_element.scrollHeight - self.items_element.scrollTop) <= self.items_element.clientHeight && self._bottomShadowVisible) {
				self.innerBottomShadow_element.style.display = 'none';
				self._bottomShadowVisible = false;
			}
			if ((self.items_element.scrollHeight - self.items_element.scrollTop) > self.items_element.clientHeight && !self._bottomShadowVisible) {
				self.innerBottomShadow_element.style.display = '';
				self._bottomShadowVisible = true;
			}
		}, 0);
	},
	select(index, trigger_event) {
		const self = this;
		if (!self.selectable) return;
		self.unselect();
		let li = self.items[index];
		if (!li) return;
		li.selected = true;
		li.element.classList.add('__selected');
		self.selectedIndex = index;
		if (trigger_event) self._trigger('select', index);
	},
	unselect() {
		const self = this;
		self.selectedIndex = -1;
		self.items.forEach(lvi => {
			lvi.element.classList.remove('__selected');
			lvi.selected = false;
		});
	},
	toggleCheck(index, trigger_event) {
		const self = this;
		if (self.checkKey === null || self.checkKey === undefined) throw 'ds.ui.ListView: CheckKey is required.';
		let li = self.items[index];
		if (!li) throw new Error('ds.ui.ListView: Item does not exist by index "' + index.toString() + '".');
		li.item[self.checkKey] = li.item[self.checkKey] == self._trueDataValue ? self._falseDataValue : self._trueDataValue;
		let checked = li.item[self.checkKey] == self._trueDataValue;
		if (li.options.checkbox) li.checkbox_element.classList[checked ? 'add' : 'remove']('__checked');
		if (trigger_event) self._trigger('check', index, checked);
	},
	checkAll(checked, trigger_event) {
		const self = this;
		if (self.checkKey === null || self.checkKey === undefined) throw 'ds.ui.ListView: CheckKey is required.';
		self.items.forEach(li => {
			li.item[self.checkKey] = checked ? self._trueDataValue : self._falseDataValue;
			if (li.options.checkbox) li.checkbox_element.classList[checked ? 'add' : 'remove']('__checked');
			if (trigger_event) self._trigger('check', li.index, checked);
		});
	},
	check(values, checked, trigger_event) {
		const self = this;
		if (self.checkKey === null || self.checkKey === undefined) throw new Error('ds.ui.ListView: CheckKey is required.');
		if (values === null || values === undefined) return;
		values = ds.isArray(values) ? values : [values];
		self.items.forEach(li => {
			if (!values.includes(ds.get(li.item, self.idKey))) return;
			li.item[self.checkKey] = checked ? self._trueDataValue : self._falseDataValue;
			if (li.options.checkbox) li.checkbox_element.classList[checked ? 'add' : 'remove']('__checked');
			if (trigger_event) self._trigger('check', li.index, checked);
		});
	},
	checkedItems() {
		const self = this;
		if (!self.checkKey) throw 'ds.ui.ListView: CheckKey not specified, cannot work with checks.';
		if (!self.dataSet.isLoaded()) return [];
		var result = [];
		self.dataSet.data.forEach(item => {
			if (ds.get(item, self.checkKey) == self.trueDataValue) result.push(item);
		});
		return result;
	},
	checkedIds() {
		const self = this;
		return self.checkedItems().map(item => ds.get(item, self.idKey));
	},
	checkedNames() {
		const self = this;
		return self.checkedItems().map(item => ds.get(item, self.nameKey));
	},
	addAction(options) {
		const self = this;
		self._actions.push(options);
	},
	scrollIntoView(index) {
		const self = this;
		const li = self.items[index];
		if (li) li.element.scrollIntoView();
	},
	update() {
		const self = this;
		if (!self.element) return [];
		let keep_selection_id;
		if (self.keepSelection) {
			if (!self.idKey) throw new Error('ds.ui.ListView: keppSelection works only with idKey is set.');
			let lv_item = self.items[self.selectedIndex];
			if (lv_item) keep_selection_id = ds.get(lv_item.item, self.idKey);
			self.selectedIndex = -1;
		}
		self.items.forEach(item => item.cell.free());
		self.items = [];
		var count = self._trigger('count');
		for (let i = 0; i < count; i++) {
			var item = {
				element: null, // <-- will come here from preserve_element options in x-for
				index: i,
				item: self._trigger('item', i),
				selected: false,
				visible: true,
				options: Object.assign({ hover: false, hand: false, checkbox: false }, self._trigger('options', i)),
				cell: self._trigger('cell', i) || { element: document.createElement('span') },
				checkbox_element: null,
				action_elements: self._actions.map((a, i) => ds.ui.element(`<div class="__xlstvw_item_actn" data-action-index="${i.toString()}" style="--action-index: ${i.toString()};">${a.text || '&nbsp;'}</div>`))
			};
			item.cell.element.__xlv_item = item;
			item.cell.element.classList.add('__xlstvw_item_cell');
			if (self.keepSelection && keep_selection_id && (ds.get(item.item, self.idKey) == keep_selection_id)) self.selectedIndex = item.index;
			if (item.options.checkbox) {
				item.checkbox_element = ds.ui.element(`<div class="__xlstvw_item_cbox pl pt pb"><div></div></div>`);
				if (ds.get(item.item, self.checkKey) == self._trueDataValue) item.checkbox_element.classList.add('__checked');
			} else item.selected = self.selectedIndex == i;
			self.items.push(item);
		}
		if (self._search) {
			self.items.forEach(item => {
				item.visible = false;
				var text = self._trigger('text', item.index);
				if (text && text.toString().toUpperCase().includes(self._search.toUpperCase())) {
					item.visible = true;
					if (ds.isPrototypeOf(item.cell, ds.ui.Cell)) {
						item.cell._highlightedText = self._search;
						item.cell.update();	
					}
				}
			});	
		}
		if (self.wrap) self.element.classList.add('col', 'wrap', 'oxa');
		else self.element.classList.remove('col', 'wrap', 'oxa');
		ds.ui.View.update.call(self);
		self._checkInnerShadows();
	},
	init() {
		const self = this;
		self._actions = [];
		self.items = [];
		if (!self.cellArgs) self.cellArgs = {};
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.items_element, 'scroll', function(e) {
			if (self.__freed) return false;
			self._checkInnerShadows();
			return true;
		});
		ds.ui.element_on(self.element, 'click', '.__xlstvw_item_actn', function(e) {
			if (self.__freed) return false;
			e.stopImmediatePropagation();
			let item_index = ds.ui.element_parent(this, '.__xlstvw_item').__item.index;
			let action_index = parseInt(this.getAttribute('data-action-index'), 10);
			let action = self._actions[action_index];
			if (action && ds.isFunction(action.fn)) action.fn.call(null, item_index);
			return true;
		});
		ds.ui.element_on(self.element, 'click', '.__xlstvw_item', function(e) {
			if (self.__freed) return false;
			let cell_element = this.querySelector('.__xlstvw_item_cell');
			if (!cell_element) throw new Error('ds.ui.ListView: Cell element not found by selector ".__xlstvw_item_cell".');
			if (cell_element.__xlv_item.options.checkbox) self.toggleCheck(cell_element.__xlv_item.index, true);
			else self.select(cell_element.__xlv_item.index, true);
			return true;
		});
		self.on('count', () => self.dataSet && self.dataSet.isLoaded() ? self.dataSet.data.length : 0);
		self.on('text', index => {
			var item = self.dataSet.data[index];
			return ds.get(item, self.nameKey);
		});
		self.on('image', index => {
			var item = self.dataSet.data[index];
			var image = ds.get(item, self.imageKey) || self.defaultImage;
			return self.imageKey && image ? (self.imagePrefix + image) : null;
		});
		self.on('cell', index => {
			var cell_args = Object.assign({}, self.cellArgs);
			cell_args.image = self._trigger('image', index);
			cell_args.text = self._trigger('text', index);
			return self.cellPrototype.new(cell_args);
		});
		self.on('text', index => ds.get(self.dataSet.data[index], self.nameKey));
		self.on('item', index => self.dataSet.data[index]);
		self.on('options', index => ({ hover: false, hand: false, checkbox: false }));
	},
	free() {
		const self = this;
		if (self.items) self.items.forEach(item => item.cell.free());
		self.items = null;
		ds.ui.View.free.call(self);
	}
}, ds.Events('count:single', 'cell:single', 'text:single', 'item:single', 'options:single', 'text:single', 'image:single', 'check', 'select'));
ds.ui.TreeView = ds.ui.View.extend({
	styles: `.__xtree { overflow-x: auto; }
			.__xtree_nd.__selected > .row { background-color: var(--background-color-highlighted); }
			.__xtree_nd .__xcell { margin: 6px; }
			.__xtree_nd_ch:empty { display: none; }
			.__xtree_nd_cbox { display: none; margin-left: 6px; margin-top: 6px; font-size: 0px; cursor: pointer; }
			.__xtree_nd_cbox > div:first-child { position: relative; display: inline-block; transform: translateY(1px); width: 14px; height: 14px; border: rgb(204, 204, 204) 1px solid; background-color: white; box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset; }
			.__xtree_nd_cbox:hover > div:first-child { border-color: rgb(170, 170, 170); z-index: 2 }
			.__xtree_nd.__checked .row > .__xtree_nd_cbox > div:first-child::after { content: ""; position: absolute; width: 10px; height: 8px; left: 2px; top: 3px; background-size: 10px 8px; background-image: url(\data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABGdBTUEAALGPC/xhBQAAAPtJREFUOBGtkrERwjAMRe2wRTxCCpqkZ4VUFAxDlqFgBhr6VBQpWCBbcOZ/ne0zhpgkoDvZsi09KVKU+lGapqlixCY+LLUB21trL2VZFuM4Xhm/GuhgJwDJ2BljNKGa1KWSwCRca/2AbosYlvYjfvN2Bnbo+34IwLquO5R/Y4APTvcvsDP9pYcOdsSZCVr0445+DHTwMgdGXw3HipW55kq86wc/QbLOhQmQSy6A70jmp8mjShPKpVvClKeg9MtVH8Noh/+QPWPvcNdC/bC4eztbGfxEApCnCag45j5THNzyAuTdJ+hcGOPfgCkUMAsNE+f7auGgqKsB/wh8AnTbtdDy2XnCAAAAAElFTkSuQmCC\) }
			.__xtree_nd.__checkbox .row > .__xtree_nd_cbox { display: block; }
			.__xtree_nd_expbtn {
				width: 16px; 			height: 16px;
				margin-left: 6px; 		margin-top: 6px;
				cursor: pointer; 		opacity: 0.3;
				background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjZweCIgdmlld0JveD0iMCAwIDUgNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJ0cmVlX2NhcmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjAgMCA1IDMgMCA2Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg==');
				background-repeat: no-repeat;
				background-position: center; }
			.__xtree_nd_expbtn:hover { opacity: 1; }
			.__xtree_nd.__expanded > .row > .__xtree_nd_expbtn { transform: rotate(90deg); }`,
	template: `<div class="__xtree">{{ this._nodes = this._getNodes(null); }}</div>`,
	NodeView: ds.ui.View.extend({
		template: `<div class="__xtree_nd col{{ this.options.checkbox ? ' __checkbox' : '' }}{{ this.checked ? ' __checked' : '' }}{{ this._expanded ? ' __expanded' : '' }}{{ this == this.treeView.selectedNode ? ' __selected' : '' }}">
						<div class="row{{ this.options.hover ? ' hvr' : '' }}{{ this.options.hand ? ' hnd' : '' }}"
							style="padding-left:{{ this.level * 16 }}px;"
							x-on:click="self._onClick(e)">
							<div class="__xtree_nd_expbtn" x-on:click="self._onExpandClick(e)" style="visibility:{{ this.options.has_children ? 'visible' : 'hidden'; }}"></div>
							<div class="__xtree_nd_cbox"></div>
							{{ this.treeView._trigger('cell', this.item) }}
						</div>
						<div class="__xtree_nd_ch col">{{ this._expanded ? (this._nodes = this.treeView._getNodes(this)) : null }}</div>
					</div>`,
		_expanded: false,
		_nodes: null,
		treeView: null,
		parentNode: null,
		index: null,
		level: null,
		item: null,
		options: null,
		checked: false,
		get expanded() { return this._expanded; },
		set expanded(value) { this._expanded = value; this.needsUpdate(); },
		_onExpandClick(e) {
			const self = this;
			self.expanded = !self.expanded;
			e.stopImmediatePropagation();
		},
		_onClick(e) {
			const self = this;
			if (self.options.clickAction == 'select') self.treeView.select(self);
			else if (self.options.clickAction == 'expand') self.expanded = !self.expanded;
			else if (self.options.clickAction == 'check') {
				self.treeView._trigger('check', self);
				self.checked = !!self.treeView._trigger('checked', self.item);
				self.update();
			} else if (self.options.clickAction == 'click') self.treeView._trigger('click', self);
		},
		getBranch() {
			const self = this;
			let branch = [];
			let up = self;
			while (up) {
				branch.unshift(up);
				up = up.parentNode;
			}
			return branch;
		},
		update() {
			const self = this;
			self.options = Object.assign({ has_children: true, checkbox: false, hover: true, hand: true, clickAction: 'click' }, self.treeView._trigger('options', self.item));
			self.checked = !!self.treeView._trigger('checked', self.item);
			ds.ui.View.update.call(self);
		},
		init() {
			const self = this;
			if (!self.treeView) throw new Error('ds.ui.TreeView: TreeView must be specified for NodeView.');
			if (!self.item) throw new Error('ds.ui.TreeView: Item must be specified for NodeView.');
			if (self.index === null || self.index === undefined) throw new Error('ds.ui.TreeView: Index must be specified for NodeView.');
			if (self.level === null || self.level === undefined) throw new Error('ds.ui.TreeView: Level must be specified for NodeView.');
			ds.ui.View.init.call(self);
		}
	}),
	_nodes: null,
	async _getNodes(parent_node) {
		const self = this;
		let nodes = [];
		let count = (await self._trigger('count', parent_node ? parent_node.item : null)) || 0;
		for (let i = 0; i < count; i++) {
			let item = await self._trigger('item', parent_node ? parent_node.item : null, i);
			let node = ds.ui.TreeView.NodeView.new({ treeView: self, item: item, parentNode: parent_node, index: i, level: parent_node ? parent_node.level + 1 : 0 });
			nodes.push(node);
		}
		return nodes;
	},
	unselect() {
		const self = this;
		if (self.selectedNode && self.selectedNode.__freed) self.selectedNode = null;
		if (self.selectedNode) self.selectedNode.element.classList.remove('__selected');
		self.selectedNode = null;
	},
	select(node, trigger_event = true) {
		const self = this;
		self.unselect();
		if (!node) return;
		self.selectedNode = node;
		self.selectedNode.element.classList.add('__selected');
		ds.ui.element_scroll2view(self.element, self.selectedNode.element);
		if (trigger_event) self._trigger('select', node);
	},
	async findNode(value_path, prop_name, scroll = false) {
		const self = this;
		if (value_path === null || value_path === undefined) return;
		if (ds.isnull(value_path)) throw new Error('ds.ui.TreeView.locate: ValuePath is required.');
		if (ds.isnull(prop_name)) throw new Error('ds.ui.TreeView.locate: PropName is required.');
		const locate_level = (nodes, value) => nodes.find(node => ds.get(node.item, prop_name) == value);
		let nodes = await self._nodes;
		let node = null;
		let value_arr = value_path.split('.');
		for (let [index, value] of value_arr.entries()) {
			node = locate_level(nodes, value);
			if (!node) return null;
			if (index == value_arr.length - 1) break;
			node._expanded = true;
			node.update();
			nodes = await node._nodes;
			if (node._nodes.length == 0) return null;
		}
		return node;
	}
}, ds.Events('count:single', 'cell:single', 'item:single', 'options:single', 'checked:single', 'check', 'select', 'click'));
ds.ui.DataGridColumn = ds.Object.extend({
	_dataGrid: null,
	cellPrototype: ds.ui.Cell.extend({ className: 'flex ml mr mt mb' }),
	visible: true,
	text: '',
	dataKey: null,
	tagHollow: false,
	tagKey: null,
	tagColorKey: null,
	imageKey: null,
	imagePrefix: '',
	defaultImage: null,
	width: null,
	maxWidth: null,
	minWidth: null,
	textAlign: 'left',
	hover: true,
	sortable: true,
	sortDataType: String,
	searchable: false,
	link: false,
	emptyText: '',
	appendEdit: null,
	cells: null,
	get index() {
		const self = this;
		if (!self._dataGrid) throw 'ds.ui.DataGridColumn: _dataGrid property must be specified.';
		return self._dataGrid.columns.indexOf(self)
	},
	set index(value) { throw 'ds.ui.DataGridColumn: Index property is readOnly.' },
	onvalue(item) {
		const self = this;
		return self.dataKey ? ds.get(item, self.dataKey) : null;
	},
	ontext(item) {
		const self = this;
		let value = self.onvalue(item) || self.emptyText;
		return ds.isArray(value) ? value.join(', ') : ds.asString(value);
	},
	onimage(item) {
		const self = this;
		var image = self.imageKey ? (ds.get(item, self.imageKey) || self.defaultImage) : self.defaultImage;
		return image ? (image = self.imagePrefix + image) : null;
	},
	ontag(item) {
		const self = this;
		return self.tagKey ? ds.get(item, self.tagKey) : null;
	},
	ontagcolor(item) {
		const self = this;
		return self.tagColorKey ? (ds.get(item, self.tagColorKey) || 'navy') : 'navy';
	},
	onsort(a, b) {
		const self = this;		
		const v1 = new self.sortDataType(ds.get(a, self.dataKey));
		const v2 = new self.sortDataType(ds.get(b, self.dataKey));
		if (v1 > v2) return 1;
		else if (v1 < v2) return -1;
		else return 0;
	},
	isLast() {
		const self = this;
		if (!self._dataGrid) throw 'ds.ui.DataGridColumn: _dataGrid property must be specified.';
		return self.index == self._dataGrid.columns.length - 1;
	},
	getOuterStyle() {
		const self = this;
		var styles = '';
		if (self.width === null || self.width === undefined) styles += 'flex:1;';
		else if (ds.isString(self.width)) {
			if (self.width.slice(0, 4) == 'flex') styles += 'flex:' + (self.width.split(':')[1] || '1') + ';';
			else styles += 'width:' + self.width + ';';
		} else if (ds.isNumber(self.width)) styles += 'width:' + self.width.toString() + 'px;';
		if (ds.isString(self.maxWidth)) styles += 'max-width:' + self.maxWidth + ';';
		else if (ds.isNumber(self.maxWidth)) styles += 'max-width:' + self.maxWidth.toString() + 'px;';
		if (ds.isString(self.minWidth)) styles += 'min-width:' + self.minWidth + ';';
		else if (ds.isNumber(self.minWidth)) styles += 'min-width:' + self.minWidth.toString() + 'px;';
		return styles;
	},
	createCell(item, cell) {
		const self = this;
		let text = self.ontext(item);
		if (cell.options.link) {
			if (!text) text = '(пусто)';
			text = `<span class="__xgrd_cell_link lnk">${text}</span>`;
		}
		return self.cellPrototype.new({
			_text: text,
			_image: self.onimage(item),
			_tag: self.ontag(item),
			_tagColor: self.ontagcolor(item),
			_tagHollow: self.tagHollow,
			_textAlign: self.textAlign,
			__cell: cell
		});
	},
	createHeaderCell() {
		const self = this;
		var sort_button = '';
		if (self._dataGrid._sortColumn == self) {
			sort_button = `&nbsp;&nbsp;<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMHB4IiBoZWlnaHQ9IjEwcHgiIHZpZXdCb3g9IjAgMCAxMCAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iYXJyb3dfdXAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiMwMDAwMDAiIHg9IjQiIHk9IjEiIHdpZHRoPSIyIiBoZWlnaHQ9IjkiPjwvcmVjdD48cGF0aCBkPSJNMS41LDQuNSBMNSwxIiBpZD0iTGluZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjwvcGF0aD48cGF0aCBkPSJNOC41LDQuNSBMNSwxIiBpZD0iTGluZS1Db3B5IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9wYXRoPjwvZz48L3N2Zz4=" class="${self._dataGrid._sortDirection == 'asc' ? '__xgrd_hdr_cell_img_asc' : '__xgrd_hdr_cell_img_desc'}">`;
		}
		return ds.ui.Cell.new({
			_text: self.text + sort_button,
			_textAlign: self.textAlign,
			_nowrap: true,
			textClassName: 'sm bvl strong ' + (self._dataGrid.headerGrayText ? 'gray' : ''),
			className: 'flex ml mr mt mb'
		});
	},
	createAppendCell() {
		const self = this;
		if (!self.appendEdit) return document.createElement('div');
		return self.appendEdit;
	}
});
ds.ui.DataGridDateColumn = ds.ui.DataGridColumn.extend({
	time: true,
	ontext(item) {
		const self = this;
		let text = self.dataKey ? ds.get(item, self.dataKey) : null;
		return text ? (self.time ? ds.Date.newFromISO(text).DDMMYYYY_HHMM() : ds.Date.newFromISO(text).DDMMYYYY()) : null;
	}
});
ds.ui.DataGridUserColumn = ds.ui.DataGridColumn.extend({
	cellPrototype: ds.ui.Cell.extend({
		className: ds.ui.Cell.className + ' flex ml mr mt05',
		textClassName: ds.ui.Cell.textClassName + ' mt05 mb05',
		imageClassName: 'rnd',
		_imageSize: 'x24'
	}),
	imageKey: 'image',
	imagePrefix: '/assets/sandbox/users/',
	defaultImage: 'generic.svg'
});
ds.ui.DataGridActionColumn = ds.ui.DataGridColumn.extend({
	width: 41, // <-- 41 is optimal for font-awesome icons in text-align:center mode.
	hover: false,
	actionText: '',
	createCell(item, cell) {
		const self = this;
		const options = Object.assign({ visible: true }, self._dataGrid._trigger('action_options', cell));
		return ds.ui.Cell.new({
			_visible: options.visible,
			_text: self.actionText,
			_textAlign: 'center',
			className: '__xgrd_cell_actn thvr hnd pl pt pr pb',
			__cell: cell
		});
	}
});
ds.ui.DataGridCheckColumn = ds.ui.DataGridColumn.extend({
	dataKey: '__checked',
	width: 38,
	textAlign: 'center',
	readOnly: false,
	createCell(item, cell) {
		const self = this;
		var element = ds.ui.element(`<div class="__xgrd_cell_cbox pl pr pt pb"><div></div></div>`);
		if (self.textAlign == 'right') element.classList.add('tar');
		if (self.textAlign == 'center') element.classList.add('tac');
		if (ds.get(item, cell.column.dataKey) == 1) element.classList.add('__checked');
		element.__cell = cell;
		return { element: element };
	},
	getCheckedItems() {
		const self = this;
		var checked_items = [];
		self._dataGrid._gridBody._rows.forEach(row => {
			var this_cell = row.cells.find(cell => cell.column == self);
			if (this_cell && this_cell.row.item[self.dataKey] == 1) checked_items.push(this_cell.row.item);
		});
		return checked_items;
	}
});
ds.ui.DataGridEditColumn = ds.ui.DataGridColumn.extend({
	editPrototype: ds.ui.MultilineTextEdit.extend({ autoHeight: true }),
	readOnly: false,
	createCell(item, cell) {
		const self = this;
		cell.edit = self.editPrototype.new({ readOnly: self.readOnly, inline: true, className: 'flex ml05 mt05 mr05 mb05', dataGrid: self._dataGrid, dataGridCell: cell });
		cell.edit.value = ds.get(item, self.dataKey);
		cell.edit.on('change', value => self._dataGrid._trigger('edit', cell, value));
		return cell.edit;
	}
});
ds.ui.DataGrid = ds.ui.View.extend({
	template: `<div class="__xgrd col">
					{{ this._gridHeader = this._gridHeader || ds.ui.__DataGridHeader.new({ _dataGrid: this }) }}
					{{ this._gridBody = this._gridBody || ds.ui.__DataGridBody.new({ _dataGrid: this }) }}
					{{ this._gridAppend = this._gridAppend || ds.ui.__DataGridAppend.new({ _dataGrid: this }) }}
				</div>`,
	_gridHeader: null,
	_gridBody: null,
	_gridAppend: null,
	_dataSet: null,
	_sortColumn: null,
	_sortDirection: null,
	_search: null,
	_header: true,
	_headerGrayText: false,
	_headerCheckbox: true,
	_headerCheckboxRect: true,
	_hoverRows: false,
	_handRows: false,
	_selectRows: false,
	_hoverCells: false,
	_handCells: false,
	_appendable: false,
	_lastRowSeparator: false,
	_selectArrow: null,
	_idKey: null,
	_grouped: false,
	_groupDataKey: null,
	_groupImageKey: null,
	_groupImagePrefix: null,
	_groupDefaultImage: null,
	_groupTagKey: null,
	_groupTagColorKey: null,
	_groupTagHollow: false,
	_groupLink: false,
	_groupHeaderColumnIndex: 0,
	_groupHeaderUpperCase: false,
	_groupHeaderTextClassName: '',
	_groupHideColumn: false,
	_groupColumnText: false,
	_groupExpandable: false,
	_groupShowCount: false,
	_groupCheckbox: false,
	_groupCheckKey: null,
	_groupCellPrototype: ds.ui.Cell.extend({ className: 'flex ml mr mt05 mb05' }),
	_groupCheckboxRect: true,
	columns: null,
	data: null,
	spoilers: null,
	get header() { return this._header; },
	set header(value) { this._header = value; this.needsUpdate(); },
	get headerGrayText() { return this._headerGrayText; },
	set headerGrayText(value) { this._headerGrayText = value; this.needsUpdate(); },
	get headerCheckbox() { return this._headerCheckbox; },
	set headerCheckbox(value) { this._headerCheckbox = value; this.needsUpdate(); },
	get headerCheckboxRect() { return this._headerCheckboxRect; },
	set headerCheckboxRect(value) { this._headerCheckboxRect = value; this.needsUpdate(); },
	get hoverRows() { return this._hoverRows; },
	set hoverRows(value) { this._hoverRows = value; this.needsUpdate(); },
	get handRows() { return this._handRows; },
	set handRows(value) { this._handRows = value; this.needsUpdate(); },
	get selectRows() { return this._selectRows; },
	set selectRows(value) { this._selectRows = value; this.needsUpdate(); },
	get hoverCells() { return this._hoverCells; },
	set hoverCells(value) { this._hoverCells = value; this.needsUpdate(); },
	get handCells() { return this._handCells; },
	set handCells(value) { this._handCells = value; this.needsUpdate(); },
	get appendable() { return this._appendable; },
	set appendable(value) { this._appendable = value; this.needsUpdate(); },
	get lastRowSeparator() { return this._lastRowSeparator; },
	set lastRowSeparator(value) { this._lastRowSeparator = value; this.needsUpdate(); },
	get search() { return this._search; },
	set search(value) { this._search = value; this.needsUpdate() },
	get selectArrow() { return this._selectArrow; },
	set selectArrow(value) {
		if (!['left', 'right'].includes(value)) throw new Error('ds.ui.DataGrid: Only "left" or "right" values supported for property "selectArrow".');
		this._selectArrow = value;
		this.needsUpdate();
	},
	get grouped() { return this._grouped; },
	set grouped(value) { this._grouped = value; this.needsUpdate(); },
	get groupDataKey() { return this._groupDataKey; },
	set groupDataKey(value) { this._groupDataKey = value; this.needsUpdate(); },
	get groupImageKey() { return this._groupImageKey; },
	set groupImageKey(value) { this._groupImageKey = value; this.needsUpdate(); },
	get groupImagePrefix() { return this._groupImagePrefix; },
	set groupImagePrefix(value) { this._groupImagePrefix = value; this.needsUpdate(); },
	get groupDefaultImage() { return this._groupDefaultImage; },
	set groupDefaultImage(value) { this._groupDefaultImage = value; this.needsUpdate(); },
	get groupTagKey() { return this._groupTagKey; },
	set groupTagKey(value) { this._groupTagKey = value; this.needsUpdate(); },
	get groupTagColorKey() { return this._groupTagColorKey; },
	set groupTagColorKey(value) { this._groupTagColorKey = value; this.needsUpdate(); },
	get groupTagHollow() { return this._groupTagHollow; },
	set groupTagHollow(value) { this._groupTagHollow = value; this.needsUpdate(); },
	get groupHeaderColumnIndex() { return this._groupHeaderColumnIndex; },
	set groupHeaderColumnIndex(value) { this._groupHeaderColumnIndex = value; this.needsUpdate(); },
	get groupLink() { return this._groupLink; },
	set groupLink(value) { this._groupLink = value; this.needsUpdate(); },
	get groupCellPrototype() { return this._groupCellPrototype; },
	set groupCellPrototype(value) { this._groupCellPrototype = value; this.needsUpdate(); },
	get groupHeaderUpperCase() { return this._groupHeaderUpperCase; },
	set groupHeaderUpperCase(value) { this._groupHeaderUpperCase = value; this.needsUpdate(); },
	get groupHeaderTextClassName() { return this._groupHeaderTextClassName; },
	set groupHeaderTextClassName(value) { this._groupHeaderTextClassName = value; this.needsUpdate(); },
	get groupHideColumn() { return this._groupHideColumn; },
	set groupHideColumn(value) { this._groupHideColumn = value; this.needsUpdate(); },
	get groupColumnText() { return this._groupColumnText; },
	set groupColumnText(value) { this._groupColumnText = value; this.needsUpdate(); },
	get groupExpandable() { return this._groupExpandable; },
	set groupExpandable(value) { this._groupExpandable = value; this.needsUpdate(); },
	get groupShowCount() { return this._groupShowCount; },
	set groupShowCount(value) { this._groupShowCount = value; this.needsUpdate(); },
	get groupCheckbox() { return this._groupCheckbox; },
	set groupCheckbox(value) { this._groupCheckbox = value; this.needsUpdate(); },
	get groupCheckboxRect() { return this._groupCheckboxRect; },
	set groupCheckboxRect(value) { this._groupCheckboxRect = value; this.needsUpdate(); },
	get groupCheckKey() { return this._groupCheckKey; },
	set groupCheckKey(value) { this._groupCheckKey = value; this.needsUpdate(); },
	get idKey() { return this._idKey; },
	set idKey(value) { this._idKey = value; this.needsUpdate() },
	get dataSet() { return this._dataSet; },
	set dataSet(value) {
		if (!!this._dataSet) throw 'ds.ui.DataGrid: It\'s able to assign dataSet property once.';
		if (!value) throw 'ds.ui.DataGrid: DataSet value cannot be null.';
		this._dataSet = value;
		this._dataSet.on('load', () => this.needsUpdate());
		if (this._dataSet.isLoaded()) this.needsUpdate();
	},
	groupExpand(index, expand) {
		const self = this;
		let group = self._gridBody._groups[index];
		if (!group) return;
		self._gridBody._state.expanded[group.id] = expand;
		group.expand_element.innerHTML = `<i class="fa fa-caret-${ (expand ? 'down' : 'right') }"></i>`;
		group.body_element.style.setProperty('display', expand ? null : 'none');
		group.element.classList[expand ? 'add' : 'remove']('__expanded');
	},
	groupExpandAll(expand) {
		const self = this;
		self._gridBody._groups.forEach((group, index) => self.groupExpand(index, expand));
	},
	groupToggleExpand(index) {
		const self = this;
		let group = self._gridBody._groups[index];
		if (!group) return;
		self.groupExpand(index, !self._gridBody._state.expanded[group.id]);
	},
	spoilerAdd(options) {
		const self = this;
		options = Object.assign({ column: null, dataKey: null, dataValue: null, body: null, expanded: true }, options);
		if (!options.column) throw new Error('ds.ui.DataGrid: "column" is required when adding spoiler.');
		if (!options.dataKey) throw new Error('ds.ui.DataGrid: "dataKey" is required when adding spoiler.');
		if (!options.dataValue) throw new Error('ds.ui.DataGrid: "dataValue" is required when adding spoiler.');
		if (!options.body) throw new Error('ds.ui.DataGrid: "body" is required when adding spoiler.');
		self.spoilers.push(options);
		self.needsUpdate();
	},
	spoilerRemoveAll() {
		const self = this;
		self.spoilers = [];
		self.needsUpdate();
	},
	onshow() {
		const self = this;
		self._gridBody._checkInnerShadows();
	},
	update() {
		const self = this;
		ds.ui.View.update.call(self);
		self._gridHeader._visible = self.header;
		if (self._gridHeader) self._gridHeader.update();
		if (self._gridBody) self._gridBody.update();
		if (self._gridAppend) self._gridAppend.update();
		self._trigger('update');
	},
	init() {
		const self = this;
		if (!self.columns) self.columns = [];
		self.on('data', () => self._dataSet ? self._dataSet.data : (self.data || []));
		self.spoilers = [];
		ds.ui.View.init.call(self);
	},
	free() {
		const self = this;
		if (self._gridHeader) self._gridHeader.free();
		if (self._gridBody) self._gridBody.free();
		if (self._gridAppend) self._gridAppend.free();
		self._gridHeader = null;
		self._gridBody = null;
		self._gridAppend = null;
		ds.ui.View.free.call(self);
	}
}, ds.Events('data:single', 'link_click', 'action_options:single', 'action_click', 'header_click', 'row_click', 'row_dblclick', 'row_options:single', 'cell_options:single', 'cell', 'row', 'check', 'check_all', 'group_options:single', 'check_group', 'link_group_click', 'edit', 'update'));
ds.ui.__DataGridHeader = ds.ui.View.extend({
	styles: `.__xgrd_hdr { }
			 .__xgrd_hdr_cell_img_asc { transform: translateY(1px) rotate(180deg); opacity: 0.25 }
			 .__xgrd_hdr_cell_img_desc { transform: translateY(1px); opacity: 0.25 }
			 .__xgrd_hdr_cell { position: relative; overflow-x: hidden; }
			 .__xgrd_hdr_cell:not(:first-child)::after { content: ''; position: absolute; left: 0px; top: 0px; bottom: 0px; width: 1px; background: linear-gradient(transparent, #cccccc67, transparent); }`,
	template: `<div class="__xgrd_hdr __sbpad row bb">
					<div x-for="column of this._dataGrid.columns.filter(c => c.visible && !c._hiddenByGrouping)" data-column-index="{{ column.index }}" class="__xgrd_hdr_cell{{ column.hover ? ' hvr hnd' : '' }}" style="{{ column.getOuterStyle() }}">
						{{ column.createHeaderCell() }}
					</div>
				</div>`,
	_dataGrid: null,
	update() {
		const self = this;
		self._dataGrid.columns.forEach(column => {
			column._hiddenByGrouping = self._dataGrid._grouped && self._dataGrid._groupHideColumn && self._dataGrid._groupDataKey == column.dataKey;
			column._dataGrid = self._dataGrid;
		});
		ds.ui.View.update.call(self);
	},
	init() {
		const self = this;
		if (!self._dataGrid) throw 'ds.ui.__DataGridHeader: _dataGrid property must be specified.';
		self._dataGrid.columns.forEach(column => column._dataGrid = self._dataGrid);
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.element, 'click', 'div[data-column-index]', function(e) {
			if (self.__freed) return false;
			const column = self._dataGrid.columns[this.getAttribute('data-column-index')];
			self._dataGrid._trigger('header_click', column);
			if (!column.sortable || !column.dataKey) return true;
			if (ds.isPrototypeOf(column, ds.ui.DataGridCheckColumn)) {
				if (!self._dataGrid._headerCheckbox) return true;
				const dup = [];
				column.cells
					.filter(cell => dup.includes(cell.row.item) ? false : (dup.push(cell.row.item), true))
					.forEach(cell => self._dataGrid._gridBody._toggleCheckCell(cell, false));
				self._dataGrid._trigger('check_all');
				(self._dataGrid._gridBody._groups || []).forEach(group => self._dataGrid._gridBody._updateGroupCheck(group));
			} else {
				if (self._dataGrid._sortColumn == column) self._dataGrid._sortDirection = (self._dataGrid._sortDirection == 'asc' ? 'desc' : 'asc');
				else {
					self._dataGrid._sortColumn = column;
					self._dataGrid._sortDirection = 'asc';
				}
				self._dataGrid.needsUpdate();	
			}
			return true;
		});
	}
});
ds.ui.__DataGridBody = ds.ui.View.extend({
	styles: `.__xgrd_bdy { position: relative; min-height: 28px; }
			 /*.__xgrd_bdy:empty::after { content: "нет данных"; position: absolute; top: 7px; text-align: center; font-size: 12px; color: gray; left: 50%; transform: translateX(-50%); }*/
			 .__xgrd_bdy_grp { border-bottom-color: rgb(228, 228, 228); border-bottom-style: solid; border-bottom-width: 1px; }
			 .__xgrd_bdy_grp_hdr { border-bottom-color: rgb(228, 228, 228); border-bottom-style: solid; border-bottom-width: 0px; }
			 .__xgrd_bdy_grp_hdr_cell { overflow-y: hidden; }
			 .__xgrd_bdy_grp.__expanded .__xgrd_bdy_grp_hdr { border-bottom-width: 2px; }
			 .__xgrd_bdy_row { border-bottom-color: rgb(228, 228, 228); border-bottom-style: solid; border-bottom-width: 1px; }
			 .__xgrd_bdy_row.__selected { position: relative; background-color: var(--background-color-highlighted) !important; }
			 .__xgrd_bdy_row.__spoilered { border-bottom-width: 0px; }
			 .__xgrd_bdy.__xgrd_bdy_selarr_l .__xgrd_bdy_row.__selected::before, .__xgrd_bdy.__xgrd_bdy_selarr_l .__xgrd_bdy_row.__selected::after { content: ""; position: absolute; border-style: solid; left: 0px; top: 50%; transform: translateY(-50%); }
			 .__xgrd_bdy.__xgrd_bdy_selarr_l .__xgrd_bdy_row.__selected::before { border-color: transparent transparent transparent var(--border-color); border-width: 8px; }
			 .__xgrd_bdy.__xgrd_bdy_selarr_l .__xgrd_bdy_row.__selected::after { border-color: transparent transparent transparent white; border-width: 7px; }
			 .__xgrd_bdy.__xgrd_bdy_selarr_r .__xgrd_bdy_row.__selected::before, .__xgrd_bdy.__xgrd_bdy_selarr_r .__xgrd_bdy_row.__selected::after { content: ""; position: absolute; border-style: solid; right: 0px; top: 50%; transform: translateY(-50%); }
			 .__xgrd_bdy.__xgrd_bdy_selarr_r .__xgrd_bdy_row.__selected::before { border-color: transparent var(--border-color) transparent transparent; border-width: 8px; }
			 .__xgrd_bdy.__xgrd_bdy_selarr_r .__xgrd_bdy_row.__selected::after { border-color: transparent white transparent transparent; border-width: 7px; }
			 .__xgrd_bdy_cell { overflow: hidden; }
			 .__xgrd_bdy_row.__spoilered .__xgrd_bdy_cell {
			 	background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOXB4IiBoZWlnaHQ9IjFweCIgdmlld0JveD0iMCAwIDkgMSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJBcnRib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+CiAgICAgICAgPHBhdGggZD0iTTAuNSwwLjUgTDQuNSwwLjUiIGlkPSJMaW5lIiBzdHJva2U9IiNFNEU0RTQiPjwvcGF0aD4KICAgIDwvZz4KPC9zdmc+');
			 	background-position: bottom; background-repeat: repeat-x; }
			 .__xgrd_bdy_cell.__spoilered { position: relative;  }
			 .__xgrd_bdy_cell.__spoilered::before, .__xgrd_bdy_cell.__spoilered::after { content: ""; position: absolute; border-style: solid; bottom: -2px; left: 50%; transform: translateX(-50%); }
			 .__xgrd_bdy_cell.__spoilered::before { border-color: transparent transparent var(--border-color) transparent; border-width: 8px; }
			 .__xgrd_bdy_cell.__spoilered::after { border-color: transparent transparent white transparent; border-width: 7px; transform: translateX(-50%); }
			 .__xgrd_bdy_tshdw { position: absolute; left: 0px; top: 0px; right: 0px; height: 11px; pointer-events: none; box-shadow: inset 0px 10px 8px -10px #cccccc67; }
			 .__xgrd_bdy_bshdw { position: absolute; left: 0px; bottom: 0px; right: 0px; height: 11px; pointer-events: none; box-shadow: inset 0px -10px 8px -10px #cccccc67; }
			 .__xgrd_cell_link {}
			 .__xgrd_cell_actn { visibility: hidden; }
			 .__xgrd_cell_cbox { font-size: 0px; cursor: pointer; }
			 .__xgrd_cell_cbox > div:first-child { position: relative; display: inline-block; transform: translateY(1px); width: 14px; height: 14px; border: rgb(204, 204, 204) 1px solid; background-color: white; box-shadow: rgba(0, 0, 0, 0.0588235) 0px 1px 1px 0px inset; }
			 .__xgrd_cell_cbox:hover > div:first-child { border-color: rgb(170, 170, 170); z-index: 2 }
			 .__xgrd_cell_cbox.__checked > div:first-child::after { content: ""; position: absolute; width: 10px; height: 8px; left: 2px; top: 3px; background-size: 10px 8px; background-image: url(\data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABGdBTUEAALGPC/xhBQAAAPtJREFUOBGtkrERwjAMRe2wRTxCCpqkZ4VUFAxDlqFgBhr6VBQpWCBbcOZ/ne0zhpgkoDvZsi09KVKU+lGapqlixCY+LLUB21trL2VZFuM4Xhm/GuhgJwDJ2BljNKGa1KWSwCRca/2AbosYlvYjfvN2Bnbo+34IwLquO5R/Y4APTvcvsDP9pYcOdsSZCVr0445+DHTwMgdGXw3HipW55kq86wc/QbLOhQmQSy6A70jmp8mjShPKpVvClKeg9MtVH8Noh/+QPWPvcNdC/bC4eztbGfxEApCnCag45j5THNzyAuTdJ+hcGOPfgCkUMAsNE+f7auGgqKsB/wh8AnTbtdDy2XnCAAAAAElFTkSuQmCC\) }
			 .__xgrd_cell_cbox.__mixed > div:first-child::after { content: ""; position: absolute; width: 6px; height: 6px; left: 4px; top: 4px; background-color: black; border-radius: 2px; }
			 .__xgrd_bdy_row:hover .__xgrd_cell_actn { visibility: visible; }
			 .__xgrd_bdy_grp_bdy .__xgrd_bdy_row:last-child { border-bottom-width: 0px; }
			 .__xgrd_bdy.__nolastrowsep .__xgrd_bdy_row:last-child { border-bottom-width: 0px; }
			 .__xgrd_bdy.__nolastrowsep .__xgrd_bdy_grp:last-child { border-bottom-width: 0px; }
			 .__xgrd_bdy_grp_hdr_exp { width: 36px; height: 28px; text-align: center; line-height: 30px; vertical-align: middle; }
			 .__xgrd_bdy_row_spoiler { border-bottom-color: rgb(228, 228, 228); border-bottom-style: solid; border-bottom-width: 1px; }`,
	template: `<div class="__xgrd_bdy col flex{{ this._dataGrid.selectArrow == 'left' ? ' __xgrd_bdy_selarr_l' : '' }}{{ this._dataGrid.selectArrow == 'right' ? ' __xgrd_bdy_selarr_r' : '' }}{{ !this._dataGrid.lastRowSeparator ? ' __nolastrowsep' : '' }}">
					<div x-ref="innerTopShadow_element" style="display:none;" class="__xgrd_bdy_tshdw __sbpad"></div>
					<div x-ref="rows_element" class="col flex __sbpad" style="overflow-y: auto;">{{ this._getDataElements() }}</div>
					<div x-ref="innerBottomShadow_element" style="display:none;" class="__xgrd_bdy_bshdw __sbpad"></div>
				</div>`,
	_data_hash: null,
	_state: null,
	_dataGrid: null,
	_groups: null,
	_rows: null,
	_topShadowVisible: false,
	_bottomShadowVisible: false,
	_selectedId: null,
	_sortData(data) {
		const self = this;
		if (!data) return data;
		if (data.length == 0) return data;
		if (self._dataGrid._sortColumn && self._dataGrid._sortColumn.dataKey) {
			const sortColumn = self._dataGrid._sortColumn;
			const sortDirection = self._dataGrid._sortDirection;
			data.sort((a, b) => {
				const value = sortColumn.onsort(a, b);
				return sortDirection == 'asc' ? value : (value * -1);
			});
		}
		if (self._dataGrid._grouped && self._dataGrid._groupDataKey) {
			const group_ids = [];
			data.forEach(item => {
				const group_key = ds.get(item, self._dataGrid._groupDataKey) || '';
				const group_id = (ds.isArray(group_key) ? group_key : [group_key]).join('_');
				if (!group_ids.includes(group_id)) group_ids.push(group_id);
			});
			group_ids.sort((a, b) => {
				if (a > b) return 1;
				else if (a < b) return -1;
				else return 0;
			});
			const new_data = [];
			group_ids.forEach(group_id => {
				data.forEach(item => {
					const item_group_key = ds.get(item, self._dataGrid._groupDataKey) || '';
					const item_group_id = (ds.isArray(item_group_key) ? item_group_key : [item_group_key]).join('_');
					if (item_group_id == group_id) new_data.push(item);
				});
			});
			data = new_data;
		}
		return data;
	},
	_checkInnerShadows() {
		const self = this;
		setTimeout(() => {
			if (self.rows_element.scrollTop == 0 && self._topShadowVisible) {
				self.innerTopShadow_element.style.display = 'none';
				self._topShadowVisible = false;
			}
			if (self.rows_element.scrollTop > 0 && !self._topShadowVisible) {
				self.innerTopShadow_element.style.display = '';
				self._topShadowVisible = true;
			}
			if ((self.rows_element.scrollHeight - self.rows_element.scrollTop) <= self.rows_element.clientHeight && self._bottomShadowVisible) {
				self.innerBottomShadow_element.style.display = 'none';
				self._bottomShadowVisible = false;
			}
			if ((self.rows_element.scrollHeight - self.rows_element.scrollTop) > self.rows_element.clientHeight && !self._bottomShadowVisible) {
				self.innerBottomShadow_element.style.display = '';
				self._bottomShadowVisible = true;
			}
		}, 0);
	},
	_toggleCheckCell(cell, triggerEvent = true) {
		const self = this;
		if (cell.column.readOnly) return;
		if (!cell.column.dataKey) return;
		if (!ds.isPrototypeOf(cell.column, ds.ui.DataGridCheckColumn)) return;
		let value = cell.row.item[cell.column.dataKey] == 1 ? 0 : 1;
		cell.row.item[cell.column.dataKey] = value;
		cell.column.cells.forEach(c => {
			if (c.row.item == cell.row.item) ds.ui.element_classif(c.cell.element, '__checked', value == 1);		
		});
		if (triggerEvent) self._dataGrid._trigger('check', cell, value == 1);
	},
	_checkCell(cell, checked = true, triggerEvent = true) {
		const self = this;
		if (cell.column.readOnly) return;
		if (!cell.column.dataKey) return;
		if (!ds.isPrototypeOf(cell.column, ds.ui.DataGridCheckColumn)) return;
		cell.row.item[cell.column.dataKey] = checked ? 1 : 0;
		cell.cell.element.classList.add('__checked');
		if (triggerEvent) self._dataGrid._trigger('check', cell, checked);
	},
	_createGroupCell(group) {
		const self = this;
		const getText = () => {
			let text = group.value;
			if (self._dataGrid._groupColumnText) {
				let column = self._dataGrid.columns.find(c => c.dataKey == self._dataGrid._groupDataKey);
				if (column) text = column.text + ': ' + text;
			}
			if (self._dataGrid._groupHeaderUpperCase) text = (text || '').toUpperCase();
			return text;
		}
		const getImage = () => {
			let image = self._dataGrid.groupImageKey ? (ds.get(group.item, self._dataGrid.groupImageKey) || self._dataGrid.groupDefaultImage) : self._dataGrid.groupDefaultImage;
			return image ? (image = (self._dataGrid.groupImagePrefix || '') + image) : null;
		}
		const getTag = () => self._dataGrid.groupTagKey ? ds.get(group.item, self._dataGrid.groupTagKey) : null;
		const getTagColor = () => self._dataGrid.groupTagColorKey ? (ds.get(group.item, self._dataGrid.groupTagColorKey) || 'navy') : 'navy';
		return self._dataGrid._groupCellPrototype.new({
			_text: self._dataGrid.groupLink ? `<span class="__xgrd_grp_bdy_grp_cell_link lnk">${ getText() || '(пусто)' }</span>` : getText(),
			_image: getImage(),
			_tag: getTag(),
			_tagColor: getTagColor(),
			_tagHollow: self._dataGrid.groupTagHollow,
			_textAlign: 'left',
			_badge: self._dataGrid.groupShowCount ? group.rows.count : null,
			badgeClassName: self._dataGrid.groupShowCount ? 'gray' : null,
			textClassName: self._dataGrid._groupHeaderTextClassName
		});
	},
	_updateGroupCheck(group) {
		const self = this;
		if (!group.cbox_element) return;
		let mode = 'none';
		if (self._dataGrid._groupCheckKey) {
			let checked_n = 0;
			group.rows.forEach(row => {
				if (ds.get(row.item, self._dataGrid._groupCheckKey) == 1) checked_n += 1;
			});
			if (checked_n == 0) mode = 'none';
			else if (checked_n == group.rows.length) mode = 'checked';
			else mode = 'mixed';
		}
		if (mode == 'mixed') {
			group.cbox_element.classList.remove('__checked');
			group.cbox_element.classList.add('__mixed');
		} else if (mode == 'checked') {
			group.cbox_element.classList.add('__checked');
			group.cbox_element.classList.remove('__mixed');
		} else {
			group.cbox_element.classList.remove('__checked');
			group.cbox_element.classList.remove('__mixed');
		}
	},
	_getDataElements() {
		const self = this;
		self._groups.forEach((group, index) => {
			if (ds.isnull(self._state.expanded[group.id])) self._state.expanded[group.id] = true;
			let expanded = self._state.expanded[group.id];
			group.cell = self._createGroupCell(group);
			group.element = ds.ui.element(`<div class="__xgrd_bdy_grp${ (expanded ? ' __expanded' : '') }" data-group-index="${index}"></div>`);
			group.head_element = ds.ui.element(`<div class="__xgrd_bdy_grp_hdr row"></div>`, group.element);
			for (let i = 0; i < Math.min(self._dataGrid._groupHeaderColumnIndex, self._dataGrid.columns.length); i++) {
				let column = self._dataGrid.columns[i];
				if (!column.visible) continue;
				let dummy_element = ds.ui.element('<div class="__xgrd_bdy_grp_hdr_cell"></div>', group.head_element);
				dummy_element.setAttribute('style', column.getOuterStyle());
				if (i == 0 && self._dataGrid._groupCheckbox) {
					dummy_element.classList.add('__xgrd_bdy_grp_hdr_cbox');
					if (self._dataGrid._groupCheckboxRect) {
						group.cbox_element = ds.ui.element(`<div class="__xgrd_cell_cbox __mixed pl pr pt075 pb075 ty-1"><div></div></div>`);
						dummy_element.appendChild(group.cbox_element);
					} else dummy_element.classList.add('hvr', 'hnd');
				}
			}
			group.cell_element = ds.ui.element(`<div class="__xgrd_bdy_grp_hdr_cell row mid"></div>`, group.head_element);
			group.body_element = ds.ui.element(`<div class="__xgrd_bdy_grp_bdy col"></div>`, group.element);
			group.body_element.style.setProperty('display', expanded ? null : 'none');
			if (self._dataGrid._groupExpandable) {
				group.expand_element = ds.ui.element(`<div class="__xgrd_bdy_grp_hdr_exp thvr hnd -mr15"><i class="fa fa-caret-${ (expanded ? 'down' : 'right') }"></i></div>`, group.cell_element);
			}
			group.cell_element.appendChild(group.cell.element);
		});
		self._rows.forEach((row, index) => {
			row.element = document.createElement('div');
			row.element.setAttribute('data-row-index', row.index);
			row.element.classList.add('__xgrd_bdy_row', 'row');
			ds.ui.element_classif(
				row.element,
				'__selected',	self._dataGrid.idKey && (ds.get(row.item, self._dataGrid.idKey) == self._selectedId),
				'hvr',			self._dataGrid.hoverRows,
				'hnd',			self._dataGrid.handRows  );
			row.element.style.backgroundColor = row.options.color;
			row.cells.filter(c => c.column.visible && !c.column._hiddenByGrouping).forEach(cell => {
				cell.element = document.createElement('div');
				cell.element.setAttribute('data-cell-index', cell.index);
				cell.element.setAttribute('style', cell.column.getOuterStyle());
				cell.element.classList.add('__xgrd_bdy_cell');
				ds.ui.element_classif(cell.element, 'hvr', self._dataGrid.hoverCells, 'hnd', self._dataGrid.handCells);
				cell.element.appendChild(cell.cell.element);
				row.element.appendChild(cell.element);
			});
			if (row.spoiler) {
				const apply_spoiler = async (body) => {
					row.spoiler_element = ds.ui.element(`<div class="__xgrd_bdy_row_spoiler" style="display:none;"></div>`);
					if (ds.isPromise(body)) body = await body;
					if (body !== null && body !== undefined && body !== '') {
						row.element.classList.add('__spoilered');
						row.spoiler_element.style.display = '';
						if (ds.isPrototypeOf(body, ds.ui.View)) row.spoiler_element.appendChild(body.element);
						else if (ds.isPrototypeOf(body, HTMLElement)) row.spoiler_element.appendChild(body);
						else row.spoiler_element.appendChild(ds.ui.element(`<div class="ml mt mr mb">${body}</div>`));
						const cell = row.cells.find(c => c.column == row.spoiler.column && !!c.element);
						if (cell) {
							cell.element.classList.add('__spoilered');
							cell.element.style.setProperty('--cell-arw-pos', '30px');
						}
					}
				}
				if (ds.isFunction(row.spoiler.body)) apply_spoiler(row.spoiler.body.call(null, row));
				else apply_spoiler(row.spoiler.body)
			}
		});
		self._groups.forEach(group => {
			const options = Object.assign({ color: null }, self._dataGrid._trigger('group_options', group));
			if (options.color) group.head_element.style.setProperty('background-color', options.color);
			self._updateGroupCheck(group);
		});
		return self._rows.filter(row => row.visible).reduce((acc, row) => {
			if (row.group && self._dataGrid.grouped) {
				row.group.body_element.appendChild(row.element);
				if (row.spoiler_element) row.group.body_element.appendChild(row.spoiler_element);
				if (!row.group.__appended) {
					acc.push(row.group.element);
					row.group.__appended = true;
				}
			} else {
				acc.push(row.element);
				if (row.spoiler_element) acc.push(row.spoiler_element);
			}
			return acc;
		}, []);
	},
	update() {
		const self = this;
		self._dataGrid.columns.forEach(column => {
			column._dataGrid = self._dataGrid;
			column.cells = [];
		});
		let data = self._dataGrid._trigger('data') || [];
		let data_hash = JSON.stringify(data);
		if (self.data_hash == data_hash) {
			ds.ui.View.update.call(self);
			self._checkInnerShadows();
			return;
		}
		let groups = [];
		let rows = [];
		const row_proto = {
			isFirst() { return this.index == 0; },
			isLast() { return this.index == self._rows.length - 1; },
			prev() {
				if (this.isFirst()) return null;
				else return self._rows[this.index - 1];
			},
			next() {
				if (this.isLast()) return null;
				else return self._rows[this.index + 1];
			}
		}
		const make_row = (item, group, spoiler) => {
			let row = Object.assign(Object.create(row_proto), { item: item, index: rows.length, group: group, cells: [], visible: true, spoiler: spoiler });
			rows.push(row);
			row.group && row.group.rows.push(row);
			for (let col_index = 0; col_index < self._dataGrid.columns.length; col_index++) {
				let column = self._dataGrid.columns[col_index];
				let cell = { column: column, index: col_index, row: row };
				column.cells.push(cell);
				row.cells.push(cell);
			}
		}
		data = self._sortData(data);
		let count = data.length;
		for (let row_index = 0; row_index < count; row_index++) {
			let item = data[row_index];
			let item_groups = (() => {
									if (!self._dataGrid._grouped || !self._dataGrid._groupDataKey) return null;
									let value = ds.get(item, self._dataGrid._groupDataKey);
									if (ds.isnull(value)) return null;
									return (ds.isArray(value) ? value : [value]).map(value_item => {
										let group = groups.find(g => g.value == value_item);
										if (!group) groups.push(group = { id: self._dataGrid._groupDataKey + '_' + value_item, value: value_item, item: item, rows: [] })
										return group;
									});
								})() || [];
			let item_spoilers = self._dataGrid.spoilers.filter(s => s.dataValue == ds.get(item, s.dataKey));
			if (item_spoilers.length > 1) console.warn(`ds.ui.DataGrid: Found more than one spoiler for one row.`);
			if (item_groups.length > 0) item_groups.forEach(group => make_row(item, group, item_spoilers[0]));
			else make_row(item, null, item_spoilers[0]);
		}
		rows.forEach(row => {
			row.options = Object.assign({ color: null }, self._dataGrid._trigger('row_options', row) || {});
			row.cells.forEach(cell => {
				cell.options = Object.assign({ link: cell.column.link }, self._dataGrid._trigger('cell_options', cell) || {});
				cell.cell = cell.column.createCell(row.item, cell);
				self._dataGrid._trigger('cell', cell);
			});
			self._dataGrid._trigger('row', row);
		});
		if (self._dataGrid.search) {
			rows.forEach(row => {
				row.visible = false;
				row.cells.forEach(cell => {
					if (!cell.column.searchable) return;
					if (!cell.column.dataKey) return;
					var text = cell.column.ontext(row.item);
					if (text && text.toString().toUpperCase().includes(self._dataGrid.search.toUpperCase())) {
						row.visible = true;
						if (row.group) self._state.expanded[row.group.id] = true;
						if (ds.isPrototypeOf(cell.cell, ds.ui.Cell)) {
							cell.cell._highlightedText = self._dataGrid.search;
							cell.cell.update();	
						}
					}
				});
			});	
		}
		self._groups = groups;
		self._rows = rows;
		ds.ui.View.update.call(self);
		self._checkInnerShadows();
	},
	init() {
		const self = this;
		self._state = { expanded: {}, checked: {} };
		self._groups = [];
		self._rows = [];
		if (!self._dataGrid) throw 'ds.ui.__DataGridBody: _dataGrid property must be specified.';
		self._dataGrid.columns.forEach(column => column._dataGrid = self._dataGrid);
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.rows_element, 'scroll', function(e) {
			if (self.__freed) return false;
			self._checkInnerShadows();
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_cell_link', function(e) {
			if (self.__freed) return false;
			e.stopImmediatePropagation();
			var cell_element = ds.ui.element_parent(this, '.__xcell');
			if (cell_element && cell_element.__view) self._dataGrid._trigger('link_click', cell_element.__view.__cell, e);
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_cell_actn', function(e) {
			if (self.__freed) return false;
			e.stopImmediatePropagation();
			var cell_element = this;
			if (cell_element && cell_element.__view) self._dataGrid._trigger('action_click', cell_element.__view.__cell, e);
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_bdy_row .__xgrd_cell_cbox', function(e) {
			if (self.__freed) return false;
			e.stopImmediatePropagation();
			if (this.__cell) {
				self._toggleCheckCell(this.__cell);
				(self._groups || []).forEach(group => self._updateGroupCheck(group));
			}
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_bdy_row', function(e) {
			if (self.__freed) return false;
			var row = self._rows[parseInt(this.getAttribute('data-row-index'), 10)];
			if (!row) return true;
			if (self._dataGrid.selectRows) {
				var selected_row_element = self.rows_element.querySelector('.__xgrd_bdy_row.__selected');
				if (selected_row_element) selected_row_element.classList.remove('__selected');
				this.classList.add('__selected');
				if (self._dataGrid.idKey) self._selectedId = ds.get(row.item, self._dataGrid.idKey);
				else console.warn('ds.ui.__DataGridBody: Specify idKey if you want to keep selection after grid gets reloaded.');
			}
			self._dataGrid._trigger('row_click', row, e);
			return true;
		});
		ds.ui.element_on(self.rows_element, 'dblclick', '.__xgrd_bdy_row', function(e) {
			if (self.__freed) return false;
			self._dataGrid._trigger('row_dblclick');
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_bdy_grp_hdr_exp', function(e) {
			if (self.__freed) return false;
			let group_element = ds.ui.element_parent(this, '.__xgrd_bdy_grp');
			if (!group_element) return;
			let group_index = group_element.getAttribute('data-group-index');
			if (!isFinite(group_index)) return;
			self._dataGrid.groupToggleExpand(group_index);
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_bdy_grp_hdr_cbox', function(e) {
			if (self.__freed) return false;
			if (!self._dataGrid._groupCheckKey) {
				console.warn('ds.ui.DataGrid: groupCheckKey must be specified for group checking.');
				return true;
			}
			let group_element = ds.ui.element_parent(this, '.__xgrd_bdy_grp');
			if (!group_element) return;
			let group_index = group_element.getAttribute('data-group-index');
			if (!isFinite(group_index)) return;
			let group = self._groups[group_index];
			let column = self._dataGrid.columns.find(c => c.dataKey == self._dataGrid._groupCheckKey);
			if (column) {
				column.cells
					.filter(cell => cell.row.group && cell.row.group.id == group.id)
					.forEach(cell => self._dataGrid._gridBody._toggleCheckCell(cell, false));
				self._dataGrid._trigger('check_group', e);
			}
			(self._groups || []).forEach(group => self._updateGroupCheck(group));
			return true;
		});
		ds.ui.element_on(self.rows_element, 'click', '.__xgrd_grp_bdy_grp_cell_link', function(e) {
			if (self.__freed) return false;
			const group_element = ds.ui.element_parent(this, '.__xgrd_bdy_grp');
			if (!group_element) return;
			const group_index = group_element.getAttribute('data-group-index');
			if (!isFinite(group_index)) return;
			const group = self._groups[group_index];
			self._dataGrid._trigger('link_group_click', group);
			return true;
		});
	}
});
ds.ui.__DataGridAppend = ds.ui.View.extend({
	template: `<div class="__xgrd_apnd row bb bt bk __sbpad" style="margin-top:-1px;">
					<div x-for="column of this._dataGrid.columns.filter(c => c.visible)" class="__xgrd_apnd_cell col" style="{{ column.getOuterStyle() }}">
						{{ column.createAppendCell() }}
					</div>
				</div>`,
	_dataGrid: null,
	set visible(value) { throw new Error('ds.ui.__DataGridAppend: Cannot assign visible property of prototype "ds.ui.__DataGridAppend".'); },
	get visible() { return this._dataGrid._appendable; },
	update() {
		const self = this;
		self._dataGrid.columns.forEach(column => column._dataGrid = self._dataGrid);
		ds.ui.View.update.call(self);
	},
	init() {
		const self = this;
		if (!self._dataGrid) throw 'ds.ui.__DataGridHeader: _dataGrid property must be specified.';
		self._dataGrid.columns.forEach(column => column._dataGrid = self._dataGrid);
		ds.ui.View.init.call(self);
	}
});
ds.ui.Header = ds.ui.View.extend({
	styles: `.__xhdr { position: relative; padding-left: 22px; }
			.__xhdr .__xhdr_exp { position: absolute; top: 0px; bottom: 0px; width: 22px; left: 0px; display: none; cursor: pointer; text-align: center; }
			.__xhdr.__expandable .__xhdr_exp { display: block; }
			.__xhdr .__xhdr_ttl { margin-right: 8px; min-height: 16px; }
			.__xhdr.__expandable .__xhdr_ttl { cursor: pointer; }
			.__xhdr .__xhdr_line { height: 1px; background-color: rgb(228, 228, 228); }
			.__xhdr .__xhdr_btns { display: flex; flex-flow: row; }
			.__xhdr .__xhdr_btn { margin-left: 12px; cursor: pointer; opacity: 0.5; min-width: 12px; text-align: center; }
			.__xhdr .__xhdr_btn:first-child { margin-left: 8px; }
			.__xhdr .__xhdr_btn:hover { opacity: 1; }
			.__xhdr.__textaligned { padding-left: 0px; }
			.__xhdr.__textaligned .__xhdr_exp { left: -22px; }`,
	template: `<div class="row mid __xhdr{{ this._expandable ? ' __expandable' : '' }}{{ this._alignByText ? ' __textaligned' : '' }}">
					<div class="__xhdr_exp hvr" x-on:click="self.expanded = !self.expanded;">
						<i class="fa{{ this.expanded ? ' fa-caret-down': ' fa-caret-right' }}"></i>
					</div>
					<div class="__xhdr_ttl strong fs13" x-on:click="self.expanded = !self.expanded;">{{ this.text }}</div>
					<div class="__xhdr_line flex"></div>
					<div x-ref="buttons_element" class="__xhdr_btns"></div>
				</div>`,
	_expandable: true,
	_expanded: true,
	_alignByText: true,
	_text: null,
	target: null,
	get alignByText() { return this._alignByText; },
	set alignByText(value) { this._alignByText = value; this.needsUpdate(); },
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate(); },
	get expandable() { return this._expandable; },
	set expandable(value) { this._expandable = value; this.needsUpdate(); },
	get expanded() { return this._expanded; },
	set expanded(value) {
		const self = this;
		if (!self.element) return;
		if (!self._expandable) return;
		self._expanded = value;
		if (!self.target) self.target = self.element.nextElementSibling;
		if (self.target) self.target.style.display = self._expanded ? '' : 'none';
		self._trigger(self._expanded ? 'expand' : 'collapse');
		self.needsUpdate();
	},
	addButton(text, fn) {
		const self = this;
		let btn_element = ds.ui.element('div.ml05.__xhdr_btn', self.buttons_element);
		btn_element.innerHTML = text;
		btn_element.onclick = fn;
		return btn_element;
	}
}, ds.Events('expand', 'collapse'));
ds.ui.Tabs = ds.ui.View.extend({
	styles: `.__xtbc { display: flex; flex-flow: row; flex-shrink: 1; position: relative; overflow: hidden; user-select: none; }
			.__xtbc::before { content: ""; position: absolute; left: 0px; right: 0px; bottom: 0px; height: 1px; background-color: var(--border-color); z-index: -1; }
			.__xtbc > .__xtbc_itm { position: relative; flex-shrink: 1; white-space: nowrap; overflow-x: hidden; background-color: var(--background-color); border-color: var(--border-color); border-style: solid; border-width: 1px; padding: 5px 12px 6px 12px; margin-right: -1px; max-width: 250px; min-width: 32px; cursor: pointer; }
			.__xtbc > .__xtbc_itm:first-child { border-top-left-radius: 3px; }
			.__xtbc > .__xtbc_itm:last-child { margin-right: 0px; border-top-right-radius: 3px; }
			.__xtbc > .__xtbc_itm.__selected { border-bottom-width: 0px; background-color: white; }
			.__xtbc > .__xtbc_itm > span { vertical-align: middle; }
			.__xtbc > .__xtbc_itm > .__xtbc_itm_cb { display: none; position: absolute; top: 50%; right: 0px; padding-right: 4px; transform: translateY(calc(-50% + 1px)); background-color: inherit; width: 28px; height: 24px; margin-left: 10px; border-radius: 50%; line-height: 24px; text-align: center; }
			.__xtbc > .__xtbc_itm > .__xtbc_itm_cb::after { z-index: -1; content: " ..."; position: absolute; left: -8px; height: 28px; background-color: inherit; pointer-events: none; }
			.__xtbc > .__xtbc_itm:hover > .__xtbc_itm_cb { display: block; }
			.__xtbc > .__xtbc_itm > .__xtbc_itm_cb > .fa { opacity: 0.5; }
			.__xtbc > .__xtbc_itm:hover > .__xtbc_itm_cb:hover > .fa { opacity: 1; }`,
	template: `<div class="__xtbc">
					{{ this._getTabs() }}
				</div>`,
	selectedIndex: null,
	_getTabs() {
		const self = this;
		let items = [];
		let count = self._trigger('count');
		for (let i = 0; i < count; i++) {
			let item_element = ds.ui.element('<div class="__xtbc_itm"><div class="oxh">' + self._trigger('text', i) + '</div></div>', self.element);
			item_element.__index = i;
			if (i == self.selectedIndex) item_element.classList.add('__selected');
			if (self._trigger('canclose', i)) ds.ui.element('<span class="__xtbc_itm_cb"><i class="fa fa-times sm"></i></span>', item_element);
			items.push(item_element);
		}
		return items;
	},
	select(index, triggerEvent = true) {
		const self = this;
		let item_found = false;
		let children = ds.ui.element_children(self.element, '.__xtbc_itm');
		for (let i = 0; i < children.length; i++) {
			let item_element = children[i];
			if (item_element.__index == index) {
				item_found = true;
				item_element.classList.add('__selected');
			} else item_element.classList.remove('__selected');
		}
		if (item_found) {
			self.selectedIndex = index;
			if (triggerEvent) self._trigger('select', index);
		}
	},
	closeTab(index) {
		const self = this;
		self._trigger('close', index);
		if (index <= self.selectedIndex) self.selectedIndex--;
		self.select(self.selectedIndex, true);
		self.update();
	},
	init() {
		var self = this;
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.element, 'click', '.__xtbc_itm_cb', function(e) {
			if (self.__freed) return false;
			this.parentNode.__closed = true;
			self.closeTab(this.parentNode.__index);
			return true;
		});
		ds.ui.element_on(self.element, 'click', '.__xtbc_itm', function(e) {
			if (self.__freed) return false;
			if (this.__closed) return true;
			self.select(this.__index);
			return true;
		});
	}
}, ds.Events('count:single', 'text:single', 'select', 'close', 'canclose:single'));
ds.ui.Alert = ds.ui.View.extend({
	styles: `.__xalrt { padding: 0px 0px 8px 12px; overflow: hidden; /*font-size: 13px*/ }
			.__xalrt.__error { background-color: var(--background-color-error); border-left: var(--border-color-error) solid 3px; color: var(--text-color-error); }
			.__xalrt.__warning { background-color: var(--background-color-warning); border-left: var(--border-color-warning) solid 3px; color: var(--text-color-warning); /*#9c7738*/ }
			.__xalrt.__info { background-color: var(--background-color-info); border-left: var(--border-color-info) solid 3px; color: var(--text-color-info); }
			.__xalrt.__success { background-color: var(--background-color-success); border-left: var(--border-color-success) solid 3px; color: var(--text-color-success); }
			.__xalrt .__xalrt_ttl { margin-top: 8px; font-weight: bold; }
			.__xalrt .__xalrt_bdy { margin-top: 8px; }`,
	template: `<div class="__xalrt row {{ '__' + this._kind }}">
					<div class="flex">
						<div class="__xalrt_ttl">{{ this._title }}</div>
						<div class="__xalrt_bdy">{{ this._getBody() }}</div>	
					</div>
					<div>
						<div x-on:click="self.fadeOut()" class="pl pt pr pb hnd dhvr"><i class="fa fa-times sm dhvrc"></i></div>
					</div>
				</div>`,
	_kind: 'info',
	_title: '',
	_body: null,
	get kind() { return this._kind; },
	set kind(value) {
		if (!['info', 'success', 'error', 'warning'].includes(value)) throw 'ds.ui.Alert: Kind "' + value + '" not supported (only: info, success, error, warning).';
		this._kind = value;
		this.needsUpdate();
	},
	get title() { return this._title; },
	set title(value) { this._title = value; this.needsUpdate(); },
	get body() { return this._body; },
	set body(value) { this._body = value; this.needsUpdate(); },
	_getBody() {
		const self = this;
		let nodes = [];
		let wrapper = ds.ui.element('<div>' + self._body + '</div>');
		for (let i = 0; i < wrapper.childNodes.length; i++) nodes.push(wrapper.childNodes.item(i));
		return nodes;
	}
});
ds.ui.StandardCheckbox = ds.ui.View.extend({
	template: `<div class="hnd" x-on:click="self.checked = !self.checked, self._trigger('change', self.checked)">
					<input x-ref="input_element" type="checkbox" style="pointer-events:none;">
					<span>{{ this.text }}</span>
				</div>`,
	_text: '',
	get checked() { return this.input_element.hasAttribute('checked'); },
	set checked(value) {
		if (!value) this.input_element.removeAttribute('checked');
		else this.input_element.setAttribute('checked', true);
		this.needsUpdate();
	},
	get text() { return this._text; },
	set text(value) {
		this._text = value;
		this.needsUpdate();
	}
}, ds.Events('change'));
ds.ui.StandardInput = ds.ui.View.extend({
	_tagName: 'input',
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.element.type = 'text';
		self.element.addEventListener('input', e => self._trigger('input', e));
	}
}, ds.Events('input'));
ds.ui.StandardSelect = ds.ui.View.extend({
	_tagName: 'select',
	addOptions(options) {
		const self = this;
		if (!options) throw 'Select: options must be in format [ {value: \'\', text: \'\'}, {value: \'\', text: \'\'} ]';
		options.forEach(option => {
			var option_element = document.createElement('option');
			option_element.value = option.value;
			option_element.textContent = option.text;
			self.element.appendChild(option_element);
		});
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.element.addEventListener('change', function(e) {
			self._trigger('change');
		});
	}
}, ds.Events('change'));
ds.ui.EditableText = ds.ui.View.extend({
	styles: `.__edtbltxt {
				position: relative;
				border-color: transparent;
				border-style: solid;
				border-width: 1px;
				min-height: 15px;
				cursor: text; }
			.__edtbltxt.active {
				border-width: 0px;
				padding: 0px; }
			.__edtbltxt:hover:not(.active) { border-color: var(--border-color); }
			.__edtbltxt.__inputstyle:not(.active) {
				border-color: #bfbfbf;
				background-color: white;
				padding: 2px; }
			.__edtbltxt:empty::after {
				content: attr(placeholder);
				color: gray;
				font-size: 12px; }
			.__edtbltxt .__edtbltxt_ta {
				display: block;
				border-color: #bfbfbf;
				resize: none;
				padding-bottom: 0px;
				font-size: 13px;
				width: calc(100% - 6px); }`,
	_className: '__edtbltxt',
	_textarea_element: null,
	_buttons_element: null,
	_okBtn: null,
	_cancelBtn: null,
	_active: false,
	_text: null,
	_inputstyle: false,
	get text() { return this._text; },
	set text(value) {
		const self = this;
		self._text = value;
		if (self.element) {
			if (self._active && self._textarea_element) self._textarea_element.value = value;
			else self.element.innerHTML = value;
		}
	},
	get inputstyle() { return this._inputstyle; },
	set inputstyle(value) {
		const self = this;
		self._inputstyle = value;
		if (self.element) ds.ui.element_classif(self.element, '__inputstyle', self._inputstyle);
	},
	activate() {
		const self = this;
		self._active = true;
		self.element.classList.add('active');
		self.element.innerHTML = '';
		self.element.appendChild(self._textarea_element);
		self.element.appendChild(self._buttons_element);
		self._textarea_element.value = self.text;
		self._textarea_element.focus();
		ds.ui.element_trigger(self._textarea_element, 'input');
		self._trigger('activate');
	},
	deactivate(success) {
		const self = this;
		self._active = false;
		self.element.classList.remove('active');
		self.element.removeChild(self._textarea_element);
		self.element.removeChild(self._buttons_element);
		if (success) {
			self.text = self._textarea_element.value;
			self._trigger('change', self.text);
		} else self.text = self._text;
		self._trigger('deactivate');
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self._textarea_element = document.createElement('textarea');
		self._textarea_element.classList.add('__edtbltxt_ta');
		self._textarea_element.setAttribute('rows', '1');
		var autoresize_func = function() {
			self._textarea_element.style.cssText = 'height:auto;';
		    self._textarea_element.style.cssText = 'height:' + self._textarea_element.scrollHeight + 'px;';
		}
		self._textarea_element.addEventListener('input', autoresize_func);
		ds.ui.element_on(self.element, 'click', function(e) {
			if (self.__freed) return false;
			if (self._active) return true;
			self.activate();
			return true;
		});
		self._okBtn = ds.ui.Button.new({ small: true, primary: true, text: 'Применить' });
		self._okBtn.element.style.marginRight = '4px';
		self._okBtn.on('click', e => {
			self.deactivate(true);
			e.stopImmediatePropagation();
		});
		self._cancelBtn = ds.ui.Button.new({ small: true, text: 'Отмена' });
		self._cancelBtn.on('click', e => {
			self.deactivate(false);
			e.stopImmediatePropagation();
		});
		self._buttons_element = document.createElement('div');
		self._buttons_element.style.paddingTop = '4px';
		self._buttons_element.appendChild(self._okBtn.element);
		self._buttons_element.appendChild(self._cancelBtn.element);
		var inner_text = self.element.textContent;
		var arg_text = self._text;
		self.text = inner_text;
		if (arg_text) self.text = arg_text;
		self.inputstyle = self._inputstyle;
	}
}, ds.Events('activate', 'deactivate', 'change'));
ds.ui.Progress = ds.ui.View.extend({
	styles: `.__xprgrs { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 1000; box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.15); }
			.__xprgrs img { display: inline-block; vertical-align: top; }`,
	template: `<div class="__xprgrs bl bt br bb pl pt pr pb bkw" style="display:none;">
					<img class="spin" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0ic3BpbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zIiBmaWxsPSIjM0Q4OUUyIiBjeD0iMiIgY3k9IjgiIHI9IjEiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMy1Db3B5LTIiIGZpbGw9IiMzRDg5RTIiIGN4PSI4LjUiIGN5PSIyLjUiIHI9IjEuNSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zLUNvcHktMyIgZmlsbD0iIzNEODlFMiIgY3g9IjgiIGN5PSIxNCIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zLUNvcHktNCIgZmlsbD0iIzNEODlFMiIgY3g9IjQuMjUiIGN5PSI0LjI1IiByPSIxLjI1Ij48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMtQ29weS01IiBmaWxsPSIjM0Q4OUUyIiBjeD0iMTMiIGN5PSI2IiByPSIyIj48L2NpcmNsZT4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMtQ29weS02IiBmaWxsPSIjM0Q4OUUyIiBjeD0iMTIiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zLUNvcHktNyIgZmlsbD0iIzNEODlFMiIgY3g9IjQiIGN5PSIxMiIgcj0iMSI+PC9jaXJjbGU+CiAgICA8L2c+Cjwvc3ZnPg=="/>&nbsp;&nbsp;<span>{{ this._getText() }}</span>
				</div>`,
	_count: 0,
	_getText() { return 'В работе...'; },
	show() {
		var self = this;
		self._count = self._count + 1;
		if (self.element.style.display == '') return;
		self.element.style.display = '';
	},
	hide() {
		var self = this;
		self._count = self._count - 1;
		setTimeout(() => {
			if (self._count <= 0) self.element.style.display = 'none';
		}, 500);
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		document.body.appendChild(self.element);
	}
});
ds.ui.Menu = ds.ui.View.extend({
	styles: `.__xmnu {
				display: flex;
				flex-flow: column;
				padding-top: 4px;
				padding-bottom: 4px;
				background-color: white;
				border: 1px solid var(--border-color);
				box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.075);
				user-select: none;  }`,
	template: `<div class="__xmnu" x-on:contextmenu="e.preventDefault()">{{ this.items }}</div>`,
	_activeItem: null,
	popupHelper: null,
	holder: null,
	items: null,
	isRoot() {
		const self = this;
		return !self.holder || !self.holder.menu;
	},
	getRootMenu() {
		const self = this;
		let next = self;
		while (true) {
			if (!next.holder || !next.holder.menu) return next;
			next = next.holder.menu;
		}
	},
	addItem(item) {
		const self = this;
		item.menu = self;
		self.items.push(item);
		self.needsUpdate();
	},
	open(x, y) {
		const self = this;
		if (self.popupHelper.isOpened()) return;
		self._trigger('before_open', self);
		self.items.forEach(item => {
			if (item._onShow && ds.isFunction(item._onShow)) item._onShow();
			if (ds.isPrototypeOf(item, ds.ui.SeparatorMenuItem)) item.visible = true;
		});
		self.items.filter(item => item.visible).forEach((item, index, array) => {
			if (!ds.isPrototypeOf(item, ds.ui.SeparatorMenuItem)) return;
			item.visible = true;
			if (index == 0
			|| index == array.length - 1
			|| ds.isPrototypeOf(array[index + 1], ds.ui.SeparatorMenuItem)) item.visible = false;
			item.update();
		});

		setTimeout(() => {
			self.popupHelper.open(x, y);
			self._trigger('open');
		}, 0);
	},
	close() {
		const self = this;
		self.popupHelper.close();
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		if (!self.items) self.items = [];
		self.popupHelper = ds.ui.PopupHelper.new({
			direction: 'down',
			alignment: 'left',
			target: self.element,
			offset: { top: -1 }
		});
		self.popupHelper.on('close', () => {
			if (self._activeItem) self._activeItem.submenu.popupHelper.close();
			self._trigger('close');
		})
	}
}, ds.Events('click', 'before_open', 'open', 'close'));
ds.ui.Toolbar = ds.ui.Menu.extend({
	styles: `.__xtlbr { display: flex; flex-flow: row; align-items: center; user-select: none; }`,
	template: `<div class="__xtlbr">{{ this.items }}</div>`,
});
ds.ui.SeparatorMenuItem = ds.ui.View.extend({
	template: `<div class="bb mt05 mb05"></div>`,
	_onShow() {}
});
ds.ui.RootMenuItem = ds.ui.View.extend({
	styles: `.__xmnu_ritm { border-color: white; padding: 5px 7px 5px 7px; border: 1px solid white; border-bottom-width: 0px; cursor: pointer; user-select: none; font-size: 13px; }
			.__xmnu_ritm:not(.__opened):hover { background-color: var(--background-color-selected); }
			.__xmnu_ritm.__opened { position: relative; z-index: 20; background-color: white; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.075); border-color: var(--border-color); }
			.__xmnu_ritm.__opened::after { content: ""; position: absolute; background-color: white; left: 0px; right: 0px; bottom: -4px; height: 4px; }`,
	template: `<div class="__xmnu_ritm"
					x-on:click="self.submenu.open()"
					x-on:mouseenter="self.menu._activeItem && self.submenu.open()">{{ this.text || '' }}</div>`,
	menu: null,
	text: null,
	submenu: null,
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.submenu = ds.ui.Menu.new({ holder: self });
		self.submenu.popupHelper.related = self.element;
		self.submenu.popupHelper.on('open', () => {
			if (self.menu._activeItem) self.menu._activeItem.submenu.popupHelper.close();
			self.menu._activeItem = self;
			self.element.classList.add('__opened');
		});
		self.submenu.popupHelper.on('close', () => {
			self.menu._activeItem = null;
			self.element.classList.remove('__opened');
		});
	}
});
ds.ui.MenuItem = ds.ui.View.extend({
	styles: `.__xmnu_itm { position: relative; padding: 5px 32px 5px 38px; min-height: 16px; user-select: none; cursor: pointer; font-size: 13px; }
			.__xmnu_itm.__hassc { padding-right: 110px; }
			.__xmnu_itm:hover { background-color: var(--background-color-selected); }
			.__xmnu_itm span { vertical-align: middle; }
			.__xmnu_itm .__xmnu_itm_img { position: absolute; left: 12px; top: 5px; width: auto; height: 16px; }
			.__xmnu_itm .__xmnu_itm_img.__imgdim { filter: opacity(0.35); }
			.__xmnu_itm:hover .__xmnu_itm_img { filter: none; }
			.__xmnu_itm .__xmnu_itm_sc { position: absolute; right: 12px; top: 50%; transform: translateY(calc(-50% + 1px)); color: var(--text-color-gray); font-size: 12px; }
			.__xmnu_itm.__disabled { opacity: 0.5; pointer-events: none; }`,
	template: `<div class="__xmnu_itm{{ this.disabled ? ' __disabled' : '' }}{{ !!this.shortcut ? ' __hassc' : '' }}"
					x-on:click="self._onClick(e), self.menu.close()"
					x-on:mouseenter="self.menu._activeItem && self.menu._activeItem.submenu.close();">
					<img class="__xmnu_itm_img{{ this.imgdim ? ' __imgdim' : '' }}"
						 src="{{ this.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' }}" />
					<span>{{ this.text || '' }}</span>
					<div class="__xmnu_itm_sc">{{ this.shortcut || '' }}</div>
				</div>`,
	_imgdim: true,
	_image: null,
	_text: null,
	_shortcut: null,
	_disabled: false,
	menu: null,
	get imgdim() { return this._imgdim; },
	set imgdim(value) { this._imgdim = value; this.needsUpdate(); },
	get image() { return this._image; },
	set image(value) { this._image = value; this.needsUpdate(); },
	get text() { return this._text; },
	set text(value) { this._text = value; this.needsUpdate(); },
	get shortcut() { return this._shortcut; },
	set shortcut(value) { this._shortcut = value; this.needsUpdate(); },
	get disabled() { return this._disabled; },
	set disabled(value) { this._disabled = value; this.needsUpdate(); },
	_onShow() {},
	_onClick(e) {
		const self = this;
		self._trigger('click', e);
		self.menu._trigger('click', self, e);
	}
}, ds.Events('click'));
ds.ui.SubMenuItem = ds.ui.View.extend({
	styles: `.__xmnu_itm .__xmnu_itm_smc { position: absolute; right: 12px; top: 50%; transform: translateY(calc(-50% + 1px)); filter: opacity(0.35); }
			.__xmnu_itm.__opened { background-color: var(--background-color-selected); }
			.__xmnu_itm.__opened .__xmnu_itm_smc,
			.__xmnu_itm:hover .__xmnu_itm_smc,
			.__xmnu_itm.__opened .__xmnu_itm_img { filter: none; }
			.__submenu { padding-right: 60px; }`,
	template: `<div class="__xmnu_itm __submenu{{ this.disabled ? ' __disabled' : '' }}" x-on:mouseenter="self.submenu.open()">
					<img class="__xmnu_itm_img{{ this.imgdim ? ' __imgdim' : '' }}"
						 src="{{ this.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' }}" />
					<span>{{ this.text || '' }}</span>
					<img class="__xmnu_itm_smc" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNnB4IiBoZWlnaHQ9IjZweCIgdmlld0JveD0iMCAwIDYgNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJzdWJtZW51X2NhcmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjAgMCA2IDMgMCA2Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg=="/>
				</div>`,
	imgdim: true,
	menu: null,
	image: null,
	text: null,
	disabled: false,
	submenu: null,
	_onShow() {},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self.submenu = ds.ui.Menu.new({ holder: self });
		self.submenu.popupHelper.direction = 'right';
		self.submenu.popupHelper.alignment = 'top';
		self.submenu.popupHelper.related = self.element;
		self.submenu.popupHelper.on('open', () => {
			if (self.menu._activeItem) self.menu._activeItem.submenu.popupHelper.close();
			self.menu._activeItem = self;
			self.element.classList.add('__opened');
		});
		self.submenu.popupHelper.on('close', () => {
			self.menu._activeItem = null;
			self.element.classList.remove('__opened');
		});
	}
});
ds.ui.CheckMenuItem = ds.ui.MenuItem.extend({
	imgdim: false,
	checkImage: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iY2hlY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwb2x5Z29uIGlkPSJTaGFwZSIgZmlsbD0iIzAwMDAwMCIgcG9pbnRzPSI1Ljc1IDExLjEyNyAyLjYyMyA4IDEuNTYxIDkuMDYxIDUuNzUgMTMuMjUgMTQuNzUgNC4yNSAxMy42ODkgMy4xODkiPjwvcG9seWdvbj4KICAgIDwvZz4KPC9zdmc+',
	_onShow() {
		const self = this;
		self.image = self._trigger('checked') ? self.checkImage : null;
		ds.ui.MenuItem._onShow.call(self);
	}
}, ds.Events('checked:single'));
ds.ui.RadioMenuItem = ds.ui.CheckMenuItem.extend({
	checkImage: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iZG90X3NtYWxsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBmaWxsPSIjMDAwMDAwIiBjeD0iOCIgY3k9IjgiIHI9IjMiPjwvY2lyY2xlPgogICAgPC9nPgo8L3N2Zz4=',
});
ds.ui.openFile = (callback, options) => {
	options = Object.assign({ readAs: 'text', nwdirectory: false }, options);
	let input_element = ds.ui.element('<input type="file" style="display:none;"' + (options.nwdirectory ? ' nwdirectory' : '') + ' />', document.body);
	input_element.addEventListener('change', e => {
		if (e.target.files.length == 0) return;
		if (options.nwdirectory) {
			callback(null, e.target.files[0].path);
			return;
		}
		let filename = e.target.files[0].name;
	    let reader = new FileReader();
	    reader.onload = e => {
	    	let result = e.target.result;
	    	input_element.remove();
	    	callback(result, filename);
	    };
	    if (options.readAs.toLowerCase() == 'text') reader.readAsText(e.target.files[0]);
	    else if (options.readAs.toLowerCase() == 'dataurl') reader.readAsDataURL(e.target.files[0]);
	    else reader.readAsText(e.target.files[0]);
	});
	input_element.click();
}
ds.ui.saveFile = (data, options) => {
	options = Object.assign({ name: 'Untitled', type: 'text/plain' }, options);
	let a_element = ds.ui.element('<a href="" style="display:none;"></a>');
	let url_obj = options.type == 'dataurl'
					? data
					: URL.createObjectURL(new Blob([data], { type: options.type }));
	a_element.setAttribute('href', url_obj);
	a_element.setAttribute('download', options.name);
	a_element.click();
	setTimeout(() => {
		if (url_obj.slice(0, 4) == 'blob') URL.revokeObjectURL(url_obj);
		a_element.remove();
	}, 60000);
}
//https://gist.github.com/jonathantneal/7935589
ds.ui.__element__MATCH = '(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)';
ds.ui.__element__REGEX = '^(?:' + ds.ui.__element__MATCH + ')|^#' + ds.ui.__element__MATCH + '|^\\.' + ds.ui.__element__MATCH + '|^\\[' + ds.ui.__element__MATCH + '(?:([*$|~^]?=)(["\'])((?:(?=(\\\\?))\\8.)*?)\\6)?\\]';
ds.ui.element = function(pattern, appendTo) {
	if (pattern == '' || pattern == null) throw '__element: Pattern is empty';
	if (pattern.trim()[0] == '<') {
		var wrapper_element = document.createElement('div');
		wrapper_element.innerHTML = pattern.trim();
		var element = wrapper_element.firstChild;
		if (appendTo) for (let i = 0; i < wrapper_element.childNodes.length; i++) appendTo.appendChild(wrapper_element.childNodes[i]);
		return element;
	} else {
		for (var node = document.createElement('div'), match, className = ''; pattern && (match = pattern.match(ds.ui.__element__REGEX));) {
			if (match[1]) node = document.createElement(match[1]);
			if (match[2]) node.id = match[2];
			if (match[3]) className += ' ' + match[3];
			if (match[4]) node.setAttribute(match[4], match[7] || '');
			pattern = pattern.slice(match[0].length);
		}
		if (className) node.className = className.slice(1);
		if (appendTo) appendTo.appendChild(node);
		return node;
	}
}
ds.ui.element_parent = function(element, selector, tillElement, includeSelf) {
	var parent_element = element.parentNode;
    if (includeSelf && element.matches(selector)) return element;
    while (parent_element && parent_element !== document.body && parent_element !== tillElement) {
        if (parent_element.matches && parent_element.matches(selector)) return parent_element;
        else if (parent_element.parentNode) parent_element = parent_element.parentNode;
        else return null;
    }
    return null;
}
ds.ui.element_on = function(element, event, a2, a3, a4) {
	var __free = () => element.removeEventListener(event, __handler);
	var __handler = e => {
		if (typeof a2 == 'function') {
			var result = a2.call(element, e);
			if (result !== true && result !== false) throw new Error('ds.ui.element_on: Handler funcion must return either True or False strictly, to determine whether listener should be removed or not ().');
			if (result === false) __free();
		} else {
			var selector_element = ds.ui.element_parent(e.target, a2, element, true);
			if (selector_element) {
				var result = a3.call(selector_element, e);
				if (result !== true && result !== false) throw new Error('ds.ui.element_on: Handler funcion must return either True or False strictly, to determine whether listener should be removed or not.');
				if (result === false) __free();
			}
		}
	}
	let opts = ds.isObject(a4) ? a4 : (ds.isObject(a3) ? a3 : null);
	element.addEventListener(event, __handler, opts);
	return { free: __free };
}
ds.ui.element_children = function(element, selector) {
	var children = [];
    for (var i = 0; i < element.children.length; i++) {
    	var child_element = element.children[i];
    	if (child_element.matches(selector) || !selector) children.push(child_element);
    }
    return children;
}
ds.ui.element_classif = function(element) {
	var pairs = {};
	for (let i = 1; i < arguments.length -1; i++) {
		pairs[arguments[i]] = arguments[i + 1];
		i++;
	}
	Object.keys(pairs).forEach(class_ => {
		if (pairs[class_]) element.classList.add(class_);
		else element.classList.remove(class_);
	});
}
ds.ui.element_styleif = function(element) {
	var pairs = [];
	for (let i = 1; i < arguments.length -1; i++) {
		pairs.push({ props: arguments[i], expr: arguments[i + 1] });
		i++;
	}
	pairs.forEach(pair => {
		if (pair.expr) Object.keys(pair.props).forEach(prop => element.style.setProperty(prop, pair.props[prop]));
	});
}
ds.ui.element_whenvisible = function(element, callback) {
	if (!element) return;
	var check = function() {
		var bcr = element.getBoundingClientRect();
		if (bcr.width == 0 && bcr.height == 0) setTimeout(check, 250);
		else callback();
	}
	check();
}
ds.ui.element_trigger = function(element, event_name) {
	var event = document.createEvent('HTMLEvents');
    event.initEvent(event_name, true, true);
    event.eventName = event_name;
    element.dispatchEvent(event);
}
ds.ui.element_mousepos = function(element, pageX, pageY) {
	var curleft = curtop = 0;
	var next = element;
	if (next.offsetParent) {
		do {
			curleft += next.offsetLeft;
			curtop += next.offsetTop;
		} while (next = next.offsetParent);
	}
	var element_pos = {
		left : curleft,
		top : curtop
	};
	return {
		x: pageX - element_pos.left,
		y: pageY - element_pos.top,
	}
}
ds.ui.element_animate = function(element, duration, from, to, callback) {
	const fps = 24;
	const frames = Math.ceil((duration / 1000) * fps);
	const curr = {};
	for (prop in from) curr[prop] = from[prop];
	var frame_n = 0;
	const id = setInterval(frame_func, 1000 / fps);
	function frame_func() {
		if (frame_n > frames) {
			clearInterval(id);
			if (callback) callback();
		} else {
			for (prop in from) {
				if (to[prop] == null) continue;
				const delta = to[prop] - from[prop];
				const step = delta / frames;
				const val = step * frame_n;
				element.style[prop] = from[prop] + val;
			}
		}
		frame_n++;
	}
}
ds.ui.element_animateClass = function(element, classes, callback) {
	var classes_arr = classes.split(' ').map(cls => cls.trim());
	element.classList.add.apply(element.classList, classes_arr);
	//webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend 
	element.addEventListener('animationend', e => {
		element.classList.remove.apply(element.classList, classes_arr);
		if (callback) callback();
	}, { once: true });
}
ds.ui.element_insertAfter = function(parentElement, element, afterElement) {
	if (afterElement.nextSibling) parentElement.insertBefore(element, afterElement);
	else parentElement.appendChild(element);
}
ds.ui.element_rects = function(element) {
	let style = window.getComputedStyle(element);
    let margin = {
        left: parseFloat(style['margin-left']),
        right: parseFloat(style['margin-right']),
        top: parseFloat(style['margin-top']),
        bottom: parseFloat(style['margin-bottom'])
    };
    let padding = {
        left: parseFloat(style['padding-left']),
        right: parseFloat(style['padding-right']),
        top: parseFloat(style['padding-top']),
        bottom: parseFloat(style['padding-bottom'])
    };
    let border = {
        left: parseFloat(style['border-left']),
        right: parseFloat(style['border-right']),
        top: parseFloat(style['border-top']),
        bottom: parseFloat(style['border-bottom'])
    };
    let bcr = element.getBoundingClientRect();
    return {
    	inner: {
    		left: bcr.left + border.left + padding.left,
    		top: bcr.top + border.top + padding.top,
    		right: bcr.right - border.right - padding.right,
    		bottom: bcr.bottom - border.bottom - padding.bottom,
    		width: bcr.width - border.left - padding.left - border.right - padding.right,
    		height: bcr.height - border.top - padding.top - border.bottom - padding.bottom
    	},
    	padding: {
    		left: bcr.left + border.left,
    		top: bcr.top + border.top,
    		right: bcr.right - border.right,
    		bottom: bcr.bottom - border.bottom,
    		width: bcr.width - border.left - border.right,
    		height: bcr.height - border.top - border.bottom
    	},
    	border: {
    		left: bcr.left,
    		top: bcr.top,
    		right: bcr.right,
    		bottom: bcr.bottom,
    		width: bcr.width,
    		height: bcr.height
    	},
    	margin: {
    		left: bcr.left - margin.left,
    		top: bcr.top - margin.top,
    		right: bcr.right + margin.right,
    		bottom: bcr.bottom + margin.bottom,
    		width: bcr.width + margin.left + margin.right,
    		height: bcr.height + margin.top + margin.bottom
    	}
    }
}
ds.ui.element_scroll2view = function(parentElement, childElement) {
	let parent_rect = parentElement.getBoundingClientRect();
	let child_rect = childElement.getBoundingClientRect();
	let is_viewable = (child_rect.top >= parent_rect.top) && (child_rect.top <= parent_rect.top + parentElement.clientHeight);
  	if (!is_viewable) parentElement.scrollTop = (child_rect.top + parentElement.scrollTop) - parent_rect.top
}
ds.ui.element_pageXY2local = function(element, pageX, pageY) {
	let rect = ds.ui.element_rects(element).border;
	return { x: pageX - rect.left, y: pageY - rect.top };
}
ds.ui.canvas_prepare = function(canvas, options) {
	options = Object.assign({ fill: false }, options);
	let new_width = canvas.clientWidth * devicePixelRatio;
	let new_height = canvas.clientHeight * devicePixelRatio;
	if (canvas.width != new_width) canvas.width = new_width;
	if (canvas.height != new_height) canvas.height = new_height;
	let context = canvas.getContext('2d');
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.scale(devicePixelRatio, devicePixelRatio);
	if (options.fill) {
		context.fillStyle = options.fill;
		context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}
}
ds.ui.image2dataurl = function(image) {
	let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	return canvas.toDataURL('image/png');
}
ds.ui.attachScript = function(path) {
	return new Promise((resolve, reject) => {
		try {
			var script_element = document.querySelector('script[src="' + path + '"]');
			if (script_element) resolve();
			else {
				script_element = document.createElement('script');
				document.head.appendChild(script_element);
				script_element.onload = resolve;
				script_element.onerror = reject;
				script_element.setAttribute('src', path);	
			}	
		} catch(e) {
			reject(e);
		}
	});
}
ds.ui.attachStyles = function(path) {
	var link_element = document.querySelector('link[href="' + path + '"]');
	if (!link_element) {
	    var link_element  = document.createElement('link');
	    link_element.rel  = 'stylesheet';
	    link_element.type = 'text/css';
	    link_element.href = path;
	    link_element.media = 'all';
	    document.head.appendChild(link_element);
	}
	return true;
}
ds.ui.get = function(url, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		fetch(url, options).then((res) => {
			res.text().then((text) => {
				resolve(text);
			});
		});
	});
}
ds.ui.getJSON = function(url, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		fetch(url, options).then((res) => {
			res.json().then((json) => {
				resolve(json);
			});
		});
	});
}
ds.ui.post = function(url, text, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		options.method = 'POST';
		options.body = text;
		fetch(url, options).then((res) => {
			res.text().then((text) => {
				resolve(text);
			});
		});
	});
}
ds.ui.postJSON = function(url, json, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise(function(resolve, reject) {
		ds.ui.post(url, JSON.stringify(json), options).then((text) => {
			resolve(JSON.parse(text));
		});
	});
}
ds.ui.patch = function(url, text, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		options.method = 'PATCH';
		options.body = text;
		fetch(url, options).then((res) => {
			res.text().then((text) => {
				resolve(text);
			});
		});
	});
}
ds.ui.patchJSON = function(url, json, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		ds.ui.patch(url, JSON.stringify(json), options).then((text) => {
			resolve(JSON.parse(text));
		});
	});
}
ds.ui.delete = function(url, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		options.method = 'DELETE';
		fetch(url, options).then((res) => {
			res.text().then((text) => {
				resolve(text);
			});
		});
	});
}
ds.ui.deleteJSON = function(url, options) {
	var options = Object.assign({ mode: 'cors', credentials: 'include' }, options);
	return new Promise((resolve, reject) => {
		ds.ui.delete(url, options).then((text) => {
			resolve(JSON.parse(text));
		});
	});
}
ds.ui.color2hex = function(color) {
	const colors = {'aliceblue':'#f0f8ff','antiquewhite':'#faebd7','aqua':'#00ffff','aquamarine':'#7fffd4','azure':'#f0ffff','beige':'#f5f5dc','bisque':'#ffe4c4','black':'#000000','blanchedalmond':'#ffebcd','blue':'#0000ff','blueviolet':'#8a2be2','brown':'#a52a2a','burlywood':'#deb887','cadetblue':'#5f9ea0','chartreuse':'#7fff00','chocolate':'#d2691e','coral':'#ff7f50','cornflowerblue':'#6495ed','cornsilk':'#fff8dc','crimson':'#dc143c','cyan':'#00ffff','darkblue':'#00008b','darkcyan':'#008b8b','darkgoldenrod':'#b8860b','darkgray':'#a9a9a9','darkgreen':'#006400','darkkhaki':'#bdb76b','darkmagenta':'#8b008b','darkolivegreen':'#556b2f','darkorange':'#ff8c00','darkorchid':'#9932cc','darkred':'#8b0000','darksalmon':'#e9967a','darkseagreen':'#8fbc8f','darkslateblue':'#483d8b','darkslategray':'#2f4f4f','darkturquoise':'#00ced1','darkviolet':'#9400d3','deeppink':'#ff1493','deepskyblue':'#00bfff','dimgray':'#696969','dodgerblue':'#1e90ff','firebrick':'#b22222','floralwhite':'#fffaf0','forestgreen':'#228b22','fuchsia':'#ff00ff','gainsboro':'#dcdcdc','ghostwhite':'#f8f8ff','gold':'#ffd700','goldenrod':'#daa520','gray':'#808080','green':'#008000','greenyellow':'#adff2f','honeydew':'#f0fff0','hotpink':'#ff69b4','indianred ':'#cd5c5c','indigo':'#4b0082','ivory':'#fffff0','khaki':'#f0e68c','lavender':'#e6e6fa','lavenderblush':'#fff0f5','lawngreen':'#7cfc00','lemonchiffon':'#fffacd','lightblue':'#add8e6','lightcoral':'#f08080','lightcyan':'#e0ffff','lightgoldenrodyellow':'#fafad2','lightgrey':'#d3d3d3','lightgreen':'#90ee90','lightpink':'#ffb6c1','lightsalmon':'#ffa07a','lightseagreen':'#20b2aa','lightskyblue':'#87cefa','lightslategray':'#778899','lightsteelblue':'#b0c4de','lightyellow':'#ffffe0','lime':'#00ff00','limegreen':'#32cd32','linen':'#faf0e6','magenta':'#ff00ff','maroon':'#800000','mediumaquamarine':'#66cdaa','mediumblue':'#0000cd','mediumorchid':'#ba55d3','mediumpurple':'#9370d8','mediumseagreen':'#3cb371','mediumslateblue':'#7b68ee','mediumspringgreen':'#00fa9a','mediumturquoise':'#48d1cc','mediumvioletred':'#c71585','midnightblue':'#191970','mintcream':'#f5fffa','mistyrose':'#ffe4e1','moccasin':'#ffe4b5','navajowhite':'#ffdead','navy':'#000080','oldlace':'#fdf5e6','olive':'#808000','olivedrab':'#6b8e23','orange':'#ffa500','orangered':'#ff4500','orchid':'#da70d6','palegoldenrod':'#eee8aa','palegreen':'#98fb98','paleturquoise':'#afeeee','palevioletred':'#d87093','papayawhip':'#ffefd5','peachpuff':'#ffdab9','peru':'#cd853f','pink':'#ffc0cb','plum':'#dda0dd','powderblue':'#b0e0e6','purple':'#800080','rebeccapurple':'#663399','red':'#ff0000','rosybrown':'#bc8f8f','royalblue':'#4169e1','saddlebrown':'#8b4513','salmon':'#fa8072','sandybrown':'#f4a460','seagreen':'#2e8b57','seashell':'#fff5ee','sienna':'#a0522d','silver':'#c0c0c0','skyblue':'#87ceeb','slateblue':'#6a5acd','slategray':'#708090','snow':'#fffafa','springgreen':'#00ff7f','steelblue':'#4682b4','tan':'#d2b48c','teal':'#008080','thistle':'#d8bfd8','tomato':'#ff6347','turquoise':'#40e0d0','violet':'#ee82ee','wheat':'#f5deb3','white':'#ffffff','whitesmoke':'#f5f5f5','yellow':'#ffff00','yellowgreen':'#9acd32'};
	if (colors[color.toLowerCase()]) return colors[color.toLowerCase()];
	let m = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color);
	return m ? '#' + (1 << 24 | m[1] << 16 | m[2] << 8 | m[3]).toString(16).substr(1) : color;
};
// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
ds.ui.colorHex2rgb = function(hex) {
	if (hex[0] == '#') hex = hex.substr(1, 6);
	let arrBuff = new ArrayBuffer(4);
	let vw = new DataView(arrBuff);
	vw.setUint32(0,parseInt(hex, 16),false);
	let arrByte = new Uint8Array(arrBuff);
	return {
		r: arrByte[1],
		g: arrByte[2],
		b: arrByte[3],
	};
}
ds.ui.img = (path, classes = '') => `<img src="${path}" class="${classes}">`;
ds.ui.style = expr => target => {
	if (!target) return;
	let element = null;
	if (target instanceof HTMLElement) element = target;
	else if (target.element && target.element instanceof HTMLElement) element = target.element;
	else return;
	let classes = expr.match(/\.\w+/g);
	let props = expr.match(/\[.+?\]/g);
	if (classes) classes.forEach(c => element.classList.add(c.slice(1)));
	if (props) props.forEach(prop => {
		let kv = prop.slice(1, -1).split('=');
		if (kv[1][0] == '"' && kv[1][kv[1].length - 1] == '"') kv[1] = kv[1].slice(1, -1);
		element.setAttribute(kv[0].trim(), kv[1]);
	});
	return target;
}
ds.ui.pushTo = arr => target => arr.push(target);
// data...
ds.ui.DataConnection = ds.Object.extend({
	_lock: null,
	_get_cache: null,
	headers: null,
	host: null,
	async request(method, url, body, options) {
		const self = this;
		if (!self.host) throw new Error('ds.ui.DataConnection: Unable to perform request, "host" property is null.');
		await self._lock.acquire();
		options = Object.assign({ cache: false, cache_lifetime: 3000 }, options);
		if (method.toLowerCase() == 'get' && options.cache) {
			let descr = method.toUpperCase() + '_' + decodeURIComponent(url);
			let cache = self._get_cache[descr];
			if (cache && (((new Date()).getTime() - cache.time) <= cache.lifetime)) {
				await self._lock.release();
				return ds.clone(cache.data);
			}
		}
		let body_str = null;
		if (body) {
			if (body instanceof Object) body_str = JSON.stringify(body);
			else body_str = body.toString();
		}
		let json;
		try {
			let response = await fetch(self.host + url, { mode: 'cors', credentials: 'include', method: method.toUpperCase(), headers: new Headers(self.headers || {}), body: body_str  });
			if (response.status != 200) throw new Error('ds.ui.DataConnection.request: Request returned error code "' + response.status.toString() + '".');
			json = await response.json();
			if (json.status == 'error') throw new Error((json.message || '').toString().split('Error:').join('').trim());
		} catch(e) {
			await self._lock.release();
			self._trigger('error', e);
			throw e;
		}
		if (method.toLowerCase() == 'get' && options.cache) {
			let descr = method.toUpperCase() + '_' + decodeURIComponent(url);
			self._get_cache[descr] = { data: json.data, time: (new Date()).getTime(), lifetime: options.cache_lifetime };
		}
		self._trigger('request', json);
		await self._lock.release();
		return ds.clone(json.data);
	},
	init() {
		const self = this;
		self._lock = ds.Lock.new();
		self._get_cache = {};
	}
}, ds.Events('request', 'error'));
ds.ui.DataSet = ds.Object.extend({
	_needsLoad_promise: null,
	_loaded: false,
	_filter: null,
	_filteredData: null,
	connection: null,
	url: null,
	loadOnInit: false,
	stamp: 0,
	data: null,
	sort: false,
	sortKey: null,
	sortDataType: null,
	sortDirection: 'asc',
	get filter() { return this._filter; },
	set filter(value) {
		const self = this;
		if (self._filter == value) return;
		self._filter = value;
		if (self._filter) {
			self._applyFilter();
			self._trigger('filter');
		} else {
			self._resetFilter();
			self._trigger('filter');
		}
	},
	_applyFilter() {
		const self = this;
		self._filteredData = self.data.filter(item => {
			let matches = false;
			for (let key in self._filter) {
				if (self._filter[key].operator == 'equals') matches = ds.get(item, key) && self._filter[key].value == ds.get(item, key);
				else if (self._filter[key].operator == 'includes') matches = ds.get(item, key) && ds.get(item, key).toString().toLowerCase().includes(self._filter[key].value.toString().toLowerCase());
				else if (self._filter[key].operator == 'moreThan') matches = ds.get(item, key) && ds.get(item, key) > self._filter[key].value;
				else if (self._filter[key].operator == 'lessThan') matches = ds.get(item, key) && ds.get(item, key) < self._filter[key].value;
				else if (self._filter[key].operator == 'moreEqualsThan') matches = ds.get(item, key) && ds.get(item, key) >= self._filter[key].value;
				else if (self._filter[key].operator == 'lessEqualsThan') matches = ds.get(item, key) && ds.get(item, key) <= self._filter[key].value;
				else if (self._filter[key].operator == 'in') matches = ds.get(item, key) && self._filter[key].value.includes(ds.get(item, key));
				else if (self._filter[key].operator == 'notIn') matches = ds.get(item, key) && !self._filter[key].value.includes(ds.get(item, key));
				else matches = false;
				if (!matches) break;
			}
			return matches;
		});
	},
	_resetFilter() {
		const self = this;
		self._filteredData = [];
		self._filter = null;
	},
	_retrieveData() {
		const self = this;
		if (!self.url) throw new Error('ds.ui.DataSet: url not specified.');
		return self.connection.request('get', self.url, null);
	},
	_sortData(data) {
		const self = this;
		if (!self.sortKey) throw new Error('ds.ui.DataSet: "sortKey" is required when "sort: true".');
		const type = self.sortDataType || String;
		const asc = self.sortDirection == 'asc';
		const key = self.sortKey;
		data.sort((a, b) => {
			if (new type(ds.get(a, key)) < new type(ds.get(b, key))) return (asc ? -1 : 1);
			else if (new type(ds.get(a, key)) > new type(ds.get(b, key))) return (asc ? 1 : -1);
			else return 0;
		});
	},
	isLoaded() { return this._loaded; },
	isFiltered() { return !!this._filter; },
	isItemVisible(index) {
		const self = this;
		if (!self.filter) return true;
		return self._filteredData.includes(self.data[index]);
	},
	async load(url = null) {
		const self = this;
		if (url) self.url = url;
		const p = self._trigger('beforeload') || [];
		if (p.some(p => ds.isPromise(p))) await Promise.all(p);
		if (!self.connection) throw new Error('ds.ui.DataSet: connection not specified.');
		let data = await self._retrieveData();
		if (self.sort) self._sortData(data);
		data = (await self._trigger('transform', data)) || data;
		if (JSON.stringify(data) != JSON.stringify(self.data)) self.stamp = self.stamp + 1;
		self.data = data;
		self._loaded = true;
		self._resetFilter();
		self._trigger('load');
	},
	async needsLoad(url = null) {
		var self = this;
		if (self._needsLoad_promise) return self._needsLoad_promise;
		self._needsLoad_promise = new Promise((resolve, reject) => {
			self.load(url)
				.then(() => { self._needsLoad_promise = null; resolve(); })
				.catch(e => { self._needsLoad_promise = null; reject(e); });
		});
		return self._needsLoad_promise;
	},
	init() {
		const self = this;
		self._filteredData = [];
		if (!self.data) self.data = [];
		if (self.loadOnInit) self.load();
	}
}, ds.Events('load', 'filter', 'beforeload', 'transform:single'));
ds.ui.DataObject = ds.Object.extend({
	connection: null,
	url: null,
	id: null,
	checkdata: true,
	checkdataIgnoreFields: null,
	_data_get: null,
	_data_set: null,
	isLoaded() { return Object.keys(this._data_get).length > 0 },
	get(name) {
		const self = this;
		if (!name) return ds.clone(Object.assign(Object.assign({}, self._data_get), self._data_set));
		else return self._data_set[name] !== undefined ? self._data_set[name] : self._data_get[name];
	},
	set(p1, p2) {
		const self = this;
		if (p1 instanceof Object) Object.keys(p1).forEach(key => self._data_set[key] = p1[key]);
		else self._data_set[p1] = p2;
	},
	async load(id) {
		const self = this;
		if (id) self.id = id;
		if (!self.connection) throw new Error('ds.ui.DataObject: connection not specified.');
		if (!self.url) throw new Error('ds.ui.DataObject: url not specified.');
		if (!self.id) throw new Error('ds.ui.DataObject: id not specified.');
		let data = null;
		try {
			data = await self.connection.request('get', self.url + '/' + self.id.toString(), null);	
		} catch(e) {
			self._trigger('error', e);
			throw e;
		}
		self.reset();
		self._data_get = data;
		self._trigger('load');
	},
	async save() {
		const self = this;
		if (!self.connection) throw new Error('ds.ui.DataObject: connection not specified.');
		if (!self.url) throw new Error('ds.ui.DataObject: url not specified.');
		if (Object.keys(self._data_set).length == 0 && !!self.id) return;
		self._trigger('beforesave');
		let data = null;
		try {
			if (!self.id) data = await self.connection.request('POST', self.url, self._data_set);
			else data = await self.connection.request('PATCH', self.url + '/' + self.id.toString(), self._data_set);
		} catch(e) {
			self._trigger('error', e);
			throw e;
		}
		Object.assign(self._data_get, self._data_set);
		self._data_set = {};
		self._trigger('save');
		if (self.checkdata) {
			let needs_load_trigger = false;
			Object.keys(self._data_get).forEach(key => {
				if (self.checkdataIgnoreFields.includes(key)) return;
				if (!data.hasOwnProperty(key)) return;
				if (ds.asString(self._data_get[key]) != ds.asString(data[key])) needs_load_trigger = true;
			});
			if (needs_load_trigger) {
				Object.assign(self._data_get, data);
				self._trigger('load');	
			}
		}
		return data.id;	
	},
	reset() {
		const self = this;
		self._data_get = {};
		self._data_set = {};
	},
	init() {
		const self = this;
		self._data_get = {};
		self._data_set = {};
		self.checkdataIgnoreFields = ['modifiedat'];
	}
}, ds.Events('load', 'save', 'beforesave', 'error'));
ds.ui.VirtualDataSet = ds.ui.DataSet.extend({
	async load() {
		const self = this;
		const p = self._trigger('beforeload') || [];
		if (p.some(p => ds.isPromise(p))) await Promise.all(p);
		self.stamp = self.stamp + 1;
		self._loaded = true;
		self._trigger('load');
	},
	init() {
		const self = this;
		ds.ui.DataSet.init.call(self);
		if (ds.isArray(self.data)) self.load();
	}
});
__electron = () => {
	if (!!ds.get(window, 'process.versions.electron')) {
		if (!global.__electron_lib) global.__electron_lib = require('electron');
		return global.__electron_lib;
	} else return false;
}
__electron_code = fn => {
	if (__electron()) return fn(__electron());
}
__test_popup = () => {
	let testView = ds.ui.View.extend({
		template: `<div class="bkw so2 bl bt br bb nosel" style="position:absolute;left:100px;top:100px;" x-on:mousedown="self.dragHelper.begin()">
						<div class="ml2 mr2">
							{{ ds.ui.Button.new({ small: true, text: 'u-l' }).on('click', e => this.popup(e, 'up', 'left')) }}
							{{ ds.ui.Button.new({ small: true, text: 'u-c' }).on('click', e => this.popup(e, 'up', 'center')) }}
							{{ ds.ui.Button.new({ small: true, text: 'u-r' }).on('click', e => this.popup(e, 'up', 'right')) }}
						</div>
						<div class="row">
							<div class="col">
								{{ ds.ui.Button.new({ small: true, text: 'l-t' }).on('click', e => this.popup(e, 'left', 'top')) }}
								{{ ds.ui.Button.new({ small: true, text: 'l-m' }).on('click', e => this.popup(e, 'left', 'middle')) }}
								{{ ds.ui.Button.new({ small: true, text: 'l-b' }).on('click', e => this.popup(e, 'left', 'bottom')) }}
							</div>
							<div class="row flex mid cen">
								<div>drag me</div>
							</div>
							<div class="col">
								{{ ds.ui.Button.new({ small: true, text: 'r-t' }).on('click', e => this.popup(e, 'right', 'top')) }}
								{{ ds.ui.Button.new({ small: true, text: 'r-m' }).on('click', e => this.popup(e, 'right', 'middle')) }}
								{{ ds.ui.Button.new({ small: true, text: 'r-b' }).on('click', e => this.popup(e, 'right', 'bottom')) }}
							</div>
						</div>
						<div class="ml2 mr2">
							{{ ds.ui.Button.new({ small: true, text: 'd-l' }).on('click', e => this.popup(e, 'down', 'left')) }}
							{{ ds.ui.Button.new({ small: true, text: 'd-c' }).on('click', e => this.popup(e, 'down', 'center')) }}
							{{ ds.ui.Button.new({ small: true, text: 'd-r' }).on('click', e => this.popup(e, 'down', 'right')) }}
						</div>
						<div x-ref="popup_element" class="w3 h5 bkw bl bt br bb so2" style="display:none;"></div>
					</div>`,
		_start_left: 0,
		_start_top: 0,
		_button: null,
		popup(e, direction, alignment) {
			const self = this;
			ds.ui.PopupHelper.new({
				target: self.popup_element,
				related: self.element,
				triangle: true,
				direction: direction,
				alignment: alignment
			})
			.on('open', () => e.target.__view.droppeddown = true)
			.on('close', () => e.target.__view.droppeddown = false)
			.open();
		},
		init() {
			const self = this;
			ds.ui.View.init.call(self);
			self.popupHelper = ds.ui.PopupHelper.new({ target: self.popup_element, related: self.element, triangle: true });
			self.popupHelper.on('open', () => self._button.droppeddown = true);
			self.popupHelper.on('close', () => self._button.droppeddown = false);
			self.dragHelper = ds.ui.DragHelper.new();
			self.dragHelper.on('begin', offset => {
				self._start_left = self.element.offsetLeft;
				self._start_top = self.element.offsetTop;
			});
			self.dragHelper.on('drag', offset => {
				self.element.style.top = (self._start_top + offset.y).toString() + 'px';
				self.element.style.left = (self._start_left + offset.x).toString() + 'px';
			});
		}
	});
	setTimeout(() => {
		v = testView.new();
		document.body.appendChild(v.element);
	}, 500);
}