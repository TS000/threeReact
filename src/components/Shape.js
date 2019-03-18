import React, { Component } from 'react'
import * as THREE from 'three'
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

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
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 100

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    //COLOR
    const colorCount = random.rangeFloor(2, 6);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

    //ADD CUBE
    const TILE_SIZE = 4
    const geometry = new THREE.CylinderGeometry( 1, TILE_SIZE*4, TILE_SIZE*4, 3 )
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: THREE.FaceColors
    })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    //ADD LIGHT
    this.light = new THREE.DirectionalLight('lightblue', 1)
    this.light.position.set(0, 4, 0)
    this.scene.add(this.light)

    for (var i = 0, l = geometry.vertices.length; i < l; i++) {
      geometry.vertices[i].x += -10 + Math.random() * 20
      geometry.vertices[i].y += -10 + Math.random() * 20
    }

    this.scene.add(new THREE.AmbientLight(palette))

    //ADD WIRES
    const wireframe = new THREE.WireframeGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xf8f8ff,
      transparent: true,
      opacity: 1,
      depthTest: true,
    });
    this.line = new THREE.Line( wireframe, lineMaterial )
    this.scene.add(this.line)

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
    this.line.rotation.x += 0.001
    this.line.rotation.y += 0.002
    this.cube.rotation.x += 0.001
    this.cube.rotation.y += 0.001
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
      <div style={{ position: 'relative' }}>
        <div
          key="1"
          style={{ width: '100%', height: '950px' }}
          ref={mount => {
            this.mount = mount
          }}
        />
        <div
          style={{
            position: 'absolute',
            margin: '0 auto',
            textAlign: 'center',
            top: '45%',
            right: '45%',
            color: 'MediumSlateBlue'
          }}
        />
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            left: '15%',
            top: '45%',
            color: 'white',
            fontSize: '12px'
          }}
        >
          Deep Sleep
        </div>
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            right: '15%',
            top: '45%',
            color: 'white',
            fontSize: '12px'
          }}
        >
          Music For Dreams
        </div>
      </div>
    )
  }
}
export default Shape