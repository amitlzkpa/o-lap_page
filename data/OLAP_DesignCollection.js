

// var OLAP_DesignNames = ["Plato", "Newton"];
var OLAP_DesignNames = ["Plato"];
var OLAP_DesignCollection =  {
	"Plato": 	{
					"name": "Plato",
					"git-url": "https://github.com/amitlzkpa/o-lap_plato"
			 	},
	"Newton": 	{
					"name": "Newton",
					"git-url": null
			 	}
};






var $gall = $("#gall");

async function loadData(collData) {
	var name = collData["name"];
	var gitUrl = collData["git-url"];
	var gitAuth = gitUrl.split('/')[3];
	var gitRepo = gitUrl.split('/')[4];
	var displayImageUrl = `https://raw.githubusercontent.com/${gitAuth}/${gitRepo}/master/design/display.jpg`;
	var infoJsonUrl = `https://raw.githubusercontent.com/${gitAuth}/${gitRepo}/master/design/info.json`;
	var infoJson = await $.getJSON(infoJsonUrl);
	var cardHtml = 	`
						<a href="./app.html?a=${gitAuth}&r=${gitRepo}">
					        <div class="card">
								<div class="card-image">
									<img src="${displayImageUrl}">
									<span class="card-title black-text">
									<big>${name}</big>
									</br>
									<small>${infoJson["version"]}</small>
									</span>
								</div>
								<div class="card-content grey-text">
									<p>${infoJson["short_desc"]}</p>
									<p>${infoJson["designer"]}</p>
								</div>
					        </div>
				        </a>
					`;
	$gall.append(cardHtml);
}



async function loadAllDesigns() {

	$gall.empty();
	for (var i = 0; i < OLAP_DesignNames.length; i++) {
		var collData = OLAP_DesignCollection[OLAP_DesignNames[i]];
		await loadData(collData);
	}

};

loadAllDesigns();


