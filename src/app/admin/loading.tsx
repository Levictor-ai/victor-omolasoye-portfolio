export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-ios-grouped px-4 py-10 font-ios sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl animate-pulse">
        <div className="h-3 w-56 rounded-full bg-ios-fill" />
        <div className="mt-4 h-9 w-80 max-w-full rounded-ios bg-ios-fill" />
        <div className="mt-3 h-4 w-[28rem] max-w-full rounded-full bg-ios-fill" />
        <div className="mt-7 h-14 rounded-ios-xl border border-ios-separator bg-white/60" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-ios-xl border border-ios-separator bg-white/70"
            />
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <div className="h-80 rounded-ios-xl border border-ios-separator bg-white/70" />
          <div className="h-80 rounded-ios-xl border border-ios-separator bg-white/70" />
        </div>
        <p className="mt-6 text-center text-xs text-ios-tertiary">Loading portfolio intelligence…</p>
      </div>
    </main>
  );
}
