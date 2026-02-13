"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/src/styles/nav.module.css";
import Button from "../ui/Button";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
            >
                <div className="container">
                    {/* Logo */}
                    <div className={styles.logo}>
                        <Link href="/">mentor union</Link>
                    </div>

                    {/* Desktop Links */}
                    <div className={styles.links}>
                        <Link href="/">For Institutions</Link>
                        <Link href="/">Become a Mentor</Link>

                        <Button variant="primary" onClick={() => {}}>
                            Login
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(true)}
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.showMenu : ""
                    }`}
            >
                <button
                    className={styles.closeBtn}
                    onClick={() => setMenuOpen(false)}
                >
                    ✕
                </button>

                <Link href="/" onClick={() => setMenuOpen(false)}>
                    For Institutions
                </Link>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                    Become a Mentor
                </Link>
                <button className="pri-button">Login</button>
            </div>
        </>
    );
}
