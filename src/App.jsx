import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Play, Flame, Check, ArrowRight, Instagram
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmsData, setCmsData] = useState(null);

  useEffect(() => {
    fetch('/content/data.json')
      .then(res => res.json())
      .then(data => setCmsData(data))
      .catch(() => console.log("Using default fallback content"));
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  // --- CMS Content Mapping ---
  const hero = cmsData?.hero || {
    title: "Wij brengen de pizzeria naar JOU",
    subtitle: "Authentieke Napolitaanse pizza op locatie.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
  };

  const craft = cmsData?.craft || {
    title: "Tijd is ons belangrijkste ingrediënt",
    description: "Een perfecte pizza begint met geduld en passie.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=1000"
  };

  const packages = cmsData?.pricing || [
    { title: "The Classic", price: "15", description: "Essentiële selectie.", features: ["2 uur bakken", "3 klassiekers"] },
    { title: "Napoli Experience", price: "22", featured: true, description: "De complete beleving.", features: ["3 uur bakken", "Antipasti", "5 premium pizza's"] }
  ];

  const reels = cmsData?.reels || [];

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white antialiased">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white border-black/10 py-3' : 'bg-black text-white border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            La Pizza <span className={isScrolled ? "text-gray-400" : "text-gray-500"}>di Sabi</span>
          </div>
          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm tracking-widest uppercase">
            {['craft', 'menu', 'media', 'pricing'].map(sec => (
              <button key={sec} onClick={() => scrollToSection(sec)} className="hover:opacity-50 transition-opacity">
                {sec === 'craft' ? 'Ambacht' : sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')} className={`px-6 py-3 border-2 font-black text-xs tracking-widest transition-all ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>Offerte</button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black p-8 flex flex-col space-y-6 lg:hidden border-b-2 border-black animate-in slide-in-from-top duration-300">
             <button onClick={() => scrollToSection('craft')} className="text-2xl font-black uppercase text-left">Ambacht</button>
             <button onClick={() => scrollToSection('menu')} className="text-2xl font-black uppercase text-left">Menu</button>
             <button onClick={() => scrollToSection('media')} className="text-2xl font-black uppercase text-left">Live Cooking</button>
             <button onClick={() => scrollToSection('pricing')} className="text-2xl font-black uppercase text-left">Pakketten</button>
             <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-black text-white font-bold uppercase mt-4">Vraag Offerte</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-black pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-60" alt="Pizza Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-6">{hero.title}</h1>
          <p className="text-base md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">{hero.subtitle}</p>
          <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 text-lg hover:bg-gray-200 transition-colors">
            Offerte Aanvragen <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Craft Section */}
      <section id="craft" className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">{craft.title}</h2>
            <p className="text-lg text-gray-600 font-medium mb-8 leading-relaxed">{craft.description}</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
            <img src={craft.image} className="relative z-10 w-full aspect-[4/3] object-cover border-4 border-black" alt="Ambacht" />
          </div>
        </div>
      </section>

      {/* Menu Section (Static as requested) */}
      <section id="menu" className="py-20 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Onze Klassiekers</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { name: 'Margherita', desc: 'Tomaat, fior di latte, basilicum, olijfolie.' },
              { name: 'Diavola', desc: 'Tomaat, fior di latte, pittige salami.' },
              { name: 'Tartufo', desc: 'Fior di latte, truffel, paddenstoelen.' },
              { name: 'Marinara', desc: 'Tomaat, knoflook, oregano (Vegan).' },
            ].map((p, i) => (
              <div key={i} className="border-b border-gray-800 pb-6 group hover:border-white transition-all">
                <h3 className="text-xl md:text-2xl font-bold uppercase">{p.name}</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Cooking Videos */}
      <section id="media" className="py-20 bg-white px-6 overflow-hidden">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tighter">Live Cooking</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {reels.map((item, i) => (
            <div key={i} className="relative flex-none w-[75vw] sm:w-[320px] aspect-[9/16] bg-black snap-center overflow-hidden border-4 border-black">
              <video src={item.video} poster={item.poster} controls className="w-full h-full object-cover" playsInline loop muted />
            </div>
          ))}
        </div>
      </section>

      {/* Packages (Now fully CMS-driven) */}
      <section id="pricing" className="py-20 bg-gray-50 px-6 border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Pakketten</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 flex flex-col border-4 border-black transition-transform ${pkg.featured ? 'bg-black text-white lg:-translate-y-4 scale-105 shadow-2xl z-10' : 'bg-white text-black shadow-lg'}`}>
                {pkg.featured && <div className="text-center font-black uppercase text-xs tracking-widest mb-4 bg-white text-black py-1 px-4 self-center">Meest Gekozen</div>}
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.title}</h3>
                <p className={`text-sm mb-6 ${pkg.featured ? 'text-gray-400' : 'text-gray-500'}`}>{pkg.description}</p>
                <div className="text-4xl font-black mb-8 border-b-2 border-current pb-8">€{pkg.price}<span className="text-lg font-normal opacity-50">/pp</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-medium">
                      <Check size={18} className="shrink-0 mt-0.5" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 font-black uppercase tracking-widest border-2 border-black transition-colors ${pkg.featured ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-white hover:text-black'}`}>Selecteer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 tracking-tighter leading-none">Boek de Houtoven</h2>
          <p className="text-lg text-gray-600 mb-12">Klaar voor een offerte op maat?</p>
          <a href="mailto:ciao@lapizzadisabi.nl" className="inline-block bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-xl hover:scale-105 transition-transform shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">Stuur een Mail</a>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-6 text-center">
        <div className="text-xl font-black uppercase mb-4 tracking-tighter">La Pizza <span className="text-gray-500">di Sabi</span></div>
        <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">&copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}