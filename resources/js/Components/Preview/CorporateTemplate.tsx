import SectionRegenerator from "./SectionRegenerator";

export default function CorporateTemplate({
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
        <div className="font-sans bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-200">
            {}
            <nav className="px-6 py-4 md:px-12 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                <div className="font-bold text-xl text-blue-900 tracking-tight">
                    <span className="text-blue-600">■</span> Enterprise
                </div>
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
                    {c.cta?.primary_text || "Get Started"}
                </button>
            </nav>

            {}
            {withRegen(
                "headline",
                <section className="px-6 py-20 md:py-32 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-left">
                        <div className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4">
                            Premium Solution
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            {c.headline || "Your Powerful Headline Here"}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mb-4 leading-relaxed">
                            {c.sub_headline || "Supporting sub-headline that clarifies the value proposition."}
                        </p>
                        <p className="text-base text-slate-500 mb-10 leading-relaxed max-w-xl">
                            {c.hero_description || "Hero description paragraph goes here."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-3.5 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition shadow-md text-center">
                                {c.cta?.primary_text || "Get Started Today"}
                            </button>
                            <button className="px-8 py-3.5 bg-white text-slate-700 border border-slate-300 rounded-md font-semibold hover:bg-slate-50 transition text-center">
                                {c.cta?.secondary_text || "Contact Sales"}
                            </button>
                        </div>
                        {c.cta?.urgency && (
                            <p className="mt-4 text-sm text-blue-700 font-medium">
                                ℹ️ {c.cta.urgency}
                            </p>
                        )}
                    </div>
                    <div className="flex-1 hidden md:flex justify-center">
                        <div className="w-full aspect-square bg-slate-200 rounded-2xl border border-slate-300 shadow-inner flex items-center justify-center text-slate-400">
                            [ Product Illustration ]
                        </div>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "benefits",
                <section className="px-6 py-20 md:px-12 bg-white border-y border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Advantages</h2>
                            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {(c.benefits || []).map((b: any, i: number) => (
                                <div key={i} className="text-center p-8 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition">
                                    <div className="text-4xl mb-6 mx-auto inline-block p-4 bg-white rounded-full shadow-sm text-blue-600">
                                        {b.icon || "✓"}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{b.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "features",
                <section className="px-6 py-20 md:px-12 bg-slate-50">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Comprehensive Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(c.features || []).map((f: any, i: number) => (
                                <div key={i} className="flex gap-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="w-10 h-10 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
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
                <section className="px-6 py-20 md:px-12 bg-blue-900 text-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-16">Trusted by Industry Leaders</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(c.social_proof || []).map((t: any, i: number) => (
                                <div key={i} className="p-8 bg-blue-800/50 rounded-xl border border-blue-700">
                                    <div className="text-yellow-400 text-sm mb-4">{"★".repeat(t.rating || 5)}</div>
                                    <p className="text-blue-100 italic leading-relaxed mb-6">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center font-bold text-blue-200">
                                            {(t.name?.[0] || "U").toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{t.name}</p>
                                            <p className="text-blue-300 text-xs">{t.role} · {t.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            <section className="px-6 py-20 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto border-2 border-blue-600 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                    <div className="p-10 md:w-2/3 bg-slate-50 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Corporate Plan</h3>
                        <p className="text-slate-600 mb-6">{c.pricing?.tagline}</p>
                        <div className="flex flex-col gap-3">
                            {(c.pricing?.includes || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold">✓</span>
                                    <span className="text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-10 md:w-1/3 bg-blue-600 text-white flex flex-col justify-center items-center text-center">
                        <div className="text-5xl font-extrabold mb-2">{c.pricing?.price || "$97"}</div>
                        <div className="text-blue-200 mb-8">{c.pricing?.billing_period}</div>
                        <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-md font-bold hover:bg-slate-50 transition shadow-lg">
                            {c.cta?.primary_text || "Get Started"}
                        </button>
                        {c.pricing?.guarantee && (
                            <p className="mt-4 text-xs tracking-wide text-blue-200">
                                {c.pricing.guarantee}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {}
            {withRegen(
                "faq",
                <section className="px-6 py-20 md:px-12 bg-slate-50 border-t border-slate-200">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Questions & Answers</h2>
                        <div className="space-y-4">
                            {(c.faq || []).map((f: any, i: number) => (
                                <div key={i} className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <h3 className="text-base font-bold text-slate-900 mb-2">{f.question}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{f.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {}
            {withRegen(
                "closing_section",
                <section className="px-6 py-24 md:px-12 bg-white text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                            {c.closing_section?.headline || "Ready to get started?"}
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            {c.closing_section?.body}
                        </p>
                        <button className="px-10 py-4 bg-blue-600 text-white rounded-md text-lg font-bold hover:bg-blue-700 transition shadow-lg">
                            {c.closing_section?.cta_text || "Get Started Now"}
                        </button>
                    </div>
                </section>
            )}

            {}
            <footer className="px-6 py-8 bg-slate-900 text-slate-400 text-center border-t border-slate-800">
                <p className="text-sm">© {new Date().getFullYear()} · Enterprise Solutions. All rights reserved.</p>
            </footer>
        </div>
    );
}
