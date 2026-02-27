import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line by line reveal
            const words = gsap.utils.toArray('.philosophy-word');

            gsap.fromTo(words,
                { y: 50, opacity: 0, rotateX: -20 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Parallax bg
            gsap.to('.philosophy-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.philosophy-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, textRef);

        return () => ctx.revert();
    }, []);

    // Split text helper
    const splitWords = (text: string) => text.split(' ').map((word, i) => (
        <span key={i} className="inline-block philosophy-word mr-[0.25em]">{word}</span>
    ));

    return (
        <section id="trust" className="philosophy-section relative w-full min-h-[80vh] bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-950)] flex items-center justify-center py-32 overflow-hidden px-5 sm:px-8 md:px-12 xl:px-20 transition-colors duration-500">

            <div
                className="philosophy-bg absolute inset-0 z-0 bg-cover bg-center object-cover opacity-20"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2670&auto=format&fit=crop")' }}
            />

            <div className="absolute inset-0 z-1 bg-gradient-to-b from-[var(--color-neutral-100)] dark:from-[var(--color-neutral-950)] via-[var(--color-neutral-100)]/80 dark:via-[var(--color-neutral-950)]/80 to-[var(--color-neutral-100)] dark:to-[var(--color-neutral-950)] transition-colors duration-500" />

            <div ref={textRef} className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center gap-12">
                <p className="font-sans font-medium text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-xl md:text-2xl max-w-3xl leading-relaxed">
                    {splitWords("Traditional car rental is a labyrinth of hidden fees, manual paperwork, and unpredictable inventory.")}
                </p>

                <h2 className="font-display font-medium text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] max-w-5xl">
                    {splitWords("We engineered ")}
                    <br className="hidden md:block" />
                    <span className="inline-block philosophy-word mr-[0.25em] italic font-bold text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-300)] mt-2">
                        Frictionless Motion.
                    </span>
                </h2>
            </div>
        </section>
    );
}
