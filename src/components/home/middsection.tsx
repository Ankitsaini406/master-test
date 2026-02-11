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

    const svg1Ref = useRef<SVGSVGElement>(null)
    const path1Ref = useRef<SVGPathElement>(null)

    const svg2Ref = useRef<SVGSVGElement>(null)
    const path2Ref = useRef<SVGPathElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const paths = [path1Ref.current, path2Ref.current]
            const svgs = [svg1Ref.current, svg2Ref.current]
            if (!paths[0] || !paths[1]) return

            // Set strokeDasharray and strokeDashoffset per path
            paths.forEach((p) => {
                const len = p!.getTotalLength()
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
            })

            // Check if mobile
            const isMobile = window.innerWidth < 768

            // Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    // scrub: true,
                    // Reduce scrub smoothing on mobile for better performance
                    scrub: isMobile ? 0.5 : true,
                },
            })

            // Fade in SVGs
            tl.to(svgs, { opacity: 1, duration: 0.5 })

            // Animate paths
            tl.to(paths, { strokeDashoffset: 0, ease: "none", duration: 1 }, "<")

            // Change background + text color
            tl.to(
                sectionRef.current,
                { backgroundColor: "#090909", color: "#fff", duration: 1 },
                0.5
            )

            // Text animations - adjust timing for mobile
            const textDuration = isMobile ? 0.4 : 0.5
            tl.to(text1Ref.current, { opacity: 0, y: -40, duration: textDuration }, 0.4)
                .fromTo(
                    text2Ref.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: textDuration },
                    0.6
                )
        }, sectionRef)

        return () => ctx.revert()
    }, [])
    return (
        <section ref={sectionRef} className={style.section}>

            {/* Sticky SVG */}

            <svg ref={svg1Ref} className={style.svg} viewBox="0 0 2000 2000" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="curveGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E38330" />
                        <stop offset="50%" stopColor="#F7D544" />
                        <stop offset="100%" stopColor="#39B5D7" />
                    </linearGradient>
                </defs>

                <path
                    ref={path1Ref}
                    d="M1000 0 C 700 150 900 250 700 350 C 500 450 600 550 400 650 C 200 750 300 850 0 1000"
                    stroke="url(#curveGradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                />
            </svg>

            <svg ref={svg2Ref} className={style.svg} viewBox="0 0 900 1100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="curveGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E38330" />
                        <stop offset="50%" stopColor="#F7D544" />
                        <stop offset="100%" stopColor="#39B5D7" />
                    </linearGradient>
                </defs>

                <path
                    ref={path2Ref}
                    d="M1000 0 C 700 150 900 250 700 350 C 500 450 600 550 400 650 C 200 750 300 850 0 1000"
                    stroke="url(#curveGradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                />
            </svg>

            {/* Sticky Text Layer */}
            <div className={`container ${style.textWrapper}`}>
                <h1 ref={text1Ref}>Still Guessing Your Way Through Career Choices, Alone?</h1>
            </div>

            <div className={style.textWrapper2}>
                <h1 ref={text2Ref} style={{ opacity: 0 }}>
                    Now you don’t have to.
                </h1>
            </div>
        </section>
    )
}
