"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import style from "@/src/styles/middsection.module.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function MiddSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const text1Ref = useRef<HTMLHeadingElement>(null)
    const text2Ref = useRef<HTMLHeadingElement>(null)
    const svgLayerRef = useRef<HTMLDivElement>(null)
    const path1Ref = useRef<SVGPathElement>(null)
    const path2Ref = useRef<SVGPathElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP MatchMedia for robust responsive handling
            const mm = gsap.matchMedia();
            const paths = [path1Ref.current, path2Ref.current];

            // 1. Setup: Prepare SVG paths
            paths.forEach((p) => {
                if (p) {
                    const len = p.getTotalLength()
                    // Set initial state immediately to avoid flash of unstyled content
                    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
                }
            });

            // 2. Define Animation Logic
            mm.add("(min-width: 0px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=200%", // Increased slightly for a more luxurious scroll feel
                        scrub: 0.5,    // Added slight lag for smoothness
                        pin: true,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    }
                });

                // --- PHASE 1: ENTER DARK MODE ---
                // Background darkens
                tl.to(sectionRef.current, {
                    backgroundColor: "#090909",
                    duration: 1.5
                }, 0);

                // Text 1: Turns white cleanly, then fades out moving UP
                tl.to(text1Ref.current, { color: "#ffffff", duration: 0.5 }, 0)
                    .to(text1Ref.current, {
                        opacity: 0,
                        yPercent: -50, // Move up by 50% of its own height
                        scale: 0.95,   // Subtle shrink effect
                        duration: 1.5,
                        ease: "power2.in"
                    }, 0.5);

                // --- PHASE 2: SVG ENTRANCE ---
                // SVG Layer slides in from Right (using xPercent for responsiveness)
                tl.fromTo(svgLayerRef.current,
                    { opacity: 0, xPercent: 20 },
                    { opacity: 1, xPercent: 0, duration: 2.5, ease: "power2.out" },
                    0.2
                );

                tl.to(paths, {
                    strokeDashoffset: 1,
                    duration: 2.5,
                    ease: "power1.inOut"
                }, 0.5);
                // Text 2: Enters from Bottom
                tl.fromTo(text2Ref.current,
                    { opacity: 0, yPercent: 50, color: "#ffffff" },
                    { opacity: 1, yPercent: 0, duration: 1.5, ease: "power2.out" },
                    1.5
                );
                tl.to({}, { duration: 1 });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={style.section}>

            {/* SVG Layer */}
            <div ref={svgLayerRef} className={`${style.layer} ${style.svgLayer}`}>
                <svg viewBox="0 0 2000 2000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="curveGradient1" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E38330" />
                            <stop offset="50%" stopColor="#F7D544" />
                            <stop offset="100%" stopColor="#39B5D7" />
                        </linearGradient>
                    </defs>
                    <path
                        ref={path1Ref}
                        d="M1000 0 C 700 150 900 250 700 350 C 500 450 600 550 400 650 C 200 750 300 850 0 1000"
                        stroke="url(#curveGradient1)"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
                <svg viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice">
                    <path
                        ref={path2Ref}
                        d="M1000 0 C 700 150 900 250 700 350 C 500 450 600 550 400 650 C 200 750 300 850 0 1000"
                        stroke="url(#curveGradient1)"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className={`${style.layer} ${style.textWrapper}`}>
                <h1 ref={text1Ref}>Still Guessing Your Way Through Career Choices, Alone?</h1>
            </div>

            <div className={`${style.layer} ${style.textWrapper2}`}>
                <h1 ref={text2Ref} style={{ opacity: 0 }}>Now you don't have to.</h1>
            </div>
        </section>
    )
}