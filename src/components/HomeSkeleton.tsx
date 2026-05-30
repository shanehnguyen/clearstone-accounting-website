const Pulse = ({className}: {className: string}) => (
  <div className={`animate-pulse bg-primary-foreground/10 rounded ${className}`} />
);

const HomeSkeleton = () => (
  <div>
    {/* Hero skeleton */}
    <section className="bg-charcoal min-h-[90vh] flex items-center px-6 md:px-12 lg:pl-[100px]">
      <div className="max-w-[600px] py-24">
        <Pulse className="h-3 w-48 mb-6" />
        <Pulse className="h-14 w-full mb-3" />
        <Pulse className="h-14 w-3/4 mb-7" />
        <Pulse className="h-4 w-full mb-2" />
        <Pulse className="h-4 w-4/5 mb-12" />
        <div className="flex gap-4">
          <Pulse className="h-12 w-48" />
          <Pulse className="h-12 w-36" />
        </div>
      </div>
    </section>

    {/* Credibility bar skeleton */}
    <section className="bg-charcoal border-t border-primary-foreground/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Pulse className="h-5 w-5 rounded-full" />
              <Pulse className="h-3 w-20" />
              <Pulse className="h-5 w-32" />
              <Pulse className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Infrastructure skeleton */}
    <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface/50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3 space-y-4">
          <Pulse className="h-1 w-16" />
          <Pulse className="h-10 w-3/4" />
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-4/5" />
        </div>
        <div className="md:col-span-2">
          <div className="border border-border rounded-lg p-7 space-y-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Pulse className="h-11 w-11 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Pulse className="h-4 w-24" />
                  <Pulse className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Services overview skeleton */}
    <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <Pulse className="h-1 w-16 mb-4" />
        <Pulse className="h-10 w-96 mb-3" />
        <Pulse className="h-4 w-2/3 mb-12" />
        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border border-border p-8 space-y-3">
              <Pulse className="h-6 w-40" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default HomeSkeleton;
