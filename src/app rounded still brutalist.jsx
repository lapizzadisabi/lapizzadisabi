import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Play, Flame, Check, ArrowRight, Star, Phone
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
  
  const reels = cmsData?.reels && cmsData.reels.length > 0 ? cmsData.reels : [
    {
      video: "https://cdn.pixabay.com/video/2020/04/29/37597-415510619_large.mp4",
      poster: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066"
    },
    {
      video: "https://cdn.pixabay.com/video/2021/08/04/83864-584745422_large.mp4",
      poster: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066"
    },
    {
      video: "https://cdn.pixabay.com/video/2021/08/04/83866-584745437_large.mp4",
      poster: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=1066"
    }
  ];
  const testimonials = cmsData?.testimonials || [];

  return (
    <div className="font-sans text-black bg-white min-h-screen selection:bg-orange-500 selection:text-white antialiased overflow-x-hidden">
      {/* Navigatie */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-black/90 backdrop-blur-md border-white/10 py-3 shadow-lg' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              La Pizza <span className="text-gray-400">di Sabi</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 font-bold text-xs tracking-widest uppercase text-white">
            <button onClick={() => scrollToSection('craft')} className="hover:text-orange-400 transition-colors">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-orange-400 transition-colors">Menu</button>
            <button onClick={() => scrollToSection('media')} className="hover:text-orange-400 transition-colors">Verwachtingen</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-orange-400 transition-colors">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-2 rounded-full border border-white bg-white text-black font-black transition-all hover:bg-transparent hover:text-white hover:scale-105">Offerte</button>
          </div>
          
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white p-8 flex flex-col space-y-6 lg:hidden border-b-2 border-white/10 shadow-2xl">
            <button onClick={() => scrollToSection('craft')} className="text-xl font-bold uppercase text-left">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="text-xl font-bold uppercase text-left">Menu</button>
            <button onClick={() => scrollToSection('media')} className="text-xl font-bold uppercase text-left">Verwachtingen</button>
            <button onClick={() => scrollToSection('pricing')} className="text-xl font-bold uppercase text-left">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className="text-xl font-bold uppercase text-left text-orange-400 pt-4 border-t border-white/20">Offerte Aanvragen</button>
          </div>
        )}
      </nav>

      {/* Hero Sectie */}
      <section className="relative h-screen flex items-center justify-center bg-black pt-10">
        <div className="absolute inset-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-60" alt="Pizza Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-6 drop-shadow-lg">{hero.title}</h1>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">{hero.subtitle}</p>
          
          <div className="flex justify-center">
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 text-lg hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              Vraag Offerte Aan <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Ambacht Sectie */}
      <section id="craft" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">{craft.title}</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">{craft.description}</p>
          </div>
          <div className="relative group">
            {/* Softened the image styling massively */}
            <img src={craft.image} className="relative z-10 w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" alt="Ambacht" />
            <div className="absolute -inset-4 bg-orange-100 rounded-3xl -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Statisch Menu Met Foto's */}
      <section id="menu" className="py-24 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Onze Klassiekers</h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium">Bereid met ingrediënten rechtstreeks uit Italië.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {[
              { n: 'Margherita', d: 'San Marzano tomaten, fior di latte, verse basilicum, extra vergine olijfolie.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600' },
              { n: 'Diavola', d: 'San Marzano tomaten, fior di latte, pittige Napolitaanse salami, chili flakes.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600' },
              { n: 'Tartufo', d: 'Fior di latte, huisgemaakte truffelcrème, verse paddenstoelen, Parmezaanse kaas.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' },
              { n: 'Marinara', d: 'San Marzano tomaten, verse knoflook, oregano, extra vergine olijfolie (Volledig Vegan).', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors duration-300 group">
                <div className="w-full sm:w-32 sm:h-32 aspect-square rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <img src={p.img} alt={p.n} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">{p.n}</h3>
                  <p className="text-gray-400 mt-2 text-sm md:text-base leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat mag je verwachten? (Videos) */}
      <section id="media" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Wat mag je verwachten?</h2>
        </div>
        
        <div className="flex gap-4 md:gap-8 overflow-x-auto px-[10vw] md:px-6 md:justify-center pb-12 pt-4 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full">
          {reels.map((item, i) => (
            <div key={i} className="relative flex-none w-[80vw] md:w-[320px] aspect-[9/16] bg-black snap-center overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 shrink-0 border border-gray-100">
              <video 
                src={item.video} 
                poster={item.poster} 
                controls 
                preload="none" 
                className="w-full h-full object-cover bg-black" 
                playsInline 
                loop 
                muted 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pakketten */}
      <section id="pricing" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Pakketten</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 md:p-10 flex flex-col rounded-3xl transition-all duration-300 ${pkg.featured ? 'bg-black text-white lg:-translate-y-4 shadow-2xl z-10 border border-gray-800' : 'bg-gray-50 text-black shadow-lg hover:shadow-xl border border-gray-100'}`}>
                {pkg.featured && <div className="text-center font-bold uppercase text-[10px] tracking-widest mb-6 bg-white text-black py-1.5 px-4 self-center rounded-full">Meest Populair</div>}
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.title}</h3>
                <p className={`text-sm mb-6 ${pkg.featured ? 'text-gray-400' : 'text-gray-500'}`}>{pkg.description}</p>
                <div className="text-4xl font-black mb-8 border-b border-current/20 pb-8">€{pkg.price}<span className="text-sm font-medium opacity-50"> / pp</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-medium">
                      <Check size={18} className={`shrink-0 ${pkg.featured ? 'text-orange-400' : 'text-black'}`} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${pkg.featured ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Selecteer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">Wat klanten zeggen</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((review, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 md:p-10 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full object-cover shadow-md mb-6 ring-4 ring-gray-50" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium mb-6 italic text-gray-700 leading-relaxed">"{review.review}"</p>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Formulier */}
      <section id="contact" className="py-24 bg-white px-4 md:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 tracking-tighter leading-none">Boek uw live chef</h2>
            <p className="text-lg text-gray-500 mb-6">Vul het formulier in voor een op maat gemaakte offerte.</p>
            
            <div className="flex items-center justify-center gap-2 text-gray-500 bg-gray-50 inline-flex px-6 py-3 rounded-full border border-gray-100">
              <Phone size={16} />
              <span className="font-medium text-sm uppercase tracking-wider">Liever bellen?</span>
              <a href="tel:+31612345678" className="font-black text-black hover:text-orange-500 transition-colors ml-1">
                +31 6 12 34 56 78
              </a>
            </div>
          </div>

          <form 
            action="https://formsubmit.co/ciao@lapizzadisabi.nl" 
            method="POST" 
            className="bg-white p-6 md:p-12 rounded-3xl shadow-2xl border border-gray-100 flex flex-col gap-5 md:gap-6 w-full box-border"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nieuwe Offerte Aanvraag - La Pizza di Sabi" />
            <input type="hidden" name="_next" value="https://lapizzadisabi.nl" />
            
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Naam</label>
                <input required type="text" name="Naam" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none min-w-0" placeholder="Jouw volledige naam" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">E-mail of Telefoon</label>
                <input required type="text" name="Contactgegevens" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none min-w-0" placeholder="Hoe kunnen we je bereiken?" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-1"><Calendar size={14}/> Datum Evenement</label>
                <input required type="date" name="Datum" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none min-w-0 block text-gray-700" />
              </div>
              
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-1"><Users size={14}/> Aantal Personen</label>
                <select required name="Aantal Personen" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50 focus:bg-white appearance-none min-w-0 text-gray-700" defaultValue="">
                  <option value="" disabled>Kies het aantal gasten</option>
                  <option value="0-10">0 - 10 personen</option>
                  <option value="10-20">10 - 20 personen</option>
                  <option value="20-30">20 - 30 personen</option>
                  <option value="30+">30+ personen</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Extra details of bericht</label>
              <textarea required name="Bericht" rows="4" className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none appearance-none min-w-0" placeholder="Vertel ons meer over het evenement of dieetwensen..."></textarea>
            </div>

            <button type="submit" className="w-full py-5 rounded-xl mt-2 bg-black text-white font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Verstuur Aanvraag <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Veelgestelde Vragen */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Veelgestelde Vragen</h2>
            <p className="text-lg md:text-xl text-gray-500 font-medium">Transparant en zonder verrassingen.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { q: "Wat hebben jullie nodig op locatie?", a: "Slechts een stukje ruimte van ongeveer 3x3 meter voor onze mobiele oven en werkbank." },
              { q: "Hoe zit het met dieetwensen en allergieën?", a: "Geen probleem. We bieden fantastische veganistische opties (zoals onze Marinara) en kunnen rekening houden met diverse allergieën. Laat het ons simpelweg vooraf weten." },
              { q: "Hoe lang blijven jullie pizza's bakken?", a: "Afhankelijk van het pakket en de groepsgrootte bakken wij 2 tot 4 uur lang onbeperkt pizza's. We arriveren ruim een uur van tevoren om de oven op 450°C te stoken." },
              { q: "Wat gebeurt er als het regent?", a: "Wij hebben een professionele zwarte partytent om onze werkplek droog te houden. Zo kunnen we ook met typisch Nederlands weer gewoon de beste pizza's blijven bakken." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300">
                <summary className="text-lg md:text-xl font-bold tracking-wide list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden text-black">
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4 text-gray-400 group-hover:text-black">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-gray-500 mt-4 leading-relaxed text-base md:text-lg">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl font-black uppercase tracking-tighter">
              La Pizza <span className="text-gray-500">di Sabi</span>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>

      {/* Mobile Floating Call Button */}
      <a 
        href="tel:+31612345678" 
        className="md:hidden fixed bottom-6 right-6 bg-white text-black p-4 rounded-full border border-gray-100 shadow-xl z-50 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Bel La Pizza di Sabi"
      >
        <Phone size={24} />
      </a>

    </div>
  );
}