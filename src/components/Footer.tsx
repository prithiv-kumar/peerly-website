import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function Footer() {
    const [dots, setDots] = useState('');
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('dark');
            setIsDark(false);
        } else {
            root.classList.add('dark');
            setIsDark(true);
        }
    };

    return (
        <footer className="w-full bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-950)] text-[var(--color-neutral-600)] dark:text-[var(--color-neutral-400)] rounded-t-[4rem] px-5 sm:px-8 md:px-12 xl:px-20 pt-20 pb-10 border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">

                {/* Brand Column */}
                <div className="flex flex-col gap-6 max-w-sm">
                    <h2 className="font-display font-bold text-3xl text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]">Peerly</h2>
                    <p className="font-sans text-sm leading-relaxed">
                        The ultimate vehicle sharing platform. Drive the extraordinary, hosted by a curated community of enthusiasts.
                    </p>
                    <div className="flex items-center gap-3 mt-4 px-4 py-2 bg-[var(--color-neutral-200)] dark:bg-[var(--color-neutral-900)] rounded-[var(--radius-full)] self-start border border-[var(--color-neutral-300)] dark:border-[var(--color-neutral-800)] mt-8">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-semantic-success)] shadow-[0_0_8px_var(--color-semantic-success)] animate-pulse" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-semantic-success)] font-medium">Fleet Active{dots}</span>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] uppercase text-xs tracking-widest mb-2">Explore</h4>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Our Fleet</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Become a Host</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Insurance</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Cities</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="font-sans font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] uppercase text-xs tracking-widest mb-2">Resources</h4>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Help Center</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Trust & Safety</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Vehicle Guide</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Host Community</a>
                    </div>

                    <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                        <h4 className="font-sans font-bold text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)] uppercase text-xs tracking-widest mb-2">Legal</h4>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Privacy Policy</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Terms of Service</a>
                        <a href="#" className="font-sans text-sm hover:text-[var(--color-neutral-1000)] dark:hover:text-[var(--color-neutral-300)] transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-800)] flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs">
                <p className="text-[var(--color-neutral-500)]">© {new Date().getFullYear()} Peerly. All rights reserved.</p>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-neutral-300)] dark:border-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)] dark:hover:bg-[var(--color-neutral-800)] transition-colors text-[var(--color-neutral-1000)] dark:text-[var(--color-neutral-0)]"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                        <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <p className="text-[var(--color-neutral-500)]">Built with precision.</p>
                </div>
            </div>
        </footer>
    );
}
