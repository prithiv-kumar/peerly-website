import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function Features() {
    const containerRef = useRef<HTMLElement>(null);
    const typewriterRef = useRef<HTMLDivElement>(null);
    const cursorAreaRef = useRef<HTMLDivElement>(null);

    const [cards, setCards] = useState([
        { id: 1, name: 'Porsche 911 Carrera', type: 'Sports', color: 'bg-[var(--color-neutral-900)]' },
        { id: 2, name: 'Tesla Model S Plaid', type: 'Electric', color: 'bg-[var(--color-neutral-800)]' },
        { id: 3, name: 'Range Rover SV', type: 'Luxury SUV', color: 'bg-[var(--color-neutral-700)]' }
    ]);

    // Auto cycle the cards
    useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const next = [...prev];
                const first = next.shift();
                if (first) next.push(first);
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // General Cards Reveal
            gsap.from('.feature-card', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                }
            });

            {/* Shuffler Interaction removed from GSAP as it is now React State driven */ }

            // 2. Typewriter Effect (Instant Booking)
            if (typewriterRef.current) {
                const text = "> Verifying credentials...\n> Approving commercial insurance...\n> Generating digital key...\n> Access granted. Drive safe.";
                const target = document.querySelector('.typewriter-target');
                if (target) {
                    gsap.to(target, {
                        text: text,
                        duration: 4,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: typewriterRef.current,
                            start: 'top 80%',
                        }
                    });
                }
            }

            // 3. Cursor Interaction (Verified Hosts)
            if (cursorAreaRef.current) {
                const cursor = document.querySelector('.simulated-cursor');
                if (cursor) {
                    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
                    tl.to(cursor, { x: 80, y: 40, duration: 1, ease: 'power2.inOut' })
                        .to('.grid-cell-1', { backgroundColor: 'var(--color-neutral-200)', duration: 0.2 }, "-=0.2")
                        .to(cursor, { x: 30, y: 120, duration: 1.2, ease: 'power2.inOut', delay: 0.5 })
                        .to('.grid-cell-2', { backgroundColor: 'var(--color-neutral-200)', duration: 0.2 }, "-=0.2")
                        .to(cursor, { x: 0, y: 0, duration: 1, ease: 'power2.inOut', delay: 0.5 })
                        .to(['.grid-cell-1', '.grid-cell-2'], { backgroundColor: 'transparent', duration: 0.5 }, "+=1");
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="how-it-works" className="py-32 px-5 sm:px-8 md:px-12 xl:px-20 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-950)] relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 max-w-2xl">
                    <h2 className="font-sans font-bold text-sm tracking-widest uppercase text-[var(--color-neutral-500)] mb-4">Core Principles</h2>
                    <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">
                        Engineered for absolute trust.
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Card 1: Fleet Diversity */}
                    <div className="feature-card bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] p-8 shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col h-[480px]">
                        <div
                            className="flex-1 relative flex justify-center mt-12 cursor-pointer group"
                            onClick={() => setCards(prev => {
                                const next = [...prev];
                                const first = next.shift();
                                if (first) next.push(first);
                                return next;
                            })}
                        >
                            {cards.map((car, index) => (
                                <div
                                    key={car.id}
                                    className={`absolute w-64 h-40 ${car.color} rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-lg)] border border-[var(--color-neutral-0)]/20 text-[var(--color-neutral-0)] flex flex-col justify-between`}
                                    style={{
                                        transform: `translateY(${index * 20}px) scale(${1 - (index * 0.05)})`,
                                        opacity: index === 0 ? 1 : index === 1 ? 0.6 : 0.3,
                                        zIndex: 3 - index,
                                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                >
                                    <div>
                                        <div className="text-xs opacity-70 mb-1 font-mono uppercase tracking-wider">{car.type}</div>
                                        <div className="font-bold text-sm tracking-wide">{car.name}</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Sparkles className="w-5 h-5 opacity-50" />
                                        {index === 0 && <span className="text-[10px] font-mono opacity-0 group-hover:opacity-50 transition-opacity">TAP TO CYCLE</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Curated Fleet</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Access an exclusive, endlessly rotating garage of premium vehicles verified for maintenance and aesthetic perfection.</p>
                        </div>
                    </div>

                    {/* Card 2: Instant Booking */}
                    <div className="feature-card bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] p-8 shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col h-[480px]">
                        <div className="flex-1 bg-[var(--color-neutral-1000)] dark:bg-[var(--color-neutral-900)] rounded-[var(--radius-2xl)] p-6 font-mono text-xs overflow-hidden relative" ref={typewriterRef}>
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-semantic-error)]/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-semantic-warning)]/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-semantic-success)]/80"></div>
                            </div>
                            <div className="mt-8 whitespace-pre-wrap typewriter-target text-[var(--color-neutral-0)]"></div>
                            <span className="inline-block w-2 h-4 bg-[var(--color-neutral-0)] opacity-70 animate-pulse ml-1"></span>
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Telemetry Protocol</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Frictionless verification. Instant commercial insurance binding and digital key provisioning directly to your device.</p>
                        </div>
                    </div>

                    {/* Card 3: Verified Hosts */}
                    <div className="feature-card bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] p-8 shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col h-[480px]">
                        <div className="flex-1 relative" ref={cursorAreaRef}>
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 opacity-20">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className={`rounded-md border border-[var(--color-neutral-400)] ${i === 5 ? 'grid-cell-1' : ''} ${i === 10 ? 'grid-cell-2' : ''}`}></div>
                                ))}
                            </div>
                            {/* Simulated SVG Cursor */}
                            <svg className="simulated-cursor absolute top-4 left-4 w-6 h-6 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] z-10" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }} viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1">
                                <path d="M4 1.5l16 11-6.5 2-3.5 8-6-21z" />
                            </svg>
                            <div className="absolute right-4 bottom-4 flex items-center gap-2 bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] px-3 py-1.5 rounded-full text-xs font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)]">
                                <ShieldCheck className="w-4 h-4" /> Validated
                            </div>
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Peer Validated</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Every host and vehicle is rigorously vetted against a 150-point algorithmic and physical inspection criteria.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
