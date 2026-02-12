"use client";

import { useLayoutEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/src/styles/brands.module.css";
import { useReveal } from "@/src/hook/useReveal";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================
   Type Definitions
   ========================================== */
interface BrandImages {
    front: string;
    back: string;
    left: string;
    right: string;
}

interface BrandCell {
    id: string;
    images: BrandImages;
}

/* ==========================================
   Constants & Configuration
   ========================================== */
const ANIMATION_CONFIG = {
    rotation: 180,
    scrollTrigger: {
        start: "top 90%",
        end: "bottom top",
        scrub: true,
    },
    ease: "none",
} as const;

// Organize brand images for better maintainability
const BRAND_LOGOS = {
    meta: "/brands/meta.png",
    slash: "/brands/slash.png",
    blackrock: "/brands/blackrock.png",
    g: "/brands/g.png",
    microsoft: "/brands/microsoft.png",
    citi: "/brands/citi.png",
    goldman: "/brands/goldman.png",
    jp: "/brands/jp.png",
    apple: "/brands/apple.png",
    kpmg: "/brands/kpmg.png",
    cred: "/brands/cred.png",
    accenture: "/brands/ace.png",
    google: "/brands/google.png",
    bcg: "/brands/bcg.png",
    blinkit: "/brands/blinkit.png",
    ey: "/brands/ey.png",
    eagle: "/brands/egle.png",
    deloitte: "/brands/deloitte.png",
    linkedin: "/brands/linkdin.png",
    pwc: "/brands/pwc.png",
    amazon: "/brands/amazone.png",
    birla: "/brands/birla.png",
    ax: "/brands/ax.jpg",
    mk: "/brands/mk.png",
    goldmanAlt: "/brands/goldman.png",
} as const;

/* ==========================================
   Brand Data Generator
   ========================================== */
const generateBrandCells = (): BrandCell[] => {
    const cells: BrandCell[] = [];
    const brandLogos = Object.values(BRAND_LOGOS);

    // Generate 24 cells with rotating brand combinations
    for (let i = 0; i < 24; i++) {
        const startIndex = (i * 4) % brandLogos.length;
        cells.push({
            id: `brand-cell-${i}`,
            images: {
                front: brandLogos[startIndex % brandLogos.length],
                right: brandLogos[(startIndex + 1) % brandLogos.length],
                back: brandLogos[(startIndex + 2) % brandLogos.length],
                left: brandLogos[(startIndex + 3) % brandLogos.length],
            },
        });
    }

    return cells;
};

/* ==========================================
   Main Component
   ========================================== */
export default function Brands() {
    const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

    useReveal();

    // Memoize brand data to prevent recalculation
    const brandCells = useMemo(() => generateBrandCells(), []);

    // Optimized ref setter
    const setCubeRef = useCallback((el: HTMLDivElement | null, idx: number) => {
        cubeRefs.current[idx] = el;
    }, []);

    /* ==========================================
       Animation Setup
       ========================================== */
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Clean up any existing ScrollTriggers
            scrollTriggersRef.current.forEach((st) => st.kill());
            scrollTriggersRef.current = [];

            // Determine if mobile for optimized animations
            const isMobile = window.innerWidth < 768;

            cubeRefs.current.forEach((cube) => {
                if (!cube) return;

                // Create animation with optimized settings
                const animation = gsap.to(cube, {
                    rotationY: ANIMATION_CONFIG.rotation,
                    ease: ANIMATION_CONFIG.ease,
                    scrollTrigger: {
                        trigger: cube,
                        start: ANIMATION_CONFIG.scrollTrigger.start,
                        end: ANIMATION_CONFIG.scrollTrigger.end,
                        scrub: isMobile ? 0.5 : true,
                        // Optimize for performance
                        invalidateOnRefresh: true,
                        // Only refresh on resize, not on every scroll
                        refreshPriority: -1,
                    },
                });

                // Store reference for cleanup
                const triggerId = animation.scrollTrigger?.vars.id;
                if (triggerId) {
                    const st = ScrollTrigger.getById(triggerId);
                    if (st) scrollTriggersRef.current.push(st);
                }
            });
        });

        // Cleanup function
        return () => {
            ctx.revert();
            scrollTriggersRef.current.forEach((st) => st.kill());
            scrollTriggersRef.current = [];
        };
    }, [brandCells.length]); // Only re-run if brand cells length changes

    // Refresh ScrollTrigger on window resize (debounced by GSAP)
    useLayoutEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ==========================================
       Render
       ========================================== */
    return (
        <section
            className="container"
            aria-labelledby="brands-heading"
        >
            <div className={styles.box}>
                <h2 id="brands-heading" className="reveal">
                    Gain Access to Mentors from <br />
                    <span>Global Brands</span>
                </h2>
            </div>

            <div
                className={styles.grid}
                role="list"
                aria-label="Brand logos showcase"
            >
                {brandCells.map((cell, idx) => (
                    <div
                        key={cell.id}
                        className={styles.cell}
                        role="listitem"
                        aria-label={`Brand showcase ${idx + 1}`}
                    >
                        <div
                            className={styles.cube}
                            ref={(el) => setCubeRef(el, idx)}
                            data-cube-index={idx}
                        >
                            <div
                                className={`${styles.face} ${styles.front}`}
                                style={{ backgroundImage: `url(${cell.images.front})` }}
                                role="img"
                                aria-label="Brand logo"
                            />
                            <div
                                className={`${styles.face} ${styles.back}`}
                                style={{ backgroundImage: `url(${cell.images.back})` }}
                                role="img"
                                aria-label="Brand logo"
                            />
                            <div
                                className={`${styles.face} ${styles.left}`}
                                style={{ backgroundImage: `url(${cell.images.left})` }}
                                role="img"
                                aria-label="Brand logo"
                            />
                            <div
                                className={`${styles.face} ${styles.right}`}
                                style={{ backgroundImage: `url(${cell.images.right})` }}
                                role="img"
                                aria-label="Brand logo"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
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
