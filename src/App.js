import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 100
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('papayawhip')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.BoxGeometry( 20, 20, 20)

    for ( var d = 0; d < geometry.faces.length; d ++ ) {
      geometry.faces[ d ].color.setHex( Math.random() * 0xffffff );
  }

    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    //ADD LIGHT
    const light = new THREE.PointLight(0xFFF00)
    light.position.set(10,0, 25)
    this.scene.add(this.light)

    for (var i = 0, l = geometry.vertices.length; i<l; i++) {
      geometry.vertices[i].x += -10 + Math.random()*20;
      geometry.vertices[i].y += -10 + Math.random()*20;
    }

    this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div style={{ position: 'relative' }}>
        <div
          style={{ width: '100%', height: '875px' }}
          ref={(mount) => { this.mount = mount }}
        />
        <div style={{ position: 'absolute', margin: '0 auto', textAlign: 'center', top: '45%', right: '45%', color: 'MediumSlateBlue'}}>
          <h1>THREEJS + REACT</h1>
        </div>
        <div style={{ textAlign: 'center'}}>
        <h4>*refresh to change the shape</h4>
        </div>
      </div>
    )
  }
}
export default ThreeScene