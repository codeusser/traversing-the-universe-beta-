/*
author: Nistor Vlad -> codeusser
artist: Nistor Vlad -> codeusser
back-end-dev: Nistor Vlad -> codeusser
front-end-dev: Nistor Vlad -> codeusser

copyrights reservd. Double Tech 
*/
var goback = false;
var enteredearh = Boolean(0);
var eneredinsun = Boolean(0)
var marimesoare = 2
var marimesoare1 = 20;
var marimesoare2 = 20;
var stars = [ ]
var cpos = 0;
let test = document.getElementById("EXPLORE");
var explored = Boolean(0);
var counted = 0;
var main = Boolean(1);
var hovered = false;
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

function animateStars(starp) { 
  
  let star = 0;
  for(var i=0; i<stars.length; i++) {
    star = stars[i]; 
    star.position.z +=  i/starp;
    if(star.position.z>1000) star.position.z-=2000; 

    }

}

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(marimesoare, marimesoare1, marimesoare2), 
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('sun.png')
  }
));
// pamantul
const sphere = new THREE.Mesh(
  new THREE. SphereGeometry(5,50,50),
  new THREE.MeshBasicMaterial({
  //color: 0xff0000
  map: new THREE.TextureLoader().load('index.jpg')
}));

const pamant = new THREE.Mesh(
  new THREE. SphereGeometry(2,20,20),
  new THREE.MeshBasicMaterial({
  //color: 0xff0000
  map: new THREE.TextureLoader().load('index.jpg')
}));
function addGlobe(){
 scene.add(sphere);
}
function addSun(){
  scene.add(sun);
}
function sleep() {
  setTimeout(function() {
  }, 1000);
}
function animate(){
  sphere.rotation.y += 0.001
  requestAnimationFrame(animate);
  sun.rotation.y += 0.001;
  pamant.rotation.y += 0.001;
    renderer.render(scene,camera);
    test.addEventListener("mouseover", function( event ) {
      hovered = true;
    });
    if(hovered){
      scene.remove(sphere);
      scene.remove(sun)
      scene.remove(pamant)
      animateStars(10);
      
    }else{
    animateStars(1000);
    addGlobe()
    }
    if(explored && counted % 2 == 0 && !hovered){
      main = Boolean(0)
      sun.position.x = 10
      pamant.position.x = -10;
      scene.add(sun);
      scene.add(pamant)
      scene.remove(sphere);
      test.innerText = "Back to main"
    }else if(explored && counted % 2 == 1 && !hovered){
      test.innerText = "Explore";
      main = true
      scene.remove(sun);
      scene.remove(pamant)
      console.log("it")
    }
    
    if(counted == 1423552352){
      counted = 0;
    }
    addEventListener('mousemove', (event) => {

      //console.log(event.clientX, " ", event.clientY)
       if(!main){
         if(event.clientX >= 1205 && event.clientX <= 1342 && event.clientY >=415 &&
           event.clientY <= 537){
             eneredinsun = true;
             enteredearh = false;
             goback = false;
           }
         else if(event.clientY >=415 && event.clientY <= 537 && event.clientX >= 577 &&
           event.clientX <= 715){
            enteredearh = true;
            goback = false;
            eneredinsun = false;
         }
         else{
           eneredinsun = false;
           enteredearh = false;
           goback = true;
         }
       }
     })
     if(eneredinsun && camera.position.x < 10){
       camera.position.x += 0.1;
     }
     if((eneredinsun && camera.position.z > 8) || (enteredearh && camera.position.z > 8)){
       camera.position.z -= .1;
     }
     if(enteredearh && camera.position.x > -10){
       camera.position.x -= 0.1;
     }
     if(goback && camera.position.x < 0){
       camera.position.x += 0.1;
     }
     if(goback && camera.position.x > 0){
       camera.position.x -= .1;
     }
     if(goback && camera.position.z < 20){
       camera.position.z += .1;
     }
}

test.addEventListener("click", function( event ){
  explored = Boolean(1);
  ++counted;
  
})
test.addEventListener('mouseleave', e => {
  hovered = false;
});


addSphere();
animate();
