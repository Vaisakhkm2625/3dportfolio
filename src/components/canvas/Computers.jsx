import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, } from '@react-three/fiber';
import { OrbitControls, Preload, SpotLightShadow, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = (isMobile) => {


    const group = useRef();

    const computer = useGLTF('./desktop_pc/scene.gltf')


    useFrame(() => {

        group.current.rotation.y -= 0.001; // Adjust the rotation speed here
    });

    return (

        <group ref={group}>
            <mesh>
                <hemisphereLight intensity={0.15} groundColor="black" />
                <pointLight intensity={1} />
                <spotLight
                    position={[-20, 50, 10]}
                    angle={0.12}
                    penumbra={1}
                    intensity={1}
                    castShadow
                //shadow-mapSize={1024}
                />
                <primitive
                    object={computer.scene}
                    scale={isMobile ? 0.7 : 0.75}
                    position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                    rotation={[-0.01, -0.2, -0.1]}
                />
            </mesh>
        </group>
    )
}


const ComputerCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    // TODO: 1.07
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    //TODO: frameLoop not recogized 
    return (
        <Canvas
            frameLoop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />} >
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />

            </Suspense>

            <Preload all />

        </Canvas>
    )

}

export default ComputerCanvas
