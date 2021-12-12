var stars = [ ]
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 20;
// stelele

function addSphere(){

  
  for ( var z= -1000; z < 100; z+=4 ) {

    
    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var sphere = new THREE.Mesh(geometry, material)

   
    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;

    
    sphere.position.z = z;

   
    sphere.scale.x = sphere.scale.y = 2;

   
    scene.add( sphere );


    stars.push(sphere); 
  }
}

function animateStars() { 
  

  for(var i=0; i<stars.length; i++) {

    star = stars[i]; 
    star.position.z +=  i/1000;
    if(star.position.z>1000) star.position.z-=2000; 

    }

}

// pamantul
const sphere = new THREE.Mesh(
  new THREE. SphereGeometry(5,50,50),
  new THREE.MeshBasicMaterial({
  //color: 0xff0000
  map: new THREE.TextureLoader().load('index.jpg')
}));
scene.add(sphere);


function animate(){
  sphere.rotation.y += 0.001
  requestAnimationFrame(animate);
  
    renderer.render(scene,camera);
    animateStars();
}
addSphere();
animate();
