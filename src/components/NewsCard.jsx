import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

function NewsCard({ article }) {
  // Format date if available, otherwise mock it
  const dateStr = article.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const category = article.category || "Community";

  return (
    <motion.article 
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-fill)] shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
           <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
             <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
          <div className="absolute left-4 top-4 rounded-full border border-white/85 bg-white/97 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-700 shadow-sm backdrop-blur">
           {category}
        </div>
      </div>

        <div className="flex-1 p-6 flex flex-col">
          <div className="mb-3 flex items-center gap-3 text-xs text-slate-600">
             <div className="flex items-center gap-1">
                 <Calendar className="w-3.5 h-3.5" />
                 <span>{dateStr}</span>
             </div>
         </div>

         <h3 className="text-lg font-bold text-slate-950 mb-3 font-display leading-tight group-hover:text-brand-600 transition-colors">
            {article.title}
         </h3>
         
          <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-800">
            {article.summary}
         </p>

         <Link
            to={`/news/${article.id}`}
            className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-700 hover:text-brand-900 transition-colors"
         >
            Read Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
         </Link>
      </div>
    </motion.article>
  )
}

export default NewsCard
