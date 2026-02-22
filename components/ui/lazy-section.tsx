'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface LazySectionProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default function LazySection({ children, fallback }: LazySectionProps) {
  // Use framer-motion's useInView to quickly evaluate mounting context
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // margin controls how early the item mounts.
  const isInView = useInView(ref, { margin: "400px 0px 400px 0px" })

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isInView) {
      // Simulate network request/render delay so skeletons are visible even if cached
      timer = setTimeout(() => {
        setMounted(true)
      }, 500)
    } else {
      // Unmount completely when scrolled away so the effect triggers again when reverse scrolling
      setMounted(false)
    }
    
    return () => clearTimeout(timer)
  }, [isInView])

  return (
    <div ref={ref}>
      {mounted ? children : fallback}
    </div>
  )
}
