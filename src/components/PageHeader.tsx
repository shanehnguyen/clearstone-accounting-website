import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  breadcrumbLabel: string;
}

const PageHeader = ({ title, breadcrumbLabel }: PageHeaderProps) => {
  return (
    <section className="px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 lg:px-24">
      <div className="section-narrow">
        <nav className="mb-4 text-xs tracking-[0.15em] uppercase">
          <Link to="/" className="text-primary hover:underline font-medium">
            Home
          </Link>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="text-foreground font-bold">{breadcrumbLabel}</span>
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-foreground leading-[1.1] tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
