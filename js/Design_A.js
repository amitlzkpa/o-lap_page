




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
		"min": 30,
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



Design_A.inputState = {}



var matLine_black = new THREE.LineBasicMaterial({ linewidth: 4, color: 0x000000});



function get3Crv(ptArr, debugGroup) {
	var crv = verb.geom.NurbsCurve.byPoints( ptArr, 2 );
	var line3 = new THREE.Line( crv.toThreeGeometry(), matLine_black );
	return line3;
}


function map_range(value, low1, high1, low2, high2, interp="lin") {
	var val = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return val;
}



// quadratic functions

// 30 -> 1	|	60 -> 1.02	|	120 -> 1.2		|	150 -> 1.4
function getWeightMul(wt) {
	return (0.0000333333 * Math.pow(wt, 2)) - (0.00273333 * wt) + 1.056;
}


// 12 -> 0.6	|	30 -> 0.9	|	50 -> 1		|	60 -> 0.95
function getAgeMul(age) {
	return (-0.000315247 * (Math.pow(age, 2))) + (0.0300255 * age) + 0.284562
}



var w_mul = 1;
var w_innerMul = 1;
var w_outerMul = 1.7;


function updatePts() {

	var age = Design_A.inputState.age;
	var agemin = Design_A.inputs.age.min;
	var agemax = Design_A.inputs.age.max;
	var sc = getAgeMul(age);

	i_bs_pts.forEach((d, i) => { d[0] = i_bs_pts_start[i][0] * sc; d[1] = i_bs_pts_start[i][1] * sc; d[2] = i_bs_pts_start[i][2] * sc; });
	i_bk_pts.forEach((d, i) => { d[0] = i_bk_pts_start[i][0] * sc; d[1] = i_bk_pts_start[i][1] * sc; d[2] = i_bk_pts_start[i][2] * sc; });
	i_tp_pts.forEach((d, i) => { d[0] = i_tp_pts_start[i][0] * sc; d[1] = i_tp_pts_start[i][1] * sc; d[2] = i_tp_pts_start[i][2] * sc; });
	i_st_pts.forEach((d, i) => { d[0] = i_st_pts_start[i][0] * sc; d[1] = i_st_pts_start[i][1] * sc; d[2] = i_st_pts_start[i][2] * sc; });
	i_ft_pts.forEach((d, i) => { d[0] = i_ft_pts_start[i][0] * sc; d[1] = i_ft_pts_start[i][1] * sc; d[2] = i_ft_pts_start[i][2] * sc; });

	o_bs_pts.forEach((d, i) => { d[0] = o_bs_pts_start[i][0] * sc; d[1] = o_bs_pts_start[i][1] * sc; d[2] = o_bs_pts_start[i][2] * sc; });
	o_bk_pts.forEach((d, i) => { d[0] = o_bk_pts_start[i][0] * sc; d[1] = o_bk_pts_start[i][1] * sc; d[2] = o_bk_pts_start[i][2] * sc; });
	o_tp_pts.forEach((d, i) => { d[0] = o_tp_pts_start[i][0] * sc; d[1] = o_tp_pts_start[i][1] * sc; d[2] = o_tp_pts_start[i][2] * sc; });
	o_st_pts.forEach((d, i) => { d[0] = o_st_pts_start[i][0] * sc; d[1] = o_st_pts_start[i][1] * sc; d[2] = o_st_pts_start[i][2] * sc; });
	o_ft_pts.forEach((d, i) => { d[0] = o_ft_pts_start[i][0] * sc; d[1] = o_ft_pts_start[i][1] * sc; d[2] = o_ft_pts_start[i][2] * sc; });

	i_bs_pts_mirr.forEach((d, i) => { d[0] = i_bs_pts_mirr_start[i][0] * sc; d[1] = i_bs_pts_mirr_start[i][1] * sc; d[2] = i_bs_pts_mirr_start[i][2] * sc; });
	i_bk_pts_mirr.forEach((d, i) => { d[0] = i_bk_pts_mirr_start[i][0] * sc; d[1] = i_bk_pts_mirr_start[i][1] * sc; d[2] = i_bk_pts_mirr_start[i][2] * sc; });
	i_tp_pts_mirr.forEach((d, i) => { d[0] = i_tp_pts_mirr_start[i][0] * sc; d[1] = i_tp_pts_mirr_start[i][1] * sc; d[2] = i_tp_pts_mirr_start[i][2] * sc; });
	i_st_pts_mirr.forEach((d, i) => { d[0] = i_st_pts_mirr_start[i][0] * sc; d[1] = i_st_pts_mirr_start[i][1] * sc; d[2] = i_st_pts_mirr_start[i][2] * sc; });
	i_ft_pts_mirr.forEach((d, i) => { d[0] = i_ft_pts_mirr_start[i][0] * sc; d[1] = i_ft_pts_mirr_start[i][1] * sc; d[2] = i_ft_pts_mirr_start[i][2] * sc; });

	o_bs_pts_mirr.forEach((d, i) => { d[0] = o_bs_pts_mirr_start[i][0] * sc; d[1] = o_bs_pts_mirr_start[i][1] * sc; d[2] = o_bs_pts_mirr_start[i][2] * sc; });
	o_bk_pts_mirr.forEach((d, i) => { d[0] = o_bk_pts_mirr_start[i][0] * sc; d[1] = o_bk_pts_mirr_start[i][1] * sc; d[2] = o_bk_pts_mirr_start[i][2] * sc; });
	o_tp_pts_mirr.forEach((d, i) => { d[0] = o_tp_pts_mirr_start[i][0] * sc; d[1] = o_tp_pts_mirr_start[i][1] * sc; d[2] = o_tp_pts_mirr_start[i][2] * sc; });
	o_st_pts_mirr.forEach((d, i) => { d[0] = o_st_pts_mirr_start[i][0] * sc; d[1] = o_st_pts_mirr_start[i][1] * sc; d[2] = o_st_pts_mirr_start[i][2] * sc; });
	o_ft_pts_mirr.forEach((d, i) => { d[0] = o_ft_pts_mirr_start[i][0] * sc; d[1] = o_ft_pts_mirr_start[i][1] * sc; d[2] = o_ft_pts_mirr_start[i][2] * sc; });



	var wt = Design_A.inputState.weight;
	var wtMin = Design_A.inputs.weight.min;
	var wtMax = Design_A.inputs.weight.max;
	var w_mul = getWeightMul(wt);
	var innerX = i_bs_pts[0][0] * w_mul * w_innerMul;
	var outerX = i_bs_pts[0][0] * w_mul * w_outerMul;

	i_bs_pts.forEach(d => d[0] = innerX);
	i_bk_pts.forEach(d => d[0] = innerX);
	i_tp_pts.forEach(d => d[0] = innerX);
	i_st_pts.forEach(d => d[0] = innerX);
	i_ft_pts.forEach(d => d[0] = innerX);

	o_bs_pts.forEach(d => d[0] = outerX);
	o_bk_pts.forEach(d => d[0] = outerX);
	o_tp_pts.forEach(d => d[0] = outerX);
	o_st_pts.forEach(d => d[0] = outerX);
	o_ft_pts.forEach(d => d[0] = outerX);

	i_bs_pts_mirr.forEach(d => d[0] = -innerX);
	i_bk_pts_mirr.forEach(d => d[0] = -innerX);
	i_tp_pts_mirr.forEach(d => d[0] = -innerX);
	i_st_pts_mirr.forEach(d => d[0] = -innerX);
	i_ft_pts_mirr.forEach(d => d[0] = -innerX);

	o_bs_pts_mirr.forEach(d => d[0] = -outerX);
	o_bk_pts_mirr.forEach(d => d[0] = -outerX);
	o_tp_pts_mirr.forEach(d => d[0] = -outerX);
	o_st_pts_mirr.forEach(d => d[0] = -outerX);
	o_ft_pts_mirr.forEach(d => d[0] = -outerX);
}



