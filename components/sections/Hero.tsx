'use client'

import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/data'

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null)

    const [osName, setOsName] = useState<string | null>(null)

    // Add .hero-fade only after mount so SSR renders fully visible
    // (prevents the "blank hero" flash on first load)
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        el.querySelectorAll<HTMLElement>('.will-fade').forEach((node) => {
            node.classList.add('hero-fade')
        })

        if (typeof navigator !== 'undefined') {
            let detected = 'Unknown'
            if ('userAgentData' in navigator) {
                detected = (navigator as unknown as { userAgentData?: { platform: string } }).userAgentData?.platform || 'Unknown'
            }

            if (detected === 'Unknown' || !detected) {
                const ua = navigator.userAgent.toLowerCase()
                if (ua.includes('win')) detected = 'Windows'
                else if (ua.includes('mac')) detected = 'macOS'
                else if (ua.includes('linux')) detected = 'Linux'
            }
            setTimeout(() => {
                setOsName(detected)
            }, 0)
        }
    }, [])

    let btnText = 'DOWNLOAD FOR FREE'
    const btnHref = '/download'

    if (osName) {
        const targetOS = osName.toLowerCase()
        if (targetOS.includes('win')) {
            btnText = 'DOWNLOAD FOR WINDOWS'
        } else if (targetOS.includes('mac')) {
            btnText = 'DOWNLOAD FOR MACOS'
        } else if (targetOS.includes('linux')) {
            btnText = 'DOWNLOAD FOR LINUX'
        }
    }

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                padding: '120px 20px 80px',
                overflow: 'hidden',
            }}
        >
            {/* .hero-glow */}
            <div
                style={{
                    position: 'absolute',
                    width: '700px',
                    height: '700px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -55%)',
                    background: 'radial-gradient(circle, rgba(192,40,42,0.12) 0%, rgba(192,40,42,0.04) 40%, transparent 70%)',
                    pointerEvents: 'none',
                    animation: 'glowPulse 4s ease-in-out infinite',
                    zIndex: 0,
                }}
            />

            {/* h1 — will-fade gets hero-fade class after mount */}
            <h1
                className="will-fade text-glow-red"
                style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    fontSize: 'clamp(72px, 5vw, 80px)',
                    lineHeight: 1.05,
                    marginBottom: '52px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                Built by developers.<br />
                <span className="text-gradient-red" style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)', display: 'inline-block' }}>
                    Evolved
                </span>{' '}
                by the community.
            </h1>

            {/* .hero-buttons */}
            <div
                className="will-fade"
                style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '90px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* .btn-primary */}
                <a
                    id="dynamic-download-btn"
                    href={btnHref}
                    className="btn-primary"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '16px 40px',
                        background: 'var(--color-red-core)',
                        color: 'var(--color-text-DEFAULT)',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        transition: 'background 0.3s ease-in-out, transform 0.2s ease-in-out',
                        animation: 'ctaGlow 2.5s ease-in-out infinite',
                        borderRadius: '100px',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = '#e84135'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--color-red-core)'
                    }}
                >
                    <span id="btn-text">{btnText}</span>
                </a>

                {/* .btn-ghost */}
                <a
                    href="/blog"
                    className="btn-outline"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 32px',
                        border: '1px solid var(--color-red-core)',
                        color: 'var(--color-red-bright)',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.2s ease-in-out',
                        borderRadius: '100px',
                        textDecoration: 'none',
                        background: 'transparent',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--color-red-core)'
                        e.currentTarget.style.color = 'var(--color-text-DEFAULT)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--color-red-bright)'
                        e.currentTarget.style.borderColor = 'var(--color-red-core)'
                    }}
                >
                    See how it works →
                </a>
            </div>

            {/* .hero-stats */}
            <div
                className="will-fade"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0,
                    flexWrap: 'wrap',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--color-text-mid)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {STATS.map((stat, i) => (
                    <span
                        key={stat.label}
                        style={{
                            padding: '0 28px',
                            borderRight: i < STATS.length - 1 ? '1px solid var(--color-red-deep)' : 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {stat.value} {stat.label}
                    </span>
                ))}
            </div>
        </section>
    )
}
