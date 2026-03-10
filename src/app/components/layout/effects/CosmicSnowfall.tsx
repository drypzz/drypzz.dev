"use client";

import React, { useEffect, useRef } from "react";

import { useSeason } from "@/app/hooks/useSeason";

const CosmicSnowfall = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isChristmas } = useSeason();

    useEffect(() => {
        if (!isChristmas) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const isMobile = width < 768;
        const particleCount = isMobile ? 30 : 100;
        const particles: Particle[] = [];

        let lastTime = 0;
        const fps = 60;
        const interval = 1000 / fps;

        class Particle {
            x: number;
            y: number;
            speed: number;
            size: number;
            opacity: number;
            drift: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = Math.random() * 1.5 + 0.5;
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.drift = Math.random() * 0.5 - 0.25;
            }

            update() {
                this.y += this.speed;
                this.x += this.drift;

                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                const isSpecial = Math.random() > 0.95;
                ctx.fillStyle = isSpecial
                    ? `rgba(220, 38, 38, ${this.opacity})`
                    : `rgba(255, 255, 255, ${this.opacity})`;

                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;

            if (deltaTime > interval) {
                lastTime = currentTime - (deltaTime % interval);

                ctx.clearRect(0, 0, width, height);
                particles.forEach((p) => {
                    p.update();
                    p.draw();
                });
            }
            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [isChristmas]);

    if (!isChristmas) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none opacity-90 mix-blend-screen"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default CosmicSnowfall;