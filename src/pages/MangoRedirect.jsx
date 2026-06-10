import BrandRedirectLoader from '../components/BrandRedirectLoader.jsx'
import nelnaLogo from '../assets/nelna-logo.jpg'
import mango3dLogo from '../assets/mongo3dlogo.png'

const REDIRECT_URL = 'https://nelnamango.com/'
const REDIRECT_DELAY_MS = 2800

function MangoRedirect() {
  return (
    <BrandRedirectLoader
      fromLogo={nelnaLogo}
      fromAlt="Nelna Farm"
      toLogo={mango3dLogo}
      toAlt="Nelna Mango"
      eyebrow="Welcome"
      title="Nelna Family"
      message="Redirecting you to Nelna Mango..."
      redirectUrl={REDIRECT_URL}
      redirectDelayMs={REDIRECT_DELAY_MS}
    />
  )
}

export default MangoRedirect
