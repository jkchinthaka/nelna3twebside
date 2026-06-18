
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  ThermometerSnowflake, 
  Stethoscope, 
  ScanBarcode, 
  CheckCircle2,
  Microscope,
  Truck,
  Leaf
} from 'lucide-react'

import SectionHeading from '../components/SectionHeading.jsx'
import CertificationBadge from '../components/CertificationBadge.jsx'
import { Link } from 'react-router-dom'

import qualityHeroImg from '../assets/nelna-gallery-17.jpg'
import qualityLabImg from '../assets/nelna-gallery-18.jpg'
import { certifications } from '../data/certifications.js'

function QualitySafety() {
  // const { t } = useTranslation()

  const standards = [
    {
      icon: ShieldCheck,
      title: 'Stringent Biosecurity',
      body: 'Our facilities operate under strict controlled-entry protocols. Every vehicle and individual undergoes rigorous disinfection to prevent contamination.',
      color: 'text-nelna-green',
      bg: 'bg-nelna-green-soft'
    },
    {
      icon: Stethoscope,
      title: 'Veterinary Oversight',
      body: 'Dedicated on-site veterinary teams monitor flock health 24/7, ensuring ethically raised poultry free from unauthorized antibiotics.',
      color: 'text-brand-green',
      bg: 'bg-brand-green-50'
    },
    {
      icon: ThermometerSnowflake,
      title: 'Unbroken Cold Chain',
      body: 'From processing to delivery, our fleet of temperature-controlled vehicles maintains products at optimal freshness (0-4°C).',
      color: 'text-nelna-green-light',
      bg: 'bg-nelna-green-soft'
    },
    {
      icon: ScanBarcode,
      title: 'Full Traceability',
      body: 'Every product can be traced back to its specific farm batch, ensuring complete transparency and accountability in our supply chain.',
      color: 'text-nelna-green-dark',
      bg: 'bg-nelna-green-soft'
    },
  ]

  const technologies = [
    { name: 'Automated Feeding', icon: Leaf },
    { name: 'Water Purification', icon: CheckCircle2 },
    { name: 'Lab Testing', icon: Microscope },
    { name: 'GPS Tracking', icon: Truck },
  ]

  return (
    <div className="w-full bg-nelna-green-soft">
      
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-nelna-dark overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={qualityHeroImg} 
            alt="Food Quality Inspection" 
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nelna-dark-bg via-nelna-dark-bg/80 to-nelna-dark-bg/40"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/15 px-4 py-1.5 text-sm font-bold text-brand-yellow-300 backdrop-blur-md mb-6">
              <ShieldCheck className="h-4 w-4" />
              <span>World-Class Standards</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-nelna-white mb-6 leading-tight drop-shadow-xl">
              Safety isn't just a protocol.<br />
              It's our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-300 to-nelna-white">Commitment</span>.
            </h1>
            <p className="text-lg md:text-xl text-nelna-white max-w-2xl font-medium leading-relaxed mb-8 drop-shadow-md">
              We go beyond industry standards to ensure every bite is safe, nutritious, and ethically produced for your family.
            </p>
            <div className="flex gap-4">
               <Link to="/contact" className="btn-green rounded-full px-8 py-4 text-base font-bold shadow-lg shadow-brand-green/20 transition hover:brightness-95 hover:scale-[1.02]">
                  Contact Our Team
               </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. The 4 Pillars of Safety */}
      <section className="py-24 px-6 max-w-7xl mx-auto -mt-20 relative z-10">
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {standards.map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-nelna-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-nelna-green-soft group"
             >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                   <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-nelna-dark mb-3 font-display">{item.title}</h3>
                <p className="text-sm text-nelna-dark/80 leading-relaxed">
                  {item.body}
                </p>
             </motion.div>
           ))}
         </div>
      </section>

      {/* 3. Technology & Certifications Split */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
             <SectionHeading 
               eyebrow="Modern Technology" 
               title="Science Meets Agriculture"
               subtitle="We invest in advanced systems to eliminate human error and ensure consistent quality across every harvest."
             />
             <div className="mt-10 grid sm:grid-cols-2 gap-4">
               {technologies.map((tech) => (
                 <div key={tech.name} className="flex items-center gap-4 p-4 rounded-xl bg-nelna-white border border-nelna-green-soft shadow-sm">
                   <div className="p-2 bg-nelna-green-soft rounded-lg text-nelna-dark/90">
                     <tech.icon className="w-5 h-5" />
                   </div>
                   <span className="font-semibold text-nelna-dark">{tech.name}</span>
                 </div>
               ))}
             </div>
           </div>

           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-transparent rounded-[3rem] -rotate-3 transform scale-105 opacity-50"></div>
             <img 
               src={qualityLabImg} 
               alt="Lab Technician" 
              className="relative rounded-[3rem] shadow-2xl w-full object-cover z-10"
              loading="lazy"
             />
             <div className="absolute bottom-8 left-8 right-8 bg-nelna-white/95 backdrop-blur rounded-2xl p-6 shadow-lg z-20 border border-nelna-green-soft">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-2 w-2 rounded-full bg-brand-green animate-pulse"></div>
                  <span className="text-sm font-bold uppercase tracking-wider text-nelna-dark/70">Live Status</span>
                </div>
                <p className="font-display font-bold text-nelna-dark text-lg">
                  "Our labs conduct over 500 quality checks daily before products leave the facility."
                </p>
             </div>
           </div>
        </div>
      </section>

      {/* 4. Certifications Banner */}
      <section className="bg-brand-900 py-20 text-center text-nelna-white overflow-hidden relative">
         {/* Decorative Circles */}
         <div className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 bg-brand-800/20 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>

         <div className="relative max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold mb-6">Our Seals of Assurance</h2>
            <p className="text-brand-100 mb-12 text-lg">
              We are proud to be certified by leading local and international bodies for safety, quality management, and Halal compliance.
            </p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-wrap justify-center gap-8 md:gap-16"
            >
               {certifications.map((cert) => (
                  <div key={cert.id} className="flex flex-col items-center gap-3">
                     <div className="w-20 h-20 bg-nelna-white rounded-full p-1 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <img src={cert.imageUrl} alt={cert.shortName} className="w-full h-full object-contain overflow-hidden rounded-full" />
                     </div>
                     <span className="font-bold text-nelna-white tracking-wide text-sm">{cert.shortName}</span>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>
      
    </div>
  )
}

export default QualitySafety
