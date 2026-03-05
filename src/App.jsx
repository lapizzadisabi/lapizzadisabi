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
      .catch(() => console.log("Using default content"));
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
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  // Content Fallbacks
  const hero = cmsData?.hero || {
    title: "Wij brengen de pizzeria naar JOU",
    subtitle: "Ervaar de ware, vurige smaak van Napels op jouw evenement.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
  };

  const craft = cmsData?.craft || {
    title: "Tijd is ons belangrijkste ingrediënt",
    description: "Een perfecte Napolitaanse pizza begint lang voordat het vuur wordt aangestoken.",
    h1Title: "48-Uur Gefermenteerd Deeg",
    h1Text: "Onze bodem is licht, luchtig en licht verteerbaar.",
    h2Title: "Verse Ingrediënten",
    h2Text: "San Marzano tomaten en verse Fior di Latte.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=1000"
  };

  const media = cmsData?.media || [];

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white border-black/10 py-4' : 'bg-black text-white border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            La Pizza <span className={isScrolled ? "text-gray-400" : "text-gray-500"}>di Sabi</span>
          </div>
          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm tracking-widest uppercase">
            <button onClick={() => scrollToSection('craft')} className="hover:opacity-50">Ons Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="hover:opacity-50">Menu</button>
            <button onClick={() => scrollToSection('media')} className="hover:opacity-50">Live Cooking</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:opacity-50">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className={`px-6 py-3 border-2 font-black ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>Offerte</button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-60" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6">{hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
          <button onClick={() => scrollToSection('contact')} className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest inline-flex items-center space-x-3 text-lg">
            <span>Vraag een offerte aan</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Craft Section */}
      <section id="craft" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">{craft.title}</h2>
            <div className="space-y-6 text-lg text-gray-600 font-medium">
              <p>{craft.description}</p>
              <div className="pl-6 border-l-4 border-black py-2">
                <strong className="text-black block text-xl mb-1 uppercase tracking-wide">{craft.h1Title}</strong>
                {craft.h1Text}
              </div>
              <div className="pl-6 border-l-4 border-black py-2">
                <strong className="text-black block text-xl mb-1 uppercase tracking-wide">{craft.h2Title}</strong>
                {craft.h2Text}
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
            <img src={craft.image} alt="Craft" className="relative z-10 w-full h-full object-cover border-4 border-black" />
          </div>
        </div>
      </section>

      {/* STATIC MENU (Your request: Static again) */}
      <section id="menu" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-5xl md:text-6xl font-black uppercase mb-16">Onze Klassiekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { name: 'Margherita', desc: 'San Marzano tomatensaus, verse fior di latte, basilicum.' },
              { name: 'Diavola', desc: 'San Marzano tomatensaus, fior di latte, pittige salami.' },
              { name: 'Tartufo', desc: 'Witte basis, fior di latte, truffelcrème, paddenstoelen.' },
              { name: 'Marinara', desc: 'Tomaat, knoflook, oregano, olijfolie (Vegan).' },
              { name: 'Prosciutto e Rucola', desc: 'Tomaat, mozzarella, Prosciutto di Parma, rucola.' },
              { name: 'Quattro Formaggi', desc: 'Witte basis, fior di latte, Gorgonzola, Fontina, Parmezaan.' },
            ].map((pizza, idx) => (
              <div key={idx} className="border-b border-gray-800 pb-6 group hover:border-white transition-colors">
                <h3 className="text-2xl font-bold uppercase tracking-wide">{pizza.name}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{pizza.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Media Section (Fixing playback) */}
      <section id="media" className="py-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Live Cooking</h2>
        </div>
        <div className="flex gap-4 px-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {media.length > 0 ? media.map((item, i) => (
            <div key={i} className="relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] bg-black snap-center group overflow-hidden">
              <video 
                src={item.videoFile} 
                poster={item.poster}
                controls 
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              />
            </div>
          )) : (
            <p className="px-6 text-gray-400">Upload video's in het admin paneel om ze hier te tonen.</p>
          )}
        </div>
      </section>

      {/* [Pricing and Contact sections remain static and as before] */}
      
    </div>
  );
}