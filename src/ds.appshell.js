// dependencies...
if (typeof ds == 'undefined') throw 'ds.appshell: ds module required.';
if (!ds.ui) throw 'ds.appshell: ds.ui module required.';
// namespace...
ds.appshell = {};
// views...
ds.appshell.__SearchView = ds.ui.View.extend({
	styles: `.__xas_srchbox { background-color: var(--border-color); border-radius: 3px; padding-left: 6px; position: relative; }
			.__xas_srchbox > input { background-color: transparent; border: 0px solid; width: calc(100% - 24px); height: 21px; }
			.__xas_srchbox > input::placeholder { font-size: 12px; color: #999; }
			.__xas_srchbox > span { position: absolute; right: 8px; top: 4px; color: gray; cursor: pointer; }`,
	template: `<div class="__xas_srchbox"><input type="text" placeholder="Поиск..."><span class="fa fa-search"></span></div>`
})
ds.appshell.__UserView = ds.ui.View.extend({
	styles: `.__xas_uv_bell_active { background-color: var(--background-color-selected); }
			.__xas_uv_bell_active > img.dhvrc { filter: opacity(1); }
			.__xas_uv_addbtn { background-color: #4AA7F0; border-radius: 50%; width: 32px; height: 32px; opacity: 0.9; align-self:flex-start; }
			.__xas_uv_addbtn:hover { background-color: #5ab0f2; }
			.__xas_uv_addbtn:active { background-color: #4AA7F0; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset; }`,
	template: `<div class="row mid">
					<img x-bind:src="{{ this._image }}" class="x32 mr" style="border-radius:50%; align-self:flex-start;">
					<span class="mr05 flex" style="overflow:hidden;">
						<span>{{ this._name }}</span><br/>
						<span class="sm gray">{{ this._jobtitle }}</span>
					</span>
					<div x-ref="menu_element" class="dhvr hvr hnd rnd row cen mid"
						style="align-self:flex-start;width:32px;height:32px;"
						x-on:click="self._userMenu.open()">
						<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTcgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0ibWVudSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0yIiBmaWxsPSIjMDAwMDAwIiBjeD0iOC41IiBjeT0iMi41IiByPSIxLjUiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMi1Db3B5IiBmaWxsPSIjMDAwMDAwIiBjeD0iOC41IiBjeT0iNy41IiByPSIxLjUiPjwvY2lyY2xlPgogICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMi1Db3B5LTIiIGZpbGw9IiMwMDAwMDAiIGN4PSI4LjUiIGN5PSIxMi41IiByPSIxLjUiPjwvY2lyY2xlPgogICAgPC9nPgo8L3N2Zz4=" class="x16 dhvrc"/>
					</div>
					<div class="__xas_uv_addbtn hnd row mid cen white fs13 ml05" x-on:click="self._trigger('add_click')"><i class="fa fa-plus"></i></div>
				</div>`,
	_userMenu: null,
	_image: null,
	_name: null,
	_jobtitle: null,
	setUserInfo(userInfo) {
		const self = this;
		self._image = userInfo.image ? '/assets/images/users/' + userInfo.image : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgc3R5bGU9ImJhY2tncm91bmQ6ICNDNkM2QzY7Ij4KICAgIDxnIGlkPSJhdmF0YXJfZ2VuZXJpYyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgZmlsbD0iI0ZGRkZGRiIgY3g9IjE2IiBjeT0iMTMiIHI9IjYiPjwvY2lyY2xlPgogICAgICAgIDxlbGxpcHNlIGlkPSJPdmFsLTIiIGZpbGw9IiNGRkZGRkYiIGN4PSIxNiIgY3k9IjMyIiByeD0iMTAiIHJ5PSIxNCI+PC9lbGxpcHNlPgogICAgPC9nPgo8L3N2Zz4=';
		self._name = userInfo.name || 'Name not provided';
		self._jobtitle = userInfo.jobtitle || '';
		document.querySelector('head > title').textContent = self._name;
		self.needsUpdate();
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self._userMenu = ds.ui.Menu.new();
		self._userMenu.popupHelper.related = self.menu_element;
		self._userMenu.popupHelper.triangle = true;
		self._userMenu.on('before_open', () => self.menu_element.classList.add('dhvra', 'hvra'));
		self._userMenu.on('close', () => self.menu_element.classList.remove('dhvra', 'hvra'));
		self._userMenu.addItem(ds.ui.MenuItem.new({ text: 'Выход' }).on('click', () => sbxapp.SBXApp.shared().logOut()));
		ds.Emitter.shared().on(['appshell.userservice.setuser', 'appshell.notificationservice.notification'], () => {
			if (self.__freed) return false;
			self.needsUpdate();
			return true;
		});
	}
}, ds.Events('add_click'));
ds.appshell.__SideBarView = ds.ui.View.extend({
	template: `<div class="__xas_sdb row">
					<div class="flex col"></div>
					<div class="col bl bk">
						<div class="thvr hnd pl pt pr pb mb">
							<i class="fa fa-search"></i>
						</div>
						<div class="flex"></div>
						<div class="dhvr hnd pl pt pr pb mb">
							<!-- <i class="fa fa-cog"></i> -->
							<img class="x14 dhvrc" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwMy40NzcgMzAzLjQ3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAzLjQ3NyAzMDMuNDc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik0yOTguNjA0LDY0LjIwOWwtNDkuOTc4LDQ5Ljk3OUwyMDQuOTA3LDk4LjU3TDE4OS4yOSw1NC44NTJsNDkuOTc5LTQ5Ljk3OWMtMzIuNzkxLTEwLjk3LTcwLjQxOC0zLjQyLTk2LjUyOSwyMi42OTIgIGMtMjUuNjI5LDI1LjYyOS0zMy4zNzMsNjIuMzQ5LTIzLjI4MSw5NC43MDRjLTEuMzU5LDEuMDctMi42NzYsMi4yMjItMy45MywzLjQ3NkwxMi44ODQsMjI4LjM4OSAgYy0xNy4xNzgsMTcuMTc3LTE3LjE3OCw0NS4wMjcsMCw2Mi4yMDVjMTcuMTc4LDE3LjE3OCw0NS4wMjksMTcuMTc4LDYyLjIwNywwbDEwMi42NDUtMTAyLjY0NWMxLjI1NC0xLjI1NCwyLjQwNC0yLjU3LDMuNDc1LTMuOTI5ICBjMzIuMzU1LDEwLjA5Miw2OS4wNzQsMi4zNDcsOTQuNzAzLTIzLjI4MkMzMDIuMDI0LDEzNC42MjYsMzA5LjU3NSw5Ny4wMDEsMjk4LjYwNCw2NC4yMDl6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
						</div>
					</div>
				</div>`,
});
ds.appshell.__NavBarNodeView = ds.ui.View.extend({
	styles: `.__xasexp_nd .__xasexp_nd_cell { padding: 3px 0px 3px 0px; border-left-style: solid; border-left-width: 3px; border-left-color: transparent;  }
			.__xasexp_nd_cell_exp { position: relative; width: 24px; }
			.__xasexp_nd.__haschildren .__xasexp_nd_cell_exp::after {
				position: absolute;
				content: '';		opacity: 0.25;
				right: 8px;			top: 50%;
				width: 5px;			height: 6px;
				transform: translateY(-50%);
				background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjZweCIgdmlld0JveD0iMCAwIDUgNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJ0cmVlX2NhcmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjAgMCA1IDMgMCA2Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg=='); }
			.__xasexp_nd.__haschildren .__xasexp_nd_cell_exp:hover::after { opacity: 1; }
			.__xasexp_nd.__haschildren.__expanded .__xasexp_nd_cell_exp::after { transform: translateY(-50%) rotate(90deg); }
			.__xasexp_nd.__selected .__xasexp_nd_cell { background-color: white !important; border-left-color: #4AA7F0;  }`,
	template: `<div class="__xasexp_nd mt05{{ this._nodes.length > 0 ? ' __haschildren' : '' }} {{ this._selected ? '__selected' : '' }}">
					<div class="__xasexp_nd_cell row hvr hnd vhvr" x-on:click="self._nodeClick(e)">
						<div class="__xasexp_nd_cell_exp"></div>
						{{ ds.ui.Cell.new({
								className: 'flex',
								text: this._getText(),
								image: this._getImage() || ds.ui.Cell.EMPTY_IMG,
								badge: this.badge,
								badgeClassName: 'gray' 
							}) }}
						<div x-if="this._getCanClose()" class="hnd thvr sm gray tac col mid cen x18 mr05 vhvrc" x-on:click="self._nodeClose(e)">
							<i class="fa fa-times"></i>
						</div>
					</div>
					<div x-ref="nodes_element">{{ this._nodes }}</div>
				</div>`,
	_navBarView: null,
	_sectionView: null,
	_controller: null,
	_selected: false,
	text: null,
	image: null,
	badge: null,
	controller: null,
	_nodes: null,
	set selected(value) { this._selected = value; this.needsUpdate(); },
	get selected() { return this._selected },
	_getText() {
		const self = this;
		if (self.text) return self.text;
		else if (self._controller) return self._controller.text;
		else return null;
	},
	_getImage() {
		const self = this;
		if (self.image) return self.image;
		else if (self._controller) return self._controller.image;
		else return null;
	},
	_getCanClose() {
		const self = this;
		if (self._controller) return self._controller.canClose;
		else return false;
	},
	_nodeClick(e) {
		const self = this;
		if (!self._controller) self._controller = ds.appshell.AppShell.shared().actions.exec('open_controller', { controller: self.controller, controllerArgs: self.controllerArgs, navBarNode: self });
		else ds.appshell.AppShell.shared().actions.exec('show_controller', { controller: self._controller });
	},
	_nodeClose(e) {
		const self = this;
		e.stopPropagation();
		ds.appshell.AppShell.shared().actions.exec('close_controller', { controller: self._controller });
		self._controller = null;
	},
	init() {
		const self = this;
		self._nodes = [];
		ds.ui.View.init.call(self);
	},
	free() {
		const self = this;
		self._sectionView._nodes = self._sectionView._nodes.filter(n => n != self);
		self._sectionView.needsUpdate();
		ds.ui.View.free.call(self);
	}
});
ds.appshell.__NavBarSectionView = ds.ui.View.extend({
	template: `<div class="nosel">
					<div class="fs11 gray bvl pl2 pr pb075 row vhvr hnd" x-on:click="self._toggleExpand()">
						<div class="flex strong">{{ (this.text || '').toUpperCase() }}</div>
						<div x-ref="collapse_element" x-if="this._expanded" class="vhvrc">свернуть</div>
						<div x-ref="expand_element" x-if="!this._expanded" class="vhvrc">развернуть</div>
					</div>
					<div x-ref="nodes_element" x-if="this._expanded" style="margin-bottom: 22px;">
						{{ this._nodes }}
					</div>
					<div x-if="!this._expanded" style="margin-bottom: 11px;"></div>
				</div>`,
	_nodes: null,
	_expanded: true,
	_navBarView: null,
	text: null,
	id: null,
	_getStorageID() {
		const self = this;
		return `navbar_section_${self.id}_expand`;
	},
	_toggleExpand() {
		const self = this;
		self._expanded = !self._expanded;
		self.needsUpdate();
		localStorage.setItem(self._getStorageID(), self._expanded);
	},
	addNode(options) {
		const self = this;
		const nodeView = ds.appshell.__NavBarNodeView.new(Object.assign(options, { _navBarView: self._navBarView, _sectionView: self }));
		self._nodes.push(nodeView);
		self.needsUpdate();
		return nodeView;
	},
	update() {
		const self = this;
		self._visible = self._nodes.length > 0;
		ds.ui.View.update.call(self);
	},
	init() {
		const self = this;
		self._nodes = [];
		self._expanded = ds.ifnull(localStorage.getItem(self._getStorageID()), 'true') == 'true';
		ds.ui.View.init.call(self);
	},
	free() {
		const self = this;
		(self._nodes || []).forEach(n => n.free());
		ds.ui.View.free.call(self);
	}
});
ds.appshell.__NavBarView = ds.ui.View.extend({
	template: `<div class="col bk br">
					{{ this.userView ||= ds.appshell.__UserView.new({ className: 'ml2 mr mb2', style: { 'margin-top': '13px' } }) }}
					<div class="flex col scroll">
						{{ this._sections }}	
					</div>
				</div>`,
	_sections: null,
	openedSection: null,
	addSection(options) {
		const self = this;
		const sectionView = ds.appshell.__NavBarSectionView.new(Object.assign(options, { _navBarView: self }));
		self._sections.push(sectionView);
		self.needsUpdate();
		return sectionView;
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		self._sections = [];
		self.openedSection = self.addSection({ text: 'Открытые' });
	}
});
ds.appshell.__AppView = ds.ui.View.extend({
	styles: `@media (max-width: 1280px) {
				.__xas_nvbr { position: fixed; left: 0px; top: 0px; bottom: 0px; transform: translateX(calc(-100% + 16px)); transition: all 0.25s; z-index: 10; }
				.__xas_nvbr:hover { transform: none; box-shadow: 0px 0px 15px 0 rgba(0, 0, 0, .1) }
				.__xas_cnt { margin-left: 16px; } }`,
	template: `<div class="app row flex bt">
					{{ this.navBarView ||= ds.appshell.__NavBarView.new({ className: '__xas_nvbr w3' }) }}
					{{ this.navBarSplitter ||= ds.ui.Splitter.new({ align: 'left', overflow: 'left' }) }}
					<div class="__xas_cnt col flex">
						<div class="row flex">
							<div x-ref="tabs_content" class="col flex"></div>
							{{ this.propsSplitter ||= ds.ui.Splitter.new({ align: 'right', overflow: 'right', visible: false }) }}
							<div x-ref="props_content" class="col w4 bl" style="display:none;"></div>
						</div>
					</div>
					{{ this.sideBarSplitter ||= ds.ui.Splitter.new({ align: 'right', overflow: 'right', visible: false }) }}
					{{ this.sideBarView ||= ds.appshell.__SideBarView.new({ className: 'bl w4', visible: false }) }}
				</div>`,
	init() {
		const self = this;
		if (!self.appShell) throw new Error('ds.appshell.__AppView: appShell is required.');
		ds.ui.View.init.call(self);
	}
});
// actions...
ds.appshell.__Actions = ds.Object.extend({
	_actions: null,
	appShell: null,
	add(options) {
		const self = this;
		options = Object.assign({ name: null, image: null, fn: args => {} }, options);
		if (!options.name) throw new Error('ds.appshell.__Actions: name is required when adding action.');
		self._actions.push(options);
	},
	exec(action_name, args) {
		const self = this;
		let action = self._actions.find(a => a.name.toUpperCase() == action_name.toUpperCase());
		if (!action) throw new Error('ds.appshell.__Actions: action not found by name "' + action_name + '".');
		return action.fn.call(null, args);
	},
	init() {
		const self = this;
		if (!self.appShell) throw new Error('ds.appshell.__Actions: appShell is required.');
		self._actions = [];
		// standard actions...
		self.add({
			name: 'open_controller',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.__Actions: "controller" property not found when performing "open_controller" action.');
				let controller_prototype = ds.isPrototypeOf(args.controller, ds.ui.Controller)
											? args.controller
											: ds.isString(args.controller)
												? ds.get(ds.global(), args.controller)
												: null;
				if (!controller_prototype) throw new Error('ds.appshell.__Actions: Controller prototype not found by "' + args.controller + '".');
				const controller = controller_prototype.new(Object.assign({ __navbar_node: args.navBarNode }, args.controllerArgs || {}));
				if (!controller.__navbar_node) controller.__navbar_node = self.appShell.appView.navBarView.openedSection.addNode({ _controller: controller });
				controller.view.visible = false;
				self.appShell.openedController.push(controller);
				self.appShell.appView.tabs_content.appendChild(controller.view.element);
				if (!args.nofocus) self.exec('show_controller', { controller });
				return controller;
			}
		});
		self.add({
			name: 'show_controller',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.__Actions: "controller" property not found when performing "open_controller" action.');
				if (self.appShell.activeController) {
					self.appShell.activeController.__navbar_node.selected = false;
					self.appShell.activeController.view.visible = false;
					if (self.appShell.activeController.__props_controller)
						self.appShell.activeController.__props_controller.view.visible = false;
				}
				self.appShell.activeController = args.controller;
				self.appShell.activeController.__navbar_node.selected = true;
				self.appShell.activeController.view.visible = true;
				if (self.appShell.activeController.__props_controller) {
					self.appShell.activeController.__props_controller.view.visible = true;
					this.appShell.appView.propsSplitter.visible = true;
					this.appShell.appView.props_content.style.setProperty('display', '');
				} else {
					this.appShell.appView.propsSplitter.visible = false;
					this.appShell.appView.props_content.style.setProperty('display', 'none');
				}
				if (ds.isFunction(self.appShell.activeController.onshow)) self.appShell.activeController.onshow();
				ds.ui.element_trigger(window, 'resize');
			}
		});
		self.add({
			name: 'close_controller',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.__Actions: "controller" property not found when performing "open_controller" action.');
				if (args.controller.__props_controller) {
					args.controller.__props_controller.free();
					args.controller.__props_controller = null;
				}
				if (args.controller.__navbar_node) {
					args.controller.__navbar_node.free();
					args.controller.__navbar_node = null;
				}
				args.controller.free();
				self.appShell.openedController = self.appShell.openedController.filter(c => c != args.controller);
				if (args.controller == self.appShell.activeController) self.appShell.activeController = null;
			}
		});
		self.add({
			name: 'open_properties',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.__Actions: "controller" property not found when performing "open_properties" action.');
				const controller_prototype = ds.isPrototypeOf(args.controller, ds.ui.Controller)
											? args.controller
											: ds.isString(args.controller)
												? ds.get(ds.global(), args.controller)
												: null;
				if (!controller_prototype) throw new Error('ds.appshell.__Actions: Controller prototype not found by "' + args.controller + '".');
				if (!self.appShell.activeController) throw new Error('ds.appshell.__Actions: Unable to open properties controller for not active tab.');
				if (self.appShell.activeController.__props_controller) {
					self.appShell.activeController.__props_controller._trigger('close');
					self.appShell.activeController.__props_controller.free();
				}
				self.appShell.activeController.__props_controller = controller_prototype.new(args.controllerArgs || {});
				self.appShell.appView.propsSplitter.visible = true;
				self.appShell.appView.props_content.style.setProperty('display', '');
				self.appShell.appView.props_content.appendChild(self.appShell.activeController.__props_controller.view.element);
				ds.ui.element_trigger(window, 'resize');
				return self.appShell.activeController.__props_controller;
			}
		});
		self.add({
			name: 'close_properties',
			fn: args => {
				if (!self.appShell.activeController) throw new Error('ds.appshell.__Actions: Unable to close properties controller for not active tab.');
				if (self.appShell.activeController.__props_controller) {
					self.appShell.activeController.__props_controller._trigger('close');
					self.appShell.activeController.__props_controller.free();
					self.appShell.activeController.__props_controller = null;
					self.appShell.appView.propsSplitter.visible = false;
					self.appShell.appView.props_content.style.setProperty('display', 'none');
					ds.ui.element_trigger(window, 'resize');
				}
			}
		});
	}
});
// appshell...
ds.appshell.AppShell = ds.Object.extend({
	openedController: null,
	appView: null,
	container: null,
	actions: null,
	init() {
		const self = this;
		if (!self.container) throw 'ds.appshell.AppShell: Container must be specified.';
		self.openedController = [];
		self.activeController = null;
		self.actions = ds.appshell.__Actions.new({ appShell: self });
		self.appView = ds.appshell.__AppView.new({ appShell: self });
		self.container.appendChild(self.appView.element);
	}
});