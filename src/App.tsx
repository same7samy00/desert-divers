import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Play, ArrowRight, Compass, Camera } from 'lucide-react';

const CONTENT = {
  en: {
    nav: {
      destinations: 'Destinations',
      experiences: 'Experiences',
      journal: 'Journal',
      book: 'Book Journey',
      lang: 'عربي'
    },
    hero: {
      visit: 'DIVE INTO',
      indonesia: 'EGYPT',
      explore: 'Explore Location',
      slides: [
        {
          id: '01',
          title: 'DAHAB BLUE HOLE',
          subtitle: 'THE LEGENDARY DIVE SITE',
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=3000&auto=format&fit=crop',
          desc: 'Descend into the world-famous Blue Hole in Dahab — a 130-meter deep sinkhole teeming with marine life and crystal-clear waters.'
        },
        {
          id: '02',
          title: 'RAS MOHAMMED',
          subtitle: 'RED SEA PARADISE',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3000&auto=format&fit=crop',
          desc: 'Explore the pristine coral walls and vibrant reef ecosystems of Ras Mohammed National Park at the tip of Sinai.'
        },
        {
          id: '03',
          title: 'HURGHADA',
          subtitle: 'CORAL REEF CAPITAL',
          image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=3000&auto=format&fit=crop',
          desc: 'Discover endless underwater wonders along the Hurghada coastline — from the Giftun Islands to the sunken shipwrecks.'
        }
      ]
    },
    destinations: {
      title: 'Curated Dive Destinations',
      desc: 'From the legendary Blue Hole of Dahab to the coral gardens of Marsa Alam, experience the best diving spots Egypt has to offer along the Red Sea coast.',
      viewAll: 'View All Places',
      places: [
        { name: 'Dahab', region: 'South Sinai', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 md:col-span-2' },
        { name: 'Sharm El Sheikh', region: 'South Sinai', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1' },
        { name: 'Marsa Alam', region: 'Red Sea', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1' },
        { name: 'El Gouna', region: 'Red Sea', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 md:col-span-2' }
      ]
    },
    services: {
      badge: 'Dive · Climb · Trek · Freedive',
      title: 'Our Adventures in Dahab',
      items: [
        {
          id: 1,
          title: 'Scuba Diving',
          desc: 'Learn to dive with PADI pros, explore the Blue Hole, enjoy camel diving safaris and world-class reef diving in Dahab.',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 2,
          title: 'Rock Climbing',
          desc: 'Climb dry granite routes in the Sinai mountains from October to April. Courses for beginners, sport climbing and bouldering.',
          image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 3,
          title: 'Desert Trekking',
          desc: 'Trek deep into the Sinai desert with Bedouin guides. Day trips to St Catherine or multi-day deep desert expeditions.',
          image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 4,
          title: 'Freediving',
          desc: 'Discover the big blue on a single breath of air. Courses, training and freediving trips in Dahab\'s legendary Blue Hole.',
          image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2000&auto=format&fit=crop',
        }
      ],
      cta: 'Discover More'
    },
    experience: {
      badge: 'Immersive Experience',
      title1: 'Feel the',
      title2: 'Magic of',
      title3: 'The Red Sea',
      desc: 'Step into a world where ancient history meets breathtaking underwater beauty. From diving the Blue Hole at sunrise to camping under the Sinai stars.',
      start: 'Start Journey',
      watch: 'Watch Film',
      durationLabel: 'Duration',
      durationValue: '7 Days'
    },
    footer: {
      rights: '© 2026 DESERT DIVERS. ALL RIGHTS RESERVED.'
    }
  },
  ar: {
    nav: {
      destinations: 'الوجهات',
      experiences: 'التجارب',
      journal: 'اليوميات',
      book: 'احجز رحلتك',
      lang: 'EN'
    },
    hero: {
      visit: 'غُص في',
      indonesia: 'مصر',
      explore: 'استكشف الموقع',
      slides: [
        {
          id: '٠١',
          title: 'بلو هول دهب',
          subtitle: 'موقع الغوص الأسطوري',
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=3000&auto=format&fit=crop',
          desc: 'انزل إلى البلو هول الشهير في دهب — حفرة بعمق ١٣٠ متر مليئة بالحياة البحرية والمياه الكريستالية الصافية.'
        },
        {
          id: '٠٢',
          title: 'رأس محمد',
          subtitle: 'جنة البحر الأحمر',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3000&auto=format&fit=crop',
          desc: 'استكشف جدران المرجان البكر والنظم البيئية النابضة بالحياة في محمية رأس محمد عند طرف سيناء.'
        },
        {
          id: '٠٣',
          title: 'الغردقة',
          subtitle: 'عاصمة الشعاب المرجانية',
          image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=3000&auto=format&fit=crop',
          desc: 'اكتشف عجائب تحت الماء على ساحل الغردقة — من جزر الجفتون إلى حطام السفن الغارقة.'
        }
      ]
    },
    destinations: {
      title: 'وجهات غوص مميزة',
      desc: 'من البلو هول الأسطوري في دهب إلى حدائق المرجان في مرسى علم، عِش أفضل تجارب الغوص في مصر على ساحل البحر الأحمر.',
      viewAll: 'عرض كل الأماكن',
      places: [
        { name: 'دهب', region: 'جنوب سيناء', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 md:col-span-2' },
        { name: 'شرم الشيخ', region: 'جنوب سيناء', image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1' },
        { name: 'مرسى علم', region: 'البحر الأحمر', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1' },
        { name: 'الجونة', region: 'البحر الأحمر', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop', span: 'col-span-1 md:col-span-2' }
      ]
    },
    services: {
      badge: 'غوص · تسلق · رحلات · فريدايفنج',
      title: 'مغامراتنا في دهب',
      items: [
        {
          id: 1,
          title: 'غوص سكوبا',
          desc: 'تعلّم الغوص مع محترفي PADI، استكشف البلو هول، واستمتع بسفاري الغوص بالجمال والشعاب المرجانية في دهب.',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 2,
          title: 'تسلق الصخور',
          desc: 'تسلق صخور الجرانيت في جبال سيناء من أكتوبر لأبريل. دورات للمبتدئين، تسلق رياضي وبولدرينج.',
          image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 3,
          title: 'رحلات صحراوية',
          desc: 'توغّل في صحراء سيناء مع مرشدين بدو. رحلات يومية لسانت كاترين أو رحلات عميقة لعدة أيام.',
          image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000&auto=format&fit=crop',
        },
        {
          id: 4,
          title: 'فريدايفنج',
          desc: 'اكتشف العالم الأزرق بنَفَس واحد. دورات وتدريبات ورحلات فريدايفنج في البلو هول الأسطوري بدهب.',
          image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2000&auto=format&fit=crop',
        }
      ],
      cta: 'اكتشف المزيد'
    },
    experience: {
      badge: 'تجربة غامرة',
      title1: 'اشعر',
      title2: 'بسحر',
      title3: 'البحر الأحمر',
      desc: 'ادخل إلى عالم يلتقي فيه التاريخ العريق بجمال الأعماق الخلاب. من الغوص في البلو هول عند الشروق إلى التخييم تحت نجوم سيناء.',
      start: 'ابدأ الرحلة',
      watch: 'شاهد الفيلم',
      durationLabel: 'المدة',
      durationValue: '٧ أيام'
    },
    footer: {
      rights: '© ٢٠٢٦ ديزرت دايفرز. جميع الحقوق محفوظة.'
    }
  }
};

function useAutoHover(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, active };
}

function DestinationCard({ dest, index }: { dest: any; index: number }) {
  const { ref, active } = useAutoHover(0.4);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-brand-primary/5 ${dest.span}`}
      data-active={active ? '' : undefined}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-data-[active]:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 group-data-[active]:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 group-data-[active]:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 text-zinc-300 mb-3">
            <MapPin className="w-4 h-4 text-brand-primary" />
            <span className="text-xs uppercase tracking-widest">{dest.region}</span>
          </div>
          <h3 className="text-3xl font-serif mb-4 text-white">{dest.name}</h3>
          <div className="h-[1px] w-0 bg-brand-primary group-hover:w-12 group-data-[active]:w-12 transition-all duration-700 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCard({ item, index, cta }: { item: any; index: number; cta: string }) {
  const { ref, active } = useAutoHover(0.3);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl shadow-brand-primary/5"
      data-active={active ? '' : undefined}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-data-[active]:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-90 group-data-[active]:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 translate-y-8 group-hover:translate-y-0 group-data-[active]:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end">
        <h3 className="text-3xl font-serif text-white mb-3">{item.title}</h3>
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-data-[active]:grid-rows-[1fr] transition-all duration-700 ease-out">
          <div className="overflow-hidden">
            <p className="text-slate-200 text-base mb-6 opacity-0 group-hover:opacity-100 group-data-[active]:opacity-100 transition-opacity duration-700 delay-100">
              {item.desc}
            </p>
            <button className="px-6 py-3 bg-brand-accent hover:bg-green-600 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2 w-fit">
              {cta} <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = CONTENT[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % t.hero.slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [t.hero.slides.length]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`text-xl font-serif tracking-widest uppercase font-semibold transition-colors ${isScrolled ? 'text-brand-text' : 'text-white'}`}>
            Desert Divers<span className="text-brand-primary">.</span>
          </div>
          <div className={`hidden md:flex gap-12 text-sm tracking-widest uppercase font-medium transition-colors ${isScrolled ? 'text-brand-text-sec' : 'text-zinc-300'}`}>
            <a href="#" className={`transition-colors ${isScrolled ? 'hover:text-brand-primary' : 'hover:text-white'}`}>{t.nav.destinations}</a>
            <a href="#" className={`transition-colors ${isScrolled ? 'hover:text-brand-primary' : 'hover:text-white'}`}>{t.nav.experiences}</a>
            <a href="#" className={`transition-colors ${isScrolled ? 'hover:text-brand-primary' : 'hover:text-white'}`}>{t.nav.journal}</a>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={toggleLang} className={`text-sm font-medium tracking-widest transition-colors ${isScrolled ? 'text-brand-text-sec hover:text-brand-primary' : 'text-zinc-400 hover:text-white'}`}>
              {t.nav.lang}
            </button>
            <button className={`hidden md:block px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all duration-300 ${isScrolled ? 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-md shadow-brand-primary/20' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10'}`}>
              {t.nav.book}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {t.hero.slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-950/90" />
            <div className={`absolute inset-0 bg-gradient-to-r ${isRtl ? 'from-transparent via-black/20 to-black/60' : 'from-black/60 via-black/20 to-transparent'}`} />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
          <div className="max-w-3xl z-10 mt-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}-${lang}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-white/50" />
                  <span className="text-sm tracking-[0.3em] uppercase text-zinc-300">
                    {t.hero.slides[currentSlide].subtitle}
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] mb-8 text-white">
                  {t.hero.visit}<br />
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    {t.hero.indonesia}
                  </span>
                </h1>
                
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-w-md">
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    {t.hero.slides[currentSlide].desc}
                  </p>
                  <button className="flex items-center gap-3 text-sm uppercase tracking-widest hover:gap-5 transition-all duration-300 group text-white">
                    <span>{t.hero.explore}</span>
                    <ArrowRight className="w-4 h-4 rtl:-scale-x-100 transition-transform text-brand-primary" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Side Pagination */}
        <div className="absolute end-6 md:end-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-20">
          {t.hero.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center justify-center text-white"
            >
              <span className={`absolute end-8 text-xs tracking-widest transition-all duration-500 ${
                currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 rtl:-translate-x-4 ltr:translate-x-4 group-hover:opacity-50 rtl:group-hover:-translate-x-2 ltr:group-hover:translate-x-2'
              }`}>
                {slide.id}
              </span>
              <div className={`w-[2px] transition-all duration-500 ${
                currentSlide === index ? 'h-16 bg-brand-primary' : 'h-8 bg-white/20 group-hover:bg-white/50 group-hover:h-12'
              }`} />
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-brand-text">{t.destinations.title}</h2>
            <p className="text-brand-text-sec text-lg leading-relaxed">
              {t.destinations.desc}
            </p>
          </div>
          <button className="flex items-center gap-3 text-sm uppercase tracking-widest pb-2 border-b border-brand-primary text-brand-primary hover:text-brand-primary-hover hover:border-brand-primary-hover transition-colors group">
            {t.destinations.viewAll} <ArrowRight className="w-4 h-4 rtl:-scale-x-100 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.destinations.places.map((dest, index) => (
            <DestinationCard key={dest.name} dest={dest} index={index} />
          ))}
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="py-32 px-6 md:px-12 bg-brand-section relative overflow-hidden">
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-highlight/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-brand-primary font-semibold tracking-widest uppercase text-sm mb-4 block">
              {t.services.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-text">
              {t.services.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.items.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} cta={t.services.cta} />
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Experience Section */}
      <section className="relative py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=3000&auto=format&fit=crop" 
            alt="Red Sea Diving"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            key={`exp-${lang}`}
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 text-white">
              <span className="w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
              <span className="text-xs uppercase tracking-widest">{t.experience.badge}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight text-white">
              {t.experience.title1} <br/><span className="italic text-slate-400">{t.experience.title2}</span> {t.experience.title3}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-xl">
              {t.experience.desc}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button className="px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full text-sm uppercase tracking-widest font-semibold transition-colors">
                {t.experience.start}
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-sm uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-3">
                <Play className="w-4 h-4 rtl:-scale-x-100" /> {t.experience.watch}
              </button>
            </div>
          </motion.div>

          {/* Video Preview Thumbnails */}
          <motion.div 
            key={`video-${lang}`}
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=1000&auto=format&fit=crop" 
                alt="Red Sea Diving"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 hover:scale-110 transition-all duration-500 group">
                  <Play className="w-8 h-8 text-white ms-2 group-hover:text-brand-highlight transition-colors rtl:-scale-x-100" />
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute bottom-8 start-8 end-8 flex justify-between items-end text-white">
                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                  <div className="text-xs text-slate-300 uppercase tracking-widest mb-1">{t.experience.durationLabel}</div>
                  <div className="text-xl font-serif">{t.experience.durationValue}</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/5 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif tracking-widest uppercase font-semibold">
            Desert Divers<span className="text-brand-primary">.</span>
          </div>
          <div className="flex gap-8 text-xs tracking-widest uppercase text-slate-400">
            <a href="#" className="hover:text-brand-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-primary transition-colors">YouTube</a>
          </div>
          <div className="text-xs text-slate-500">
            {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
