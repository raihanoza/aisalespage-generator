import SectionRegenerator from "./SectionRegenerator";

export default function HighEnergyTemplate({
    content,
    productInput,
    onRegenerated,
    showRegenButtons,
}: any) {
    const c = content || {};
    const withRegen = (section: string, element: any) => (
        <div className="relative group/section w-full">
            {element}
            {showRegenButtons && (
                <div className="absolute top-2 right-2 opacity-0 group-hover/section:opacity-100 transition-opacity z-10">
                    <SectionRegenerator
                        section={section}
                        productInput={productInput}
                        existingContent={content}
                        onRegenerated={onRegenerated}
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="font-sans bg-zinc-950 text-white min-h-screen selection:bg-rose-500 selection:text-white">
            {}
            <header className="px-4 py-3 md:px-8 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between sticky top-0 z-50">
                <div className="font-black text-2xl tracking-tighter uppercase italic text-rose-500">
                    IGNITE<span className="text-white">NOW</span>
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-rose-600 to-orange-500 text-white rounded-full text-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                    {c.cta?.primary_text || "Claim Offer"}
                </button>
            </header>

            {}
            {withRegen(
                "headline",
                <section className="relative px-6 py-24 md:py-40 md:px-12 flex flex-col items-center text-center overflow-hidden">
                    {}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-rose-600/20 blur-[120px] rounded-full point-events-none -z-10"></div>
                    
                    <div className="inline-block px-4 py-1 bg-zinc-800/80 border border-rose-500/30 rounded-full text-rose-400 font-bold text-xs uppercase tracking-widest mb-8 shadow-[0_0_10px_rgba(225,29,72,0.2)]">
                        🔥 Limited Time Opportunity
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
                        {c.headline || "EXPLODE YOUR RESULTS"}
                    </h1>
                    
                    <h2 className="text-xl md:text-3xl font-bold text-zinc-400 max-w-4xl mb-12 italic">
                        {c.sub_headline || "Stop making excuses and start taking action today."}
                    </h2>
                    
                    <button className="px-10 py-5 bg-gradient-to-r from-rose-600 to-orange-500 rounded-full text-xl font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(225,29,72,0.5)] animate-pulse">
                        {c.cta?.primary_text || "YES! I Want This Now"}
                    </button>
                    
                    {c.cta?.urgency && (
                        <p className="mt-6 text-orange-400 font-bold tracking-wider animate-bounce">
                            ⚠️ {c.cta.urgency}
                        </p>
                    )}
                </section>
            )}

            {}
            {withRegen(
                "pain_points",
                <section className="px-6 py-20 bg-rose-950/30 border-y border-rose-900">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
                            Are you tired of <span className="text-rose-500 line-through">failing</span>?
                        </h2>
                        <p className="text-xl leading-relaxed text-zinc-300">
                            {c.hero_description || "Most people struggle for years without seeing any meaningful progress. It doesn't have to be this way anymore."}
                        </p>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "benefits",
                <section className="px-6 py-24 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16">
                        What You <span className="text-orange-500">Get</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(c.benefits || []).map((b: any, i: number) => (
                            <div key={i} className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-orange-500 hover:bg-zinc-800 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] group-hover:bg-orange-500/20 transition-all"></div>
                                <div className="text-5xl mb-6 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                                    {b.icon || "🚀"}
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-orange-400 transition-colors">{b.title}</h3>
                                <p className="text-zinc-400 leading-relaxed font-medium">{b.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "features",
                <section className="px-6 py-24 bg-zinc-900/50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-12">
                            The <span className="text-rose-500">Arsenal</span>
                        </h2>
                        <div className="space-y-4">
                            {(c.features || []).map((f: any, i: number) => (
                                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-rose-500/50 transition-colors text-center sm:text-left">
                                    <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500 text-rose-500 flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold uppercase text-white mb-2">{f.title}</h3>
                                        <p className="text-zinc-400 font-medium">{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "social_proof",
                <section className="px-6 py-24 md:px-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center mb-16">
                        Don't Just Take <span className="text-orange-500">Our Word</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(c.social_proof || []).map((t: any, i: number) => (
                            <div key={i} className="p-8 bg-zinc-900 border-l-4 border-orange-500 relative">
                                <span className="absolute top-4 right-6 text-6xl text-zinc-800 font-serif">"</span>
                                <div className="flex text-orange-500 mb-6 text-xl">
                                    {"★".repeat(t.rating || 5)}
                                </div>
                                <p className="text-xl md:text-2xl font-bold italic text-white mb-8 relative z-10">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <h4 className="font-black uppercase text-orange-400 tracking-wider bg-orange-500/10 px-3 py-1 rounded inline-block">
                                        {t.name}
                                    </h4>
                                    <span className="text-zinc-500 font-bold uppercase text-xs">{t.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {}
            <section className="px-6 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 to-zinc-950 -z-10"></div>
                
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white drop-shadow-md">
                        Lock In Your <span className="text-rose-500">Success</span>
                    </h2>
                    
                    <div className="mt-12 p-1 bg-gradient-to-b from-rose-600 to-orange-600 rounded-3xl shadow-[0_0_40px_rgba(225,29,72,0.4)]">
                        <div className="bg-zinc-950 rounded-[22px] p-8 md:p-12">
                            <div className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 font-black uppercase text-sm mb-6 rounded-full border border-rose-500/50">
                                Best Value Guaranteed
                            </div>
                            
                            <h3 className="text-2xl font-bold text-zinc-300 mb-4">{c.pricing?.tagline}</h3>
                            
                            <div className="flex items-end justify-center gap-2 mb-10">
                                <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">
                                    {c.pricing?.price || "$47"}
                                </span>
                                <span className="text-xl font-bold text-zinc-500 mb-2 uppercase">/ {c.pricing?.billing_period}</span>
                            </div>
                            
                            <div className="space-y-4 text-left max-w-sm mx-auto mb-10">
                                {(c.pricing?.includes || []).map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-[0_0_10px_rgba(225,29,72,0.5)]">✓</div>
                                        <span className="text-white font-bold">{item}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full py-5 bg-gradient-to-r from-rose-600 to-orange-500 text-white rounded-xl text-2xl font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(225,29,72,0.5)]">
                                {c.cta?.primary_text || "GET ACCESS NOW"}
                            </button>
                            
                            {c.pricing?.guarantee && (
                                <p className="mt-6 text-zinc-400 font-bold flex items-center justify-center gap-2">
                                    <span>🛡️</span> {c.pricing.guarantee}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {}
            {withRegen(
                "faq",
                <section className="px-6 py-20 bg-zinc-900 border-t border-zinc-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-12">No Excuses <span className="text-zinc-600">(FAQ)</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(c.faq || []).map((f: any, i: number) => (
                                <div key={i} className="p-6 bg-zinc-950 border border-zinc-800 rounded-lg">
                                    <h3 className="text-lg font-bold text-white uppercase mb-3 text-orange-400">{f.question}</h3>
                                    <p className="text-zinc-400 font-medium">{f.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "closing_section",
                <section className="px-6 py-32 bg-gradient-to-t from-rose-950 to-zinc-950 text-center relative overflow-hidden border-t-4 border-rose-600">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjI1LCAyOSwgNzIsIDAuMSkiLz48L3N2Zz4=')] opacity-50"></div>
                    
                    <div className="max-w-4xl mx-auto relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white">
                            {c.closing_section?.headline || "IT'S TIME TO DECIDE"}
                        </h2>
                        <p className="text-2xl font-bold text-rose-200 mb-12 italic">
                            {c.closing_section?.body}
                        </p>
                        <button className="px-12 py-6 bg-white text-rose-600 rounded-full text-2xl font-black uppercase tracking-widest hover:bg-zinc-200 hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] animate-bounce">
                            {c.closing_section?.cta_text || "LETS F*CKING GO"}
                        </button>
                    </div>
                </section>
            )}

            {}
            <footer className="px-6 py-10 bg-black text-center border-t border-zinc-800">
                <div className="font-black text-xl tracking-tighter uppercase italic text-zinc-600 mb-4 opacity-50">
                    IGNITE<span className="text-zinc-500">NOW</span>
                </div>
                <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest">
                    © {new Date().getFullYear()} BEAST MODE. NO REFUNDS FOR QUITTERS.
                </p>
            </footer>
        </div>
    );
}
