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
    const pathRef = useRef<SVGPathElement>(null)
    const text1Ref = useRef<HTMLHeadingElement>(null)
    const text2Ref = useRef<HTMLHeadingElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const path = pathRef.current
            const svg = svgRef.current
            if (!path || !svg) return

            const length = path.getTotalLength()

            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 40%",
                    end: "bottom bottom",
                    scrub: true,
                },
            })

            // Draw SVG line
            tl.to(svg, {
                opacity: 1,
                duration: 0.2,
            })
            tl.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                duration: 1,
            })

            // Switch background + text
            tl.to(
                sectionRef.current,
                {
                    backgroundColor: "#090909",
                    color: "#ffffff",
                    duration: 1,
                },
                0.5
            )

            // Text animation
            tl.to(
                text1Ref.current,
                { opacity: 0, y: -40, duration: 0.5 },
                0.4
            ).fromTo(
                text2Ref.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.5 },
                0.6
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className={style.section}>

            {/* Sticky SVG */}
            <svg ref={svgRef} className={style.svg} viewBox="0 0 1000 600" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="curveGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#E38330" />
                        <stop offset="50%" stopColor="#F7D544" />
                        <stop offset="100%" stopColor="#39B5D7" />
                    </linearGradient>
                </defs>

                <path
                    ref={pathRef}
                    d="M1000 0 C 700 150 300 450 0 600"
                    stroke="url(#curveGradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>

            {/* Sticky Text Layer */}
            <div className={style.textWrapper}>
                <h1 ref={text1Ref}>Still Guessing Your Way Through Career Choices, Alone?</h1>
                <h1 ref={text2Ref} style={{ opacity: 0 }}>
                    Now you don’t have to.
                </h1>
            </div>
        </section>
    )
}
