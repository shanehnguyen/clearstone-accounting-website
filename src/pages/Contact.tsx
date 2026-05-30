import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PageSkeleton from "@/components/PageSkeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import type { ContactPageData } from "@/types/sanity";

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    statesOfOperation: "",
    description: "",
  });

  const { data: page, isLoading } = useSanityQuery<ContactPageData>(
    ["contactPage"],
    '*[_type == "contactPage"][0]',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      toast({ title: "Inquiry received", description: "We'll be in touch within 1 business day." });
      setFormData({ fullName: "", email: "", companyName: "", phone: "", statesOfOperation: "", description: "" });
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !page) return <PageSkeleton sections={2} />;

  return (
    <div>
      {/* Main Content */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="section-narrow">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="divider-orange mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-semibold leading-tight mb-8">{page.howItWorks?.heading}</h2>

              <div className="space-y-8 mb-16">
                {page.howItWorks?.steps?.map((item) => (
                  <div key={item._key} className="flex gap-5">
                    <span className="text-primary font-serif text-2xl font-bold">{item.stepNumber}</span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Credibility bar */}
              <div className="border border-border bg-surface px-6 py-4 mb-6 flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {page.credibilityItems?.map((item, i) => (
                  <span key={item}>
                    {i > 0 && <span className="text-border hidden sm:inline mr-6">|</span>}
                    {item}
                  </span>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="border border-border p-8">
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name *</label>
                      <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State(s) of Operation</label>
                    <input type="text" name="statesOfOperation" value={formData.statesOfOperation} onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Brief Description *</label>
                    <textarea name="description" required rows={4}
                      placeholder="Describe your current financial infrastructure and what prompted this inquiry..."
                      value={formData.description} onChange={handleChange}
                      className="w-full border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:border-primary resize-none transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col items-center pt-10">
                  <button type="submit" disabled={submitting}
                    className="inline-block bg-primary text-primary-foreground px-10 py-3.5 text-sm font-medium tracking-wide hover:bg-orange-hover transition-colors disabled:opacity-50">
                    {submitting ? "Submitting…" : "Request Consultation"}
                  </button>
                  <p className="text-muted-foreground text-xs mt-4 tracking-wide">
                    Confidential. Response within 1 business day.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Contact Strip */}
      <section className="bg-charcoal px-6 py-12 md:px-12 lg:px-24">
        <div className="section-narrow flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            Prefer to reach us directly?
          </p>
          <a href={`mailto:${page.contactEmail}`} className="text-primary-foreground/80 text-sm hover:text-primary transition-colors">
            {page.contactEmail}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
