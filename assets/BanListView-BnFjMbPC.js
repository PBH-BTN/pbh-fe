import{r as M,i as E,c as x,d as D,t as he,g as oe,a as be,b as ye,o as Pe,e as Se,f as t,S as ge,m as F,F as $e,h as Ce,j as ue,G,k as U,_ as we,l as C,n as B,p as j,q as te,s as T,u as _,v as b,w as Ie,x as Le,y as xe,z as ze,A as Me,B as Be,C as q,D as c,E as ke,H as de,I as ae,T as Re,J as je,K as Te,L as ve,M as De,N as He,O as Oe,P as Ve,Q as Ae,R as Ne}from"./index-Brvgr1eS.js";import{u as Ee,a as Fe,S as Ge,P as Ue,V as qe,E as me}from"./index-C4LYfHfZ.js";import{f as pe,I as Ke,a as Ye}from"./file-BvuNeUaI.js";const Je=(e,{emit:o})=>{var a,v;const n=M(E(e.paginationProps)&&(a=e.paginationProps.defaultCurrent)!=null?a:1),r=M(E(e.paginationProps)&&(v=e.paginationProps.defaultPageSize)!=null?v:10),$=x(()=>{var f;return E(e.paginationProps)&&(f=e.paginationProps.current)!=null?f:n.value}),w=x(()=>{var f;return E(e.paginationProps)&&(f=e.paginationProps.pageSize)!=null?f:r.value});return{current:$,pageSize:w,handlePageChange:f=>{n.value=f,o("pageChange",f)},handlePageSizeChange:f=>{r.value=f,o("pageSizeChange",f)}}};function fe(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!U(e)}var ne=D({name:"List",props:{data:{type:Array},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},split:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},hoverable:{type:Boolean,default:!1},paginationProps:{type:Object},gridProps:{type:Object},maxHeight:{type:[String,Number],default:0},bottomOffset:{type:Number,default:0},virtualListProps:{type:Object},scrollbar:{type:[Object,Boolean],default:!0}},emits:{scroll:()=>!0,reachBottom:()=>!0,pageChange:e=>!0,pageSizeChange:e=>!0},setup(e,{emit:o,slots:a}){const{scrollbar:v}=he(e),n=oe("list"),r=be(ye,void 0),{componentRef:$,elementRef:w}=Ee("containerRef"),i=x(()=>e.virtualListProps),{displayScrollbar:H,scrollbarProps:f}=Fe(v);let O=0;const k=l=>{const{scrollTop:u,scrollHeight:p,offsetHeight:g}=l.target,d=Math.floor(p-(u+g));u>O&&d<=e.bottomOffset&&o("reachBottom"),o("scroll"),O=u};Pe(()=>{if(w.value){const{scrollTop:l,scrollHeight:u,offsetHeight:p}=w.value;u<=l+p&&o("reachBottom")}});const{current:y,pageSize:s,handlePageChange:h,handlePageSizeChange:S}=Je(e,{emit:o}),P=l=>{if(!e.paginationProps)return l;if(e.paginationProps&&l.length>s.value){const u=(y.value-1)*s.value;return l.slice(u,u+s.value)}return l},R=l=>{let u;if(!e.gridProps)return null;const p=P(l);if(e.gridProps.span){const g=[],d=24/e.gridProps.span;for(let L=0;L<p.length;L+=d){let Z;const _e=L+d,re=Math.floor(L/d);g.push(t(G.Row,{key:re,class:`${n}-row`,gutter:e.gridProps.gutter},fe(Z=p.slice(L,_e).map((ee,se)=>{var ie;return t(G.Col,{key:`${re}-${se}`,class:`${n}-col`,span:(ie=e.gridProps)==null?void 0:ie.span},{default:()=>{var ce;return[U(ee)?ee:(ce=a.item)==null?void 0:ce.call(a,{item:ee,index:se})]}})}))?Z:{default:()=>[Z]}))}return g}return t(G.Row,{class:`${n}-row`,gutter:e.gridProps.gutter},fe(u=p.map((g,d)=>t(G.Col,F({key:d,class:`${n}-col`},ue(e.gridProps,["gutter"])),{default:()=>{var L;return[U(g)?g:(L=a.item)==null?void 0:L.call(a,{item:g,index:d})]}})))?u:{default:()=>[u]})},Y=l=>P(l).map((p,g)=>{var d;return U(p)?p:(d=a.item)==null?void 0:d.call(a,{item:p,index:g})}),I=()=>{const l=a.default?Ce(a.default()):e.data;return l&&l.length>0?e.gridProps?R(l):Y(l):N()},J=()=>{if(!e.paginationProps)return null;const l=ue(e.paginationProps,["current","pageSize","defaultCurrent","defaultPageSize"]);return t(Ue,F({class:`${n}-pagination`},l,{current:y.value,pageSize:s.value,onChange:h,onPageSizeChange:S}),null)},Q=x(()=>[n,`${n}-${e.size}`,{[`${n}-bordered`]:e.bordered,[`${n}-split`]:e.split,[`${n}-hover`]:e.hoverable}]),W=x(()=>{if(e.maxHeight)return{maxHeight:Se(e.maxHeight)?`${e.maxHeight}px`:e.maxHeight,overflowY:"auto"}}),V=x(()=>[`${n}-content`,{[`${n}-virtual`]:i.value}]),A=M(),X=()=>{var l;const u=P((l=e.data)!=null?l:[]);return u.length?t(qe,F({ref:A,class:V.value,data:u},e.virtualListProps,{onScroll:k}),{item:({item:p,index:g})=>{var d;return(d=a.item)==null?void 0:d.call(a,{item:p,index:g})}}):N()},m=()=>a["scroll-loading"]?t("div",{class:[`${n}-item`,`${n}-scroll-loading`]},[a["scroll-loading"]()]):null,N=()=>{var l,u,p,g,d;return a["scroll-loading"]?null:(d=(g=(l=a.empty)==null?void 0:l.call(a))!=null?g:(p=r==null?void 0:(u=r.slots).empty)==null?void 0:p.call(u,{component:"list"}))!=null?d:t(me,null,null)};return{virtualListRef:A,render:()=>{const l=H.value?Ge:"div";return t("div",{class:`${n}-wrapper`},[t(ge,{class:`${n}-spin`,loading:e.loading},{default:()=>[t(l,F({ref:$,class:Q.value,style:W.value},f.value,{onScroll:k}),{default:()=>[t("div",{class:`${n}-content-wrapper`},[a.header&&t("div",{class:`${n}-header`},[a.header()]),i.value&&!e.gridProps?t($e,null,[X(),m()]):t("div",{role:"list",class:V.value},[I(),m()]),a.footer&&t("div",{class:`${n}-footer`},[a.footer()])])]}),J()]})])}}},methods:{scrollIntoView(e){this.virtualListRef&&this.virtualListRef.scrollTo(e)}},render(){return this.render()}}),K=D({name:"ListItem",props:{actionLayout:{type:String,default:"horizontal"}},setup(e,{slots:o}){const a=oe("list-item"),v=()=>{var n;const r=(n=o.actions)==null?void 0:n.call(o);return!r||!r.length?null:t("ul",{class:`${a}-action`},[r.map(($,w)=>t("li",{key:`${a}-action-${w}`},[$]))])};return()=>{var n,r;return t("div",{role:"listitem",class:a},[t("div",{class:`${a}-main`},[(n=o.meta)==null?void 0:n.call(o),t("div",{class:`${a}-content`},[(r=o.default)==null?void 0:r.call(o)]),e.actionLayout==="vertical"&&v()]),e.actionLayout==="horizontal"&&v(),o.extra&&t("div",{class:`${a}-extra`},[o.extra()])])}}});const Qe=D({name:"ListItemMeta",props:{title:String,description:String},setup(e,{slots:o}){const a=oe("list-item-meta"),v=!!(e.title||e.description||o.title||o.description);return{prefixCls:a,hasContent:v}}});function We(e,o,a,v,n,r){return C(),B("div",{class:j(e.prefixCls)},[e.$slots.avatar?(C(),B("div",{key:0,class:j(`${e.prefixCls}-avatar`)},[te(e.$slots,"avatar")],2)):T("v-if",!0),e.hasContent?(C(),B("div",{key:1,class:j(`${e.prefixCls}-content`)},[e.$slots.title||e.title?(C(),B("div",{key:0,class:j(`${e.prefixCls}-title`)},[te(e.$slots,"title",{},()=>[_(b(e.title),1)])],2)):T("v-if",!0),e.$slots.description||e.description?(C(),B("div",{key:1,class:j(`${e.prefixCls}-description`)},[te(e.$slots,"description",{},()=>[_(b(e.description),1)])],2)):T("v-if",!0)],2)):T("v-if",!0)],2)}var le=we(Qe,[["render",We]]);const Xe=Object.assign(ne,{Item:Object.assign(K,{Meta:le}),install:(e,o)=>{Ie(e,o);const a=Le(o);e.component(a+ne.name,ne),e.component(a+K.name,K),e.component(a+le.name,le)}}),Ze=e=>(Oe("data-v-bc087b28"),e=e(),Ve(),e),et=Ze(()=>Ae("br",null,null,-1)),tt={key:0,style:{position:"absolute",transform:"translateY(-50%)"}},z=5,at=D({__name:"banList",setup(e){const o=M(),a=xe(),v=ze(),n=M(!1),r=M(5),$=M(!1);async function w(){var y;if(!i.value)return ae({limit:z});if(i.value.length>r.value-z){const s=[];let h=!1;for(;s.length<r.value&&!h;){const S=await ae({limit:z,lastBanTime:(y=s[s.length-1])==null?void 0:y.banMetadata.banAt});for(const P of S)if(P.banMetadata.randomId!==i.value[0].banMetadata.randomId)s.push(P);else{h=!0;break}}return h?(r.value=i.value.length+s.length,s.concat(i.value)):s}return i.value}const{data:i,refresh:H}=Me(w,{pollingInterval:x(()=>a.pollingInterval),onSuccess:a.renewLastUpdate}),f=y=>{var s,h;if(y){const S=(s=i.value)==null?void 0:s.map(P=>P.address).findIndex(P=>P.includes(y));S!==-1&&((h=o.value)==null||h.scrollIntoView({index:S,align:"auto"}))}},O=async()=>{var y;if(i.value){if(r.value=i.value.length+z,$.value=!0,n.value=!1,i.value.length<=r.value){const s=[];for(;s.length+i.value.length<r.value;){const h=await ae({limit:z,lastBanTime:(y=s[s.length-1]||i.value[i.value.length-1])==null?void 0:y.banMetadata.banAt});h.length<z&&(n.value=!0),s.push(...h)}i.value=i.value.concat(s)}setTimeout(()=>{$.value=!1},n.value?1e3:0)}};Be(()=>v.endpoint,()=>{r.value=z,i.value=void 0,H()},{immediate:!0});const k=x(()=>i.value??[]);return(y,s)=>{const h=Re,S=je,P=Te,R=ve,Y=me,I=De,J=Ke,Q=Ye,W=He,V=K,A=ge,X=Xe;return C(),q(R,{direction:"vertical",fill:""},{default:c(()=>[t(h,{heading:3},{default:c(()=>[_("封禁名单")]),_:1}),et,t(R,{class:"list-header",wrap:""},{default:c(()=>[t(S,null,{default:c(()=>[_("以下是封禁列表（按时间倒序排列）")]),_:1}),t(P,{style:{width:"250px"},placeholder:"搜索 IP 地址",onSearch:f,"allow-clear":"","search-button":""})]),_:1}),t(X,{virtualListProps:{height:500},ref_key:"banlist",ref:o,onReachBottom:O,scrollbar:!1,data:k.value},{empty:c(()=>[t(Y)]),item:c(({item:m,index:N})=>[t(V,{style:ke({marginBottom:N===k.value.length-1&&$.value?"50px":void 0})},{default:c(()=>[t(W,{column:{xs:1,md:2,xl:3}},{title:c(()=>[t(R,{wrap:""},{default:c(()=>[t(S,{bold:"",copyable:""},{default:c(()=>[_(b(m.banMetadata.peer.address.ip)+":"+b(m.banMetadata.peer.address.port),1)]),_:2},1024),t(S,{code:""},{default:c(()=>[_(b(m.banMetadata.peer.clientName),1)]),_:2},1024)]),_:2},1024)]),default:c(()=>[t(I,{label:"反向 DNS 解析",span:1},{default:c(()=>[_(b(m.banMetadata.reverseLookup),1)]),_:2},1024),t(I,{label:"封禁时间",span:1},{default:c(()=>[_(b(new Date(m.banMetadata.banAt).toLocaleString("zh-cn")),1)]),_:2},1024),t(I,{label:"预计解封时间",span:1},{default:c(()=>[_(b(new Date(m.banMetadata.unbanAt).toLocaleString("zh-cn")),1)]),_:2},1024),t(I,{label:"发现位置",span:2},{default:c(()=>[_(b(m.banMetadata.torrent.name),1)]),_:2},1024),t(I,{label:"封禁快照",span:1},{default:c(()=>[t(J,{class:"green"}),_(" "+b(de(pe)(m.banMetadata.peer.uploaded))+" ",1),t(Q,{class:"red"}),_(" "+b(de(pe)(m.banMetadata.peer.downloaded))+" - "+b((m.banMetadata.peer.progress*100).toFixed(2))+"% ",1)]),_:2},1024),t(I,{label:"封禁原因",span:3},{default:c(()=>[_(b(m.banMetadata.description),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["style"])]),"scroll-loading":c(()=>[$.value?(C(),B("div",tt,[n.value?(C(),q(S,{key:0},{default:c(()=>[_("已经到底啦！")]),_:1})):(C(),q(A,{key:1}))])):T("",!0)]),_:1},8,["data"])]),_:1})}}}),nt=Ne(at,[["__scopeId","data-v-bc087b28"]]),it=D({__name:"BanListView",setup(e){return(o,a)=>{const v=ve;return C(),q(v,{direction:"vertical",fill:""},{default:c(()=>[t(nt)]),_:1})}}});export{it as default};