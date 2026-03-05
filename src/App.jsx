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
      .catch(err => console.error("CMS data not found", err));
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

  // --- Dynamic Data Helpers ---
  const hero = cmsData?.hero || {
    title: "Wij brengen de pizzeria naar JOU",
    subtitle: "Ervaar de ware, vurige smaak van Napels op jouw evenement.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
  };

  const craftImage = cmsData?.craft?.image || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=1000";

  const pizzas = cmsData?.menu || [
    { name: 'Margherita', desc: 'San Marzano tomatensaus, verse fior di latte, basilicum.' },
    { name: 'Diavola', desc: 'San Marzano tomatensaus, fior di latte, pittige salami.' }
  ];

  const mediaItems = cmsData?.media || [
    { image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066" },
    { image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066" }
  ];

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Navbar (Same as before) */}
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
            <button onClick={() => scrollToSection('contact')} className={`px-6 py-3 border-2 ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>Offerte</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6">{hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
          <button onClick={() => scrollToSection('contact')} className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest inline-flex items-center gap-3">
            Offerte <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Craft Section */}
      <section id="craft" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter">Tijd is ons belangrijkste ingrediënt</h2>
          <img src={craftImage} className="w-full h-[500px] object-cover border-4 border-black" />
        </div>
      </section>

      {/* Dynamic Menu Section */}
      <section id="menu" className="py-24 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl font-black uppercase mb-16">Onze Klassiekers</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {pizzas.map((pizza, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <h3 className="text-2xl font-bold uppercase">{pizza.name} {pizza.price && <span className="text-gray-500 float-right">€{pizza.price}</span>}</h3>
                <p className="text-gray-400 mt-2">{pizza.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Media Section */}
      <section id="media" className="py-24 bg-white px-6">
        <h2 className="text-5xl font-black uppercase mb-12">Live Cooking</h2>
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x">
          {mediaItems.map((item, i) => (
            <div key={i} className="relative flex-none w-[300px] aspect-[9/16] bg-black snap-center group">
              <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="text-white fill-white" size={28} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* [Remaining Pricing and Contact sections go here...] */}

    </div>
  );
}