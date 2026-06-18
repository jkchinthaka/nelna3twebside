
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Leaf, 
  Users, 
  Award, 
  CheckCircle, 
  Sprout, 
  HeartHandshake,
  TrendingUp,
  Globe,
  Factory,
  Briefcase,
  History,
  Building
} from 'lucide-react'

import BrandChickenMascot from '../components/BrandChickenMascot.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CertificationBadge from '../components/CertificationBadge.jsx'
import StatsGrid from '../components/StatsGrid.jsx'
import { Link } from 'react-router-dom'

import aboutHeroImg from '../assets/nelna-gallery-14.jpg'
// import aboutStoryImg from '../assets/nelna-gallery-15.jpg'
import aboutCtaImg from '../assets/nelna-gallery-16.jpg'
import chairmanImg from '../assets/chairman.png'

import certGMP from '../assets/GMP.jpg'
import certHACCP from '../assets/HACCP.jpg'
import certHalal from '../assets/HALAL.jpg'
import certISO from '../assets/ISO_22000.jpg'
import certOrganic from '../assets/organic.jpg'

// Values Data
const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Safety",
    desc: "Our rigorous biosecurity measures and cold-chain logistics ensure every product reaches you in perfect condition."
  },
  {
    icon: Sprout,
    title: "Sustainable Farming",
    desc: "We respect nature. Our eco-friendly practices minimize waste and promote biodiversity across our mango groves and farms."
  },
  {
    icon: HeartHandshake,
    title: "Community First",
    desc: "Empowering local farmers and uplifting our workforce is at the heart of everything we do."
  }
];

// Timeline Data
const timelineData = [
  { year: "1995", title: "Commenced Operations", description: "Commenced Buy Back arrangement and buying and Selling of live weight small scale." },
  { year: "1997", title: "First Partnership", description: "Established a partnership to carry out chicken processing under C.N.K Holdings." },
  { year: "1998", title: "Nelna Broiler Farm", description: "Partnership dissolved. New partnership established under the name Nelna Broiler Farm." },
  { year: "1998", title: "Expansion", description: "Incorporated Nelna Distributors (Pvt.) Limited and Nelna Live Stock (Pvt.) Limited." },
  { year: "2004", title: "Market Leader", description: "Nelna Group become one of the leading chicken processing and Distributors in Sri Lanka." },
  { year: "2004", title: "Nelna Farm (Pvt) Ltd", description: "Amalgamated Nelna Broiler Farm and Nelna Distributors under the name Nelna Farm (Pvt) Ltd." },
  { year: "BOI", title: "Nelna Breeders", description: "Incorporated Nelna Breeders (Pvt) Ltd. (Approved BOI Company Under Section 17 of BOI Act)" },
  { year: "2009", title: "Agri Developments", description: "Incorporated Nelna Agri Developments (Pvt) Ltd." },
  { year: "2012", title: "Nelna Impex", description: "Incorporated Nelna Impex (Pvt) Ltd." },
];

import { entities } from '../data/businessEntities.js'

