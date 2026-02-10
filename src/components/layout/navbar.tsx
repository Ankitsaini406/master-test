import Link from "next/link";
import styles from "@/src/styles/nav.module.css";

export default function Navebar() {
    return (
        <nav className={styles.nav}>
            <div className='container'>
                {/* Logo */}
                <div className={styles.logo}>
                    <Link href="/">mentor union</Link>
                </div>

                {/* Navigation Links */}
                <div className={styles.links}>
                    <Link href="/">For Institutions</Link>
                    <Link href="/">Become a Mentor</Link>
                    <button className='pri-button'>Login
                        <span className="icon-wrapper">
                            <img src="/icons/arrow.svg" className="btn-icon icon1" />
                            <img src="/icons/arrow.svg" className="btn-icon icon2" />
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
