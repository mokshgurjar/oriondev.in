'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface LazySectionProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default function LazySection({ children, fallback }: LazySectionProps) {
  // Use framer-motion's useInView to quickly evaluate mounting context
  const ref = useRef<HTMLDivElement>(null)

  // margin controls how early the item mounts.
  const isInView = useInView(ref, { margin: "400px 0px 400px 0px", once: true })

  return (
    <div ref={ref}>
      {isInView ? children : fallback}
    </div>
  )
}
