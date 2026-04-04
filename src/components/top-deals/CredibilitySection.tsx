export function CredibilitySection() {
  return (
    <section className="border-y border-gray-800 bg-gray-950/50 py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">🗂️</div>
        <h2 className="text-2xl font-black text-white mb-3">Built From Real Public Data</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
          Every property in this system comes from public sources — city land banks, sheriff sales, tax rolls, and municipal surplus inventories. We aggregate, normalize, and translate that data into plain English so you can spot opportunities faster than reading through hundreds of pages of city records.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-gray-400">
          {['LRA Properties', 'Sheriff Tax Sales', 'Jefferson Parish Tax Sale', 'Orleans Parish', 'City Surplus'].map(label => (
            <span key={label} className="bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
