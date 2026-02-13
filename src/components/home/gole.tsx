"use client";

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import style from "@/src/styles/gole.module.css";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/src/hook/useReveal";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function GoleMentors() {
    const Images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
    ];

    useReveal();

    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (marqueeRef.current) {
                const marquee = marqueeRef.current;
                const totalWidth = marquee.scrollWidth / 2;

                gsap.to(marquee, {
                    x: -totalWidth,
                    repeat: -1,
                    duration: 40, // Adjusted speed
                    ease: "none",
                });

                gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
                    const target = Number(el.dataset.target);

                    gsap.fromTo(
                        el,
                        { innerText: 0 },
                        {
                            innerText: target,
                            duration: 2,
                            ease: "power2.out",
                            snap: { innerText: 1 },
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top 80%",
                            },
                        }
                    );
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={style.box}>

            {/* 1. Marquee (Background Layer) */}
            <div className={style.marqueeWrapper}>
                <div ref={marqueeRef} className={style.marquee}>
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className={style.marqueeGroup}>
                            {/* Repeating text multiple times to ensure fill */}
                            {[...Array(4)].map((_, j) => (
                                <span key={j} className={style.marqueeItem}>
                                    Mentor Union&nbsp;
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Main Content (Foreground Layer) */}
            <div className='container'>

                {/* A. Grid Section */}
                <div className={`${style.gridBox} reveal`}>
                    <div className={style.gridItem}>
                        <h3>1:1&nbsp;Access</h3>
                        <p>no middle layers</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>
                            <span className="count" data-target="94">0</span>%
                        </h3>
                        <p>mentors found unmatched clarity</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>
                            <span className="count" data-target="650">0</span>+
                        </h3>
                        <p>mentors, one platform</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>
                            <span className="count" data-target="3">0</span> Calls
                        </h3>
                        <p>result in one breakthrough</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>
                            <span className="count" data-target="14000">0</span>+
                        </h3>
                        <p>completed calls</p>
                    </div>
                </div>

                {/* B. Text Section */}
                <div className={style.textBox}>
                    <h4 className="reveal">
                        Your Goals, Our Mentors <br />
                        <span>Let's Make it Happen</span>
                    </h4>
                </div>
            </div>

            {/* 3. Slider (Bottom Layer) */}
            <Slider images={Images} />

        </section>
    );
}

// --- Slider Component ---
interface SliderProps {
    images: string[];
}

export function Slider({ images }: SliderProps) {
    const extendedSlides = [...images, ...images, ...images];
    const trackRef = useRef<HTMLDivElement>(null);
    const activeIndex = useRef(images.length + 2);
    const isAnimating = useRef(false);

    const speed = 0.8;

    // Helper to get visible slides count based on window width
    const getVisibleSlides = () => {
        if (typeof window === "undefined") return 5;
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 3;
        return 5;
    };

    const updateClasses = (index: number) => {
        if (!trackRef.current) return;
        const slides = Array.from(trackRef.current.children);

        slides.forEach((slide, i) => {
            slide.classList.remove(style.active, style.near);

            if (i === index) {
                slide.classList.add(style.active);
            } else if (i === index - 1 || i === index + 1) {
                slide.classList.add(style.near);
            }
        });
    };

    const moveToIndex = (index: number, immediate = false) => {
        if (!trackRef.current) return;

        const visibleCount = getVisibleSlides();
        const slideWidthPercent = 100 / visibleCount;

        // Offset logic to keep the active index in the middle
        const offset = (visibleCount - 1) / 2;
        const xValue = -(index - offset) * slideWidthPercent;

        updateClasses(index);

        if (immediate) {
            gsap.set(trackRef.current, { xPercent: xValue });
        } else {
            isAnimating.current = true;
            gsap.to(trackRef.current, {
                xPercent: xValue,
                duration: speed,
                ease: "power3.out",
                onComplete: () => {
                    isAnimating.current = false;

                    // Seamless Loop Snap
                    if (index >= images.length * 2) {
                        activeIndex.current = index - images.length;
                        moveToIndex(activeIndex.current, true);
                    } else if (index < images.length) {
                        activeIndex.current = index + images.length;
                        moveToIndex(activeIndex.current, true);
                    }
                },
            });
        }
    };

    useEffect(() => {
        moveToIndex(activeIndex.current, true);

        const interval = setInterval(() => {
            if (!isAnimating.current) {
                activeIndex.current += 1;
                moveToIndex(activeIndex.current);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Handle Resize for Responsive logic
    useEffect(() => {
        const handleResize = () => moveToIndex(activeIndex.current, true);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={style.sliderWrapper}>
            <div className={style.sliderTrack} ref={trackRef}>
                {extendedSlides.map((img, i) => (
                    <div
                        key={i}
                        className={style.slide}
                        onClick={() => {
                            if (isAnimating.current) return;
                            activeIndex.current = i;
                            moveToIndex(i);
                        }}
                    >
                        <div className={style.imageContainer}>
                            <Image
                                src={img}
                                alt={`Mentor ${i}`}
                                fill
                                // sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                                draggable={false}
                                priority={i >= 5 && i < 10}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}