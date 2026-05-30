const Pulse = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-muted/50 rounded ${className}`} />
);

const PageSkeleton = ({ sections = 3 }: { sections?: number }) => (
  <div>
    <section className="px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 lg:px-24">
      <div className="section-narrow">
        <Pulse className="h-3 w-32 mb-4" />
        <Pulse className="h-12 w-64" />
      </div>
    </section>

    {Array.from({ length: sections }).map((_, i) => (
      <section key={i} className={`px-6 py-16 md:py-20 md:px-12 lg:px-24 ${i % 2 ? "bg-surface" : ""}`}>
        <div className="section-narrow space-y-4">
          <Pulse className="h-1 w-16" />
          <Pulse className="h-8 w-72" />
          <Pulse className="h-4 w-full max-w-xl" />
          <Pulse className="h-4 w-full max-w-lg" />
          <Pulse className="h-4 w-3/4 max-w-md" />
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-5/6" />
              <Pulse className="h-4 w-4/5" />
            </div>
            <div className="space-y-3">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-5/6" />
              <Pulse className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </section>
    ))}
  </div>
);

export default PageSkeleton;
