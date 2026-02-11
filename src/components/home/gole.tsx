"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import style from "@/src/styles/gole.module.css";
import Image from "next/image";

export default function GoleMentors() {
    const Images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
    ];

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
                <div className={style.gridBox}>
                    <div className={style.gridItem}>
                        <h3>1:1&nbsp;Access</h3>
                        <p>no middle layers</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>94%</h3>
                        <p>mentors found unmatched clarity</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>650+</h3>
                        <p>mentors, one platform</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>3 Calls</h3>
                        <p>result in one breakthrough</p>
                    </div>
                    <div className={style.gridItem}>
                        <h3>14,000+</h3>
                        <p>completed calls</p>
                    </div>
                </div>

                {/* B. Text Section */}
                <div className={style.textBox}>
                    <h4>
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
    const [sliderImages, setSliderImages] = useState(images);
    const middleIndex = Math.floor(sliderImages.length / 2);
    const trackRef = useRef<HTMLDivElement>(null);

    const handleClick = (index: number) => {
        if (index === middleIndex) return;

        const offset = index - middleIndex;
        let newImages;

        if (offset > 0) {
            newImages = sliderImages.slice(offset).concat(sliderImages.slice(0, offset));
        } else {
            newImages = sliderImages
                .slice(offset + sliderImages.length)
                .concat(sliderImages.slice(0, offset + sliderImages.length));
        }

        if (trackRef.current) {
            // Animate out
            gsap.to(trackRef.current, {
                x: -offset * 300, // Approximate movement
                opacity: 0.5,
                duration: 0.3,
                onComplete: () => {
                    // Swap images and reset position instantly
                    setSliderImages(newImages);
                    gsap.set(trackRef.current, { x: 0, opacity: 1 });
                },
            });
        }
    };

    return (
        <div className={style.sliderWrapper}>
            <div className={style.sliderTrack} ref={trackRef}>
                {sliderImages.map((img, i) => {
                    let className = style.slide;
                    if (i === middleIndex) className += ` ${style.active}`;
                    else className += ` ${style.inactive}`;

                    if (i === middleIndex) className += ` ${style.active}`;
                    else if (i === middleIndex - 1 || i === middleIndex + 1) className += ` ${style.near}`;
                    else className += ` ${style.far}`;

                    return (
                        <div
                            key={`${img}-${i}`} // Unique key to force re-render on shuffle
                            className={className}
                            onClick={() => handleClick(i)}
                        >
                            <Image src={img} fill alt="slide" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}