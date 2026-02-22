'use client'

import { useState } from 'react'
import { PLATFORMS } from '@/lib/data'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const iconMap: Record<string, string> = {
    Windows: '⊞',
    macOS: '⌘',
    Linux: '⬡',
}

const envUrlMap: Record<string, string | undefined> = {
    macOS: process.env.NEXT_PUBLIC_DOWNLOAD_URL_MAC,
    Windows: process.env.NEXT_PUBLIC_DOWNLOAD_URL_WIN,
    Linux: process.env.NEXT_PUBLIC_DOWNLOAD_URL_LINUX,
}

function DownloadCard({ platform }: { platform: typeof PLATFORMS[number] }) {
    const [hovered, setHovered] = useState(false)
    const [btnHovered, setBtnHovered] = useState(false)
    const icon = iconMap[platform.os] || '⬡'
    const downloadUrl = envUrlMap[platform.os] || '#'

    return (
        <div
            style={{
                background: 'var(--color-bg-card)',
                border: `1px solid ${hovered ? 'var(--color-border-red)' : platform.featured ? 'var(--color-border-red)' : 'var(--color-border-DEFAULT)'}`,
                padding: '40px 28px',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? '0 -4px 30px rgba(229, 48, 48, 0.08)' : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* .os-icon */}
            <span style={{ fontSize: '36px', marginBottom: '16px', display: 'block' }}>
                {icon}
            </span>

            {/* .os-name */}
            <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 300,
                marginBottom: '8px',
            }}>
                {platform.os}
            </div>

            {/* .os-meta */}
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--color-text-low)',
                marginBottom: '28px',
            }}>
                {platform.version} · {platform.arch} · {platform.size}
            </div>

            {/* .download-btn */}
            <a
                href={downloadUrl}
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '14px',
                    background: btnHovered ? 'var(--color-red-bright)' : 'var(--color-red-core)',
                    color: 'var(--color-text-DEFAULT)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    textAlign: 'center',
                    transition: 'background 0.3s',
                    borderRadius: '100px',
                    textDecoration: 'none',
                    boxSizing: 'border-box',
                }}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
            >
                Download
            </a>
        </div>
    )
}

export default function Download() {
    return (
        /* #download: background var(--bg) */
        <section id="download" style={{ background: 'var(--color-bg)', padding: '120px 0' }}>
            <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>

                <SectionEyebrow>Choose your platform</SectionEyebrow>

                {/* .download-grid: 3-col, gap 24px, mb 32px */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    marginBottom: '32px',
                }}>
                    {PLATFORMS.map((platform) => (
                        <DownloadCard key={platform.os} platform={platform} />
                    ))}
                </div>


            </div>
        </section>
    )
}
