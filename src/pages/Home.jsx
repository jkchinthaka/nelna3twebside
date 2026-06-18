import { useCallback, useEffect, useState } from 'react'
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
import NewsCard from '../components/NewsCard.jsx'
import { ErrorState, Skeleton } from '../components/ui/index.js'
import { getNews } from '../services/newsService.js'
import { fallbackNews } from '../data/news.js'

import processCardImg1 from '../assets/nelna-gallery-11.jpg'
import processCardImg2 from '../assets/nelna-gallery-12.jpg'
import processCardImg3 from '../assets/nelna-gallery-13.jpg'

import certGMP from '../assets/GMP.jpg'
import certHACCP from '../assets/HACCP.jpg'
import certHalal from '../assets/HALAL.jpg'
import certISO from '../assets/ISO_22000.jpg'

function Home() {
   const [news, setNews] = useState(fallbackNews)
   const [newsLoading, setNewsLoading] = useState(true)
   const [newsError, setNewsError] = useState('')

   const loadNews = useCallback(async () => {
      setNewsLoading(true)
      setNewsError('')

      try {
         const response = await getNews()
         if (Array.isArray(response) && response.length) {
            setNews(response)
         } else {
            setNews(fallbackNews)
         }
      } catch {
         setNewsError('Unable to load latest news right now. Showing recent highlights.')
         setNews(fallbackNews)
      } finally {
         setNewsLoading(false)
      }
   }, [])

   useEffect(() => {
      loadNews()
   }, [loadNews])

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
            <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-brand-50/70" aria-hidden="true" />
            <BrandChickenMascot
               size="xl"
               variant="float"
               animate
               className="pointer-events-none absolute -right-4 bottom-8 z-0 hidden opacity-90 lg:block xl:right-8"
            />

            <div className="page-shell relative z-10">
               <div className="mx-auto mb-12 max-w-3xl text-center">
                  <SectionHeading
                     eyebrow="Our Process"
                     title="From Farm to Kitchen with Disciplined Operations"
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

         {/* Certification strip */}
         <section className="certification-strip py-14" aria-label="Certifications">
            <div className="page-shell flex flex-wrap items-center justify-center gap-8 md:gap-14">
               {[
                  { label: 'ISO 22000 Certified', img: certISO },
                  { label: 'GMP Standards', img: certGMP },
                  { label: 'HACCP Approved', img: certHACCP },
                  { label: 'Halal Certified', img: certHalal },
               ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3">
                     <div className="certification-strip__logo h-12 w-12 overflow-hidden rounded-full bg-nelna-white p-1">
                        <img src={badge.img} alt={badge.label} className="h-full w-full object-contain" />
                     </div>
                     <span className="font-display text-base font-bold text-nelna-white md:text-lg">{badge.label}</span>
                  </div>
               ))}
            </div>
         </section>

         <PartnerStrip />

         {/* 6. Testimonials */}
         <section className="section-spacing bg-nelna-white/80">
            <div className="page-shell max-w-4xl text-center">
               <SectionHeading
                  title="Trusted by Culinary and Retail Professionals"
                  subtitle="From hotel kitchens to modern supermarkets, businesses rely on Nelna Farm for consistent quality and dependable supply."
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
                           name: 'Chef Anura Perera',
                           role: 'Executive Chef, Colombo Hotel Group',
                        },
                        {
                           quote: 'Our customers immediately noticed the difference in tenderness when we switched to Nelna.',
                           name: 'Mrs. Shalini Dias',
                           role: 'Owner, FreshMart Supermarkets',
                        },
                        {
                           quote: 'As an exporter, I need guarantees on safety standards. Nelna delivers every single time.',
                           name: 'Imran Kareem',
                           role: 'Director, Lanka Foods Export',
                        },
                     ]}
                  />
               </div>
            </div>
         </section>

         {/* 7. Distributor opportunity */}
         <section id="distributor-opportunity" className="surface-brand-green py-16">
            <div className="page-shell">
               <div className="grid gap-8 rounded-3xl border border-nelna-white/20 bg-nelna-white/5 p-8 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-10">
                  <div>
                     <p className="inline-flex rounded-pill border border-nelna-gold/40 bg-nelna-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-nelna-gold">
                        Distributor and Dealer Network
                     </p>
                     <h2 className="mt-4 font-display text-3xl font-bold text-nelna-white md:text-4xl">
                        Become a Nelna Farm Distributor
                     </h2>
                     <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-nelna-white/90 md:text-base">
                        Partner with Nelna Farm to access stable supply, category support, and a recognized brand trusted by customers across Sri Lanka.
                     </p>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                     <Link to="/contact#distributor-partnership" className="btn-yellow w-full justify-center md:w-auto md:min-w-[220px]">
                        Become a Distributor
                     </Link>
                     <Link to="/contact" className="btn-secondary w-full justify-center md:w-auto md:min-w-[220px]">
                        Contact Sales Team
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* 8. Latest News */}
         <section className="section-spacing section-nelna-cream">
            <div className="page-shell">
               <SectionHeading
                  eyebrow="Community & Updates"
                  title="Life at Nelna Farm"
                  subtitle="Stay connected with our latest initiatives, recipes, and farm updates."
                  align="left"
               />
               <div className="mt-10 grid gap-8 md:grid-cols-3">
                  {newsLoading ? (
                     Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={`news-skeleton-${index}`} className="h-[360px] rounded-3xl" />
                     ))
                  ) : (
                     news.slice(0, 3).map((article) => (
                        <NewsCard key={article.id} article={article} />
                     ))
                  )}
               </div>

               {!newsLoading && newsError ? (
                  <div className="mt-6">
                     <ErrorState
                        title="News feed temporarily unavailable"
                        description={newsError}
                        retryLabel="Retry news"
                        onRetry={loadNews}
                     />
                  </div>
               ) : null}
            </div>
         </section>

         {/* 9. Final CTA */}
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
