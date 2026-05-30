import { useParams, Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { PortableText } from "@portabletext/react";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { formatSanityDate } from "@/lib/sanity";
import type { ArticleData } from "@/types/sanity";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading } = useSanityQuery<ArticleData>(
    ["article", slug || ""],
    '*[_type == "article" && slug.current == $slug][0]',
    { slug },
  );

  if (isLoading) return <PageSkeleton sections={3} />;

  if (!article) {
    return (
      <div className="px-6 py-16 md:px-12 lg:px-24 text-center">
        <div className="section-narrow">
          <h1 className="text-3xl font-serif font-bold mb-4">Article Not Found</h1>
          <Link to="/knowledge" className="text-primary text-sm font-medium hover:underline">
            ← Back to Knowledge Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-4 text-xs tracking-[0.15em] uppercase">
            <Link to="/" className="text-primary hover:underline font-medium">
              Home
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <Link to="/knowledge" className="text-primary hover:underline font-medium">
              Knowledge
            </Link>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="text-foreground font-bold">{article.category}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-foreground leading-[1.1] tracking-tight mb-5">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formatSanityDate(article.publishedDate)}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <article className="max-w-3xl mx-auto">
          {article.sections?.map((section) => (
            <div key={section._key} className="mb-10">
              <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed">
                <PortableText value={section.body || []} />
              </div>
            </div>
          ))}

          {/* Callout Block */}
          <div className="border-l-2 border-primary bg-surface px-6 py-5 my-12">
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              {article.callout}
            </p>
          </div>

          {/* Internal Links */}
          <div className="border-t border-border pt-8 mt-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">Related Services</p>
            <div className="flex flex-wrap gap-3">
              {article.internalLinks?.map((link) => (
                <Link
                  key={link._key}
                  to={link.url}
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
                >
                  {link.text} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Authority Footer */}
      <section className="px-6 py-10 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-3">About Clearstone</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Clearstone has provided structured accounting, compliance, and financial oversight services to public, private, and nonprofit organizations nationwide since 2013. Our engagements are built around multi-state compliance coordination, institutional-grade reporting, and year-round operational accountability.
          </p>
        </div>
      </section>

      {/* Contextual CTA */}
      <section className="bg-charcoal px-6 py-16 md:px-12 lg:px-24 text-center">
        <div className="section-narrow max-w-2xl mx-auto">
          <div className="divider-orange mb-4 mx-auto" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground leading-tight mb-5">
            {article.ctaHeadline}
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-md mx-auto">
            Schedule a consultation to assess your compliance exposure and reporting infrastructure.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide hover:bg-orange-hover transition-colors"
          >
            Request Consultation
          </Link>
          <p className="text-primary-foreground/40 text-xs mt-4 tracking-wide">
            Confidential. No obligation. Response within 1 business day.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
