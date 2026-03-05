import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Play, Flame, Check, ArrowRight, Instagram
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for sticky navbar styling
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
            Nero&Bianco <span className={isScrolled ? "text-gray-400" : "text-gray-500"}>Pizza</span>
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000" 
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
            Wij brengen de <br/><span className="text-transparent border-text" style={{ WebkitTextStroke: '2px white' }}>pizzeria</span> naar JOU
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Ervaar de ware, vurige smaak van Napels op jouw evenement. Vers deeg, authentieke ingrediënten, live bereid in onze mobiele houtoven.
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

      {/* Digital Menu Section */}
      <section id="menu" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Onze Klassiekers</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">De authentieke smaken van Napels, vers gebakken op 450°C in slechts 90 seconden.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { name: 'Margherita', desc: 'San Marzano tomatensaus, verse fior di latte, verse basilicum, extra vergine olijfolie.', price: '' },
              { name: 'Diavola', desc: 'San Marzano tomatensaus, fior di latte, pittige Napolitaanse salami, chili flakes.', price: '' },
              { name: 'Tartufo', desc: 'Witte basis (geen tomaat), fior di latte, truffelcrème, verse paddenstoelen, Parmezaan.', price: '' },
              { name: 'Marinara', desc: 'San Marzano tomatensaus, verse knoflook, oregano, extra vergine olijfolie (Vegan).', price: '' },
              { name: 'Prosciutto e Rucola', desc: 'Tomaat, fior di latte. Na het bakken: Prosciutto di Parma, rucola, Parmezaanse schilfers.', price: '' },
              { name: 'Quattro Formaggi', desc: 'Witte basis, fior di latte, Gorgonzola, Fontina, Parmigiano-Reggiano.', price: '' },
            ].map((pizza, idx) => (
              <div key={idx} className="border-b border-gray-800 pb-6 group hover:border-white transition-colors">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">{pizza.name}</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">{pizza.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Media Block (Live Cooking) */}
      <section id="media" className="py-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Live Cooking</h2>
            <p className="text-gray-600 text-lg max-w-xl">Ervaar de energie. Zie hoe ons deeg wordt gestretcht, belegd en binnen 90 seconden in onze vlammende oven transformeert.</p>
          </div>
          <a href="#" className="hidden md:flex items-center space-x-2 font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
            <Instagram size={20} />
            <span>Volg ons op de voet</span>
          </a>
        </div>

        {/* Mocking Vertical Videos with images & play buttons */}
        <div className="flex gap-4 px-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {[
            "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066",
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=1066",
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600&h=1066"
          ].map((src, i) => (
            <div key={i} className="relative flex-none w-[280px] sm:w-[320px] aspect-[9/16] bg-black snap-center cursor-pointer group">
              <img 
                src={src} 
                alt="Live cooking reel" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity saturate-200 contrast-125"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-white/40 transition-all">
                  <Play className="text-white fill-white ml-1" size={28} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-24 bg-gray-50 text-black border-y border-black/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Pakketten</h2>
            <p className="text-gray-600 text-lg">Kies de perfecte pizza-ervaring voor jouw evenement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-white border-2 border-black p-8 flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2">The Classic</h3>
              <p className="text-gray-500 mb-6 min-h-[48px]">De essentiële selectie voor een authentieke ervaring.</p>
              <div className="text-4xl font-black mb-8 border-b-2 border-black pb-8">
                <span className="text-lg align-top mr-1">Vanaf</span>€15<span className="text-lg text-gray-500 font-normal">/pp</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>2 uur live on-site bakken</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>3 Napolitaanse klassiekers (Margherita, Salami, Vegan)</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>Papieren borden & servetten</span></li>
              </ul>
              <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Selecteer</button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="bg-black text-white p-8 flex flex-col transform md:-translate-y-4 shadow-2xl relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1 text-xs font-bold uppercase tracking-widest border-2 border-black">
                Meest Populair
              </div>
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 mt-4">The Napoli Experience</h3>
              <p className="text-gray-400 mb-6 min-h-[48px]">De complete Italiaanse beleving inclusief antipasti.</p>
              <div className="text-4xl font-black mb-8 border-b-2 border-white/20 pb-8">
                <span className="text-lg align-top mr-1">Vanaf</span>€22<span className="text-lg text-gray-400 font-normal">/pp</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0 text-white" /><span>3 uur live on-site bakken</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0 text-white" /><span>Antipasti planken vooraf (Olijven, vleeswaren, focaccia)</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0 text-white" /><span>Keuze uit 5 premium pizza's</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0 text-white" /><span>Porseleinen borden optioneel</span></li>
              </ul>
              <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">Selecteer</button>
            </div>

            {/* Tier 3 */}
            <div className="bg-white border-2 border-black p-8 flex flex-col">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-2">The Premium Feast</h3>
              <p className="text-gray-500 mb-6 min-h-[48px]">Onbeperkt genieten met exclusieve toppings en desserts.</p>
              <div className="text-4xl font-black mb-8 border-b-2 border-black pb-8">
                <span className="text-lg align-top mr-1">Vanaf</span>€35<span className="text-lg text-gray-500 font-normal">/pp</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>Tot 4 uur onbeperkt pizza eten</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>Volledige menu inclusief truffel en burrata</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>Huisgemaakte Tiramisu of Cannoli als dessert</span></li>
                <li className="flex items-start space-x-3"><Check size={20} className="mt-1 flex-shrink-0" /><span>Inclusief luxe serviesgoed</span></li>
              </ul>
              <button onClick={() => scrollToSection('contact')} className="w-full py-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Selecteer</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">Boek de <br/>Houtoven</h2>
            <p className="text-xl text-gray-600 mb-8">Klaar voor een onvergetelijke culinaire ervaring? Vul het formulier in en we nemen binnen 24 uur contact met je op met een op maat gemaakte offerte.</p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-wide">Werkgebied</h4>
                  <p className="text-gray-600">Heel Nederland & Vlaanderen</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-wide">Capaciteit</h4>
                  <p className="text-gray-600">Vanaf 30 tot 300+ gasten</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Naam</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium" placeholder="Jouw naam" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">E-mail</label>
                  <input type="email" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium" placeholder="jouw@email.nl" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-black flex items-center gap-2"><Calendar size={16}/> Datum</label>
                  <input type="date" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-black flex items-center gap-2"><MapPin size={16}/> Locatie</label>
                  <input type="text" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium" placeholder="Stad / Dorp" />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2 text-black flex items-center gap-2"><Users size={16}/> Gasten</label>
                  <input type="number" min="10" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium" placeholder="Aantal" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Welk pakket / Extra wensen?</label>
                <textarea rows="4" className="w-full p-4 bg-gray-50 border-2 border-black focus:outline-none focus:ring-0 focus:border-black font-medium resize-none" placeholder="Vertel ons meer over je evenement..."></textarea>
              </div>

              <button type="submit" className="w-full py-5 bg-black text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-colors text-lg flex items-center justify-center space-x-2">
                <span>Verstuur Aanvraag</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase mb-6 md:mb-0">
            Nero&Bianco <span className="text-gray-500">Pizza</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Instagram</a>
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Facebook</a>
            <a href="#" className="hover:text-gray-400 transition-colors uppercase font-bold text-sm tracking-widest">Algemene Voorwaarden</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center text-gray-600 text-sm font-medium">
          &copy; {new Date().getFullYear()} Nero & Bianco Pizza. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
}

What would be the cheapest way to run this website? I have a strato wordpress hosting package and a domain name