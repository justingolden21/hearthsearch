let cardData, search, input, output, displaySelect, langSelect, flavorCheckbox;

window.onload = function() {
	search = document.getElementById("search");
	input = document.getElementById("input");
	output = document.getElementById("output");
	displaySelect = document.getElementById("displaySelect");
	langSelect = document.getElementById("langSelect");
	flavorCheckbox = document.getElementById("flavorCheckbox");

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
}

// https://api.hearthstonejson.com/v1/
$.getJSON('https://api.hearthstonejson.com/v1/49534/enUS/cards.collectible.json', function(data) {
	cardData = data;
});

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
	}
	//using escape for quote instead of single quote because some cards have apostrophies in name
	return "<img class='hearth-card' src='https://art.hearthstonejson.com/v1/render/latest/" +
		langSelect.value + "/" + 
		(displaySelect.value=="small"?"256":"512") + "x/" + data.id + 
		".png' onclick='window.open(\"https://hearthstone.gamepedia.com/" + 
		data.name.replace("'","%27").replace(" ", "_") + "\", \"_blank\");' title=\"" + 
		data.name + "\">" +
		(flavorCheckbox.checked && data.flavor ? "<p>" + data.flavor + "</p>" : "");
}

function getRandom() {
	let card = cardData[Math.floor(Math.random()*cardData.length)];
	input.value = card.name;
	output.innerHTML = formatCardData(card); 
}

console.log("%c%s","color: #fff; background: #666; text-shadow:4px 4px 4px #333; font-size: 48px;"," HOWDY, I SEE YOU'RE LOOKING AT OUR CODE💻");