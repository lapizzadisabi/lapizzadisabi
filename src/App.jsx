import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, Calendar, Users, 
  Check, ArrowRight, Star, Phone, Flame, Heart,
  Facebook, Instagram
} from 'lucide-react';

// Custom animations
const styles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: 200%;
    animation: marquee 20s linear infinite;
  }
  @keyframes spin-slow {
    100% { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
  }
  .animate-wiggle {
    animation: wiggle 2s ease-in-out infinite;
  }
  
  .btn-fluid {
    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-fluid:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px 0px rgba(28,28,28,1) !important;
  }

  /* Clean horizontal scrolling for video reels */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Wavy divider
const WaveDivider = ({ colorClass, flip = false }) => (
  <div className={`w-full overflow-hidden leading-none block ${flip ? 'rotate-180 -mt-1' : '-mb-1'}`}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-8 md:h-16 lg:h-24 ${colorClass}`}>
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,112.44,112.08,121.71,165.7,112.5,221.75,102.83,271.86,72.68,321.39,56.44Z" fill="currentColor"></path>
    </svg>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmsData, setCmsData] = useState(null);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    fetch('/content/data.json')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setCmsData(data))
      .catch(() => {
        console.log("CMS Data kon niet laden. Nood-fallbacks ingeschakeld.");
        // This only fires if the CMS database is completely broken/missing.
        setCmsData({
          hero: {
            title: "Pizza Feestje?", 
            subtitle: "Wij droppen de oven, fixen het deeg en maken er een smaakvol feest van.", 
            chefImage: "https://images.unsplash.com/photo-1627626775846-122b778965ae?auto=format&fit=crop&q=80&w=600",
            arrowImage: "https://lapizzadisabi.nl/54eb5c71-c425-463c-aa32-c4a42c59527d"
          }
        });
      });
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => setFormStatus('success'))
    .catch(() => setFormStatus('error'));
  };

  // ------------------------------------------------------------------
  // NEW: THE LOADING SCREEN
  // This blocks the browser from downloading heavy placeholder images!
  // ------------------------------------------------------------------
  if (!cmsData) {
    return (
      <div className="min-h-screen bg-[#FFF4CB] flex flex-col items-center justify-center text-[#1C1C1C]">
        <style>{styles}</style>
        <div className="text-6xl md:text-8xl animate-wiggle mb-6 drop-shadow-xl">🍕</div>
        <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest text-center px-4 animate-pulse">
          De oven is aan het voorverwarmen...
        </h2>
      </div>
    );
  }

  // --- CMS Content Mapping (Now guaranteed to be CMS Data) ---
  const hero = cmsData.hero || {};
  const packages = cmsData.pricing || [];
  const testimonials = cmsData.testimonials || [];
  const reels = cmsData.reels || [];
  const galleryBase = cmsData.gallery || [];
  const menuItems = cmsData.menu || [];

  const faqs = [
    {
      q: "Vanaf hoeveel personen of pizza’s kan ik jullie boeken?",
      a: "Wij zijn uniek in Nederland! Waar de meeste pizzacateraars pas uitrijden voor grote evenementen, komen wij de complete pizzeria-ervaring al verzorgen vanaf slechts 12 pizza’s. Dit maakt ons de ideale (en best betaalbare) keuze voor intieme verjaardagen, kleine teamlunches of gezellige familiediners."
    },
    {
      q: "Waar kunnen jullie komen bakken (binnen of buiten)?",
      a: "Wij komen naar vrijwel elke locatie in Nederland, of dat nu een achtertuin, bedrijfsterrein of zelfs een binnenruimte is. Omdat wij werken met hoogwaardige elektrische ovens is er geen rook en geen gedoe. Het enige wat wij nodig hebben, is een plek om onze professionele werktafel en ovens op te zetten."
    },
    {
      q: "Wat maakt jullie pizza's zo authentiek en bijzonder?",
      a: "Het geheim zit in de tijd en de ingrediënten. Wij maken échte Napolitaanse pizza's met een deeg dat een langdurig fermentatieproces ondergaat. Dit zorgt voor een onweerstaanbare smaak, een heerlijk luchtige, licht verteerbare korst (met de iconische leopard spots) en we gebruiken uitsluitend handgeselecteerde, verse topingrediënten."
    },
    {
      q: "Hoe ziet de ervaring er op de dag zelf uit?",
      a: "Wij verzorgen niet alleen het eten, maar ook de show! We bouwen onze professionele werkplek op en brengen de ovens op de perfecte hitte. Vervolgens rollen en beleggen we elke pizza met de hand, recht voor de neus van je gasten. Binnen slechts 90 seconden komt de pizza gloeiend heet en perfect gebakken uit de oven."
    },
    {
      q: "Wat kost een live pizza-ervaring op locatie?",
      a: "Topkwaliteit hoeft niet de hoofdprijs te kosten. Sterker nog: wij bieden een premium, ambachtelijke cateringervaring tegen het scherpste tarief van Nederland. Je krijgt de allerbeste Napolitaanse pizza's en een fantastische beleving, voor de beste prijs van het land."
    },
    {
      q: "Hoe kan ik La Pizza di Sabi reserveren voor mijn evenement?",
      a: "Klaar om je gasten te verrassen met een diner dat ze niet snel zullen vergeten? Omdat wij ook kleine groepen aannemen, vult onze agenda zich snel. Neem direct contact met ons op via de form om jouw datum vast te leggen en je wensen te bespreken!"
    }
  ];

  return (
    <div className="font-sans text-[#1C1C1C] bg-[#FFF4CB] min-h-screen selection:bg-[#FFAD87] selection:text-[#1C1C1C] antialiased overflow-x-hidden w-full max-w-[100vw] relative flex flex-col">
      <style>{styles}</style>
      
      {/* Floating Pill Navigation */}
      <div className="fixed w-full z-50 px-3 md:px-8 top-4 transition-all duration-300 pointer-events-none">
        <nav className={`mx-auto max-w-7xl pointer-events-auto transition-all duration-300 border-[3px] border-[#1C1C1C] rounded-full shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[6px_6px_0px_0px_rgba(28,28,28,1)] ${isScrolled ? 'bg-[#FFF4CB]/95 backdrop-blur-md py-2 px-4' : 'bg-[#FFF4CB] py-3 px-4 md:px-6'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:-rotate-3 transition-transform" onClick={() => window.scrollTo(0,0)}>
              <img src="/logo.png" alt="Logo" className="h-8 md:h-12 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
              <div className="text-xl md:text-2xl font-black tracking-tighter uppercase hidden sm:block">
                La Pizza <span className="text-[#FFAD87]">di Sabi</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6 font-black text-sm uppercase tracking-widest">
              <button onClick={() => scrollToSection('pakketten')} className="hover:text-[#FFAD87] hover:-translate-y-1 transition-all">Pakketten</button>
              <button onClick={() => scrollToSection('menu')} className="hover:text-[#FFAD87] hover:-translate-y-1 transition-all">Menu</button>
              <button onClick={() => scrollToSection('media')} className="hover:text-[#FFAD87] hover:-translate-y-1 transition-all">Vibe</button>
              
              <div className="flex gap-4 items-center border-l-[3px] border-[#1C1C1C] pl-6">
                <a href="https://www.instagram.com/la.pizza.di.sabi/" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87] hover:-translate-y-1 transition-all"><Instagram size={22} /></a>
                <a href="https://www.facebook.com/profile.php?id=61585626780705" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87] hover:-translate-y-1 transition-all"><Facebook size={22} /></a>
              </div>

              <button onClick={() => scrollToSection('contact')} className="px-6 py-2.5 bg-[#BDE0FE] border-[3px] border-[#1C1C1C] rounded-full shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] btn-fluid hover:bg-[#FFAD87] hover:text-[#1C1C1C]">
                Boek Ons!
              </button>
            </div>
            
            <button className="lg:hidden bg-white border-[3px] border-[#1C1C1C] rounded-full p-2 shadow-[0px_2px_0px_0px_rgba(28,28,28,1)] btn-fluid" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="absolute top-20 left-3 right-3 bg-[#C6F8E5] border-[3px] border-[#1C1C1C] rounded-3xl p-6 flex flex-col space-y-4 lg:hidden shadow-[0px_6px_0px_0px_rgba(28,28,28,1)] pointer-events-auto origin-top">
            <button onClick={() => scrollToSection('pakketten')} className="text-xl font-black uppercase text-left hover:text-[#FFAD87]">Pakketten</button>
            <button onClick={() => scrollToSection('menu')} className="text-xl font-black uppercase text-left hover:text-[#FFAD87]">Menu</button>
            <button onClick={() => scrollToSection('media')} className="text-xl font-black uppercase text-left hover:text-[#FFAD87]">Vibe</button>
            
            <div className="flex gap-5 pt-2 pb-1">
              <a href="https://www.instagram.com/la.pizza.di.sabi/" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87]"><Instagram size={28} /></a>
              <a href="https://www.facebook.com/profile.php?id=61585626780705" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87]"><Facebook size={28} /></a>
            </div>

            <button onClick={() => scrollToSection('contact')} className="text-xl font-black uppercase text-center bg-[#FFAD87] p-4 rounded-full border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] mt-2">Boek Ons Nu</button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 flex flex-col justify-center items-center overflow-hidden bg-[#FFF4CB]">
        
        <div className="absolute top-32 left-10 w-16 h-16 bg-[#FFAD87] rounded-full border-[3px] border-[#1C1C1C] animate-float z-10 hidden lg:block"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-[#BDE0FE] rotate-12 rounded-2xl border-[3px] border-[#1C1C1C] animate-float z-10 hidden lg:block" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-30 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full min-w-0">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-3/5 mt-4 md:mt-0 px-2 relative min-w-0">
            <h1 
              className="text-[3.2rem] leading-[0.95] sm:text-6xl md:text-[5.5rem] lg:text-[100px] font-black uppercase tracking-tighter mb-6 md:mb-8 text-[#1C1C1C] w-full break-words"
              style={{ textShadow: '2px 2px 0px white, 4px 4px 0px white' }}
            >
              {hero.title}
            </h1>
            
            <div className="bg-white border-[3px] border-[#1C1C1C] rounded-2xl md:rounded-full p-4 md:px-8 md:py-4 shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[6px_6px_0px_0px_rgba(28,28,28,1)] mb-8 md:mb-10 -rotate-1 md:-rotate-2 hover:rotate-1 transition-transform w-full md:w-auto">
              <p className="text-sm sm:text-base md:text-xl font-bold uppercase leading-snug md:leading-tight">
                {hero.subtitle}
              </p>
            </div>
            
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-[#FFAD87] font-black uppercase tracking-widest text-base md:text-xl border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[8px_8px_0px_0px_rgba(28,28,28,1)] btn-fluid flex justify-center items-center gap-3 hover:bg-[#BDE0FE] group">
              Vraag Offerte <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex justify-center w-full lg:w-2/5 mt-16 md:mt-24 lg:mt-0 scale-95 sm:scale-100">
            <div className="absolute -top-12 -left-2 sm:-left-8 md:-top-16 md:-left-16 flex flex-col items-center rotate-[-10deg] animate-float z-40">
              <span className="font-black text-xs sm:text-sm md:text-xl uppercase bg-[#BDE0FE] px-3 py-1 md:px-4 md:py-2 rounded-full border-[3px] border-[#1C1C1C] shadow-[2px_2px_0px_0px_rgba(28,28,28,1)] md:shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] text-[#1C1C1C] mb-2 -rotate-3">
                Meet your live Chef, Sabi!
              </span>
              <img 
                src={hero.arrowImage} 
                alt="Arrow pointing to Sabi" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain animate-wiggle drop-shadow-[2px_2px_0px_rgba(28,28,28,1)]"
              />
            </div>
            <div className="bg-white p-3 md:p-4 rounded-[2rem] border-[3px] border-[#1C1C1C] shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[8px_8px_0px_0px_rgba(28,28,28,1)] rotate-3 hover:-rotate-1 transition-transform relative z-30">
              <img 
                src={hero.chefImage} 
                alt="Chef Sabi" 
                className="w-56 h-72 md:w-72 md:h-96 object-cover rounded-2xl border-[3px] border-[#1C1C1C]" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* Floating Angled Marquee */}
      <div className="bg-[#1C1C1C] text-[#FFF4CB] py-3 md:py-5 border-y-[3px] border-[#1C1C1C] overflow-hidden flex whitespace-nowrap -rotate-2 scale-105 shadow-xl relative z-30">
        <div className="animate-marquee flex items-center gap-6 md:gap-8 text-xl md:text-4xl font-black uppercase tracking-widest">
          <span>🍕 450 Graden</span>
          <span>✨ 90 Seconden</span>
          <span>🎉 Jouw Feest</span>
          <span>🍕 450 Graden</span>
          <span>✨ 90 Seconden</span>
          <span>🎉 Jouw Feest</span>
          <span>🍕 450 Graden</span>
          <span>✨ 90 Seconden</span>
          <span>🎉 Jouw Feest</span>
        </div>
      </div>

      <div className="bg-[#FFF4CB] w-full relative z-20">
        <WaveDivider colorClass="text-[#FFAD87]" />
      </div>

      {/* Fluid Packages Section */}
      <section id="pakketten" className="pt-6 pb-24 md:pt-8 md:pb-32 px-4 md:px-6 bg-[#FFAD87] relative z-10 -mt-1 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
          <h2 className="text-center text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 md:mb-16 text-white" style={{ textShadow: '3px 3px 0px #1C1C1C' }}>Pakketten</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 items-stretch w-full min-w-0">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-6 md:p-10 flex flex-col rounded-[2rem] md:rounded-[2.5rem] border-[3px] border-[#1C1C1C] shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[10px_10px_0px_0px_rgba(28,28,28,1)] transition-transform duration-300 relative bg-white w-full
                ${i === 1 ? 'lg:-translate-y-8 z-20' : 'hover:-translate-y-2 z-10'}`}>
                
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#BDE0FE] text-[#1C1C1C] font-black uppercase tracking-widest py-1.5 px-5 text-sm rounded-full border-[3px] border-[#1C1C1C] whitespace-nowrap -rotate-3 shadow-[2px_2px_0px_0px_rgba(28,28,28,1)]">
                    Meest Gekozen!
                  </div>
                )}
                
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-3 tracking-tighter">{pkg.title}</h3>
                <p className="text-sm md:text-base mb-6 font-bold min-h-[48px] text-gray-600">{pkg.description}</p>
                
                <div className="bg-[#FFF4CB] -mx-3 p-3 rounded-xl border-[3px] border-[#1C1C1C] mb-8 rotate-1">
                  <div className="text-4xl md:text-5xl font-black tracking-tighter text-center">
                    €{pkg.price}<span className="text-base md:text-lg font-black uppercase tracking-widest opacity-80"> / per pizza</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm md:text-base font-bold">
                      <Check size={20} className="shrink-0 text-[#FFAD87]" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className="w-full py-4 rounded-full font-black uppercase text-base md:text-lg tracking-widest border-[3px] border-[#1C1C1C] btn-fluid shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] bg-[#1C1C1C] text-[#FFF4CB] hover:bg-[#FFAD87] hover:text-[#1C1C1C]">
                  Boek Dit
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#FFAD87] w-full relative z-20">
        <WaveDivider colorClass="text-[#BDE0FE]" />
      </div>

      {/* Smooth Menu Section */}
      <section id="menu" className="pt-6 pb-24 md:pt-8 md:pb-32 bg-[#BDE0FE] px-4 md:px-6 relative z-10 -mt-1 overflow-visible w-full">
        
        <div className="absolute top-0 right-4 md:top-10 md:right-20 w-20 h-20 md:w-32 md:h-32 bg-[#FFF4CB] rounded-full border-[3px] border-[#1C1C1C] shadow-[2px_2px_0px_0px_rgba(28,28,28,1)] md:shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] flex items-center justify-center animate-spin-slow z-20">
          <span className="font-black uppercase text-center text-[9px] md:text-sm tracking-widest leading-none rotate-12 text-[#1C1C1C]">100%<br/>Napoli<br/>Style</span>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-30 min-w-0">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4" style={{ textShadow: '3px 3px 0px #1C1C1C' }}>Het Menu</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-5 mb-16 md:mb-24 w-full min-w-0">
            {menuItems.map((p, i) => (
              <div key={i} className={`flex items-center gap-4 md:gap-6 bg-white border-[3px] border-[#1C1C1C] p-3 md:p-4 rounded-2xl md:rounded-[2rem] shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] hover:-translate-y-1 transition-transform ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} min-w-0`}>
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-[3px] border-[#1C1C1C] shrink-0 overflow-hidden shadow-inner">
                  <img src={p.img} alt={p.n} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1C1C1C] truncate">{p.n}</h3>
                  <p className="font-bold mt-1 text-xs md:text-sm text-gray-600 leading-tight">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full min-w-0">
            {galleryBase.slice(0, 4).map((photo, i) => (
              <div key={i} className={`border-[3px] border-[#1C1C1C] rounded-2xl md:rounded-3xl shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[6px_6px_0px_0px_rgba(28,28,28,1)] overflow-hidden bg-white
                ${i % 2 === 0 ? 'rotate-2 md:rotate-3 translate-y-2' : '-rotate-2'} hover:rotate-0 hover:scale-105 transition-all duration-300
              `}>
                <img src={photo} className="w-full aspect-[4/5] object-cover" alt="Pizza Party" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#BDE0FE] w-full relative z-20">
        <WaveDivider colorClass="text-[#C6F8E5]" />
      </div>

      {/* Trust Section */}
      <section className="pt-6 pb-24 md:pt-8 md:pb-32 bg-[#C6F8E5] px-4 md:px-6 relative z-10 -mt-1 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <h2 className="text-center text-5xl md:text-7xl font-black uppercase mb-12 md:mb-16 tracking-tighter text-white" style={{ textShadow: '3px 3px 0px #1C1C1C' }}>Liefde</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 w-full min-w-0">
            {testimonials.map((review, i) => (
              <div key={i} className="p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] rounded-bl-none border-[3px] border-[#1C1C1C] shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[8px_8px_0px_0px_rgba(28,28,28,1)] hover:-translate-y-2 transition-transform relative min-w-0">
                <div className="absolute -bottom-[3px] -left-[3px] w-6 h-6 md:w-8 md:h-8 bg-white border-b-[3px] border-l-[3px] border-[#1C1C1C] transform skew-x-[45deg] origin-top-left -z-10 shadow-[-2px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[-8px_8px_0px_0px_rgba(28,28,28,1)]"></div>
                
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 min-w-0">
                  <img src={review.image} alt={review.name} className="w-12 h-12 md:w-16 md:h-16 object-cover border-[3px] border-[#1C1C1C] rounded-full shrink-0" />
                  <div className="min-w-0">
                    <h4 className="text-lg md:text-xl font-black uppercase text-[#1C1C1C] truncate">{review.name}</h4>
                    <div className="flex gap-1 mt-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 md:w-5 md:h-5 fill-[#FFAD87] text-[#1C1C1C] stroke-[2px]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-base md:text-xl font-bold text-gray-700 leading-tight">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#C6F8E5] w-full relative z-20">
        <WaveDivider colorClass="text-[#FFAD87]" />
      </div>

      {/* Contact & FAQ Section */}
      <section id="contact" className="pt-6 pb-32 md:pt-8 md:pb-32 px-4 md:px-6 bg-[#FFAD87] relative z-10 -mt-1 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 w-full min-w-0">
          
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 w-full items-start min-w-0">
            
            <div className="flex flex-col gap-6 md:gap-8 w-full order-1 min-w-0 max-w-full">
              <div className="text-center lg:text-left min-w-0">
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2" style={{ textShadow: '3px 3px 0px #1C1C1C' }}>Let's Go!</h2>
                <p className="text-sm md:text-lg font-bold text-gray-800 uppercase bg-white inline-block px-4 py-1.5 rounded-full border-[3px] border-[#1C1C1C] -rotate-1 shadow-[2px_2px_0px_0px_rgba(28,28,28,1)] md:shadow-[4px_4px_0px_0px_rgba(28,28,28,1)]">Tijd voor een pizza party.</p>
              </div>

              <div id="media" className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar px-1 w-full min-w-0 max-w-full">
                {reels.map((item, i) => (
                  <div key={i} className={`relative flex-none w-[160px] md:w-[200px] aspect-[9/16] bg-black rounded-2xl md:rounded-3xl border-[3px] border-[#1C1C1C] shadow-[2px_4px_0px_0px_rgba(28,28,28,1)] overflow-hidden hover:-translate-y-2 transition-transform ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
                    <video src={item.video} poster={item.poster} controls preload="none" className="w-full h-full object-cover" playsInline loop muted />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full min-w-0 max-w-full order-2">
              {formStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[10px_10px_0px_0px_rgba(28,28,28,1)] w-full text-center h-full">
                  <div className="bg-[#C6F8E5] p-4 rounded-full border-[3px] border-[#1C1C1C] mb-2 animate-wiggle">
                    <Heart size={48} className="text-[#1C1C1C] fill-[#FFAD87]" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#1C1C1C]">Grazie!</h3>
                  <p className="font-bold text-base md:text-lg text-gray-700">We hebben je aanvraag ontvangen. Sabi neemt zo snel mogelijk contact met je op voor jouw pizza feestje.</p>
                  
                  <button onClick={() => setFormStatus(null)} className="mt-4 px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#BDE0FE] font-black uppercase tracking-widest text-sm md:text-base border-[3px] border-[#1C1C1C] btn-fluid shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] hover:bg-[#FFAD87] text-[#1C1C1C]">
                    Nog een bericht sturen
                  </button>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" onSubmit={handleFormSubmit} className="flex flex-col gap-4 md:gap-5 bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[10px_10px_0px_0px_rgba(28,28,28,1)] w-full max-w-full overflow-hidden box-border">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div className="flex flex-col gap-1.5 min-w-0 w-full max-w-full">
                    <label className="text-xs md:text-sm font-black uppercase tracking-widest pl-2">Naam</label>
                    <input required type="text" name="Naam" className="w-full min-w-0 max-w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl border-[3px] border-[#1C1C1C] bg-[#FFF4CB] focus:bg-white focus:outline-none transition-all font-bold text-base md:text-lg box-border appearance-none" placeholder="Jouw naam" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 min-w-0 w-full max-w-full">
                    <label className="text-xs md:text-sm font-black uppercase tracking-widest pl-2">Email / Telefoon</label>
                    <input required type="text" name="Contact" className="w-full min-w-0 max-w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl border-[3px] border-[#1C1C1C] bg-[#FFF4CB] focus:bg-white focus:outline-none transition-all font-bold text-base md:text-lg box-border appearance-none" placeholder="Hoe bereiken we je?" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full min-w-0 max-w-full">
                    <div className="flex flex-col gap-1.5 min-w-0 w-full max-w-full">
                      <label className="text-xs md:text-sm font-black uppercase tracking-widest pl-2">Datum</label>
                      <input required type="date" name="Datum" className="w-full min-w-0 max-w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl border-[3px] border-[#1C1C1C] bg-[#FFF4CB] focus:bg-white focus:outline-none transition-all font-bold text-base md:text-lg box-border appearance-none m-0" />
                    </div>
                    
                    <div className="flex flex-col gap-1.5 min-w-0 w-full max-w-full">
                      <label className="text-xs md:text-sm font-black uppercase tracking-widest pl-2">Aantal Pizza's</label>
                      <input 
                        required 
                        type="number" 
                        name="Aantal Pizza's" 
                        min="12"
                        className="w-full min-w-0 max-w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl border-[3px] border-[#1C1C1C] bg-[#FFF4CB] focus:bg-white focus:outline-none transition-all font-bold text-base md:text-lg box-border appearance-none m-0" 
                        placeholder="Hoeveel?" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0 w-full max-w-full">
                    <label className="text-xs md:text-sm font-black uppercase tracking-widest pl-2">Extra Info</label>
                    <textarea required name="Bericht" rows="3" className="w-full min-w-0 max-w-full p-3.5 md:p-4 rounded-xl md:rounded-2xl border-[3px] border-[#1C1C1C] bg-[#FFF4CB] focus:bg-white focus:outline-none transition-all resize-none font-bold text-base md:text-lg box-border appearance-none" placeholder="Locatie? Dieetwensen?"></textarea>
                  </div>

                  <button type="submit" disabled={formStatus === 'submitting'} className="w-full min-w-0 max-w-full py-4 md:py-5 mt-2 rounded-full bg-[#C6F8E5] font-black text-lg md:text-xl uppercase tracking-widest flex items-center justify-center gap-2 border-[3px] border-[#1C1C1C] btn-fluid shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[6px_6px_0px_0px_rgba(28,28,28,1)] hover:bg-[#BDE0FE] hover:text-[#1C1C1C] box-border disabled:opacity-70 disabled:cursor-not-allowed">
                    {formStatus === 'submitting' ? 'Even geduld...' : 'Stuur Aanvraag'} <Flame size={20} />
                  </button>
                  
                  {formStatus === 'error' && (
                    <p className="text-red-500 font-bold text-center text-sm mt-2">Er ging iets mis. Probeer het opnieuw!</p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center min-w-0">
            <div className="text-center mb-8 md:mb-12 min-w-0">
               <h3 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter" style={{ textShadow: '3px 3px 0px #1C1C1C' }}>Need to know</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full min-w-0 max-w-full">
              {faqs.map((faq, i) => (
                <details key={i} className="group border-[3px] border-[#1C1C1C] rounded-xl md:rounded-2xl p-4 bg-white shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] md:shadow-[4px_4px_0px_0px_rgba(28,28,28,1)] cursor-pointer hover:bg-[#FFF4CB] transition-colors w-full min-w-0 box-border h-max">
                  <summary className="font-black uppercase text-sm md:text-base list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden gap-4 min-w-0">
                    <span className="flex-1 break-words">{faq.q}</span>
                    <span className="bg-[#BDE0FE] border-[2px] border-[#1C1C1C] rounded-full p-1 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-xs md:text-sm text-gray-700 bg-white p-3 rounded-lg border-[2px] border-[#1C1C1C] leading-relaxed break-words">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Pop Footer */}
      <footer className="bg-[#1C1C1C] text-white py-12 md:py-16 px-6 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 relative z-20 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center w-full min-w-0">
          
          <div className="flex items-center gap-2 md:gap-3 mb-6 hover:scale-105 transition-transform cursor-pointer bg-white px-5 py-2 md:px-6 md:py-3 rounded-full border-[3px] border-[#FFAD87]" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#1C1C1C]">
              La Pizza <span className="text-[#FFAD87]">di Sabi</span>
            </div>
          </div>

          <div className="flex gap-6 mb-8 items-center">
            <a href="https://www.instagram.com/la.pizza.di.sabi/" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87] hover:-translate-y-1 transition-transform">
              <Instagram size={32} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61585626780705" target="_blank" rel="noreferrer" className="hover:text-[#FFAD87] hover:-translate-y-1 transition-transform">
              <Facebook size={32} />
            </a>
          </div>
          
          <p className="text-[#FFF4CB] text-xs md:text-sm uppercase tracking-widest font-black">
            &copy; {new Date().getFullYear()} La Pizza di Sabi. KVK 99346834.
          </p>
        </div>
      </footer>

      {/* Bouncy Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 flex gap-3 pointer-events-none">
        <a href="tel:+31612704367" className="flex-none p-3.5 rounded-full bg-[#C6F8E5] text-[#1C1C1C] border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] btn-fluid flex items-center justify-center pointer-events-auto">
          <Phone size={22} />
        </a>
        <button onClick={() => scrollToSection('contact')} className="flex-1 py-3.5 rounded-full bg-[#FFAD87] text-[#1C1C1C] font-black text-sm uppercase tracking-widest border-[3px] border-[#1C1C1C] shadow-[0px_4px_0px_0px_rgba(28,28,28,1)] btn-fluid pointer-events-auto">
          Boek Ons Nu!
        </button>
      </div>

      <div className="h-28 lg:hidden bg-[#1C1C1C] w-full"></div>

    </div>
  );
}