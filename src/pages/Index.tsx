import { Link } from "react-router-dom";
import { ArrowRight, Clock, Wifi, RefreshCw, ClipboardCheck, Zap, Shield, Building2, Globe, Award } from "lucide-react";
import { PortableText } from "@portabletext/react";
import ConsultationBlock from "@/components/ConsultationBlock";
import HomeSkeleton from "@/components/HomeSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { urlFor, formatSanityDate } from "@/lib/sanity";
import type { HomePageData, ServiceData, ArticleListItem } from "@/types/sanity";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Wifi, RefreshCw, ClipboardCheck, Zap,
};

const CREDIBILITY_ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Award, Globe, Building2, Shield,
};

const CREDIBILITY_ICON_ORDER = ["Award", "Globe", "Building2", "Shield"];
const FEATURE_ICON_ORDER = ["Wifi", "RefreshCw", "ClipboardCheck", "Zap"];

interface HomeQueryResult {
  homePage: HomePageData;
  services: ServiceData[];
  articles: ArticleListItem[];
}

const HOME_QUERY = `{
  "homePage": *[_type == "homePage"][0],
  "services": *[_type == "service" && serviceType == "primary"] | order(sortOrder asc) {
    _id, title, slug, description,
    "link": "/services#" + slug.current
  },
  "articles": *[_type == "article"] | order(publishedDate desc)[0..2] {
    _id, title, slug, category, summary, publishedDate, readTime
  }
}`;

