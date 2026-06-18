import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2, Building, Scale, Leaf, HeartHandshake } from 'lucide-react';
import { entities } from '../data/businessEntities.js';

// Import images (using placeholders or existing assets for now)
// import heroImg from '../assets/nelna-gallery-12.jpg'; 

const BusinessEntity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const entity = entities.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!entity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nelna-green-soft">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-nelna-dark mb-4">Entity Not Found</h2>
          <button 
            onClick={() => navigate('/about')}
            className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Back to About Us
          </button>
        </div>
      </div>
    );
  }

  // Color mapping for dynamic themes
  const colorMap = {
    orange: { bg: 'bg-nelna-gold-soft', text: 'text-nelna-gold', border: 'border-nelna-gold-soft', gradient: 'from-nelna-gold to-nelna-gold' },
    green: { bg: 'bg-nelna-green-soft', text: 'text-nelna-green', border: 'border-nelna-green-soft', gradient: 'from-nelna-green to-nelna-green' },
    'brand-green': { bg: 'bg-nelna-green-soft', text: 'text-nelna-green', border: 'border-nelna-green-soft', gradient: 'from-nelna-green to-nelna-gold' },
    blue: { bg: 'bg-nelna-green-soft', text: 'text-nelna-green-light', border: 'border-nelna-green-soft', gradient: 'from-nelna-green to-nelna-green-light' },
    emerald: { bg: 'bg-nelna-green-soft', text: 'text-nelna-green', border: 'border-nelna-green-soft', gradient: 'from-nelna-green to-nelna-gold' },
  };

  const theme = colorMap[entity.themeColor] || colorMap.orange;

  return (
    <div className="min-h-screen bg-nelna-white">
      {/* Header / Hero */}
      <div className={`relative h-[40vh] min-h-[300px] w-full bg-gradient-to-r ${theme.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-nelna-white to-transparent"></div>
        
        <div className="relative h-full max-w-5xl mx-auto px-6 pt-24 pb-12 flex flex-col justify-center">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-nelna-white hover:text-nelna-white mb-6 transition-colors w-fit"
            >
              <ArrowLeft size={20} /> 
              <span className="font-medium">Back to Our Structure</span>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-nelna-white/20 backdrop-blur-md rounded-2xl w-fit text-nelna-white">
                  <entity.icon size={32} />
                </div>
                <span className="text-nelna-white font-medium tracking-wider uppercase text-sm border border-nelna-white/30 px-3 py-1 rounded-full">{entity.id === 'nelna-impex' ? 'Sustainability' : 'Business Unit'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-nelna-white mb-4 drop-shadow-sm">
                {entity.name}
              </h1>
            </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-24 -mt-20 relative z-10">
        <div className="bg-nelna-white rounded-[2.5rem] shadow-xl border border-nelna-green-soft overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* Left Content Area */}
            <div className="lg:col-span-3 p-8 md:p-12">
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.3 }}
               >
                 <h2 className={`text-xl font-bold ${theme.text} mb-6 uppercase tracking-wide flex items-center gap-2`}>
                   Overview
                   <div className={`h-px flex-1 ${theme.bg.replace('bg-', 'bg-')}-200 bg-opacity-50`}></div>
                 </h2>
                 
                 <div className="prose prose-lg text-nelna-dark/80">
                    <p className="leading-relaxed mb-6 first-letter:text-4xl first-letter:font-bold first-letter:text-nelna-dark first-letter:mr-1 first-letter:float-left">
                       {entity.description}
                    </p>
                    <p className="leading-relaxed">
                       {entity.description2}
                    </p>
                 </div>

                 {entity.extraAction && (
                    <div className="mt-10">
                       <a 
                         href={entity.extraAction.url} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-nelna-white font-bold shadow-lg shadow-brand-green-200 transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r ${theme.gradient}`}
                       >
                         {entity.extraAction.label}
                         <ExternalLink size={20} />
                       </a>
                    </div>
                 )}
               </motion.div>
            </div>

            {/* Right Sidebar Area */}
            <div className={`lg:col-span-2 ${theme.bg} p-8 md:p-12 flex flex-col justify-center border-l border-nelna-green-soft relative overflow-hidden`}>
               {/* Decorative Circles */}
               <div className={`absolute top-0 right-0 w-64 h-64 ${theme.bg.replace('50', '200')} rounded-full -mr-32 -mt-32 opacity-20 blur-3xl`}></div>
               <div className={`absolute bottom-0 left-0 w-48 h-48 ${theme.bg.replace('50', '200')} rounded-full -ml-24 -mb-24 opacity-20 blur-3xl`}></div>

               <div className="relative z-10 space-y-8">
                  <h3 className="font-display font-bold text-2xl text-nelna-dark mb-6">Key Highlights</h3>
                  
                  {entity.stats && entity.stats.map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      className="bg-nelna-white p-5 rounded-2xl shadow-sm border border-black/5"
                    >
                       <p className={`text-xs font-bold uppercase tracking-wider ${theme.text} mb-1`}>{stat.label}</p>
                       <p className="text-nelna-dark font-bold text-lg md:text-xl">{stat.value}</p>
                    </motion.div>
                  ))}

                  <div className="pt-6 border-t border-black/5">
                     <p className="text-sm text-nelna-dark/70 italic">
                        "Committed to excellence in every aspect of our operations."
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex justify-between items-center text-sm font-medium text-nelna-dark/60">
           <span>Nelna Group of Companies</span>
           <Link to="/contact" className="hover:text-brand-600 transition-colors">Contact Us</Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessEntity;
