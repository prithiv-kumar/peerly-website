import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function Features() {
    const containerRef = useRef<HTMLElement>(null);
    const cursorAreaRef = useRef<HTMLDivElement>(null);

    const [cards, setCards] = useState([
        { id: 1, name: 'Porsche 911 Carrera', type: 'Sports', location: 'Downtown, 0.5m', rating: '4.9', hostImg: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100', carImg: 'https://www.ayvens.com/-/media/leaseplan-digital/pt/business-lease-and-private-lease/spotlight-pages/115_porsche-911/porsche-911_carrera_coupe-2020-1280-03.jpg' },
        { id: 2, name: 'Tesla Model S Plaid', type: 'Electric', location: 'Airport, 2.1m', rating: '5.0', hostImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100', carImg: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Range Rover SV', type: 'Luxury SUV', location: 'Westside, 1.2m', rating: '4.8', hostImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', carImg: 'https://cdn.aquelamaquina.pt/images/2019-02/img_944x629$2019_02_03_11_18_10_138993.jpg' }
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

            {/* Removed Typewriter Effect */ }

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
                                    className={`absolute w-64 h-40 rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--color-neutral-0)]/20 text-[var(--color-neutral-0)] flex flex-col justify-between overflow-hidden group/card`}
                                    style={{
                                        transform: `translateY(${index * 20}px) scale(${1 - (index * 0.05)})`,
                                        zIndex: 3 - index,
                                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    }}
                                >
                                    <img src={car.carImg} alt={car.name} className="absolute inset-0 w-full h-full object-cover z-0" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                                    <div className="relative p-4 z-10 flex justify-between items-start">
                                        <div>
                                            <div className="text-[10px] font-bold bg-[var(--color-neutral-0)]/20 backdrop-blur-md px-2 py-1 rounded-full w-fit mb-1 flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[var(--color-semantic-warning)]" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {car.rating}
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-neutral-0)]/50 overflow-hidden bg-[var(--color-neutral-200)]">
                                            <img src={car.hostImg} alt="Host" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="relative p-4 z-10 mt-auto">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="font-bold text-sm tracking-wide text-[var(--color-neutral-0)] drop-shadow-md">{car.name}</div>
                                                <div className="text-xs text-[var(--color-neutral-0)]/90 font-medium flex items-center gap-1 mt-0.5 drop-shadow-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {car.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Flexible Location</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Book cars from local hosts in your neighborhood. Pick up around the corner or have it delivered directly to you.</p>
                        </div>
                    </div>

                    {/* Card 2: Fair Pricing Mockup */}
                    <div className="feature-card bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] p-8 shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col h-[480px]">
                        <div className="flex-1 w-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] rounded-[var(--radius-2xl)] overflow-hidden relative flex items-center justify-center">
                            {/* The realistic hand holding phone mockup */}
                            <img src={`${import.meta.env.BASE_URL}fair-pricing-mobile.png`} alt="Fair Pricing Peerly App" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Fair Pricing</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Discover a vehicle for every budget. Transparent rates with no hidden fees—just pure, upfront value.</p>
                        </div>
                    </div>

                    {/* Card 3: Verified Hosts */}
                    <div className="feature-card bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] p-8 shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col h-[480px]">
                        <div className="flex-1 relative flex items-center justify-center bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] rounded-[var(--radius-2xl)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-primary)]/10 to-purple-500/10" />
                            <div className="relative z-10 bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-950)] p-5 rounded-[var(--radius-xl)] shadow-[var(--shadow-md)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col items-center gap-3 transform hover:scale-105 transition-transform duration-300">
                                <div className="flex -space-x-4">
                                    <div className="w-16 h-16 rounded-full border-4 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-950)] overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="Host" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-16 h-16 rounded-full border-4 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-950)] overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" alt="Guest" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-semantic-warning)]" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-sm text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)]">Peer Verified</div>
                                    <div className="text-xs flex items-center gap-1 text-[var(--color-neutral-500)] mt-1 justify-center">
                                        <ShieldCheck className="w-3 h-3 text-[var(--color-semantic-success)]" /> Identity & History Validated
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto pt-8">
                            <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Peer Validation</h4>
                            <p className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm leading-relaxed">Every user and vehicle is rigorously vetted. Transparent reviews and ratings ensure a community built on trust and respect.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
