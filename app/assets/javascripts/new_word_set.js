$(document).one('turbolinks:load', function() {
	$('#words_input').bind('input propertychange',function() {
		analyse();
	});
	$("#insert_button").click(function() { generateText(false) });
	$("#replace_button").click(function() { generateText(true) });

	$(document).on('click', '.dropdown-menu li a', function() {
		generateType = $(this).text().substring(0,3);
		console.log("Type " + generateType);
	});
});



//TODO- Character count isn't so simple, we must take into account keys for each word
//Check if character == character.toUpperCase
//Run one parse when a set is created / updated
//In order to find the correct count, we need the language code, and for each language, a list of special characters which require more keypresses
//See the 10fastfingers FAQ http://10fastfingers.com/faq
//Try using pstore to store extra values
var parsedWords; 
var char_count = capital_count = word_count = standard_word_count = special_count = keypress_count = average_word = average_keys = capital_count = special_count = 0;
var generateType = 'Lat';
var lastUpdate = -1;

function testTest() {
	words = parsedWords;
	addWords();
}

function analyse() {
	var input = document.getElementById('words_input');
	char_count = input.value.length;
	//Remove extra spaces and then split
	parsedWords = input.value.replace(/\s+/g, " ").split(' ');
	deepAnalysis(parsedWords);
	word_count = input.value == "" ? 0 : parsedWords.length;
	standard_word_count = Math.floor(char_count/5);

		
	document.getElementById('character_count').innerHTML = char_count;
	document.getElementById('word_count').innerHTML = word_count;
	document.getElementById('standard_word_count').innerHTML = standard_word_count;
	document.getElementById('special_count').innerHTML = special_count;
	document.getElementById('keypress_count').innerHTML = keypress_count;
	document.getElementById('word_length').innerHTML = word_length;
	document.getElementById('word_keypresses').innerHTML = average_keys;
	lastUpdate = new Date();
	setTimeout(function() {
		if(new Date() - lastUpdate > 400) testTest();
	}, 500);
	
}

function deepAnalysis(parsedWords) {
	var freqMap = {};
	var totalLength = 0;
	var length = 0;
	parsedWords.forEach(function(w) {
		if(w !== "") {
			if(!freqMap[w]) {
				freqMap[w] = 0;
			}
			freqMap[w] += 1;
			totalLength += w.length;
			length++;
		}
	});
	word_length = length === 0 ? 0 : Math.round((totalLength/length) * 100)/100;
	//document.getElementById('word_length').innerHTML =  length === 0 ? 0 : Math.round((totalLength/length) * 100)/100;
	var out = "\n";
	var values = Object.keys(freqMap).map(function(v) { return {word:v, count:freqMap[v]} });
	values = values.sort(function(a, b) { return b.count - a.count});

	keypress_count = 0;
	average_keys = 0;	
	special_count = 0;
	var word_keys = 0;
	values.slice(0, Math.min(70, values.length)).forEach(function(v) {
		for(var i = 0; i < v.word.length; i++) {
			var val = charValue(v.word.charAt(i));
			if(val > 1) special_count++;
			word_keys += val;
			keypress_count += val;
		}
		if(v.count > 1) out += v.count + " * "; 
		out += v.word + " (" + word_keys + "), ";
		word_keys = 0;
	});
	average_keys = Math.round((keypress_count/parsedWords.length) * 100)/100;
	$('#words').text(out);
}

function charValue(char) {
	if(char.match(/[A-Z]/)) { //English
		return 2;
	}//|| char.match(/[\u00c0-\u00d1]/)
	if(char.match(/[!"£$%^&*()_+¬{}:@~<>?|àèòéíóúïüóâêîôûÆØÅĉŭŝĝĵĥÄÖάήίώόύέΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩéúíóýēūīāšģķļžčņąčęėįšųūžژآءّ َ ُ ِáąćęłńóśźżãõéíóúăâîșțéíóúÖÜÇŞĞİăâàạảãđéèẻẽẹêíìỉĩịôơóòỏõọưúùủũụýỳỷỹỵ]/) ) {
		return 2; //All of the non English two keypress values I have found so far
	}				//Korean
	if(char.match(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f\ua960-\ua97f]/) || char.match(/[ÁÉÍÓÚÝÂÊÎÔÛϊϋΐΰΆΉΊΏΌΎΈÉÝÚÍÓÀÈÒÉÍÓÚÏÜÁàâêîôûắằặẳẵấầậẩẫếềểễệốồổỗộớờởỡợứừửữự]/)) {
		return 3;
	}
	if(char.match(/[ĚŠČŘŽŇŤĎŮÀÈÙΪΫ]/)) {
		return 4;
	}
	if(char.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/) || char.match(/[\u4e00-\u9fcc\u3400-\u4db5]/) || char === 'Œ') {
		return 5;
	}
	return 1;
}

