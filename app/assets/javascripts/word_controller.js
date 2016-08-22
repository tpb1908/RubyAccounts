//TODO- Load the words before the page loads
var page;
var words = [
    "the", "name", "of", "very", "to", "through", "and", "just", "a",
    "form", "in", "much", "is", "great", "it", "think", "you", "say",
    "that", "help", "he", "low", "was", "line", "for", "before", "on",
    "turn", "are", "cause", "with", "same", "as", "mean", "I", "differ",
    "his", "move", "they", "right", "be", "boy", "at", "old", "one",
    "too", "have", "does", "this", "tell", "from", "sentence", "or",
    "set", "had", "three", "by", "want", "hot", "air", "but", "well",
    "some", "also", "what", "play", "there", "small", "we", "end", "can",
    "put", "out", "home", "other", "read", "were", "hand", "all", "port",
    "your", "large", "when", "spell", "up", "add", "use", "even", "word",
    "land", "how", "here", "said", "must", "an", "big", "each", "high",
    "she", "such", "which", "follow", "do", "act", "their", "why", "time",
    "ask", "if", "men", "will", "change", "way", "went", "about", "light",
    "many", "kind", "then", "off", "them", "need", "would", "house",
    "write", "picture", "like", "try", "so", "us", "these", "again",
    "her", "animal", "long", "point", "make", "mother", "thing", "world",
    "see", "near", "him", "build", "two", "self", "has", "earth", "look",
    "father", "more", "head", "day", "stand", "could", "own", "go",
    "page", "come", "should", "did", "country", "my", "found", "sound",
    "answer", "no", "school", "most", "grow", "number", "study", "who",
    "still", "over", "learn", "know", "plant", "water", "cover", "than",
    "food", "call", "sun", "first", "four", "people", "thought", "may",
    "let", "down", "keep", "side", "eye", "been", "never", "now", "last",
    "find", "door", "any", "between", "new", "city", "work", "tree",
    "part", "cross", "take", "since", "get", "hard", "place", "start",
    "made", "might", "live", "story", "where", "saw", "after", "far",
    "back", "sea", "little", "draw", "only", "left", "round", "late",
    "man", "run", "year", "don't", "came", "while", "show", "press",
    "every", "close", "good", "night", "me", "real", "give", "life",
    "our", "few", "under", "stop", "open", "ten", "seem", "simple",
    "together", "several", "next", "vowel", "white", "toward", "children",
    "war", "begin", "lay", "got", "against", "walk", "pattern", "example",
    "slow", "ease", "center", "paper", "love", "often", "person",
    "always", "money", "music", "serve", "those", "appear", "both",
    "road", "mark", "map", "book", "science", "letter", "rule", "until",
    "govern", "mile", "pull", "river", "cold", "car", "notice", "feet",
    "voice", "care", "fall", "second", "power", "group", "town", "carry",
    "fine", "took", "certain", "rain", "fly", "eat", "unit", "room",
    "lead", "friend", "cry", "began", "dark", "idea", "machine", "fish",
    "note", "mountain", "wait", "north", "plan", "once", "figure", "base",
    "star", "hear", "box", "horse", "noun", "cut", "field", "sure",
    "rest", "watch", "correct", "color", "able", "face", "pound", "wood",
    "done", "main", "beauty", "enough", "drive", "plain", "stood", "girl",
    "contain", "usual", "front", "young", "teach", "ready", "week",
    "above", "final", "ever", "gave", "red", "green", "list", "oh",
    "though", "quick", "feel", "develop", "talk", "sleep", "bird", "warm",
    "soon", "free", "body", "minute", "dog", "strong", "family",
    "special", "direct", "mind", "pose", "behind", "leave", "clear",
    "song", "tail", "measure", "produce", "state", "fact", "product",
    "street", "black", "inch", "short", "lot", "numeral", "nothing",
    "class", "course", "wind", "stay", "question", "wheel", "happen",
    "full", "complete", "force", "ship", "blue", "area", "object", "half",
    "decide", "rock", "surface", "order", "deep", "fire", "moon", "south",
    "island", "problem", "foot", "piece", "yet", "told", "busy", "knew",
    "test", "pass", "record", "farm", "boat", "top", "common", "whole",
    "gold", "king", "possible", "size", "plane", "heard", "age", "best",
    "dry", "hour", "wonder", "better", "laugh", "true", "thousand",
    "during", "ago", "hundred", "ran", "am", "check", "remember", "game",
    "step", "shape", "early", "yes", "hold", "hot", "west", "miss",
    "ground", "brought", "interest", "heat", "reach", "snow", "fast",
    "bed", "five", "bring", "sing", "sit", "listen", "perhaps", "six",
    "fill", "table", "east", "travel", "weight", "less", "language",
    "morning", "among"];
    //Error correction, input alignment, text layout, highlighting
