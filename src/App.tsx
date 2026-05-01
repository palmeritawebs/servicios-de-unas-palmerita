import React, { useState, useEffect } from 'react';
import { Instagram, Calendar, MapPin, Clock, Check, Star, Menu, X, ChevronRight, Sparkles, Wand2, ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0: Start, 1-3: Questions, 4: Result
  const [quizAnswers, setQuizAnswers] = useState({ length: '', vibe: '', finish: '' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const WHATSAPP_NUMBER = "522213228116";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para enviar reserva por WhatsApp
  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const day = selectedDate;
    const time = selectedTime;
    const serviceInfo = quizStep === 4 ? `Mi estilo ideal según el quiz es: ${getQuizResult()}.` : "";
    const message = `¡Hola! Me gustaría confirmar mi cita para el día ${day} a las ${time}. ${serviceInfo}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const services = [
    { title: "Gelish", price: "$250", desc: "Esmaltado de larga duración con acabado brillante.", icon: "✨", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80" },
    { title: "Acrílico", price: "$450+", desc: "Extensiones resistentes con formas personalizadas.", icon: "💅", img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80" },
    { title: "Diseño Libre", price: "$150+", desc: "Nail art a mano alzada, cristales y charms.", icon: "🎨", img: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=400&q=80" },
    { title: "Manicura Rusa", price: "$300", desc: "Limpieza profunda de cutícula para un acabado pro.", icon: "🌸", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80" }
  ];

  const masonryImages = [
    { url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=70", height: "h-64" },
    { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=70", height: "h-96" },
    { url: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=500&q=70", height: "h-80" },
    { url: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=500&q=70", height: "h-72" },
    { url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=500&q=70", height: "h-96" },
    { url: "https://images.unsplash.com/photo-1599948058210-7a2ecbd3c915?auto=format&fit=crop&w=500&q=70", height: "h-64" }
  ];

  const handleQuizAnswer = (field, value) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    setQuizStep(prev => prev + 1);
  };

  const getQuizResult = () => {
    if (quizAnswers.length === 'Corta' && quizAnswers.vibe === 'Soft') return "Manicura Gelish Natural";
    if (quizAnswers.length === 'Larga' || quizAnswers.vibe === 'Downtown') return "Set Acrílico con Nail Art";
    return "Manicura Rusa con Diseño Minimal";
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] font-sans text-[#333] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Quicksand:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Quicksand', sans-serif; }
        
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(181, 201, 230, 0.5); }
        }
        .animate-pulse-cta { animation: pulse-soft 3s infinite ease-in-out; }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }

        .shine-effect::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 4s infinite;
        }
        @keyframes shine { 0% { transform: translateX(-100%); } 20%, 100% { transform: translateX(100%); } }
        
        .masonry { column-count: 2; column-gap: 1rem; }
        @media (min-width: 768px) { .masonry { column-count: 3; } }
      `}</style>

      {/* WhatsApp Flotante */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center justify-center group"
      >
        <MessageCircle size={28} fill="currentColor" className="text-white" />
        <span className="absolute right-full mr-4 bg-white text-[#333] px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#F5E6F7]">
          ¡Hola! ¿Alguna duda? ✨
        </span>
      </a>

      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-[#2D3E4E]">[web de uñas]</h1>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#servicios" className="hover:text-[#88A270] transition-colors font-medium">Servicios</a>
            <a href="#quiz" className="hover:text-[#88A270] transition-colors font-medium">Quiz</a>
            <a href="#galeria" className="hover:text-[#88A270] transition-colors font-medium">Galería</a>
            <a href="#ubicacion" className="hover:text-[#88A270] transition-colors font-medium">Ubicación</a>
            <button 
              onClick={() => document.getElementById('agendar').scrollIntoView({behavior: 'smooth'})}
              className="bg-[#B5C9E6] hover:bg-[#99B7E1] text-[#2D3E4E] px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2 relative overflow-hidden shine-effect"
            >
              <Calendar size={18} /> Agendar
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-[#E8F3E0] text-[#5D7A42] font-semibold text-xs mb-6 uppercase tracking-widest">Estética Soft & Downtown</span>
            <h2 className="text-5xl lg:text-7xl font-serif text-[#2D3E4E] leading-tight mb-6">
              Tus manos, <br /><span className="italic text-[#88A270]">tu mejor accesorio.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => document.getElementById('agendar').scrollIntoView({behavior: 'smooth'})}
                className="animate-pulse-cta relative overflow-hidden bg-[#2D3E4E] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2 shine-effect"
              >
                Agendar ahora <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => setQuizStep(1)}
                className="bg-white border-2 border-[#2D3E4E] text-[#2D3E4E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2D3E4E] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Hacer el Quiz <Wand2 size={18} />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="rounded-3xl overflow-hidden border-[10px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=70" alt="Diseño de uñas profesional" className="w-full h-auto" />
             </div>
          </div>
        </div>
      </header>

      {/* Cuestionario de Estilo */}
      <section id="quiz" className="py-24 bg-[#F5E6F7]/30">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#F5E6F7] text-center">
            {quizStep === 0 && (
              <>
                <Sparkles className="mx-auto text-[#88A270] mb-4" size={40} />
                <h3 className="text-3xl font-serif text-[#2D3E4E] mb-4">¿Cuál es tu set ideal?</h3>
                <p className="text-gray-500 mb-8 font-sans">Responde 3 preguntas y te diremos qué pedir en tu próxima cita.</p>
                <button onClick={() => setQuizStep(1)} className="bg-[#88A270] text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">Comenzar Quiz</button>
              </>
            )}

            {quizStep === 1 && (
              <div>
                <p className="text-sm text-[#88A270] font-bold mb-2">Paso 1 de 3</p>
                <h4 className="text-2xl font-serif mb-8">¿Qué largo prefieres?</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Corta', 'Larga'].map(l => (
                    <button key={l} onClick={() => handleQuizAnswer('length', l)} className="p-4 border-2 border-[#F5E6F7] rounded-2xl hover:bg-[#E8F3E0] transition-all font-bold">{l}</button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div>
                <p className="text-sm text-[#88A270] font-bold mb-2">Paso 2 de 3</p>
                <h4 className="text-2xl font-serif mb-8">¿Cuál es tu vibe hoy?</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Soft (Dulce)', 'Downtown (Cool)'].map(v => (
                    <button key={v} onClick={() => handleQuizAnswer('vibe', v.split(' ')[0])} className="p-4 border-2 border-[#F5E6F7] rounded-2xl hover:bg-[#E8F3E0] transition-all font-bold">{v}</button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div>
                <p className="text-sm text-[#88A270] font-bold mb-2">Paso 3 de 3</p>
                <h4 className="text-2xl font-serif mb-8">¿Acabado favorito?</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Brillante', 'Mate'].map(f => (
                    <button key={f} onClick={() => handleQuizAnswer('finish', f)} className="p-4 border-2 border-[#F5E6F7] rounded-2xl hover:bg-[#E8F3E0] transition-all font-bold">{f}</button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 4 && (
              <div className="animate-in fade-in zoom-in duration-500">
                <h4 className="text-sm text-[#88A270] font-bold mb-2">¡Tu combinación perfecta es!</h4>
                <h3 className="text-4xl font-serif text-[#2D3E4E] mb-6 underline decoration-[#B5C9E6]">{getQuizResult()}</h3>
                <p className="text-gray-500 mb-8 font-sans">Este set resalta tu personalidad {quizAnswers.vibe} y el acabado {quizAnswers.finish} le dará el toque final.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setQuizStep(0)} className="text-sm font-bold text-gray-400">Repetir</button>
                  <button onClick={() => document.getElementById('agendar').scrollIntoView({behavior: 'smooth'})} className="bg-[#2D3E4E] text-white px-6 py-2 rounded-full font-bold">Reservar este set</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Menú de Servicios */}
      <section id="servicios" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif text-[#2D3E4E] mb-4">Servicios Especializados</h3>
            <p className="text-gray-500 max-w-xl mx-auto font-sans">Calidad en cada detalle. Fotos reales de nuestro estudio.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-64 mb-6 rounded-3xl overflow-hidden shadow-sm">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#88A270]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#2D3E4E] px-4 py-2 rounded-full font-bold text-xs">VER MÁS</span>
                  </div>
                </div>
                <h4 className="text-xl font-serif mb-2">{s.title}</h4>
                <div className="flex justify-between items-center font-sans">
                  <p className="text-sm text-gray-500">{s.desc}</p>
                  <p className="font-bold text-[#2D3E4E]">{s.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería Masonry */}
      <section id="galeria" className="py-24 bg-[#FFFBF7]">
        <div className="container mx-auto px-6 mb-12">
          <h3 className="text-4xl font-serif text-[#2D3E4E] mb-2 text-center">Nail Inspiration</h3>
          <p className="text-center text-gray-400 mb-12 font-sans">Sigue nuestra vibra creativa en Instagram</p>
          <div className="masonry">
            {masonryImages.map((img, i) => (
              <div key={i} className={`mb-4 break-inside-avoid rounded-3xl overflow-hidden shadow-sm group relative cursor-zoom-in ${img.height}`}>
                <img src={img.url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt="Diseño de uñas artístico" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Instagram size={18} /> <span className="text-xs font-bold font-sans tracking-widest">VER DISEÑO</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario - Conectado a WhatsApp */}
      <section id="agendar" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif text-[#2D3E4E] mb-4">Reserva tu momento</h3>
            <p className="text-gray-500 font-sans">Elige el día y la hora que mejor te queden para confirmar por WhatsApp.</p>
          </div>
          <div className="max-w-4xl mx-auto border-2 border-[#F5E6F7] rounded-[40px] overflow-hidden shadow-2xl h-[650px] bg-white relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="p-6 bg-[#2D3E4E] text-white flex justify-between items-center">
                <span className="font-serif">Calendario de Citas</span>
                <div className="flex gap-2">
                   <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                   <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                   <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="grid grid-cols-7 gap-2 mb-8 font-sans text-xs">
                  {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(d => (
                    <div key={d} className="text-center font-bold text-gray-400">{d}</div>
                  ))}
                  {[...Array(30)].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedDate(`${i + 1} de este mes`)}
                      className={`h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${selectedDate === `${i + 1} de este mes` ? 'bg-[#88A270] text-white' : i > 10 && i < 25 ? 'bg-[#E8F3E0] text-[#5D7A42] hover:bg-[#88A270] hover:text-white' : 'text-gray-300 cursor-not-allowed'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-6 font-sans">
                  <p className="font-bold text-[#2D3E4E]">{selectedDate ? `Horarios para el ${selectedDate}:` : "Selecciona un día disponible:"}</p>
                  <div className="flex flex-wrap gap-3">
                    {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map(t => (
                      <button 
                        key={t} 
                        disabled={!selectedDate}
                        onClick={() => setSelectedTime(t)}
                        className={`border border-[#B5C9E6] px-4 py-2 rounded-full font-bold text-[#2D3E4E] transition-colors ${!selectedDate ? 'opacity-30 cursor-not-allowed' : selectedTime === t ? 'bg-[#B5C9E6]' : 'hover:bg-[#B5C9E6]'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Botón de Confirmación Añadido */}
                  {selectedDate && selectedTime && (
                    <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <button 
                        onClick={handleBooking}
                        className="w-full bg-[#88A270] text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2"
                      >
                        <Check size={20} /> Confirmar cita por WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Ubicación y Contacto */}
      <section id="ubicacion" className="py-24 bg-[#FDF8F3]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Información Detallada */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-[#B5C9E6]/30 text-[#2D3E4E] font-bold text-xs uppercase tracking-widest">Encuéntranos</div>
              <h3 className="text-4xl font-serif text-[#2D3E4E]">Visítanos en el estudio</h3>
              
              <div className="space-y-6 font-sans">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-[#88A270]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Nuestra Dirección</h4>
                    <p className="text-gray-500">Calle de la Estética #123, Colonia Roma Norte, CDMX.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-[#88A270]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Horarios</h4>
                    <p className="text-gray-500">Lun - Vie: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-500">Sábado: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-[#25D366]">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">WhatsApp Directo</h4>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-[#88A270] font-bold hover:underline">+52 221 322 8116</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Simulado */}
            <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <div className="absolute inset-0 bg-[#E5E3DF] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-[#88A270] text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <MapPin size={32} />
                  </div>
                  <p className="font-serif text-xl text-[#2D3E4E]">Estamos aquí</p>
                  <p className="text-sm text-gray-500 mt-2">Haz clic para abrir en Google Maps</p>
                  <button className="mt-6 bg-[#2D3E4E] text-white px-8 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105">Abrir Mapa</button>
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                   <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3E4E] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16 border-b border-gray-700 pb-16">
            <div>
              <h2 className="text-3xl font-serif mb-4">[web de uñas]</h2>
              <p className="text-gray-400 font-sans leading-relaxed">Expertas en cuidado y diseño de uñas con las últimas tendencias de la estética Soft & Downtown.</p>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-6 text-[#B5C9E6]">Enlaces Rápidos</h4>
              <ul className="space-y-4 font-sans text-gray-400">
                <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#quiz" className="hover:text-white transition-colors">Quiz de Estilo</a></li>
                <li><a href="#agendar" className="hover:text-white transition-colors">Agendar Cita</a></li>
                <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-6 text-[#B5C9E6]">Contáctanos</h4>
              <ul className="space-y-4 font-sans text-gray-400">
                <li className="flex items-center gap-3"><Phone size={18} /> +52 221 322 8116</li>
                <li className="flex items-center gap-3"><Mail size={18} /> hola@studiouñas.com</li>
                <li className="flex items-center gap-3"><Instagram size={18} /> @tuestudiouñas</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 font-sans text-xs text-gray-500 uppercase tracking-widest">
            <p>© 2024 STUDIO DE UÑAS. TODOS LOS DERECHOS RESERVADOS.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">POLÍTICA DE PRIVACIDAD</a>
              <a href="#" className="hover:text-white">TÉRMINOS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;