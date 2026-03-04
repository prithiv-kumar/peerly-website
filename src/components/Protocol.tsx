import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Elite Class",
        desc: "Uncompromising luxury. Featuring flagship sedans and premium SUVs from marque manufacturers, curated for executive presence and ultimate comfort.",
        image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=2915" // Red luxury car, sunny
    },
    {
        num: "02",
        title: "Electric Performance",
        desc: "The bleeding edge of automotive technology. Instant torque, zero emissions, and cutting-edge autonomous features for the modern driver.",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2941&auto=format&fit=crop" // Existing EV
    },
    {
        num: "03",
        title: "Road Trip Ready",
        desc: "Hit the open road in absolute comfort. Spacious SUVs and crossovers designed for long coastal driving, rugged weekend getaways, and creating unforgettable memories.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2940" // Coastal road trip SUV
    },
    {
        num: "04",
        title: "Family Cars",
        desc: "Space, safety, and versatility for the whole crew. Premium SUVs and people carriers with ample cargo room and top-tier safety features for total peace of mind.",
        image: "https://movetocascais.com/wp-content/uploads/2025/04/20250416_1958_avtomobil-v-portugalii_simple_compose_01jrzrg5p5ey4tg0scx1nh11tn-min.png",
        imagePosition: "center bottom"
    }
];

function InteractiveCard({ image, imagePosition }: { image: string, imagePosition?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !imageRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(imageRef.current, {
            x: x * -30,
            y: y * -30,
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            scale: 1.05,
            duration: 1,
            ease: "power2.out",
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden flex items-center justify-center cursor-crosshair group bg-[var(--color-neutral-950)] min-h-[400px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img
                ref={imageRef}
                src={image}
                alt="Fleet Category"
                className="absolute inset-0 w-full h-full object-cover scale-[1.05] filter brightness-75 group-hover:brightness-100 transition-all duration-700"
                style={{ objectPosition: imagePosition || 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral-1000)]/60 via-transparent to-[var(--color-neutral-1000)]/20 pointer-events-none mix-blend-multiply" />

            {/* Interactive Overlay Reticle */}
            <div className="absolute z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 text-[var(--color-neutral-0)] scale-95 group-hover:scale-100 transition-transform">
                <div className="w-20 h-20 border border-[var(--color-neutral-0)]/20 rounded-full flex items-center justify-center relative backdrop-blur-sm bg-[var(--color-neutral-1000)]/10">
                    <div className="absolute inset-x-0 h-[1px] bg-[var(--color-neutral-0)]/30 w-full" />
                    <div className="absolute inset-y-0 w-[1px] bg-[var(--color-neutral-0)]/30 h-full" />
                    <div className="w-12 h-12 border border-[var(--color-neutral-0)]/40 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 border-t-2 border-[var(--color-neutral-0)] rounded-full animate-spin [animation-duration:2s]" />
                        <div className="w-1.5 h-1.5 bg-[var(--color-neutral-0)] rounded-full" />
                    </div>
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-80 drop-shadow-md">View Intelligence</span>
            </div>
        </div>
    );
}

export function Protocol() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card') as HTMLElement[];

            cards.forEach((card, i) => {
                const inner = card.querySelector('.card-inner');
                // Scale/blur background cards as new ones scroll over
                if (i < cards.length - 1 && inner) {
                    gsap.to(inner, {
                        scale: 0.9,
                        opacity: 0.5,
                        filter: 'blur(10px)',
                        y: -40,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: "top bottom",
                            end: "top top",
                            scrub: true,
                        }
                    });
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="fleet" className="relative w-full bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-950)] pb-32">
            <div ref={containerRef} className="relative w-full">

                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="protocol-card sticky top-0 w-full h-[100vh] flex items-center justify-center p-5 sm:p-8 md:p-12 xl:p-20"
                        style={{ zIndex: i + 1 }}
                    >
                        <div className="card-inner w-full max-w-6xl h-full max-h-[800px] bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-900)] rounded-[var(--radius-3xl)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] shadow-[var(--shadow-2xl)] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">

                            {/* Content Side */}
                            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] relative z-10 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-900)]">
                                <span className="font-mono text-xl md:text-2xl text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] mb-6 tracking-wider font-semibold">
                                    {step.num}
                                </span>
                                <h3 className="font-display font-bold text-4xl md:text-6xl text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] mb-6 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-lg md:text-xl text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] leading-relaxed max-w-lg">
                                    {step.desc}
                                </p>
                            </div>

                            {/* Canvas/SVG Interactive Image Side */}
                            <div className="flex-1 overflow-hidden relative border-t md:border-t-0 border-[var(--color-neutral-800)]">
                                <InteractiveCard image={step.image} imagePosition={step.imagePosition} />
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
