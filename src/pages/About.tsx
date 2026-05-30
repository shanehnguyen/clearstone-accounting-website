import { PortableText } from "@portabletext/react";
import ConsultationBlock from "@/components/ConsultationBlock";
import PageHeader from "@/components/PageHeader";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { urlFor } from "@/lib/sanity";
import type { AboutPageData } from "@/types/sanity";

const About = () => {
  const { data: page, isLoading } = useSanityQuery<AboutPageData>(
    ["aboutPage"],
    '*[_type == "aboutPage"][0]',
  );

  if (isLoading || !page) return <PageSkeleton sections={4} />;

  return (
    <div>
      <PageHeader title="About Clearstone" breadcrumbLabel="About" />

      {/* Founder & History */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24">
        <div className="section-narrow grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          <div className="md:col-span-3 order-2 md:order-1">
            <div className="divider-orange mb-5" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-7 leading-[1.15]">
              {page.story?.heading}
            </h2>
            <div className="text-muted-foreground leading-[1.9] max-w-lg text-[0.95rem] space-y-5">
              <PortableText value={page.story?.body || []} />
            </div>
          </div>
          <div className="md:col-span-2 order-1 md:order-2">
            {page.story?.image && (
              <img
                src={urlFor(page.story.image).width(600).quality(80).url()}
                alt="Clearstone team reviewing financial reports"
                className="w-full max-h-[360px] object-cover border border-border"
              />
            )}
          </div>
        </div>
      </section>

      {/* Position + What Sets Us Apart */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <div className="divider-orange mb-5" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-[1.15]">
              {page.position?.heading}
            </h2>
            <div className="text-muted-foreground leading-[1.9] max-w-md text-[0.95rem] space-y-5">
              <PortableText value={page.position?.body || []} />
            </div>
          </div>
          <div>
            <div className="divider-orange mb-5" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-[1.15]">
              {page.setsApart?.heading}
            </h2>
            <div className="text-muted-foreground leading-[1.9] max-w-md text-[0.95rem] space-y-5">
              <PortableText value={page.setsApart?.body || []} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Clearstone */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-5" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-12 leading-[1.15]">
            Why Clearstone
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
            {page.differentiators?.map((item) => (
              <div key={item} className="flex items-start gap-3 py-4 border-b border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span className="text-sm font-medium text-foreground leading-relaxed">{item}</span>
              </div>
            ))}
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

export default About;
