'use client'

import SectionEyebrow from '@/components/ui/SectionEyebrow'
import SectionTitle from '@/components/ui/SectionTitle'
import FeatureCard from '@/components/ui/FeatureCard'
import { FEATURES } from '@/lib/data'

export default function Features() {
    return (
        <section
            id="features"
            style={{ padding: '120px 0' }}
        >
            <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>

                <SectionEyebrow>What makes Orion different</SectionEyebrow>

                <SectionTitle subtitle="After studying Cursor, Windsurf, Antigravity, and PearAI — these properties exist only in Orion.">
                    Capabilities no other IDE has built.
                </SectionTitle>

                {/* .features-grid: 2-col, gap 24px */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '24px',
                    }}
                >
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>

            </div>
        </section>
    )
}
