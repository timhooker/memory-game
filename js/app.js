var app={router:Rlite()};$(function(){app.gameDeck=function(e){var a=app.shuffle("123456789abcdefg".split(""));return a=a.slice(0,e),a=a.concat(a),app.shuffle(a)}}),app.memoryGame=function(){$(".game-checkbox").on("change",function(){function e(){n.prop("checked",!1),n.attr("disabled",!1),app.previous.prop("checked",!1),app.previous.attr("disabled",!1),app.previous=void 0}function a(){var e=t.text().slice(0,o-1);t.text(e)}var n=$(this),t=$(".game-icons p"),o=t.text().length;if(n.attr("disabled",!0),!app.previous)return void(app.previous=n);var i=app.previous.next().children(".game-icon").text(),r=n.next().children(".game-icon").text();if(i===r){if(n.addClass("matched"),app.previous.addClass("matched"),$(".matched").prop("disabled",!0),app.previous=void 0,t===$(".game-checkbox").length){var p={time:app.timer+"s",result:"You Win!!",score:o,"class":"game-win"};app.manager.goTo("result",p)}}else{if(a(),1>=o){var p={time:app.timer+"s",result:"You Lose!!",score:0,"class":"game-win"};return void app.manager.goTo("result",p)}window.setTimeout(e,1e3)}})},app.InstaApi=function(){var e="https://api.instagram.com/v1/";if(!spec.apiKey)throw console.log("you must enter an api");var a={listings:function(){},user:function(){var a=e+"users/search?access_token="+spec.apiKey+"q="+userID,n=$.Deferred(),t=$.getJSON(a).done(function(e){if(e.ok){n.resolve(e)}else n.reject(t,"Unknown Error",e)});return n}};return a},app.PageManager=function(){app.views={};var e={registerPage:function(e,a){app.views[e]=a},goTo:function(e,a){$("main").html(app.views[e](a))}};return e},$(function(){app.manager=app.PageManager(),$.get("views/gametiles.html").done(function(e){app.views.gametiles=_.template(e,{variable:"m"})}).fail(function(e,a,n){console.log(n)}),app.manager.registerPage("newgame",function(){$.get("views/newgame.html").done(function(e){var a=_.template(e,{variable:"m"});$("main").html(a()),$("main").attr("class","main-container")}).fail(function(e,a,n){console.log(n+" "+a)})}),app.manager.registerPage("easygame",function(){$.get("views/gameboard.html").done(function(e){var a=e,n=app.gameDeck("9"),t=app.views.gametiles({deck:n,level:"easy-tile"});$("main").html(a),$("main").attr("class","game-container"),$("main").append(t),app.timer()}).fail(function(){console.log("could not find gameboard")})}),app.manager.registerPage("hardgame",function(){$.get("views/gameboard.html").done(function(e){var a=e,n=app.gameDeck("16"),t=app.views.gametiles({deck:n,level:"hard-tile"});$("main").html(a),$("main").attr("class","game-container"),$("main").append(t)}).fail(function(){console.log("could not find gameboard")})}),app.manager.registerPage("result",function(e){$.get("views/game-over.html").done(function(a){var n=_.template(a,{variable:"m"});$("main").append(n({item:e}))}).fail(function(){console.log("could not find gameboard")})})}),$(function(){app.router.add("",function(){app.manager.goTo("newgame",{})}),app.router.add("game/easy",function(){app.manager.goTo("easygame"),window.setTimeout(app.memoryGame,500)}),app.router.add("game/hard",function(){app.manager.goTo("hardgame"),window.setTimeout(app.memoryGame,500)}),app.router.add("game/result",function(){app.manager.goTo("result")}),app.processHash=function(){var e=location.hash||"#";app.router.run(e.slice(1))||show404Page()},window.addEventListener("hashchange",app.processHash),app.processHash()}),app.shuffle=function(e){function a(e,a,n){var t=e[a];return e[a]=e[n],e[n]=t,e}for(var n=0;n<e.length;++n){var t=Math.floor(Math.random()*e.length);e=a(e,n,t)}return e},app.timer=function(){function e(){++app.timer;var e=Math.floor(app.timer/60);++a,e>59&&(window.location="#game/lose"),a>59&&(a=0),$(".time-counter p").text(a>9?e+":"+a:e+":0"+a)}app.timer=0;var a=0,n=window.setInterval(e,1e3);window.addEventListener("hashchange",function(){clearInterval(n),app.timer=0})};
//# sourceMappingURL=app.js.map