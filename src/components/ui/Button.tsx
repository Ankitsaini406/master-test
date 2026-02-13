"use client";

import Image from "next/image";
import React from "react";

type ButtonProps = {
    variant?: "primary" | "secondary"; // primary = main button, secondary = outline/secondary
    children: React.ReactNode;
    onClick?: () => void;
    className?: string; // extra class overrides
};

export default function Button({
    variant = "primary",
    children,
    onClick,
    className = "",
}: ButtonProps) {
    const isPrimary = variant === "primary";

    const baseClass = isPrimary ? "pri-button" : "sec-button";

    const iconFilter = isPrimary ? "invert(1)" : "none";

    return (
        <button className={`${baseClass} ${className}`} onClick={onClick}>
            {children}
            <span className="icon-wrapper">
                <Image
                    alt="arrow"
                    fill
                    src="/icons/arrow.svg"
                    className="btn-icon icon1"
                    style={{ filter: iconFilter }}
                />
                <Image
                    alt="arrow"
                    fill
                    src="/icons/arrow.svg"
                    className="btn-icon icon2"
                    style={{ filter: iconFilter }}
                />
            </span>
        </button>
    );
}
