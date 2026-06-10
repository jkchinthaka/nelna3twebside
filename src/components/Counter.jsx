import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Counter({ from = 0, to, duration = 2.5, suffix = '', prefix = '' }) {
  const nodeRef = useRef()
  const inView = useInView(nodeRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    const node = nodeRef.current
    if (!node) return

    if (prefersReducedMotion) {
      node.textContent = prefix + to + suffix
      return undefined
    }

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = prefix + Math.floor(value) + suffix
      },
    })

    return () => controls.stop()
  }, [from, to, duration, inView, suffix, prefix, prefersReducedMotion])

  return <span ref={nodeRef}>{prefix + from + suffix}</span>
}
