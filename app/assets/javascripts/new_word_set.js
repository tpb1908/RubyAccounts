$(document).on('turbolinks:load', function() {
	$('#words_input').bind('input propertychange',function() {
		var input = document.getElementById('words_input');
		var char_count = input.value.length;
		var capital_count = input.value.replace(/[a-z]/g, '').length;
		//Remove extra spaces and then split
		var word_count = input.value.replace(/\s+/g, " ").split(' ').length;
		word_count = input.value == "" ? 0 : word_count;
		var special_count = input.value.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
		special_count = special_count == null ? 0 : special_count.length;

		document.getElementById('character_count').innerHTML = char_count;
		document.getElementById('word_count').innerHTML = word_count;
		document.getElementById('capital_count').innerHTML = capital_count;
		document.getElementById('special_count').innerHTML = special_count;
	});
});

