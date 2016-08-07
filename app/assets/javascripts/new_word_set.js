$(document).on('turbolinks:load', function() {
	$('#words_input').bind('input propertychange',function() {
		analyse();
	});
});

//TODO- Character count isn't so simple, we must take into account keys for each word
//Check if character == character.toUpperCase
//Run one parse when a set is created / updated
//In order to find the correct count, we need the language code, and for each language, a list of special characters which require more keypresses
//See the 10fastfingers FAQ http://10fastfingers.com/faq
//Try using pstore to store extra values

/* Characters
	Uppercase (2) char.toUpperCase == char
	Catalan -
	(2) àèò éíóú ïü
	(3) ÀÈÒ ÉÍÓÚ ÏÜ
	Chinese and Japanese - 
	(5)
	Czech - 
	(2) ó / ( ? : ! " ' ° % _ | 1 2 3 4 5 6 7 8 9 0 letter)
	(3) ď ť ň (shift + ˇ, letter)
	(3)  Á É Í Ó Ú Ý (´, shift + letter)
	(4) Ě Š Č Ř Ž Ň Ť Ď Ů (shift + ˇ, shift + letter)
	Danish -
	(2) Æ Ø Å
	Dutch -
	(2) é
	Esperanto - 
	(2) ĉ ŭ ŝ ĝ ĵ ĥ
	French - 
	(2) â ê î ô û (^ + a e i o u)
	(3) Â Ê Î Ô Û (^ + shift + a e i o u) ä ë ï ü ÿ (shift + ¨ + a e i u y) Ä Ë Ï Ü (shift remaining pressed + ¨ + a e i u)
	(4) À È Ù (Alt Gr + ` + shift + a e u), Ç = Alt + 128 = 4 keystrokes, É = Alt + 144 = 4 keystrokes
	(5) Œ = Alt + 0140 = 5 keystrokes œ = Alt + 0156 = 5 keystrokes Ÿ = Alt + 0159 = 5 keystrokes
	German - 
	(2) Ä Ö Ü
	Greek - 
	(2) ά ή ί ώ ό ύ έ Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω
	(3) ϊ ϋ ΐ ΰ Ά Ή Ί Ώ Ό Ύ Έ
	(4) Ϊ Ϋ
	Icelandic - 
	(2) é,ú,í,ó,á,ý (^ + e u i o a y)
	(3) É,Ý,Ú,Í,Ó,Á (^ + shift + e y u i a)
	Italian - 
	(2) é
	Korean - 
	(3)
	Latvian - 
	(2) ē ū ī ā š ģ ķ ļ ž č ņ
	Lithuanian - 
	(2) ą č ę ė į š ų ū ž
	Persian - 
	(2) ژ آ ء ّ َ ُ ِ
	Polish - 
	(2) ą ć ę ł ń ó ś ź ż
	Portuguese - 
	(2) ã õ á é í ó ú
	(3) à â ê î ô û
	Romainian - 
	(2) ă â î ș ț
	Spanish - 
	(2) á é í ó ú
	Turkish - 
	(2) Ö Ü Ç Ş Ğ İ
	Vietnamese - 
	(2) ă â á à ạ ả ã đ é è ẻ ẽ ẹ ê í ì ỉ ĩ ị ô ơ ó ò ỏ õ ọ ư ú ù ủ ũ ụ ý ỳ ỷ ỹ ỵ
	(3) ắ ằ ặ ẳ ẵ ấ ầ ậ ẩ ẫ ế ề ể ễ ệ ố ồ ổ ỗ ộ ớ ờ ở ỡ ợ ứ ừ ử ữ ự

  
*/


function analyse() {
	var input = document.getElementById('words_input');
	var char_count = input.value.length;
	var capital_count = input.value.replace(/[a-z]/g, '').length;
	//Remove extra spaces and then split
	var words = input.value.replace(/\s+/g, " ").split(' ');
	commonWords(words);
	var word_count = input.value == "" ? 0 : words.length;
	var standard_word_count = Math.floor(char_count/5);
	var special_count = input.value.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
	special_count = special_count == null ? 0 : special_count.length;
		
	document.getElementById('character_count').innerHTML = char_count;
	document.getElementById('word_count').innerHTML = word_count;
	document.getElementById('standard_word_count').innerHTML = standard_word_count;
	document.getElementById('capital_count').innerHTML = capital_count;
	document.getElementById('special_count').innerHTML = special_count;
}

function commonWords(words) {
	var freqMap = {};
	var totalLength = 0;
	var length = 0;
	words.forEach(function(w) {
		if(w !== "") {
			if(!freqMap[w]) {
				freqMap[w] = 0;
			}
			freqMap[w] += 1;
			totalLength += w.length;
			length++;
		}
	});
	document.getElementById('word_length').innerHTML =  length === 0 ? 0 : Math.round((totalLength/length) * 100)/100
	var out = "\n";
	var values = Object.keys(freqMap).map(function(v) { return {word:v, count:freqMap[v]} });
	values = values.sort(function(a, b) { return b.count - a.count});
	values.forEach(function(v) {
		out += v.word + " : " + v.count + ", ";
	})
	$('#words').text(out);
}

