"use client";

import React, { useEffect, useRef } from "react";

const CosmicSnowfall = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particleCount = 100;
        const particles: Particle[] = [];

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

                const isChristmas = document.body.classList.contains("christmas-theme");
                const isSpecial = Math.random() > 0.9;

                if (isChristmas) {
                    ctx.fillStyle = isSpecial
                        ? `rgba(220, 38, 38, ${this.opacity})`
                        : `rgba(255, 255, 255, ${this.opacity})`;
                } else {
                    ctx.fillStyle = isSpecial
                        ? `rgba(124, 58, 237, ${this.opacity})`
                        : `rgba(255, 255, 255, ${this.opacity})`;
                }

                ctx.shadowBlur = 5;
                ctx.shadowColor = "white";
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none mix-blend-screen"
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default CosmicSnowfall;