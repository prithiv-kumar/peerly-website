import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Search, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Player from '@vimeo/player';

gsap.registerPlugin(TextPlugin);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            const player = new Player(iframeRef.current);

            // Start at 20 seconds
            player.setCurrentTime(20);

            // Timeupdate event to loop back at 39 seconds
            player.on('timeupdate', (data) => {
                if (data.seconds >= 39) {
                    player.setCurrentTime(20);
                }
            });
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered text reveal for the first part
            gsap.fromTo('.reveal-text-top',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
            );

            // Typewriter effect for the main title
            gsap.to('.hero-typewriter', {
                duration: 1.5,
                text: "few taps",
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

            {/* Background Video */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-black">
                <iframe
                    ref={iframeRef}
                    src="https://player.vimeo.com/video/201242718?background=1&autoplay=1&byline=0&title=0#t=20s"
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                ></iframe>
                {/* Optional dark overlay to make text more legible */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Overlay to ensure text legibility */}
            <div className="absolute inset-x-0 bottom-0 z-1 h-2/3 bg-gradient-to-t from-[var(--color-neutral-0)] dark:from-[var(--color-neutral-1000)] via-[var(--color-neutral-0)]/70 dark:via-[var(--color-neutral-1000)]/70 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl pointer-events-none">
                <div className="flex flex-col gap-6">
                    <h1 className="flex flex-col">
                        <span className="reveal-text-top font-sans font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] text-[56px] leading-[1.1] md:text-[80px] lg:text-[90px] tracking-tighter ml-[-4px]">
                            Rent a car in just a
                        </span>
                        <span className="hero-typewriter font-display font-bold text-[#1a66ff] dark:text-[#3b82f6] text-[56px] leading-[0.9] md:text-[80px] lg:text-[90px] tracking-tighter mt-1 ml-[-4px] min-h-[1.2em]">
                            {/* Text populated by GSAP TextPlugin */}
                        </span>
                    </h1>

                    <p className="reveal-text-bottom text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-300)] font-sans text-lg md:text-xl max-w-xl font-medium mt-2 leading-relaxed">
                        Unlock cars <span className="text-[#1a66ff] dark:text-[#3b82f6] font-bold">24/7</span> with your phone, and go! Local cars with trip liability insurance included.
                    </p>

                    <div className="cta-container mt-8 flex flex-col gap-6 pointer-events-auto w-full max-w-3xl">
                        {/* Glassmorphic Search Bar */}
                        <div className="bg-[var(--color-neutral-0)]/90 dark:bg-[var(--color-neutral-1000)]/80 backdrop-blur-xl rounded-[var(--radius-full)] p-2 pr-2.5 shadow-[var(--shadow-2xl)] border border-[var(--color-neutral-200)]/50 dark:border-[var(--color-neutral-800)]/50 flex flex-col md:flex-row items-center gap-2 relative overflow-hidden group/search hover:border-[var(--color-neutral-300)] dark:hover:border-[var(--color-neutral-700)] transition-colors duration-300">

                            {/* Location Input */}
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 md:border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] w-full group focus-within:bg-[var(--color-neutral-100)] dark:focus-within:bg-[var(--color-neutral-900)] rounded-[var(--radius-3xl)] transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] flex items-center justify-center text-[var(--color-neutral-500)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Malaga, Mál"
                                        className="bg-transparent border-none outline-none text-sm font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)] placeholder-[var(--color-neutral-400)] w-full truncate"
                                    />
                                </div>
                            </div>

                            {/* Pick Up Input */}
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 md:border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] w-full group focus-within:bg-[var(--color-neutral-100)] dark:focus-within:bg-[var(--color-neutral-900)] rounded-[var(--radius-3xl)] transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] flex items-center justify-center text-[var(--color-neutral-500)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider">Start</label>
                                    <input
                                        type="text"
                                        placeholder="Mar 9, 07:00"
                                        className="bg-transparent border-none outline-none text-sm font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)] placeholder-[var(--color-neutral-400)] w-full truncate"
                                    />
                                </div>
                            </div>

                            {/* Drop Off Input */}
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-2 w-full group focus-within:bg-[var(--color-neutral-100)] dark:focus-within:bg-[var(--color-neutral-900)] rounded-[var(--radius-3xl)] transition-colors">
                                <div className="flex flex-col flex-1 pl-2">
                                    <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider">End</label>
                                    <input
                                        type="text"
                                        placeholder="Mar 12, 07:00"
                                        className="bg-transparent border-none outline-none text-sm font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)] placeholder-[var(--color-neutral-400)] w-full truncate"
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <button className="magnetic-btn bg-[#1a66ff] hover:bg-[#0052cc] text-white p-4 md:px-8 md:py-4 rounded-[var(--radius-full)] font-sans text-sm font-bold shadow-lg flex items-center justify-center gap-2 w-full md:w-auto transition-all transform active:scale-95">
                                <Search className="w-4 h-4" />
                                <span>Search</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 ml-4 mt-2">
                            <div className="flex -space-x-3">
                                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100" alt="User 1" className="w-10 h-10 rounded-full border-2 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-1000)] object-cover shadow-sm bg-[var(--color-neutral-100)]" />
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100" alt="User 2" className="w-10 h-10 rounded-full border-2 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-1000)] object-cover shadow-sm bg-[var(--color-neutral-100)]" />
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="User 3" className="w-10 h-10 rounded-full border-2 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-1000)] object-cover shadow-sm bg-[var(--color-neutral-100)]" />
                                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100&h=100" alt="User 4" className="w-10 h-10 rounded-full border-2 border-[var(--color-neutral-0)] dark:border-[var(--color-neutral-1000)] object-cover shadow-sm bg-[var(--color-neutral-100)]" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-3.5 h-3.5 fill-[var(--color-semantic-warning)] text-[var(--color-semantic-warning)]" />
                                    ))}
                                </div>
                                <span className="text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] text-sm font-medium mt-0.5">
                                    <strong className="text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)]">4.8/5</strong> from 10k+ reviews
                                </span>
                            </div>
                        </div>
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
