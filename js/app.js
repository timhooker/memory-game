var app={router:Rlite()};$(function(){app.gameDeck=function(e){var a=app.shuffle("123456789abcdefg".split(""));return a=a.slice(0,e),a=a.concat(a),app.shuffle(a)}}),app.memoryGame=function(){$(".game-checkbox").on("change",function(){function e(){t.prop("checked",!1),t.attr("disabled",!1),app.previous.prop("checked",!1),app.previous.attr("disabled",!1),app.previous=void 0}function a(){var e=n.text().slice(0,o-1);n.text(e)}var t=$(this),n=$(".game-icons p"),o=n.text().length;if(t.attr("disabled",!0),!app.previous)return void(app.previous=t);var i=app.previous.next().children(".game-icon").text(),r=t.next().children(".game-icon").text();if(i===r){if(t.addClass("matched"),app.previous.addClass("matched"),$(".matched").prop("disabled",!0),app.previous=void 0,n===$(".game-checkbox").length){var p={time:app.time+"s",result:"You Win!!",score:o,"class":"game-win"};app.manager.goTo("result",p)}}else{if(a(),1>=o){var s={time:app.time+"s",result:"You Lose!!",score:0,"class":"game-win"};return void app.manager.goTo("result",s)}window.setTimeout(e,1e3)}})},app.InstaApi=function(){var e="https://api.instagram.com/v1/";if(!spec.apiKey)throw console.log("you must enter an api");var a={listings:function(){},user:function(){var a=e+"users/search?access_token="+spec.apiKey+"q="+userID,t=$.Deferred(),n=$.getJSON(a).done(function(e){if(e.ok){t.resolve(e)}else t.reject(n,"Unknown Error",e)});return t}};return a},app.PageManager=function(){app.views={};var e={registerPage:function(e,a){app.views[e]=a},goTo:function(e,a){$("main").html(app.views[e](a))}};return e},$(function(){app.manager=app.PageManager(),app.manager.registerPage("newgame",function(){$.get("views/newgame.html").done(function(e){var a=_.template(e,{variable:"m"});$("main").html(a()),$("main").attr("class","main-container")}).fail(function(e,a,t){console.log(t+" "+a)})}),app.manager.registerPage("gametiles",function(e){$.get("views/gametiles.html").done(function(a){var t=_.template(a,{variable:"m"}),n=t({deck:e});$(".game-board").html(n)}).fail(function(){console.log("could not find gametiles")})}),app.manager.registerPage("easygame",function(){$.get("views/gameboard.html").done(function(e){var a=_.template(e,{variable:"m"}),t={tiles:app.gameDeck("9"),level:"easy-tile"};$("main").html(a()),$("main").attr("class","game-container"),app.views.gametiles(t),app.timer()}).fail(function(){console.log("could not find gameboard")})}),app.manager.registerPage("hardgame",function(){$.get("views/gameboard.html").done(function(e){var a=_.template(e,{variable:"m"}),t={tiles:app.gameDeck("16"),level:"hard-tile"};$("main").html(a()),$("main").attr("class","game-container"),app.views.gametiles(t),app.timer()}).fail(function(){console.log("could not find gameboard")})}),app.manager.registerPage("result",function(e){$.get("views/game-over.html").done(function(a){var t=_.template(a,{variable:"m"});$("main").append(t({item:e}))}).fail(function(){console.log("could not find results page")})})}),$(function(){app.router.add("",function(){app.manager.goTo("newgame",{})}),app.router.add("game/easy",function(){app.manager.goTo("easygame"),window.setTimeout(app.memoryGame,500)}),app.router.add("game/hard",function(){app.manager.goTo("hardgame"),window.setTimeout(app.memoryGame,500)}),app.router.add("game/result",function(){app.manager.goTo("result")}),app.processHash=function(){var e=location.hash||"#";app.router.run(e.slice(1))||show404Page()},window.addEventListener("hashchange",app.processHash),app.processHash()}),app.shuffle=function(e){function a(e,a,t){var n=e[a];return e[a]=e[t],e[t]=n,e}for(var t=0;t<e.length;++t){var n=Math.floor(Math.random()*e.length);e=a(e,t,n)}return e},app.timer=function(){function e(){++app.time;var e=Math.floor(app.time/60);++a,e>59&&(window.location="#game/lose"),a>59&&(a=0),$(".time-counter p").text(a>9?e+":"+a:e+":0"+a)}app.time=0;var a=0,t=window.setInterval(e,1e3);window.addEventListener("hashchange",function(){clearInterval(t),app.time=0})};
//# sourceMappingURL=app.js.map