import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ConsultationBlockProps {
  headline: string;
  paragraph: string;
  bullets: string[];
}

const inputClass =
  "w-full bg-primary-foreground/[0.06] border border-primary-foreground/[0.10] text-primary-foreground placeholder:text-primary-foreground/25 text-sm px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300";

const ConsultationBlock = ({ headline, paragraph, bullets }: ConsultationBlockProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const body = {
      fullName: fd.get("fullName") as string,
      companyName: fd.get("companyName") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      statesOfOperation: fd.get("statesOfOperation") as string,
      description: fd.get("description") as string,
    };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error("Request failed");
      toast({ title: "Inquiry received", description: "We'll be in touch within 1 business day." });
      e.currentTarget.reset();
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-charcoal px-6 py-20 md:py-24 md:px-12 lg:px-24">
      <div className="section-narrow">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left */}
          <div>
            <div className="w-16 h-0.5 bg-primary mb-5" />
            <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground font-bold leading-[1.1] mb-5">
              {headline}
            </h2>
            <p className="text-primary-foreground/60 leading-[1.85] mb-8 text-[0.95rem]">
              {paragraph}
            </p>
            <ul className="space-y-4">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-primary-foreground/75">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="fullName" placeholder="Full Name" required className={inputClass} />
                <input type="text" name="companyName" placeholder="Organization Name" className={inputClass} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="Email" required className={inputClass} />
                <input type="tel" name="phone" placeholder="Phone" className={inputClass} />
              </div>
              <input type="text" name="statesOfOperation" placeholder="State(s) of Operation" className={inputClass} />
              <textarea
                name="description"
                placeholder="Brief description of your needs"
                rows={4}
                className={`${inputClass} resize-none`}
              />
              <div className="flex flex-col items-center pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-primary-foreground px-14 py-4 text-sm font-semibold tracking-wider hover:bg-orange-hover transition-all duration-300 border border-primary disabled:opacity-50 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_28px_hsl(var(--primary)/0.45)]"
                >
                  {submitting ? "Submitting…" : "Request Consultation"}
                </button>
                <p className="text-primary-foreground/35 text-xs mt-4 tracking-wide">
                  Confidential. No obligation. Response within 1 business day.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBlock;
