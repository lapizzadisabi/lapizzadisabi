import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Play, Flame, Check, ArrowRight, Instagram
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmsData, setCmsData] = useState(null);

  // 1. Fetch the data saved by Decap CMS
  useEffect(() => {
    fetch('/content/data.json')
      .then((response) => response.json())
      .then((data) => setCmsData(data))
      .catch((error) => console.log('No CMS data found yet, using defaults.', error));
  }, []);

  // 2. Handle scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 3. Set default values in case the CMS hasn't been published yet
  const heroTitle = cmsData?.heroTitle || "Wij brengen de pizzeria naar JOU";
  const heroSubtitle = cmsData?.heroSubtitle || "Ervaar de ware, vurige smaak van Napels op jouw evenement. Vers deeg, authentieke ingrediënten, live bereid in onze mobiele houtoven.";
  const heroImage = cmsData?.heroImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white border-black/10 py-4' : 'bg-black text-white border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            La Pizza <span className={isScrolled ? "text-gray-400" : "text-gray-500"}>di Sabi</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 font-bold text-sm tracking-widest uppercase">
            <button onClick={() => scrollToSection('craft')} className="hover:opacity-50 transition-opacity">Ons Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="hover:opacity-50 transition-opacity">Menu</button>
            <button onClick={() => scrollToSection('media')} className="hover:opacity-50 transition-opacity">Live Cooking</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:opacity-50 transition-opacity">Pakketten</button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`px-6 py-3 border-2 transition-all duration-300 ${
                isScrolled 
                  ? 'border-black bg-black text-white hover:bg-white hover:text-black' 
                  : 'border-white bg-white text-black hover:bg-transparent hover:text-white'
              }`}
            >
              Vraag een offerte aan
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black p-6 flex flex-col space-y-6 lg:hidden border-b border-black">
            <button onClick={() => scrollToSection('craft')} className="text-left text-xl font-black uppercase tracking-wide">Ons Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="text-left text-xl font-black uppercase tracking-wide">Menu</button>
            <button onClick={() => scrollToSection('media')} className="text-left text-xl font-black uppercase tracking-wide">Live Cooking</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left text-xl font-black uppercase tracking-wide">Pakketten</button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="w-full py-4 bg-black text-white text-center font-bold uppercase tracking-widest mt-4"
            >
              Vraag een offerte aan
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section (Powered by CMS) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Neapolitan Pizza" 
            className="w-full h-full object-cover opacity-60 saturate-200 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white text-black px-4 py-2 uppercase tracking-widest font-bold text-xs mb-8">
            <Flame size={16} className="text-black" />
            <span>On-site artisanal baking</span>
          </div>
          {/* Using dangerouslySetInnerHTML allows the CMS to output line breaks if needed, but simple text works too */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubtitle}
          </p>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-3 text-lg"
          >
            <span>Vraag een offerte aan</span>
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* The Craft Section */}
      <section id="craft" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Tijd is ons <br/>belangrijkste <br/>ingrediënt
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-medium">
                <p>
                  Een perfecte Napolitaanse pizza begint lang voordat het vuur wordt aangestoken. Wij geloven in de kracht van geduld en pure, onbewerkte ingrediënten.
                </p>
                <div className="pl-6 border-l-4 border-black py-2">
                  <strong className="text-black block text-xl mb-1 uppercase tracking-wide">48-Uur Gefermenteerd Deeg</strong>
                  Onze bodem is licht, luchtig en licht verteerbaar dankzij een langzaam rijpingsproces van 48 uur. Geen haast, alleen puur ambacht.
                </div>
                <div className="pl-6 border-l-4 border-black py-2">
                  <strong className="text-black block text-xl mb-1 uppercase tracking-wide">Verse Ingrediënten</strong>
                  We gebruiken uitsluitend San Marzano tomaten van de vulkanische bodem van de Vesuvius en verse Fior di Latte mozzarella die elke ochtend wordt geleverd.
                </div>
              </div>
            </div>
            <div className="relative h-[600px]">
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=1000" 
                alt="Making Pizza Dough" 
                className="relative z-10 w-full h-full object-cover saturate-[1.8] contrast-125 border-4 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ... [Menu, Media, and Pricing sections remain exactly the same] ... */}

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-900 mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase mb-6 md:mb-0">
            La Pizza <span className="text-gray-500">di Sabi</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Instagram</a>
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Facebook</a>
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Algemene Voorwaarden</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center text-gray-600 text-sm font-medium">
          &copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
}