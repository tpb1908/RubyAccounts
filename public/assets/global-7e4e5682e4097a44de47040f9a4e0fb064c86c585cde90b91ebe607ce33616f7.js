function showFlash(type, message) {
	$("#flashes").html("<div class='alert alert-" + type + "'>" + message + "</div>");
}

function clearFlash() {
	$("#flashes").html("");
}
;
