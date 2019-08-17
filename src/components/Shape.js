import React, { Component } from 'react'
import * as THREE from 'three'
import Styled, { keyframes } from 'styled-components'
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

const fadeIn = keyframes `
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const CanvasWrap = Styled.div `
  position: 'absolute'; 
  margin: '0 auto'; 
  width: '100%';
  @media screen and (min-width: 800px) {
    height: 800px;
  }
`

const ShapeWrap = Styled.div `
  height: 450px;
   @media screen and (min-width: 800px) {
    height: 820px;
  }
`

const TextWrap = Styled.div `
margin: 0 auto;
display: flex;
justify-content: space-around;
padding: 10px;
position: relative;
bottom: 100px;
@media screen and (min-width: 800px) {
  bottom: 400px;
}
`

const TextItem = Styled.h4 `
  color: white;
  width: 100px;
  transform: rotate(45deg);
  animation: 15s ${fadeIn} ease-out;
`

class Shape extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.theCanvas()
  }

  theCanvas() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    //ADD SCENE
    this.scene = new THREE.Scene()

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      3000,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 1000

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    //COLOR
    const colorCount = random.rangeFloor(2, 6);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

    //ADD TEXT 
    const fontJson = require( './fonts/helvetiker_bold.typeface.json' );

    const font = new THREE.Font(fontJson);

    let textGeometry = new THREE.TextGeometry('Party in your sleep.', {
      font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: false,
		bevelThickness: 10,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 5
    });

    let textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
    this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
    this.textMesh.position.set( 0, 0, 0 );
    this.scene.add(this.textMesh)


    
    //ADD LIGHT
    this.light = new THREE.DirectionalLight('lightblue', 10)
    // this.light.position.set(0, 0, 0)
    this.scene.add(this.light)

    // for (var i = 0, l = geometry.vertices.length; i < l; i++) {
    //   geometry.vertices[i].x += -10 + Math.random() * 20
    //   geometry.vertices[i].y += -10 + Math.random() * 20
    // }

    this.scene.add(new THREE.AmbientLight(palette))

    this.start()
  }
  componentWillUnmount() {
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
    // this.textMesh.rotation.x += 0.01
    // this.textMesh.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  handleSubmit = () => {
    this.theCanvas()
  }

  render() {
    return ( 
    <CanvasWrap >
      <ShapeWrap key = "1"
      ref = {
        mount => {
          this.mount = mount
        }
      }
      /> 
      <TextWrap >
        <TextItem > Deep Sleep </TextItem> 
        <TextItem>Music For Dreams </TextItem> 
      </TextWrap> 
    </CanvasWrap>
    )
  }
}
export default Shape