import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Play, Flame, Check, ArrowRight, Star
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

  // --- CMS Content Helpers ---
  const hero = cmsData?.hero || { title: "La Pizza di Sabi", subtitle: "Authentiek Napels.", image: "" };
  const craft = cmsData?.craft || { title: "Ons Ambacht", description: "", image: "" };
  const packages = cmsData?.pricing || [];
  const reels = cmsData?.reels || [];
  const testimonials = cmsData?.testimonials || [];

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-black selection:text-white antialiased overflow-x-hidden">
      {/* Navigatie */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-black/90 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              La Pizza <span className="text-gray-400">di Sabi</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 font-bold text-xs tracking-widest uppercase text-white">
            <button onClick={() => scrollToSection('craft')} className="hover:opacity-50">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="hover:opacity-50">Menu</button>
            <button onClick={() => scrollToSection('media')} className="hover:opacity-50">Kijk hier</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:opacity-50">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-2 border-2 border-white bg-white text-black font-black transition-all hover:bg-transparent hover:text-white">Offerte</button>
          </div>
          
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white p-8 flex flex-col space-y-6 lg:hidden border-b-2 border-white/10">
            <button onClick={() => scrollToSection('craft')} className="text-2xl font-black uppercase text-left">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="text-2xl font-black uppercase text-left">Menu</button>
            <button onClick={() => scrollToSection('media')} className="text-2xl font-black uppercase text-left">Kijk hier</button>
            <button onClick={() => scrollToSection('pricing')} className="text-2xl font-black uppercase text-left">Pakketten</button>
          </div>
        )}
      </nav>

      {/* Hero Sectie */}
      <section className="relative h-screen flex items-center justify-center bg-black pt-10">
        <div className="absolute inset-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-50" alt="Pizza Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 uppercase tracking-widest font-bold text-[10px] mb-6">
            <Flame size={14} /> <span>Artisanaal bakken op locatie</span>
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-6">{hero.title}</h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">{hero.subtitle}</p>
          
          <div className="flex justify-center">
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 text-lg hover:bg-gray-200 transition-colors">
              Vraag Offerte Aan <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Ambacht Sectie */}
      <section id="craft" className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">{craft.title}</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">{craft.description}</p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
            <img src={craft.image} className="relative z-10 w-full aspect-[4/3] object-cover border-4 border-black" alt="Ambacht" />
          </div>
        </div>
      </section>

      {/* Statisch Menu */}
      <section id="menu" className="py-20 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Onze Klassiekers</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { n: 'Margherita', d: 'San Marzano tomaten, fior di latte, basilicum, olijfolie.' },
              { n: 'Diavola', d: 'San Marzano tomaten, fior di latte, pittige salami, chili.' },
              { n: 'Tartufo', d: 'Fior di latte, truffelcrème, verse paddenstoelen, Parmezaan.' },
              { n: 'Marinara', d: 'San Marzano tomaten, knoflook, oregano (Vegan).' },
            ].map((p, i) => (
              <div key={i} className="border-b border-gray-800 pb-6">
                <h3 className="text-xl md:text-2xl font-bold uppercase">{p.n}</h3>
                <p className="text-gray-400 mt-2 text-sm md:text-base">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kijk hier (Videos) */}
      <section id="media" className="py-20 bg-white px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 tracking-tighter">Kijk hier</h2>
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar">
          {reels.map((item, i) => (
            <div key={i} className="relative flex-none w-[75vw] md:w-[320px] aspect-[9/16] bg-black snap-center overflow-hidden border-4 border-black shadow-xl">
              <video src={item.video} poster={item.poster} controls className="w-full h-full object-cover" playsInline loop muted />
            </div>
          ))}
        </div>
      </section>

      {/* Pakketten */}
      <section id="pricing" className="py-20 bg-gray-50 px-6 border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Pakketten</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 flex flex-col border-4 border-black ${pkg.featured ? 'bg-black text-white lg:-translate-y-4 shadow-2xl z-10' : 'bg-white text-black shadow-lg'}`}>
                {pkg.featured && <div className="text-center font-black uppercase text-[10px] tracking-widest mb-4 bg-white text-black py-1 px-4 self-center">Meest Populair</div>}
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.title}</h3>
                <p className={`text-sm mb-6 opacity-70`}>{pkg.description}</p>
                <div className="text-4xl font-black mb-8 border-b-2 border-current pb-8">€{pkg.price}<span className="text-sm font-normal opacity-50"> / pp</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-medium">
                      <Check size={18} className="shrink-0 text-current" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 font-black uppercase text-xs tracking-widest border-2 border-black transition-all ${pkg.featured ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-white hover:text-black'}`}>Selecteer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Wat klanten zeggen</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((review, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <img src={review.image} alt={review.name} className="w-24 h-24 rounded-full object-cover border-4 border-black mb-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-6 h-6 fill-current text-black" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium mb-6 italic">"{review.review}"</p>
                <h4 className="text-sm font-black uppercase tracking-widest">- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Formulier */}
      <section id="contact" className="py-24 bg-gray-50 px-6 border-t border-black/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter leading-none">Boek de Houtoven</h2>
            <p className="text-lg text-gray-600">Vul het formulier in voor een op maat gemaakte offerte.</p>
          </div>

          <form 
            name="offerte" 
            method="POST" 
            data-netlify="true" 
            className="bg-white p-8 md:p-12 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6"
          >
            {/* Required hidden input for Netlify routing */}
            <input type="hidden" name="form-name" value="offerte" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest">Naam</label>
                <input required type="text" name="naam" className="w-full p-4 border-2 border-black focus:outline-none focus:bg-gray-50 transition-colors" placeholder="Jouw volledige naam" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest">E-mail of Telefoon</label>
                <input required type="text" name="contactinfo" className="w-full p-4 border-2 border-black focus:outline-none focus:bg-gray-50 transition-colors" placeholder="Hoe kunnen we je bereiken?" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> Datum Evenement</label>
                <input required type="date" name="datum" className="w-full p-4 border-2 border-black focus:outline-none focus:bg-gray-50 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><Users size={14}/> Aantal Personen</label>
                <select required name="aantal" className="w-full p-4 border-2 border-black focus:outline-none focus:bg-gray-50 transition-colors bg-white">
                  <option value="" disabled selected>Kies het aantal gasten</option>
                  <option value="0-10">0 - 10 personen</option>
                  <option value="10-20">10 - 20 personen</option>
                  <option value="20-30">20 - 30 personen</option>
                  <option value="30+">30+ personen</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest">Extra details of bericht</label>
              <textarea required name="bericht" rows="4" className="w-full p-4 border-2 border-black focus:outline-none focus:bg-gray-50 transition-colors resize-none" placeholder="Vertel ons meer over het evenement of dieetwensen..."></textarea>
            </div>

            <button type="submit" className="w-full py-6 mt-4 bg-black text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
              Verstuur Aanvraag <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-6 text-center border-t border-gray-900">
        <div className="text-xl font-black uppercase mb-4 tracking-tighter">La Pizza <span className="text-gray-500">di Sabi</span></div>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">&copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}