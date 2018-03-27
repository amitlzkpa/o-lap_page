

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


var s = "https://raw.githubusercontent.com/amitlzkpa/o-lap_plato/master/design/display.jpg";





function loadAllDesigns() {

	var $gall = $("#gall");
	$gall.empty();
	for (var i = 0; i < OLAP_DesignNames.length; i++) {
		var collData = OLAP_DesignCollection[OLAP_DesignNames[i]];
		var name = collData["name"];
		var gitUrl = collData["git-url"];
		var gitAuth = gitUrl.split('/')[3];
		var gitRepo = gitUrl.split('/')[4];
		var displayImageUrl = `https://raw.githubusercontent.com/${gitAuth}/${gitRepo}/master/design/display.jpg`;
		var cardHtml = 	`
					        <div class="card">
					          <div class="card-image">
					            <img src="${displayImageUrl}">
					            <span class="card-title black-text">${name}</span>
					          </div>
					          <div class="card-content">
					            <p>I am a very simple card. I am good at containing small bits of information.
					            I am convenient because I require little markup to use effectively.</p>
					          </div>
					          <div class="card-action">
					            <a href="./app.html">This is a link</a>
					          </div>
					        </div>
						`;
		$gall.append(cardHtml);
	}

};

loadAllDesigns();


