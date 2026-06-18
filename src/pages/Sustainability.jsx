
import { motion } from 'framer-motion'
import { 
  Sun, 
  Droplets, 
  HeartHandshake, 
  Recycle, 
  Sprout, 
  Users,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import Counter from '../components/Counter.jsx'

import sustainabilityHeroImg from '../assets/nelna-gallery-19.jpg'
import sustainabilityCsrImg from '../assets/nelna-gallery-20.jpg'
import mangoTreeIllustration from '../assets/Asset 2.png'

function Sustainability() {
  // const { t } = useTranslation()

  const initiatives = [
    {
      icon: Sun,
      title: 'Renewable Energy Leader',
      body: 'We have transitioned our primary processing plants to 60% solar energy, significantly reducing our carbon footprint and reliance on fossil fuels.',
      color: 'text-nelna-gold',
      bg: 'bg-nelna-gold-soft'
    },
    {
      icon: Droplets,
      title: 'Advanced Water Stewardship',
      body: 'Our closed-loop water filtration systems allow us to recycle 40% of process water, protecting local aquifers and ensuring drought resilience.',
      color: 'text-nelna-green',
      bg: 'bg-nelna-green-soft'
    },
    {
      icon: Recycle,
      title: 'Zero-Waste Philosophy',
      body: 'Nothing goes to waste. Organic by-products are converted into nutrient-rich fertilizer, supporting a circular economy with local vegetable farmers.',
      color: 'text-brand-green',
      bg: 'bg-brand-green-50'
    },
    {
      icon: HeartHandshake,
      title: 'Community Empowerment',
      body: 'Through our "Nelna Cares" program, we provide technical training to over 200 small-scale poultry farmers annually to uplift rural livelihoods.',
      color: 'text-nelna-green-dark',
      bg: 'bg-nelna-gold-soft'
    },
  ]

  const stats = [
    { value: 60, suffix: '%', label: 'Solar Powered Ops' },
    { value: 200, suffix: '+', label: 'Farmers Trained' },
    { value: 40, suffix: '%', label: 'Water Recycled' },
    { value: 100, suffix: '%', label: 'Ethical Practices' },
  ]

  return (
    <div className="w-full bg-nelna-white">
      
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-brand-green overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={sustainabilityHeroImg} 
            alt="Sustainability Farm" 
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/40 to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-nelna-white/30 bg-nelna-white/15 px-4 py-1.5 text-sm font-bold text-nelna-white backdrop-blur-md mb-6">
              <Sprout className="h-4 w-4" />
              <span>Planet First Approach</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-nelna-white mb-6 leading-tight">
              Growing for the Future,<br />
              <span className="text-brand-yellow-300">Responsibly.</span>
            </h1>
            <p className="text-lg text-nelna-white/90 max-w-xl leading-relaxed mb-8">
              True quality isn't just about the product—it's about the process. We are committed to leaving the land better than we found it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Impact Stats */}
      <div className="surface-brand-green py-12 border-b border-nelna-white/15">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {stats.map((stat, idx) => (
                 <div key={idx} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-brand-yellow-300 mb-1 font-display">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-medium text-nelna-white/90 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 3. Core Initiatives */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <img
          src={mangoTreeIllustration}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:block lg:w-[420px] xl:w-[520px]"
        />
        <div className="relative z-10">
          <SectionHeading 
            eyebrow="Our Initiatives" 
            title="Sustainability in Action"
            subtitle="We don't just talk about change; we engineer it into our daily operations."
            center
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {initiatives.map((item, idx) => (
             <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl border border-nelna-green-soft bg-nelna-green-soft hover:bg-nelna-white hover:shadow-xl transition-all duration-300 group"
             >
               <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}>
                 <item.icon className="w-8 h-8" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-nelna-dark mb-3 font-display">{item.title}</h3>
                 <p className="text-nelna-dark/80 leading-relaxed text-sm">
                  {item.body}
                 </p>
               </div>
             </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CSR Feature Section */}
      <section className="py-20 bg-nelna-green-soft overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200/50 rounded-full blur-3xl"></div>
               <img 
                src={sustainabilityCsrImg} 
                  alt="Farmer Training" 
                className="relative rounded-2xl shadow-2xl w-full z-10"
                loading="lazy"
               />
               <div className="absolute -bottom-6 -right-6 bg-nelna-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-nelna-green-soft">
                  <div className="flex items-center gap-3 mb-2">
                     <Users className="text-brand-green h-5 w-5" />
                     <span className="font-bold text-nelna-dark">Community First</span>
                  </div>
                  <p className="text-xs text-nelna-dark/70">"Nelna changed my life by teaching me modern poultry farming techniques." — local partner</p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <span className="text-brand-green font-bold tracking-wider text-sm uppercase mb-3 block">Corporate Social Responsibility</span>
               <h2 className="text-3xl md:text-4xl font-bold text-nelna-dark font-display mb-6">Empowering the Nation</h2>
               <p className="text-nelna-dark/80 text-lg leading-relaxed mb-8">
                  We believe that a sustainable business cannot exist in a vacuum. Our success is tied to the prosperity of our rural communities. We actively invest in education, infrastructure, and fair-trade partnerships.
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 text-brand-green font-bold hover:gap-4 transition-all group">
                  Partner with us <ArrowRight className="h-4 w-4" />
               </Link>
            </div>
         </div>
      </section>

      {/* 5. Minimal CTA */}
      <section className="surface-brand-green py-24 text-center px-6">
         <h2 className="text-3xl font-display font-bold text-nelna-white mb-6">Partner with a Responsible Food Producer</h2>
         <p className="text-nelna-white/90 max-w-2xl mx-auto mb-10 text-lg">
            When you work with Nelna, you support ethical farming, responsible operations, and a greener planet.
         </p>
         <Link to="/contact" className="inline-block rounded-full bg-nelna-white px-8 py-4 font-bold text-brand-green hover:bg-brand-green-50 transition-colors">
            Contact Sales
         </Link>
      </section>

    </div>
  )
}

export default Sustainability
