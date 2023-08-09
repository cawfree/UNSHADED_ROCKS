import{an as j,ao as u,ap as V,aq as x,ar as U,as as g,at as $,au as z,av as E,aw as q,ax as S,ay as H,az as T,aA as M,aB as X,aC as f,aD as _,aE as J,aF as Q}from"./index-5303f441.js";import{AlchemyProvider as R}from"./alchemy-provider-deeb5501-7a255849.js";var K={};Object.defineProperty(K,"__esModule",{value:!0});var Z="Provided shouldReconnect() returned false. Closing permanently.",ee="Provided shouldReconnect() resolved to false. Closing permanently.",O=function(){function n(e,t,s){if(s===void 0&&(s={}),this.url=e,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=n.CONNECTING,this.OPEN=n.OPEN,this.CLOSING=n.CLOSING,this.CLOSED=n.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},t==null||typeof t=="string"||Array.isArray(t)?this.protocols=t:s=t,this.options=se(s),!this.options.wsConstructor)if(typeof WebSocket<"u")this.options.wsConstructor=WebSocket;else throw new Error("WebSocket not present in global scope and no wsConstructor option was provided.");this.openNewWebSocket()}return Object.defineProperty(n.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(e){this.binaryTypeInternal=e,this.ws&&(this.ws.binaryType=e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"bufferedAmount",{get:function(){var e=this.ws?this.ws.bufferedAmount:0,t=!1;return this.messageBuffer.forEach(function(s){var i=ne(s);i!=null?e+=i:t=!0}),t&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),e},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"readyState",{get:function(){return this.isClosed?n.CLOSED:n.OPEN},enumerable:!0,configurable:!0}),n.prototype.close=function(e,t){this.disposeSocket(e,t),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},n.prototype.send=function(e){if(this.isClosed)throw new Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(e):this.messageBuffer.push(e)},n.prototype.reconnect=function(){if(this.isClosed)throw new Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},n.prototype.addEventListener=function(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},n.prototype.dispatchEvent=function(e){return this.dispatchEventOfType(e.type,e)},n.prototype.removeEventListener=function(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(function(s){return s!==t}))},n.prototype.openNewWebSocket=function(){var e=this;if(!this.isClosed){var t=this.options,s=t.connectTimeout,i=t.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var r=new i(this.url,this.protocols);r.onclose=function(o){return e.handleClose(o)},r.onerror=function(o){return e.handleError(o)},r.onmessage=function(o){return e.handleMessage(o)},r.onopen=function(o){return e.handleOpen(o)},this.connectTimeoutId=setTimeout(function(){e.clearConnectTimeout(),e.disposeSocket(),e.handleClose(void 0)},s),this.ws=r}},n.prototype.handleOpen=function(e){var t=this;if(!(!this.ws||this.isClosed)){var s=this.options.allClearResetTime;this.debugLog("WebSocket opened."),this.binaryTypeInternal!=null?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",e):(this.dispatchEventOfType("open",e),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(i){return t.send(i)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){t.clearAllClearTimeout(),t.nextRetryTime=0,t.reconnectCount=0;var i=s/1e3|0;t.debugLog("WebSocket remained open for "+i+" seconds. Resetting retry time and count.")},s)}},n.prototype.handleMessage=function(e){this.isClosed||this.dispatchEventOfType("message",e)},n.prototype.handleClose=function(e){var t=this;if(!this.isClosed){var s=this.options,i=s.maxReconnectAttempts,r=s.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",e),this.reconnectCount>=i){this.stopReconnecting(e,this.getTooManyFailedReconnectsMessage());return}var o=!e||r(e);typeof o=="boolean"?this.handleWillReconnect(o,e,Z):o.then(function(c){t.isClosed||t.handleWillReconnect(c,e,ee)})}},n.prototype.handleError=function(e){this.dispatchEventOfType("error",e),this.debugLog("WebSocket encountered an error.")},n.prototype.handleWillReconnect=function(e,t,s){e?this.reestablishConnection():this.stopReconnecting(t,s)},n.prototype.reestablishConnection=function(){var e=this,t=this.options,s=t.minReconnectDelay,i=t.maxReconnectDelay,r=t.reconnectBackoffFactor;this.reconnectCount++;var o=this.nextRetryTime;this.nextRetryTime=Math.max(s,Math.min(this.nextRetryTime*r,i)),setTimeout(function(){return e.openNewWebSocket()},o);var c=o/1e3|0;this.debugLog("WebSocket was closed. Re-opening in "+c+" seconds.")},n.prototype.stopReconnecting=function(e,t){this.debugLog(t),this.shutdown(),e&&this.dispatchEventOfType("close",e)},n.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},n.prototype.disposeSocket=function(e,t){this.ws&&(this.ws.onerror=I,this.ws.onclose=I,this.ws.onmessage=I,this.ws.onopen=I,this.ws.close(e,t),this.ws=void 0)},n.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},n.prototype.clearConnectTimeout=function(){this.connectTimeoutId!=null&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},n.prototype.clearAllClearTimeout=function(){this.allClearTimeoutId!=null&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},n.prototype.dispatchEventOfType=function(e,t){var s=this;switch(e){case"close":this.onclose&&this.onclose(t);break;case"error":this.onerror&&this.onerror(t);break;case"message":this.onmessage&&this.onmessage(t);break;case"open":this.onopen&&this.onopen(t);break;case"down":this.ondown&&this.ondown(t);break;case"reopen":this.onreopen&&this.onreopen(t);break}return e in this.listeners&&this.listeners[e].slice().forEach(function(i){return s.callListener(i,t)}),!t||!t.defaultPrevented},n.prototype.callListener=function(e,t){typeof e=="function"?e.call(this,t):e.handleEvent.call(this,t)},n.prototype.debugLog=function(e){this.options.debug&&console.log(e)},n.prototype.getTooManyFailedReconnectsMessage=function(){var e=this.options.maxReconnectAttempts;return"Failed to reconnect after "+e+" "+ie("attempt",e)+". Closing permanently."},n.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},n.CONNECTING=0,n.OPEN=1,n.CLOSING=2,n.CLOSED=3,n}(),te=K.default=O;function se(n){var e={};return Object.keys(O.DEFAULT_OPTIONS).forEach(function(t){var s=n[t];e[t]=s===void 0?O.DEFAULT_OPTIONS[t]:s}),e}function ne(n){return typeof n=="string"?2*n.length:n instanceof ArrayBuffer?n.byteLength:n instanceof Blob?n.size:void 0}function ie(n,e){return e===1?n:n+"s"}function I(){}const re=120;class oe{constructor(e){this.provider=e,this.maxBackfillBlocks=re}getNewHeadsBackfill(e,t,s){return u(this,void 0,void 0,function*(){m(e);const i=yield this.getBlockNumber();if(m(e),t.length===0)return this.getHeadEventsInRange(Math.max(s,i-this.maxBackfillBlocks)+1,i+1);const r=f(t[t.length-1].number),o=i-this.maxBackfillBlocks+1;if(r<=o)return this.getHeadEventsInRange(o,i+1);const c=yield this.getReorgHeads(e,t);m(e);const h=yield this.getHeadEventsInRange(r+1,i+1);return m(e),[...c,...h]})}getLogsBackfill(e,t,s,i){return u(this,void 0,void 0,function*(){m(e);const r=yield this.getBlockNumber();if(m(e),s.length===0)return this.getLogsInRange(t,Math.max(i,r-this.maxBackfillBlocks)+1,r+1);const o=f(s[s.length-1].blockNumber),c=r-this.maxBackfillBlocks+1;if(o<c)return this.getLogsInRange(t,c,r+1);const h=yield this.getCommonAncestor(e,s);m(e);const p=s.filter(l=>f(l.blockNumber)>h.blockNumber).map(l=>Object.assign(Object.assign({},l),{removed:!0})),b=h.blockNumber===Number.NEGATIVE_INFINITY?f(s[0].blockNumber):h.blockNumber;let a=yield this.getLogsInRange(t,b,r+1);return a=a.filter(l=>l&&(f(l.blockNumber)>h.blockNumber||f(l.logIndex)>h.logIndex)),m(e),[...p,...a]})}setMaxBackfillBlock(e){this.maxBackfillBlocks=e}getBlockNumber(){return u(this,void 0,void 0,function*(){const e=yield this.provider.send("eth_blockNumber");return f(e)})}getHeadEventsInRange(e,t){return u(this,void 0,void 0,function*(){if(e>=t)return[];const s=[];for(let r=e;r<t;r++)s.push({method:"eth_getBlockByNumber",params:[_(r),!1]});return(yield this.provider.sendBatch(s)).map(F)})}getReorgHeads(e,t){return u(this,void 0,void 0,function*(){const s=[];for(let i=t.length-1;i>=0;i--){const r=t[i],o=yield this.getBlockByNumber(f(r.number));if(m(e),r.hash===o.hash)break;s.push(F(o))}return s.reverse()})}getBlockByNumber(e){return u(this,void 0,void 0,function*(){return this.provider.send("eth_getBlockByNumber",[_(e),!1])})}getCommonAncestor(e,t){return u(this,void 0,void 0,function*(){let s=yield this.getBlockByNumber(f(t[t.length-1].blockNumber));m(e);for(let i=t.length-1;i>=0;i--){const r=t[i];if(r.blockNumber!==s.number&&(s=yield this.getBlockByNumber(f(r.blockNumber))),r.blockHash===s.hash)return{blockNumber:f(r.blockNumber),logIndex:f(r.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}})}getLogsInRange(e,t,s){return u(this,void 0,void 0,function*(){if(t>=s)return[];const i=Object.assign(Object.assign({},e),{fromBlock:_(t),toBlock:_(s-1)});return this.provider.send("eth_getLogs",[i])})}}function F(n){const e=Object.assign({},n);return delete e.totalDifficulty,delete e.transactions,delete e.uncles,e}function ce(n){return Y(n,e=>e.hash)}function le(n){return Y(n,e=>`${e.blockHash}/${e.logIndex}`)}function Y(n,e){const t=new Set,s=[];return n.forEach(i=>{const r=e(i);t.has(r)||(t.add(r),s.push(i))}),s}const ae=new Error("Cancelled");function m(n){if(n())throw ae}const ue=3e4,he=1e4,D=6e4,W=5,de=10;class Ne extends j{constructor(e,t){var s;const i=R.getApiKey(e.apiKey),r=R.getAlchemyNetwork(e.network),o=R.getAlchemyConnectionInfo(r,i,"wss"),c=`alchemy-sdk-${J}`,h=new te((s=e.url)!==null&&s!==void 0?s:o.url,c,{wsConstructor:t??fe()}),p=Q[r];super(h,p),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=b=>{const a=JSON.parse(b.data);if(!ve(a))return;const l=a.params.subscription,d=this.virtualIdsByPhysicalId.get(l);if(!d)return;const v=this.virtualSubscriptionsById.get(d);if(v.method==="eth_subscribe")switch(v.params[0]){case"newHeads":{const k=v,B=a,{isBackfilling:A,backfillBuffer:C}=k,{result:y}=B.params;A?Te(C,y):l!==d?this.emitAndRememberEvent(d,y,w):this.rememberEvent(d,y,w);break}case"logs":{const k=v,B=a,{isBackfilling:A,backfillBuffer:C}=k,{result:y}=B.params;A?_e(C,y):d!==l?this.emitAndRememberEvent(d,y,N):this.rememberEvent(d,y,N);break}default:if(l!==d){const{result:k}=a.params;this.emitEvent(d,k)}}},this.handleReopen=()=>{this.virtualIdsByPhysicalId.clear();const{cancel:b,isCancelled:a}=be();this.cancelBackfill=b;for(const l of this.virtualSubscriptionsById.values())u(this,void 0,void 0,function*(){try{yield this.resubscribeAndBackfill(a,l)}catch(d){a()||console.error(`Error while backfilling "${l.params[0]}" subscription. Some events may be missing.`,d)}});this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{this.heartbeatIntervalId!=null&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=i,this.backfiller=new oe(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=V}static getNetwork(e){return typeof e=="string"&&e in x?x[e]:U(e)}on(e,t){return this._addEventListener(e,t,!1)}once(e,t){return this._addEventListener(e,t,!0)}off(e,t){return g(e)?this._off(e,t):super.off(e,t)}removeAllListeners(e){return e!==void 0&&g(e)?this._removeAllListeners(e):super.removeAllListeners(e)}listenerCount(e){return e!==void 0&&g(e)?this._listenerCount(e):super.listenerCount(e)}listeners(e){return e!==void 0&&g(e)?this._listeners(e):super.listeners(e)}_addEventListener(e,t,s){if(g(e)){$(e);const i=new z(E(e),t,s);return this._events.push(i),this._startEvent(i),this}else return super._addEventListener(e,t,s)}_startEvent(e){[...S,"block","filter"].includes(e.type)?this.customStartEvent(e):super._startEvent(e)}_subscribe(e,t,s,i){return u(this,void 0,void 0,function*(){let r=this._subIds[e];const o=yield this.getBlockNumber();r==null&&(r=Promise.all(t).then(p=>this.send("eth_subscribe",p)),this._subIds[e]=r);const c=yield r,h=yield Promise.all(t);this.virtualSubscriptionsById.set(c,{event:i,method:"eth_subscribe",params:h,startingBlockNumber:o,virtualId:c,physicalId:c,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(c,c),this._subs[c]={tag:e,processFunc:s}})}emit(e,...t){if(g(e)){let s=!1;const i=[],r=E(e);return this._events=this._events.filter(o=>o.tag!==r?!0:(setTimeout(()=>{o.listener.apply(this,t)},0),s=!0,o.once?(i.push(o),!1):!0)),i.forEach(o=>{this._stopEvent(o)}),s}else return super.emit(e,...t)}sendBatch(e){return u(this,void 0,void 0,function*(){let t=0;const s=e.map(({method:i,params:r})=>({method:i,params:r,jsonrpc:"2.0",id:`alchemy-sdk:${t++}`}));return this.sendBatchConcurrently(s)})}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===q}_stopEvent(e){let t=e.tag;if(S.includes(e.type)){if(this._events.filter(i=>S.includes(i.type)).length)return}else if(e.type==="tx"){if(this._events.filter(i=>i.type==="tx").length)return;t="tx"}else if(this.listenerCount(e.event))return;const s=this._subIds[t];s&&(delete this._subIds[t],s.then(i=>{this._subs[i]&&(delete this._subs[i],this.send("eth_unsubscribe",[i]))}))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(e,t){return u(this,void 0,void 0,function*(){const{virtualId:s,method:i,params:r,sentEvents:o,backfillBuffer:c,startingBlockNumber:h}=t;t.isBackfilling=!0,c.length=0;try{const p=yield this.send(i,r);switch(m(e),t.physicalId=p,this.virtualIdsByPhysicalId.set(p,s),r[0]){case"newHeads":{const b=yield G(()=>L(this.backfiller.getNewHeadsBackfill(e,o,h),D),W,()=>!e());m(e),ce([...b,...c]).forEach(l=>this.emitNewHeadsEvent(s,l));break}case"logs":{const b=r[1]||{},a=yield G(()=>L(this.backfiller.getLogsBackfill(e,b,o,h),D),W,()=>!e());m(e),le([...a,...c]).forEach(d=>this.emitLogsEvent(s,d));break}default:break}}finally{t.isBackfilling=!1,c.length=0}})}emitNewHeadsEvent(e,t){this.emitAndRememberEvent(e,t,w)}emitLogsEvent(e,t){this.emitAndRememberEvent(e,t,N)}emitAndRememberEvent(e,t,s){this.rememberEvent(e,t,s),this.emitEvent(e,t)}emitEvent(e,t){const s=this.virtualSubscriptionsById.get(e);s&&this.emitGenericEvent(s,t)}rememberEvent(e,t,s){const i=this.virtualSubscriptionsById.get(e);i&&P(i.sentEvents,Object.assign({},t),s)}emitGenericEvent(e,t){this.emitProcessFn(e.event)(t)}startHeartbeat(){this.heartbeatIntervalId==null&&(this.heartbeatIntervalId=setInterval(()=>u(this,void 0,void 0,function*(){try{yield L(this.send("net_version"),he)}catch{this._websocket.reconnect()}}),ue))}sendBatchConcurrently(e){return u(this,void 0,void 0,function*(){return Promise.all(e.map(t=>this.send(t.method,t.params)))})}customStartEvent(e){if(e.type===H){const{fromAddress:t,toAddress:s,hashesOnly:i}=e;this._subscribe(e.tag,[T.PENDING_TRANSACTIONS,{fromAddress:t,toAddress:s,hashesOnly:i}],this.emitProcessFn(e),e)}else if(e.type===M){const{addresses:t,includeRemoved:s,hashesOnly:i}=e;this._subscribe(e.tag,[T.MINED_TRANSACTIONS,{addresses:t,includeRemoved:s,hashesOnly:i}],this.emitProcessFn(e),e)}else e.type==="block"?this._subscribe("block",["newHeads"],this.emitProcessFn(e),e):e.type==="filter"&&this._subscribe(e.tag,["logs",this._getFilter(e.filter)],this.emitProcessFn(e),e)}emitProcessFn(e){switch(e.type){case H:return t=>this.emit({method:T.PENDING_TRANSACTIONS,fromAddress:e.fromAddress,toAddress:e.toAddress,hashesOnly:e.hashesOnly},t);case M:return t=>this.emit({method:T.MINED_TRANSACTIONS,addresses:e.addresses,includeRemoved:e.includeRemoved,hashesOnly:e.hashesOnly},t);case"block":return t=>{const s=X.from(t.number).toNumber();this._emitted.block=s,this.emit("block",s)};case"filter":return t=>{t.removed==null&&(t.removed=!1),this.emit(e.filter,this.formatter.filterLog(t))};default:throw new Error("Invalid event type to `emitProcessFn()`")}}_off(e,t){if(t==null)return this.removeAllListeners(e);const s=[];let i=!1;const r=E(e);return this._events=this._events.filter(o=>o.tag!==r||o.listener!=t||i?!0:(i=!0,s.push(o),!1)),s.forEach(o=>{this._stopEvent(o)}),this}_removeAllListeners(e){let t=[];if(e==null)t=this._events,this._events=[];else{const s=E(e);this._events=this._events.filter(i=>i.tag!==s?!0:(t.push(i),!1))}return t.forEach(s=>{this._stopEvent(s)}),this}_listenerCount(e){if(!e)return this._events.length;const t=E(e);return this._events.filter(s=>s.tag===t).length}_listeners(e){if(e==null)return this._events.map(s=>s.listener);const t=E(e);return this._events.filter(s=>s.tag===t).map(s=>s.listener)}}function fe(){return me()?require("websocket").w3cwebsocket:WebSocket}function me(){return typeof process<"u"&&process!=null&&process.versions!=null&&process.versions.node!=null}function be(){let n=!1;return{cancel:()=>n=!0,isCancelled:()=>n}}const pe=1e3,ye=2,ge=3e4;function G(n,e,t=()=>!0){return u(this,void 0,void 0,function*(){let s=0,i=0;for(;;)try{return yield n()}catch(r){if(i++,i>=e||!t(r)||(yield Ee(s),!t(r)))throw r;s=s===0?pe:Math.min(ge,ye*s)}})}function Ee(n){return new Promise(e=>setTimeout(e,n))}function L(n,e){return Promise.race([n,new Promise((t,s)=>setTimeout(()=>s(new Error("Timeout")),e))])}function w(n){return f(n.number)}function N(n){return f(n.blockNumber)}function ke(n){return Array.isArray(n)||n.jsonrpc==="2.0"&&n.id!==void 0}function ve(n){return!ke(n)}function Te(n,e){P(n,e,w)}function _e(n,e){P(n,e,N)}function P(n,e,t){const s=t(e),i=n.findIndex(r=>t(r)>s-de);i===-1?n.length=0:n.splice(0,i),n.push(e)}export{Ne as AlchemyWebSocketProvider};
