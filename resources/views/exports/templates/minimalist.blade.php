<div style="font-family: 'Georgia', 'Times New Roman', serif; background: #fafaf8; color: #1a1a1a; min-height: 100vh;">
    <!-- Nav -->
    <nav style="padding: 20px 48px; border-bottom: 1px solid #e8e4df; display: flex; align-items: center; justify-content: space-between; background: #fafaf8;">
        <div style="font-size: 16px; font-weight: 600; letter-spacing: -0.02em;">◆ Brand</div>
        <button style="padding: 10px 24px; background: #1a1a1a; color: #fff; border-radius: 4px; border: none; font-size: 13px; cursor: pointer; font-family: inherit;">
            {{ $c['cta']['primary_text'] ?? 'Get Started' }}
        </button>
    </nav>

    <!-- Hero -->
    <section style="padding: 80px 48px 60px; max-width: 760px; margin: 0 auto; text-align: center;">
        <div style="font-size: 12px; letter-spacing: 0.15em; color: #888; text-transform: uppercase; margin-bottom: 24px;">✦ New Release</div>
        <h1 style="font-size: clamp(32px, 5vw, 52px); font-weight: 700; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 20px; color: #111;">
            {{ $c['headline'] ?? 'Your Powerful Headline Here' }}
        </h1>
        <p style="font-size: 18px; color: #666; line-height: 1.7; margin-bottom: 16px;">
            {{ $c['sub_headline'] ?? '' }}
        </p>
        <p style="font-size: 15px; color: #888; line-height: 1.8; margin-bottom: 40px;">
            {{ $c['hero_description'] ?? '' }}
        </p>
    </section>

    <!-- Benefits -->
    <section style="padding: 60px 48px; background: #fff; border-top: 1px solid #e8e4df;">
        <div style="max-width: 900px; margin: 0 auto;">
            <h2 style="font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #111;">Why choose us</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px;">
                @foreach($c['benefits'] ?? [] as $benefit)
                <div style="text-align: center;">
                    <div style="font-size: 28px; margin-bottom: 12px;">{{ $benefit['icon'] }}</div>
                    <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #111;">{{ $benefit['title'] }}</h3>
                    <p style="font-size: 13px; color: #777; line-height: 1.7;">{{ $benefit['description'] }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </section>

    <!-- Features -->
    <section style="padding: 60px 48px; background: #fafaf8;">
        <div style="max-width: 760px; margin: 0 auto;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 36px; color: #111;">Everything you need</h2>
            @foreach($c['features'] ?? [] as $idx => $feature)
            <div style="display: flex; gap: 16px; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #e8e4df; margin-bottom: 16px;">
                <div style="width: 32px; height: 32px; border-radius: 6px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 700; flex-shrink: 0;">
                    {{ $idx + 1 }}
                </div>
                <div>
                    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 4px; color: #111;">{{ $feature['title'] }}</h3>
                    <p style="font-size: 13px; color: #777; line-height: 1.7;">{{ $feature['description'] }}</p>
                </div>
            </div>
            @endforeach
        </div>
    </section>

    <!-- Pricing -->
    <section style="padding: 60px 48px; background: #1a1a1a; text-align: center;">
        <div style="max-width: 500px; margin: 0 auto;">
            <div style="font-size: 52px; font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: -0.03em;">
                {{ $c['pricing']['price'] ?? '$97' }}
            </div>
            <p style="font-size: 13px; color: #666; margin-bottom: 24px;">{{ $c['pricing']['billing_period'] ?? '' }}</p>
            <button style="padding: 16px 40px; background: #fff; color: #1a1a1a; border: none; border-radius: 4px; font-size: 15px; font-weight: 600; cursor: pointer; width: 100%; max-width: 280px;">
                {{ $c['cta']['primary_text'] ?? 'Get Started' }}
            </button>
        </div>
    </section>

    <footer style="padding: 24px 48px; border-top: 1px solid #e8e4df; text-align: center;">
        <p style="font-size: 12px; color: #aaa;">© 2025 · All rights reserved</p>
    </footer>
</div>