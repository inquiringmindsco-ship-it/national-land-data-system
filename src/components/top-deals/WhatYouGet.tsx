export function WhatYouGet() {
  const features = [
    {
      emoji: '📊',
      title: 'Full Deal Breakdowns',
      description: 'Every property gets a complete analysis — not just a price and address, but the full picture of what you\'re actually buying.',
    },
    {
      emoji: '💯',
      title: 'Why This Score?',
      description: 'Every opportunity score comes with a plain-English explanation of what drove that number. No black boxes.',
    },
    {
      emoji: '🗺️',
      title: 'Acquisition Pathways',
      description: 'Step-by-step instructions for each deal type — LRA, tax sale, sheriff auction — so you know exactly what to do after you buy.',
    },
    {
      emoji: '⚠️',
      title: 'Risk Warnings',
      description: 'We flag what can go wrong before it goes wrong. Tenant issues, title problems, environmental concerns — all noted upfront.',
    },
    {
      emoji: '📈',
      title: 'Strongest Opportunities First',
      description: 'Every deal set is ranked by our Parcel Intelligence Engine™. The highest-scoring deals appear first so you focus on the best first.',
    },
    {
      emoji: '📧',
      title: 'Weekly Deal Digest',
      description: 'Get the top 5 new opportunities emailed to you every week. New deals as they appear, scored and ranked.',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-white mb-3">What You Get With Full Access</h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">Everything you need to evaluate a property opportunity — without spending weeks reading city records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="bg-gray-950 border border-gray-800 rounded-xl p-5">
            <div className="text-3xl mb-3">{f.emoji}</div>
            <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
