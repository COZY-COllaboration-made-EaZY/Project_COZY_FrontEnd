import Hero from '@/components/landings/Hero';
import Footer from '@/components/landings/Footer';
import QuickHelpBot from '@/components/landings/QuickHelpBot';

export default function Home() {
  return (
    <main className="theme-page relative min-h-screen overflow-hidden pt-16">
      <div className="theme-glow-1 pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="theme-glow-2 pointer-events-none absolute -bottom-24 right-6 h-48 w-48 rounded-full blur-2xl" />
      <div className="theme-stars pointer-events-none absolute inset-0" />
      <div className="theme-clouds pointer-events-none absolute inset-0" />
      <div className="theme-ocean-rays pointer-events-none absolute inset-0" />
      <div className="theme-sky-plane pointer-events-none" />
      <div className="theme-cosmic-planets pointer-events-none absolute inset-0" />
      <div className="theme-cosmic-blackhole pointer-events-none absolute inset-0" />
      <div className="theme-cosmic-sun pointer-events-none absolute inset-0" />
      <div className="theme-retro-grid pointer-events-none absolute inset-0" />
      <div className="theme-retro-pixels pointer-events-none absolute inset-0" />
      <div className="theme-retro-scanlines pointer-events-none absolute inset-0" />
      <div className="theme-retro-noise pointer-events-none absolute inset-0" />
      <Hero />
      {/*<Feature />*/}
      <QuickHelpBot />
      <Footer />
    </main>
  );
}
