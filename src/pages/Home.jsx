import { useCallback, useEffect, useMemo, useState } from 'react'
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
import AchievementStatsBar from '../components/AchievementStatsBar.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductCard from '../components/ProductCard.jsx'
import PartnerStrip from '../components/PartnerStrip.jsx'
import QualitySafetyCards from '../components/QualitySafetyCards.jsx'
import BusinessSupplySection from '../components/BusinessSupplySection.jsx'
import AnimatedCTASection from '../components/AnimatedCTASection.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import NewsCard from '../components/NewsCard.jsx'
import { ErrorState, Skeleton } from '../components/ui/index.js'
import { getProducts } from '../services/productService.js'
import { getNews } from '../services/newsService.js'
import { fallbackProducts } from '../data/products.js'
import { fallbackNews } from '../data/news.js'

import processCardImg1 from '../assets/nelna-gallery-11.jpg'
import processCardImg2 from '../assets/nelna-gallery-12.jpg'
import processCardImg3 from '../assets/nelna-gallery-13.jpg'

import certGMP from '../assets/GMP.jpg'
import certHACCP from '../assets/HACCP.jpg'
import certHalal from '../assets/HALAL.jpg'
import certISO from '../assets/ISO_22000.jpg'

function Home() {
   const [products, setProducts] = useState(fallbackProducts)
   const [news, setNews] = useState(fallbackNews)
   const [productsLoading, setProductsLoading] = useState(true)
   const [newsLoading, setNewsLoading] = useState(true)
   const [productsError, setProductsError] = useState('')
   const [newsError, setNewsError] = useState('')

   const loadProducts = useCallback(async () => {
      setProductsLoading(true)
      setProductsError('')

      try {
         const response = await getProducts()
         if (Array.isArray(response) && response.length) {
            const merged = response.map((item) => {
               const fallback = fallbackProducts.find(
                  (entry) => entry.id === item.id || entry.slug === item.slug
               )
               return {
                  ...fallback,
                  ...item,
                  slug: item.slug || fallback?.slug || item.id,
               }
            })
            setProducts(merged)
         } else {
            setProducts(fallbackProducts)
         }
      } catch (error) {
         console.error('Failed to load products', error)
         setProductsError('Unable to load live products right now. Showing fallback catalog.')
         setProducts(fallbackProducts)
      } finally {
         setProductsLoading(false)
      }
   }, [])

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
      } catch (error) {
         console.error('Failed to load news', error)
         setNewsError('Unable to load latest news right now. Showing recent highlights.')
         setNews(fallbackNews)
      } finally {
         setNewsLoading(false)
      }
   }, [])

   useEffect(() => {
      loadProducts()
   }, [loadProducts])

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
         desc: 'Timely chilled distribution keeps products fresh from processing to retail shelves.',
         image: processCardImg3,
      },
   ]

   const categoryCards = useMemo(() => {
      const sourceProducts = Array.isArray(products) && products.length ? products : fallbackProducts

      const categories = [
         {
            title: 'Chicken Products',
            description: 'Whole birds, cuts, and frozen packs for retail, food service, and wholesale supply.',
            to: '/products?cat=chicken',
            matcher: (product) => {
               const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
               return text.includes('chicken') || text.includes('broiler')
            },
         },
         {
            title: 'Eggs',
            description: 'Fresh, graded eggs handled under controlled quality and hygienic packing standards.',
            to: '/products?cat=egg',
            matcher: (product) => {
               const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
               return text.includes('egg')
            },
         },
         {
            title: 'Fresh Produce',
            description: 'Selected farm produce and seasonal items distributed with quality-first handling.',
            to: '/products?cat=fresh%20produce',
            matcher: (product) => {
               const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
               return text.includes('produce') || text.includes('fresh') || text.includes('vegetable') || text.includes('fruit')
            },
         },
         {
            title: 'Processed & Value-Added',
            description: 'Convenient ready-to-cook and value-added poultry products for modern kitchens.',
            to: '/products?cat=value-added',
            matcher: (product) => {
               const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
               return text.includes('value') || text.includes('processed') || text.includes('ready')
            },
         },
         {
            title: 'Poultry Inputs',
            description: 'Poultry feed and day-old broiler chicks to support reliable farming operations.',
            to: '/products?cat=feed',
            matcher: (product) => {
               const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
               return text.includes('feed') || text.includes('chicks') || text.includes('broiler')
            },
         },
      ]

      return categories.map((item) => {
         const sample = sourceProducts.find(item.matcher)
         return {
            ...item,
            imageUrl: sample?.imageUrl || null,
         }
      })
   }, [products])

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
         description: 'Cold-chain logistics and coordinated dispatch maintain product integrity across Sri Lanka.',
         icon: Truck,
      },
      {
         title: 'Customer Trust',
         description: 'Hotels, retailers, and families trust Nelna for stable quality and responsive support.',
         icon: Users,
      },
      {
         title: 'Company Reputation',
         description: 'Since 1998, Nelna has built a reputation for reliability, accountability, and long-term value.',
         icon: Award,
      },
   ]

   return (
      <div className="bg-white">
         {/* 1. Hero + Achievement Counter */}
         <section className="hero-home relative -mt-header-offset">
            <HeroSlider />
            <AchievementStatsBar />
         </section>

         {/* 2. Product Categories */}
         <ScrollReveal as="section" className="section-spacing section-white">
            <div className="page-shell">
               <SectionHeading
                  eyebrow="Product Portfolio"
                  title="Professional Product Categories for Every Business Need"
                  subtitle="Explore Nelna Farm categories built for retail shelves, food service kitchens, and distribution networks across Sri Lanka."
                  align="left"
                  eyebrowClassName="text-brand-green-800"
                  titleClassName="text-slate-950"
                  subtitleClassName="text-slate-800 md:text-[1.03rem] leading-relaxed font-medium"
               />

               <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                  {categoryCards.map((item) => (
                     <article key={item.title} className="surface-card surface-card-hover overflow-hidden">
                        <div className="relative h-40 w-full overflow-hidden bg-slate-50 group">
                           {item.imageUrl ? (
                              <img
                                 src={item.imageUrl}
                                 alt={`${item.title} by Nelna Farm`}
                                 loading="lazy"
                                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                           ) : (
                              <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100">
                                 <span className="scale-[3] -rotate-12 transform font-display text-4xl font-bold text-brand-300 opacity-20">Nelna</span>
                              </div>
                           )}
                        </div>
                        <div className="space-y-3 p-5">
                           <h2 className="text-lg font-display font-bold text-slate-900">{item.title}</h2>
                           <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                           <Link to={item.to} className="btn-link">
                              View Category
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                           </Link>
                        </div>
                     </article>
                  ))}
               </div>
            </div>
         </ScrollReveal>

         {/* 3. Featured Products */}
         <ScrollReveal as="section" className="section-spacing section-light">
            <div className="page-shell">
               <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                  <div className="max-w-2xl">
                     <SectionHeading
                        eyebrow="Featured Range"
                        title="Premium Poultry and Frozen Food Selection"
                        subtitle="Explore frozen chicken products, value-added cuts, and trusted nutrition for homes, retailers, and HORECA operations."
                        align="left"
                        eyebrowClassName="text-brand-green-800"
                        titleClassName="text-slate-950"
                        subtitleClassName="text-slate-800 md:text-[1.04rem] leading-relaxed font-medium"
                     />
                  </div>
                  <Link to="/products" className="btn-primary hidden gap-2 md:inline-flex">
                     View All Products
                     <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
               </div>

               <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {productsLoading ? (
                     Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={`product-skeleton-${index}`} className="h-[420px] rounded-3xl" />
                     ))
                  ) : (
                     products.slice(0, 3).map((product, idx) => (
                        <ProductCard key={product.id} product={product} featured={idx === 1} />
                     ))
                  )}
               </div>

               {!productsLoading && productsError ? (
                  <div className="mt-6">
                     <ErrorState
                        title="Live catalog temporarily unavailable"
                        description={productsError}
                        retryLabel="Retry products"
                        onRetry={loadProducts}
                     />
                  </div>
               ) : null}

               {!productsLoading ? (
                  <div className="mt-8 text-center md:hidden">
                     <Link to="/products" className="btn-link justify-center">
                        View Full Catalog
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                     </Link>
                  </div>
               ) : null}
            </div>
         </ScrollReveal>

         {/* 4. Quality & Safety */}
         <QualitySafetyCards />

         {/* 5. Farm-to-Kitchen Process */}
         <section className="section-spacing relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-brand-50/70" aria-hidden="true" />

            <div className="page-shell">
               <div className="mx-auto mb-12 max-w-3xl text-center">
                  <SectionHeading
                     eyebrow="Our Process"
                     title="From Farm to Kitchen with Disciplined Operations"
                     subtitle="Beyond products, we deliver quality assurance and accountable service that protect your brand and your customers."
                     align="center"
                     center
                     eyebrowClassName="text-brand-green-800"
                     titleClassName="text-slate-950"
                     subtitleClassName="text-slate-700"
                  />
               </div>

               <div className="grid gap-8 md:grid-cols-3">
                  {processCards.map((item, idx) => (
                     <motion.article
                        key={idx}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card"
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
                           <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                           <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.desc}</p>
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
         </section>

         {/* 6. Business / HORECA */}
         <BusinessSupplySection />

         {/* 7. Why Choose Nelna */}
         <section className="section-spacing bg-slate-50">
            <div className="page-shell">
               <SectionHeading
                  eyebrow="Why Choose Nelna"
                  title="A Production System Designed for Reliability"
                  subtitle="Our end-to-end process supports consistent quality, safe food handling, and dependable commercial supply."
                  align="left"
                  eyebrowClassName="text-brand-green-800"
                  titleClassName="text-slate-950"
                  subtitleClassName="text-slate-800 md:text-[1.03rem] leading-relaxed font-medium"
               />

               <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {trustPillars.map((item) => (
                     <article key={item.title} className="surface-card surface-card-hover p-6">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
                           <item.icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-xl font-display font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
                     </article>
                  ))}
               </div>
            </div>
         </section>

         {/* Certification strip */}
         <section className="bg-brand-green-950 py-14 text-white" aria-label="Certifications">
            <div className="page-shell flex flex-wrap items-center justify-center gap-8 md:gap-14">
               {[
                  { label: 'ISO 22000 Certified', img: certISO },
                  { label: 'GMP Standards', img: certGMP },
                  { label: 'HACCP Approved', img: certHACCP },
                  { label: 'Halal Certified', img: certHalal },
               ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3">
                     <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-1">
                        <img src={badge.img} alt={badge.label} className="h-full w-full object-contain" />
                     </div>
                     <span className="font-display text-base font-bold text-brand-green-50 md:text-lg">{badge.label}</span>
                  </div>
               ))}
            </div>
         </section>

         <PartnerStrip />

         {/* 8. Testimonials */}
         <section className="section-spacing bg-brand-50/70">
            <div className="page-shell max-w-4xl text-center">
               <SectionHeading
                  title="Trusted by Culinary and Retail Professionals"
                  subtitle="From hotel kitchens to modern supermarkets, businesses rely on Nelna Farm for consistent quality and dependable supply."
                  align="center"
                  center
                  titleClassName="!text-slate-900"
                  subtitleClassName="!text-slate-700"
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

         {/* 9. Distributor opportunity */}
         <section id="distributor-opportunity" className="bg-brand-green-950 py-16 text-white">
            <div className="page-shell">
               <div className="grid gap-8 rounded-3xl border border-white/20 bg-white/5 p-8 md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-10">
                  <div>
                     <p className="inline-flex rounded-pill border border-brand-yellow-200/70 bg-brand-yellow-400/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-yellow-100">
                        Distributor and Dealer Network
                     </p>
                     <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
                        Become a Nelna Farm Distributor
                     </h2>
                     <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-brand-green-50 md:text-base">
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

         {/* 10. Latest News */}
         <section className="section-spacing bg-slate-50">
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

         {/* 11. Final CTA */}
         <AnimatedCTASection
            title="Ready to Work with a Trusted Food and Poultry Partner?"
            body="Talk to our team for product supply, distributor opportunities, and reliable delivery support tailored to your business needs."
            primary={{ href: '/products#bulk-order', label: 'Order Now' }}
            secondary={{ href: '/contact', label: 'Contact Sales' }}
         />
      </div>
   )
}

export default Home
