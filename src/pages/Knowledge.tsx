import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Clock, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { formatSanityDate } from "@/lib/sanity";
import type { ArticleListItem, ExternalResourceData, KnowledgePageData } from "@/types/sanity";

interface KnowledgeQueryResult {
  page: KnowledgePageData;
  articles: ArticleListItem[];
  resources: ExternalResourceData[];
}

const KNOWLEDGE_QUERY = `{
  "page": *[_type == "knowledgePage"][0],
  "articles": *[_type == "article"] | order(publishedDate desc) {
    _id, title, slug, category, summary, publishedDate, readTime
  },
  "resources": *[_type == "externalResource"] | order(sortOrder asc)
}`;

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useSanityQuery<KnowledgeQueryResult>(
    ["knowledgePage"],
    KNOWLEDGE_QUERY,
  );

  if (isLoading || !data?.page) return <PageSkeleton sections={3} />;

  const { page, articles, resources } = data;
  const categories = ["All", ...(page.categories || [])];

  const filteredArticles = articles?.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  return (
    <div>
      <PageHeader title="Knowledge Center" breadcrumbLabel="Knowledge" />

      {/* Category Filters + Articles */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="section-narrow">
          <div className="relative max-w-lg mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm pl-11 pr-4 py-3.5 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-medium tracking-wide border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article._id}
                to={`/knowledge/${article.slug?.current}`}
                className="group border border-border border-t-2 border-t-primary bg-background p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span className="inline-block self-start text-[10px] font-medium uppercase tracking-[0.15em] text-primary mb-3">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatSanityDate(article.publishedDate)}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-primary text-xs font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <p className="text-muted-foreground text-center py-16">No articles match your search.</p>
          )}
        </div>
      </section>

      {/* Authoritative External Resources */}
      <section className="px-6 py-16 md:px-12 lg:px-24 bg-surface border-t border-border">
        <div className="section-narrow">
          <div className="divider-orange mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold leading-tight mb-10">{page.resourcesHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {resources?.map((r) => (
              <a
                key={r._id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-4 border-b border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold group-hover:text-primary transition-colors">{r.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 ml-3" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-charcoal px-6 py-16 md:px-12 lg:px-24 text-center">
        <div className="section-narrow max-w-2xl mx-auto">
          <div className="divider-orange mb-4 mx-auto" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary-foreground leading-tight mb-5">
            {page.ctaSection?.heading}
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-md mx-auto">
            {page.ctaSection?.description}
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

export default Knowledge;
