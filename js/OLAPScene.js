



var beforeSceneInitialized;
var afterSceneInitialized;
var beforeFrameUpdate;
var afterFrameUpdate;


var loadedFont;
var OLAP;
var scene, camera;
function initScene() {

    var initScene, renderer;
    // var raycaster;
    var WIDTH_FACTOR = 0.64;

    // loadedFont = loadFont('static/fonts/Open Sans_Regular.json');
    
    initScene = function() {

        beforeSceneInitialized();

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( (window.innerWidth * WIDTH_FACTOR), window.innerHeight );
        renderer.setClearColor( 0xf5f5dc, 1 );
        document.getElementById( 'viewport' ).appendChild( renderer.domElement );

        scene = new THREE.Scene();

        OLAP = new OLAPFramework(scene, renderer);

        camera = new THREE.PerspectiveCamera(
            35,
            (window.innerWidth * WIDTH_FACTOR) / window.innerHeight,
            1,
            10000
        );
        camera.position.set( -60, 50, 60 );
        camera.lookAt( scene.position );
        scene.add( camera );

        // console.log(renderer.domElement.getBoundingClientRect().right);
        var OLAPMouseManager = new OLAPMouseInputManager(OLAP, camera);
        window.addEventListener( 'mousemove', OLAPMouseManager.OnMouseMove, false );
        OLAP.addFrameUpdateListener(OLAPMouseManager);

        var light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
        scene.add( light );

        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(100, 100, 50);
        scene.add(dirLight);

        // scene.add(getGrid(200, 200, 3, 3));

        afterSceneInitialized();
    };



    var prevHighlight = null;
    var currHighlight = null;
    function highLightHoverObject(intersects) {
        if (intersects.length < 1
        || !(intersects[0].object.onHoverOut)
        || (typeof intersects[0].object.onHoverOut === 'function')) {
            if (prevHighlight != null) prevHighlight.onHoverOut();
            return;
        }
        currHighlight = intersects[0].object;
        if (currHighlight != prevHighlight) {
            if (prevHighlight != null) prevHighlight.onHoverOut();
            if (currHighlight != null) {
                if (currHighlight.onHoverIn
                &&  typeof currHighlight.onHoverIn === 'function') {
                    currHighlight.onHoverIn();
                }
            }
        }
        if (currHighlight == prevHighlight) {
            currHighlight.onHoverStay();
        }
        prevHighlight = currHighlight;
    }





    function renderScene(){
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set( 0, 0, 0 );
        function render() {
            beforeFrameUpdate();
            OLAP.beforeFrameUpdate();
            // update the picking ray with the camera and mouse position
            // raycaster.setFromCamera( mouse, camera );
            // var intersects = raycaster.intersectObjects( scene.children );
            // highLightHoverObject(intersects);

            renderer.render( scene, camera );
            requestAnimationFrame( render );
            afterFrameUpdate();
            OLAP.afterFrameUpdate();
        }
        render();
    }


    function initAndRenderScene() {
        initScene();
        renderScene();
    }



    window.onload = initAndRenderScene();
}