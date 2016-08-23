var moveTime = new Date().getTime();
$(document).mousemove(function(e) {
	moveTime = new Date().getTime();
});
function pulse() {
	if(new Date().getTime() - moveTime < 3e5) {
		$.post('/pulse', function(data) {});
	}
	setTimeout(function() {
		pulse();
	}, 60000);
}
pulse();
