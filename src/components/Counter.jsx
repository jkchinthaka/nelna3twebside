import { animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

export default function Counter({ from = 0, to, duration = 2.5, suffix = '', prefix = '' }) {
  const nodeRef = useRef()
  const inView = useInView(nodeRef, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    
    const controls = animate(from, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = prefix + Math.floor(value) + suffix
      }
    })

    return () => controls.stop()
  }, [from, to, duration, inView, suffix, prefix])

  return <span ref={nodeRef}>{prefix + from + suffix}</span>
}
