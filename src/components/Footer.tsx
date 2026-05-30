import { Link } from "react-router-dom";
import logo from "@/assets/clearstone-logo-new.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Footer = () => {
  const { data: settings } = useSiteSettings();

  const email = settings?.email || "support@clearstoneteam.com";
  const phone = settings?.phone || "(945) 210-0174";
  const scopeLine = settings?.footerScopeLine || "Serving organizations across the United States and internationally";
  const hqText = settings?.headquartersText || "Headquarters in California & Texas";
  const branchesText = settings?.branchesText || "Branches across the United States";

  return (
    <footer className="bg-charcoal text-primary-foreground/80">
      {/* Scope reinforcement line */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/35 font-medium">
            {scopeLine}
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/[0.06]" />
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/">
              <img src={logo} alt="Clearstone" className="h-24 w-auto mb-3" />
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-foreground font-serif text-sm font-bold uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services#individual-tax" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Individual Taxation</Link></li>
              <li><Link to="/services#business-tax" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Business Taxation</Link></li>
              <li><Link to="/services#accounting" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Accounting Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-primary-foreground font-serif text-sm font-bold uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">About Us</Link></li>
              <li><Link to="/industries" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Industries</Link></li>
              <li><Link to="/knowledge" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Knowledge Center</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/50 hover:text-primary transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-serif text-sm font-bold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/50">
              <li><a href={`mailto:${email}`} className="hover:text-primary transition-colors duration-300">{email}</a></li>
              <li><a href={`tel:${phone.replace(/\D/g, "")}`} className="hover:text-primary transition-colors duration-300">{phone}</a></li>
              <li className="pt-3 text-[11px] text-primary-foreground/30 leading-snug">
                {hqText}
              </li>
              <li className="text-[11px] text-primary-foreground/30 leading-snug">
                {branchesText}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/[0.08] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/35">
          <p>© {new Date().getFullYear()} Clearstone. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
        <div className="text-center mt-4 text-[10px] text-primary-foreground/20 tracking-wide">
          Made by <a href="https://flipfixdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground/40 transition-colors duration-300">FlipFix Digital</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
