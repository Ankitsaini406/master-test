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
    const laptopRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const lidRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
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