(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],{161:function(e,t,a){},255:function(e,t,a){},256:function(e,t,a){},410:function(e,t,a){"use strict";a.r(t);var r=a(0),s=a.n(r),n=a(45),i=a.n(n),l=(a(255),a.p,a(256),a(112)),o=a(12),c=a(114),d=a(22),u=a(4),h=a(5),p=a(46),b=a(7),j=a(6),m=a(467),g=a(129),O=a(428),f=a(20),x=a(427),S=a(429),v=a(70),V=a(430),C=a(466),w=a(431),y=a(142),D=a(68),P=a(432),I=a(433),k=a(47),E=a(434),N=a(244),A=a(117),R=a(435),z=a(438),L=a(439),T=a(440),F=a(441),G=a(442),B=a(443),U=a(472),M=a(444),q=a(143),_=a(445),H=a(152),K=a(446),W=a(447),J=a(448),Q=a(473),Y=a(474),X=a(449),Z=a(229),$=a(450),ee=a(451),te=a(452),ae=a(453),re=a(454),se=a(455),ne=a(456),ie=a(457),le=a(458),oe=a(459),ce=a(173),de=a.n(ce),ue=a(223),he=a.n(ue),pe=a(232),be=a.n(pe),je=a(174),me=a.n(je),ge=a(231),Oe=a.n(ge),fe=a(226),xe=a(225),Se=a(2),ve=(s.a.Component,a(108),a(83),a(161),a(80)),Ve=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={activeItem:3},r.onSelect=function(e){r.setState({activeItem:e.itemId})},r}return Object(h.a)(a,[{key:"render",value:function(){var e=this.state.activeItem;return Object(Se.jsx)(A.a,{onSelect:this.onSelect,"aria-label":"Nav",children:Object(Se.jsxs)(R.a,{children:[Object(Se.jsx)(z.a,{id:"orders-link",itemId:0,isActive:0===e,children:Object(Se.jsx)(ve.b,{to:"/orders",children:"Orders"})}),Object(Se.jsx)(z.a,{id:"articles-link",itemId:1,isActive:1===e,children:Object(Se.jsx)(ve.b,{to:"/articles",children:"Articles"})}),Object(Se.jsx)(z.a,{id:"customers-link",itemId:2,isActive:2===e,children:Object(Se.jsx)(ve.b,{to:"/customers",children:"Customers"})})]})})}}]),a}(s.a.Component),Ce=a(29),we=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return Object(Se.jsx)("div",{children:Object(Se.jsx)(K.a,{variant:K.b.light,children:Object(Se.jsxs)(W.a,{children:[Object(Se.jsx)(J.a,{component:"h1",children:"Home"}),Object(Se.jsx)(J.a,{component:"p",children:"Navigate yourself through a web-application built with a Patternfly (React) Frontend and a Quarkus Backend."}),Object(Se.jsx)(J.a,{component:"p",children:"Start out by clicking at the top-left corner and one of the shown links, and navigate yourself through the Website."})]})})})}}]),a}(r.Component),ye=a(97),De=a.n(ye),Pe=a(98),Ie=a.n(Pe),ke=a(234),Ee=a(118),Ne=a(11),Ae=a(460),Re=a(475),ze=a(413),Le=a(412),Te=a(461),Fe=a(462),Ge=a(436),Be=a(476),Ue=a(463),Me=a(464),qe=a(78),_e=a(471),He=a(437),Ke=a(179),We=a(107),Je=a(465),Qe=a(470),Ye=a(469),Xe=a(74),Ze=a.n(Xe),$e=Ze.a.create({baseURL:"http://localhost:8080/article"}),et=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e))._isMounted=!1,r.getLength=function(){$e.get("/length").then((function(e){r.setState({length:e.data})}))},r.fetch=function(e,t){var a={page:e,size:t};$e.get("/paginated",{params:a}).then((function(e){r.setState({articles:e.data})}))},r.post=function(){$e.post("/",{name:r.state.articleNameValue,description:r.state.articleDescriptionValue,category:r.state.articleCategoryDrawerValue}),r.setState({isExpanded:!1,articleNameValue:"",articleDescriptionValue:"",page:"0",perPage:"10",articleCategoryDrawerValue:void 0,articleIdValue:void 0})},r.update=function(){$e.put("/"+r.state.articleIdValue,{name:r.state.articleNameValue,description:r.state.articleDescriptionValue,category:r.state.articleCategoryDrawerValue}),r.setState({isExpanded:!1,articleNameValue:"",articleDescriptionValue:"",page:"0",perPage:"10",articleCategoryDrawerValue:void 0,articleIdValue:void 0})},r.delete=function(){$e.delete("/"+r.state.articleIdValue),r.setState({isExpanded:!1,articleNameValue:"",articleDescriptionValue:"",page:"0",perPage:"10",articleCategoryDrawerValue:void 0,articleIdValue:void 0})},r.search=function(){var e={search:r.state.searchValue,filter:r.state.categorySelected};$e.get("/search",{params:e}).then((function(e){r.setState({articles:e.data})}))},r.deleteSearch=function(){r.setState({searchValue:""}),r.fetch(r.state.page,r.state.perPage)},r.getLength(),r.state={articles:[],columns:[{title:"Name",transforms:[Ke.a]},{title:"Description",transforms:[Ke.a]},{title:"Category",transforms:[Ke.a]}],sortBy:{},page:"0",perPage:"10",length:0,isExpanded:!1,drawerEdit:!1,searchValue:"",categoryIsExpanded:!1,categorySelected:null,articleIdValue:void 0,articleCategoryDrawerValue:void 0,articleNameValue:"",articleDescriptionValue:""},r.drawerRef=s.a.createRef(),r.onSort=r.onSort.bind(Object(p.a)(r)),r.onRowClick=r.onRowClick.bind(Object(p.a)(r)),r.handleArticleCategoryChange=function(e){r.setState({articleCategoryDrawerValue:e})},r.handleArticleNameChange=function(e){r.setState({articleNameValue:e})},r.handleArticleDescriptionChange=function(e){r.setState({articleDescriptionValue:e})},r.categoryDrawerOptions=[{value:void 0,label:"Please Choose",disabled:!1},{value:0,label:"Toys",disabled:!1},{value:1,label:"Fashion",disabled:!1},{value:2,label:"Books",disabled:!1},{value:3,label:"Movies",disabled:!1},{value:4,label:"Games",disabled:!1},{value:5,label:"Music",disabled:!1}],r.categorySelectOptions=[{value:"Category",disabled:!1,isPlaceholder:!0},{value:"Toys",disabled:!1},{value:"Fashion",disabled:!1},{value:"Books",disabled:!1},{value:"Movies",disabled:!1},{value:"Games",disabled:!1},{value:"Music",disabled:!1}],r.onSetPage=function(e,t){r.fetch(t-1,r.state.perPage),r.setState({page:t})},r.onPerPageSelect=function(e,t){r.setState({perPage:t}),r.fetch(0,t)},r.onExpand=function(){r.drawerRef.current&&r.drawerRef.current.focus()},r.onClickAddArticle=function(){var e=!r.state.isExpanded;r.setState({drawerEdit:!1,isExpanded:e})},r.onCloseClick=function(){r.setState({isExpanded:!1,articleNameValue:"",articleDescriptionValue:"",articleCategoryDrawerValue:void 0})},r.onSearchValueChange=function(e){r.setState({searchValue:e})},r.onCategoryToggle=function(e){r.setState({categoryIsExpanded:e})},r.onCategorySelect=function(e,t,a){console.log(t),a&&r.clearCategorySelection(),r.setState({categorySelected:t,categoryIsExpanded:!1},(function(){this.search()}))},r.clearCategorySelection=function(){r.setState({categorySelected:null,categoryIsExpanded:!1}),r.fetch(r.state.page,r.state.perPageParameter)},r}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.fetch("0","10")}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"onSort",value:function(e,t,a){var r=this.state.articles.sort((function(e,a){return e[t]<a[t]?-1:e[t]>a[t]?1:0}));this.setState({sortBy:{index:t,direction:a},articles:a===We.a.asc?r:r.reverse()})}},{key:"onRowClick",value:function(e,t){var a=this.state.articles[t.secretTableRowKeyId];switch(a.category){case"TOYS":this.setState({articleCategoryDrawerValue:0});break;case"FASHION":this.setState({articleCategoryDrawerValue:1});break;case"BOOKS":this.setState({articleCategoryDrawerValue:2});break;case"MOVIES":this.setState({articleCategoryDrawerValue:3});break;case"GAMES":this.setState({articleCategoryDrawerValue:4});break;case"MUSIC":this.setState({articleCategoryDrawerValue:5});break;default:this.setState({articleCategoryDrawerValue:void 0})}this.setState({drawerEdit:!0,isExpanded:!0,articleNameValue:a.name,articleDescriptionValue:a.description,articleIdValue:a.id})}},{key:"render",value:function(){var e,t=this.state,a=t.columns,r=t.articles,n=t.sortBy,i=t.isExpanded,l=t.articleNameValue,o=t.articleDescriptionValue,c=t.articleCategoryDrawerValue,d=t.drawerEdit,u=t.categoryIsExpanded,h=t.categorySelected;e=d?Object(Se.jsxs)("div",{children:[Object(Se.jsx)(k.a,{variant:"primary",onClick:this.update,children:"Edit article"}),Object(Se.jsx)(k.a,{variant:"danger",onClick:this.delete,id:"deleteButton",children:"Delete article"})]}):Object(Se.jsx)(k.a,{variant:"primary",onClick:this.post,children:"Add article"});var p=Object(Se.jsxs)(s.a.Fragment,{children:[Object(Se.jsx)(D.a,{children:Object(Se.jsxs)(ke.a,{children:[Object(Se.jsx)(Ee.a,{name:"searchInput",id:"searchInput",type:"text","aria-label":"search input",onChange:this.onSearchValueChange,value:this.state.searchValue}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"search button for search input",onClick:this.search,children:Object(Se.jsx)(De.a,{})}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"delete button for search input",onClick:this.deleteSearch,children:Object(Se.jsx)(Ie.a,{})})]})}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(C.a,{variant:Ne.e.single,"aria-label":"Select Input",onToggle:this.onCategoryToggle,onSelect:this.onCategorySelect,selections:h,isOpen:u,children:this.categorySelectOptions.map((function(e,t){return Object(Se.jsx)(v.a,{isDisabled:e.disabled,isPlaceholder:e.isPlaceholder,value:e.value},t)}))})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(k.a,{variant:"primary","aria-expanded":i,onClick:this.onClickAddArticle,children:"Add Article"})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(m.a,{id:"pagination",itemCount:this.state.length,widgetId:"pagination-options-menu-top",perPage:this.state.perPage,page:this.state.page,variant:m.b.top,onSetPage:this.onSetPage,onPerPageSelect:this.onPerPageSelect,isCompact:!0})})]}),b=Object(Se.jsxs)(Ae.a,{isHorizontal:!0,children:[Object(Se.jsx)(Re.a,{label:"Name",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:l,isRequired:!0,type:"text",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleArticleNameChange})}),Object(Se.jsx)(Re.a,{label:"Article Description",fieldId:"horizontal-form-desc",children:Object(Se.jsx)(ze.a,{value:o,onChange:this.handleArticleDescriptionChange,name:"horizontal-form-desc",id:"horizontal-form-desc"})}),Object(Se.jsx)(Re.a,{label:"Category",fieldId:"horizontal-form-category",children:Object(Se.jsx)(Le.a,{value:c,isRequired:!0,onChange:this.handleArticleCategoryChange,id:"horzontal-form-category",name:"horizontal-form-category",children:this.categoryDrawerOptions.map((function(e,t){return Object(Se.jsx)(Te.a,{isDisabled:e.disabled,value:e.value,label:e.label},t)}))})}),Object(Se.jsx)(Fe.a,{children:e})]}),j=Object(Se.jsx)(Ge.a,{children:Object(Se.jsxs)(Be.a,{children:[Object(Se.jsx)("span",{tabIndex:i?0:-1,ref:this.drawerRef,children:b}),Object(Se.jsx)(Ue.a,{children:Object(Se.jsx)(Me.a,{onClick:this.onCloseClick})})]})}),g=Object(Se.jsxs)(Je.a,{"aria-label":"Sortable Table",sortBy:n,onSort:this.onSort,cells:a,rows:r.map((function(e,t){return[e.name,e.description,e.category]})),children:[Object(Se.jsx)(Qe.a,{}),Object(Se.jsx)(Ye.a,{onRowClick:this.onRowClick})]});return Object(Se.jsxs)("div",{children:[Object(Se.jsxs)(K.a,{variant:K.b.light,children:[Object(Se.jsxs)(W.a,{children:[Object(Se.jsx)(J.a,{component:"h1",children:"Articles"}),Object(Se.jsx)(J.a,{component:"p",children:"Shows every listed article."})]}),Object(Se.jsx)(Q.a,{id:"toolbar",children:Object(Se.jsx)(Y.a,{children:p})})]}),Object(Se.jsx)(K.a,{children:Object(Se.jsx)(qe.a,{isExpanded:i,isInline:!0,onExpand:this.onExpand,children:Object(Se.jsx)(_e.a,{panelContent:j,children:Object(Se.jsx)(He.a,{children:g})})})})]})}}]),a}(r.Component),tt=a(468),at=Ze.a.create({baseURL:"http://localhost:8080/customer"}),rt=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).getLength=function(){at.get("/length").then((function(e){r.setState({length:e.data})}))},r.fetch=function(e,t){var a={page:e,size:t};at.get("/paginated",{params:a}).then((function(e){r.setState({customers:e.data})}))},r.post=function(){at.post("/",{first_name:r.state.customerFirstNameValue,last_name:r.state.customerLastNameValue,username:r.state.customerUsernameValue,password:r.state.customerPasswordValue,dob:r.state.customerDobValue,gender:r.state.customerGenderDrawerValue}),r.setState({isExpanded:!1,customerFirstNameValue:"",customerLastNameValue:"",customerUsernameValue:"",customerPasswordValue:"",page:"0",perPage:"10",customerGenderDrawerValue:void 0,customerIdValue:void 0,customerDobValue:void 0})},r.update=function(){at.put("/"+r.state.customerIdValue,{first_name:r.state.customerFirstNameValue,last_name:r.state.customerLastNameValue,username:r.state.customerUsernameValue,password:r.state.customerPasswordValue,dob:r.state.customerDobValue,gender:r.state.customerGenderDrawerValue}),r.setState({isExpanded:!1,customerFirstNameValue:"",customerLastNameValue:"",customerUsernameValue:"",customerPasswordValue:"",page:"0",perPage:"10",customerGenderDrawerValue:void 0,customerIdValue:void 0,customerDobValue:void 0})},r.delete=function(){at.delete("/"+r.state.customerIdValue),r.setState({isExpanded:!1,customerFirstNameValue:"",customerLastNameValue:"",customerUsernameValue:"",customerPasswordValue:"",page:"0",perPage:"10",customerGenderDrawerValue:void 0,customerIdValue:void 0,customerDobValue:void 0})},r.search=function(){var e={search:r.state.searchValue,filter:r.state.genderSelected};at.get("/search",{params:e}).then((function(e){r.setState({customers:e.data})}))},r.deleteSearch=function(){r.setState({searchValue:""}),r.fetch(r.state.page,r.state.perPage)},r.getLength(),r.state={customers:[],columns:[{title:"First Name",transforms:[Ke.a]},{title:"Last Name",transforms:[Ke.a]},{title:"Username",transforms:[Ke.a]},{title:"Date of birth",transforms:[Ke.a]},{title:"Gender",transforms:[Ke.a]}],sortBy:{},page:"0",perPage:"10",length:0,isExpanded:!1,drawerEdit:!1,searchValue:"",genderIsExpanded:!1,genderSelected:null,customerIdValue:void 0,customerFirstNameValue:"",customerLastNameValue:"",customerUsernameValue:"",customerPasswordValue:"",customerDobValue:void 0,customerGenderDrawerValue:void 0},r.drawerRef=s.a.createRef(),r.onSort=r.onSort.bind(Object(p.a)(r)),r.onRowClick=r.onRowClick.bind(Object(p.a)(r)),r.handleCustomerFirstNameChange=function(e){r.setState({customerFirstNameValue:e})},r.handleCustomerLastNameChange=function(e){r.setState({customerLastNameValue:e})},r.handleCustomerUsernameChange=function(e){r.setState({customerUsernameValue:e})},r.handleCustomerPasswordChange=function(e){r.setState({customerPasswordValue:e})},r.handleCustomerDobChange=function(e){console.log(e),r.setState({customerDobValue:e})},r.handleCustomerGenderChange=function(e){r.setState({customerGenderDrawerValue:e})},r.genderDrawerOptions=[{value:void 0,label:"Please Choose",disabled:!1},{value:0,label:"Male",disabled:!1},{value:1,label:"Female",disabled:!1},{value:2,label:"Diverse",disabled:!1}],r.genderSelectOptions=[{value:"Gender",disabled:!1,isPlaceholder:!0},{value:"Male",disabled:!1},{value:"Female",disabled:!1},{value:"Diverse",disabled:!1}],r.onSetPage=function(e,t){r.fetch(t-1,r.state.perPage),r.setState({page:t})},r.onPerPageSelect=function(e,t){r.setState({perPage:t}),r.fetch(0,t)},r.onExpand=function(){r.drawerRef.current&&r.drawerRef.current.focus()},r.onClickAddCustomer=function(){var e=!r.state.isExpanded;r.setState({drawerEdit:!1,isExpanded:e})},r.onCloseClick=function(){r.setState({isExpanded:!1,customerFirstNameValue:"",customerLastNameValue:"",customerUsernameValue:"",customerPasswordValue:"",customerGenderDrawerValue:void 0})},r.onSearchValueChange=function(e){r.setState({searchValue:e})},r.onGenderToggle=function(e){r.setState({genderIsExpanded:e})},r.onGenderSelect=function(e,t,a){a&&r.clearGenderSelection(),r.setState({genderSelected:t,genderIsExpanded:!1},(function(){this.search()}))},r.clearGenderSelection=function(){r.setState({genderSelected:null,genderIsExpanded:!1}),r.fetch(r.state.page,r.state.perPageParameter)},r}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.fetch("0","10")}},{key:"onSort",value:function(e,t,a){var r=this.state.customers.sort((function(e,a){return e[t]<a[t]?-1:e[t]>a[t]?1:0}));this.setState({sortBy:{index:t,direction:a},customers:a===We.a.asc?r:r.reverse()})}},{key:"onRowClick",value:function(e,t){var a=this.state.customers[t.secretTableRowKeyId];switch(a.gender){case"MALE":this.setState({customerGenderDrawerValue:0});break;case"FEMALE":this.setState({customerGenderDrawerValue:1});break;case"DIVERSE":this.setState({customerGenderDrawerValue:2});break;default:this.setState({customerGenderDrawerValue:void 0})}this.setState({drawerEdit:!0,isExpanded:!0,customerFirstNameValue:a.first_name,customerLastNameValue:a.last_name,customerUsernameValue:a.username,customerPasswordValue:a.password,customerDobValue:a.dob,customerIdValue:a.id})}},{key:"render",value:function(){var e,t=this.state,a=t.columns,r=t.customers,n=t.sortBy,i=t.isExpanded,l=t.customerFirstNameValue,o=t.customerLastNameValue,c=t.customerUsernameValue,d=t.customerPasswordValue,u=t.customerDobValue,h=t.customerGenderDrawerValue,p=t.drawerEdit,b=t.genderIsExpanded,j=t.genderSelected;e=p?Object(Se.jsxs)("div",{children:[Object(Se.jsx)(k.a,{variant:"primary",onClick:this.update,children:"Edit customer"}),Object(Se.jsx)(k.a,{variant:"danger",onClick:this.delete,id:"deleteButton",children:"Delete customer"})]}):Object(Se.jsx)(k.a,{variant:"primary",onClick:this.post,children:"Add customer"});var g=Object(Se.jsxs)(s.a.Fragment,{children:[Object(Se.jsx)(D.a,{children:Object(Se.jsxs)(ke.a,{children:[Object(Se.jsx)(Ee.a,{name:"textInput1",id:"textInput1",type:"search","aria-label":"search input example",onChange:this.onSearchValueChange,value:this.state.searchValue}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"search button for search input",onClick:this.search,children:Object(Se.jsx)(De.a,{})}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"delete button for search input",onClick:this.deleteSearch,children:Object(Se.jsx)(Ie.a,{})})]})}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(C.a,{variant:Ne.e.single,"aria-label":"Select Input",onToggle:this.onGenderToggle,onSelect:this.onGenderSelect,selections:j,isOpen:b,children:this.genderSelectOptions.map((function(e,t){return Object(Se.jsx)(v.a,{isDisabled:e.disabled,isPlaceholder:e.isPlaceholder,value:e.value},t)}))})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(k.a,{variant:"primary",onClick:this.onClickAddCustomer,children:"Add Customer"})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(m.a,{id:"pagination",itemCount:this.state.length,widgetId:"pagination-options-menu-top",perPage:this.state.perPage,page:this.state.page,variant:m.b.top,onSetPage:this.onSetPage,onPerPageSelect:this.onPerPageSelect,isCompact:!0})})]}),O=Object(Se.jsxs)(Ae.a,{isHorizontal:!0,children:[Object(Se.jsx)(Re.a,{label:"First Name",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:l,isRequired:!0,type:"text",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleCustomerFirstNameChange})}),Object(Se.jsx)(Re.a,{label:"Last Name",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:o,isRequired:!0,type:"text",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleCustomerLastNameChange})}),Object(Se.jsx)(Re.a,{label:"Username",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:c,isRequired:!0,type:"text",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleCustomerUsernameChange})}),Object(Se.jsx)(Re.a,{label:"Password",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:d,isRequired:!0,type:"password",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleCustomerPasswordChange})}),Object(Se.jsx)(Re.a,{label:"Date of birth",children:Object(Se.jsx)(tt.a,{value:u,onChange:this.handleCustomerDobChange})}),Object(Se.jsx)(Re.a,{label:"Gender",fieldId:"horizontal-form-category",children:Object(Se.jsx)(Le.a,{value:h,isRequired:!0,onChange:this.handleCustomerGenderChange,id:"horzontal-form-category",name:"horizontal-form-category",children:this.genderDrawerOptions.map((function(e,t){return Object(Se.jsx)(Te.a,{isDisabled:e.disabled,value:e.value,label:e.label},t)}))})}),Object(Se.jsx)(Fe.a,{children:e})]}),f=Object(Se.jsx)(Ge.a,{children:Object(Se.jsxs)(Be.a,{children:[Object(Se.jsx)("span",{tabIndex:i?0:-1,ref:this.drawerRef,children:O}),Object(Se.jsx)(Ue.a,{children:Object(Se.jsx)(Me.a,{onClick:this.onCloseClick})})]})}),x=Object(Se.jsxs)(Je.a,{"aria-label":"Sortable Table",sortBy:n,onSort:this.onSort,cells:a,rows:r.map((function(e,t){return[e.first_name,e.last_name,e.username,e.dob,e.gender]})),children:[Object(Se.jsx)(Qe.a,{}),Object(Se.jsx)(Ye.a,{onRowClick:this.onRowClick})]});return Object(Se.jsxs)("div",{children:[Object(Se.jsxs)(K.a,{variant:K.b.light,children:[Object(Se.jsxs)(W.a,{children:[Object(Se.jsx)(J.a,{component:"h1",children:"Customers"}),Object(Se.jsx)(J.a,{component:"p",children:"Shows every listed customer."})]}),Object(Se.jsx)(Q.a,{id:"toolbar",children:Object(Se.jsx)(Y.a,{children:g})})]}),Object(Se.jsx)(K.a,{children:Object(Se.jsx)(qe.a,{isExpanded:i,isInline:!0,onExpand:this.onExpand,children:Object(Se.jsx)(_e.a,{panelContent:f,children:Object(Se.jsx)(He.a,{children:x})})})})]})}}]),a}(r.Component),st=Ze.a.create({baseURL:"http://localhost:8080/order"}),nt=Ze.a.create({baseURL:"http://localhost:8080/article"}),it=Ze.a.create({baseURL:"http://localhost:8080/customer"}),lt=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).getLength=function(){st.get("/length").then((function(e){r.setState({length:e.data})}))},r.getCustomers=function(){it.get("/").then((function(e){r.setState({customers:e.data})}))},r.getArticles=function(){nt.get("/").then((function(e){r.setState({articles:e.data})}))},r.fetch=function(e,t){var a={page:e,size:t};st.get("/paginated",{params:a}).then((function(e){r.setState({orders:e.data})}))},r.post=function(){var e=r.state.orderArticleValue.map((function(e){return r.state.articles.find((function(t){return t.name===e}))})).map((function(e){return{id:e.id}}));console.log(e),st.post("/",{shipping:r.state.orderShippingDrawerValue,notes:r.state.orderNotesValue,status:r.state.orderStatusDrawerValue,customer:{id:r.state.orderCustomerValue},articles:e}),r.setState({isExpanded:!1,orderNotesValue:"",orderCustomerValue:void 0,orderArticleValue:[],page:"0",perPage:"10",orderShippingDrawerValue:void 0,orderIdValue:void 0,orderStatusDrawerValue:void 0})},r.update=function(){console.log(r.state.orderShippingDrawerValue,r.state.orderNotesValue,r.state.orderStatusDrawerValue,r.state.orderCustomerValue,r.state.orderArticleValue),st.put("/"+r.state.orderIdValue,{shipping:r.state.orderShippingDrawerValue,notes:r.state.orderNotesValue,status:r.state.orderStatusDrawerValue,customer:{id:r.state.orderCustomerValue},articles:[{id:r.state.orderArticleValue}]}),r.setState({isExpanded:!1,orderNotesValue:"",orderCustomerValue:"",orderArticleValue:[],page:"0",perPage:"10",orderShippingDrawerValue:void 0,orderIdValue:void 0,orderStatusDrawerValue:void 0})},r.delete=function(){st.delete("/"+r.state.orderIdValue),r.setState({isExpanded:!1,orderNotesValue:"",orderCustomerValue:"",orderArticleValue:[],page:"0",perPage:"10",orderShippingDrawerValue:void 0,orderIdValue:void 0,orderStatusDrawerValue:void 0})},r.search=function(){var e={search:r.state.searchValue,statusFilter:r.state.statusSelected,shippingFilter:r.state.shippingSelected};st.get("/search",{params:e}).then((function(e){r.setState({orders:e.data})}))},r.deleteSearch=function(){r.setState({searchValue:""}),r.fetch(r.state.page,r.state.perPage)},r.getLength(),r.getCustomers(),r.getArticles(),r.state={orders:[],articles:[],customers:[],columns:[{title:"Shipping",transforms:[Ke.a]},{title:"Notes",transforms:[Ke.a]},{title:"Status",transforms:[Ke.a]},{title:"Customer",transforms:[Ke.a]},{title:"Articles",transforms:[Ke.a]}],orderArticleValue:[],sortBy:{},page:"0",perPage:"10",length:0,isExpanded:!1,drawerEdit:!1,searchValue:"",statusIsExpanded:!1,statusSelected:null,shippingIsExpanded:!1,shippingSelected:null,isOpenOrderArticles:!1,orderIdValue:void 0,orderNotesValue:"",orderShippingDrawerValue:void 0,orderStatusDrawerValue:void 0,orderCustomerValue:void 0},r.drawerRef=s.a.createRef(),r.onSort=r.onSort.bind(Object(p.a)(r)),r.onRowClick=r.onRowClick.bind(Object(p.a)(r)),r.handleOrderNotesChange=function(e){r.setState({orderNotesValue:e})},r.handleOrderShippingChange=function(e){r.setState({orderShippingDrawerValue:e})},r.handleOrderStatusChange=function(e){r.setState({orderStatusDrawerValue:e})},r.handleOrderCustomerChange=function(e){r.setState({orderCustomerValue:e})},r.onToggleOrderArticles=function(e){console.log(r.state.orderArticleValue),r.setState({isOpenOrderArticles:e})},r.onSelectOrderArticles=function(e,t){r.state.orderArticleValue.includes(t)?r.setState((function(e){return{orderArticleValue:e.orderArticleValue.filter((function(e){return e!==t}))}}),(function(){return console.log("selections: ",r.state.orderArticleValue)})):r.setState((function(e){return{orderArticleValue:[].concat(Object(o.a)(e.orderArticleValue),[t])}}),(function(){return console.log("selections: ",r.state.orderArticleValue)}))},r.clearSelectionOrderArticles=function(){r.setState({orderArticleValue:[],isOpenOrderArticles:!1})},r.statusDrawerOptions=[{value:void 0,label:"Please Choose",disabled:!1},{value:0,label:"In Progress",disabled:!1},{value:1,label:"Delivering",disabled:!1},{value:2,label:"Delivered",disabled:!1}],r.statusSelectOptions=[{value:"Status",disabled:!1,isPlaceholder:!0},{value:"In Progress",disabled:!1},{value:"Delivering",disabled:!1},{value:"Delivered",disabled:!1}],r.shippingDrawerOptions=[{value:void 0,label:"Please Choose",disabled:!1},{value:0,label:"DHL",disabled:!1},{value:1,label:"Hermes",disabled:!1},{value:2,label:"DPD",disabled:!1}],r.shippingSelectOptions=[{value:"Shipping",disabled:!1,isPlaceholder:!0},{value:"DHL",disabled:!1},{value:"Hermes",disabled:!1},{value:"DPD",disabled:!1}],r.onSetPage=function(e,t){r.fetch(t-1,r.state.perPage),r.setState({page:t})},r.onPerPageSelect=function(e,t){r.setState({perPage:t}),r.fetch(0,t)},r.onExpand=function(){r.drawerRef.current&&r.drawerRef.current.focus()},r.onClickAddOrder=function(){var e=!r.state.isExpanded;r.setState({drawerEdit:!1,isExpanded:e})},r.onCloseClick=function(){r.setState({isExpanded:!1,orderNotesValue:"",orderArticleValue:[],orderCustomerValue:void 0,orderShippingDrawerValue:void 0,orderStatusDrawerValue:void 0})},r.onSearchValueChange=function(e){r.setState({searchValue:e})},r.onShippingToggle=function(e){r.setState({shippingIsExpanded:e})},r.onShippingSelect=function(e,t,a){a&&r.clearShippingSelection(),r.setState({shippingSelected:t,shippingIsExpanded:!1},(function(){this.search()}))},r.clearShippingSelection=function(){r.setState({shippingSelected:null,shippingIsExpanded:!1}),r.fetch(r.state.page,r.state.perPageParameter)},r.onStatusToggle=function(e){r.setState({statusIsExpanded:e})},r.onStatusSelect=function(e,t,a){a&&r.clearStatusSelection(),r.setState({statusSelected:t,statusIsExpanded:!1},(function(){this.search()}))},r.clearStatusSelection=function(){r.setState({statusSelected:null,statusIsExpanded:!1}),r.fetch(r.state.page,r.state.perPageParameter)},r}return Object(h.a)(a,[{key:"componentDidMount",value:function(){this.fetch("0","10")}},{key:"onSort",value:function(e,t,a){var r=this.state.customers.sort((function(e,a){return e[t]<a[t]?-1:e[t]>a[t]?1:0}));this.setState({sortBy:{index:t,direction:a},customers:a===We.a.asc?r:r.reverse()})}},{key:"onRowClick",value:function(e,t){var a=this.state.orders[t.secretTableRowKeyId];switch(a.status){case"INPROGRESS":this.setState({orderStatusDrawerValue:0});break;case"DELIVERING":this.setState({orderStatusDrawerValue:1});break;case"DELIVERED":this.setState({orderStatusDrawerValue:2});break;default:this.setState({orderStatusDrawerValue:void 0})}switch(a.shipping){case"DHL":this.setState({orderShippingDrawerValue:0});break;case"HERMES":this.setState({orderShippingDrawerValue:1});break;case"DPD":this.setState({orderShippingDrawerValue:2});break;default:this.setState({orderShippingDrawerValue:void 0})}this.setState({drawerEdit:!0,isExpanded:!0,orderNotesValue:a.notes,orderCustomerValue:a.customer.id,orderArticleValue:a.articles.map((function(e){return e.name})),orderIdValue:a.id})}},{key:"render",value:function(){var e,t=this.state,a=t.columns,r=t.orders,n=t.sortBy,i=t.isExpanded,l=t.orderNotesValue,o=t.orderShippingDrawerValue,d=t.orderStatusDrawerValue,u=t.orderCustomerValue,h=t.orderArticleValue,p=t.drawerEdit,b=t.shippingIsExpanded,j=t.shippingSelected,g=t.statusIsExpanded,O=t.statusSelected,f=t.isOpenOrderArticles;e=p?Object(Se.jsxs)("div",{children:[Object(Se.jsx)(k.a,{variant:"primary",onClick:this.update,children:"Edit order"}),Object(Se.jsx)(k.a,{variant:"danger",onClick:this.delete,id:"deleteButton",children:"Delete order"})]}):Object(Se.jsx)(k.a,{variant:"primary",onClick:this.post,children:"Add order"});var x=this.state.customers.map((function(e){var t={};return t.value=e.id,t.label=e.first_name.concat(" ",e.last_name),t})),S=this.state.articles.map((function(e){var t={};return t.id=e.id,t.value=e.name,t.description=e.description,t.disabled=!1,t})),V=Object(Se.jsxs)(s.a.Fragment,{children:[Object(Se.jsx)(D.a,{children:Object(Se.jsxs)(ke.a,{children:[Object(Se.jsx)(Ee.a,{name:"textInput1",id:"textInput1",type:"search","aria-label":"search input example",onChange:this.onSearchValueChange,value:this.state.searchValue}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"search button for search input",onClick:this.search,children:Object(Se.jsx)(De.a,{})}),Object(Se.jsx)(k.a,{variant:k.b.control,"aria-label":"delete button for search input",onClick:this.deleteSearch,children:Object(Se.jsx)(Ie.a,{})})]})}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(C.a,{variant:Ne.e.single,"aria-label":"Select Input",onToggle:this.onStatusToggle,onSelect:this.onStatusSelect,selections:O,isOpen:g,children:this.statusSelectOptions.map((function(e,t){return Object(Se.jsx)(v.a,{isDisabled:e.disabled,isPlaceholder:e.isPlaceholder,value:e.value},t)}))})}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(C.a,{variant:Ne.e.single,"aria-label":"Select Input",onToggle:this.onShippingToggle,onSelect:this.onShippingSelect,selections:j,isOpen:b,children:this.shippingSelectOptions.map((function(e,t){return Object(Se.jsx)(v.a,{isDisabled:e.disabled,isPlaceholder:e.isPlaceholder,value:e.value},t)}))})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(k.a,{variant:"primary",onClick:this.onClickAddOrder,children:"Add Order"})}),Object(Se.jsx)(D.a,{variant:"separator"}),Object(Se.jsx)(D.a,{children:Object(Se.jsx)(m.a,{id:"pagination",itemCount:this.state.length,widgetId:"pagination-options-menu-top",perPage:this.state.perPage,page:this.state.page,variant:m.b.top,onSetPage:this.onSetPage,onPerPageSelect:this.onPerPageSelect,isCompact:!0})})]}),w=Object(Se.jsxs)(Ae.a,{isHorizontal:!0,children:[Object(Se.jsx)(Re.a,{label:"Notes",isRequired:!0,fieldId:"horizontal-form-name",children:Object(Se.jsx)(Ee.a,{value:l,isRequired:!0,type:"text",id:"horizontal-form-name","aria-describedby":"horizontal-form-name-helper",name:"horizontal-form-name",onChange:this.handleOrderNotesChange})}),Object(Se.jsx)(Re.a,{label:"Shipping",fieldId:"horizontal-form-category",children:Object(Se.jsx)(Le.a,{value:o,isRequired:!0,onChange:this.handleOrderShippingChange,id:"horzontal-form-category",name:"horizontal-form-category",children:this.shippingDrawerOptions.map((function(e,t){return Object(Se.jsx)(Te.a,{isDisabled:e.disabled,value:e.value,label:e.label},t)}))})}),Object(Se.jsx)(Re.a,{label:"Status",fieldId:"horizontal-form-category",children:Object(Se.jsx)(Le.a,{value:d,isRequired:!0,onChange:this.handleOrderStatusChange,id:"horzontal-form-category",name:"horizontal-form-category",children:this.statusDrawerOptions.map((function(e,t){return Object(Se.jsx)(Te.a,{isDisabled:e.disabled,value:e.value,label:e.label},t)}))})}),Object(Se.jsx)(Re.a,{label:"Customer",fieldId:"horizontal-form-customer",children:Object(Se.jsx)(Le.a,{value:u,isRequired:!0,onChange:this.handleOrderCustomerChange,id:"horzontal-form-customer",name:"horizontal-form-customer",children:x.map((function(e,t){return Object(Se.jsx)(Te.a,{isDisabled:e.disabled,value:e.value,label:e.label},t)}))})}),Object(Se.jsx)(Re.a,{children:Object(Se.jsx)(C.a,{variant:Ne.e.typeaheadMulti,typeAheadAriaLabel:"Select articles",onToggle:this.onToggleOrderArticles,onSelect:this.onSelectOrderArticles,onClear:this.clearSelectionOrderArticles,selections:h,isOpen:f,"aria-labelledby":"multi-typeahead-select-id-1",placeholderText:"Select articles",children:S.map((function(e,t){return Object(Se.jsx)(v.a,Object(c.a)({isDisabled:e.disabled,value:e.value},e.description&&{description:e.description}),e.id)}))})}),Object(Se.jsx)(Fe.a,{children:e})]}),y=Object(Se.jsx)(Ge.a,{children:Object(Se.jsxs)(Be.a,{children:[Object(Se.jsx)("span",{tabIndex:i?0:-1,ref:this.drawerRef,children:w}),Object(Se.jsx)(Ue.a,{children:Object(Se.jsx)(Me.a,{onClick:this.onCloseClick})})]})}),P=Object(Se.jsxs)(Je.a,{"aria-label":"Sortable Table",sortBy:n,onSort:this.onSort,cells:a,rows:r.map((function(e,t){return[e.shipping,e.notes,e.status,e.customer.first_name.concat(" ",e.customer.last_name),e.articles.map((function(e){return e.name})).join(", ")]})),children:[Object(Se.jsx)(Qe.a,{}),Object(Se.jsx)(Ye.a,{onRowClick:this.onRowClick})]});return Object(Se.jsxs)("div",{children:[Object(Se.jsxs)(K.a,{variant:K.b.light,children:[Object(Se.jsxs)(W.a,{children:[Object(Se.jsx)(J.a,{component:"h1",children:"Orders"}),Object(Se.jsx)(J.a,{component:"p",children:"Shows every listed order."})]}),Object(Se.jsx)(Q.a,{id:"toolbar",children:Object(Se.jsx)(Y.a,{children:V})})]}),Object(Se.jsx)(K.a,{children:Object(Se.jsx)(qe.a,{isExpanded:i,isInline:!0,onExpand:this.onExpand,children:Object(Se.jsx)(_e.a,{panelContent:y,children:Object(Se.jsx)(He.a,{children:P})})})})]})}}]),a}(r.Component),ot=a(69),ct=a(238),dt=a.n(ct),ut=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={isNavOpen:!1},r.onNavToggle=function(){r.setState({isNavOpen:!r.state.isNavOpen})},r}return Object(h.a)(a,[{key:"render",value:function(){var e=this.state.isNavOpen,t=Object(Se.jsx)(U.a,{logo:Object(Se.jsx)(ve.b,{to:"/",className:"webshopLink",children:"Webshop"}),headerTools:Object(Se.jsxs)(T.a,{children:[Object(Se.jsx)(ot.a,{position:"left",enableFlip:!1,content:Object(Se.jsxs)("div",{className:"pageHeaderTools",children:["This feature has not yet been implemented. However, Basic Auth by directly calling the API is already possible. Comment the security-related lines in the application.properties and Customer.java file and you are ready to go!"," "]}),children:Object(Se.jsx)("span",{"aria-label":"tooltip",className:"tooltip",tabIndex:"0",children:Object(Se.jsx)(dt.a,{})})}),"Sign-In"]}),showNavToggle:!0,isNavOpen:e,onNavToggle:this.onNavToggle}),a=Object(Se.jsx)(q.a,{nav:Object(Se.jsx)(Ve,{}),isNavOpen:e});return Object(Se.jsx)(ve.a,{children:Object(Se.jsx)(H.a,{header:t,sidebar:a,id:"page",children:Object(Se.jsxs)(Ce.c,{children:[Object(Se.jsx)(Ce.a,{path:"/",exact:!0,component:we}),Object(Se.jsx)(Ce.a,{path:"/customers",component:rt}),Object(Se.jsx)(Ce.a,{path:"/orders",component:lt}),Object(Se.jsx)(Ce.a,{path:"/articles",component:et})]})})})}}]),a}(s.a.Component);var ht=function(){return Object(Se.jsx)("div",{className:"App",children:Object(Se.jsx)(ut,{})})},pt=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,477)).then((function(t){var a=t.getCLS,r=t.getFID,s=t.getFCP,n=t.getLCP,i=t.getTTFB;a(e),r(e),s(e),n(e),i(e)}))};i.a.render(Object(Se.jsx)(s.a.StrictMode,{children:Object(Se.jsx)(ht,{})}),document.getElementById("root")),pt()}},[[410,1,2]]]);
//# sourceMappingURL=main.94862d0e.chunk.js.map