import Image from "next/image";
import styles from "@/src/styles/hero.module.css";

export default function Hero() {
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

            {/* Dark Overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <div className={styles.content}>
                <div className="container">
                    <h1 className={styles.herotext}>
                        Unlock Your Potential <br />
                        with <span><em>1:1</em> Mentorship</span>
                    </h1>

                    <p className={styles.description}>
                        Get <b>real-world insights</b> and career guidance from 650+ seasoned <br />
                        industry experts
                    </p>

                    <button className="sec-button">
                        Browse Mentors
                        <span className="icon-wrapper">
                            <img src="/icons/arrow.svg" className="btn-icon icon1" />
                            <img src="/icons/arrow.svg" className="btn-icon icon2" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
