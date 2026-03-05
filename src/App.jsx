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
      .catch(() => console.log("No CMS data yet, using defaults."));
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
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // --- Dynamic Content Fallbacks ---
  const hero = cmsData?.hero || {
    title: "Wij brengen de pizzeria naar JOU",
    subtitle: "Ervaar de ware, vurige smaak van Napels op jouw evenement. Vers deeg, authentieke ingrediënten, live bereid in onze mobiele houtoven.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
  };

  const craft = cmsData?.craft || {
    title: "Tijd is ons belangrijkste ingrediënt",
    description: "Een perfecte Napolitaanse pizza begint lang voordat het vuur wordt aangestoken.",
    f1Title: "48-Uur Gefermenteerd Deeg",
    f1Text: "Onze bodem is licht, luchtig en licht verteerbaar dankzij een langzaam rijpingsproces.",
    f2Title: "Verse Ingrediënten",
    f2Text: "San Marzano tomaten van de Vesuvius en verse Fior di Latte mozzarella.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=1000"
  };

  const reels = cmsData?.reels || [];

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
            <button onClick={() => scrollToSection('contact')} className={`px-6 py-3 border-2 font-black uppercase tracking-widest transition-all ${isScrolled ? 'border-black bg-black text-white' : 'border-white bg-white text-black'}`}>Offerte</button>
          </div>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <img src={hero.image} alt="Hero" className="w-full h-full object-cover opacity-60 saturate-200 contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white text-black px-4 py-2 uppercase tracking-widest font-bold text-xs mb-8">
            <Flame size={16} /> <span>On-site artisanal baking</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6">{hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">{hero.subtitle}</p>
          <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-3 text-lg">
            <span>Vraag een offerte aan</span> <ArrowRight size={24} />
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
                <strong className="text-black block text-xl mb-1 uppercase tracking-wide">{craft.f1Title}</strong> {craft.f1Text}
              </div>
              <div className="pl-6 border-l-4 border-black py-2">
                <strong className="text-black block text-xl mb-1 uppercase tracking-wide">{craft.f2Title}</strong> {craft.f2Text}
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
            <img src={craft.image} alt="Craft" className="relative z-10 w-full h-full object-cover saturate-[1.8] contrast-125 border-4 border-black" />
          </div>
        </div>
      </section>

      {/* STATIC MENU */}
      <section id="menu" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-5xl md:text-6xl font-black uppercase tracking-tighter mb-16">Onze Klassiekers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { name: 'Margherita', desc: 'San Marzano tomatensaus, verse fior di latte, basilicum, olijfolie.' },
              { name: 'Diavola', desc: 'San Marzano tomatensaus, fior di latte, pittige salami, chili flakes.' },
              { name: 'Tartufo', desc: 'Witte basis, fior di latte, truffelcrème, verse paddenstoelen, Parmezaan.' },
              { name: 'Marinara', desc: 'San Marzano tomatensaus, knoflook, oregano, olijfolie (Vegan).' },
              { name: 'Prosciutto e Rucola', desc: 'Tomaat, mozzarella, Prosciutto di Parma, rucola, Parmezaanse schilfers.' },
              { name: 'Quattro Formaggi', desc: 'Witte basis, fior di latte, Gorgonzola, Fontina, Parmezaan.' },
            ].map((p, i) => (
              <div key={i} className="border-b border-gray-800 pb-6 group hover:border-white transition-colors">
                <h3 className="text-2xl font-bold uppercase tracking-wide">{p.name}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Reels (FIXED) */}
      <section id="media" className="py-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Live Cooking</h2>
          <p className="text-gray-600 text-lg max-w-xl">Ervaar de energie. Zie hoe ons deeg wordt gestretcht en binnen 90 seconden transformeert.</p>
        </div>
        <div className="flex gap-4 px-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {reels.map((item, i) => (
            <div key={i} className="relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] bg-black snap-center group overflow-hidden border-4 border-black">
              <video 
                src={item.video} 
                poster={item.poster}
                controls 
                className="w-full h-full object-cover" 
                playsInline
                loop
                muted
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pricing & Contact (Remain Static) */}
      <section id="pricing" className="py-24 bg-gray-50 border-y border-black/10">
          {/* ... [Rest of Pricing code same as original] ... */}
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-5xl font-black uppercase mb-16">Pakketten</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-white border-2 border-black p-8">
                      <h3 className="text-2xl font-black uppercase mb-4">The Classic</h3>
                      <p className="mb-8">Vanaf €15/pp</p>
                      <button onClick={() => scrollToSection('contact')} className="w-full py-4 border-2 border-black font-bold uppercase">Selecteer</button>
                  </div>
                  <div className="bg-black text-white p-8 md:-translate-y-4">
                      <h3 className="text-2xl font-black uppercase mb-4">Napoli Experience</h3>
                      <p className="mb-8">Vanaf €22/pp</p>
                      <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-white text-black font-bold uppercase">Selecteer</button>
                  </div>
                  <div className="bg-white border-2 border-black p-8">
                      <h3 className="text-2xl font-black uppercase mb-4">Premium Feast</h3>
                      <p className="mb-8">Vanaf €35/pp</p>
                      <button onClick={() => scrollToSection('contact')} className="w-full py-4 border-2 border-black font-bold uppercase">Selecteer</button>
                  </div>
              </div>
          </div>
      </section>

      <section id="contact" className="py-24 px-6 bg-white">
          {/* ... [Rest of Contact form same as original] ... */}
          <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-5xl font-black uppercase mb-8">Boek de Houtoven</h2>
              <p className="mb-12 text-gray-600">Neem contact op voor een offerte op maat.</p>
              <button onClick={() => window.location.href='mailto:ciao@lapizzadisabi.nl'} className="bg-black text-white px-12 py-6 font-black uppercase tracking-widest text-xl">Stuur ons een mail</button>
          </div>
      </section>

      <footer className="bg-black text-white py-12 text-center">
        <div className="text-2xl font-black uppercase mb-4">La Pizza <span className="text-gray-500">di Sabi</span></div>
        <div className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} La Pizza di Sabi.</div>
      </footer>
    </div>
  );
}