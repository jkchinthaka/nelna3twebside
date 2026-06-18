import SectionHeading from '../components/SectionHeading.jsx'
import { recipes } from '../data/recipes.js'

function Recipes() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <SectionHeading
        eyebrow="Recipes"
        title="Weekly Kitchen Inspiration"
        subtitle="Try these chef-approved recipes and discover the best cuts for every dish."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="rounded-3xl border border-nelna-green-soft bg-nelna-white overflow-hidden shadow-sm">
            <div className="h-44 bg-nelna-green-soft">
              <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-600">Best Cut: {recipe.cut}</p>
              <h3 className="mt-2 text-lg font-semibold text-nelna-dark">{recipe.title}</h3>
              <p className="mt-3 text-sm text-nelna-dark/80">{recipe.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-nelna-dark/70">
                <span>Time: {recipe.time}</span>
                <span>Serves: {recipe.servings}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-nelna-green-soft bg-nelna-green-soft p-8">
        <h3 className="text-lg font-semibold text-nelna-dark">Best Cut For...</h3>
        <ul className="mt-4 grid gap-3 text-sm text-nelna-dark/80 md:grid-cols-2">
          <li>Roasting → Whole Chicken</li>
          <li>Quick meals → Breast Fillets</li>
          <li>BBQ parties → Chicken Wings</li>
          <li>Slow cooking → Drumsticks</li>
        </ul>
      </section>
    </div>
  )
}

export default Recipes
