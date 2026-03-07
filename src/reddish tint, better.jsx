import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, X, MapPin, Calendar, Users, 
  Check, ArrowRight, Star, Phone, Camera
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
  const hero = cmsData?.hero || { title: "La Pizza di Sabi", subtitle: "De pure, vurige smaak van authentiek Napels, live op jouw feest.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" };
  const craft = cmsData?.craft || { title: "Passie voor het deeg", description: "Tijd is ons belangrijkste ingrediënt. We geloven in de kracht van geduld, pure onbewerkte ingrediënten en de perfecte oventemperatuur voor die iconische Napolitaanse korst.", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" };
  const packages = cmsData?.pricing || [];
  
  const reels = cmsData?.reels && cmsData.reels.length > 0 ? cmsData.reels : [
    { video: "https://cdn.pixabay.com/video/2020/04/29/37597-415510619_large.mp4", poster: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600&h=1066" },
    { video: "https://cdn.pixabay.com/video/2021/08/04/83864-584745422_large.mp4", poster: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600&h=1066" },
    { video: "https://cdn.pixabay.com/video/2021/08/04/83866-584745437_large.mp4", poster: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=1066" }
  ];
  const testimonials = cmsData?.testimonials || [];

  // 4 Fallback photos for the new Garden Party gallery
  const galleryPhotos = [
    "https://images.unsplash.com/photo-1520209268518-aec60b8bb5ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    // Warm dough background (stone-50) and charcoal text (stone-900)
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen selection:bg-red-700 selection:text-white antialiased overflow-x-hidden">
      
      {/* Navigatie */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-stone-900/95 backdrop-blur-md border-white/10 py-3 shadow-xl' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain drop-shadow-md" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white drop-shadow-md">
              La Pizza <span className="text-red-500">di Sabi</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 font-bold text-xs tracking-widest uppercase text-white drop-shadow-md">
            <button onClick={() => scrollToSection('craft')} className="hover:text-red-400 transition-colors">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="hover:text-red-400 transition-colors">Menu</button>
            <button onClick={() => scrollToSection('media')} className="hover:text-red-400 transition-colors">Beleving</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-red-400 transition-colors">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className="px-6 py-2.5 bg-red-700 text-white border-2 border-red-700 font-black transition-all hover:bg-transparent hover:text-white hover:scale-105">Offerte</button>
          </div>
          
          <button className="lg:hidden text-white drop-shadow-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-stone-900 text-white p-8 flex flex-col space-y-6 lg:hidden border-b-4 border-red-700 shadow-2xl">
            <button onClick={() => scrollToSection('craft')} className="text-xl font-bold uppercase text-left">Ambacht</button>
            <button onClick={() => scrollToSection('menu')} className="text-xl font-bold uppercase text-left">Menu</button>
            <button onClick={() => scrollToSection('media')} className="text-xl font-bold uppercase text-left">Beleving</button>
            <button onClick={() => scrollToSection('pricing')} className="text-xl font-bold uppercase text-left">Pakketten</button>
            <button onClick={() => scrollToSection('contact')} className="text-xl font-bold uppercase text-left text-red-400 pt-4 border-t border-white/10">Offerte Aanvragen</button>
          </div>
        )}
      </nav>

      {/* Hero Sectie */}
      <section className="relative h-screen flex items-center justify-center bg-stone-900 pt-10">
        <div className="absolute inset-0">
          <img src={hero.image} className="w-full h-full object-cover opacity-50" alt="Pizza Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mt-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[1] mb-6 drop-shadow-2xl">
            {hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-stone-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md">
            {hero.subtitle}
          </p>
          
          <div className="flex justify-center">
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 bg-red-700 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 text-lg hover:bg-red-600 hover:-translate-y-1 shadow-[0_10px_20px_rgba(185,28,28,0.3)] transition-all duration-300">
              Boek de Chef <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Ambacht Sectie */}
      <section id="craft" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            {/* Polaroid Effect Image */}
            <div className="bg-white p-3 md:p-4 shadow-2xl -rotate-2 transform hover:rotate-0 transition-transform duration-500 max-w-lg mx-auto lg:mx-0">
              <img src={craft.image} className="w-full aspect-[4/3] object-cover" alt="Ambacht" />
            </div>
            {/* Playful background element */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-red-700/10 rotate-3"></div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-stone-900 leading-[1.1]">{craft.title}</h2>
            <p className="text-lg md:text-xl text-stone-600 font-medium leading-relaxed">{craft.description}</p>
          </div>
        </div>
      </section>

      {/* Menu / Klassiekers */}
      <section id="menu" className="py-24 bg-stone-900 text-stone-50 px-6 border-y-8 border-red-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">Onze Klassiekers</h2>
            <p className="text-lg md:text-xl text-stone-400 font-medium italic">Bereid met ingrediënten rechtstreeks uit Italië.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {[
              { n: 'Margherita', d: 'San Marzano tomaten, fior di latte, verse basilicum, extra vergine olijfolie.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600' },
              { n: 'Diavola', d: 'San Marzano tomaten, fior di latte, pittige Napolitaanse salami, chili flakes.', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600' },
              { n: 'Tartufo', d: 'Fior di latte, huisgemaakte truffelcrème, verse paddenstoelen, Parmezaanse kaas.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' },
              { n: 'Marinara', d: 'San Marzano tomaten, verse knoflook, oregano, extra vergine olijfolie (Volledig Vegan).', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 hover:bg-stone-800 transition-colors duration-300 group">
                <div className="w-full sm:w-32 sm:h-32 aspect-square bg-white p-2 shadow-lg rotate-2 group-hover:-rotate-1 transition-transform duration-300 shrink-0">
                  <img src={p.img} alt={p.n} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left flex-1 mt-2 sm:mt-0">
                  <h3 className="text-2xl font-black uppercase tracking-wide text-white">{p.n}</h3>
                  <p className="text-stone-400 mt-2 text-base leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="media" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-stone-900">De live chef in actie</h2>
          <p className="text-lg md:text-xl text-stone-600 font-medium italic">450 graden, 90 seconden.</p>
        </div>
        
        <div className="flex gap-6 overflow-x-auto px-[10vw] md:px-6 md:justify-center pb-12 pt-4 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full">
          {reels.map((item, i) => (
            <div key={i} className="relative flex-none w-[80vw] md:w-[320px] aspect-[9/16] bg-stone-900 p-2 shadow-2xl snap-center shrink-0 rotate-1 even:-rotate-1 hover:rotate-0 transition-transform duration-300">
              <video 
                src={item.video} 
                poster={item.poster} 
                controls 
                preload="none" 
                className="w-full h-full object-cover" 
                playsInline 
                loop 
                muted 
              />
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Sfeerimpressie (Gallery) */}
      <section className="py-24 bg-stone-200 px-6 border-t border-stone-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-stone-900 mb-2">De Sfeer</h2>
              <p className="text-lg text-stone-600 font-medium italic">Zo ziet een feest met La Pizza di Sabi eruit.</p>
            </div>
            <Camera size={48} className="text-red-700 opacity-50" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className={`bg-white p-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:z-10 relative
                ${i % 2 === 0 ? '-rotate-3 hover:rotate-1' : 'rotate-2 hover:-rotate-1'}
                ${i === 0 || i === 3 ? 'mt-4 md:mt-8' : ''}
              `}>
                <img src={photo} className="w-full aspect-square object-cover" alt="Sfeerimpressie event" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter text-stone-900">Pakketten</h2>
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 md:p-10 flex flex-col relative transition-all duration-300 
                ${pkg.featured 
                  ? 'bg-stone-900 text-stone-50 lg:-translate-y-4 shadow-2xl z-10' 
                  : 'bg-white text-stone-900 shadow-lg border border-stone-200'}`}>
                
                {pkg.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-700 text-white font-black uppercase text-[10px] tracking-widest py-1.5 px-6 shadow-md whitespace-nowrap">Meest Populair</div>}
                
                <h3 className="text-2xl font-black uppercase mb-2">{pkg.title}</h3>
                <p className={`text-sm mb-6 italic ${pkg.featured ? 'text-stone-400' : 'text-stone-500'}`}>{pkg.description}</p>
                <div className="text-5xl font-black mb-8 border-b-2 border-dashed border-stone-300/30 pb-8 tracking-tighter">€{pkg.price}<span className="text-sm font-medium opacity-50 tracking-normal"> / pp</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-base font-medium">
                      <Check size={20} className={`shrink-0 ${pkg.featured ? 'text-red-500' : 'text-red-700'}`} /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className={`w-full py-4 font-black uppercase text-sm tracking-widest transition-all ${pkg.featured ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-stone-900 text-white hover:bg-stone-800'}`}>Selecteer</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-red-800 text-stone-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter text-white">Wat gasten zeggen</h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {testimonials.map((review, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-red-900/40 border border-red-700/50 shadow-lg">
                <div className="bg-white p-1 rotate-2 mb-6 shadow-md">
                  <img src={review.image} alt={review.name} className="w-20 h-20 object-cover" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium mb-6 italic text-red-50 leading-relaxed">"{review.review}"</p>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">- {review.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Formulier */}
      <section id="contact" className="py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-4 tracking-tighter leading-[1] text-stone-900">Boek uw live chef</h2>
            <p className="text-lg text-stone-600 mb-6 font-medium italic">Vul het formulier in voor een op maat gemaakte offerte.</p>
            
            <div className="flex items-center justify-center gap-2 text-stone-600 font-medium">
              <Phone size={18} className="text-red-700" />
              <span>Liever bellen?</span>
              <a href="tel:+31612345678" className="font-black text-stone-900 hover:text-red-700 underline underline-offset-4 decoration-2 transition-colors ml-1">
                +31 6 12 34 56 78
              </a>
            </div>
          </div>

          {/* Restaurant "Order Slip" Form Design */}
          <form 
            action="https://formsubmit.co/ciao@lapizzadisabi.nl" 
            method="POST" 
            className="bg-white p-6 md:p-12 shadow-2xl border-t-8 border-red-700 flex flex-col gap-6 w-full box-border relative"
          >
            {/* Subtle paper background effect */}
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nieuwe Offerte Aanvraag - La Pizza di Sabi" />
            <input type="hidden" name="_next" value="https://lapizzadisabi.nl" />
            
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest">Naam</label>
                <input required type="text" name="Naam" className="w-full p-3 border-b-2 border-stone-200 focus:outline-none focus:border-red-700 transition-colors bg-transparent text-lg font-medium" placeholder="Jouw volledige naam" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest">E-mail of Telefoon</label>
                <input required type="text" name="Contactgegevens" className="w-full p-3 border-b-2 border-stone-200 focus:outline-none focus:border-red-700 transition-colors bg-transparent text-lg font-medium" placeholder="Hoe kunnen we je bereiken?" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10 mt-4">
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> Datum Evenement</label>
                <input required type="date" name="Datum" className="w-full p-3 border-b-2 border-stone-200 focus:outline-none focus:border-red-700 transition-colors bg-transparent text-lg font-medium block" />
              </div>
              
              <div className="flex flex-col gap-2 min-w-0">
                <label className="text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2"><Users size={14}/> Aantal Personen</label>
                <select required name="Aantal Personen" className="w-full p-3 border-b-2 border-stone-200 focus:outline-none focus:border-red-700 transition-colors bg-transparent text-lg font-medium" defaultValue="">
                  <option value="" disabled>Kies het aantal gasten</option>
                  <option value="0-10">0 - 10 personen</option>
                  <option value="10-20">10 - 20 personen</option>
                  <option value="20-30">20 - 30 personen</option>
                  <option value="30+">30+ personen</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10 mt-4">
              <label className="text-xs font-black text-stone-400 uppercase tracking-widest">Extra details of bericht</label>
              <textarea required name="Bericht" rows="3" className="w-full p-3 border-b-2 border-stone-200 focus:outline-none focus:border-red-700 transition-colors bg-transparent resize-none text-lg font-medium" placeholder="Vertel ons meer over het evenement of dieetwensen..."></textarea>
            </div>

            <button type="submit" className="w-full py-5 mt-6 bg-stone-900 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-700 transition-colors relative z-10 shadow-lg">
              Verstuur Aanvraag <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Veelgestelde Vragen */}
      <section className="py-24 bg-stone-200 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-stone-900">Praktische Info</h2>
            <p className="text-lg md:text-xl text-stone-600 font-medium italic">Transparant en zonder verrassingen.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {[
              { q: "Wat hebben jullie nodig op locatie?", a: "Slechts een stukje ruimte van ongeveer 3x3 meter voor onze mobiele oven en werkbank. Wij regelen de rest!" },
              { q: "Hoe zit het met dieetwensen en allergieën?", a: "Geen probleem. We bieden fantastische veganistische opties (zoals onze Marinara) en kunnen rekening houden met diverse allergieën. Laat het ons simpelweg vooraf weten." },
              { q: "Hoe lang blijven jullie pizza's bakken?", a: "Afhankelijk van het pakket en de groepsgrootte bakken wij 2 tot 4 uur lang onbeperkt pizza's. We arriveren ruim op tijd om de oven perfect op temperatuur te krijgen." },
              { q: "Wat gebeurt er als het regent?", a: "Wij hebben een professionele zwarte partytent om onze werkplek droog te houden. Zo kunnen we ook met typisch Nederlands weer gewoon de beste pizza's blijven bakken." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white p-6 shadow-md border-l-4 border-red-700 cursor-pointer transition-all duration-300">
                <summary className="text-lg md:text-xl font-bold tracking-wide list-none flex justify-between items-center outline-none [&::-webkit-details-marker]:hidden text-stone-900">
                  {faq.q}
                  <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4 text-red-700">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-stone-600 mt-4 leading-relaxed text-base md:text-lg italic">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain grayscale opacity-70" onError={(e) => e.target.style.display='none'} />
            <div className="text-xl font-black uppercase tracking-tighter text-white">
              La Pizza <span className="text-red-600">di Sabi</span>
            </div>
          </div>
          <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} La Pizza di Sabi. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>

      {/* Mobile Floating Call Button */}
      <a 
        href="tel:+31612345678" 
        className="md:hidden fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Bel La Pizza di Sabi"
      >
        <Phone size={24} />
      </a>

    </div>
  );
}