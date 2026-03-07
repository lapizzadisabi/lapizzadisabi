import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  CheckCircle, ArrowRight, Star, Phone, Mail, Clock, Flame
} from 'lucide-react';

const styles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: 200%;
    animation: marquee 30s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

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

  // --- CMS Content & Fallbacks ---
  const hero = cmsData?.hero || { title: "Authentieke Napolitaanse Pizza Catering", subtitle: "Wij brengen de houtoven, de chef en de pure smaak van Italië naar jouw locatie.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" };
  const packages = cmsData?.pricing || [];
  const testimonials = cmsData?.testimonials || [];
  
  const reels = cmsData?.reels && cmsData.reels.length > 0 ? cmsData.reels : [
    { video: "https://cdn.pixabay.com/video/2020/04/29/37597-415510619_large.mp4", poster: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066" },
    { video: "https://cdn.pixabay.com/video/2021/08/04/83864-584745422_large.mp4", poster: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066" }
  ];

  const galleryBase = cmsData?.gallery && cmsData.gallery.length > 0 ? cmsData.gallery : [
    "https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800"
  ];
  const rollingGallery = [...galleryBase, ...galleryBase];

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen selection:bg-emerald-700 selection:text-white antialiased">
      <style>{styles}</style>
      
      {/* Modern Sticky Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className={`h-10 md:h-12 w-auto object-contain transition-all ${isScrolled ? '' : 'drop-shadow-lg'}`} onError={(e) => e.target.style.display='none'} />
            <div className={`text-xl md:text-2xl font-black tracking-tighter uppercase transition-colors hidden sm:block ${isScrolled ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
              La Pizza <span className="text-emerald-700">di Sabi</span>
            </div>
          </div>
          
          <div className={`hidden lg:flex items-center space-x-8 font-bold text-sm uppercase tracking-wide transition-colors ${isScrolled ? 'text-slate-600' : 'text-white drop-shadow-md'}`}>
            <button onClick={() => scrollToSection('concept')} className="hover:text-emerald-700 transition-colors">Concept</button>
            <button onClick={() => scrollToSection('pakketten')} className="hover:text-emerald-700 transition-colors">Pakketten</button>
            <button onClick={() => scrollToSection('media')} className="hover:text-emerald-700 transition-colors">Media</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-emerald-700 transition-colors">Reviews</button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-3 bg-emerald-700 text-white hover:bg-slate-900 transition-colors shadow-lg">Offerte Aanvragen</button>
          </div>
          
          <button className={`lg:hidden transition-colors ${isScrolled ? 'text-slate-900' : 'text-white drop-shadow-md'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-slate-900 p-8 flex flex-col space-y-6 lg:hidden border-b border-slate-200 shadow-xl">
            <button onClick={() => scrollToSection('concept')} className="text-lg font-bold uppercase text-left">Concept</button>
            <button onClick={() => scrollToSection('pakketten')} className="text-lg font-bold uppercase text-left">Pakketten</button>
            <button onClick={() => scrollToSection('media')} className="text-lg font-bold uppercase text-left">Media</button>
            <button onClick={() => scrollToSection('reviews')} className="text-lg font-bold uppercase text-left">Reviews</button>
            <button onClick={() => scrollToSection('contact')} className="text-lg font-bold uppercase text-left text-emerald-700 pt-4 border-t border-slate-100">Offerte Aanvragen</button>
          </div>
        )}
      </nav>

      {/* Corporate/Premium Hero */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-center items-center bg-slate-900 pt-20">
        <div className="absolute inset-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-40" alt="Pizza Catering" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6">
            {hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 font-medium mb-10 leading-relaxed max-w-2xl">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-emerald-700 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-colors shadow-lg">
              Offerte Aanvragen <ArrowRight size={20} />
            </button>
            <button onClick={() => scrollToSection('pakketten')} className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
              Bekijk Pakketten
            </button>
          </div>
        </div>
      </section>

      {/* Trust Ribbon */}
      <div className="bg-emerald-700 text-white py-4 px-6 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-16 text-sm md:text-base font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2"><MapPin size={18} /> Op iedere locatie</div>
          <div className="flex items-center gap-2"><Flame size={18} /> 450°C Houtoven</div>
          <div className="flex items-center gap-2"><Users size={18} /> Vanaf 20 personen</div>
          <div className="flex items-center gap-2"><CheckCircle size={18} /> Volledig ontzorgd</div>
        </div>
      </div>

      {/* Rolling Gallery */}
      <section className="py-12 bg-slate-50 overflow-hidden border-b border-slate-200">
        <div className="animate-marquee gap-4 px-2">
          {rollingGallery.map((photo, i) => (
            <div key={i} className="w-[60vw] md:w-[25vw] aspect-[4/3] shrink-0 overflow-hidden shadow-sm">
              <img src={photo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Catering impressie" />
            </div>
          ))}
        </div>
      </section>

      {/* Concept / About */}
      <section id="concept" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-6">Jouw evenement, onze zorg</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Of het nu gaat om een bedrijfsfeest, bruiloft of een groot tuinfeest, wij verzorgen de complete culinaire beleving. Met onze mobiele oven bakken we verse, ambachtelijke Napolitaanse pizza's op locatie. Binnen 90 seconden perfect gegaard, rechtstreeks vanuit de oven op het bord van uw gasten.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle className="text-emerald-700" size={20} /> Verse ingrediënten uit Italië</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle className="text-emerald-700" size={20} /> Professionele chef op locatie</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle className="text-emerald-700" size={20} /> Geen afwas, geen stress</li>
            </ul>
            <button onClick={() => scrollToSection('contact')} className="text-emerald-700 font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              Vraag naar de mogelijkheden <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={cmsData?.craft?.image || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5"} className="w-full aspect-[4/5] object-cover shadow-lg translate-y-8" alt="Oven" />
            <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002" className="w-full aspect-[4/5] object-cover shadow-lg" alt="Pizza" />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="pakketten" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-4">Onze Pakketten</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Kies het arrangement dat perfect aansluit bij de wensen van uw gezelschap.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 md:p-10 flex flex-col transition-all duration-300 bg-white shadow-md border hover:shadow-xl
                ${pkg.featured ? 'border-emerald-700 lg:-translate-y-4 relative' : 'border-slate-200'}`}>
                
                {pkg.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-700 text-white font-bold uppercase text-xs tracking-widest py-2 px-6 shadow-sm">
                    Meest Gekozen
                  </div>
                )}
                
                <h3 className="text-2xl font-black uppercase mb-3 text-slate-900">{pkg.title}</h3>
                <p className="text-slate-500 mb-6 min-h-[48px]">{pkg.description}</p>
                <div className="text-5xl font-black mb-8 pb-8 border-b border-slate-100 text-slate-900">
                  €{pkg.price}<span className="text-lg font-normal text-slate-500"> / pp</span>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-700 font-medium">
                      <CheckCircle size={20} className="shrink-0 text-emerald-700 mt-0.5" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 font-bold uppercase tracking-widest transition-colors ${pkg.featured ? 'bg-emerald-700 text-white hover:bg-slate-900' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  Selecteer Pakket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Media Section */}
      <section id="media" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">De Beleving</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Bekijk hoe wij op locatie te werk gaan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reels.map((item, i) => (
              <div key={i} className="relative w-full aspect-[9/16] bg-black shadow-2xl overflow-hidden border border-slate-700 group">
                <video src={item.video} poster={item.poster} controls preload="none" className="w-full h-full object-cover" playsInline loop muted />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 bg-white px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-16">Wat klanten zeggen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((review, i) => (
              <div key={i} className="p-8 md:p-10 bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">"{review.review}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 object-cover rounded-full" />
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide">{review.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Contact Section (High Converting) */}
      <section id="contact" className="bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          
          {/* Left Side: Info & FAQ */}
          <div className="py-24 px-6 md:px-12 bg-slate-900 text-white flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Neem Contact Op</h2>
            <p className="text-slate-300 mb-12 text-lg leading-relaxed">
              Heeft u vragen of wilt u direct een datum reserveren? Vul het formulier in of neem telefonisch contact met ons op.
            </p>
            
            <div className="space-y-6 mb-12">
              <a href="tel:+31612345678" className="flex items-center gap-4 text-xl font-bold hover:text-emerald-500 transition-colors">
                <div className="bg-emerald-700 p-3"><Phone size={24} className="text-white" /></div>
                +31 6 12 34 56 78
              </a>
              <a href="mailto:ciao@lapizzadisabi.nl" className="flex items-center gap-4 text-xl font-bold hover:text-emerald-500 transition-colors">
                <div className="bg-emerald-700 p-3"><Mail size={24} className="text-white" /></div>
                ciao@lapizzadisabi.nl
              </a>
            </div>

            <div className="border-t border-slate-700 pt-8 mt-auto">
              <h3 className="text-xl font-bold uppercase mb-4">Praktische Informatie</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex gap-2"><CheckCircle size={18} className="text-emerald-600 shrink-0" /> Geen stroom of water nodig op locatie.</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-emerald-600 shrink-0" /> Ongeveer 3x3 meter werkruimte benodigd.</li>
                <li className="flex gap-2"><CheckCircle size={18} className="text-emerald-600 shrink-0" /> Inclusief eigen weersbestendige tent.</li>
              </ul>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="py-24 px-6 md:px-12 bg-white flex flex-col justify-center">
            <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-8">Vraag een offerte aan</h3>
            
            <form action="https://formsubmit.co/ciao@lapizzadisabi.nl" method="POST" className="flex flex-col gap-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nieuwe Offerte Aanvraag - La Pizza di Sabi" />
              <input type="hidden" name="_next" value="https://lapizzadisabi.nl" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Voor- en Achternaam</label>
                  <input required type="text" name="Naam" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors" placeholder="Uw naam" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Telefoonnummer</label>
                  <input required type="text" name="Telefoon" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors" placeholder="Uw telefoonnummer" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-mailadres</label>
                <input required type="email" name="Email" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors" placeholder="Uw e-mailadres" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Datum Evenement</label>
                  <input required type="date" name="Datum" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors block text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Geschat Aantal Gasten</label>
                  <select required name="Aantal Personen" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors text-slate-900" defaultValue="">
                    <option value="" disabled>Selecteer aantal</option>
                    <option value="20-40">20 - 40 personen</option>
                    <option value="40-60">40 - 60 personen</option>
                    <option value="60-100">60 - 100+ personen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Locatie & Specifieke Wensen</label>
                <textarea required name="Bericht" rows="4" className="w-full p-4 border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-700 transition-colors resize-none" placeholder="Plaatsnaam, soort evenement, dieetwensen..."></textarea>
              </div>

              <button type="submit" className="w-full py-5 mt-4 bg-emerald-700 text-white font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors flex justify-center items-center gap-2">
                Verstuur Aanvraag <ArrowRight size={20} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-lg font-black uppercase tracking-tighter text-white">
              La Pizza <span className="text-emerald-700">di Sabi</span>
            </div>
          </div>
          
          <p className="text-xs uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-40 flex gap-4">
        <a href="tel:+31612345678" className="flex-1 py-3 bg-slate-100 text-slate-900 font-bold uppercase text-center text-sm tracking-wider flex items-center justify-center gap-2">
          <Phone size={16} /> Bel Ons
        </a>
        <button onClick={() => scrollToSection('contact')} className="flex-1 py-3 bg-emerald-700 text-white font-bold uppercase text-center text-sm tracking-wider">
          Offerte
        </button>
      </div>
      
      {/* Pad bottom for mobile CTA */}
      <div className="h-20 lg:hidden bg-slate-950"></div>

    </div>
  );
}