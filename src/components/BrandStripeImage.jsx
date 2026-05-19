import stripeYellowGreen from '../assets/brand/stripe-yellow-green.svg'
import stripeYellowRed from '../assets/brand/stripe-yellow-red.svg'

const stripeMap = {
  green: stripeYellowGreen,
  red: stripeYellowRed,
}

function BrandStripeImage({ variant = 'green', className = '' }) {
  const src = stripeMap[variant] || stripeMap.green

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <img src={src} alt="" loading="lazy" className="h-20 w-full object-cover md:h-24" />
    </div>
  )
}

export default BrandStripeImage
