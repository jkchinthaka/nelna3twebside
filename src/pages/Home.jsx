import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
   ShieldCheck,
   Leaf,
   Award,
   Clock,
   CheckCircle2,
   ArrowRight,
   Star,
   ChefHat,
   Truck,
   Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSlider from '../components/HeroSlider.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProductCard from '../components/ProductCard.jsx'
import PartnerStrip from '../components/PartnerStrip.jsx'
import BrandStripeImage from '../components/BrandStripeImage.jsx'
import AnimatedCTASection from '../components/AnimatedCTASection.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import NewsCard from '../components/NewsCard.jsx'
import Counter from '../components/Counter.jsx'
import { ErrorState, Skeleton } from '../components/ui/index.js'
import { getProducts } from '../services/productService.js'
import { getNews } from '../services/newsService.js'
import { fallbackProducts } from '../data/products.js'
import { fallbackNews } from '../data/news.js'

import homePremiumFeatureImg from '../assets/nelna-gallery-08.jpg'
import processCardImg1 from '../assets/nelna-gallery-11.jpg'
import processCardImg2 from '../assets/nelna-gallery-12.jpg'
import processCardImg3 from '../assets/nelna-gallery-13.jpg'

import certGMP from '../assets/GMP.jpg'
import certHACCP from '../assets/HACCP.jpg'
import certHalal from '../assets/HALAL.jpg'
import certISO from '../assets/ISO_22000.jpg'
import chickenIllustration from '../assets/Asset 1.png'

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
         {/* 1. Hero Section */}
         <section className="relative">
            <HeroSlider />
            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50"
               >
                  {[
                     { value: 200, suffix: '+', label: 'Contract Farmers', color: 'text-brand-700' },
                     { value: 1500, suffix: '+', label: 'Employees', color: 'text-brand-yellow-600' },
                     { text: 'Since 1998', label: 'Industry Heritage', color: 'text-brand-green-700' },
                     { text: 'Nationwide', label: 'Distribution Coverage', color: 'text-brand-red-600' },
                  ].map((stat, i) => (
                     <div key={i} className="text-center group cursor-default">
                         <div className={`text-3xl md:text-4xl font-display font-extrabold ${stat.color} mb-2 group-hover:scale-105 transition-transform origin-bottom`}>
                            {stat.text || <Counter to={stat.value} suffix={stat.suffix} />}
                         </div>
                         <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.15em] group-hover:text-slate-800 transition-colors">
                            {stat.label}
                         </div>
                     </div>
                  ))}
               </motion.div>
            </div>
         </section>

         {/* 2. Premium Experience Section */}
         <section className="py-24 px-4 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
               >
                  <div className="absolute top-10 right-10 w-full h-full bg-brand-100/65 rounded-[3rem] -z-10 transform translate-x-4 translate-y-4" />
                  <img
                     src={homePremiumFeatureImg}
                     alt="Fresh Premium Chicken"
                     className="rounded-[3rem] shadow-2xl w-full object-cover"
                     loading="lazy"
                  />
                  <div className="absolute bottom-8 left-8 bg-white/98 backdrop-blur p-6 rounded-2xl shadow-lg max-w-xs border border-slate-200 hidden md:block">
                     <div className="flex items-center gap-2 mb-2 text-gold-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                     </div>
                     <p className="text-sm font-semibold text-slate-800 italic leading-snug">
                        "Consistently the highest quality chicken in the market. Nelna has been our trusted supplier for over a decade."
                     </p>
                     <div className="mt-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                        — Leading Hotel Chain
                     </div>
                  </div>
               </motion.div>

               <div>
                  <div className="flex items-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-xs mb-4">
                     <Award className="w-4 h-4" />
                     <span>Premium Quality Standard</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                     Built for <span className="text-brand-600">Quality, Safety, and Trust</span>
                  </h2>
                  <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                     Nelna Farm combines certified production standards, modern processing, and disciplined cold-chain logistics to deliver dependable premium poultry and food products for households, retailers, and food service operations.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                     {[
                        { icon: ShieldCheck, title: 'Certified Food Safety', desc: 'Operational controls aligned with international quality systems.' },
                        { icon: Clock, title: 'Freshness Commitment', desc: 'Efficient processing and dispatch for dependable shelf quality.' },
                        { icon: Leaf, title: 'Responsible Farming', desc: 'Structured farm management with animal welfare oversight.' },
                        { icon: CheckCircle2, title: 'Batch Traceability', desc: 'Clear process visibility from farm inputs to final delivery.' },
                     ].map((feature, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                              <feature.icon className="w-5 h-5" />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{feature.title}</h4>
                              <p className="text-xs text-slate-600">{feature.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <Link
                     to="/quality-safety"
                     className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-200 transition-all hover:bg-brand-700 hover:shadow-xl hover:-translate-y-1"
                  >
                     Read Our Standards <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </section>



         {/* 3. Shop Favorites Section */}
         <section className="bg-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-4">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
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
                  <Link
                     to="/products"
                     className="hidden md:flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-brand-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                     View All Products <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="md:hidden mt-8 text-center">
                     <Link to="/products" className="inline-flex items-center gap-2 font-bold text-brand-600">
                        View Full Catalog <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               ) : null}
            </div>
         </section>

         <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4">
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
                        <div className="h-40 w-full bg-slate-50 relative overflow-hidden group">
                           {item.imageUrl ? (
                              <img
                                 src={item.imageUrl}
                                 alt={`${item.title} by Nelna Farm`}
                                 loading="lazy"
                                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                           ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-100 relative">
                                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(39,116,58,0.05),transparent_50%)]" />
                                 <span className="text-brand-300 opacity-20 transform -rotate-12 scale-[3] font-display font-bold">Nelna</span>
                              </div>
                           )}
                        </div>
                        <div className="space-y-3 p-5">
                           <h3 className="text-lg font-display font-bold text-slate-900">{item.title}</h3>
                           <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
                           <Link
                              to={item.to}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green-700"
                           >
                              View Category
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                           </Link>
                        </div>
                     </article>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. Why Choose Nelna (Process) */}
         <section className="py-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/70 -z-10" />
            <img
               src={chickenIllustration}
               alt=""
               aria-hidden="true"
               loading="lazy"
               className="pointer-events-none absolute -bottom-4 -right-16 hidden w-[220px] opacity-90 md:block lg:w-[320px] xl:w-[420px]"
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4">
               <div className="mb-16 text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                     Why Businesses and Families<br/> <span className="text-brand-600">Trust Nelna Farm</span>
                  </h2>
                  <p className="text-slate-700 text-lg">
                     Beyond products, we deliver disciplined operations, quality assurance, and accountable service that protect your brand and your customers.
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {processCards.map((item, idx) => (
                     <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="group rounded-3xl overflow-hidden bg-white shadow-lg border border-slate-200"
                     >
                        <div className="h-48 overflow-hidden">
                           <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                           />
                        </div>
                        <div className="p-8">
                           <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                           <p className="text-slate-700 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4">
               <SectionHeading
                  eyebrow="Trust and Quality"
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

               <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/quality-safety" className="btn-primary px-5 py-2.5 text-sm">
                     Quality and Safety
                  </Link>
                  <Link to="/traceability" className="btn-secondary px-5 py-2.5 text-sm">
                     Traceability
                  </Link>
                  <Link
                     to="/sustainability"
                     className="inline-flex min-h-[44px] items-center justify-center rounded-pill border border-brand-green-200 bg-brand-green-50 px-5 py-2.5 text-sm font-semibold text-brand-green-700"
                  >
                     Sustainability
                  </Link>
               </div>
            </div>
         </section>

         <div className="bg-brand-950 py-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-400 via-brand-900 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 relative z-10">
               {[
                  { label: 'ISO 22000 Certified', img: certISO },
                  { label: 'GMP Standards', img: certGMP },
                  { label: 'HACCP Approved', img: certHACCP },
                  { label: 'Halal Certified', img: certHalal },
               ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-3 group opacity-100 transition-all duration-300">
                     <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 group-hover:scale-110 transition-transform duration-300">
                        <img src={badge.img} alt={badge.label} className="w-full h-full object-contain" />
                     </div>
                     <span className="font-display font-bold text-lg text-brand-50 group-hover:text-white transition-colors">{badge.label}</span>
                  </div>
               ))}
            </div>
         </div>

         <PartnerStrip />

         {/* 6. Testimonials */}
         <section className="py-24 bg-brand-50/70">
            <div className="max-w-4xl mx-auto px-6 text-center">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 mb-8 border border-gold-200">
                  <ChefHat className="w-8 h-8" />
               </div>
               <SectionHeading
                  title="Trusted by Culinary and Retail Professionals"
                  subtitle="From hotel kitchens to modern supermarkets, businesses rely on Nelna Farm for consistent quality and dependable supply."
                  titleClassName="!text-slate-900"
                  subtitleClassName="!text-slate-700"
               />
               <div className="mt-12">
                  <TestimonialCarousel
                     items={[
                        {
                           quote:
                              'Nelna’s consistency is unmatched. I can rely on them for every banquet and every service.',
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

         <section id="distributor-opportunity" className="bg-gradient-to-r from-brand-green-950 via-brand-green-900 to-brand-green-800 py-20 text-white">
            <div className="mx-auto max-w-7xl px-4">
               <div className="grid gap-8 rounded-3xl border border-white/25 bg-white/10 p-8 backdrop-blur md:grid-cols-[1.3fr_0.7fr] md:items-center md:p-10">
                  <div>
                     <p className="inline-flex rounded-pill border border-brand-yellow-200/70 bg-brand-yellow-400/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-yellow-100">
                        Distributor and Dealer Network
                     </p>
                     <h2 className="mt-4 text-3xl font-display font-bold text-white md:text-4xl">
                        Become a Nelna Farm Distributor
                     </h2>
                     <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-brand-green-50 md:text-base">
                        Partner with Nelna Farm to access stable supply, category support, and a recognized brand trusted by customers across Sri Lanka. We work with distributors and dealers focused on long-term growth and service excellence.
                     </p>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                     <Link to="/contact#distributor-partnership" className="btn-secondary w-full justify-center px-6 py-3 text-sm md:w-auto md:min-w-[230px]">
                        Become a Distributor
                     </Link>
                     <Link
                        to="/contact"
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-pill border border-white/80 bg-black/20 px-6 py-3 text-sm font-bold text-white md:w-auto md:min-w-[230px]"
                     >
                        Contact Sales Team
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* 7. Latest News Preview */}
         <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-4">
               <SectionHeading
                  eyebrow="Community & Updates"
                  title="Life at Nelna Farm"
                  subtitle="Stay connected with our latest initiatives, recipes, and farm updates."
                  align="left"
               />
               <div className="mt-12 grid gap-8 md:grid-cols-3">
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



         {/* 8. Final CTA */}
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
