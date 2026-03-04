'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BlogFeatureCardProps {
    title: string
    description: string
    children?: React.ReactNode // For the custom illustration area
    className?: string
}

export default function BlogFeatureCard({ title, description, children, className }: BlogFeatureCardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]",
                "transition-all duration-300 hover:border-white/10 hover:bg-[#111]",
                "min-h-[380px]",
                className
            )}
            style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* Top illustration area */}
            <div className="flex-1 relative flex items-center justify-center p-6 border-b border-white/[0.02]">
                {children}
            </div>

            {/* Bottom text area */}
            <div className="p-8 flex flex-col gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-white/95">
                    {title}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/50">
                    {description}
                </p>
            </div>
        </div>
    )
}
