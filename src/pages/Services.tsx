import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ConsultationBlock from "@/components/ConsultationBlock";
import PageHeader from "@/components/PageHeader";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import type { ServicesPageData, ServiceData } from "@/types/sanity";

interface ServicesQueryResult {
  page: ServicesPageData;
  primary: ServiceData[];
  supporting: ServiceData[];
}

const SERVICES_QUERY = `{
  "page": *[_type == "servicesPage"][0],
  "primary": *[_type == "service" && serviceType == "primary"] | order(sortOrder asc),
  "supporting": *[_type == "service" && serviceType == "supporting"] | order(sortOrder asc)
}`;

const Services = () => {
  const { data, isLoading } = useSanityQuery<ServicesQueryResult>(
    ["servicesPage"],
    SERVICES_QUERY,
  );

  if (isLoading || !data?.page) return <PageSkeleton sections={5} />;

  const { page, primary, supporting } = data;

  return (
    <div>
      <PageHeader title="Services" breadcrumbLabel="Services" />

      {/* Why Clearstone Is Structurally Different */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 leading-[1.1]">
            {page.comparison?.heading}
          </h2>
          <p className="text-muted-foreground leading-[1.85] mb-12 max-w-xl text-[0.95rem]">
            {page.comparison?.description}
          </p>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 border border-border bg-background">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground/70 mb-6">
                {page.comparison?.typicalFirmLabel}
              </p>
              <ul className="space-y-4">
                {page.comparison?.typicalFirmItems?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-muted-foreground/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-10 bg-charcoal border border-charcoal-light/30">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-primary mb-6">
                {page.comparison?.clearstonLabel}
              </p>
              <ul className="space-y-4">
                {page.comparison?.clearstoneItems?.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-primary-foreground/90 leading-relaxed">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {primary?.map((service, i) => {
        const bgClass = i % 2 === 0 ? "" : "bg-surface/50";
        return (
          <section key={service._id} id={service.slug?.current} className={`${bgClass} border-t border-border`}>
            <div className="px-6 py-16 md:py-20 md:px-12 lg:px-24">
              <div className="section-narrow">
                <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
                  <div className={`md:col-span-3 ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                      {service.category}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold leading-[1.1] mb-6">{service.title}</h2>
                    <p className="text-muted-foreground leading-[1.85] mb-8 max-w-lg text-[0.95rem]">{service.description}</p>
                    <div className="border-l-2 border-primary pl-4 py-1">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60 mb-1">
                        Outcome
                      </p>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{service.outcome}</p>
                    </div>
                  </div>
                  <div className={`md:col-span-2 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                    <div className="border border-border bg-background p-7 md:p-9 rounded-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground/60 mb-6">
                        Capabilities
                      </p>
                      <ul className="space-y-4">
                        {service.capabilities?.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="text-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-6 hover:gap-2.5 transition-all duration-300"
                    >
                      Request Consultation <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Core Bookkeeping Services */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 leading-[1.1]">
            {page.coreBookkeeping?.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {page.coreBookkeeping?.cards?.map((card) => (
              <div
                key={card._key}
                className="bg-background border border-border p-8 md:p-9 rounded-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-serif text-xl font-bold mb-6">{card.title}</h3>
                <ul className="space-y-3.5">
                  {card.items?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Accounting Services */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 leading-[1.1]">
            {page.additionalServicesHeading}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {supporting?.slice(0, -1).map((item) => (
              <div key={item._id} className="border border-border bg-background p-7 md:p-9 rounded-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="font-serif text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.8]">{item.description}</p>
              </div>
            ))}
          </div>
          {supporting && supporting.length > 0 && (
            <div className="mt-7 border border-border bg-background p-7 md:p-9 rounded-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <h3 className="font-serif text-lg font-bold mb-3">{supporting[supporting.length - 1].title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.8] max-w-3xl">{supporting[supporting.length - 1].description}</p>
            </div>
          )}
        </div>
      </section>

      {/* How We Engage */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5 leading-[1.1]">
            {page.howWeEngage?.heading}
          </h2>
          <p className="text-muted-foreground max-w-xl mb-12 leading-[1.85] text-[0.95rem]">
            {page.howWeEngage?.description}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {page.howWeEngage?.steps?.map((item) => (
              <div key={item._key} className="border border-border bg-background p-8 md:p-9 rounded-sm hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
                <p className="text-primary font-serif text-3xl font-bold mb-3 leading-none">{item.stepNumber}</p>
                <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.8] flex-1">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider hover:bg-orange-hover transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.25)] hover:shadow-[0_6px_28px_hsl(var(--primary)/0.45)]"
            >
              Request Consultation
            </Link>
            <p className="text-muted-foreground text-xs mt-3 tracking-wide">
              Confidential. No obligation. Response within 1 business day.
            </p>
          </div>
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

export default Services;
