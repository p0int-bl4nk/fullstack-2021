(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(15),c=n.n(r),o=n(2),i=n(3),a=n(4),s=n.n(a),u="/api/persons",l={getAll:function(){return s.a.get("".concat(u)).then((function(e){return e.data}))},update:function(e,t){return s.a.put("".concat(u,"/").concat(e),t).then((function(e){return e.data}))},create:function(e){return s.a.post("".concat(u),e).then((function(e){return e.data}))},deletePerson:function(e){return s.a.delete("".concat(u,"/").concat(e))}},d=n(0);function f(e){var t=e.message,n=e.type;return t?Object(d.jsx)("div",{className:"error"===n?"error":"success",children:t}):null}var b={handleNotification:function(e,t){t(e),setTimeout((function(){return t({message:"",type:""})}),5e3)}},j=function(e){var t=e.list,n=e.setList,r=e.setNotification;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h3",{children:"Numbers"}),t.map((function(e){return Object(d.jsxs)("div",{children:[Object(d.jsx)(h,{name:e.name,number:e.number}),Object(d.jsx)("button",{type:"button",onClick:function(){return function(e){var c=t.find((function(t){return t.id===e}));window.confirm("Delete '".concat(c.name,"'?"))&&l.deletePerson(e).then((function(){n(t.filter((function(t){return t.id!==e}))),b.handleNotification({message:"'".concat(c.name,"' has been deleted."),type:"success"},r)})).catch((function(o){console.log("delete service error:",o),b.handleNotification({message:"'".concat(c.name,"' has already been removed from the server."),type:"error"},r),n(t.filter((function(t){return t.id!==e})))}))}(e.id)},children:"Delete"})]},e.id)}))]})},h=function(e){var t=e.name,n=e.number;return Object(d.jsxs)("p",{children:[t," ",n]})},m=function(e){var t=e.list,n=e.setList,r=e.setNotification,c=Object(o.useState)(""),a=Object(i.a)(c,2),s=a[0],u=a[1],f=Object(o.useState)(""),j=Object(i.a)(f,2),h=j[0],m=j[1];return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("h3",{children:"Add a new number"}),Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=t.find((function(e){return e.name===s})),o="add";c&&(o=window.confirm("'".concat(s,"' is already added to the phonebook. Do you want to replace the old number with the new one?"))?"update":"discard");var i={name:s,number:h};if("add"===o)l.create(i).then((function(e){n((function(t){return t.concat(e)})),b.handleNotification({message:"'".concat(s,"' is successfully added to the phonebook."),type:"success"},r)})).catch((function(e){return console.log("create service error:",e)}));else{if("update"!==o)return;l.update(c.id,i).then((function(e){n((function(t){return t.map((function(t){return t.id===c.id?e:t}))})),b.handleNotification({message:"".concat(s,"'s number is successfully updated."),type:"success"},r)})).catch((function(e){return console.log("update service error:",e)}))}u(""),m("")},children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{htmlFor:"name",children:"Name:"}),Object(d.jsx)("input",{name:"name",value:s,onChange:function(e){var t=e.target;return u(t.value)}})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("label",{htmlFor:"number",children:"Number:"}),Object(d.jsx)("input",{name:"number",value:h,onChange:function(e){var t=e.target;return m(t.value)}})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"Add"})})]})]})},p=function(e){var t=e.filter,n=e.setFilter;return Object(d.jsxs)("div",{children:["Filter shown with",Object(d.jsx)("input",{value:t,onChange:function(e){var t=e.target;return n(t.value)}})]})};function O(){var e=Object(o.useState)({message:"",type:""}),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)([]),a=Object(i.a)(c,2),s=a[0],u=a[1];Object(o.useEffect)((function(){l.getAll().then((function(e){u(e)})).catch((function(e){console.log("getAll api error",e),b.handleNotification({message:"Error fetching phonebook from server!",type:"error"},r)}))}),[]);var h=Object(o.useState)(""),O=Object(i.a)(h,2),v=O[0],g=O[1],x=v?s.filter((function(e){return e.name.toLowerCase().includes(v.toLowerCase())})):s;return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(f,{message:n.message,type:n.type}),Object(d.jsx)(p,{filter:v,setFilter:g}),Object(d.jsx)(m,{list:s,setList:u,setNotification:r}),Object(d.jsx)(j,{list:x,setList:u,setNotification:r})]})}var v=function(){return Object(d.jsx)(O,{})};n(40);c.a.render(Object(d.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.3a2aa2e6.chunk.js.map