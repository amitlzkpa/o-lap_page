




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
var matMesh_default = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading, transparent: true, opacity: 0.4 });


function get3Crv(ptArr) {
	var crv = verb.geom.NurbsCurve.byPoints( ptArr, 2 );
	var line3 = new THREE.Line( crv.toThreeGeometry(), matLine_black );
	return line3;
}


function get3Mesh(crvArr) {
	var nSrf = verb.geom.NurbsSurface.byLoftingCurves( crvArr, 2 );
	var mesh3 = new THREE.Mesh( nSrf.toThreeGeometry(), matMesh_default );
	return mesh3;
}


function map_range(value, low1, high1, low2, high2, interp="lin") {
	var val = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    return val;
}



// http://www.wolframalpha.com/examples/math/algebra/polynomials/
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

var ht_add_y = 0;
var ht_add_z = 0;


function updatePts() {

	// age alterations - scale the whole design by a factor depending on age
	var age = Design_A.inputState.age;
	var agemin = Design_A.inputs.age.min;
	var agemax = Design_A.inputs.age.max;
	// scale factor is non-linear and follows a quadratic curve
	var sc = getAgeMul(age);

	// scale all points by value
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



	// high-back alterations - move certain parts of base, back, top and seat curve backwards and upwards
	// (move it back to avoid the feeling of sitting against a vertical wall) 
	ht_add_y = Design_A.inputState["high-back"] ? 120 : 0;
	ht_add_z = Design_A.inputState["high-back"] ? 40 : 0;

	// move end of base-curve back to give more grounding
	i_bs_pts[2][2] += ht_add_z;
	o_bs_pts[2][2] += ht_add_z;
	i_bs_pts_mirr[2][2] += ht_add_z;
	o_bs_pts_mirr[2][2] += ht_add_z;
	i_bk_pts[0][2] += ht_add_z;
	o_bk_pts[0][2] += ht_add_z;
	i_bk_pts_mirr[0][2] += ht_add_z;
	o_bk_pts_mirr[0][2] += ht_add_z;

	// move back curve up and back
	i_bk_pts[1][1] += ht_add_y; i_bk_pts[1][2] += ht_add_z;
	i_bk_pts[2][1] += ht_add_y; i_bk_pts[2][2] += ht_add_z;
	o_bk_pts[1][1] += ht_add_y; o_bk_pts[1][2] += ht_add_z;
	o_bk_pts[2][1] += ht_add_y; o_bk_pts[2][2] += ht_add_z;
	i_bk_pts_mirr[1][1] += ht_add_y; i_bk_pts_mirr[1][2] += ht_add_z;
	i_bk_pts_mirr[2][1] += ht_add_y; i_bk_pts_mirr[2][2] += ht_add_z;
	o_bk_pts_mirr[1][1] += ht_add_y; o_bk_pts_mirr[1][2] += ht_add_z;
	o_bk_pts_mirr[2][1] += ht_add_y; o_bk_pts_mirr[2][2] += ht_add_z;

	// move top-curve full up and back
	i_tp_pts[0][1] += ht_add_y; i_tp_pts[0][2] += ht_add_z;
	i_tp_pts[1][1] += ht_add_y; i_tp_pts[1][2] += ht_add_z;
	i_tp_pts[2][1] += ht_add_y; i_tp_pts[2][2] += ht_add_z;
	o_tp_pts[0][1] += ht_add_y; o_tp_pts[0][2] += ht_add_z;
	o_tp_pts[1][1] += ht_add_y; o_tp_pts[1][2] += ht_add_z;
	o_tp_pts[2][1] += ht_add_y; o_tp_pts[2][2] += ht_add_z;
	i_tp_pts_mirr[0][1] += ht_add_y; i_tp_pts_mirr[0][2] += ht_add_z;
	i_tp_pts_mirr[1][1] += ht_add_y; i_tp_pts_mirr[1][2] += ht_add_z;
	i_tp_pts_mirr[2][1] += ht_add_y; i_tp_pts_mirr[2][2] += ht_add_z;
	o_tp_pts_mirr[0][1] += ht_add_y; o_tp_pts_mirr[0][2] += ht_add_z;
	o_tp_pts_mirr[1][1] += ht_add_y; o_tp_pts_mirr[1][2] += ht_add_z;
	o_tp_pts_mirr[2][1] += ht_add_y; o_tp_pts_mirr[2][2] += ht_add_z;

	// move only top of seat curve up and back
	i_st_pts[0][1] += ht_add_y; i_st_pts[0][2] += ht_add_z;
	o_st_pts[0][1] += ht_add_y; o_st_pts[0][2] += ht_add_z;
	i_st_pts_mirr[0][1] += ht_add_y; i_st_pts_mirr[0][2] += ht_add_z;
	o_st_pts_mirr[0][1] += ht_add_y; o_st_pts_mirr[0][2] += ht_add_z;



	// weight alterations - alters the width of the chair and sink
	var wt = Design_A.inputState.weight;
	var wtMin = Design_A.inputs.weight.min;
	var wtMax = Design_A.inputs.weight.max;
	// dispalcement factor is non-linear and follows a quadratic curve
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
var i_bs_pts = JSON.parse(JSON.stringify(i_bs_pts_start));
var i_bk_pts = JSON.parse(JSON.stringify(i_bk_pts_start));
var i_tp_pts = JSON.parse(JSON.stringify(i_tp_pts_start));
var i_st_pts = JSON.parse(JSON.stringify(i_st_pts_start));
var i_ft_pts = JSON.parse(JSON.stringify(i_ft_pts_start));


// outer profile
var o_bs_pts = JSON.parse(JSON.stringify(o_bs_pts_start));
var o_bk_pts = JSON.parse(JSON.stringify(o_bk_pts_start));
var o_tp_pts = JSON.parse(JSON.stringify(o_tp_pts_start));
var o_st_pts = JSON.parse(JSON.stringify(o_st_pts_start));
var o_ft_pts = JSON.parse(JSON.stringify(o_ft_pts_start));



var i_bs_pts_mirr =JSON.parse(JSON.stringify(i_bs_pts_mirr_start));
var i_bk_pts_mirr = JSON.parse(JSON.stringify(i_bk_pts_mirr_start));
var i_tp_pts_mirr = JSON.parse(JSON.stringify(i_tp_pts_mirr_start));
var i_st_pts_mirr = JSON.parse(JSON.stringify(i_st_pts_mirr_start));
var i_ft_pts_mirr = JSON.parse(JSON.stringify(i_ft_pts_mirr_start));


var o_bs_pts_mirr = JSON.parse(JSON.stringify(o_bs_pts_mirr_start));
var o_bk_pts_mirr = JSON.parse(JSON.stringify(o_bk_pts_mirr_start));
var o_tp_pts_mirr = JSON.parse(JSON.stringify(o_tp_pts_mirr_start));
var o_st_pts_mirr = JSON.parse(JSON.stringify(o_st_pts_mirr_start));
var o_ft_pts_mirr = JSON.parse(JSON.stringify(o_ft_pts_mirr_start));








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


	// add curves
	var i_bs = get3Crv(i_bs_pts);
	var i_bk = get3Crv(i_bk_pts);
	var i_tp = get3Crv(i_tp_pts);
	var i_st = get3Crv(i_st_pts);
	var i_ft = get3Crv(i_ft_pts);

	var o_bs = get3Crv(o_bs_pts);
	var o_bk = get3Crv(o_bk_pts);
	var o_tp = get3Crv(o_tp_pts);
	var o_st = get3Crv(o_st_pts);
	var o_ft = get3Crv(o_ft_pts);

	var i_bs_mirr = get3Crv(i_bs_pts_mirr);
	var i_bk_mirr = get3Crv(i_bk_pts_mirr);
	var i_tp_mirr = get3Crv(i_tp_pts_mirr);
	var i_st_mirr = get3Crv(i_st_pts_mirr);
	var i_ft_mirr = get3Crv(i_ft_pts_mirr);

	var o_bs_mirr = get3Crv(o_bs_pts_mirr);
	var o_bk_mirr = get3Crv(o_bk_pts_mirr);
	var o_tp_mirr = get3Crv(o_tp_pts_mirr);
	var o_st_mirr = get3Crv(o_st_pts_mirr);
	var o_ft_mirr = get3Crv(o_ft_pts_mirr);

	obj.add(i_bs);
	obj.add(i_bk);
	obj.add(i_tp);
	obj.add(i_st);
	obj.add(i_ft);

	obj.add(o_bs);
	obj.add(o_bk);
	obj.add(o_tp);
	obj.add(o_st);
	obj.add(o_ft);

	obj.add(i_bs_mirr);
	obj.add(i_bk_mirr);
	obj.add(i_tp_mirr);
	obj.add(i_st_mirr);
	obj.add(i_ft_mirr);

	obj.add(o_bs_mirr);
	obj.add(o_bk_mirr);
	obj.add(o_tp_mirr);
	obj.add(o_st_mirr);
	obj.add(o_ft_mirr);

	debugGroup.add(obj);




	// add surfaces
	var curves;

	curves = 	[
					verb.geom.NurbsCurve.byPoints( o_bs_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_bs_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_bs_pts_mirr, 2 ),
					verb.geom.NurbsCurve.byPoints( o_bs_pts_mirr, 2 )
				];
	var srf_bs = get3Mesh(curves);

	curves = 	[
					verb.geom.NurbsCurve.byPoints( o_bk_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_bk_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_bk_pts_mirr, 2 ),
					verb.geom.NurbsCurve.byPoints( o_bk_pts_mirr, 2 )
				];
	var srf_bk = get3Mesh(curves);

	curves = 	[
					verb.geom.NurbsCurve.byPoints( o_tp_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_tp_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_tp_pts_mirr, 2 ),
					verb.geom.NurbsCurve.byPoints( o_tp_pts_mirr, 2 )
				];
	var srf_tp = get3Mesh(curves);

	curves = 	[
					verb.geom.NurbsCurve.byPoints( o_st_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_st_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_st_pts_mirr, 2 ),
					verb.geom.NurbsCurve.byPoints( o_st_pts_mirr, 2 )
				];
	var srf_st = get3Mesh(curves);

	curves = 	[
					verb.geom.NurbsCurve.byPoints( o_ft_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_ft_pts, 2 ),
					verb.geom.NurbsCurve.byPoints( i_ft_pts_mirr, 2 ),
					verb.geom.NurbsCurve.byPoints( o_ft_pts_mirr, 2 )
				];
	var srf_ft = get3Mesh(curves);

	debugGroup.add(srf_bs);
	debugGroup.add(srf_bk);
	debugGroup.add(srf_tp);
	debugGroup.add(srf_st);
	debugGroup.add(srf_ft);





}


