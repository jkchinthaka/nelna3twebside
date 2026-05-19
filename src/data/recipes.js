import recipeImg01 from '../assets/nelna-gallery-19.jpg'
import recipeImg02 from '../assets/nelna-gallery-20.jpg'
import recipeImg03 from '../assets/nelna-gallery-21.jpg'

export const recipes = [
  {
    id: 'recipe-01',
    title: 'Nelna Garlic Butter Roast Chicken',
    cut: 'Whole Chicken',
    bestCutFor: 'Family roasts and weekend gatherings',
    time: '75 mins',
    servings: 4,
    imageUrl: recipeImg01,
    summary: 'A golden roast with aromatic garlic butter, crisp skin, and juicy meat.',
    ingredients: [
      '1 Nelna Premium Whole Chicken',
      '3 tbsp unsalted butter',
      '4 garlic cloves, minced',
      '1 lemon, halved',
      'Fresh rosemary and thyme',
      'Salt and black pepper'
    ],
    steps: [
      'Preheat oven to 200°C.',
      'Mix butter, garlic, and herbs. Rub over chicken.',
      'Stuff lemon halves inside cavity.',
      'Roast for 60-70 minutes until golden and cooked through.',
      'Rest for 10 minutes before carving.'
    ],
    tags: ['Weekly Special', 'Family']
  },
  {
    id: 'recipe-02',
    title: 'Herb-Grilled Chicken Breast',
    cut: 'Breast Fillets',
    bestCutFor: 'Healthy meals and salads',
    time: '25 mins',
    servings: 2,
    imageUrl: recipeImg02,
    summary: 'Lean, tender chicken breasts infused with herbs and lemon.',
    ingredients: [
      '2 Nelna Chicken Breast Fillets',
      '2 tbsp olive oil',
      '1 tbsp lemon juice',
      '1 tsp dried oregano',
      'Salt and black pepper'
    ],
    steps: [
      'Marinate chicken with oil, lemon juice, and herbs for 15 minutes.',
      'Grill on medium heat for 4-5 minutes each side.',
      'Rest for 3 minutes before slicing.'
    ],
    tags: ['Quick', 'Healthy']
  },
  {
    id: 'recipe-03',
    title: 'Crispy Chicken Wings',
    cut: 'Wings',
    bestCutFor: 'Parties and BBQs',
    time: '35 mins',
    servings: 3,
    imageUrl: recipeImg03,
    summary: 'Crispy wings with a light spice rub and juicy meat.',
    ingredients: [
      '1kg Nelna Chicken Wings',
      '1 tbsp paprika',
      '1 tsp garlic powder',
      '1 tsp salt',
      '1 tbsp olive oil'
    ],
    steps: [
      'Toss wings in oil and spices.',
      'Bake at 220°C for 25 minutes, flipping once.',
      'Serve with lemon wedges or sauce of choice.'
    ],
    tags: ['Party', 'BBQ']
  }
]
