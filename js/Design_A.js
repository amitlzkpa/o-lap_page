




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



var matLine_black = new THREE.LineBasicMaterial({ linewidth: 4, color: 0x000000});



function get3Crv(ptArr, debugGroup) {
	var crv = verb.geom.NurbsCurve.byPoints( ptArr, 2 );
	var line3 = new THREE.Line( crv.toThreeGeometry(), matLine_black );
	return line3;
}



Design_A.inputState = {}



// inner profile
var i_bs_p1 = [1, 0, 0];
var i_bs_p2 = [1, 0, -7];
var i_bs_p3 = [1, 0, -20];


var i_bk_p1 = [1, 0, -20];
var i_bk_p2 = [1, 16, -22];
var i_bk_p3 = [1, 20, -21];


var i_tp_p1 = [1, 20, -21];
var i_tp_p2 = [1, 21, -19];
var i_tp_p3 = [1, 20, -17];


var i_st_p1 = [1, 20, -17];
var i_st_p2 = [1, 10, -14];
var i_st_p3 = [1, 8, -2];


var i_ft_p1 = [1, 8, -2];
var i_ft_p2 = [1, 8, 1];
var i_ft_p3 = [1, 0, 0];



// outer profile
var o_bs_p1 = [12, 0, 1];
var o_bs_p2 = [12, 0, -8];
var o_bs_p3 = [12, 0, -21];


var o_bk_p1 = [12, 0, -21];
var o_bk_p2 = [12, 16, -23];
var o_bk_p3 = [12, 20, -22];


var o_tp_p1 = [12, 20, -22];
var o_tp_p2 = [12, 21, -20];
var o_tp_p3 = [12, 20, -18];


var o_st_p1 = [12, 20, -18];
var o_st_p2 = [12, 10, -15];
var o_st_p3 = [12, 8, -3];


var o_ft_p1 = [12, 8, -3];
var o_ft_p2 = [12, 8, 2];
var o_ft_p3 = [12, 0, 1];


Design_A.init = function() {
}



Design_A.onParamChange = function(params, group) {
	this.inputState = params;
	// i_st_p2[1] = params.age;
}



Design_A.updateGeom = function(group) {
}









Design_A.updateGeom_debug = function(debugGroup) {

	var ptArr;

	ptArr = [i_bs_p1, i_bs_p2, i_bs_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [i_bk_p1, i_bk_p2, i_bk_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [i_tp_p1, i_tp_p2, i_tp_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [i_st_p1, i_st_p2, i_st_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [i_ft_p1, i_ft_p2, i_ft_p3];
	debugGroup.add( get3Crv(ptArr) );



	ptArr = [o_bs_p1, o_bs_p2, o_bs_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [o_bk_p1, o_bk_p2, o_bk_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [o_tp_p1, o_tp_p2, o_tp_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [o_st_p1, o_st_p2, o_st_p3];
	debugGroup.add( get3Crv(ptArr) );

	ptArr = [o_ft_p1, o_ft_p2, o_ft_p3];
	debugGroup.add( get3Crv(ptArr) );

}