function generateText(behaviour) {
	var length = parseInt($("#length_input").val(), 10);
	if(length) {
		$.getJSON('generate.json', { 'length': length, "type": generateType }, function(data) {
	        if(behaviour) {
	        	$('#words_input').val(data.text);
	        	trimText();
	        } else {
	        	insertText(data.text);
	        }
	        analyse();
	    });
	}
}

function insertText(text) {
	var caretPos = document.getElementById('words_input').selectionStart;
	if(!caretPos) caretPos = 0;
	console.log("Position " + caretPos);
	var current = $("#words_input").val();
	$("#words_input").val(current.substring(0, caretPos) + text + current.substring(caretPos));
	trimText();
}

function trimText() {
	$('#words_input').val($('#words_input').val().substring(0, 10000));
}
 
/* Characters
	Uppercase (2) char.toUpperCase == char
	Catalan -
	(2) àèò éíóú ïü
	(3) ÀÈÒ ÉÍÓÚ ÏÜ
	Chinese and Japanese - 
	(5)
	Czech - 
	(2) ó 
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

  		//http://stackoverflow.com/a/15034560/4191572
	var japanese = char.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/);
	//http://stackoverflow.com/a/11415841/4191572 Can only match 4 digit codes
	var chinese = char.match(/[\u4e00-\u9fcc\u3400-\u4db5]/);
	//https://en.wikipedia.org/wiki/Korean_language_and_computers
	var korean = char.match(/[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7bo-\ud7ff]/); 

	//http://www.geocities.ws/click2speak/unicode/chars_ca.html
	var catalan = char.match(/[\u00c0-\u00d1]/);
	var czech2 = char === 'ó';
	var czech3 = char.match(/[ÁÉÍÓÚÝ]/);
	var czech4 = char.match(/[ĚŠČŘŽŇŤĎŮ]/);
	var danish = char.match(/[ÆØÅ]/);
	var dutch = char === 'é';
	var esperanto = char.match(/[ĉŭŝĝĵĥ]/);
	var french2 = char.match(/[âêîôû]/);
	var french3 = char.match(/[ÂÊÎÔÛ]/);
	var french4 = char.match(/[ÀÈÙ]/);
	var french5 = char === 'Œ';
	var german2 = char.match(/[ÄÖÜ]/);
	var greek2 = char.match(/[άήίώόύέΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/);
	var greek3 = char.match(/[ϊϋΐΰΆΉΊΏΌΎΈ]/);
	var greek4 = char.match(/[ΪΫ]/);
	var icelandic2 = char.match(/[éúíóáý]/);
	var icelandic3 = char.match(/[ÉÝÚÍÓÁ]/);
	var italian = char === 'é'
	var latvian = char.match(/[ēūīāšģķļžčņ]/);
	var lithuanian = char.match(/[ąčęėįšųūž]/);
	var persian = char.match(/[ژ آ ء ّ َ ُ ِ]/);
	var polish = char.match(/[ąćęłńóśźż]/);
	var portuguese2 = char.match(/[ãõáéíóú]/);
	var portuguese3 = char.match(/[àâêîôû]/);
	var romainian = char.match(/[ăâîșț]/);
	var spanish = char.match(/[áéíóú]/);
	var turkish = char.match(/[ÖÜÇŞĞİ]/);
	var vietnamese2 = char.match(/[ăâáàạảãđéèẻẽẹêíìỉĩịôơóòỏõọưúùủũụýỳỷỹỵ]/);
	var vietnamese3 = char.match(/[ắằặẳẵấầậẩẫếềểễệốồổỗộớờởỡợứừửữự]/);
*/