function About() {
  // const { t } = useTranslation()

  return (
    <div className="w-full overflow-hidden bg-nelna-white">
      
      {/* 1. Page Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-brand-950">
        <div className="absolute inset-0 opacity-40">
           <img 
            src={aboutHeroImg} 
            alt="Farm Landscape" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/40 to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-gold-400 border border-gold-400/30 rounded-full backdrop-blur-sm bg-nelna-dark/20">
              Est. 1997
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-nelna-white mb-6 drop-shadow-lg">
              Cultivating <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-gold-400">Trust</span>,<br />
              Delivering <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-gold-400">Excellence</span>.
            </h1>
            <p className="text-lg text-nelna-white/90 max-w-2xl font-light leading-relaxed">
              Leading the way in ethical poultry production and premium agriculture in Sri Lanka.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Chairman's Story Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative"
           >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 aspect-[3/4] max-h-[600px] w-full mx-auto bg-nelna-gold-soft">
                 <img 
                    src={chairmanImg} 
                    alt="Emil Stanley - Chairman" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                 />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-50 rounded-full -z-0"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-gold-100/50 rounded-full -z-0"></div>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <h2 className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2">Chairman's Message</h2>
             <h3 className="text-3xl md:text-4xl font-display font-bold text-nelna-dark mb-6 leading-tight">
               Guided by Purpose, <span className="text-brand-600">Driven by Quality</span>
             </h3>
             <div className="space-y-4 text-nelna-dark/80 leading-relaxed text-base text-justify">
               <p>
                 At Nelna Farm, our journey has always been guided by a single purpose — to deliver safe, high-quality poultry products while earning the trust of every Sri Lankan family we serve.
               </p>
               <p>
                 From our humble beginnings to becoming a respected name in the poultry industry, our growth has been driven by strong values, dedicated out-growers, committed employees, and long-term partnerships built on integrity and transparency. Today, with the support of over 800 out-growers and a passionate workforce, Nelna Farm continues to contribute meaningfully to national food security and rural economic development.
               </p>
               <p>
                 Quality, sustainability, and innovation remain at the heart of everything we do. We adhere to strict bio-security standards, modern processing practices, and ethical farming methods to ensure that every product leaving our facilities meets the highest standards of safety and nutrition.
               </p>
               <p>
                 As we move forward, we are focused on embracing technology, strengthening sustainable practices, and expanding our product offerings to meet the evolving needs of our customers. Our vision is not only to grow as a business, but to grow responsibly — creating value for our customers, partners, employees, and the nation.
               </p>
               <p>
                 I extend my sincere gratitude to our customers for their continued trust, to our partners for their collaboration, and to our Nelna family for their unwavering dedication. Together, we will continue to build a stronger, healthier, and more sustainable future.
               </p>
             </div>
             
             <div className="mt-8 flex flex-col items-start gap-1">
                <h4 className="text-xl font-display font-bold text-nelna-dark">Chairman</h4>
                <div className="text-sm font-bold uppercase tracking-wider text-brand-600">Nelna Group of Companies</div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* 2.5 Business Background & Timeline */}
      <section className="py-24 bg-nelna-green-soft relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-nelna-white to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionHeading 
            eyebrow="Our History" 
            title="Business Background" 
            subtitle="Nelna is a brand that has won the hearts of many due to its consistency in delivering best protein products in Sri Lanka."
            center={true}
          />
          
          {/* Redesigned Business Background Section */}
          <div className="mt-16 mb-24">
             {/* Highlight Card */}
             <div className="bg-nelna-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-nelna-green-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
                <BrandChickenMascot
                  size="lg"
                  variant="float"
                  animate
                  className="pointer-events-none absolute -bottom-6 -right-4 z-0 hidden opacity-90 md:block lg:-right-2 lg:bottom-0"
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                   <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-6">
                         <History className="w-4 h-4" /> 
                         <span>Since 1998</span>
                      </div>
                      <h3 className="text-3xl font-display font-bold text-nelna-dark mb-6">
                         A Visionary Journey
                      </h3>
                      <p className="text-nelna-dark/80 leading-relaxed mb-6 text-lg">
                         Since the establishment of Nelna as a sole-proprietorship in 1998, its growth has been very predictable, due to the great entrepreneurial mind of <span className="text-brand-700 font-bold">Mr. W. G. E. G. Nanayakkara</span> (Managing Director).
                      </p>
                      <p className="text-nelna-dark/80 leading-relaxed">
                         His timely input and ability to perfectly execute his thoughts to action, has outspread the group's operations into diversified business sectors such as <span className="font-medium text-nelna-dark">ready-to-eat processed food products, chicken meat products, maize cultivation, fruit cultivation, organic fertilizer, and disease-free day-old chicks.</span>
                      </p>
                   </div>

                   <div className="bg-nelna-green-soft rounded-3xl p-8 border border-nelna-green-soft">
                      <h4 className="font-bold text-brand-800 mb-6 flex items-center gap-2">
                         <TrendingUp className="w-5 h-5"/> The Nelna Promise
                      </h4>
                      <div className="space-y-6">
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-nelna-white rounded-xl shadow-sm flex items-center justify-center text-brand-500">
                               <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                               <h5 className="font-bold text-nelna-dark">Uncompromising Authenticity</h5>
                               <p className="text-sm text-nelna-dark/80 mt-1 leading-relaxed">
                                  Nelna Group maintains strict authenticity by having inter-related strategic business units operating under one umbrella.
                               </p>
                            </div>
                         </div>
                         <div className="w-full h-px bg-nelna-gold-soft/60"></div>
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-nelna-white rounded-xl shadow-sm flex items-center justify-center text-gold-500">
                               <Factory className="w-6 h-6" />
                            </div>
                            <div>
                               <h5 className="font-bold text-nelna-dark">Self-Sufficient Ecosystem</h5>
                               <p className="text-sm text-nelna-dark/80 mt-1 leading-relaxed">
                                  We operate independently without outsourcing, ensuring total quality control from farm to table.
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative">
             {/* Timeline Line */}
             <div className="absolute left-1 md:left-1/2 -ml-0.5 w-0.5 h-full bg-nelna-gold-soft"></div>
             
             <div className="space-y-12 pl-8 md:pl-0">
               {timelineData.map((item, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.5, delay: idx * 0.1 }}
                   className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                     idx % 2 === 0 ? "md:flex-row-reverse" : ""
                   }`}
                 >
                   <div className="w-full md:w-5/12"></div>
                   <div className="absolute left-1 md:left-1/2 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 -ml-4 md:-ml-6 bg-nelna-white rounded-full border-4 border-brand-100 ring-4 ring-nelna-white z-10 shadow-lg">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-brand-500 rounded-full"></div>
                   </div>
                   <div className={`w-full md:w-5/12 bg-nelna-white p-8 rounded-2xl shadow-xl border border-nelna-green-soft hover:shadow-2xl transition-all duration-300 relative group`}>
                      <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 text-sm font-bold rounded-full mb-3">
                        {item.year || "Milestone"}
                      </span>
                      <h3 className="text-xl font-bold text-nelna-dark mb-2 font-display group-hover:text-brand-600 transition-colors">{item.title}</h3>
                      <p className="text-nelna-dark/80">{item.description}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 2.6 Business Entities */}
      <section className="py-24 bg-nelna-white relative">
         <div className="absolute inset-0 bg-nelna-green-soft/50 skew-y-1 transform origin-top-left -z-10"></div>
         <div className="max-w-7xl mx-auto px-6">
            <SectionHeading 
               eyebrow="Our Structure"
               title="Business Entities in Nelna Group"
               subtitle="Nelna Group of Companies consist of four legal entities which are independently operating in different Business disciplines."
               center={true}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
               {entities.map((entity, idx) => (
                  <motion.div
                    key={entity.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="group bg-nelna-white rounded-3xl p-6 border border-nelna-green-soft shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                  >
                     <div className={`w-14 h-14 ${entity.color} rounded-2xl flex items-center justify-center text-nelna-white mb-6 shadow-lg shadow-card group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <entity.icon className="w-7 h-7" />
                     </div>
                     <h3 className="text-lg font-bold text-nelna-dark mb-3 flex-grow">
                        {entity.name}
                     </h3>
                     <p className="text-sm text-nelna-dark/70 mb-8">
                        {entity.shortDesc}
                     </p>
                     
                     <div className="mt-auto">
                      <Link
                       to={`/about/entity/${entity.id}`}
                       className="w-full py-3 px-4 bg-nelna-green-soft border border-nelna-dark-soft text-nelna-dark/90 font-semibold rounded-xl hover:bg-brand-600 hover:text-nelna-white hover:border-brand-600 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn"
                      >
                        Visit Entity
                        <TrendingUp className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. Values / Trust Pillars */}
      <section className="py-24 bg-brand-950 relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>
         
         <div className="relative max-w-7xl mx-auto px-6 z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-900/50 border border-brand-700 text-brand-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
                Our Promise
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-nelna-white mb-6">Why Customers Choose Us</h2>
              <p className="text-brand-100 text-lg font-light leading-relaxed">
                We believe that true quality comes from a harmony of nature, science, and integrity. Here is how we differ from the rest.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="group relative bg-brand-900/40 backdrop-blur-md border border-brand-700/50 p-8 rounded-[2rem] hover:bg-brand-900/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-900/50"
                >
                   {/* Icon Glow */}
                   <div className="absolute top-8 left-8 w-16 h-16 bg-brand-400/20 rounded-full blur-xl group-hover:bg-brand-400/30 transition-colors"></div>
                   
                   <div className="relative w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center mb-8 text-nelna-white shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-300 ring-4 ring-brand-900/50">
                     <item.icon className="w-8 h-8" />
                   </div>
                   
                   <h3 className="text-2xl font-bold mb-4 font-display text-nelna-white group-hover:text-brand-200 transition-colors">{item.title}</h3>
                   <p className="text-brand-100 leading-relaxed group-hover:text-brand-100 transition-colors">
                     {item.desc}
                   </p>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* 4. Stats Section */}
      <section className="bg-brand-50 py-16">
        <StatsGrid />
      </section>

      {/* 5. Certifications */}
      <section className="py-24 relative overflow-hidden">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-nelna-green-soft/50 -skew-y-1 transform origin-top-right z-0"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
           <SectionHeading 
             eyebrow="Compliance & Quality" 
             title="Certified Excellence" 
             subtitle="We meet and exceed international standards for food safety and environmental management."
             center={true}
           />
           
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: {
                   staggerChildren: 0.1
                 }
               }
             }}
             className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
           >
              {[
                { img: certISO, label: "ISO 22000", desc: "Food Safety", shadow: "shadow-nelna-dark/10" },
                { img: certHACCP, label: "HACCP", desc: "Hazard Analysis", shadow: "shadow-brand-green-200" },
                { img: certGMP, label: "GMP", desc: "Good Manufacturing", shadow: "shadow-nelna-gold/20" },
                { img: certHalal, label: "Halal", desc: "Standard Certified", shadow: "shadow-brand-green-200" },
                { img: certOrganic, label: "Organic", desc: "Eco Practices", shadow: "shadow-nelna-green/20" },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                  className="bg-nelna-white rounded-2xl p-6 shadow-sm border border-nelna-green-soft flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group cursor-default"
                >
                   <div className={`w-24 h-24 mb-6 rounded-full overflow-hidden flex items-center justify-center p-1 bg-nelna-white shadow-lg ${cert.shadow} group-hover:scale-105 transition-transform duration-500`}>
                      <img src={cert.img} alt={cert.label} className="w-full h-full object-contain" />
                   </div>
                   <h3 className="font-bold text-nelna-dark mb-1">{cert.label}</h3>
                   <span className="text-xs text-nelna-dark/70 font-medium uppercase tracking-wider">{cert.desc}</span>
                </motion.div>
              ))}
           </motion.div>
         </div>
      </section>

      {/* 6. CTA / Bottom Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative min-h-[400px] flex items-center px-6 md:px-20 py-16 shadow-2xl">
           <img 
             src={aboutCtaImg} 
             alt="Fresh Harvest"
             className="absolute inset-0 w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-nelna-dark-bg/90 via-nelna-dark-bg/50 to-transparent"></div>
           
           <div className="relative z-10 max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-nelna-white mb-6">
               Experience the Nelna Difference Today
             </h2>
             <p className="text-xl text-nelna-white/90 mb-10 font-light">
               Join thousands of satisfied families and businesses who trust us for their daily nutrition.
             </p>
             <div className="flex flex-wrap gap-4">
               <Link to="/contact" className="px-8 py-4 bg-brand-500 hover:bg-brand-400 text-nelna-white font-bold rounded-full transition-all shadow-lg hover:shadow-brand-500/30 flex items-center gap-2">
                 Contact Sales
               </Link>
               <Link to="/contact" className="px-8 py-4 bg-nelna-white text-brand-900 font-bold rounded-full transition-all hover:bg-nelna-green-soft flex items-center gap-2">
                 Get in Touch
               </Link>
             </div>
           </div>
        </div>
      </section>

    </div>
  )
}

export default About
