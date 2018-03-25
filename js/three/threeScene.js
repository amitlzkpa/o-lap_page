
var scene, renderer;
var camera, cameraControls;

var WIDTH_FACTOR = 0.66;


if( !init() )	animate();

// init the scene
function init(){

	if( Detector.webgl ){
		renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		renderer.setClearColor( 0xf5f5dc, 1 );
	// uncomment if webgl is required
	//}else{
	//	Detector.addGetWebGLMessage();
	//	return true;
	}else{
		renderer	= new THREE.CanvasRenderer();
	}
    renderer.setSize( (window.innerWidth * WIDTH_FACTOR), window.innerHeight );
	document.getElementById('viewport').appendChild(renderer.domElement);


	// create a scene
	scene = new THREE.Scene();

	// put a camera in the scene
    camera = new THREE.PerspectiveCamera(
        35,
        (window.innerWidth * WIDTH_FACTOR) / window.innerHeight,
        1,
        10000
    );
    camera.position.set( -2000, 800, 1200 );
    camera.lookAt( scene.position );
    scene.add( camera );

	// create a camera contol
	cameraControls	= new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.autoRotate = false;

	var gridHelper = new THREE.GridHelper(10000, 100);
	scene.add(gridHelper);

	// transparently support window resize
	THREEx.WindowResize.bind(renderer, camera, WIDTH_FACTOR);
	// allow 'p' to make screenshot
	THREEx.Screenshot.bindKey(renderer);
	// allow 'f' to go fullscreen where this feature is supported
	if( THREEx.FullScreen.available() ){
		THREEx.FullScreen.bindKey();		
		// document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
	}

    var light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
    scene.add( light );

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(100, 100, 50);
    scene.add(dirLight);
}

// animation loop
function animate() {

	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame( animate );

	// do the render
	render();
}

// render the scene
function render() {

	// update camera controls
    cameraControls.target.set( 0, 0, 0 );
	cameraControls.update();

	// actually render the scene
	renderer.render( scene, camera );
}