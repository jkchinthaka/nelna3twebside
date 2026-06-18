/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function FloatingPack({ position, rotation, color, scale = 1, speed = 1 }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) {
      return
    }

    const t = state.clock.getElapsedTime() * speed
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.08
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.45) * 0.04
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.35) * 0.08
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1.45, 0.5, 0.62]} />
      <meshStandardMaterial color={color} roughness={0.34} metalness={0.08} />
    </mesh>
  )
}

function SceneContent() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const targetY = state.pointer.x * 0.14
    const targetX = state.pointer.y * 0.08

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.055
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.055
  })

  return (
    <group ref={groupRef} position={[0, -0.06, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <circleGeometry args={[2.65, 96]} />
        <meshStandardMaterial color="#e6f2e9" roughness={0.95} />
      </mesh>

      <mesh position={[0.2, -0.45, -0.3]} rotation={[0.1, -0.24, 0.04]}>
        <boxGeometry args={[2.1, 0.34, 1.5]} />
        <meshStandardMaterial color="#f4f8f5" roughness={0.6} metalness={0.04} />
      </mesh>

      <FloatingPack
        position={[0.18, 0.08, 0.45]}
        rotation={[0.1, -0.26, 0.04]}
        color="#27743a"
        scale={1.05}
        speed={1.05}
      />

      <FloatingPack
        position={[-1.1, -0.05, -0.06]}
        rotation={[0.08, 0.48, -0.04]}
        color="#da2328"
        scale={0.68}
        speed={1.35}
      />

      <FloatingPack
        position={[1.35, -0.12, -0.24]}
        rotation={[0.06, -0.56, 0.05]}
        color="#f8bc24"
        scale={0.56}
        speed={1.22}
      />

      <mesh position={[0.7, 0.62, -0.2]}>
        <sphereGeometry args={[0.22, 36, 36]} />
        <meshStandardMaterial color="#f8bc24" roughness={0.2} metalness={0.14} />
      </mesh>

      <mesh position={[-0.64, 0.5, 0.35]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial color="#da2328" roughness={0.26} metalness={0.14} />
      </mesh>
    </group>
  )
}

function Farm3DSceneCanvas() {
  return (
    <div className="h-[300px] w-full md:h-[360px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.25, 5.1], fov: 41 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#edf6ef']} />
        <fog attach="fog" args={['#edf6ef', 5.6, 11]} />
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.4} groundColor="#dceddf" />
        <directionalLight position={[5, 7, 4]} intensity={0.95} color="#fff8e9" />
        <directionalLight position={[-3, 2, -2]} intensity={0.44} color="#e7f4ea" />
        <SceneContent />
      </Canvas>
    </div>
  )
}

export default Farm3DSceneCanvas
