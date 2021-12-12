const loader = new THREE.GLTFLoader();
scene = new THREE.Scene();
const color3 = new THREE.Color("rgb(216,	216,	230)");
scene.background = new THREE.Color(color3);
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z= 1;
var i = 0;
var _y = 0;
var _z = 0;
let loaders = ["super_human/scene.gltf", "pack4/scene.gltf"];
function inti(u,t){
 
loader.load(loaders[i], function(gltf){
  car = gltf.scene.children[0];
  car.scale.set(0.5,0.5,0.5);
  scene.add(gltf.scene);
});
}
document.getElementById("3").onclick = function() {
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }

  if(i == 1){
    camera.position.z = 70;
    
  }
  _y+=0.1;
  _z+= 0.1;
  inti(_z,_y);
  
  i++;
}


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    

}

animate();