const Index = () => {
  const { data, isLoading, error } = useSanityQuery<HomeQueryResult>(
    ["homePage"],
    HOME_QUERY,
  );

  if (isLoading) return <HomeSkeleton />;

  if (error || !data?.homePage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Unable to load page content. Please try again later.</p>
      </div>
    );
  }

  const { homePage: page, services, articles } = data;

  const heroImageUrl = page.hero?.backgroundImage
    ? urlFor(page.hero.backgroundImage).width(1920).quality(85).format("webp").url()
    : undefined;

  const riskImageUrl = page.risk?.image
    ? urlFor(page.risk.image).width(800).quality(80).url()
    : undefined;

  const faqMid = Math.ceil((page.faqs?.length || 0) / 2);
  const faqsLeft = page.faqs?.slice(0, faqMid) || [];
  const faqsRight = page.faqs?.slice(faqMid) || [];

  return (
    <div>
      {/* 1. Hero — Desktop */}
      <section className="relative text-primary-foreground min-h-[90vh] hidden md:flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImageUrl && (
            <img src={heroImageUrl} alt="Clearstone boardroom with financial dashboards" className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--charcoal))/0.92] via-[hsl(var(--charcoal))/0.6] to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:pl-[100px] lg:pr-12 py-24 md:py-32">
          <div className="max-w-[600px]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold mb-6">
              {page.hero?.tagline}
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.02] tracking-[-0.03em] mb-7 text-primary-foreground">
              {page.hero?.headline}
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/60 mb-12 leading-[1.8] max-w-md">
              {page.hero?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground px-9 py-4 text-sm font-semibold tracking-wider rounded hover:bg-orange-hover transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_8px_32px_hsl(var(--primary)/0.45)] hover:-translate-y-0.5"
              >
                {page.hero?.ctaPrimaryText || "Request a Consultation"}
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-1.5 border border-primary-foreground/30 text-primary-foreground/80 px-8 py-4 text-sm font-medium tracking-wide rounded hover:border-primary-foreground/60 hover:text-primary-foreground transition-all duration-300"
              >
                {page.hero?.ctaSecondaryText || "View Services"} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="md:hidden bg-charcoal">
        <div className="bg-primary/15 border-b border-primary/20 px-5 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-primary font-semibold text-center">
            {page.hero?.mobileSubtitle}
          </p>
        </div>
        <div className="px-4 pt-5">
          {heroImageUrl && (
            <img
              src={heroImageUrl}
              alt="Clearstone boardroom with financial dashboards"
              className="w-full h-48 object-cover rounded-xl brightness-[0.7] contrast-[1.05]"
            />
          )}
        </div>
        <div className="px-5 pt-7 pb-8">
          <h1 className="text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] mb-4 text-primary-foreground">
            {page.hero?.headline}
          </h1>
          <p className="text-sm text-primary-foreground/60 mb-8 leading-[1.7]">
            {page.hero?.description}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              className="block bg-primary text-primary-foreground text-center px-6 py-3.5 text-sm font-semibold tracking-wider rounded-lg shadow-[0_4px_20px_hsl(var(--primary)/0.3)]"
            >
              {page.hero?.ctaPrimaryText || "Request a Consultation"}
            </Link>
            <Link
              to="/services"
              className="block text-center border border-primary-foreground/25 text-primary-foreground/80 px-6 py-3.5 text-sm font-medium tracking-wide rounded-lg"
            >
              {page.hero?.ctaSecondaryText || "View Services"} →
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-charcoal border-t border-primary-foreground/[0.06]">
        <div className="section-narrow px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {page.credibilityItems?.map((item, i, arr) => {
              const iconName = CREDIBILITY_ICON_ORDER[i];
              const Icon = CREDIBILITY_ICON_MAP[iconName];
              return (
                <div key={item._key} className="relative group">
                  {Icon && <Icon className="w-5 h-5 text-primary/70 mx-auto mb-2.5" />}
                  <p className="text-[10px] text-primary-foreground/40 uppercase tracking-[0.2em] mb-1.5 font-medium">{item.label}</p>
                  <p className="font-serif text-lg text-primary-foreground font-bold">{item.value}</p>
                  <p className="text-[10px] text-primary-foreground/30 mt-1 tracking-wide">{item.subtitle}</p>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-primary-foreground/[0.08]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Infrastructure Section */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface/50">
        <div className="section-narrow">
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
            <div className="md:col-span-3">
              <div className="divider-orange mb-5" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 leading-[1.15]">
                {page.infrastructure?.heading}
              </h2>
              <div className="text-muted-foreground leading-[1.9] text-[0.95rem] max-w-xl space-y-6">
                {page.infrastructure?.body ? (
                  <PortableText value={page.infrastructure.body} />
                ) : null}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-background border border-border rounded-lg p-7 space-y-1 shadow-sm">
                {page.infrastructure?.featureCards?.map((item, i, arr) => {
                  const iconName = FEATURE_ICON_ORDER[i];
                  const Icon = ICON_MAP[iconName];
                  return (
                    <div key={item._key}>
                      <div className="flex items-start gap-4 group py-4 hover:bg-surface/80 rounded-md px-3 transition-all duration-300">
                        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300 shadow-sm">
                          {Icon && <Icon className="text-primary" size={22} />}
                        </div>
                        <div>
                          <h3 className="font-serif text-base font-bold mb-0.5">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                      {i < arr.length - 1 && <div className="border-b border-border mx-3" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24">
        <div className="section-narrow">
          <div className="mb-12">
            <div className="divider-orange mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">{page.servicesOverview?.heading}</h2>
            <p className="text-muted-foreground max-w-2xl leading-[1.8]">
              {page.servicesOverview?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services?.map((service) => (
              <div key={service._id} className="border border-border p-8 group hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.8] mb-5">{service.description}</p>
                <Link to={`/services#${service.slug?.current}`} className="text-primary text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Risk & Positioning — Dark */}
      <section className="bg-charcoal px-6 py-16 md:py-20 md:px-12 lg:px-24">
        <div className="section-narrow">
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
            <div className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium mb-4">
                {page.risk?.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground font-bold leading-[1.1] mb-5">
                {page.risk?.heading}
              </h2>
              <p className="text-primary-foreground/65 leading-[1.85] mb-8 max-w-xl text-[0.95rem]">
                {page.risk?.description}
              </p>

              <ul className="space-y-4 mb-8">
                {page.risk?.bullets?.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground/80">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="font-serif text-lg text-primary-foreground font-semibold border-l-2 border-primary pl-4">
                {page.risk?.calloutQuote}
              </p>
            </div>

            <div className="md:col-span-2">
              {riskImageUrl && (
                <img src={riskImageUrl} alt="Tax documents and financial analysis" className="w-full h-auto object-cover border border-primary-foreground/10" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface">
        <div className="section-narrow">
          <div className="max-w-2xl">
            <div className="divider-orange mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-10 leading-[1.15]">{page.process?.heading}</h2>

            <div className="space-y-10">
              {page.process?.steps?.map((item, i) => (
                <div key={item._key} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-primary font-serif text-3xl font-bold leading-none">{item.stepNumber}</span>
                    {i < (page.process?.steps?.length || 0) - 1 && <div className="w-px h-full bg-border mt-3" />}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-serif text-lg font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-[1.8]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider hover:bg-orange-hover transition-all duration-300 shadow-[0_4px_20px_hsl(var(--primary)/0.25)]"
              >
                {page.process?.ctaText || "Request Consultation"}
              </Link>
              <p className="text-muted-foreground text-xs mt-3 tracking-wide">
                {page.process?.ctaSubtext || "Confidential. No obligation. Response within 1 business day."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fit */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-10">{page.fit?.heading}</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {page.fit?.items?.map((item) => (
              <div key={item._key} className="border-l-2 border-primary pl-6 py-2">
                <h3 className="font-serif text-lg font-bold mb-1.5">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.8]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Center Highlight */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">{page.knowledgeHighlight?.heading}</h2>
          <p className="text-muted-foreground max-w-2xl leading-[1.8] mb-10">
            {page.knowledgeHighlight?.description}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {articles?.map((article) => (
              <Link
                key={article._id}
                to={`/knowledge/${article.slug?.current}`}
                className="group border border-border bg-background p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="inline-block self-start text-[10px] font-semibold uppercase tracking-widest text-primary mb-3">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                  {article.summary}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70 pt-3 border-t border-border">
                  <span>{formatSanityDate(article.publishedDate)}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/knowledge"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all duration-300"
          >
            View All Insights <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="px-6 py-16 md:py-20 md:px-12 lg:px-24 bg-surface">
        <div className="section-narrow">
          <div className="mb-10">
            <div className="divider-orange mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-semibold">{page.faqHeading}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16">
            <Accordion type="multiple" className="space-y-1">
              {faqsLeft.map((item, i) => (
                <AccordionItem key={item._key} value={`faq-left-${i}`} className="border-b border-border">
                  <AccordionTrigger className="font-serif text-base font-semibold text-left hover:no-underline py-5 hover:text-primary transition-colors duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-[1.8] pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion type="multiple" className="space-y-1">
              {faqsRight.map((item, i) => (
                <AccordionItem key={item._key} value={`faq-right-${i}`} className="border-b border-border">
                  <AccordionTrigger className="font-serif text-base font-semibold text-left hover:no-underline py-5 hover:text-primary transition-colors duration-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-[1.8] pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

export default Index;
