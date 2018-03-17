




var Design_A = new OLAPDesignObject();



Design_A.inputs = {

	"params": ["age", "weight", "high-back", "colour", "roo"],

	"age": { 
		"type": "slider",
		"label": "Age",
		"default": 24,
		"min": 12,
		"max": 20
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



Design_A.inputState = {}



var matLine_black = new THREE.LineBasicMaterial({ linewidth: 4, color: 0x000000});



function get3Crv(ptArr, debugGroup) {
	var crv = verb.geom.NurbsCurve.byPoints( ptArr, 2 );
	var line3 = new THREE.Line( crv.toThreeGeometry(), matLine_black );
	return line3;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



var w_baseWidth = 120;
var w_mul = 1;
var w_innerMul = 1;
var w_outerMul = 1.7;


function updatePts() {
	var wt = Design_A.inputState.weight;
	var wtMin = Design_A.inputs.weight.min;
	var wtMax = Design_A.inputs.weight.max;
	var w_mul = map_range(wt, wtMin, wtMax, 1, 2);
	var innerX = w_baseWidth * w_mul * w_innerMul;
	var outerX = w_baseWidth * w_mul * w_outerMul;

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
}





// inner profile
var i_bs_pts = [];
i_bs_pts[0] = [180, 0, 0];
i_bs_pts[1] = [180, 0, 252];
i_bs_pts[2] = [180, 0, 505];


var i_bk_pts = [];
i_bk_pts[0] = [180, 0, 505];
i_bk_pts[1] = [180, 300, 640];
i_bk_pts[2] = [180, 632, 636];


var i_tp_pts = [];
i_tp_pts[0] = [180, 632, 636];
i_tp_pts[1] = [180, 670, 577];
i_tp_pts[2] = [180, 620, 522];


var i_st_pts = [];
i_st_pts[0] = [180, 620, 522];
i_st_pts[1] = [180, 285, 366];
i_st_pts[2] = [180, 296, 14];


var i_ft_pts = [];
i_ft_pts[0] = [180, 296, 14];
i_ft_pts[1] = [180, 256, -63];
i_ft_pts[2] = [180, 0, 0];



// outer profile
var o_bs_pts = [];
o_bs_pts[0] = [320, 0, 0];
o_bs_pts[1] = [320, 0, 240];
o_bs_pts[2] = [320, 0, 480];


var o_bk_pts = [];
o_bk_pts[0] = [320, 0, 480];
o_bk_pts[1] = [320, 340, 610];
o_bk_pts[2] = [320, 707, 594];


var o_tp_pts = [];
o_tp_pts[0] = [320, 707, 594];
o_tp_pts[1] = [320, 765, 515];
o_tp_pts[2] = [320, 707, 465];


var o_st_pts = [];
o_st_pts[0] = [320, 707, 465];
o_st_pts[1] = [320, 303, 330];
o_st_pts[2] = [320, 320, 13];


var o_ft_pts = [];
o_ft_pts[0] = [320, 320, 13];
o_ft_pts[1] = [320, 205, -75];
o_ft_pts[2] = [320, 0, 0];



var i_bs_pts_mirr = [];
var i_bk_pts_mirr = [];
var i_tp_pts_mirr = [];
var i_st_pts_mirr = [];
var i_ft_pts_mirr = [];

var o_bs_pts_mirr = [];
var o_bk_pts_mirr = [];
var o_tp_pts_mirr = [];
var o_st_pts_mirr = [];
var o_ft_pts_mirr = [];



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

	i_bs_pts.forEach(d => d[0] = -d[0]);
	i_bk_pts.forEach(d => d[0] = -d[0]);
	i_tp_pts.forEach(d => d[0] = -d[0]);
	i_st_pts.forEach(d => d[0] = -d[0]);
	i_ft_pts.forEach(d => d[0] = -d[0]);

	o_bs_pts.forEach(d => d[0] = -d[0]);
	o_bk_pts.forEach(d => d[0] = -d[0]);
	o_tp_pts.forEach(d => d[0] = -d[0]);
	o_st_pts.forEach(d => d[0] = -d[0]);
	o_ft_pts.forEach(d => d[0] = -d[0]);

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

	console.log(obj.scale);
	obj.scale.set( this.inputState.age/10, this.inputState.age/10, this.inputState.age/10 );
	console.log(obj.scale);
	console.log('------');

	debugGroup.add(obj);

}


