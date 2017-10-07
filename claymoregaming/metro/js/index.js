var camera, scene, renderer,
    geometry, material, mesh;
 
init();
animate(); 

function init() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();
 
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene.add( camera );
 
    textGeo = new THREE.PlaneGeometry(300,300);
    THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
    textTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png');
    textMaterial = new THREE.MeshLambertMaterial({color: 0x00ffff, opacity: 1, map: textTexture, transparent: true, blending: THREE.AdditiveBlending})
    text = new THREE.Mesh(textGeo,textMaterial);
    text.position.z = 800;
    scene.add(text);

    light = new THREE.DirectionalLight(0xffffff,0.7);
    light.position.set(-1,0,1);
    scene.add(light);
  
    smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
    smokeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc, map: smokeTexture, transparent: true,opacity : 0.5});
    smokeGeo = new THREE.PlaneGeometry(300,300);
    smokeParticles = [];


    for (p = 0; p < 150; p++) {
        var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
        particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
        particle.rotation.z = Math.random() * 360;
//r scaleSetting =  Math.random();                 // ticle.scale.set(scaleSetting,scaleSetting,scaleSetting);
        scene.add(particle);
        smokeParticles.push(particle);
    }
 
    document.body.appendChild( renderer.domElement );
 
}
 
function animate() {
 
    // note: three.js includes requestAnimationFrame shim
    stats.begin();
    delta = clock.getDelta();
    requestAnimationFrame( animate );
    evolveSmoke();
    render();
    stats.end();
}
 
function evolveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.2);
        smokeParticles[sp].position.x +=(delta * 0.2);
      smokeParticles[sp].position.y +=(delta * 0.2);smokeParticles[sp].position.z +=(delta * 0.2);
    }
}

function render() {
    renderer.render( scene, camera );
 
}