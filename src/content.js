(function (){
	"use strict";
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			var response;
			var actualCode;
			var script;
			var greeting = bookmarklets[request.greeting];
			if(typeof greeting !== "undefined" && typeof greeting.function === "function"){
				actualCode = greeting.function;
			}
			else{
				sendResponse({farewell: "comando sconosciuto!"});
			}
			response = "comando " + request.greeting + " lanciato";
			script = document.createElement('script');
			chrome.storage.local.get(greeting.options, function(items) {
				script.textContent =  $.trim("(" + actualCode + ")();").assign(items);
				(document.head||document.documentElement).appendChild(script);
				script.parentNode.removeChild(script);
				sendResponse({farewell: response});
			});
		});

})();