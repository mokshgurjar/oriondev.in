import BlogFeatureCard from '@/components/ui/BlogFeatureCard'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function BlogFeatures() {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <SectionEyebrow>Capabilities</SectionEyebrow>
                    <SectionTitle subtitle="Discover what makes Orion the most powerful AI coding assistant.">
                        Built for modern development.
                    </SectionTitle>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BlogFeatureCard
                        title="Integrated AI"
                        description="Orion uses AI to help you create engaging content and write better code faster than ever before."
                    >
                        <div className="flex items-center gap-4 text-white/20">
                            {/* Decorative icons for Integrated AI */}
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">AI</div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 1 0 10 10H12V2Z" /><path d="M12 12 2.1 7.1" /><path d="M12 12l9.9 4.9" /></svg>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">∞</div>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">✧</div>
                        </div>
                    </BlogFeatureCard>

                    <BlogFeatureCard
                        title="Easy Collaboration"
                        description="Orion can integrate with Zapier, Slack and every other popular integration tools seamlessly."
                    >
                        {/* Decorative diagram for Collaboration */}
                        <div className="flex flex-col items-center gap-3 w-full max-w-[200px] opacity-80">
                            {/* Dots */}
                            <div className="flex justify-between w-full px-2 mb-2">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                ))}
                            </div>

                            <div className="w-32 py-2 px-4 rounded-lg border border-white/10 bg-white/5 text-xs text-center text-white/70 relative">
                                Twitter post
                                {/* Cursor 1 */}
                                <svg className="absolute -right-6 -bottom-4 text-blue-500 w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 6-7 2-2 7L4 4z" /></svg>
                            </div>
                            <div className="w-36 py-2 px-4 rounded-lg border border-white/10 bg-white/5 text-xs text-center text-white/70">
                                Email Campaign
                            </div>
                            <div className="w-40 py-2 px-4 rounded-lg border border-white/20 bg-white/10 text-xs text-center relative text-white/90 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                                Newsletter Campaign
                                {/* Cursor 2 */}
                                <svg className="absolute -left-4 -bottom-5 text-blue-500 w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l16 6-7 2-2 7L4 4z" /></svg>
                            </div>
                        </div>
                    </BlogFeatureCard>

                    <BlogFeatureCard
                        title="Know your audience"
                        description="Based on your audience, create funnels and drive more traffic to your applications effortlessly."
                    >
                        {/* Decorative chart/profile for Audience */}
                        <div className="flex flex-col items-center w-full gap-4 opacity-80 mt-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/50" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-white/80">User Analytics</div>
                                <div className="text-[10px] text-white/40">Most engagements • 69,420</div>
                            </div>

                            {/* Decorative Line Chart */}
                            <div className="w-full h-16 relative mt-2 border-b border-white/10">
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                                    <path d="M0,35 Q10,5 20,25 T40,15 T60,5 T80,25 T100,30" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </BlogFeatureCard>
                </div>
            </div>
        </section>
    )
} 