var settings = [0, 0, 0, 0];
var wordSet = []; //The words being used. The words array should only be pulled down once
var wordIndex = 0; //The current index
var input; //The input element
var lastInput = '';
var lastKey = -1; //The last key that was pressed. Used when moving backwards
var lastLength = 0; //The length of the input prioor to the current keypress, used for backspace on Android Chrome
var nextMovePosition = 0; //The position at which we next move lines
var positionForDeletion = 0; //When we move, all positions prior to this are deleted
var endLineQueue = []; //The queue of positions which mark the end of a line
var typeStack = []; //The stack of words that the user has typed. Used for backtracking, and analysis
var androidChrome = false; //Do we have to make a bunch of stupid checks?

function reset() {
    wordIndex = 0;
    lastKey = -1;
    lastLength = 0;
    nextMovePosition = 0;
    positionForDeletion = 0;
    endLineQueue = [];
    typeStack = [];
    addWords();
    input.value = '';
}

function setCSS() {
    var wordDiv = document.getElementById("word_container");
    wordDiv.style.fontSize = "1.5em";
    if(settings[2] === 0) {
        wordDiv.style.height = "6.5em";
    } else if(settings[2] === 1 || settings[2] === 2) {
        wordDiv.style.height = "2.2em";
    } else if(settings[2] === 3) {
        wordDiv.style.height = "6.5em";
    }
    var children = wordDiv.children;
    for(var i = 0; i < children.length; i++) {
        children[i].style.paddingLeft = "0.2em";
        children[i].style.paddingRight = "0.2em";
        if(settings[2] === 0 || settings[2] === 1 || settings[2] === 2) {
            children[i].style.display = "inline-block";
        } else if(settings[2] === 3) { //Single word
            children[i].style.textAlign = "center";
            children[i].style.display = "block";
        }
    }

    wordDiv.style.lineHeight = "2em";
    wordDiv.style.borderRadius = "0.25em";
    wordDiv.style.position = "relative";
    wordDiv.style.overflow = "hidden";
}

/*
    Fisher-Yates shuffle
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function findPage() {
    if(document.title.indexOf('Home') !== -1) {
        page = 0;
    } else if(document.title.indexOf('Create') !== -1) {
        page = 1;
    } else {
        page = -1;
    }
}

$(document).on('turbolinks:load', function() {
    findPage();
    input = document.getElementById("input");
    $("#refresh").click(function() { reset(); });

    $("input[name='error_correction']").change(function() {
        console.log("Error correction " + $(this).val());
        settings[0] = $(this).val() - 1;
    });
    $("input[name='input_alignment']").change(function() {
        console.log("Input alignment " + $(this).val());
        settings[1] = $(this).val() - 1;
    });
    $("input[name='text_layout']").change(function() {
        console.log("Text layout " + $(this).val());
        settings[2] = $(this).val() - 1;
    });
    $("input[name='highlighting']").change(function() {ss
        console.log("highlighting " + $(this).val());
        settings[3] = $(this).val() - 1;
    });


    if(page !== -1) {
        $('#input').keydown(function(e) {
            if(e.which === 229) { //Bullshit for Android Chrome
                androidChrome = true;
            } else {
                keyPress(e);
            }
        });
        /*
            Many of the checks can't happen until the key has been inserted
            but if we use onkeyup, it is not fast enough.
            A mix must be used
        */
        $('#input').keyup(function(e) {
            if(androidChrome) {
                keyPress(e); 
            }
            checkError();
        });

        function keyPress(e) {
            var key = e.which;
            /*
                If the keycode is 229, we can't get the actual keycode from the event,
                so we get it from the final character of the input, or the change in the input.
            */
            if(key === 229) {
                if(input.length < lastLength || (input.value === '' && lastInput === '')) { // Input length is less, so there was backspace
                     key = 8;
                } else {
                    key = input.value.charCodeAt(input.value.length - 1);
                }
            }
            if(key === 32) { //Space
                if(input.value === " ") { //Don't allow skipping with spaces. Make this an option
                    input.value = "";
                } else { //Move forward
                    if(androidChrome) {
                        //On Anroid Chrome, the event has fired, so we have to remove the space
                        input.value = input.value.slice(0, -1);
                    } else {
                        //On desktop, we can just prevent the space being input
                        e.preventDefault();
                    }
                    nextWord();
                }
            } else if(key === 8) { //Backspace
                //TODO- The previous word method should deal with each of the possible layouts
                if(input.value === "" && wordIndex > 0 && wordIndex >positionForDeletion) {
                    e.preventDefault();
                    previousWord();
                }
            }
            lastKey = key;
            lastLength = input.length;
            lastInput = input.value;
        }

        /*Handling resize events*/
        //Waiting for the screen resize to stop- http://stackoverflow.com/a/5926068/4191572
        var rtime;
        var timeout = false;
        var delta = 200;
        var windowWidth = $(window).width();
        $(window).resize(function() {
            rtime = new Date();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            if (new Date() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                if(windowWidth != $(window).width()) {
                    computeBoundaries();
                    windowWidth = $(window).width();
                }
            }               
        }
        if(page === 0) addWords();
    }
});

