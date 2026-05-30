import { PortableText } from "@portabletext/react";
import PageHeader from "@/components/PageHeader";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import type { LegalPageData } from "@/types/sanity";

const TermsOfService = () => {
  const { data: page, isLoading } = useSanityQuery<LegalPageData>(
    ["termsOfService"],
    '*[_type == "termsOfService"][0]',
  );

  if (isLoading || !page) return <PageSkeleton sections={2} />;

  return (
    <div>
      <PageHeader title="Terms of Service" breadcrumbLabel="Terms" />
      <section className="section-padding">
        <div className="max-w-3xl mx-auto space-y-8 text-muted-foreground text-sm leading-relaxed">
          {page.sections?.map((section) => (
            <div key={section._key}>
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">{section.heading}</h2>
              <div>
                <PortableText
                  value={section.body || []}
                  components={{
                    marks: {
                      link: ({ children, value }) => (
                        <a href={value?.href} className="text-primary hover:underline">{children}</a>
                      ),
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
