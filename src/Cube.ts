import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 500/ 500, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( 500,500 );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;


export function render (div: HTMLElement) {
    div.appendChild( renderer.domElement );

    

  
    function animate() {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    if ( WebGL.isWebGLAvailable() ) {

        // Initiate function or other initializations here
        animate();
    
    } else {
    
        const warning = WebGL.getWebGLErrorMessage();
        div.appendChild( warning );
    
    }
}

export function changeColor () {
    let i = Math.floor(Math.random()*5);
    switch(i){
        case 0 :
            cube.material.color.setHex(0xffffff)
            break;
        case 1 :
            cube.material.color.setHex(0xfb4807)
            break;
        case 2 :
            cube.material.color.setHex(0xA259FF)
            break;
        case 3 :
            cube.material.color.setHex(0xd7137f)
            break;
        case 4 :
            cube.material.color.setHex(0x13d761)
            break;
        default:
            cube.material.color.setHex(0xf22fff)
    }
    
}