function addWords() {
    setCSS();
    if(page == 0) {
        wordSet = shuffle(words);
    } else {
        wordSet = words;
    }
    var spans = "";
    for(var i = 0; i < wordSet.length; i++) {
        spans += "<span num="+i+" class='word'>" + wordSet[i] + "</span>";
    }
    document.getElementById("word_container").innerHTML = spans;
    setCSS();
    computeBoundaries();
}

function computeBoundaries() {
    endLineQueue = [];
    if(settings[2] === 2) {
        for(var i = 0; i < wordSet.length; i++) endLineQueue[i] = i;
    } else {
        var wordContainer = $("#word_container");
        var previousTop = 0;
        for(var i = 0; i < wordSet.length; i++) {
            var top = wordContainer.find("[num="+i+"]").offset().top;
            if(top > previousTop) {
                endLineQueue.push(i-1);
                previousTop = top;
            }
        }
        endLineQueue.shift();
        if(settings[2] === 1) endLineQueue.shift();
        console.log("End line values: " + endLineQueue);
    }
    positionForDeletion = endLineQueue.shift();
    nextMovePosition = endLineQueue.shift();
}

function trim(string) {
    for(var i = string.length-1; i >=0; i++) {
         if(string.charAt(i) === " ") {
             string = string.slice(0, i);
         } else {
             break;
         }
     }
    return string;
}

function checkError() {
    var text = input.value;
    var required = wordSet[wordIndex];
    $('#word_container').find("[num="+wordIndex+"]").css('color',"#000000");
    for(var i = 0; i < text.length; i++) {
        if(text.charAt(i) !== required.charAt(i)) {
            $("#word_container").find("[num="+wordIndex+"]").css('background-color',"#d9534f");
            return;
        }
    }
    console.log("Setting no error");
    $("#word_container").find("[num="+wordIndex+"]").css('background-color',"#5cb85c");
}

function removeLine() {
    while($("#word_container").find("[num="+positionForDeletion+"]").length > 0) {
        $("#word_container").find("[num="+positionForDeletion--+"]").remove();
    }
}

function nextWord() {
    if(input.value !== " ") {
        typeStack.push(input.value);
        document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + "<br> " + input.value + " " + input.value.length +  ", " + wordSet[wordIndex] + " " + wordSet[wordIndex].length;
        if(input.value === wordSet[wordIndex]) {
            $("#word_container").find("[num="+wordIndex+"]").css('color',"#5cb85c");
            $("#word_container").find("[num="+wordIndex+"]").css('background-color',"#FFFFFF");
        } else {
            $("#word_container").find("[num="+wordIndex+"]").css('background-color',"#d9534f");
        }

        wordIndex++;
        lastLength = 0;
        input.value = "";
        if(wordIndex - 1 === nextMovePosition) {
            removeLine();
            nextMovePosition = endLineQueue.shift();
            positionForDeletion = wordIndex - 1;
        }
    }
}

function previousWord() {
    $("#word_container").find("[num="+wordIndex+"]").css('background-color',"#FFFFFF");
    console.log("Previous word");
    wordIndex--;
    input.value = typeStack.pop();
    checkError();
}