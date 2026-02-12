"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import style from "@/src/styles/mentorship.module.css"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function MentorShip() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const laptopRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const lidRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // -----------------------------
            // CINEMATIC TEXT REVEAL
            // -----------------------------
            const lines = headerRef.current?.querySelectorAll(".line")

            if (lines) {
                gsap.set(lines, {
                    opacity: 0,
                    y: 80
                })

                gsap.to(lines, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.25,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                })
            }

            // -----------------------------
            // LAPTOP LID ANIMATION
            // -----------------------------
            if (!lidRef.current || !laptopRef.current) return

            gsap.set(lidRef.current, {
                rotateX: -90,
                transformOrigin: "bottom center",
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: laptopRef.current,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 1
                }
            })

            tl.to(lidRef.current, {
                rotateX: 0,
                ease: "power2.out"
            })

            // -----------------------------
            // VIDEO PLAY / PAUSE
            // -----------------------------
            ScrollTrigger.create({
                trigger: laptopRef.current,
                start: "top 50%",
                onEnter: () => {
                    videoRef.current?.play()
                    setIsPlaying(true)
                },
                onLeaveBack: () => {
                    videoRef.current?.pause()
                    setIsPlaying(false)
                }
            })

        }, sectionRef)

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
            
            {/* HEADER */}
            <div ref={headerRef} className={style.headerContent}>
                <h4>
                    <span className="line">Begin Your Mentorship</span>
                    <span className="line">
                        Journey in <span>5 steps</span>
                    </span>
                </h4>
            </div>

            {/* LAPTOP */}
            <div 
                ref={laptopRef} 
                className={style.laptopWrapper} 
                onClick={toggleVideo}
            >
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
