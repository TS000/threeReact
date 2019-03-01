import React, { Component } from 'react'
import * as THREE from 'three'
import { hilbert3D } from '../utils/hilbert3D.js'

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

    //ADD SCENE
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2( 0xffffff, .006, .005 );

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 )
    this.camera.position.z = 100

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    this.mount.appendChild(this.renderer.domElement)

    //NEON
    const hilbertPoints = hilbert3D( new THREE.Vector3( 3, 0, 0 ), 200.0, 2, 3, 4, 2, 2, 2, 2, 4, 7 );
    const geometry3 = new THREE.BufferGeometry();
    
    const subdivisions = 8;
		const vertices = [];
		const colors1 = [];
		const colors2 = [];
		const colors3 = [];
		const point = new THREE.Vector3();
		const color = new THREE.Color();
    const spline = new THREE.CatmullRomCurve3( hilbertPoints );
    
    for ( let i = 0; i < hilbertPoints.length * subdivisions; i ++ ) {
      let t = i / ( hilbertPoints.length * subdivisions );
      spline.getPoint( t, point );
      vertices.push( point.x, point.y, point.z );
      color.setHSL( 0.6, 1.0, Math.max( 0, - point.x / 200 ) + 0.5 );
      colors1.push( color.r, color.g, color.b );
      color.setHSL( 0.9, 1.0, Math.max( 0, - point.y / 200 ) + 0.5 );
      colors2.push( color.r, color.g, color.b );
      color.setHSL( i / ( hilbertPoints.length * subdivisions ), 1.0, 0.5 );
      colors3.push( color.r, color.g, color.b );
    }

    
		
		geometry3.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		
		geometry3.addAttribute( 'color', new THREE.Float32BufferAttribute( colors3, 3 ) );

   
    
    for ( let i = 0; i < hilbertPoints.length; i ++ ) {
      let point = hilbertPoints[ i ];
      vertices.push( point.x, point.y, point.z );
      color.setHSL( 0.8, 1.0, Math.max( 0, ( 200 - hilbertPoints[ i ].x ) / 400 ) * 0.5 + 0.5 );
      colors1.push( color.r, color.g, color.b );
      color.setHSL( 0.3, 1.0, Math.max( 0, ( 200 + hilbertPoints[ i ].x ) / 400 ) * 0.5 );
      colors2.push( color.r, color.g, color.b );
      color.setHSL( i / hilbertPoints.length, 0.4, 0.5 );
      colors3.push( color.r, color.g, color.b );
    }

    const material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.VertexColors } )
    const scale = .5
    const d = 0
    let p = "";
    let line = "";

    const parameters = [
      [ material, scale * 1.5, [ d, - d / 2, 0 ], geometry3 ]
    ];

    for ( let i = 0; i < parameters.length; i ++ ) {
      p = parameters[ i ];
      line = new THREE.Line( p[ 3 ], p[ 0 ] );
      line.scale.x = line.scale.y = line.scale.z = p[ 1 ];
      line.position.x = p[ 2 ][ 1 ];
      line.position.y = p[ 2 ][ 1 ];
      line.position.z = p[ 2 ][ 2 ];
      this.scene.add( line );
    }

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
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    const time = Date.now() * 0.00001;
    for ( var i = 0; i < this.scene.children.length; i ++ ) {
      var object = this.scene.children[ i ];
      if ( object.isLine ) {
        object.rotation.y = time * ( i % 2 ? 1 : - 1 );
        object.rotation.x = time * ( i % 2 ? 1 : - 1 );
      }
    }
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
            color: 'papayawhip',
            fontSize: '10px'
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
            color: 'papayawhip',
            fontSize: '10px'
          }}
        >
          Music For Dreams
        </div>
      </div>
    )
  }
}
export default Shape