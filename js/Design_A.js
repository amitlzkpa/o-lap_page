




var Design_A = new OLAPDesignObject();



Design_A.inputs = {

	"params": ["age", "weight", "high-back", "colour", "roo"],

	"age": { 
		"type": "slider",
		"label": "Age",
		"default": 24,
		"min": 12,
		"max": 60
	},
	"weight": { 
		"type": "slider",
		"label": "Weight",
		"default": 65,
		"min": 15,
		"max": 150
	},
	"high-back": {
		"type": "bool",
		"label": "High-back",
		"default": false
	},
	"colour": {
		"type": "select",
		"label": "Colour",
		"default": "red",
		"choices": ["red", "blue", "green"]
	},
	"roo": {
		"type": "select",
		"label": "Gooey",
		"default": "x",
		"choices": ["x", "y", "z"]
	}
}




Design_A.onParamChange = function(params, group) {
		var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		var cubeA = new THREE.Mesh( geometry, material );
		cubeA.position.set( params.weight, params.age, 0 );
		group.add(cubeA);

		// console.log(params);
}




Design_A.updateGeom = function(group) {
	
}


