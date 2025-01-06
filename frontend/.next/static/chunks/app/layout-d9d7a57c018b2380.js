(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{270:function(e,r,t){Promise.resolve().then(t.bind(t,481)),Promise.resolve().then(t.bind(t,1066)),Promise.resolve().then(t.t.bind(t,1e3,23)),Promise.resolve().then(t.t.bind(t,2445,23))},481:function(e,r,t){"use strict";t.r(r),t.d(r,{Providers:function(){return i}});var a=t(7437),n=t(3046),o=t(9686),s=t(2782);let l=(0,o.xC)({reducer:{prompt:s.ZP}});function i(e){let{children:r}=e;return(0,a.jsx)(n.zt,{store:l,children:r})}},1066:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return s}});var a=t(7437),n=t(2265);/**
 * @license lucide-react v0.303.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=(0,t(2898).Z)("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);class s extends n.Component{static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,r){console.error("Uncaught error:",e,r)}render(){if(this.state.hasError){var e;return(0,a.jsx)("div",{className:"flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8",children:(0,a.jsxs)("div",{className:"rounded-lg bg-gray-800 p-8 text-center",children:[(0,a.jsx)(o,{className:"mx-auto mb-4 h-12 w-12 text-red-500"}),(0,a.jsx)("h2",{className:"mb-2 font-mono text-xl font-bold text-white",children:"Bir Hata Oluştu"}),(0,a.jsx)("p",{className:"mb-4 font-mono text-sm text-gray-400",children:(null===(e=this.state.error)||void 0===e?void 0:e.message)||"Beklenmeyen bir hata oluştu."}),(0,a.jsx)("button",{onClick:()=>window.location.reload(),className:"rounded-lg bg-red-600 px-4 py-2 font-mono text-sm font-semibold text-white transition-colors hover:bg-red-700",children:"Sayfayı Yenile"})]})})}return this.props.children}constructor(...e){super(...e),this.state={hasError:!1,error:null}}}},2782:function(e,r,t){"use strict";t.d(r,{ZP:function(){return m},ni:function(){return i}});var a=t(9686),n=t(4829),o=t(2601);let s=n.Z.create({baseURL:o.env.NEXT_PUBLIC_API_URL||"http://localhost:5000/api"}),l=(0,a.hg)("prompt/create",async e=>await (async e=>(await s.post("/prompts",e)).data)(e)),i=(0,a.hg)("prompt/getAll",async()=>await (async()=>(await s.get("/prompts")).data)()),d=(0,a.hg)("prompt/getById",async e=>await (async e=>(await s.get("/prompts/".concat(e))).data)(e)),c=(0,a.oM)({name:"prompt",initialState:{prompts:[],currentPrompt:null,loading:!1,error:null},reducers:{clearError:e=>{e.error=null},clearCurrentPrompt:e=>{e.currentPrompt=null}},extraReducers:e=>{e.addCase(l.pending,e=>{e.loading=!0,e.error=null}).addCase(l.fulfilled,(e,r)=>{e.loading=!1,e.currentPrompt=r.payload,e.prompts.push(r.payload)}).addCase(l.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Bir hata oluştu"}).addCase(i.pending,e=>{e.loading=!0,e.error=null}).addCase(i.fulfilled,(e,r)=>{e.loading=!1,e.prompts=r.payload}).addCase(i.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Bir hata oluştu"}).addCase(d.pending,e=>{e.loading=!0,e.error=null}).addCase(d.fulfilled,(e,r)=>{e.loading=!1,e.currentPrompt=r.payload}).addCase(d.rejected,(e,r)=>{e.loading=!1,e.error=r.error.message||"Bir hata oluştu"})}}),{clearError:u,clearCurrentPrompt:p}=c.actions;var m=c.reducer},2445:function(){},1e3:function(e){e.exports={style:{fontFamily:"'__Fira_Code_74c79e', '__Fira_Code_Fallback_74c79e'",fontStyle:"normal"},className:"__className_74c79e",variable:"__variable_74c79e"}}},function(e){e.O(0,[436,971,938,744],function(){return e(e.s=270)}),_N_E=e.O()}]);