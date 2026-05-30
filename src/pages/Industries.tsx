import { Link } from "react-router-dom";
import ConsultationBlock from "@/components/ConsultationBlock";
import PageHeader from "@/components/PageHeader";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import type { IndustriesPageData, IndustryData } from "@/types/sanity";

interface IndustriesQueryResult {
  page: IndustriesPageData;
  industries: IndustryData[];
}

const INDUSTRIES_QUERY = `{
  "page": *[_type == "industriesPage"][0],
  "industries": *[_type == "industry"] | order(sortOrder asc)
}`;

const Industries = () => {
  const { data, isLoading } = useSanityQuery<IndustriesQueryResult>(
    ["industriesPage"],
    INDUSTRIES_QUERY,
  );

  if (isLoading || !data?.page) return <PageSkeleton sections={4} />;

  const { page, industries } = data;

  return (
    <div>
      <PageHeader title="Industries" breadcrumbLabel="Industries" />

      {/* Industry Sections */}
      {industries?.map((ind, i) => {
        const isOdd = i % 2 !== 0;
        const bgClass = i % 2 === 0 ? "" : "bg-surface/50";

        return (
          <section
            key={ind._id}
            className={`px-6 py-16 md:py-20 md:px-12 lg:px-24 border-t border-border ${bgClass}`}
          >
            <div className="section-narrow">
              <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
                <div className={`md:col-span-3 ${isOdd ? "md:order-2" : ""}`}>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold leading-[1.1] mb-6 text-foreground">
                    {ind.title}
                  </h2>
                  <p className="leading-[1.85] mb-8 max-w-lg text-[0.95rem] text-muted-foreground">
                    {ind.riskDescription}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider hover:bg-orange-hover transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.25)] hover:shadow-[0_6px_28px_hsl(var(--primary)/0.45)] hover:-translate-y-0.5"
                  >
                    Request Consultation
                  </Link>
                </div>

                <div className={`md:col-span-2 ${isOdd ? "md:order-1" : ""}`}>
                  <div className="border border-border bg-background p-7 md:p-9 rounded-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 text-muted-foreground/60">
                      {ind.approachLabel}
                    </p>
                    <ul className="space-y-4">
                      {ind.bullets?.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span className="leading-relaxed text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <section className="px-6 py-20 md:py-24 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow text-center max-w-2xl mx-auto">
          <div className="divider-orange mb-5 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-[1.1] mb-6">
            {page.closingCta?.heading}
          </h2>
          <p className="text-muted-foreground leading-[1.85] mb-10 text-[0.95rem]">
            {page.closingCta?.description}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider hover:bg-orange-hover transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.25)] hover:shadow-[0_6px_28px_hsl(var(--primary)/0.45)] hover:-translate-y-0.5"
          >
            Request Consultation
          </Link>
          <p className="text-muted-foreground text-xs mt-4 tracking-wide">
            Confidential. No obligation. Response within 1 business day.
          </p>
        </div>
      </section>

      {page.consultationCta && (
        <ConsultationBlock
          headline={page.consultationCta.headline}
          paragraph={page.consultationCta.paragraph}
          bullets={page.consultationCta.bullets || []}
        />
      )}
    </div>
  );
};

export default Industries;
