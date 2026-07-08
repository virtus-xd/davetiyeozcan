'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface GlowEnvelopeLandingProps {
    envelopeDesktop: string;
    envelopeMobile?: string;
    onOpen: () => void;
    onStart?: () => void;
}

/**
 * Kapalı zarf üstünden kat yerlerinden ışık sızması + beyaza bloom + geçiş
 */
export default function GlowEnvelopeLanding({ envelopeDesktop, envelopeMobile, onOpen, onStart }: GlowEnvelopeLandingProps) {
    const mobileBg = envelopeMobile ?? envelopeDesktop;
    const [go, setGo] = useState(false);

    // İstersen süreyi burada ayarla
    const D = useMemo(
        () => ({
            glowIn: 1.2,      // çizgilerin belirginleşmesi
            glowPeak: 0.9,    // parlamanın artması
            whiteBloom: 0.55, // beyaz ekran
            total: 1.2 + 0.9 + 0.55,
        }),
        []
    );

    useEffect(() => {
        if (!go) return;
        const t = window.setTimeout(() => onOpen(), Math.round(D.total * 1000));
        return () => window.clearTimeout(t);
    }, [go, onOpen, D.total]);

    const start = () => {
        if (go) return;
        setGo(true);
        onStart?.();
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label="Davetiyeyi aç"
            className="fixed inset-0 z-50 overflow-hidden bg-black cursor-pointer select-none"
            style={{
                width: "100vw",
                height: "100dvh",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
            }}
            onClick={start}
            onPointerUp={start}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    start();
                }
            }}
        >
            {/* Zarf görseli — mobile/desktop için ayrı katmanlar */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden pointer-events-none"
                style={{
                    transform: "translateZ(0)",
                    backgroundImage: `url('${mobileBg}')`,
                }}
            />
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block pointer-events-none"
                style={{
                    transform: "translateZ(0)",
                    backgroundImage: `url('${envelopeDesktop}')`,
                }}
            />

            {/* Işık çizgileri container */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Sol diagonal ışık */}
                <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{
                        width: "140vmax",
                        height: "10px",
                        transformOrigin: "center",
                        transform: "translate(-50%, -50%) rotate(23deg)",
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
                        filter: "blur(10px)",
                        opacity: 0,
                    }}
                    animate={
                        go
                            ? {
                                opacity: [0, 0.18, 0.42, 0.55],
                                scaleY: [0.5, 1, 1.35, 1.55],
                                filter: ["blur(14px)", "blur(10px)", "blur(18px)", "blur(22px)"],
                            }
                            : {}
                    }
                    transition={{
                        duration: D.glowIn + D.glowPeak,
                        ease: [0.22, 0.85, 0.12, 1],
                        times: [0, 0.35, 0.75, 1],
                    }}
                />

                {/* Sağ diagonal ışık */}
                <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{
                        width: "140vmax",
                        height: "10px",
                        transformOrigin: "center",
                        transform: "translate(-50%, -50%) rotate(-23deg)",
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
                        filter: "blur(10px)",
                        opacity: 0,
                    }}
                    animate={
                        go
                            ? {
                                opacity: [0, 0.16, 0.38, 0.52],
                                scaleY: [0.5, 1, 1.3, 1.5],
                                filter: ["blur(14px)", "blur(10px)", "blur(18px)", "blur(22px)"],
                            }
                            : {}
                    }
                    transition={{
                        duration: D.glowIn + D.glowPeak,
                        delay: 0.05,
                        ease: [0.22, 0.85, 0.12, 1],
                        times: [0, 0.35, 0.75, 1],
                    }}
                />

                {/* Üst flap hattı (yatay ışık) */}
                <motion.div
                    className="absolute left-1/2"
                    style={{
                        top: "30%",
                        width: "120vmax",
                        height: "8px",
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
                        filter: "blur(10px)",
                        opacity: 0,
                    }}
                    animate={
                        go
                            ? {
                                opacity: [0, 0.12, 0.28, 0.42],
                                scaleY: [0.7, 1, 1.2, 1.35],
                                filter: ["blur(16px)", "blur(12px)", "blur(18px)", "blur(22px)"],
                            }
                            : {}
                    }
                    transition={{
                        duration: D.glowIn + D.glowPeak,
                        delay: 0.08,
                        ease: [0.22, 0.85, 0.12, 1],
                        times: [0, 0.35, 0.75, 1],
                    }}
                />

                {/* Hafif “bloom” - ortadan yayılan ışık */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 48%, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.0) 38%, rgba(255,255,255,0.22) 60%, rgba(255,255,255,0.0) 78%)",
                        opacity: 0,
                        filter: "blur(18px)",
                    }}
                    animate={
                        go
                            ? {
                                opacity: [0, 0.15, 0.35, 0.55],
                                filter: ["blur(18px)", "blur(22px)", "blur(28px)", "blur(34px)"],
                            }
                            : {}
                    }
                    transition={{
                        duration: D.glowIn + D.glowPeak,
                        delay: 0.12,
                        ease: [0.22, 0.85, 0.12, 1],
                    }}
                />
            </div>

            {/* Son: full white ekran (flash) */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "white", opacity: 0 }}
                animate={
                    go
                        ? {
                            opacity: [0, 0.0, 1],
                        }
                        : {}
                }
                transition={{
                    duration: D.total,
                    ease: [0.22, 0.85, 0.12, 1],
                    times: [0, (D.glowIn + D.glowPeak) / D.total, 1],
                }}
            />

            {/* “Dokun ve aç” ipucu (başlamadan önce) */}
            {!go && (
                <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none z-20">
                    <p
                        className="text-white/70 text-sm tracking-[0.2em] font-light animate-pulse"
                        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    >
                        DAVETİYEYİ AÇMAK İÇİN DOKUN
                    </p>
                </div>
            )}

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 190px rgba(0,0,0,0.45)" }}
            />
        </div>
    );
}
