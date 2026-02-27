import { useEffect, useRef, Suspense, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Spline from '@splinetool/react-spline';

gsap.registerPlugin(TextPlugin);

function SplineFallback() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] text-[var(--color-neutral-400)] font-mono text-sm">
            <div className="w-8 h-8 rounded-full border-t-2 border-[var(--color-neutral-500)] animate-spin mb-4"></div>
            Loading 3D Experience...
        </div>
    );
}

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [splineLoaded, setSplineLoaded] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered text reveal for the first part
            gsap.fromTo('.reveal-text-top',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
            );

            // Typewriter effect for the main title
            gsap.to('.hero-typewriter', {
                duration: 2.5,
                text: "Drive the Extraordinary.",
                ease: "none",
                delay: 1.2
            });

            // Paragraph reveal
            gsap.fromTo('.reveal-text-bottom',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3.5 }
            );

            // CTA reveal
            gsap.fromTo('.cta-container',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 4.0 }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] w-full flex items-end pb-[10vh] px-5 sm:px-8 md:px-12 xl:px-20 overflow-hidden bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)]">

            {/* 3D Spline Container */}
            <div className={`absolute inset-0 z-0 w-full h-full pointer-events-auto transition-opacity duration-1000 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Suspense fallback={<SplineFallback />}>
                    <Spline
                        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                    />
                </Suspense>
            </div>
            {!splineLoaded && (
                <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                    <SplineFallback />
                </div>
            )}

            {/* Overlay to ensure text legibility */}
            <div className="absolute inset-x-0 bottom-0 z-1 h-2/3 bg-gradient-to-t from-[var(--color-neutral-0)] dark:from-[var(--color-neutral-1000)] via-[var(--color-neutral-0)]/70 dark:via-[var(--color-neutral-1000)]/70 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl pointer-events-none">
                <div className="flex flex-col gap-6">
                    <h1 className="flex flex-col">
                        <span className="reveal-text-top font-sans font-bold text-[var(--color-neutral-500)] text-xl md:text-2xl lg:text-3xl tracking-tight uppercase">
                            Peerly Signature
                        </span>
                        <span className="hero-typewriter font-display font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] text-[56px] leading-[0.9] md:text-[80px] lg:text-[110px] tracking-tighter mt-2 ml-[-4px] min-h-[1em]">
                            {/* Text populated by GSAP TextPlugin */}
                        </span>
                    </h1>

                    <p className="reveal-text-bottom text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] font-sans text-lg md:text-xl max-w-xl font-medium mt-4">
                        Unlock the world's most compelling vehicles from verified hosts. Seamless keyless entry, comprehensive commercial insurance, instantly.
                    </p>

                    <div className="cta-container mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto">
                        <button className="magnetic-btn overflow-hidden relative group bg-[var(--color-neutral-1000)] dark:bg-[var(--color-neutral-0)] text-[var(--color-neutral-0)] dark:text-[var(--color-neutral-1000)] px-10 py-5 rounded-[var(--radius-full)] font-sans text-base font-bold shadow-[var(--shadow-xl)]">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Browse Vehicles
                            </span>
                        </button>
                        <button className="magnetic-btn backdrop-blur-md bg-[var(--color-neutral-1000)]/5 dark:bg-[var(--color-neutral-0)]/5 border border-[var(--color-neutral-1000)]/10 dark:border-[var(--color-neutral-0)]/10 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] px-10 py-5 rounded-[var(--radius-full)] font-sans text-base font-semibold hover:bg-[var(--color-neutral-1000)]/10 dark:hover:bg-[var(--color-neutral-0)]/10 transition-colors">
                            Become a Host
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BlurFade({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(el,
            { y: 20, opacity: 0, filter: 'blur(10px)' },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                }
            }
        );
    }, [delay]);

    return <div ref={ref} className={className}>{children}</div>;
}
