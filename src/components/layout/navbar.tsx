import Link from "next/link";
import styles from "./nav.module.css";

export default function Navebar() {
    return (
        <nav className={styles.nav}>
            <div className='container'>
                {/* Logo */}
                <div className={styles.logo}>
                    <Link href="/">Logo</Link>
                </div>

                {/* Navigation Links */}
                <div className={styles.links}>
                    <Link href="/">For Institutions</Link>
                    <Link href="/">Become a Mentor</Link>
                    <button className={styles.loginBtn}>Login</button>
                </div>
            </div>
        </nav>
    );
}
