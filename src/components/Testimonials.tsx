import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            rating: 5,
            quote: "Rented a Mini for a quick trip to the coast. The app unlock feature is absolute magic. Never going back to traditional rental desks.",
            name: "Carlos M.",
            role: "Rents for weekend trips",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            rating: 5,
            quote: "Listing my second car pays for its own maintenance and insurance. The process is smooth and the support team is always helpful.",
            name: "Elena G.",
            role: "Peerly Host",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            rating: 5,
            quote: "Found a van to help me move flats. Booked instantly at 8 AM, drove it away at 8:15 AM. Cheapest and fastest moving day ever.",
            name: "David S.",
            role: "Frequent Renter",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150&h=150"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate heading
            gsap.fromTo(headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate cards staggering
            if (cardsRef.current) {
                gsap.fromTo(cardsRef.current.children,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] relative z-10 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Heading */}
                <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] mb-4">
                        Hear it from our community
                    </h2>
                    <p className="text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] text-lg md:text-xl font-medium">
                        Thousands of drivers and car owners trust Peerly every day.
                    </p>
                </div>

                {/* Cards Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-8 md:p-10 rounded-[var(--radius-3xl)] bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-900)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] shadow-[var(--shadow-lg)] dark:shadow-none transition-transform duration-300 hover:-translate-y-2 group"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[var(--color-semantic-warning)] text-[var(--color-semantic-warning)]" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-300)] text-base md:text-lg font-medium leading-relaxed mb-8 flex-1">
                                "{t.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 mt-auto">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-neutral-100)] dark:border-[var(--color-neutral-800)] group-hover:border-[var(--color-brand-primary)] dark:group-hover:border-[var(--color-brand-secondary)] transition-colors duration-300"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] text-sm md:text-base">
                                        {t.name}
                                    </span>
                                    <span className="text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] text-xs md:text-sm font-medium">
                                        {t.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
