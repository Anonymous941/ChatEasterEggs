// ==UserScript==
// @name         Chat easter eggs
// @description  Enables moderation tools in private teams.
// @author       Anonymous
// @version      1.0.0
// @run-at document-end
//
// @include      *://chat.stackexchange.com/rooms/*
// @include      *://chat.stackoverflow.com/rooms/*
// @include      *://chat.meta.stackexchange.com/rooms/*
//
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

var script = $("<script>");
$(document).ready(function() {
  script.text("(" + function() {
    $.getScript("https://cdn-chat.sstatic.net/chat/Js/eggs.js");
    $.fn.preBind = function (type, data, fn) {
      this.each(function () {
        var $this = $(this);
        $this.bind(type, data, fn);
        var currentBindings = $._data(this, 'events')[type];
        if ($.isArray(currentBindings)) {
          currentBindings.unshift(currentBindings.pop());
        }
      });
      return this;
    };
    function easterEggRun(messageText) {
      Eggs.Cthulu(messageText);
      Eggs.Assistant(messageText);
      Eggs.Asteroids(messageText);
      Eggs.Console(messageText);
      Eggs.WOB(messageText);
    }
    $("#input").preBind('keydown', function (t) {
      if (229 != t.which) {
        switch ((38 == t.which || 40 == t.which), t.which) {
          case 13:
            t.shiftKey || easterEggRun($("#input").val());
            break;
        }
      }
    });
    function tryToInitializeWOB() {
      if($("#loading").length) { // if chat is not done loading...
        window.setTimeout(tryToInitializeWOB, 100); // ...try again in .1 seconds
      }
      else {
    		Eggs.WOB.init(); // otherwise, initialize the wheel of blame
      }
    }
    tryToInitializeWOB();
  } + ")();");
});
$("head").append(script);
