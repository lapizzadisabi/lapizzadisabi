import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Check, ArrowRight, Star, Phone, Camera, CheckCircle
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmsData, setCmsData] = useState(null);

  useEffect(() => {
    fetch('/content/data.json')
      .then(res => res.json())
      .then(data => setCmsData(data))
      .catch(() => console.log("Laden van content..."));
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

  // --- CMS Content Helpers & Bulletproof Fallbacks ---
  const hero = cmsData?.hero || { title: "De Houtoven Bij Jou Thuis", subtitle: "De pure, vurige smaak van authentiek Napels, live op jouw feest.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" };
  const packages = cmsData?.pricing || [];
  const testimonials = cmsData?.testimonials || [];
  
  const reels = cmsData?.reels && cmsData.reels.length > 0 ? cmsData.reels : [
    { video: "https://cdn.pixabay.com/video/2020/04/29/37597-415510619_large.mp4", poster: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066" },
    { video: "https://cdn.pixabay.com/video/2021/08/04/83864-584745422_large.mp4", poster: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066" },
    { video: "https://cdn.pixabay.com/video/2021/08/04/83866-584745437_large.mp4", poster: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=1066" }
  ];

  const gallery = cmsData?.gallery && cmsData.gallery.length > 0 ? cmsData.gallery : [
    "https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <div className="font-sans text-[#2A2626] bg-[#F9F6F0] min-h-screen selection:bg-[#DF5A48] selection:text-white antialiased overflow-x-hidden">
      
      {/* Navigatie */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#2A2626]/95 backdrop-blur-md border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain drop-shadow-lg" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-md hidden sm:block">
              La Pizza <span className="text-[#DF5A48]">di Sabi</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 font-bold text-xs tracking-widest uppercase text-white drop-shadow-md">
            <button onClick={() => scrollToSection('gallery')} className="hover:text-[#DF5A48] transition-colors">Beleving</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#DF5A48] transition-colors">Pakketten</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#DF5A48] transition-colors">Menu</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#DF5A48] transition-colors">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-3 rounded-full bg-[#DF5A48] text-white hover:bg-white hover:text-[#DF5A48] transition-all duration-300 shadow-lg shadow-red-900/10 hover:shadow-xl">Offerte</button>
          </div>
          
          <button className="lg:hidden text-white drop-shadow-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#2A2626] text-white p-8 flex flex-col space-y-6 lg:hidden border-b-4 border-[#DF5A48] shadow-2xl">
            <button onClick={() => scrollToSection('gallery')} className="text-xl font-bold uppercase text-left">Beleving</button>
            <button onClick={() => scrollToSection('pricing')} className="text-xl font-bold uppercase text-left">Pakketten</button>
            <button onClick={() => scrollToSection('menu')} className="text-xl font-bold uppercase text-left">Menu</button>
            <button onClick={() => scrollToSection('faq')} className="text-xl font-bold uppercase text-left">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="text-xl font-bold uppercase text-left text-[#DF5A48] pt-4 border-t border-white/10">Offerte Aanvragen</button>
          </div>
        )}
      </nav>

      {/* Hero Sectie */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-[#2A2626] pt-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-50 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" alt="Pizza Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2626] via-[#2A2626]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mt-12 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6 drop-shadow-2xl">
            {hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 rounded-full bg-[#DF5A48] text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 text-sm md:text-base hover:bg-white hover:text-[#DF5A48] transition-all duration-300 shadow-[0_10px_30px_rgba(223,90,72,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(223,90,72,0.4)]">
              Offerte Aanvragen <ArrowRight size={20} />
            </button>
            <button onClick={() => scrollToSection('pricing')} className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 text-sm md:text-base hover:bg-white hover:text-[#2A2626] transition-all duration-300">
              Bekijk Pakketten
            </button>
          </div>
        </div>
      </section>

      {/* The Vibe (Gallery) */}
      <section id="gallery" className="py-24 px-6 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#2A2626] mb-2">Jouw Feest, Onze Keuken</h2>
            <p className="text-lg text-stone-600 font-medium italic">Een onvergetelijke beleving op jouw locatie.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {gallery.map((photo, i) => (
              <div key={i} className={`bg-white p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10 relative cursor-crosshair
                ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}
                ${i === 1 || i === 3 ? 'md:mt-12' : ''}
              `}>
                <img src={photo} className="w-full aspect-square object-cover rounded-2xl" alt="Sfeerimpressie event" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Investment (Pricing) */}
      <section id="pricing" className="py-24 px-6 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#2A2626] mb-2">Transparante Pakketten</h2>
            <p className="text-lg text-stone-600 font-medium italic">Kies de ervaring die bij jouw evenement past.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 md:p-10 flex flex-col relative transition-all duration-300 border-2 rounded-3xl
                ${pkg.featured 
                  ? 'bg-[#2A2626] text-white border-[#2A2626] lg:-translate-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10' 
                  : 'bg-[#F9F6F0] text-[#2A2626] border-stone-200 hover:border-stone-300 shadow-md hover:shadow-xl'}`}>
                
                {pkg.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#DF5A48] text-white font-bold uppercase text-[10px] tracking-widest py-1.5 px-6 rounded-full whitespace-nowrap shadow-md">Meest Gekozen</div>}
                
                <h3 className="text-3xl font-black uppercase mb-2 tracking-tight">{pkg.title}</h3>
                <p className={`text-sm mb-6 italic min-h-[40px] ${pkg.featured ? 'text-stone-300' : 'text-stone-500'}`}>{pkg.description}</p>
                <div className="text-6xl font-black mb-8 border-b-2 border-dashed border-stone-400/30 pb-8 tracking-tighter">€{pkg.price}<span className="text-base font-bold opacity-50 tracking-widest uppercase"> / pp</span></div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-base font-medium">
                      <CheckCircle size={20} className={`shrink-0 ${pkg.featured ? 'text-[#DF5A48]' : 'text-[#DF5A48]'}`} /> 
                      <span className={pkg.featured ? 'text-stone-200' : 'text-stone-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 rounded-xl font-black uppercase text-sm tracking-widest transition-all ${pkg.featured ? 'bg-[#DF5A48] text-white hover:bg-white hover:text-[#DF5A48]' : 'bg-[#2A2626] text-white hover:bg-[#DF5A48]'}`}>Boek {pkg.title}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Food (Menu + Action Videos) */}
      <section id="menu" className="py-24 bg-[#2A2626] text-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">Wat staat er op het menu?</h2>
            <p className="text-lg md:text-xl text-stone-400 font-medium italic">Het geheim zit in de eenvoud. Premium Italiaanse ingrediënten.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {[
              { n: 'Margherita', d: 'San Marzano tomaten, fior di latte, verse basilicum, extra vergine olijfolie.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600' },
              { n: 'Diavola', d: 'San Marzano tomaten, fior di latte, pittige Napolitaanse salami, chili flakes.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600' },
              { n: 'Tartufo', d: 'Fior di latte, huisgemaakte truffelcrème, verse paddenstoelen, Parmezaanse kaas.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' },
              { n: 'Marinara', d: 'San Marzano tomaten, verse knoflook, oregano, extra vergine olijfolie (Volledig Vegan).', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl hover:bg-stone-800/50 transition-colors duration-300">
                <div className="w-full sm:w-32 sm:h-32 aspect-square bg-white p-1.5 shadow-lg rounded-2xl rotate-1 shrink-0 overflow-hidden">
                  <img src={p.img} alt={p.n} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
                  <h3 className="text-2xl font-black uppercase tracking-wide text-white">{p.n}</h3>
                  <p className="text-stone-400 mt-2 text-base leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-black uppercase tracking-widest text-[#DF5A48]">450 Graden. 90 Seconden.</h3>
          </div>
          
          <div className="flex gap-6 overflow-x-auto px-[5vw] md:px-0 md:justify-center pb-8 pt-4 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full">
            {reels.map((item, i) => (
              <div key={i} className="relative flex-none w-[75vw] md:w-[280px] aspect-[9/16] bg-[#2A2626] p-2 shadow-2xl rounded-3xl snap-center shrink-0 transition-transform duration-300 hover:scale-105 border border-stone-700">
                <video src={item.video} poster={item.poster} controls preload="none" className="w-full h-full object-cover rounded-2xl" playsInline loop muted />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust (Testimonials) */}
      <section className="py-24 bg-[#DF5A48] text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black uppercase mb-16 tracking-tighter">Wat Gasten Zeggen</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((review, i) => (
              <div key={i} className="flex flex-col items-center text-center p-10 bg-white/10 rounded-3xl shadow-xl relative backdrop-blur-sm border border-white/20">
                <div className="text-8xl text-red-900/20 font-serif absolute top-4 left-6 leading-none">"</div>
                
                <div className="bg-white p-1 -rotate-2 mb-6 shadow-md z-10 relative mt-2 rounded-2xl">
                  <img src={review.image} alt={review.name} className="w-20 h-20 object-cover rounded-xl" />
                </div>
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <p className="text-xl font-medium mb-6 italic text-red-50 leading-relaxed relative z-10">"{review.review}"</p>
                <h4 className="text-sm font-black uppercase tracking-widest text-white relative z-10">- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objection Handling (FAQ) */}
      <section id="faq" className="py-24 bg-[#F9F6F0] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#2A2626] mb-4">Praktische Info</h2>
            <p className="text-lg md:text-xl text-stone-600 font-medium italic">Geen verrassingen, alleen goede pizza.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { q: "Hoeveel ruimte hebben jullie nodig?", a: "Slechts een stukje ruimte van ongeveer 3x3 meter voor onze mobiele oven en werkbank. Wij regelen de rest!" },
              { q: "Hebben jullie stroom of water nodig?", a: "Nee! Wij zijn volledig zelfvoorzienend. Je hoeft je nergens zorgen over te maken." },
              { q: "Hoe zit het met dieetwensen (vegan/allergieën)?", a: "Geen probleem. We bieden fantastische veganistische opties (zoals de Marinara) en kunnen rekening houden met diverse allergieën. Geef het simpelweg door in de offerte." },
              { q: "Wat gebeurt er als het regent?", a: "Wij nemen standaard een professionele, strakke zwarte partytent mee om onze werkplek droog te houden. Zo gaat het feest in Nederland gewoon door." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-stone-200 hover:border-[#DF5A48] cursor-pointer transition-all duration-300 hover:shadow-md">
                <summary className="text-lg md:text-xl font-bold tracking-wide list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden text-[#2A2626]">
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4 text-[#DF5A48]">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-stone-600 mt-4 leading-relaxed text-base font-medium">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The Close (Contact Form) */}
      <section id="contact" className="py-24 px-4 md:px-6 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 tracking-tighter leading-[1] text-[#2A2626]">Offerte Aanvragen</h2>
            <p className="text-lg text-stone-600 mb-6 font-medium italic">Vul je wensen in, en we maken vrijblijvend een offerte op maat.</p>
            
            <div className="flex items-center justify-center gap-2 text-stone-600 font-medium">
              <Phone size={18} className="text-[#DF5A48]" />
              <span>Snel antwoord? Bel ons op:</span>
              <a href="tel:+31612345678" className="font-black text-[#2A2626] hover:text-[#DF5A48] transition-colors ml-1">
                +31 6 12 34 56 78
              </a>
            </div>
          </div>

          <form 
            action="https://formsubmit.co/ciao@lapizzadisabi.nl" 
            method="POST" 
            className="bg-[#F9F6F0] p-6 md:p-12 rounded-3xl shadow-xl border-t-8 border-[#DF5A48] flex flex-col gap-8 w-full box-border relative"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nieuwe Offerte Aanvraag - La Pizza di Sabi" />
            <input type="hidden" name="_next" value="https://lapizzadisabi.nl" />
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-2">Jouw Naam</label>
                <input required type="text" name="Naam" className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-[#DF5A48] transition-colors bg-white text-lg font-medium text-[#2A2626]" placeholder="Vul hier in..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-2">E-mail of Telefoon</label>
                <input required type="text" name="Contactgegevens" className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-[#DF5A48] transition-colors bg-white text-lg font-medium text-[#2A2626]" placeholder="Vul hier in..." />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2 pl-2"><Calendar size={14}/> Datum Evenement</label>
                <input required type="date" name="Datum" className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-[#DF5A48] transition-colors bg-white text-lg font-medium text-[#2A2626] block cursor-pointer" />
              </div>
              
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2 pl-2"><Users size={14}/> Aantal Personen</label>
                <select required name="Aantal Personen" className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-[#DF5A48] transition-colors bg-white text-lg font-medium text-[#2A2626] cursor-pointer" defaultValue="">
                  <option value="" disabled>Kies een schatting</option>
                  <option value="0-20">Minder dan 20</option>
                  <option value="20-40">20 - 40 personen</option>
                  <option value="40-60">40 - 60 personen</option>
                  <option value="60+">60+ personen</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest pl-2">Locatie & Extra wensen</label>
              <textarea required name="Bericht" rows="4" className="w-full p-4 rounded-2xl border-2 border-stone-200 focus:outline-none focus:border-[#DF5A48] transition-colors bg-white resize-none text-lg font-medium text-[#2A2626]" placeholder="Waar is het feest en zijn er bijzonderheden?"></textarea>
            </div>

            <button type="submit" className="w-full py-5 mt-4 rounded-full bg-[#DF5A48] text-white font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#2A2626] hover:-translate-y-1 transition-all duration-300 relative z-10 shadow-lg hover:shadow-xl">
              Verstuur Aanvraag <ArrowRight size={24} />
            </button>
          </form>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-[#2A2626] text-stone-400 py-16 px-6 border-t-4 border-[#DF5A48]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-8 cursor-pointer hover:scale-105 transition-transform" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-12 md:h-16 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-2xl font-black uppercase tracking-tighter text-white">
              La Pizza <span className="text-[#DF5A48]">di Sabi</span>
            </div>
          </div>
          
          <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile Call CTA */}
      <a 
        href="tel:+31612345678" 
        className="md:hidden fixed bottom-6 right-6 bg-[#DF5A48] text-white p-4 rounded-full shadow-[0_10px_20px_rgba(223,90,72,0.3)] z-50 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Bel La Pizza di Sabi"
      >
        <Phone size={24} />
      </a>

    </div>
  );
}