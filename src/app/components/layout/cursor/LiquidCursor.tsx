"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LiquidCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const dropsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

      setIsDesktop(hasMouse && !isLowEnd);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    };

    window.addEventListener('mousemove', onMouseMove);

    const updateCursor = () => {
      const t = Date.now() * 0.0015;

      dropsRef.current.forEach((drop, i) => {
        if (drop) {
          const offset = 25 + i * 10;

          gsap.to(drop, {
            x: mx + Math.cos(t * 1.5 + i * 0.5) * (offset * (Math.sin(t) * 0.5 + 0.8)),
            y: my + Math.sin(t * 1.2 + i * 0.5) * (offset * (Math.cos(t) * 0.5 + 0.8)),
            duration: 0.6,
            ease: "power2.out",
            overwrite: 'auto'
          });
        }
      });

      requestAnimationFrame(updateCursor);
    };

    const animationId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-core fixed top-0 left-0 w-2 h-2 bg-white rounded-full z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion"
      />

      <div className="cursor-wrapper fixed inset-0 pointer-events-none z-[9999] mix-blend-exclusion">
        {[80, 60, 40, 20].map((size, i) => (
          <div
            key={i}
            ref={el => { if (el) dropsRef.current[i] = el; }}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 bg-white opacity-80"
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ))}
      </div>

      <svg className="hidden">
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
    </>
  );
};

export default LiquidCursor;