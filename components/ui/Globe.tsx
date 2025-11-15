"use client";
/* eslint-disable react/no-unknown-property */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: Readonly<WorldProps>) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: string;
        colorFn?: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);
  const ringIndicesRef = useRef<number[]>([]);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig]
  );

  const buildMaterial = useCallback(() => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity ?? 0.1;
    globeMaterial.shininess = defaultProps.shininess ?? 0.9;
  }, [defaultProps]);

  const buildData = useCallback(() => {
    const points = data.flatMap((arc) => {
      const rgb = hexToRgb(arc.color);
      if (!rgb) return [];
      const colorFn = (t: number) =>
        `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;
      const colorString = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;

      const basePoint = {
        size: defaultProps.pointSize,
        order: arc.order,
        colorFn,
        color: colorString,
      };

      return [
        { ...basePoint, lat: arc.startLat, lng: arc.startLng },
        { ...basePoint, lat: arc.endLat, lng: arc.endLng },
      ];
    });

    const deduped = Array.from(
      points.reduce((acc, point) => {
        acc.set(`${point.lat}-${point.lng}`, point);
        return acc;
      }, new Map<string, (typeof points)[number]>())
    ).map(([, value]) => value);

    setGlobeData(deduped);
  }, [data, defaultProps.pointSize]);

  useEffect(() => {
    if (globeRef.current) {
      buildData();
      buildMaterial();
    }
  }, [buildData, buildMaterial]);

  useEffect(() => {
    return () => {
      ringIndicesRef.current = [];
      if (globeRef.current) {
        globeRef.current.arcsData([]);
        globeRef.current.pointsData([]);
        globeRef.current.ringsData([]);
        globeRef.current = null;
      }
    };
  }, []);

  const startAnimation = useCallback(() => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat)
      .arcStartLng((d) => (d as { startLng: number }).startLng)
      .arcEndLat((d) => (d as { endLat: number }).endLat)
      .arcEndLng((d) => (d as { endLng: number }).endLng)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(globeData)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) =>
        (e.colorFn ? e.colorFn(t) : (e.color as string))
      )
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );
  }, [data, defaultProps, globeData]);

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    startAnimation();
  }, [defaultProps, globeData, startAnimation]);

  useEffect(() => {
    if (!globeRef.current || !globeData || globeData.length === 0) return;

    const interval = globalThis.setInterval(() => {
      if (!globeRef.current || !globeData) return;
      const activeCount = Math.max(Math.floor((data.length * 4) / 5), 1);
      ringIndicesRef.current = genRandomNumbers(0, globeData.length, activeCount);

      const subset = globeData.filter((_, index) =>
        ringIndicesRef.current.includes(index)
      );
      globeRef.current.ringsData(subset);
    }, 2000);

    return () => {
      globalThis.clearInterval(interval);
    };
  }, [data.length, globeData]);

  return <threeGlobe ref={globeRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    const pixelRatio = Math.min(globalThis.window?.devicePixelRatio ?? 1, 1.75);
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);

    const canvas = gl.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
    };
    const handleContextRestored = () => {
      gl.setSize(size.width, size.height);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, {
      passive: false,
    });
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props: Readonly<WorldProps>) {
  const { globeConfig } = props;
  const scene = useMemo(() => {
    const constructedScene = new Scene();
    constructedScene.fog = new Fog(0xffffff, 400, 2000);
    return constructedScene;
  }, []);

  const camera = useMemo(() => {
    const perspective = new PerspectiveCamera(50, aspect, 180, 1800);
    perspective.position.set(0, 0, cameraZ);
    return perspective;
  }, []);

  return (
    <Canvas
      scene={scene}
      camera={camera}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const normalizedHex = hex.replace(shorthandRegex, (_, r, g, b) =>
    r + r + g + g + b + b
  );

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
  return match
    ? {
        r: Number.parseInt(match[1], 16),
        g: Number.parseInt(match[2], 16),
        b: Number.parseInt(match[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) {
      arr.push(r);
    }
  }

  return arr;
}
