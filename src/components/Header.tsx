import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/clearstone-logo-new.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const megaMenuColumns = [
  {
    label: "Accounting",
    to: "/services#accounting",
    items: [
      "Bookkeeping",
      "Payroll & HR outsourcing",
      "Back office accounting",
      "Accounts receivable",
      "Accounts payable",
      "Cleanup projects",
    ],
  },
  {
    label: "Taxation — Individual",
    to: "/services#individual-tax",
    items: [
      "Capital gains taxation",
      "Crypto tax services",
      "ITIN number applications",
      "Amended tax returns",
      "IRS or state letter response & resolution",
    ],
  },
  {
    label: "Taxation — Business",
    to: "/services#business-tax",
    items: [
      "LLC taxation",
      "Corporate & partnership taxation",
      "Forensic accounting for businesses",
      "Quarterly estimated taxes",
      "Property accounting",
      "Nonprofit accounting",
    ],
  },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Knowledge Center", to: "/knowledge" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: settings } = useSiteSettings();

  const headerTagline = settings?.headerTagline || "Serving Public, Private, & Nonprofits Across the US and Internationally";
  const email = settings?.email || "support@clearstoneteam.com";
  const servingSince = settings?.servingSince || "· Serving clients since 2013";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const isServicesActive = location.pathname === "/services" || location.pathname === "/industries";

  const linkClass = (active: boolean) =>
    `relative text-xs tracking-[0.08em] uppercase transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-200 ${
      active
        ? "text-primary-foreground after:w-full"
        : "text-primary-foreground/70 hover:text-primary-foreground/90 after:w-0 hover:after:w-full"
    }`;

  return (
    <>
      {/* Micro-bar */}
      <div className="bg-foreground text-primary-foreground/60 text-[10px] uppercase tracking-[0.15em] hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1.5">
          <span>{headerTagline}</span>
          <span>{email}</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-charcoal border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="Clearstone" className="h-10 lg:h-16 w-auto" />
            <span className="text-primary-foreground font-serif text-base lg:text-2xl font-bold uppercase tracking-[0.08em] lg:tracking-[0.04em]">
              Clearstone
            </span>
            <span className="hidden lg:block text-primary-foreground/40 text-[9px] uppercase tracking-[0.12em] leading-tight ml-1">
              {servingSince}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link to="/" className={linkClass(location.pathname === "/")}>
              Home
            </Link>

            <Link to="/about" className={linkClass(location.pathname === "/about")}>
              About
            </Link>

            {/* Services Mega Menu */}
            <div
              ref={dropdownRef}
              className="relative"
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 ${linkClass(isServicesActive)} cursor-pointer`}
              >
                Services <ChevronDown size={11} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full -left-8 mt-3 bg-charcoal border border-primary-foreground/10 shadow-xl z-50">
                  <div className="grid grid-cols-3 gap-0 divide-x divide-primary-foreground/10 p-0 min-w-[640px]">
                    {megaMenuColumns.map((col) => (
                      <div key={col.label} className="px-7 py-6">
                        <Link
                          to={col.to}
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-primary-foreground/50 mb-4 hover:text-primary transition-colors group"
                        >
                          {col.label}
                          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </Link>
                        <ul className="space-y-2.5">
                          {col.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <span className="text-[12px] text-primary-foreground/70 leading-relaxed select-none">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-primary-foreground/10 px-7 py-3 flex items-center justify-between">
                    <Link
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-[11px] uppercase tracking-[0.08em] text-primary-foreground/50 hover:text-primary-foreground transition-colors font-medium"
                    >
                      View All Services →
                    </Link>
                    <Link
                      to="/industries"
                      onClick={() => setServicesOpen(false)}
                      className="text-[11px] uppercase tracking-[0.08em] text-primary-foreground/50 hover:text-primary-foreground transition-colors font-medium"
                    >
                      Industries →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/knowledge" className={linkClass(location.pathname === "/knowledge")}>
              Knowledge Center
            </Link>
            <Link to="/contact" className={linkClass(location.pathname === "/contact")}>
              Contact
            </Link>
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-block bg-orange-hover text-primary-foreground border border-[hsl(22,78%,38%)] px-5 py-2 text-xs font-bold tracking-wide hover:bg-primary transition-colors"
            >
              Request Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden bg-charcoal border-t border-primary-foreground/10 px-6 pb-5 space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
            <Link
              to="/"
              className={`block text-xs uppercase tracking-[0.08em] py-2 ${
                location.pathname === "/" ? "text-primary font-medium" : "text-primary-foreground/70"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`block text-xs uppercase tracking-[0.08em] py-2 ${
                location.pathname === "/about" ? "text-primary font-medium" : "text-primary-foreground/70"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            {/* Mobile Services Accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center justify-between w-full text-xs uppercase tracking-[0.08em] py-2 ${
                isServicesActive ? "text-primary font-medium" : "text-primary-foreground/70"
              }`}
            >
              Services
              <ChevronDown size={12} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-3 border-l border-primary-foreground/10 ml-1">
                <Link
                  to="/services"
                  className="block text-[11px] uppercase tracking-[0.08em] py-1.5 text-primary-foreground/60 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  All Services
                </Link>
                {megaMenuColumns.map((col) => (
                  <div key={col.label}>
                    <Link
                      to={col.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] py-1.5 text-primary-foreground/50 font-semibold hover:text-primary transition-colors"
                    >
                      {col.label} <span className="text-primary">→</span>
                    </Link>
                    {col.items.map((item) => (
                      <Link
                        key={item}
                        to={col.to}
                        className="flex items-center gap-2 text-[11px] tracking-[0.04em] py-1 pl-3 text-primary-foreground/50"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  to="/industries"
                  className="block text-[11px] uppercase tracking-[0.08em] py-1.5 text-primary-foreground/60 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Industries
                </Link>
              </div>
            )}

            <Link
              to="/knowledge"
              className={`block text-xs uppercase tracking-[0.08em] py-2 ${
                location.pathname === "/knowledge" ? "text-primary font-medium" : "text-primary-foreground/70"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Knowledge Center
            </Link>

            <Link
              to="/contact"
              className={`block text-xs uppercase tracking-[0.08em] py-2 ${
                location.pathname === "/contact" ? "text-primary font-medium" : "text-primary-foreground/70"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/contact"
              className="block bg-orange-hover text-primary-foreground border border-[hsl(22,78%,38%)] px-5 py-2 text-xs font-bold tracking-wide text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Request Consultation
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
