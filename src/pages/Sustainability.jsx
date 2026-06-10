
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
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: Droplets,
      title: 'Advanced Water Stewardship',
      body: 'Our closed-loop water filtration systems allow us to recycle 40% of process water, protecting local aquifers and ensuring drought resilience.',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Recycle,
      title: 'Zero-Waste Philosophy',
      body: 'Nothing goes to waste. Organic by-products are converted into nutrient-rich fertilizer, supporting a circular economy with local vegetable farmers.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      icon: HeartHandshake,
      title: 'Community Empowerment',
      body: 'Through our "Nelna Cares" program, we provide technical training to over 200 small-scale poultry farmers annually to uplift rural livelihoods.',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
  ]

  const stats = [
    { value: 60, suffix: '%', label: 'Solar Powered Ops' },
    { value: 200, suffix: '+', label: 'Farmers Trained' },
    { value: 40, suffix: '%', label: 'Water Recycled' },
    { value: 100, suffix: '%', label: 'Ethical Practices' },
  ]

  return (
    <div className="w-full bg-white">
      
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={sustainabilityHeroImg} 
            alt="Sustainability Farm" 
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/40 to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-sm font-bold text-emerald-300 backdrop-blur-md mb-6">
              <Sprout className="h-4 w-4" />
              <span>Planet First Approach</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Growing for the Future,<br />
              <span className="text-emerald-300">Responsibly.</span>
            </h1>
            <p className="text-lg text-slate-200 max-w-xl leading-relaxed mb-8">
              True quality isn't just about the product—it's about the process. We are committed to leaving the land better than we found it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Impact Stats */}
      <div className="bg-emerald-950 py-12 border-b border-emerald-900">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {stats.map((stat, idx) => (
                 <div key={idx} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1 font-display">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-medium text-emerald-100 uppercase tracking-widest">{stat.label}</div>
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
              className="flex gap-6 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
             >
               <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-105 transition-transform`}>
                 <item.icon className="w-8 h-8" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{item.title}</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">
                  {item.body}
                 </p>
               </div>
             </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CSR Feature Section */}
      <section className="py-20 bg-slate-50 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-200/50 rounded-full blur-3xl"></div>
               <img 
                src={sustainabilityCsrImg} 
                  alt="Farmer Training" 
                className="relative rounded-2xl shadow-2xl w-full z-10"
                loading="lazy"
               />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                     <Users className="text-brand-600 h-5 w-5" />
                     <span className="font-bold text-slate-800">Community First</span>
                  </div>
                  <p className="text-xs text-slate-500">"Nelna changed my life by teaching me modern poultry farming techniques." — local partner</p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
               <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase mb-3 block">Corporate Social Responsibility</span>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display mb-6">Empowering the Nation</h2>
               <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  We believe that a sustainable business cannot exist in a vacuum. Our success is tied to the prosperity of our rural communities. We actively invest in education, infrastructure, and fair-trade partnerships.
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:gap-4 transition-all group">
                  Partner with us <ArrowRight className="h-4 w-4" />
               </Link>
            </div>
         </div>
      </section>

      {/* 5. Minimal CTA */}
      <section className="py-24 bg-brand-900 text-center px-6">
         <h2 className="text-3xl font-display font-bold text-white mb-6">Partner with a Responsible Food Producer</h2>
         <p className="text-emerald-100 max-w-2xl mx-auto mb-10 text-lg">
            When you work with Nelna, you support ethical farming, responsible operations, and a greener planet.
         </p>
         <Link to="/contact" className="inline-block rounded-full bg-white px-8 py-4 font-bold text-brand-900 hover:bg-emerald-50 transition-colors">
            Contact Sales
         </Link>
      </section>

    </div>
  )
}

export default Sustainability
