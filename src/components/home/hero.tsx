"use client";

import Image from "next/image";
import styles from "@/src/styles/hero.module.css";
import { useReveal } from "@/src/hook/useReveal";
import Button from "../ui/Button";

export default function Hero() {
    useReveal();

    const images = [
        "/person/1.png",
        "/person/2.png",
        "/person/3.png",
        "/person/4.png",
        "/person/5.png",
        "/person/6.png",
        "/person/7.png",
        "/person/8.png",
        "/person/9.png",
        "/person/10.png",
        "/person/11.png",
        "/person/12.png",
    ]

    return (
        <section className={styles.hero}>
            {/* Background Image */}
            <Image
                src="/images/kunal.png"
                alt="Kunal Image"
                fill
                priority
                className={styles.image}
            />

            <div className={styles.wrapper}>
                {/* Outer Circle - 6 Images */}
                <div className={styles.circleOuter}>
                    <div className={styles.orbitContainer}>
                        {images.slice(0, 6).map((img, i) => (
                            <div
                                key={i}
                                className={styles.planet}
                                style={{ "--angle": `${i * 60}deg` } as React.CSSProperties}
                            >
                                <Image fill src={img} alt="mentor" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inner Circle - 6 Images */}
                <div className={styles.circleInner}>
                    <div className={styles.orbitContainerReverse}>
                        {images.slice(6, 12).map((img, i) => (
                            <div
                                key={i}
                                className={styles.planetSmall}
                                style={{ "--angle": `${i * 60}deg` } as React.CSSProperties}
                            >
                                <img src={img} alt="mentor" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dark Overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <div className={styles.content}>
                <div className="container">
                    <h1 className={`${styles.herotext} reveal`}>
                        Unlock Your Potential <br />
                        with <span>1:1 Mentorship</span>
                    </h1>

                    <p className={`${styles.description} reveal`}>
                        Get <b>real-world insights</b> and career guidance from 650+ seasoned industry experts
                    </p>

                    <Button variant="secondary" onClick={() => {}}>
                        Browse Mentors
                    </Button>
                </div>
            </div>
        </section>
    );
}
