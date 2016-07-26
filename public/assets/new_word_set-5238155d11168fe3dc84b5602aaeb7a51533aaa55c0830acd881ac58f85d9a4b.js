$(document).on('turbolinks:load', function() {
	$('#words_input').bind('input propertychange',function() {
		analyse();
	});
});

function analyse() {
	var input = document.getElementById('words_input');
	var char_count = input.value.length;
	var capital_count = input.value.replace(/[a-z]/g, '').length;
	//Remove extra spaces and then split
	var words = input.value.replace(/\s+/g, " ").split(' ');
	commonWords(words);
	var word_count = input.value == "" ? 0 : words.length;
	var special_count = input.value.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
	special_count = special_count == null ? 0 : special_count.length;
		
	document.getElementById('character_count').innerHTML = char_count;
	document.getElementById('word_count').innerHTML = word_count;
	document.getElementById('capital_count').innerHTML = capital_count;
	document.getElementById('special_count').innerHTML = special_count;
}

function commonWords(words) {
	var freqMap = {};
	words.forEach(function(w) {
		if(w !== "") {
			if(!freqMap[w]) {
				freqMap[w] = 0;
			}
			freqMap[w] += 1;
		}
	
	});
	var out = "Word frequency<br>";
	var values = Object.keys(freqMap).map(function(v) { return {word:v, count:freqMap[v]} });
	values = values.sort(function(a, b) { return b.count - a.count});
	values.forEach(function(v) {
		out += v.word + ": " + v.count + ", ";
	})
	document.getElementById('words').innerHTML = out;
}

;
