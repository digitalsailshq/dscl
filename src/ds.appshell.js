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
			.__xas_uv_bell_active > img.dhvrc { filter: opacity(1); }`,
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
});
ds.appshell.__ExplorerNodeView = ds.ui.View.extend({
	styles: `.__xasexp_nd .__xasexp_nd_cell { padding: 3px 0px 3px 0px; }
			.__xasexp_nd_cell_exp { position: relative; width: 24px; }
			.__xasexp_nd.__haschildren .__xasexp_nd_cell_exp::after {
				position: absolute;
				content: '';		opacity: 0.25;
				right: 8px;			top: 50%;
				width: 5px;			height: 6px;
				transform: translateY(-50%);
				background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjZweCIgdmlld0JveD0iMCAwIDUgNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSJ0cmVlX2NhcmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cG9seWdvbiBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjAgMCA1IDMgMCA2Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg=='); }
			.__xasexp_nd.__haschildren .__xasexp_nd_cell_exp:hover::after { opacity: 1; }
			.__xasexp_nd.__haschildren.__expanded .__xasexp_nd_cell_exp::after { transform: translateY(-50%) rotate(90deg); }`,
	template: `<div class="__xasexp_nd mt05{{ this._options.has_children ? ' __haschildren' : '' }}">
					<div class="__xasexp_nd_cell row hvr hnd" x-on:click="self.sectionView.explorerView._trigger('node_click', self)">
						<div class="__xasexp_nd_cell_exp"></div>
						{{ this._getCell() }}
					</div>
					<div x-ref="nodes_element">{{ this._options.has_children ? this._getNodes() : null }}</div>
				</div>`,
	_options: null,
	sectionView: null,
	parent: null,
	item: null,
	index: null,
	badge: null,
	_getCell() { return ds.ui.Cell.new({ text: this._options.text, image: this._options.image, badge: this.badge, badgeClassName: 'gray' }); },
	async _getNodes() {
		const self = this;
		let node_count = (await self.sectionView.explorerView._triggerAsync('node_count', self.parent, self.sectionView.item)) || 0;
		for (let i = 0; i < node_count; i++) {

		}
		return [];
	},
	update() {
		const self = this;
		self._options = Object.assign({ text: 'No text', image: ds.ui.Cell.EMPTY_IMG, has_children: false }, self.sectionView.explorerView._trigger('node_options', self.item, self.sectionView.item));
		ds.ui.View.update.call(self);
	},
	init() {
		const self = this;
		if (!self.sectionView) throw new Error('ds.appshell.__ExplorerNodeView: sectionView is required.');
		self.item.__nodeView = self;
		ds.ui.View.init.call(self);
		self.sectionView.explorerView._trigger('node_ready', self);
	}
});
ds.appshell.__ExplorerSectionView = ds.ui.View.extend({
	styles: `.__xasexp_sc { margin-bottom: 22px; }`,
	template: `<div class="__xasexp_sc nosel">
					<div class="fs11 gray bvl strong pl2 mb">{{ (this._options.text || '').toUpperCase() }}</div>
					<div x-ref="nodes_element">{{ this._getNodes() }}</div>
				</div>`,
	_options: null,
	explorerView: null,
	item: null,
	index: null,
	async _getNodes() {
		const self = this;
		if (self.nodes) self.nodes.forEach(n => n.free());
		self.nodes = [];
		let count = (await self.explorerView._triggerAsync('node_count', null, self.item)) || 0;
		for (let i = 0; i < count; i++) {
			let item = await self.explorerView._triggerAsync('node_item', null, i, self.item);
			let view = ds.appshell.__ExplorerNodeView.new({ item: item, index: i, sectionView: self });
			self.nodes.push(view);
		}
		return self.nodes;
	},
	update() {
		const self = this;
		self._options = Object.assign({ header: true, text: 'No text', settings: false }, self.explorerView._trigger('section_options', self.item));
		ds.ui.View.update.call(self);
	},
	init() {
		const self = this;
		if (!self.explorerView) throw new Error('ds.appshell.__ExplorerSectionView: explorerView is required.');
		self.item.__sectionView = self;
		ds.ui.View.init.call(self);
	},
	free() {
		const self = this;
		if (self.nodes) self.nodes.forEach(n => n.free());
		ds.ui.View.free.call(self);
	}
});
ds.appshell.__ExplorerView = ds.ui.View.extend({
	template: `<div class="ndt">
					{{ this._getSections() }}
				</div>`,
	section: null,
	async _getSections() {
		const self = this;
		if (self.sections) self.sections.forEach(s => s.free());
		self.sections = [];
		let count = (await self._triggerAsync('section_count')) || 0;
		for (let i = 0; i < count; i++) {
			let item = await self._triggerAsync('section_item', i);
			let view = ds.appshell.__ExplorerSectionView.new({ item: item, index: i, explorerView: self });
			self.sections.push(view);
		}
		return self.sections;
	},
	free() {
		const self = this;
		if (self.sections) self.sections.forEach(s => s.free());
		ds.ui.View.free.call(self);
	}
}, ds.Events('section_count:single', 'section_item:single', 'section_options:single', 'node_count:single', 'node_item:single', 'node_options:single', 'node_click', 'node_ready:single'));
ds.appshell.__NavBarView = ds.ui.View.extend({
	styles: `.__xas_nvbr { backg__round: linear-gradient(to bottom right, var(--background-color), var(--background-color), white); }`,
	template: `<div class="__xas_nvbr col br bk">
					<!-- {{ this.searchView = this.searchView || ds.appshell.__SearchView.new({ className: 'ml2 mt15 mr mb' }) }} -->
					{{ this.userView = this.userView || ds.appshell.__UserView.new({ className: 'mt2 ml2 mr mb' }) }}
					{{ this.explorerView = this.explorerView || ds.appshell.__ExplorerView.new({ className: 'mt2 flex scroll' }) }}
				</div>`,
	searchView: null,
	userView: null,
	explorerView: null
});
ds.appshell.__TabsView = ds.ui.View.extend({
	styles: `.__xas_tbb { height: 35px; }
			.__xas_tbb_addbtn { background-color: #4AA7F0; border: #3F99E0 solid 1px; }
			.__xas_tbb_addbtn:hover { background-color: #5ab0f2; }
			.__xas_tbb_addbtn:active { background-color: #4AA7F0; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 3px 6px 0px inset; }
			.__xas_tbb_tab { position: relative; cursor: pointer; border-bottom-style: solid; border-bottom-color: var(--border-color); border-bottom-width: 1px; max-width: 256px; }
			.__xas_tbb_tab.__selected { background-color: white; border-bottom-color: transparent; }
			.__xas_tbb_tab.__selected::after { content: ""; position: absolute; left: 0px; right: 0px; top: 0px; height: 3px; background-color: #4AA7F0; }
			.__xas_tbb_tab_txt { padding-left: 12px; padding-top: 9px; white-space: nowrap; text-overflow: ellipsis; overflow-x: hidden; }
			.__xas_tbb_tab_cb {
				background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDM1NyAzNTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM1NyAzNTc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iY2xvc2UiPgoJCTxwb2x5Z29uIHBvaW50cz0iMzU3LDM1LjcgMzIxLjMsMCAxNzguNSwxNDIuOCAzNS43LDAgMCwzNS43IDE0Mi44LDE3OC41IDAsMzIxLjMgMzUuNywzNTcgMTc4LjUsMjE0LjIgMzIxLjMsMzU3IDM1NywzMjEuMyAgICAgMjE0LjIsMTc4LjUgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K');
				background-position: 8px 14px;
				background-size: 8px;
				background-repeat: no-repeat;
				opacity: 0.25;
				width: 24px;
				cursor: pointer; }
			.__xas_tbb_tab_cb:hover { opacity: 1; background-color: rgba(0, 0, 0, 0.03) }`,
	template: `<div class="__xas_tbb row nosel" style="margin-left: -1px;">
					<div class="__xas_tbb_addbtn pl pt pr pb white bb hnd" x-on:click="self._trigger('add_click')"><i class="fa fa-plus"></i></div>
					{{ this._getTabs() }}	
					<div class="flex bb"></div>
					<!-- <div class="bb hvr hnd pl pt pr pb dhvr" x-on:click="self._trigger('sidebar_click')"><img class="dhvrc" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0ic2lkZWJhciIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgaWQ9IlJlY3RhbmdsZS0zIiBzdHJva2U9IiMwMDAwMDAiIHg9IjEuNSIgeT0iMS41IiB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHJ4PSIyIj48L3JlY3Q+PHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzAwMDAwMCIgeD0iOSIgeT0iMyIgd2lkdGg9IjQiIGhlaWdodD0iMTAiPjwvcmVjdD48L2c+PC9zdmc+" /></div> -->
				</div>`,
	_tabs: null,
	selectedIndex: null,
	_getTabs() {
		const self = this;
		self._tabs = [];
		let count = self._trigger('count');
		for (let i = 0; i < count; i++) {
			let options = self._trigger('options', i);
			let tab_element = ds.ui.element(`<div class="__xas_tbb_tab br row shrink hvr"><div class="__xas_tbb_tab_txt flex">${ options.text || 'No text' }</div>${ options.canClose ? '<div class="__xas_tbb_tab_cb"></div>' : '<div class="pl"></div>' }</div>`);
			tab_element.__index = i;
			if (i == self.selectedIndex) tab_element.classList.add('__selected');
			self._tabs.push(tab_element);
		}
		return self._tabs;
	},
	select(index, trigger_event = true) {
		const self = this;
		if (!self._tabs) return;
		self.selectedIndex = -1;
		let tab_element = self._tabs[index];
		if (tab_element) {
			self.selectedIndex = index;
			if (trigger_event) self._trigger('select', index);
		}
		self.needsUpdate();
	},
	close(index, trigger_event = true) {
		const self = this;
		let tab_element = self._tabs[index];
		if (!tab_element) return;
		if (trigger_event) self._trigger('close', index);
		if (self.selectedIndex >= index) {
			self.selectedIndex--;
			self.select(self.selectedIndex, true);
		}
		self.needsUpdate();
	},
	closeAll() {
		const self = this;
		let max = self._tabs.length - 1;
		for (let i = max; i >= 0; i--) self._trigger('close', i);
		self.selectedIndex = -1;
		self.needsUpdate();
	},
	init() {
		const self = this;
		ds.ui.View.init.call(self);
		ds.ui.element_on(self.element, 'click', '.__xas_tbb_tab_txt', function(e) {
			if (self.__freed) return false;
			let tab_element = ds.ui.element_parent(this, '.__xas_tbb_tab');
			self.select(tab_element.__index, true);
			return true;
		});
		ds.ui.element_on(self.element, 'click', '.__xas_tbb_tab_cb', function(e) {
			if (self.__freed) return false;
			let tab_element = ds.ui.element_parent(this, '.__xas_tbb_tab');
			self.close(tab_element.__index, true);
			return true;
		});
	}
}, ds.Events('count:single', 'options:single', 'select', 'close:single', 'add_click', 'sidebar_click'));
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
ds.appshell.__AppView = ds.ui.View.extend({
	styles: `@media (max-width: 1280px) {
				.__xas_nvbr { position: fixed; left: 0px; top: 0px; bottom: 0px; transform: translateX(calc(-100% + 16px)); transition: all 0.25s; z-index: 10; }
				.__xas_nvbr:hover { transform: none; box-shadow: 0px 0px 15px 0 rgba(0, 0, 0, .1) }
				.__xas_cnt { margin-left: 16px; }
			}`,
	template: `<div class="app row flex">
					{{ this.navBarView = this.navBarView || ds.appshell.__NavBarView.new({ className: 'w275' }) }}
					{{ this.navBarSplitter = this.navBarSplitter || ds.ui.Splitter.new({ align: 'left', overflow: 'left' }) }}
					<div class="__xas_cnt col flex">
						{{ this.tabsView = this.tabsView || ds.appshell.__TabsView.new({ className: 'bk' })
							.on('count', () => this.appShell.tabbedControllers.length)
							.on('options', index => ({ canClose: this.appShell.tabbedControllers[index].tabCanClose, text: this.appShell.tabbedControllers[index].text }))
							.on('select', index => {
								this.appShell.tabbedControllers.forEach((c, i) => {
									c.view.visible = i == index;
									if (c.__props_controller) c.__props_controller.view.visible = i == index;
								});
								const controller = this.appShell.tabbedControllers[index];
								if (controller.__props_controller) {
									self.appShell.appView.propsSplitter.visible = true;
									self.appShell.appView.props_content.style.setProperty('display', '');
								} else {
									self.appShell.appView.propsSplitter.visible = false;
									self.appShell.appView.props_content.style.setProperty('display', 'none');
								}
								if (ds.isFunction(controller.onshow)) controller.onshow();
								ds.ui.element_trigger(window, 'resize');
							})
							.on('close', index => {
								const controller = this.appShell.tabbedControllers[index];
								if (controller) {
									this.appShell.tabbedControllers = this.appShell.tabbedControllers.filter(c => c != controller);
									if (controller.__props_controller) {
										controller.__props_controller.free();
										controller.__props_controller = null;
									}
									controller.free();
								}
							})
							.on('sidebar_click', () => self.sideBarSplitter.visible = self.sideBarView.visible = !self.sideBarView.visible) }}
						<div class="row flex">
							<div x-ref="tabs_content" class="col flex"></div>
							{{ this.propsSplitter = this.propsSplitter || ds.ui.Splitter.new({ align: 'right', overflow: 'right', visible: false }) }}
							<div x-ref="props_content" class="col w4 bl" style="display:none;"></div>
						</div>
					</div>
					{{ this.sideBarSplitter = this.sideBarSplitter || ds.ui.Splitter.new({ align: 'right', overflow: 'right', visible: false }) }}
					{{ this.sideBarView = this.sideBarView || ds.appshell.__SideBarView.new({ className: 'bl w4', visible: false }) }}
				</div>`,
	init() {
		const self = this;
		if (!self.appShell) throw new Error('ds.appshell.__AppView: appShell is required.');
		ds.ui.View.init.call(self);
	}
});
// services...
ds.appshell.__ExplorerService = ds.Object.extend({
	_sections: null,
	appShell: null,
	async _retrieveSections() {
		const self = this;
		self._sections = await self._triggerAsync('sections');
		if (!ds.isArray(self._sections)) throw new Error('ds.appshell.__ExplorerService: sections must be array.');
	},
	async _retrieveItems(section) {
		const self = this;
		section._items = await self._triggerAsync('items', section);
		for (let item of section._items) {
			if (!item.type) throw new Error('ds.appshell.__ExplorerService: "type" property is required on item.');
			if (item.type == 'action') {
				if (!item.action) throw new Error('ds.appshell.__ExplorerService: "action" property is required for action items.');
				if (!item.text) item.text = 'No text';
				if (!item.image) item.image = ds.ui.Cell.EMPTY_IMG;
			}
		}
	},
	getSectionCount() { return this._retrieveSections().then(() => this._sections.length); },
	getSectionItem(index) { return this._sections[index]; },
	getSectionOptions(item) {
		const self = this;
		return { text: item.text };
	},
	getNodeCount(parent_item, section_item) { return this._retrieveItems(section_item).then(() => section_item._items.length); },
	getNodeItem(parent_item, index, section_item) { return section_item._items[index]; },
	getNodeOptions(node_item, section_item) { return { text: node_item.text || 'No text', image: node_item.image || ds.ui.Cell.EMPTY_IMG }; },
	nodeClick(node) {
		const self = this;
		if (node.item.type == 'action') self.appShell.actions.exec(node.item.action, node.item.actionArgs || {});
	},
	nodeReady(node) {
		const self = this;
		self._trigger('itemready', node.item, node);
	},
	update() {
		const self = this;
		self.appShell.appView.navBarView.explorerView.needsUpdate();
	},
	init() {
		const self = this;
		if (!self.appShell) throw new Error('ds.appshell.__ExplorerService: appShell is required.');
		self.appShell.appView.navBarView.explorerView.on('section_count', self.getSectionCount.bind(self));
		self.appShell.appView.navBarView.explorerView.on('section_item', self.getSectionItem.bind(self));
		self.appShell.appView.navBarView.explorerView.on('section_options', self.getSectionOptions.bind(self));
		self.appShell.appView.navBarView.explorerView.on('node_count', self.getNodeCount.bind(self));
		self.appShell.appView.navBarView.explorerView.on('node_item', self.getNodeItem.bind(self));
		self.appShell.appView.navBarView.explorerView.on('node_options', self.getNodeOptions.bind(self));
		self.appShell.appView.navBarView.explorerView.on('node_click', self.nodeClick.bind(self));
		self.appShell.appView.navBarView.explorerView.on('node_ready', self.nodeReady.bind(self));
	}
}, ds.Events('sections:single', 'items:single', 'itemready:single'));
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
		let props_controller;
		self.add({
			name: 'open_controller',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.addStandardActions: "controller" property not found when performing "open_controller" action.');
				let controller_prototype = ds.isPrototypeOf(args.controller, ds.ui.Controller)
											? args.controller
											: ds.isString(args.controller)
												? ds.get(ds.global(), args.controller)
												: null;
				if (!controller_prototype) throw new Error('ds.appshell.addStandardActions: Controller prototype not found by "' + args.controller + '".');
				let controller = controller_prototype.new(args.controllerArgs || {});
				self.appShell.tabbedControllers.push(controller);
				self.appShell.appView.tabsView.update();
				if (!args.nofocus) self.appShell.appView.tabsView.select(self.appShell.tabbedControllers.length -1);
				else self.appShell.appView.tabsView.select(self.appShell.appView.tabsView.selectedIndex);
				self.appShell.appView.tabs_content.appendChild(controller.view.element);
				self.appShell.appView.tabsView.needsUpdate();
				return controller;
			}
		});
		self.add({
			name: 'close_controller',
			fn: args => {
				const index = self.appShell.tabbedControllers.indexOf(args.controller);
				if (index > -1) self.appShell.appView.tabsView.close(index);
			}
		});
		self.add({
			name: 'open_properties',
			fn: args => {
				if (!args.controller) throw new Error('ds.appshell.addStandardActions: "controller" property not found when performing "open_properties" action.');
				const controller_prototype = ds.isPrototypeOf(args.controller, ds.ui.Controller)
											? args.controller
											: ds.isString(args.controller)
												? ds.get(ds.global(), args.controller)
												: null;
				if (!controller_prototype) throw new Error('ds.appshell.addStandardActions: Controller prototype not found by "' + args.controller + '".');
				const tabbed_controller = self.appShell.tabbedControllers[self.appShell.appView.tabsView.selectedIndex];
				if (!tabbed_controller) throw new Error('ds.appshell.addStandardActions: Unable to open properties controller for not active tab.');
				if (tabbed_controller.__props_controller) {
					tabbed_controller.__props_controller._trigger('close');
					tabbed_controller.__props_controller.free();
				}
				tabbed_controller.__props_controller = controller_prototype.new(args.controllerArgs || {});
				self.appShell.appView.propsSplitter.visible = true;
				self.appShell.appView.props_content.style.setProperty('display', '');
				self.appShell.appView.props_content.appendChild(tabbed_controller.__props_controller.view.element);
				ds.ui.element_trigger(window, 'resize');
				return tabbed_controller.__props_controller;
			}
		});
		self.add({
			name: 'close_properties',
			fn: args => {
				const tabbed_controller = self.appShell.tabbedControllers[self.appShell.appView.tabsView.selectedIndex];
				if (!tabbed_controller) throw new Error('ds.appshell.addStandardActions: Unable to close properties controller for not active tab.');
				if (tabbed_controller.__props_controller) {
					tabbed_controller.__props_controller._trigger('close');
					tabbed_controller.__props_controller.free();
					tabbed_controller.__props_controller = null;
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
	appView: null,
	tabbedControllers: null,
	container: null,
	tabs_content: null,
	properties_container: null,
	actions: null,
	navBarView: null,
	sideBarView: null,
	tabsView: null,
	init() {
		const self = this;
		if (!self.container) throw 'ds.appshell.AppShell: Container must be specified.';
		self.tabbedControllers = [];
		self.actions = ds.appshell.__Actions.new({ appShell: self });
		self.appView = ds.appshell.__AppView.new({ appShell: self });
		self.explorer = ds.appshell.__ExplorerService.new({ appShell: self });
		self.container.appendChild(self.appView.element);
	}
});