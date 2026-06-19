import { Link } from 'react-router-dom'
import {
   ShieldCheck,
   Leaf,
   Award,
   CheckCircle2,
   ArrowRight,
   Truck,
   Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSlider from '../components/HeroSlider.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PartnerStrip from '../components/PartnerStrip.jsx'
import QualitySafetyCards from '../components/QualitySafetyCards.jsx'
import BusinessSupplySection from '../components/BusinessSupplySection.jsx'
import AnimatedCTASection from '../components/AnimatedCTASection.jsx'
import BrandChickenMascot from '../components/BrandChickenMascot.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import { certifications } from '../data/certifications.js'

import processCardImg1 from '../assets/nelna-gallery-11.jpg'
import processCardImg2 from '../assets/26_LE_upscale_ultra_x2_strength_75_similarity_50.jpg'
import processCardImg3 from '../assets/nelna-gallery-13.jpg'

function Home() {
   const processCards = [
      {
         title: 'Bio-secure Farms',
         desc: 'Healthy poultry raised under controlled farm biosecurity and veterinary oversight.',
         image: processCardImg1,
      },
      {
         title: 'Modern Processing and Hygiene',
         desc: 'Certified facilities ensure food safety, consistency, and strict process control.',
         image: processCardImg2,
      },
      {
         title: 'Reliable Cold-chain Distribution',
         desc: 'Timely chilled distribution keeps supply fresh from processing to retail shelves.',
         image: processCardImg3,
      },
   ]

   const trustPillars = [
      {
         title: 'Farm Freshness',
         description: 'Controlled farm environments and monitored feed programs deliver consistent freshness.',
         icon: Leaf,
      },
      {
         title: 'Hygiene and Safety',
         description: 'Processing and handling follow ISO 22000, HACCP, GMP, and Halal-aligned practices.',
         icon: ShieldCheck,
      },
      {
         title: 'Quality Control',
         description: 'Every batch goes through checks for taste, consistency, and food safety compliance.',
         icon: CheckCircle2,
      },
      {
         title: 'Reliable Distribution',
         description: 'Cold-chain logistics and coordinated dispatch maintain integrity across Sri Lanka.',
         icon: Truck,
      },
      {
         title: 'Customer Trust',
         description: 'Hotels, retailers, and families trust Nelna for stable quality and responsive support.',
         icon: Users,
      },
      {
         title: 'Company Reputation',
         description: 'Since 1996, Nelna has built a reputation for reliability, accountability, and long-term value.',
         icon: Award,
      },
   ]

   return (
      <div className="bg-nelna-white">
         {/* 1. Hero + Achievement Counter */}
         <section className="hero-home relative -mt-header-offset">
            <h1 className="sr-only">Nelna Farm — Premium Poultry and Fresh Produce in Sri Lanka</h1>
            <HeroSlider />
         </section>

         {/* 2. Quality & Safety */}
         <QualitySafetyCards />

         {/* 3. Farm-to-Kitchen Process */}
         <ScrollReveal as="section" className="section-spacing relative overflow-hidden bg-nelna-white">
            <div className="page-shell relative z-10">
               <div className="mx-auto mb-12 max-w-3xl text-center">
                  <SectionHeading
                     eyebrow="Our Process"
                     title="From Farm to Table with Disciplined Operations"
                     subtitle="We deliver quality assurance and accountable service that protect your brand and your customers."
                     align="center"
                     center
                     eyebrowClassName="text-brand-green-800"
                     titleClassName="text-nelna-dark"
                     subtitleClassName="text-nelna-dark/90"
                  />
               </div>

               <div className="grid gap-8 md:grid-cols-3">
                  {processCards.map((item, idx) => (
                     <motion.article
                        key={idx}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="group overflow-hidden rounded-3xl border border-nelna-dark-soft bg-nelna-white shadow-card"
                     >
                        <div className="h-48 overflow-hidden">
                           <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                           />
                        </div>
                        <div className="p-6">
                           <h3 className="text-xl font-bold text-nelna-dark">{item.title}</h3>
                           <p className="mt-3 text-sm leading-relaxed text-nelna-dark/90">{item.desc}</p>
                        </div>
                     </motion.article>
                  ))}
               </div>

               <div className="mt-8 text-center">
                  <Link to="/process" className="btn-outline gap-2 px-6">
                     View Full Process
                     <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
               </div>
            </div>
         </ScrollReveal>

         {/* 4. Business / HORECA */}
         <BusinessSupplySection />

         {/* 5. Why Choose Nelna */}
         <section className="section-spacing section-nelna-light relative overflow-hidden">
            <BrandChickenMascot
               size="sm"
               variant="float"
               className="pointer-events-none absolute right-4 top-8 z-0 hidden opacity-80 md:block lg:right-10"
            />
            <div className="page-shell relative z-10">
               <SectionHeading
                  eyebrow="Why Choose Nelna"
                  title="A Production System Designed for Reliability"
                  subtitle="Our end-to-end process supports consistent quality, safe food handling, and dependable commercial supply."
                  align="left"
                  eyebrowClassName="text-brand-green-800"
                  titleClassName="text-nelna-dark"
                  subtitleClassName="text-nelna-dark md:text-[1.03rem] leading-relaxed font-medium"
               />

               <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {trustPillars.map((item) => (
                     <article key={item.title} className="surface-card surface-card-hover p-6">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
                           <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-xl font-display font-bold text-nelna-dark">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-nelna-dark/90">{item.description}</p>
                     </article>
                  ))}
               </div>
            </div>
         </section>

         {/* Certification Trust Panel */}
         <section className="cert-trust-section" aria-labelledby="cert-trust-heading">
            <div className="page-shell">
               <div className="cert-trust-section__header">
                  <h2 id="cert-trust-heading" className="cert-trust-section__title">
                     Certified Quality You Can Trust
                  </h2>
                  <p className="cert-trust-section__subtitle">
                     Recognized food safety, quality, and compliance standards behind every Nelna product.
                  </p>
               </div>

               <div className="cert-trust-panel">
                  <ul className="cert-trust-panel__grid">
                     {certifications.map((cert) => (
                        <li key={cert.id} className="cert-trust-panel__item">
                           <div className="cert-trust-panel__logo">
                              <img
                                 src={cert.imageUrl}
                                 alt={cert.shortName}
                                 className="cert-trust-panel__logo-img"
                                 loading="lazy"
                                 decoding="async"
                              />
                           </div>
                           <span className="cert-trust-panel__label">{cert.shortName}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </section>

         <PartnerStrip />

         {/* 6. Testimonials */}
         <section className="section-spacing bg-nelna-white/80">
            <div className="page-shell max-w-4xl text-center">
               <SectionHeading
                  title="Trusted by Culinary and Retail Professionals"
                  subtitle="From hotel kitchens  to modern supermarkets, businesses rely on Nelna Farm for consistent quality and dependable supply. Our stringent controls on quality, our personal touch and dependability are what have made Nelna a go-to the brand in the marketplace."
                  align="center"
                  center
                  titleClassName="!text-nelna-dark"
                  subtitleClassName="!text-nelna-dark/90"
               />
               <div className="mt-10">
               <TestimonialCarousel
   items={[
      {
         quote:
            "Nelna's consistency is unmatched. I can rely on them for every banquet and every service.",
      },
      {
         quote:
            'Our customers immediately noticed the difference in tenderness when we switched to Nelna.',
      },
      {
         quote:
            'As an exporter, I need guarantees on safety standards. Nelna delivers every single time.',
      },
      {
         quote:
            'Nelna products give us the confidence to serve fresh and reliable meals every day.',
      },
      {
         quote:
            'The quality, hygiene, and delivery standards have made Nelna a trusted partner for our business.',
      },
      {
         quote:
            'We choose Nelna because their products are consistent, fresh, and easy to work with.',
      },
      {
         quote:
            'From packaging to taste, Nelna maintains a standard that our customers can trust.',
      },
      {
         quote:
            'Nelna has helped us maintain better food quality while keeping our operations smooth and dependable.',
      },
   ]}
/>
               </div>
            </div>
         </section>

         {/* 7. Distributor opportunity */}
         <section id="distributor-opportunity" className="site-cta-band site-cta-band--distributor">
            <div className="site-cta-band__shell">
               <div className="site-cta-band__content">
                  <p className="site-cta-band__eyebrow">Distributor and Dealer Network</p>
                  <h2 className="site-cta-band__title">Become a Nelna Farm Distributor</h2>
                  <p className="site-cta-band__body">
                     Partner with Nelna Farm to access stable supply, category support, and a recognized brand trusted by customers across Sri Lanka.
                  </p>
               </div>
               <div className="site-cta-band__actions">
                  <Link to="/contact#distributor-partnership" className="btn-yellow w-full justify-center sm:w-auto md:min-w-[200px]">
                     Become a Distributor
                  </Link>
                  <Link to="/contact" className="btn-secondary w-full justify-center sm:w-auto md:min-w-[200px]">
                     Contact Sales Team
                  </Link>
               </div>
            </div>
         </section>

         {/* 8. Final CTA */}
         <AnimatedCTASection
            title="Ready to Work with a Trusted Food and Poultry Partner?"
            body="Talk to our team for supply inquiries, distributor opportunities, and reliable delivery support tailored to your business needs."
            primary={{ href: '/contact', label: 'Contact Sales' }}
            secondary={{ href: '/about', label: 'About Nelna' }}
         />
      </div>
   )
}

export default Home
