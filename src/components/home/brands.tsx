"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/src/styles/brands.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Example: each cell has 4 images
const brandCells = [
    ["/brands/meta.png", "/brands/microsoft.png", "/brands/apple.png", "/brands/egle.png"],
    ["/brands/microsoft.png", "/brands/amazone.png", "/brands/blackrock.png", "/brands/citi.png"],
    ["/brands/apple.png", "/brands/goldman.png", "/brands/jp.png", "/brands/kpmg.png"],
    ["/brands/google.jpg", "/brands/cred.png", "/brands/ace.png", "/brands/bcg.png"],
    ["/brands/egle.png", "/brands/ey.png", "/brands/deloitte.png", "/brands/slash.png"],
    ["/brands/amazone.png", "/brands/linkdin.png", "/brands/pwc.png", "/brands/birla.png"],
    ["/brands/blackrock.png", "/brands/microsoft.png", "/brands/apple.png", "/brands/google.png"],
    ["/brands/citi.png", "/brands/amazone.png", "/brands/blackrock.png", "/brands/pwc.png"],
    ["/brands/g.png", "/brands/goldman.png", "/brands/jp.png", "/brands/kpmg.png"],
    ["/brands/goldman.jpg", "/brands/cred.png", "/brands/ace.png", "/brands/bcg.png"],
    ["/brands/kpmg.png", "/brands/ey.png", "/brands/deloitte.png", "/brands/slash.png"],
    ["/brands/ax.jpg", "/brands/linkdin.png", "/brands/pwc.png", "/brands/birla.png"],

    ["/brands/cred.png", "/brands/microsoft.png", "/brands/apple.png", "/brands/google.png"],
    ["/brands/ace.png", "/brands/amazone.png", "/brands/blackrock.png", "/brands/citi.png"],
    ["/brands/bcg.png", "/brands/goldman.png", "/brands/jp.png", "/brands/kpmg.png"],
    ["/brands/blinkit.jpg", "/brands/cred.png", "/brands/ace.png", "/brands/bcg.png"],
    ["/brands/ey.png", "/brands/birla.png", "/brands/deloitte.png", "/brands/slash.png"],
    ["/brands/deloitte.png", "/brands/linkdin.png", "/brands/pwc.png", "/brands/birla.png"],
    ["/brands/slash.png", "/brands/microsoft.png", "/brands/apple.png", "/brands/google.png"],
    ["/brands/mk.png", "/brands/amazone.png", "/brands/blackrock.png", "/brands/citi.png"],
    ["/brands/g.png", "/brands/goldman.png", "/brands/jp.png", "/brands/kpmg.png"],
    ["/brands/linkdin.png", "/brands/cred.png", "/brands/ace.png", "/brands/bcg.png"],
    ["/brands/pwc.png", "/brands/ey.png", "/brands/deloitte.png", "/brands/slash.png"],
    ["/brands/birla.png", "/brands/linkdin.png", "/brands/pwc.png", "/brands/birla.png"],
    // repeat to make 24 cells
];

export default function Brands() {
    const cubeRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        cubeRefs.current.forEach((cube) => {
            gsap.to(cube, {
                rotationY: 180,
                ease: "none",
                scrollTrigger: {
                    trigger: cube,
                    start: "top 60%",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }, []);

    return (
        <div className="container">
            <div className={styles.box}>
                <h2>
                    Gain Access to Mentors from <br />
                    <em>Global Brands</em>
                </h2>
            </div>

            <div className={styles.grid}>
                {brandCells.map((images, idx) => (
                    <div
                        key={idx}
                        className={styles.cell}
                    >
                        <div
                            className={styles.cube}
                            ref={(el: HTMLDivElement | null) => {
                                if (el) cubeRefs.current[idx] = el; // ✅ no return
                            }}
                        >
                            <div className={`${styles.face} ${styles.front}`} style={{ backgroundImage: `url(${images[0]})` }} />
                            <div className={`${styles.face} ${styles.back}`} style={{ backgroundImage: `url(${images[2]})` }} />
                            <div className={`${styles.face} ${styles.left}`} style={{ backgroundImage: `url(${images[3]})` }} />
                            <div className={`${styles.face} ${styles.right}`} style={{ backgroundImage: `url(${images[1]})` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// const brandData = [
//     { name: "Brand 1", img: "/brands/meta.png" },
//     { name: "Brand 2", img: "/brands/microsoft.png" },
//     { name: "Brand 3", img: "/brands/apple.png" },
//     { name: "Brand 4", img: "/brands/google.png" },
//     { name: "Brand 5", img: "/brands/egle.png" },
//     { name: "Brand 6", img: "/brands/amazone.png" },
//     { name: "Brand 7", img: "/brands/blackrock.png" },
//     { name: "Brand 8", img: "/brands/citi.png" },
//     { name: "Brand 9", img: "/brands/g.png" },
//     { name: "Brand 10", img: "/brands/goldman.png" },
//     { name: "Brand 11", img: "/brands/jp.png" },
//     { name: "Brand 12", img: "/brands/kpmg.png" },
//     { name: "Brand 13", img: "/brands/ax.jpg" },
//     { name: "Brand 14", img: "/brands/cred.png" },
//     { name: "Brand 15", img: "/brands/ace.png" },
//     { name: "Brand 16", img: "/brands/bcg.png" },
//     { name: "Brand 17", img: "/brands/blinkit.png" },
//     { name: "Brand 18", img: "/brands/ey.png" },
//     { name: "Brand 19", img: "/brands/deloitte.png" },
//     { name: "Brand 20", img: "/brands/slash.png" },
//     { name: "Brand 21", img: "/brands/mk.png" },
//     { name: "Brand 22", img: "/brands/linkdin.png" },
//     { name: "Brand 23", img: "/brands/pwc.png" },
//     { name: "Brand 24", img: "/brands/birla.png" },
// ];
