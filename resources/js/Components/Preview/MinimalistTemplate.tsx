import SectionRegenerator from "./SectionRegenerator";

export default function MinimalistTemplate({
    content,
    productInput,
    onRegenerated,
    showRegenButtons,
}: any) {
    const c = content || {};
    const withRegen = (section: string, element: any) => (
        <div className="relative group/section">
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
        <div
            style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                background: "#fafaf8",
                color: "#1a1a1a",
                minHeight: "100vh",
            }}
        >
            {}
            <nav
                style={{
                    padding: "20px 48px",
                    borderBottom: "1px solid #e8e4df",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fafaf8",
                }}
            >
                <div
                    style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        letterSpacing: "-0.02em",
                    }}
                >
                    ◆ Brand
                </div>
                <button
                    style={{
                        padding: "10px 24px",
                        background: "#1a1a1a",
                        color: "#fff",
                        borderRadius: "4px",
                        border: "none",
                        fontSize: "13px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                    }}
                >
                    {c.cta?.primary_text || "Get Started"}
                </button>
            </nav>

            {}
            {withRegen(
                "headline",
                <section
                    style={{
                        padding: "80px 48px 60px",
                        maxWidth: "760px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.15em",
                            color: "#888",
                            textTransform: "uppercase",
                            marginBottom: "24px",
                        }}
                    >
                        ✦ New Release
                    </div>
                    <h1
                        style={{
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: "700",
                            lineHeight: "1.15",
                            letterSpacing: "-0.03em",
                            marginBottom: "20px",
                            color: "#111",
                        }}
                    >
                        {c.headline || "Your Powerful Headline Here"}
                    </h1>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "#666",
                            lineHeight: "1.7",
                            marginBottom: "16px",
                        }}
                    >
                        {c.sub_headline ||
                            "Supporting sub-headline that clarifies the value proposition."}
                    </p>
                    <p
                        style={{
                            fontSize: "15px",
                            color: "#888",
                            lineHeight: "1.8",
                            marginBottom: "40px",
                        }}
                    >
                        {c.hero_description ||
                            "Hero description paragraph goes here."}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            style={{
                                padding: "14px 32px",
                                background: "#1a1a1a",
                                color: "#fff",
                                borderRadius: "4px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            {c.cta?.primary_text || "Get Started Today"}
                        </button>
                        <button
                            style={{
                                padding: "14px 32px",
                                background: "transparent",
                                color: "#555",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                fontSize: "15px",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            {c.cta?.secondary_text || "Learn More"}
                        </button>
                    </div>
                    {c.cta?.urgency && (
                        <p
                            style={{
                                marginTop: "16px",
                                fontSize: "13px",
                                color: "#e07a30",
                            }}
                        >
                            ⚡ {c.cta.urgency}
                        </p>
                    )}
                </section>,
            )}

            {}
            {withRegen(
                "benefits",
                <section
                    style={{
                        padding: "60px 48px",
                        background: "#fff",
                        borderTop: "1px solid #e8e4df",
                    }}
                >
                    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: "48px",
                                color: "#111",
                            }}
                        >
                            Why choose us
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "32px",
                            }}
                        >
                            {(c.benefits || []).map((b: any, i: number) => (
                                <div key={i} style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            fontSize: "28px",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {b.icon}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            marginBottom: "8px",
                                            color: "#111",
                                        }}
                                    >
                                        {b.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "13px",
                                            color: "#777",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        {b.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>,
            )}

            {}
            {withRegen(
                "features",
                <section
                    style={{ padding: "60px 48px", background: "#fafaf8" }}
                >
                    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                marginBottom: "36px",
                                color: "#111",
                            }}
                        >
                            Everything you need
                        </h2>
                        <div style={{ display: "grid", gap: "20px" }}>
                            {(c.features || []).map((f: any, i: number) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        gap: "16px",
                                        padding: "20px",
                                        background: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #e8e4df",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "6px",
                                            background: "#1a1a1a",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            fontSize: "13px",
                                            fontWeight: "700",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                marginBottom: "4px",
                                                color: "#111",
                                            }}
                                        >
                                            {f.title}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: "13px",
                                                color: "#777",
                                                lineHeight: "1.7",
                                            }}
                                        >
                                            {f.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>,
            )}

            {}
            {withRegen(
                "social_proof",
                <section
                    style={{
                        padding: "60px 48px",
                        background: "#fff",
                        borderTop: "1px solid #e8e4df",
                    }}
                >
                    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: "36px",
                                color: "#111",
                            }}
                        >
                            What our customers say
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(260px, 1fr))",
                                gap: "20px",
                            }}
                        >
                            {(c.social_proof || []).map((t: any, i: number) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "24px",
                                        borderRadius: "8px",
                                        border: "1px solid #e8e4df",
                                        background: "#fafaf8",
                                    }}
                                >
                                    <div
                                        style={{
                                            color: "#e07a30",
                                            fontSize: "14px",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        {"★".repeat(t.rating || 5)}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "#444",
                                            lineHeight: "1.7",
                                            fontStyle: "italic",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        "{t.quote}"
                                    </p>
                                    <div>
                                        <p
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                color: "#111",
                                            }}
                                        >
                                            {t.name}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#888",
                                            }}
                                        >
                                            {t.role} · {t.company}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>,
            )}

            {}
            <section
                style={{
                    padding: "60px 48px",
                    background: "#1a1a1a",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <p
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.15em",
                            color: "#888",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                        }}
                    >
                        Simple Pricing
                    </p>
                    <p
                        style={{
                            fontSize: "14px",
                            color: "#999",
                            marginBottom: "8px",
                        }}
                    >
                        {c.pricing?.tagline}
                    </p>
                    <div
                        style={{
                            fontSize: "52px",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "8px",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        {c.pricing?.price || "$97"}
                    </div>
                    <p
                        style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "24px",
                        }}
                    >
                        {c.pricing?.billing_period}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            marginBottom: "28px",
                        }}
                    >
                        {(c.pricing?.includes || []).map(
                            (item: any, i: number) => (
                                <p
                                    key={i}
                                    style={{ fontSize: "13px", color: "#aaa" }}
                                >
                                    ✓ {item}
                                </p>
                            ),
                        )}
                    </div>
                    <button
                        style={{
                            padding: "16px 40px",
                            background: "#fff",
                            color: "#1a1a1a",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            width: "100%",
                            maxWidth: "280px",
                        }}
                    >
                        {c.cta?.primary_text || "Get Started"}
                    </button>
                    {c.pricing?.guarantee && (
                        <p
                            style={{
                                marginTop: "16px",
                                fontSize: "12px",
                                color: "#666",
                            }}
                        >
                            🛡️ {c.pricing.guarantee}
                        </p>
                    )}
                </div>
            </section>

            {}
            {withRegen(
                "faq",
                <section
                    style={{ padding: "60px 48px", background: "#fafaf8" }}
                >
                    <div style={{ maxWidth: "660px", margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                marginBottom: "36px",
                                color: "#111",
                            }}
                        >
                            Frequently asked questions
                        </h2>
                        <div style={{ display: "grid", gap: "16px" }}>
                            {(c.faq || []).map((f: any, i: number) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "20px",
                                        borderRadius: "8px",
                                        border: "1px solid #e8e4df",
                                        background: "#fff",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#111",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {f.question}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "13px",
                                            color: "#777",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        {f.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>,
            )}

            {}
            {withRegen(
                "closing_section",
                <section
                    style={{
                        padding: "80px 48px",
                        background: "#fff",
                        borderTop: "1px solid #e8e4df",
                        textAlign: "center",
                    }}
                >
                    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
                        <h2
                            style={{
                                fontSize: "32px",
                                fontWeight: "700",
                                letterSpacing: "-0.02em",
                                color: "#111",
                                marginBottom: "16px",
                            }}
                        >
                            {c.closing_section?.headline ||
                                "Ready to get started?"}
                        </h2>
                        <p
                            style={{
                                fontSize: "15px",
                                color: "#777",
                                lineHeight: "1.7",
                                marginBottom: "32px",
                            }}
                        >
                            {c.closing_section?.body}
                        </p>
                        <button
                            style={{
                                padding: "16px 40px",
                                background: "#1a1a1a",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                        >
                            {c.closing_section?.cta_text || "Get Started Now"}
                        </button>
                    </div>
                </section>,
            )}

            {}
            <footer
                style={{
                    padding: "24px 48px",
                    borderTop: "1px solid #e8e4df",
                    textAlign: "center",
                }}
            >
                <p style={{ fontSize: "12px", color: "#aaa" }}>
                    © 2025 · All rights reserved
                </p>
            </footer>
        </div>
    );
}
