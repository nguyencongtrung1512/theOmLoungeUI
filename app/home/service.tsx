import React, { useState, useRef } from 'react';
import { ShoppingCart, Search, Plus } from 'lucide-react';
import Footer from '~/components/footer';
import { Header } from '~/components/header';
import { SERVICES, TESTIMONIALS } from '~/constants/mock-data';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { setCartOpen } from '~/redux/slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export default function Service() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const reduxCartOpen = useAppSelector((state) => state.cart.isOpen);
  const services = useAppSelector((state) => state.service.services);

  const [activeTab, setActiveTab] = useState('combo');
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const comboRef = useRef(null);
  const medicureRef = useRef(null);
  const pedicureRef = useRef(null);
  const effectRef = useRef(null);

  const sectionRefs = {
    combo: comboRef,
    medicure: medicureRef,
    pedicure: pedicureRef,
    effect: effectRef,
  };

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    const ref = sectionRefs[tabKey as keyof typeof sectionRefs] as unknown as React.RefObject<HTMLElement>;
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cartCount = cartItems.reduce((sum, item) => (!item.parentId ? sum + item.quantity : sum), 0);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header externalCartOpen={reduxCartOpen} onExternalCartOpenChange={(open) => dispatch(setCartOpen(open))} />
      <div className="relative w-full min-h-screen flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-[80vh] bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/Mask group.png')" }}
        />

        <div
          className="absolute top-0 left-0 w-full h-full z-[1]"
          style={{
            backgroundImage: `url('/service-bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 55%, black 75%)",
            maskImage: "linear-gradient(to bottom, transparent 55%, black 75%)",
          }}
        />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(94, 60, 3, 0.85) 35%, #614F38 60%, #614F38 100%)",
          }}
        />

        <div className="relative z-10 w-full flex flex-col">{/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full px-8 py-6 flex flex-col items-center"
          >
            <div className="w-full flex justify-between items-center mb-4">
              <button
                onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
                className="text-white text-xl tracking-widest uppercase font-light mb-10 hover:text-yellow-400 transition"
              >
                {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
              </button>
              <div className="flex flex-col items-center mb-8">
                <div className="text-white text-3xl font-serif tracking-[0.2em] uppercase text-center">
                  <img src="theOmLounge.png" alt="The Om Lounge" />
                </div>
              </div>
              <button onClick={() => dispatch(setCartOpen(true))} className="flex items-center gap-3 bg-[#8B5704] hover:bg-[#734903] mb-10 text-white px-3 py-1.5 transition-all duration-300 shadow-sm">
                <ShoppingCart size={20} strokeWidth={2} />
                <span className="text-[16px] font-medium uppercase leading-[1.5] tracking-normal">{t('cart')}</span>
                <span className="bg-[#F5F5F0] text-[#333] rounded-full w-6 h-6 flex items-center justify-center text-[14px] font-bold">{cartCount}</span>
              </button>
            </div>

            <nav className="w-full max-w-2xl">
              <ul className="flex justify-between items-center text-white/80 text-[20px] leading-[1.5] font-semibold tracking-[0.15em] font-light">
                <li className="hover:text-yellow-400 cursor-pointer transition">{t('home')}</li>
                <li className="hover:text-yellow-400 cursor-pointer transition">{t('about')}</li>
                <li className="hover:text-yellow-400 cursor-pointer transition">{t('services')}</li>
                <li className="hover:text-yellow-400 cursor-pointer transition">{t('news')}</li>
                <li className="hover:text-yellow-400 cursor-pointer transition">{t('contact')}</li>
              </ul>
            </nav>
          </motion.div>

          <div className="w-full flex flex-col items-center mt-[10vh] px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-6"
            >
              <h1 className="text-5xl md:text-7xl text-white/90 font-light tracking-widest drop-shadow-2xl">
                {t('Service')}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-7xl py-4 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16"
            >
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white/90 font-semibold text-xs md:text-sm">
                {[
                  { key: "combo", label: t('combo_package') },
                  { key: "medicure", label: t('medicure') },
                  { key: "pedicure", label: t('pedicure') },
                  { key: "effect", label: t('effect') },
                ].map((tab, index) => (
                  <React.Fragment key={tab.key}>
                    <button
                      onClick={() => handleTabClick(tab.key)}
                      className={`transition-colors uppercase tracking-wider ${activeTab === tab.key ? "text-[#FCE48C] font-bold" : "text-white/70 hover:text-white"}`}
                    >
                      {tab.label}
                    </button>
                    {index !== 3 && <span className="text-white/30 hidden md:inline">|</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="w-full md:w-[260px] relative">
                <input
                  placeholder={t('search_placeholder')}
                  className="w-full bg-transparent border-b border-white/40 text-white placeholder-white/60 pb-2 pr-8 focus:outline-none focus:border-amber-300 transition"
                />
                <Search className="absolute right-0 top-1 text-white/70 w-5 h-5" />
              </div>
            </motion.div>

            <div className="w-full max-w-7xl pb-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                ref={comboRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 pt-10"
              >
                <div className="w-full h-auto md:h-[500px] overflow-hidden shadow-2xl order-2 lg:order-1">
                  <img src="/goiCombo.jpg" alt="Combo Service" className="w-full h-full object-cover" />
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#E1C084] font-light mb-10">{t('combo_package_title')}</h2>
                  <div className="space-y-6">
                    {SERVICES.combo.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-amber-200/20 pb-4 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-[#FCE48C] transition-colors">{service.name}</h3>
                          <p className="text-white/60 text-sm font-light mb-1">{service.description}</p>
                          <p className="text-white/90 text-base font-semibold">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-white/80 group-hover:text-white p-2 transition flex-shrink-0"
                        >
                          <Plus size={24} strokeWidth={1.5} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                ref={medicureRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 pt-10"
              >
                <div className="order-1 lg:order-1">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#E1C084] font-light mb-10">{t('medicure_title')}</h2>
                  <div className="space-y-1">
                    {services.medicure.map((service, index) => (
                      <motion.div
                        key={`medicure-${service.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-amber-200/20 pb-4 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-[#FCE48C] transition-colors">{service.name}</h3>
                          <p className="text-white/60 text-sm font-light mb-1">{service.description}</p>
                          <p className="text-white/90 text-base font-semibold">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-white/80 group-hover:text-white p-2 transition flex-shrink-0"
                        >
                          <Plus size={24} strokeWidth={1.5} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-[516px] h-[696px] overflow-hidden shadow-2xl order-2 lg:order-2 ml-10">
                  <img src="/medicure.png" alt="Medicure Service" className="w-full h-full object-cover rounded-sm" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                ref={pedicureRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 pt-10"
              >
                <div className="w-full h-auto md:h-[500px] overflow-hidden shadow-2xl order-2 lg:order-1">
                  <img src="/Pedicure.png" alt="Pedicure Service" className="w-full h-full object-cover" />
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#E1C084] font-light mb-10">{t('pedicure_title')}</h2>
                  <div className="space-y-6">
                    {services.pedicure.map((service, index) => (
                      <motion.div
                        key={`pedicure-${service.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-amber-200/20 pb-4 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-[#FCE48C] transition-colors">{service.name}</h3>
                          <p className="text-white/60 text-sm font-light mb-1">{service.description}</p>
                          <p className="text-white/90 text-base font-semibold">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-white/80 group-hover:text-white p-2 transition flex-shrink-0"
                        >
                          <Plus size={24} strokeWidth={1.5} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                ref={effectRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 pt-10"
              >
                <div className="order-1 lg:order-1">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#E1C084] font-light mb-10">{t('effect_title')}</h2>
                  <div className="space-y-1">
                    {SERVICES.effect.map((service, index) => (
                      <motion.div
                        key={`effect-${service.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-amber-200/20 pb-4 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-[#FCE48C] transition-colors">{service.name}</h3>
                          <p className="text-white/60 text-sm font-light mb-1">{service.description}</p>
                          <p className="text-white/90 text-base font-semibold">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-white/80 group-hover:text-white p-2 transition flex-shrink-0"
                        >
                          <Plus size={24} strokeWidth={1.5} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-[516px] h-[696px] overflow-hidden shadow-2xl order-2 lg:order-2 ml-10">
                  <img src="/effect.png" alt="Effect Service" className="w-full h-full object-cover rounded-sm" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
              >
                <div className="w-full h-auto md:h-[550px] overflow-hidden shadow-2xl order-2 lg:order-1">
                  <img src="/drink.jpg" alt="Drinks Service" className="w-full h-full object-cover" />
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl md:text-5xl font-serif text-[#E1C084] font-light mb-7">{t('drinks_title')}</h2>
                  <div className="space-y-1">
                    {SERVICES.drink.map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-center group cursor-pointer border-b border-transparent hover:border-amber-200/20 pb-4 transition-all"
                      >
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1 group-hover:text-[#FCE48C] transition-colors">{service.name}</h3>
                          <p className="text-white/90 text-base font-semibold">{service.price}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-white/80 group-hover:text-white p-2 transition flex-shrink-0"
                        >
                          <Plus size={24} strokeWidth={1.5} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden"
        style={{ padding: '96px 0' }}
      >

        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/service-bg.png')" }}
        />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(180deg, rgba(129, 105, 75, 0.2) 20%, #614F38 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-12 ">
          <div className="text-center mb-12">
            <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-2">{t('testimonial_from')}</p>
            <h2 className="text-5xl md:text-6xl font-serif text-white font-light">{t('customers')}</h2>
          </div>

          <div className="grid grid-cols-3 gap-8 items-end">
            {[-1, 0, 1].map((offset) => {
              const index = (activeTestimonial + offset + TESTIMONIALS.length) % TESTIMONIALS.length;
              const item = TESTIMONIALS[index];
              const isCenter = offset === 0;
              return (
                <div
                  key={index}
                  onClick={() => !isCenter && setActiveTestimonial(index)}
                  className={`relative transition-all duration-500 cursor-pointer ${isCenter ? 'scale-105 z-10' : 'scale-95 opacity-75'
                    }`}
                >
                  <div className={`relative w-full overflow-hidden shadow-2xl ${isCenter ? 'h-[580px]' : 'h-[480px] mt-[50px]'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-[-18px] right-4 z-20">
                      <img src="/Union.png" alt="quote" className="w-10 h-10 object-contain" />
                    </div>
                  </div>

                  <div className="px-4 py-4" >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#E1C084]/40"
                      />
                      <span className="text-white font-semibold text-base">{item.name}</span>
                    </div>
                    <p className={`text-white/70 text-sm font-light leading-relaxed ${isCenter ? 'line-clamp-4' : 'line-clamp-2'
                      }`}>
                      {item.text}
                    </p>
                    <button className="text-[#E1C084]/70 text-sm mt-2 hover:text-[#E1C084] transition underline underline-offset-2">{t('read_more')}</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  width: '24px',
                  height: '24px',
                }}
              >
                {activeTestimonial === i && (
                  <span
                    style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.8)',
                    }}
                  />
                )}
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: activeTestimonial === i
                      ? '#DAD3CA'
                      : 'rgba(255,255,255,0.5)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="relative w-full flex items-center justify-center text-center overflow-hidden min-h-[420px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/booking.png')" }}
        />
        <div className="absolute inset-0 bg-[#8B6730] opacity-55" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center px-2 py-12 max-w-2xl mx-auto"
        >
          <h2 className="text-white text-4xl md:text-5xl font-regular mb-4 leading-tight tracking-wide"          >
            {t('booking_title')}
          </h2>

          <p className="text-white/85 text-sm font-regular md:text-base leading-relaxed  mb-8">
            {t('booking_description')}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="text-[#824C08] text-xs bg-white tracking-[0.15em] uppercase border border-white/85 px-8 py-3 bg-transparent transition-all duration-300 cursor-pointer"
          >
            {t('book_now')}
          </motion.button>
        </motion.div>
      </div>
      <Footer />
    </div >
  );
}