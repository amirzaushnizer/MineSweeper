(this["webpackJsonpmine-sweeper"]=this["webpackJsonpmine-sweeper"]||[]).push([[0],{18:function(e,n,t){},19:function(e,n,t){},27:function(e,n,t){"use strict";t.r(n);var r,a=t(0),i=t.n(a),o=t(4),s=t.n(o),c=(t(18),t(19),t(2)),u=t(1),l=Object(c.b)((function(e){return{numOfBombsLeft:e.bombsLeft}}))((function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)("h3",{children:"Bombs Left"}),Object(u.jsx)("h5",{children:e.numOfBombsLeft})]})})),f=t(5),m=t(6),p=t(8),d=t(7),h=20;!function(e){e[e.FirstClick=0]="FirstClick",e[e.Playing=1]="Playing",e[e.Win=2]="Win",e[e.Lose=3]="Lose"}(r||(r={}));var b,v=function(e){return Array(e).fill(-1).map((function(){return Array(e).fill(-1)}))},j=function(e){return Array(e).fill(!1).map((function(){return Array(e).fill(!1)}))},O=function(e,n,t,r){return e[n][t]||function(e,n,t){return n===e[0]&&t===e[1]}(r,n,t)},S=function(e,n,t,r){for(var a=j(e),i=0;i<n;i++)for(var o=!1;!o;){var s=Math.floor(Math.random()*e),c=Math.floor(Math.random()*e);O(a,s,c,[t,r])||(a[s][c]=!0,o=!0)}return a},k=function(e,n,t){for(var r=[],a=e-1;a<=e+1;a++)for(var i=n-1;i<=n+1;i++)a===e&&i===n||a>-1&&i>-1&&a<t&&i<t&&r.push([a,i]);return r},y=function(e){var n=e.toString();return n.length<2&&(n="0"+n),n},g=function(e){var n=e%60,t=Math.floor(e/60)%60,r=Math.floor(t/60)%24;return"".concat(y(r),":").concat(y(t),":").concat(y(n))},M=function e(n,t,r,a){r[n][t]<0&&(r[n][t]=q(n,t,a),0===r[n][t]&&k(n,t,r.length).forEach((function(n){e(n[0],n[1],r,a)})))},q=function(e,n,t){return k(e,n,t.length).filter((function(e){return t[e[0]][e[1]]})).length},A=function(e){return e===r.Win||e===r.Lose},x=function(e){Object(p.a)(t,e);var n=Object(d.a)(t);function t(){var e;Object(f.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=n.call.apply(n,[this].concat(a))).state={seconds:0,interval:setTimeout((function(){}),0)},e.incSeconds=function(){var n=e.state.seconds;e.setState({seconds:n+1})},e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=setInterval(this.incSeconds,1e3);this.setState({interval:e})}},{key:"componentDidUpdate",value:function(){var e=this.props.gamePhase,n=this.state.interval;e>r.Playing&&clearInterval(n)}},{key:"componentWillUnmount",value:function(){var e=this.state.interval;clearInterval(e)}},{key:"render",value:function(){var e=this.state.seconds;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h3",{children:"Time passed"}),Object(u.jsx)("h5",{children:g(e)})]})}}]),t}(a.Component),P=Object(c.b)((function(e){return{gamePhase:e.gamePhase}}))(x),L=t(12),C=t.n(L);!function(e){e.MarkSquare="MARK_SQUARE",e.UnmarkSquare="UNMARK_SQUARE",e.FirstMove="FIRST_MOVE",e.OpenSquares="OPEN_SQUARES",e.LoseGame="LOSE_GAME",e.WinGame="WIN_GAME"}(b||(b={}));var U,w=function(e,n){return function(t,r){var a=r(),i=a.openSquares.map((function(e){return e.slice()}));M(e,n,i,a.bombsSquares),t({type:b.OpenSquares,payload:{openSquares:i}}),function(e){return 15===e.flat().filter((function(e){return-1===e})).length}(i)&&t({type:b.WinGame})}};!function(e){e[e.Unmarked=0]="Unmarked",e[e.Marked=1]="Marked",e[e.QuestionMark=2]="QuestionMark"}(U||(U={}));var B=function(e){Object(p.a)(t,e);var n=Object(d.a)(t);function t(){var e;Object(f.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(e=n.call.apply(n,[this].concat(i))).state={markState:U.Unmarked},e.displayOpen=function(){var n=e.props,t=n.isBomb,a=n.numOfAdjacentBombs,i=n.gamePhase;return t?i===r.Win?"\u2705":"\ud83d\udca3":a>0?a:""},e.displayHidden=function(){switch(e.state.markState){case U.Marked:return"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f";case U.QuestionMark:return"?";default:return""}},e.handleRightClick=function(n){var t=e.props,r=t.mark,a=t.unmark,i=e.state.markState;n.preventDefault(),e.isOpen()||(i===U.Unmarked&&r(),i===U.Marked&&a(),e.setState({markState:(i+1)%3}))},e.handleOpen=function(n,t){var r=e.props,a=r.bombsSquaresMat,i=r.lose,o=r.openSquares;a[n][t]?i():o(n,t)},e.handleLeftClick=function(){var n=e.props,t=n.gamePhase,a=n.firstMove,i=n.loc,o=i[0],s=i[1];t===r.FirstClick&&a(o,s),e.handleOpen(o,s)},e.isOpen=function(){return e.props.numOfAdjacentBombs>-1},e.shouldDisplayOpen=function(){var n=e.props.gamePhase;return A(n)||e.isOpen()},e.buildSquareClassNameString=function(){var n=e.props,t=n.isBomb,a=n.gamePhase;return C()("square",{open:e.isOpen(),bomb:a===r.Lose&&t,"game-win":a===r.Win})},e}return Object(m.a)(t,[{key:"componentDidUpdate",value:function(e){var n=this.props.unmark;this.state.markState===U.Marked&&e.numOfAdjacentBombs<0&&this.isOpen()&&n()}},{key:"render",value:function(){var e=this.state.markState,n=this.props.gamePhase;return Object(u.jsx)("button",{className:this.buildSquareClassNameString(),onContextMenu:this.handleRightClick,disabled:n>r.Playing||e===U.Marked,onClick:this.handleLeftClick,children:this.shouldDisplayOpen()?this.displayOpen():this.displayHidden()})}}]),t}(a.Component),W=Object(c.b)((function(e,n){var t=n.loc;return{isBomb:e.bombsSquares[t[0]][t[1]],numOfAdjacentBombs:e.openSquares[t[0]][t[1]],gamePhase:e.gamePhase,bombsSquaresMat:e.bombsSquares}}),(function(e){return{unmark:function(){return e({type:b.UnmarkSquare})},mark:function(){return e({type:b.MarkSquare})},firstMove:function(n,t){return e(function(e,n){return{type:b.FirstMove,payload:{row:e,col:n}}}(n,t))},lose:function(){return e({type:b.LoseGame})},openSquares:function(n,t){return e(w(n,t))}}}))(B),E=Object(c.b)((function(e){return{gameSize:e.gameSize}}))((function(e){return Object(u.jsx)("div",{className:"grid-container",children:Array.from(Array(e.gameSize).keys()).map((function(n){return Object(u.jsx)("div",{className:"square-column",children:Array.from(Array(e.gameSize).keys()).map((function(e){return Object(u.jsx)(W,{loc:[n,e]},e)}))},n)}))})})),N=function(){return Object(u.jsxs)("div",{className:"app-container",children:[Object(u.jsx)("h1",{children:"MineSweeper Game"}),Object(u.jsxs)("div",{className:"game-container",children:[Object(u.jsx)(l,{}),Object(u.jsx)(E,{}),Object(u.jsx)(P,{})]})]})},F=t(3),G=Object(F.b)({bombsLeft:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:15,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case b.MarkSquare:return e-1;case b.UnmarkSquare:return e+1;default:return e}},gameSize:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;return e},gamePhase:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.FirstClick,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case b.FirstMove:return r.Playing;case b.LoseGame:return r.Lose;case b.WinGame:return r.Win;default:return e}},bombsSquares:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j(h),n=arguments.length>1?arguments[1]:void 0;return n.type===b.FirstMove?S(h,15,n.payload.row,n.payload.col):e},openSquares:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v(h),n=arguments.length>1?arguments[1]:void 0;return n.type===b.OpenSquares?n.payload.openSquares:e}}),R=t(13);s.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(c.a,{store:Object(F.c)(G,Object(F.a)(R.a)),children:Object(u.jsx)(N,{})})}),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.596262d4.chunk.js.map