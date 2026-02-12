"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import style from "@/src/styles/mentorship.module.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function MentorShip() {
    const sectionRef = useRef<HTMLDivElement>(null) // NEW: Section ref
    const laptopRef = useRef<HTMLDivElement>(null)  // NEW: Laptop wrapper ref
    const videoRef = useRef<HTMLVideoElement>(null)
    const lidRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!lidRef.current || !laptopRef.current) return

            // 1. Set the initial "Closed" state
            // Rotate -90 degrees so it's flat against the base
            gsap.set(lidRef.current, {
                rotateX: -90,
                transformOrigin: "bottom center",
            })

            // 2. Create the Opening Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: laptopRef.current, // Use the STATIC wrapper as trigger
                    start: "top 85%",           // Start when the laptop enters view
                    end: "top 30%",            // End when it's further up
                    scrub: 1,                   // Smooth scrubbing
                    // markers: true,           // Uncomment this to debug!
                }
            })

            tl.to(lidRef.current, {
                rotateX: 0,
                ease: "power2.out"
            })

            // 3. Play video when it reaches a certain point
            ScrollTrigger.create({
                trigger: laptopRef.current,
                start: "top 50%",
                onEnter: () => {
                    videoRef.current?.play()
                    setIsPlaying(true)
                },
                // Optional: Pause when scrolling back up
                onLeaveBack: () => {
                    videoRef.current?.pause()
                    setIsPlaying(false)
                }
            })

        }, sectionRef) // Scope to section

        return () => ctx.revert()
    }, [])

    const toggleVideo = () => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <section ref={sectionRef} className={style.section}>
            <div className={style.headerContent}>
                <h4>
                    Begin Your Mentorship <br />
                    Journey in <span>5 steps</span>
                </h4>
            </div>

            {/* Added laptopRef here */}
            <div ref={laptopRef} className={style.laptopWrapper} onClick={toggleVideo}>
                <div ref={lidRef} className={style.macbookLid}>
                    <div className={style.screenContent}>
                        <div className={`${style.playOverlay} ${isPlaying ? style.hidden : ""}`}>
                            <div className={style.playButton}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        <video
                            ref={videoRef}
                            className={style.video}
                            src="/videos/Get-prepped-call-scheduled-animations.mp4"
                            playsInline
                            muted
                            loop
                        />
                    </div>
                </div>

                <div className={style.macbookBase}>
                    <div className={style.trackpadGroove}></div>
                </div>
            </div>
        </section>
    )
}