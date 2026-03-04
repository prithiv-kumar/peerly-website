import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Search, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import Player from '@vimeo/player';
import { format } from 'date-fns';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';

const LOCATIONS = [
    "Lisbon",
    "Porto",
    "Faro",
    "Cascais",
    "Sintra",
    "Coimbra",
    "Braga",
    "Évora",
    "Aveiro",
    "Madeira",
    "Azores"
];

gsap.registerPlugin(TextPlugin);

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [locationQuery, setLocationQuery] = useState("");
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [calendarActiveInput, setCalendarActiveInput] = useState<'start' | 'end'>('start');

    const locationRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredLocations = LOCATIONS.filter(loc => loc.toLowerCase().includes(locationQuery.toLowerCase()));

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
        <section ref={containerRef} className="relative min-h-[100dvh] w-full flex items-end pb-[10vh] px-5 sm:px-8 md:px-12 xl:px-20 bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] z-50 transition-colors">

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
            <div className="relative z-20 w-full max-w-5xl">
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

                    <div className="cta-container mt-8 flex flex-col gap-6 w-full max-w-3xl z-40 relative">
                        {/* Glassmorphic Search Bar */}
                        <div className="bg-[var(--color-neutral-0)]/95 dark:bg-[var(--color-neutral-1000)]/95 backdrop-blur-xl rounded-[2.5rem] md:rounded-[var(--radius-full)] p-0 md:p-2 md:pr-2.5 shadow-[var(--shadow-2xl)] border border-[var(--color-neutral-200)]/50 dark:border-[var(--color-neutral-800)]/50 flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-2 relative pointer-events-auto group/search hover:border-[var(--color-neutral-300)] dark:hover:border-[var(--color-neutral-700)] transition-colors duration-300">

                            {/* Location Input */}
                            <div ref={locationRef} className="flex-1 flex items-center gap-4 px-6 pt-6 pb-2 md:px-4 md:py-2 md:border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] w-full group focus-within:bg-[var(--color-neutral-50)] dark:focus-within:bg-[var(--color-neutral-900)] md:rounded-[var(--radius-3xl)] transition-colors relative cursor-text text-left">
                                <div className="w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] flex items-center justify-center text-[var(--color-neutral-500)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">
                                    <MapPin className="w-5 h-5 md:w-4 md:h-4" />
                                </div>
                                <div className="flex flex-col flex-1 pl-1 md:pl-0">
                                    <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider mb-0.5">Location</label>
                                    <input
                                        type="text"
                                        placeholder="Malaga, Mál"
                                        value={locationQuery}
                                        onChange={(e) => {
                                            setLocationQuery(e.target.value);
                                            setIsLocationOpen(true);
                                        }}
                                        onFocus={() => setIsLocationOpen(true)}
                                        className="bg-transparent border-none outline-none text-base md:text-sm font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)] placeholder-[var(--color-neutral-400)] w-full truncate"
                                    />
                                </div>
                                {/* Dropdown */}
                                {isLocationOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-4 md:mt-6 bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-2xl)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] overflow-hidden z-50">
                                        <div className="max-h-[300px] overflow-y-auto p-2">
                                            {filteredLocations.map((loc) => (
                                                <button
                                                    key={loc}
                                                    onClick={() => {
                                                        setLocationQuery(loc);
                                                        setIsLocationOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 hover:bg-[var(--color-neutral-100)] dark:hover:bg-[var(--color-neutral-900)] rounded-xl text-sm font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)] transition-colors flex items-center gap-3"
                                                >
                                                    <MapPin className="w-4 h-4 text-[var(--color-neutral-400)]" />
                                                    {loc}, Portugal
                                                </button>
                                            ))}
                                            {filteredLocations.length === 0 && (
                                                <div className="px-4 py-3 text-sm text-[var(--color-neutral-500)]">No locations found.</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Dates Container */}
                            <div ref={calendarRef} className="flex-[2] flex flex-col md:flex-row relative">
                                {/* Pick Up Input */}
                                <div
                                    className="flex-1 flex items-center gap-4 px-6 py-3 md:px-4 md:py-2 md:border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] w-full group focus-within:bg-[var(--color-neutral-50)] dark:focus-within:bg-[var(--color-neutral-900)] md:rounded-[var(--radius-3xl)] transition-colors cursor-pointer text-left"
                                    onClick={() => { setIsCalendarOpen(true); setCalendarActiveInput('start'); }}
                                >
                                    <div className={`w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] flex items-center justify-center transition-colors ${isCalendarOpen && calendarActiveInput === 'start' ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-neutral-500)]'}`}>
                                        <Calendar className="w-5 h-5 md:w-4 md:h-4" />
                                    </div>
                                    <div className="flex flex-col flex-1 pl-1 md:pl-0">
                                        <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider mb-0.5">Start</label>
                                        <div className={`text-base md:text-sm font-semibold truncate ${dateRange?.from ? 'text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)]' : 'text-[var(--color-neutral-400)]'}`}>
                                            {dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Add dates"}
                                        </div>
                                    </div>
                                </div>

                                {/* Drop Off Input */}
                                <div
                                    className="flex-1 flex items-center gap-4 px-6 pt-2 pb-6 md:px-4 md:py-2 w-full group hover:bg-[var(--color-neutral-50)] dark:hover:bg-[var(--color-neutral-900)] md:rounded-[var(--radius-3xl)] transition-colors cursor-pointer text-left"
                                    onClick={() => { setIsCalendarOpen(true); setCalendarActiveInput('end'); }}
                                >
                                    <div className={`w-10 h-10 md:w-8 md:h-8 shrink-0 hidden md:flex rounded-full bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-900)] items-center justify-center transition-colors ${isCalendarOpen && calendarActiveInput === 'end' ? 'text-[var(--color-brand-primary)]' : 'opacity-0'}`}>
                                        <Calendar className="w-5 h-5 md:w-4 md:h-4" />
                                    </div>
                                    <div className="flex flex-col flex-1 pl-[3.5rem] md:pl-2">
                                        <label className="text-[10px] font-bold text-[var(--color-neutral-500)] uppercase tracking-wider mb-0.5">End</label>
                                        <div className={`text-base md:text-sm font-semibold truncate ${dateRange?.to ? 'text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-100)]' : 'text-[var(--color-neutral-400)]'}`}>
                                            {dateRange?.to ? format(dateRange.to, "MMM d, yyyy") : "Add dates"}
                                        </div>
                                    </div>
                                </div>

                                {/* Calendar Dropdown */}
                                {isCalendarOpen && (
                                    <div className="absolute top-full left-1/2 md:left-0 md:-translate-x-0 -translate-x-1/2 mt-4 md:mt-6 bg-[var(--color-neutral-0)] dark:bg-[var(--color-neutral-1000)] rounded-[var(--radius-3xl)] shadow-[var(--shadow-2xl)] border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] z-50 p-6 day-picker-custom">
                                        <DayPicker
                                            mode="range"
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1}
                                            pagedNavigation
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <button className="magnetic-btn bg-[#1a66ff] hover:bg-[#0052cc] text-white p-5 md:px-8 md:py-4 rounded-b-[2.5rem] md:rounded-[var(--radius-full)] font-sans text-base md:text-sm font-bold shadow-lg flex items-center justify-center gap-2 w-full md:w-auto transition-all transform md:active:scale-95 group-active:scale-[0.98] outline-none">
                                <Search className="w-5 h-5 md:w-4 md:h-4" />
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