//-----------------------------------------------------------



// inner profile
var i_bs_pts_start = [ 		[180, 0, 0], 		[180, 0, 252], 		[180, 0, 505] 		];
var i_bk_pts_start = [ 		[180, 0, 505], 		[180, 300, 640], 	[180, 632, 636] 	];
var i_tp_pts_start = [		[180, 632, 636], 	[180, 670, 577], 	[180, 620, 522] 	];
var i_st_pts_start = [		[180, 620, 522], 	[180, 285, 366], 	[180, 296, 14]		];
var i_ft_pts_start = [		[180, 296, 14], 	[180, 256, -63],	[180, 0, 0]			];


// outer profile
var o_bs_pts_start = [		[320, 0, 0], 		[320, 0, 240],		[320, 0, 480]		];
var o_bk_pts_start = [		[320, 0, 480],		[320, 340, 610],	[320, 707, 594]		];
var o_tp_pts_start = [		[320, 707, 594],	[320, 765, 515],	[320, 707, 465]		];
var o_st_pts_start = [		[320, 707, 465],	[320, 303, 330],	[320, 320, 13]		];
var o_ft_pts_start = [		[320, 320, 13],		[320, 205, -75],	[320, 0, 0]			];



var i_bs_pts_mirr_start = [ 	[-180, 0, 0], 		[-180, 0, 252], 	[-180, 0, 505] 		];
var i_bk_pts_mirr_start = [ 	[-180, 0, 505], 	[-180, 300, 640], 	[-180, 632, 636] 	];
var i_tp_pts_mirr_start = [		[-180, 632, 636], 	[-180, 670, 577], 	[-180, 620, 522] 	];
var i_st_pts_mirr_start = [		[-180, 620, 522], 	[-180, 285, 366], 	[-180, 296, 14]		];
var i_ft_pts_mirr_start = [		[-180, 296, 14], 	[-180, 256, -63],	[-180, 0, 0]		];


