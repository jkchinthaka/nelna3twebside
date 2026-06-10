import { cn } from '../lib/cn.js'
import { BRAND_GREEN, BRAND_GREEN_TINT_100 } from '../data/brandColors.js'

const GREEN = BRAND_GREEN
const YELLOW = '#f8bc24'
const CREAM = '#faf8f4'
const GREEN_LIGHT = BRAND_GREEN_TINT_100

const badgeArt = {
  iso22000: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="24" fill="none" stroke={YELLOW} strokeWidth="1.25" strokeDasharray="4 3" opacity="0.85" />
      <path
        d="M32 14 L44 20 V32 C44 40.5 38.5 46.5 32 49 C25.5 46.5 20 40.5 20 32 V20 Z"
        fill={GREEN_LIGHT}
        stroke={GREEN}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M26 32 L30 36 L38 26" fill="none" stroke={GREEN} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="2" fill={YELLOW} />
    </>
  ),
  haccp: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <rect x="20" y="16" width="24" height="32" rx="3" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.75" />
      <rect x="26" y="12" width="12" height="6" rx="2" fill="none" stroke={GREEN} strokeWidth="1.75" />
      <path d="M25 26 L28 29 L35 22" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 34 L28 37 L35 30" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="25" y1="42" x2="39" y2="42" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  gmp: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <path
        d="M18 44 V30 L24 26 L32 24 L40 26 L46 30 V44 Z"
        fill={GREEN_LIGHT}
        stroke={GREEN}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <rect x="28" y="34" width="8" height="10" fill="none" stroke={GREEN} strokeWidth="1.5" />
      <rect x="22" y="32" width="6" height="5" fill="none" stroke={GREEN} strokeWidth="1.25" />
      <rect x="36" y="32" width="6" height="5" fill="none" stroke={GREEN} strokeWidth="1.25" />
      <circle cx="44" cy="20" r="7" fill={YELLOW} stroke={GREEN} strokeWidth="1.25" />
      <path d="M44 17 V23 M41 20 H47" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  halal: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="20" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="14" fill="none" stroke={YELLOW} strokeWidth="1.5" />
      <path d="M27 32 L30.5 35.5 L38 26.5" fill="none" stroke={GREEN} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 18 L33.5 21.5 L37 22 L34.5 24.5 L35 28 L32 26 L29 28 L29.5 24.5 L27 22 L30.5 21.5 Z" fill={YELLOW} stroke={GREEN} strokeWidth="0.75" />
    </>
  ),
  'cold-chain': (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <path
        d="M32 15 L43 21 V33 C43 40 38 45.5 32 48 C26 45.5 21 40 21 33 V21 Z"
        fill={GREEN_LIGHT}
        stroke={GREEN}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M32 24 V38 M32 24 L27 29 M32 24 L37 29 M27 34 H37"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="38" r="1.5" fill={YELLOW} />
    </>
  ),
  veterinary: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="19" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5" />
      <circle cx="24" cy="28" r="5" fill="none" stroke={GREEN} strokeWidth="1.75" />
      <path d="M29 28 H38 C40 28 41 29 41 31 V36" fill="none" stroke={GREEN} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="41" cy="36" r="3" fill="none" stroke={GREEN} strokeWidth="1.75" />
      <path d="M24 33 V40 C24 42 26 43 28 43" fill="none" stroke={GREEN} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="28" cy="43" r="2.5" fill={YELLOW} stroke={GREEN} strokeWidth="1" />
    </>
  ),
  traceability: (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <rect x="18" y="22" width="20" height="20" rx="2" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.5" />
      <line x1="22" y1="28" x2="34" y2="28" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="32" x2="30" y2="32" stroke={GREEN} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="36" x2="32" y2="36" stroke={YELLOW} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="42" cy="40" r="9" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="42" cy="40" r="5.5" fill="none" stroke={GREEN} strokeWidth="1.5" />
      <line x1="48" y1="46" x2="52" y2="50" stroke={GREEN} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  'quality-control': (
    <>
      <circle cx="32" cy="32" r="28" fill={CREAM} stroke={GREEN} strokeWidth="1.75" />
      <circle cx="32" cy="32" r="19" fill={GREEN_LIGHT} stroke={GREEN} strokeWidth="1.75" />
      <path
        d="M32 17 L35.5 24.5 L44 25.5 L38 31 L39.5 39.5 L32 35.5 L24.5 39.5 L26 31 L20 25.5 L28.5 24.5 Z"
        fill={YELLOW}
        stroke={GREEN}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M28 32 L31 35 L37 28" fill="none" stroke={GREEN} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

const variantKeys = Object.keys(badgeArt)

function QualityBadgeIcon({ variant = 'iso22000', className }) {
  const art = badgeArt[variant] ?? badgeArt.iso22000

  return (
    <span className={cn('quality-badge-icon', className)} aria-hidden="true">
      <svg
        className="quality-badge-icon__svg"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        {art}
      </svg>
    </span>
  )
}

export { variantKeys }
export default QualityBadgeIcon
