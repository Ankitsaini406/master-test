"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import style from "@/src/styles/gole.module.css";

// Main Component
export default function GoleMentors() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!marqueeRef.current) return;

        const marquee = marqueeRef.current;
        const totalWidth = marquee.scrollWidth / 2; // half because we duplicate
        gsap.to(marquee, {
            x: -totalWidth,
            repeat: -1,
            duration: 75,
            ease: "none",
        });
    }, []);

    return (
        <section className={style.box}>
            {/* Marquee */}
            <div className={style.marqueeWrapper}>
                <div ref={marqueeRef} className={style.marquee}>
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className={style.marqueeItem}>
                            MENTOR UNION
                        </span>
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <span key={i + 6} className={style.marqueeItem}>
                            MENTOR UNION
                        </span>
                    ))}
                </div>
            </div>

            <div className="container">
                {/* Midbox */}
                <div className={style.midbox}>
                    <div className={style.gridBox}>
                        <div>
                            <h3>1:1&nbsp;Access</h3>
                            <p>no middle layers</p>
                        </div>

                        <div>
                            <h3>94%</h3>
                            <p>menters found unmatched clarity</p>
                        </div>

                        <div>
                            <h3>650+</h3>
                            <p>mentors, one <br /> platform</p>
                        </div>

                        <div>
                            <h3>3 Calls</h3>
                            <p>result in one breakthrough</p>
                        </div>

                        <div>
                            <h3>14,000+</h3>
                            <p>completed calls</p>
                        </div>
                    </div>

                    <h4>
                        Your Goals, Our Mentors <br /> <span>Let's Make it Happen</span>
                    </h4>
                </div>
            </div>

            {/* Slider */}
            <Slider />
        </section>
    );
}

// Slider Component
export function Slider() {
    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
    ];

    const [activeIndex, setActiveIndex] = useState(2); // middle one active

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={style.sliderWrapper}>
            <button onClick={prevSlide} className={style.navButton}>
                ◀
            </button>

            <div className={style.slider}>
                {images.map((img, i) => {
                    const prevIndex = (activeIndex - 1 + images.length) % images.length;
                    const nextIndex = (activeIndex + 1) % images.length;

                    let className = style.slide;
                    if (i === activeIndex) className += ` ${style.active}`;
                    else if (i === prevIndex || i === nextIndex) className += ` ${style.near}`;
                    else className += ` ${style.far}`;

                    return (
                        <div key={i} className={className}>
                            <img src={img} alt={`slide-${i}`} />
                        </div>
                    );
                })}
            </div>

            <button onClick={nextSlide} className={style.navButton}>
                ▶
            </button>
        </div>
    );
}