var o_bs_pts_mirr_start = [		[-320, 0, 0], 		[-320, 0, 240],		[-320, 0, 480]		];
var o_bk_pts_mirr_start = [		[-320, 0, 480],		[-320, 340, 610],	[-320, 707, 594]	];
var o_tp_pts_mirr_start = [		[-320, 707, 594],	[-320, 765, 515],	[-320, 707, 465]	];
var o_st_pts_mirr_start = [		[-320, 707, 465],	[-320, 303, 330],	[-320, 320, 13]		];
var o_ft_pts_mirr_start = [		[-320, 320, 13],	[-320, 205, -75],	[-320, 0, 0]		];



//-----------------------------------------------------------



// inner profile
var i_bs_pts = [ 	[180, 0, 0], 		[180, 0, 252], 		[180, 0, 505] 		];
var i_bk_pts = [ 	[180, 0, 505], 		[180, 300, 640], 	[180, 632, 636] 	];
var i_tp_pts = [	[180, 632, 636], 	[180, 670, 577], 	[180, 620, 522] 	];
var i_st_pts = [	[180, 620, 522], 	[180, 285, 366], 	[180, 296, 14]		];
var i_ft_pts = [	[180, 296, 14], 	[180, 256, -63],	[180, 0, 0]			];


// outer profile
var o_bs_pts = [	[320, 0, 0], 		[320, 0, 240],		[320, 0, 480]		];
var o_bk_pts = [	[320, 0, 480],		[320, 340, 610],	[320, 707, 594]		];
var o_tp_pts = [	[320, 707, 594],	[320, 765, 515],	[320, 707, 465]		];
var o_st_pts = [	[320, 707, 465],	[320, 303, 330],	[320, 320, 13]		];
var o_ft_pts = [	[320, 320, 13],		[320, 205, -75],	[320, 0, 0]			];



var i_bs_pts_mirr = [ 	[-180, 0, 0], 		[-180, 0, 252], 	[-180, 0, 505] 		];
var i_bk_pts_mirr = [ 	[-180, 0, 505], 	[-180, 300, 640], 	[-180, 632, 636] 	];
var i_tp_pts_mirr = [	[-180, 632, 636], 	[-180, 670, 577], 	[-180, 620, 522] 	];
var i_st_pts_mirr = [	[-180, 620, 522], 	[-180, 285, 366], 	[-180, 296, 14]		];
var i_ft_pts_mirr = [	[-180, 296, 14], 	[-180, 256, -63],	[-180, 0, 0]		];


var o_bs_pts_mirr = [	[-320, 0, 0], 		[-320, 0, 240],		[-320, 0, 480]		];
var o_bk_pts_mirr = [	[-320, 0, 480],		[-320, 340, 610],	[-320, 707, 594]	];
var o_tp_pts_mirr = [	[-320, 707, 594],	[-320, 765, 515],	[-320, 707, 465]	];
var o_st_pts_mirr = [	[-320, 707, 465],	[-320, 303, 330],	[-320, 320, 13]		];
var o_ft_pts_mirr = [	[-320, 320, 13],	[-320, 205, -75],	[-320, 0, 0]		];








Design_A.init = function() {
}



Design_A.onParamChange = function(params, group) {
	this.inputState = params;
	updatePts();
}



Design_A.updateGeom = function(group) {
}









Design_A.updateGeom_debug = function(debugGroup) {

	var obj = new THREE.Object3D();

	obj.add( get3Crv(i_bs_pts) );
	obj.add( get3Crv(i_bk_pts) );
	obj.add( get3Crv(i_tp_pts) );
	obj.add( get3Crv(i_st_pts) );
	obj.add( get3Crv(i_ft_pts) );

	obj.add( get3Crv(o_bs_pts) );
	obj.add( get3Crv(o_bk_pts) );
	obj.add( get3Crv(o_tp_pts) );
	obj.add( get3Crv(o_st_pts) );
	obj.add( get3Crv(o_ft_pts) );

	obj.add( get3Crv(i_bs_pts_mirr) );
	obj.add( get3Crv(i_bk_pts_mirr) );
	obj.add( get3Crv(i_tp_pts_mirr) );
	obj.add( get3Crv(i_st_pts_mirr) );
	obj.add( get3Crv(i_ft_pts_mirr) );

	obj.add( get3Crv(o_bs_pts_mirr) );
	obj.add( get3Crv(o_bk_pts_mirr) );
	obj.add( get3Crv(o_tp_pts_mirr) );
	obj.add( get3Crv(o_st_pts_mirr) );
	obj.add( get3Crv(o_ft_pts_mirr) );

	// console.log(obj.scale);
	// obj.scale.set( this.inputState.age/10, this.inputState.age/10, this.inputState.age/10 );
	// console.log(obj.scale);
	// console.log('------');

	debugGroup.add(obj);

}


