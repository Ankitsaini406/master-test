"use client"

import { useState } from "react"
import style from "@/src/styles/faq.module.css"

// Structured Data
const faqData = [
    {
        category: "Booking & Rescheduling",
        questions: [
            { id: 1, q: "How do I book a mentorship call?", a: "You can book a mentorship call by logging into mentorunion.org, selecting your preferred mentor using filters like domain, and confirming an available slot. Booking is instant, designed to make real guidance just a few clicks away." },
            { id: 2, q: "Can I book more than one call at a time?", a: "Yes, you can schedule multiple sessions with different mentors depending on your credit balance." },
            { id: 3, q: "I can’t find a mentor in my domain. What should I do?", a: "Yes, rescheduling is available up to 24 hours before the session starts through your dashboard." },
            { id: 4, q: "I have credits, but can’t book a session. Why?", a: "Yes, rescheduling is available up to 24 hours before the session starts through your dashboard." },
            { id: 5, q: "Can I reschedule a session?", a: "Yes, rescheduling is available up to 24 hours before the session starts through your dashboard." },
            { id: 6, q: "What’s the cancellation policy?", a: "Yes, rescheduling is available up to 24 hours before the session starts through your dashboard." },
            { id: 7, q: "What happens if I miss a session without prior intimation?", a: "Yes, rescheduling is available up to 24 hours before the session starts through your dashboard." }
        ]
    },
    {
        category: "Tech Support & Navigation",
        questions: [
            { id: 4, q: "I can’t find a mentor in my domain. What should I do?", a: "We are constantly adding mentors. Please reach out to support, and we will find a match for you manually." },
            { id: 5, q: "What platform is used for the calls?", a: "Calls are hosted directly on our platform via high-quality video integration." }
        ]
    },
    {
        category: "Mentor, Feedback & Policies",
        questions: [
            { id: 6, q: "What’s the cancellation policy?", a: "Cancellations made 24 hours in advance receive a full credit refund." }
        ]
    }
];

export default function FAQ() {
    const [activeTab, setActiveTab] = useState(0); // For Left Categories
    const [openId, setOpenId] = useState<number | null>(null); // For Right Accordion

    const toggleAccordion = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className={style.faqSection}>
            <div className="container">
                <h5 className={style.title}>
                    Frequently Asked <br /> <span>Questions</span>
                </h5>

                <div className={style.contentWrapper}>
                    {/* LEFT SIDE: Sticky Categories */}
                    <div className={style.sidebar}>
                        <div className={style.stickyNav}>
                            {faqData.map((item, index) => (
                                <button
                                    key={index}
                                    className={`${style.catLink} ${activeTab === index ? style.activeCat : ""}`}
                                    onClick={() => {
                                        setActiveTab(index);
                                        setOpenId(null); // Close answers when switching categories
                                    }}
                                >
                                    {item.category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Accordion Questions */}
                    <div className={style.faqList}>
                        {faqData[activeTab].questions.map((faq) => (
                            <div
                                key={faq.id}
                                className={`${style.faqItem} ${openId === faq.id ? style.itemOpen : ""}`}
                            >
                                <button
                                    className={style.questionBtn}
                                    onClick={() => toggleAccordion(faq.id)}
                                >
                                    <h6>{faq.q}</h6>
                                    <span className={style.icon}>+</span>
                                </button>

                                <div className={style.answerWrapper}>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}