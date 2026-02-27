import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={cn(
                'fixed top-5 left-1/2 -translate-x-1/2 z-[var(--z-header)] transition-all duration-400 ease-[var(--transition-timing-standard)] rounded-[var(--radius-full)] px-6 py-3 flex items-center justify-between gap-8 min-w-[320px] max-w-[90vw]',
                isScrolled
                    ? 'bg-[var(--color-neutral-0)]/80 dark:bg-[var(--color-neutral-1000)]/80 backdrop-blur-xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] shadow-[var(--shadow-md)]'
                    : 'bg-transparent text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] border border-transparent'
            )}
        >
            <div className="font-display font-bold tracking-tight text-lg">
                Peerly
            </div>

            <div className="hidden md:flex items-center gap-6 font-sans text-sm font-medium">
                <a href="#fleet" className="hover:-translate-y-[1px] transition-transform">Fleet</a>
                <a href="#trust" className="hover:-translate-y-[1px] transition-transform">Trust & Safety</a>
                <a href="#how-it-works" className="hover:-translate-y-[1px] transition-transform">How it Works</a>
            </div>

            <button className="magnetic-btn overflow-hidden relative group bg-[var(--color-neutral-1000)] dark:bg-[var(--color-neutral-0)] text-[var(--color-neutral-0)] dark:text-[var(--color-neutral-1000)] px-5 py-2.5 rounded-[var(--radius-full)] font-sans text-sm font-bold">
                <span className="relative z-10">Sign Up</span>
            </button>
        </nav>
    );
}
