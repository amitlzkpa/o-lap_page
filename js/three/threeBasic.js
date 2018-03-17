

function addCurveToScene(geom, material){
    material = material || new THREE.LineBasicMaterial({ linewidth: 2, color: 0xdcdcdc});
    scene.add( new THREE.Line( geom, material ) );
}

function addLineToScene(pts, mat){
    addCurveToScene(asGeometry(asVector3(pts)), mat);
}

function addMeshToScene(mesh, material, wireframe ){
    material = material || new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading, transparent: true, opacity: 0.4 } )

//    new THREE.MeshPhongMaterial({
//                               specular: '#ffffff',
//                               color: '#8e8e8e',
//                               side: THREE.DoubleSide,
//                               ambient: '#ffffff',
//                               emissive: '#111111',
//                               shininess: 40
//                             });

    scene.add( new THREE.Mesh( mesh, material ) );

    if (wireframe){
        var material2 = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide, wireframe: true } );
        var mesh2 = new THREE.Mesh( mesh, material2 );
        scene.add( mesh2 );
    }
}

function asVector3(pts){
    return pts.map(function(x){
        return new THREE.Vector3(x[0],x[1],x[2]);
    });
}

function asGeometry(threePts){
    var geometry = new THREE.Geometry();
    geometry.vertices.push.apply( geometry.vertices, threePts );
    return geometry;
}

function benchmark(func, runs){
	var d1 = Date.now();
	for (var i = 0 ; i < runs; i++)
		res = func();
	var d2 = Date.now();
	return { result : res, elapsed : d2-d1, each : (d2-d1)/runs };
}

function pointsAsGeometry(pts){
    return asGeometry( asVector3(pts) )
}

function addPointsToScene(pts){

    var geom = asGeometry( asVector3( pts ) );
    var cloudMat2 = new THREE.PointCloudMaterial({ size: 6.5, sizeAttenuation: false, color: 0xffffff });
    var cloud2 = new THREE.PointCloud( geom, cloudMat2 );

    scene.add( cloud2 );
}

