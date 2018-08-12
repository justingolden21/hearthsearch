let cardData;
let input = document.getElementById("input");
let output = document.getElementById("output");

$.getJSON('https://api.hearthstonejson.com/v1/25770/enUS/cards.collectible.json', function(data) {
	cardData = data;
});


input.onchange = function() {
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
			//using escape for quote instead of single quote because some cards have apostrophies in name
			output.innerHTML += "<img class='hearth-card' src='https://art.hearthstonejson.com/v1/render/latest/enUS/256x/" + 
			cardData[key].id + ".png' onclick='window.open(\"https://hearthstone.gamepedia.com/" + 
			cardData[key].name.replace("'","%27").replace(" ", "_") + "\", \"_blank\");' title=\"" + 
			cardData[key].name + "\">"; 			
		}
	}
	output.innerHTML = resultsFound + " results found<br>" + output.innerHTML;
}