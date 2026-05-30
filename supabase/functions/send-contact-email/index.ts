import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT = "support@clearstoneteam.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, companyName, phone, statesOfOperation, description } =
      await req.json();

    const html = `
      <h2>New Consultation Request</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name</td><td>${fullName || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization</td><td>${companyName || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email</td><td>${email || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone</td><td>${phone || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">State(s)</td><td>${statesOfOperation || "—"}</td></tr>
      </table>
      <h3>Description</h3>
      <p>${description || "—"}</p>
    `;

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Clearstone <onboarding@resend.dev>`,
        to: [RECIPIENT],
        reply_to: email,
        subject: `New Consultation Request from ${fullName || "Website"}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error("Resend error:", err);
      throw new Error(`Resend API error: ${resendRes.status}`);
    }

    await resendRes.json();

    // Also store in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    await supabase.from("contact_submissions").insert({
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      states_of_operation: statesOfOperation,
      description,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Submission received and email sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
