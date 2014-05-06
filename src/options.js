// Saves options to chrome.storage
function save_options() {
	var $greetings = $('*[data-greeting]');
	var $name = $greetings.filter('*[data-greeting="loginLogout"][data-option="name"]');
	chrome.storage.local.set({
		"loginLogout.name": $name.val()
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.local.get({
		"loginLogout.name": 'test.%isoCode%@yoox.com'
	}, function(items) {
		var $greetings = $('*[data-greeting]');
		var $name = $greetings.filter('*[data-greeting="loginLogout"][data-option="name"]');
		$name.val(items["loginLogout.name"]);
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);