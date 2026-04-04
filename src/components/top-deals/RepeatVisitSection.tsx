export function RepeatVisitSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-emerald-950/30 border border-emerald-900 rounded-2xl p-8">
        <div className="text-4xl mb-4">🔓</div>
        <h2 className="text-2xl font-black text-white mb-3">Come Back When You Need It</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto mb-6">
          No subscription. No commitment. Unlock again only when a new deal set is useful to you. We&apos;ll send you the weekly Top Deals digest — you decide when you&apos;re ready to unlock.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/unlock"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors text-sm"
          >
            Unlock Full Access — $5–11
          </a>
          <a href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            Browse for free →
          </a>
        </div>
        <p className="text-gray-500 text-xs mt-4">No subscription. No recurring charges. Ever.</p>
      </div>
    </section>
  );
}
