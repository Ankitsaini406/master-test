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
    const activeIndex = useRef(images.length);
    const isAnimating = useRef(false);

    const gap = 20;
    const speed = 0.8;

    const updateSlides = (index: number) => {
        if (!trackRef.current) return;

        const slides = Array.from(
            trackRef.current.children
        ) as HTMLElement[];

        slides.forEach((slide, i) => {
            let scale = 0.85;
            let opacity = 0.4;
            let zIndex = 1;

            if (i === index) {
                scale = 1.1;
                opacity = 1;
                zIndex = 10;
            } else if (i === index - 1 || i === index + 1) {
                scale = 0.95;
                opacity = 0.7;
                zIndex = 5;
            }

            gsap.to(slide, {
                scale,
                opacity,
                duration: 0.6,
                ease: "power3.out",
            });

            slide.style.zIndex = zIndex.toString();
        });
    };

    const moveToIndex = (index: number, immediate = false) => {
        if (!trackRef.current) return;

        const slide = trackRef.current.children[0] as HTMLElement;
        const slideWidth = slide.offsetWidth;

        const totalMove = index * (slideWidth + gap);
        const centerOffset = (window.innerWidth - slideWidth) / 2;
        const xValue = -totalMove + centerOffset;

        updateSlides(index);

        if (immediate) {
            gsap.set(trackRef.current, { x: xValue });
        } else {
            if (isAnimating.current) return;
            isAnimating.current = true;

            gsap.to(trackRef.current, {
                x: xValue,
                duration: speed,
                ease: "power3.out",
                onComplete: () => {
                    isAnimating.current = false;

                    // Seamless reset
                    if (index >= images.length * 2) {
                        activeIndex.current = index - images.length;
                        moveToIndex(activeIndex.current, true);
                    }

                    if (index < images.length) {
                        activeIndex.current = index + images.length;
                        moveToIndex(activeIndex.current, true);
                    }
                },
            });
        }
    };

    // Initialize
    useEffect(() => {
        moveToIndex(activeIndex.current, true);

        const interval = setInterval(() => {
            activeIndex.current += 1;
            moveToIndex(activeIndex.current);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Resize fix
    useEffect(() => {
        const handleResize = () =>
            moveToIndex(activeIndex.current, true);

        window.addEventListener("resize", handleResize);
        return () =>
            window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={style.sliderWrapper}>
            <div className={style.sliderTrack} ref={trackRef}>
                {extendedSlides.map((img, i) => (
                    <div
                        key={`${img}-${i}`}
                        className={style.slide}
                        onClick={() => {
                            activeIndex.current = i;
                            moveToIndex(i);
                        }}
                    >
                        <div className={style.imageContainer}>
                            <Image
                                src={img}
                                fill
                                alt="Mentor"
                                sizes="350px"
                                draggable={false}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}