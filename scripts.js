let cardData;
let search = document.getElementById("search");
let input = document.getElementById("input");
let output = document.getElementById("output");
let displaySelect = document.getElementById("displaySelect");
let langSelect = document.getElementById("langSelect");

$.getJSON('https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json', function(data) {
	cardData = data;
});


search.onclick = input.onchange = function() {
	let resultsFound = 0;
	output.innerHTML = "";

	let inputWords = input.value.toLowerCase().split(" ");
	let searchKeys = "name text type race rarity cardClass".split(" ");

	for(key in cardData) {
		let validMatch = true;

		for(inputWord in inputWords) {
			let wordFound = false;
			for(searchKey in searchKeys) {
				if(cardData[key][searchKeys[searchKey]] && cardData[key][searchKeys[searchKey]].toLowerCase().indexOf(inputWords[inputWord]) != -1) {
					wordFound = true;
					break;
				}
			}
			if(!wordFound) {
				validMatch = false;
			}
		}

		if(validMatch) {
			resultsFound++;
			
			output.innerHTML += formatCardData(cardData[key]);		
		}
	}
	output.innerHTML = resultsFound + " result" + (resultsFound==1?"":"s") + " found<br>" + output.innerHTML;
}

//"deDE enGB enUS esES esMX frFR itIT jaJP koKR plPL ptBR ptPT ruRU thTH zhCN zhTW"

function formatCardData(data) {
	if(displaySelect.value == "text") {
		let str = "<hr>";

		str += "Name: <a onclick='window.open(\"https://hearthstone.gamepedia.com/" + 
		data.name.replace("'","%27").replace(" ", "_") + "\", \"_blank\");'>" + data.name +
			"</a><br>Type: " + data.type +
			"<br>Class: " + data.cardClass +
			"<br>Rarity: " + data.rarity +
			"<br>Set: " + data.set +
			"<br>Cost: " + data.cost +
			(data.attack?"<br>Attack: "+data.attack:"") +
			(data.health?"<br>Health: "+data.health:"") +
			(data.durability?"<br>Health: "+data.durability:"") +
			(data.armor?"<br>Armor: "+data.armor:"") +
			(data.race?"<br>Race: "+data.race:"") +
			"<br>Text: " + data.text +
			"<br>Flavor: " + data.flavor;
		return str;
		// return data.name + "<br>"; //TODO: improve formating and styling. show more info.
	}
	//using escape for quote instead of single quote because some cards have apostrophies in name
	return "<img class='hearth-card' src='https://art.hearthstonejson.com/v1/render/latest/" +
		langSelect.value + "/" + 
		(displaySelect.value=="small"?"256":"512") + "x/" + data.id + 
		".png' onclick='window.open(\"https://hearthstone.gamepedia.com/" + 
		data.name.replace("'","%27").replace(" ", "_") + "\", \"_blank\");' title=\"" + 
		data.name + "\">";
}

function getRandom() {
	let card = cardData[Math.floor(Math.random()*cardData.length)];
	input.value = card.name;
	//below copied from input function
	output.innerHTML = formatCardData(card); 
}