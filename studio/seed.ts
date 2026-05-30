/**
 * Seed script — imports existing hardcoded content into Sanity.
 *
 * Usage:
 *   1. Set env vars: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_AUTH_TOKEN
 *   2. cd studio && npx tsx seed.ts
 *
 * This script is idempotent — it uses createOrReplace with fixed IDs.
 * Images are uploaded from ../src/assets/ and referenced by asset ID.
 */

import {createClient, type SanityClient} from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId || !token) {
  console.error('Missing env vars. Set SANITY_PROJECT_ID and SANITY_AUTH_TOKEN.')
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function uploadImage(filePath: string): Promise<{_type: 'image'; asset: {_type: 'reference'; _ref: string}}> {
  const fullPath = path.resolve(__dirname, '..', filePath)
  const buffer = fs.readFileSync(fullPath)
  const ext = path.extname(fullPath).slice(1)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(fullPath),
    contentType: ext === 'avif' ? 'image/avif' : ext === 'jpg' ? 'image/jpeg' : `image/${ext}`,
  })
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

function key(): string {
  return Math.random().toString(36).slice(2, 10)
}

function textBlock(text: string) {
  return [
    {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: key(), text, marks: []}],
    },
  ]
}

async function seed() {
  console.log('Uploading images...')
  const heroImage = await uploadImage('src/assets/hero-boardroom.avif')
  const riskImage = await uploadImage('src/assets/section-risk.jpg')
  const aboutImage = await uploadImage('src/assets/about-team.jpg')
  const logoImage = await uploadImage('src/assets/clearstone-logo-new.png')
  console.log('Images uploaded.')

  const tx = client.transaction()

  // ──────────────────────────────────────────
  // Site Settings
  // ──────────────────────────────────────────
  tx.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Clearstone',
    email: 'support@clearstoneteam.com',
    phone: '(945) 210-0174',
    headerTagline: 'Serving Public, Private, & Nonprofits Across the US and Internationally',
    servingSince: '· Serving clients since 2013',
    footerScopeLine: 'Serving organizations across the United States and internationally',
    headquartersText: 'Headquarters in California & Texas',
    branchesText: 'Branches across the United States',
    logo: logoImage,
  })

  // ──────────────────────────────────────────
  // Home Page
  // ──────────────────────────────────────────
  tx.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      tagline: 'Full-Service Financial Infrastructure',
      headline: 'Bringing Structure to Financial Operations',
      description:
        'Clearstone operates as your dedicated financial infrastructure partner — delivering payroll, tax strategy, compliance oversight, and executive reporting nationwide.',
      ctaPrimaryText: 'Request a Consultation',
      ctaSecondaryText: 'View Services',
      backgroundImage: heroImage,
      mobileSubtitle: 'Full-Service Financial · Accounting · Tax Infrastructure',
    },
    credibilityItems: [
      {_key: key(), label: 'Established', value: '2013', subtitle: 'Over a Decade of Service'},
      {_key: key(), label: 'Coverage', value: 'Nationwide', subtitle: 'Multi-State Operations'},
      {_key: key(), label: 'Clients', value: 'Public · Private · Nonprofit', subtitle: 'All Entity Types'},
      {_key: key(), label: 'Specialty', value: 'Compliance & Oversight', subtitle: 'Risk Reduction at Scale'},
    ],
    infrastructure: {
      heading: 'Financial Infrastructure You Can Rely On',
      body: [
        ...textBlock(
          'With over 30 years of specialized experience, Clearstone delivers structured financial operations — from bookkeeping and compliance to strategic reporting. We integrate seamlessly with your existing systems and provide the rigor of an in-house team with the flexibility of a dedicated partner.',
        ),
        ...textBlock(
          'Our remote model ensures consistent, real-time financial oversight regardless of where your organization operates. Every engagement is built around accountability, precision, and proactive financial management.',
        ),
      ],
      featureCards: [
        {_key: key(), title: 'Remote', description: 'Seamless remote accounting services accessible from anywhere, anytime.'},
        {_key: key(), title: 'Recurring', description: 'Consistent monthly deliverables and structured recurring workflows.'},
        {_key: key(), title: 'Regimented', description: 'Disciplined processes and standardized controls across every engagement.'},
        {_key: key(), title: 'Responsive', description: 'Fast turnaround and proactive communication when you need it most.'},
      ],
    },
    servicesOverview: {
      heading: 'Your Complete Accounting Department',
      description:
        'We operate as your structured financial infrastructure partner — managing cleanup, payroll, tax strategy, and executive reporting under one engagement.',
    },
    risk: {
      eyebrow: 'Why Traditional Accounting Breaks at Scale',
      heading: 'Your Accounting Is a Risk Surface. Treat It Like Infrastructure.',
      description:
        "Payroll errors, incomplete records, and inconsistent reporting don't just create inconvenience — they create exposure. Most firms react at tax time. Clearstone operates as an ongoing financial control layer built to reduce compliance risk and strengthen operational oversight.",
      bullets: [
        'Continuous compliance monitoring across payroll and reporting',
        'Audit-ready documentation and standardized financial controls',
        'Executive-level reporting built for decision-making, not just filing',
        'Oversight across entities and jurisdictions',
        'Dedicated accountability throughout the year',
      ],
      calloutQuote: "We don't just manage books. We protect financial structure.",
      image: riskImage,
    },
    process: {
      heading: 'A Structured Transition — Not a Disruption',
      steps: [
        {_key: key(), stepNumber: '01', title: 'Diagnostic Review', description: 'We assess your systems, reporting structure, and compliance exposure to establish a clear baseline.'},
        {_key: key(), stepNumber: '02', title: 'System Implementation', description: 'We rebuild workflows, reconcile records, and establish structured reporting tailored to your operations.'},
        {_key: key(), stepNumber: '03', title: 'Ongoing Oversight', description: 'We operate as your accounting department — payroll, compliance, reporting, and strategic advisory on an ongoing basis.'},
      ],
      ctaText: 'Request Consultation',
      ctaSubtext: 'Confidential. No obligation. Response within 1 business day.',
    },
    fit: {
      heading: 'Built for Complex Operations',
      items: [
        {_key: key(), title: 'Multi-State Businesses', description: 'Coordinated payroll, tax filings, and regulatory compliance managed under one engagement across jurisdictions.'},
        {_key: key(), title: 'Nonprofits with Regulatory Requirements', description: 'Grant accounting, fund tracking, and audit-ready reporting for organizations under heightened oversight.'},
        {_key: key(), title: 'Public & Reporting Entities', description: 'Structured financial reporting and compliance documentation for publicly accountable organizations.'},
        {_key: key(), title: 'Growing Private Companies', description: 'Scalable accounting infrastructure that evolves with your operations — from cleanup through ongoing oversight.'},
      ],
    },
    knowledgeHighlight: {
      heading: 'Insights & Analysis',
      description: 'Practical guidance on multi-state compliance, reporting structure, and audit readiness for complex organizations.',
    },
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {_key: key(), question: 'How is Clearstone different from a traditional CPA firm?', answer: 'Clearstone provides structured financial oversight, not just transactional bookkeeping or annual tax preparation. We operate as a long-term financial infrastructure partner — integrating compliance, reporting, and controls under one engagement.'},
      {_key: key(), question: 'Do you work with organizations operating in multiple states?', answer: 'Yes. Multi-state compliance and reporting coordination is a core specialization. We centralize oversight so leadership has clarity across jurisdictions.'},
      {_key: key(), question: 'Are you a replacement for an internal accounting team?', answer: 'In some cases, yes. In others, we complement existing teams by strengthening controls, reporting processes, and compliance structure.'},
      {_key: key(), question: 'What size organizations do you typically work with?', answer: 'We primarily support growing private companies, nonprofits, and public entities that require structured oversight beyond basic bookkeeping.'},
      {_key: key(), question: 'What industries do you specialize in?', answer: 'We serve a range of sectors including government contractors, healthcare organizations, real estate firms, nonprofits, and professional services companies. Our expertise is in financial complexity — not a single vertical.'},
      {_key: key(), question: 'How quickly can we get started?', answer: 'Engagements begin with a strategic assessment call. From there, we outline scope, timeline, and deliverables before implementation.'},
      {_key: key(), question: 'How do you ensure accountability?', answer: 'Each engagement has defined deliverables, reporting cadence, and oversight structure. Clear scope eliminates ambiguity.'},
      {_key: key(), question: 'Is there a long-term contract?', answer: 'Engagement terms are clearly defined upfront. We prioritize clarity and mutual fit before long-term commitments.'},
      {_key: key(), question: 'What accounting systems do you work with?', answer: 'We support major platforms including QuickBooks, Xero, and enterprise systems. We also evaluate system suitability when necessary.'},
      {_key: key(), question: 'How do you handle sensitive financial data?', answer: 'All client data is treated with the highest level of confidentiality. We use encrypted systems, restricted access protocols, and follow industry-standard data security practices.'},
      {_key: key(), question: 'Can you help us prepare for an upcoming audit?', answer: 'Absolutely. Audit readiness is a core part of our service. We maintain documentation standards, reconciliation schedules, and compliance records year-round so you\'re always prepared — not scrambling at deadline.'},
    ],
    consultationCta: {
      headline: 'Financial Control Is a Competitive Advantage.',
      paragraph:
        'Organizations that scale successfully treat accounting as infrastructure — not overhead. Let us assess your current structure and identify where risk can be reduced and reporting strengthened.',
      bullets: [
        'Structured oversight across entities and jurisdictions',
        'Executive-level reporting built for decision-making',
        'Year-round compliance monitoring and accountability',
      ],
    },
  })

  // ──────────────────────────────────────────
  // Services (collection)
  // ──────────────────────────────────────────
  const primaryServices = [
    {
      _id: 'service-accounting',
      title: 'Accounting Services',
      slug: {_type: 'slug', current: 'accounting'},
      category: 'ACCOUNTING SERVICES',
      description: 'Clearstone operates as your dedicated outsourced accounting department. We compile accurate financial statements monthly, ensure proper categorization of transactions, reconcile invoices with payments, and manage quarterly income and sales taxes — providing real-time visibility into your organization\'s financial position.',
      outcome: 'Full-service accounting operations and real-time financial visibility.',
      capabilities: ['Bookkeeping', 'Payroll & HR outsourcing', 'Back office accounting', 'Accounts receivable', 'Accounts payable', 'Cleanup projects'],
      serviceType: 'primary',
      sortOrder: 0,
    },
    {
      _id: 'service-individual-tax',
      title: 'Individual Taxation',
      slug: {_type: 'slug', current: 'individual-tax'},
      category: 'INDIVIDUAL TAXATION',
      description: 'We deliver precise, strategic tax preparation tailored to your personal financial complexity. From capital gains and cryptocurrency to IRS correspondence and amended returns — Clearstone provides the rigor and clarity individuals need to stay ahead.',
      outcome: 'Optimized personal tax strategy and full compliance assurance.',
      capabilities: ['Capital gains taxation', 'Crypto tax services', 'ITIN number applications', 'Amended tax returns', 'IRS or state letter response & resolution'],
      serviceType: 'primary',
      sortOrder: 1,
    },
    {
      _id: 'service-business-tax',
      title: 'Business Taxation',
      slug: {_type: 'slug', current: 'business-tax'},
      category: 'BUSINESS TAXATION',
      description: 'We provide comprehensive tax preparation for businesses across all entity types — S-corporations, LLCs, partnerships, and C-corporations. Our team assists with entity selection and delivers guidance designed to optimize tax outcomes while ensuring compliance at the federal, state, and local level.',
      outcome: 'Reduced tax exposure and multi-entity compliance assurance.',
      capabilities: ['LLC taxation', 'Corporate & partnership taxation', 'Forensic accounting for businesses', 'Quarterly estimated taxes', 'Property accounting', 'Nonprofit accounting'],
      serviceType: 'primary',
      sortOrder: 2,
    },
  ]

  const supportingServices = [
    {_id: 'service-financial-statements', title: 'Preparation of Financial Statements', description: 'We compile accurate and timely financial statements each month, giving you a clear picture of your business\'s financial health. This allows you to make informed decisions based on solid financial data.'},
    {_id: 'service-transaction-categorization', title: 'Categorization of Transactions', description: 'Proper categorization of transactions is crucial for precise accounting and financial reporting. Our team ensures that all transactions are categorized appropriately, which aids in streamlined financial analysis and tax preparation.'},
    {_id: 'service-reconciliation', title: 'Reconciliation of Invoices and Payments', description: 'To maintain accurate records and ensure that all payments are accounted for, we meticulously reconcile invoices with corresponding payments. This process helps prevent discrepancies and keeps your financial records in check.'},
    {_id: 'service-quarterly-taxes', title: 'Quarterly Income and Sales Taxes', description: 'We manage the calculation, reporting, and payment of quarterly income and sales taxes, ensuring compliance with relevant laws and regulations. Our approach helps avoid penalties and ensures peace of mind.'},
    {_id: 'service-payroll', title: 'Payroll Services', description: 'Our comprehensive payroll services cater to businesses of all sizes, from setting up payroll systems for a single employee to managing complex payroll for over 500 staff members. We handle all aspects of payroll, including the administration of benefits and ensuring compliance.'},
    {_id: 'service-sales-tax', title: 'Sales Tax', description: 'We provide detailed sales tax services that range from the initial setup to the management of monthly, quarterly, or annual sales tax reports. We also offer specialized support for addressing specific sales tax issues or responding to notices from state authorities.'},
    {_id: 'service-additional-bookkeeping', title: 'Additional Bookkeeping Services', description: 'Beyond these core services, we handle all other recurring bookkeeping tasks such as payroll processing, accounts payable and receivable, and more. Our goal is to provide a full-service bookkeeping solution that allows you to focus more on running your business and less on the numbers. With us, you gain a partner who understands the nuances of your financial needs and works tirelessly to ensure your books are meticulous and compliant.'},
  ]

  for (const s of primaryServices) {
    tx.createOrReplace({_type: 'service', ...s})
  }
  for (let i = 0; i < supportingServices.length; i++) {
    tx.createOrReplace({
      _type: 'service',
      ...supportingServices[i],
      slug: {_type: 'slug', current: supportingServices[i]._id.replace('service-', '')},
      category: '',
      outcome: '',
      capabilities: [],
      serviceType: 'supporting',
      sortOrder: 10 + i,
    })
  }

  // ──────────────────────────────────────────
  // Industries (collection)
  // ──────────────────────────────────────────
  const industries = [
    {
      _id: 'industry-multi-entity',
      title: 'Multi-Entity & Multi-State Organizations',
      approachLabel: 'Control Framework',
      riskDescription: 'Operating across jurisdictions multiplies compliance exposure. Without consolidated reporting and standardized controls, financial visibility deteriorates — and risk compounds with every new entity.',
      bullets: ['Consolidated reporting across entities', 'Multi-state tax compliance and payroll coordination', 'Jurisdictional regulatory alignment', 'Standardized internal controls across operations', 'Executive dashboards for cross-entity oversight'],
      sortOrder: 0,
    },
    {
      _id: 'industry-nonprofits',
      title: 'Regulated Nonprofits',
      approachLabel: 'Accountability Infrastructure',
      riskDescription: 'Grant-funded organizations face unique accountability requirements. Misallocated funds or incomplete audit trails create compliance risk that threatens organizational viability and public trust.',
      bullets: ['Fund accounting and grant tracking', 'Audit-ready documentation and reporting', 'Board-level financial reporting packages', 'Regulatory compliance monitoring', 'Donor and grantor accountability frameworks'],
      sortOrder: 1,
    },
    {
      _id: 'industry-public',
      title: 'Public & Reporting Entities',
      approachLabel: 'Oversight Model',
      riskDescription: 'Public accountability demands the highest documentation standards. Fragmented oversight or inconsistent compliance frameworks create institutional risk that extends beyond finance into governance.',
      bullets: ['Institutional-grade documentation standards', 'Compliance framework implementation', 'Structured financial oversight and controls', 'Audit preparation and regulatory support', 'Transparent reporting for stakeholders'],
      sortOrder: 2,
    },
    {
      _id: 'industry-growth',
      title: 'Growth-Stage Private Companies',
      approachLabel: 'Scalable Infrastructure',
      riskDescription: 'Scaling creates financial complexity faster than most organizations anticipate. Without structured accounting infrastructure, companies face investor scrutiny and compliance gaps that stall growth.',
      bullets: ['Investor-ready financial reporting', 'Accounting system cleanup and restructuring', 'Scalable bookkeeping and payroll infrastructure', 'Financial controls for pre-audit readiness', 'Strategic tax planning across growth phases'],
      sortOrder: 3,
    },
  ]

  for (const ind of industries) {
    tx.createOrReplace({_type: 'industry', ...ind})
  }

  // ──────────────────────────────────────────
  // Articles (collection)
  // ──────────────────────────────────────────
  const articles = [
    {
      _id: 'article-bookkeeping',
      title: 'What Is Bookkeeping and Why It Matters',
      slug: {_type: 'slug', current: 'what-is-bookkeeping-and-why-it-matters'},
      category: 'Accounting Systems',
      label: 'Technical Brief',
      summary: 'Bookkeeping is the structural foundation of financial oversight. Without it, compliance exposure and reporting failures compound.',
      publishedDate: '2026-02-22',
      readTime: '3 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Bookkeeping is the systematic recording of every financial transaction an organization executes. It encompasses revenue recognition, expense categorization, account reconciliation, and the maintenance of a general ledger that supports all downstream reporting.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock('Without accurate bookkeeping, organizations cannot file taxes correctly, secure financing, or produce reliable financial statements. Relying on bank balances alone ignores outstanding receivables, accrued liabilities, and tax obligations — creating a distorted picture of financial health.')},
        {_key: key(), heading: 'Common Risks', body: textBlock('Inconsistent transaction recording leads to reconciliation failures, missed deductions, and audit exposure. Organizations that defer bookkeeping to tax season face compounded errors, higher remediation costs, and increased compliance risk across jurisdictions.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Maintain strict separation between personal and business finances. Record transactions weekly at minimum. Use standardized chart of accounts aligned to your reporting requirements. As operations scale, transition from spreadsheets to institutional-grade accounting platforms with built-in controls.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If transaction volume is increasing, reconciliation is falling behind, or financial statements are inconsistent, it is time to implement structured bookkeeping infrastructure. Deferring this decision increases remediation cost and compliance exposure.')},
      ],
      callout: 'Organizations that treat bookkeeping as administrative overhead — rather than financial infrastructure — consistently face higher audit risk and reporting failures.',
      ctaHeadline: 'Need Structured Bookkeeping Oversight?',
      internalLinks: [
        {_key: key(), text: 'Monthly Bookkeeping & Payroll', url: '/services#bookkeeping'},
        {_key: key(), text: 'Accounting System Cleanup', url: '/services#cleanup'},
        {_key: key(), text: 'Audit & Compliance Support', url: '/services#audit'},
      ],
    },
    {
      _id: 'article-llc-vs-scorp',
      title: 'Understanding the Difference Between an LLC and S-Corp',
      slug: {_type: 'slug', current: 'understanding-the-difference-between-an-llc-and-s-corp'},
      category: 'Tax',
      label: 'Advisory Insight',
      summary: 'Entity structure directly impacts tax liability, payroll obligations, and compliance requirements. A disciplined analysis is essential.',
      publishedDate: '2026-02-15',
      readTime: '4 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Entity selection involves evaluating the legal, tax, and operational implications of structuring a business as an LLC, S-Corporation, C-Corporation, or partnership. The decision affects liability protection, self-employment tax exposure, payroll requirements, and reporting obligations.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock('The wrong entity structure can result in unnecessary tax liability, missed payroll obligations, and regulatory non-compliance. An S-Corp election, for example, requires reasonable salary compensation through payroll — failure to comply invites IRS scrutiny and penalties.')},
        {_key: key(), heading: 'Common Risks', body: textBlock('Electing S-Corp status without sufficient income to justify the administrative overhead wastes resources. Conversely, remaining as a sole proprietor or single-member LLC at higher income levels exposes the owner to avoidable self-employment taxes.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Model the tax impact of each structure against current and projected income. Evaluate payroll administration costs, state-level filing requirements, and compliance overhead. Reassess entity structure annually as revenue and operational complexity change.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If net business income exceeds $50,000–$75,000 annually, or if multi-state operations create jurisdictional complexity, engage a tax professional to evaluate whether an entity restructuring reduces total tax exposure.')},
      ],
      callout: 'Entity structure is not a one-time decision. As revenue grows and operations span multiple states, the original structure often becomes a source of avoidable tax liability.',
      ctaHeadline: 'Evaluating Your Entity Structure?',
      internalLinks: [
        {_key: key(), text: 'Tax Services', url: '/services#tax'},
        {_key: key(), text: 'Multi-State Compliance', url: '/industries'},
        {_key: key(), text: 'Monthly Bookkeeping & Payroll', url: '/services#bookkeeping'},
      ],
    },
    {
      _id: 'article-pay-yourself',
      title: 'How to Pay Yourself as a Business Owner',
      slug: {_type: 'slug', current: 'how-to-pay-yourself-as-a-business-owner'},
      category: 'Payroll',
      label: 'Technical Brief',
      summary: 'Owner compensation structure affects tax liability, compliance posture, and audit exposure. Proper implementation is non-negotiable.',
      publishedDate: '2026-02-08',
      readTime: '3 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Owner compensation encompasses the method, frequency, and tax treatment of payments from a business entity to its owner. This includes owner\'s draws for sole proprietors and LLCs, and reasonable salary plus distributions for S-Corporation shareholders.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock('Improper compensation structuring triggers IRS scrutiny, payroll tax penalties, and potential reclassification of distributions as wages. For S-Corp owners, failing to pay a reasonable salary is one of the most common audit triggers.')},
        {_key: key(), heading: 'Common Risks', body: textBlock('Using business accounts for personal expenses erodes liability protection and creates reconciliation failures. Inconsistent compensation timing complicates cash flow forecasting and tax planning. Underpaying owner salary in an S-Corp invites penalty assessments.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Establish a fixed compensation schedule aligned to entity type. Maintain strict separation between business and personal accounts. For S-Corps, document reasonable salary methodology and run all compensation through proper payroll processing.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If compensation structure has not been formally evaluated, if owner draws are irregular or undocumented, or if the business has elected or is considering S-Corp status, engage a payroll and tax professional immediately.')},
      ],
      callout: "The IRS does not define 'reasonable salary' with a specific formula — but they will challenge compensation that appears artificially low relative to the owner's role and industry benchmarks.",
      ctaHeadline: 'Need Payroll & Compensation Oversight?',
      internalLinks: [
        {_key: key(), text: 'Monthly Bookkeeping & Payroll', url: '/services#bookkeeping'},
        {_key: key(), text: 'Tax Services', url: '/services#tax'},
        {_key: key(), text: 'Audit & Compliance Support', url: '/services#audit'},
      ],
    },
    {
      _id: 'article-quarterly-taxes',
      title: 'What Are Quarterly Estimated Taxes?',
      slug: {_type: 'slug', current: 'what-are-quarterly-estimated-taxes'},
      category: 'Tax',
      label: 'Technical Brief',
      summary: 'Quarterly estimated tax obligations require structured cash flow planning and disciplined compliance to avoid penalties.',
      publishedDate: '2026-01-28',
      readTime: '3 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Quarterly estimated taxes are periodic payments of income tax and self-employment tax made directly to the IRS and applicable state agencies. They apply to business owners, self-employed individuals, and entities without sufficient tax withholding.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock('The IRS requires tax payments as income is earned — not annually. Failing to make quarterly payments triggers underpayment penalties regardless of whether the full amount is paid at filing. For multi-state operators, each jurisdiction may impose separate estimated tax requirements.')},
        {_key: key(), heading: 'Common Risks', body: textBlock('Failure to reserve adequate cash for tax payments is the most common compliance failure among business owners. Underpayment penalties accrue automatically. Variable income without annualized installment calculations leads to either overpayment or penalty exposure.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Reserve 25–30% of gross revenue in a dedicated tax account upon receipt. Use the safe harbor method — paying 100% of prior-year liability across four installments — to avoid penalties. For variable income, apply the annualized installment method quarterly.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If estimated tax calculations are inconsistent, if the organization operates across multiple state jurisdictions, or if income variability makes projections unreliable, structured tax planning is required to maintain compliance.')},
      ],
      callout: 'Underpayment penalties are assessed automatically — even if the full tax liability is paid at filing. The penalty is a function of timing, not intent.',
      ctaHeadline: 'Addressing Tax Compliance Gaps?',
      internalLinks: [
        {_key: key(), text: 'Tax Services', url: '/services#tax'},
        {_key: key(), text: 'Multi-State Compliance', url: '/industries'},
        {_key: key(), text: 'Monthly Bookkeeping & Payroll', url: '/services#bookkeeping'},
      ],
    },
    {
      _id: 'article-financial-separation',
      title: 'Keeping Business and Personal Finances Separate',
      slug: {_type: 'slug', current: 'keeping-business-and-personal-finances-separate'},
      category: 'Compliance',
      label: 'Advisory Insight',
      summary: 'Commingling personal and business finances creates audit exposure, liability risk, and reconciliation failures.',
      publishedDate: '2026-01-15',
      readTime: '2 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Financial separation requires maintaining distinct bank accounts, credit facilities, and accounting records for personal and business activity. All business revenue must be deposited into business accounts, and all business expenses paid from business funds.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock("Commingled finances compromise the liability protection afforded by LLCs and corporations. Courts can 'pierce the corporate veil' when personal and business funds are not clearly delineated — exposing personal assets to business liabilities.")},
        {_key: key(), heading: 'Common Risks', body: textBlock('Mixed accounts make expense categorization unreliable, tax deduction documentation incomplete, and audit defense significantly more difficult. Lenders and investors view commingled finances as a governance failure.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Open dedicated business checking and credit accounts. Process all owner compensation through formal draws or payroll. Maintain documentation for every inter-account transfer. Conduct monthly reconciliation to ensure no personal transactions flow through business records.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If business and personal transactions currently share accounts, if reconciliation reveals unclassified transfers, or if the organization is preparing for audit or financing — implement separation immediately and engage professional support for remediation.')},
      ],
      callout: 'Courts routinely pierce corporate liability protection when financial separation between owner and entity is not maintained. This is not a best practice — it is a structural requirement.',
      ctaHeadline: 'Need Compliance & Controls Assessment?',
      internalLinks: [
        {_key: key(), text: 'Accounting System Cleanup', url: '/services#cleanup'},
        {_key: key(), text: 'Audit & Compliance Support', url: '/services#audit'},
        {_key: key(), text: 'Monthly Bookkeeping & Payroll', url: '/services#bookkeeping'},
      ],
    },
    {
      _id: 'article-hire-accountant',
      title: 'When to Hire an Accountant',
      slug: {_type: 'slug', current: 'when-to-hire-an-accountant'},
      category: 'Accounting Systems',
      label: 'Advisory Insight',
      summary: 'The cost of deferred professional oversight consistently exceeds the cost of structured accounting engagement.',
      publishedDate: '2026-01-05',
      readTime: '3 min read',
      sections: [
        {_key: key(), heading: 'What It Includes', body: textBlock('Professional accounting engagement encompasses ongoing bookkeeping, tax preparation and planning, payroll administration, compliance monitoring, and financial reporting. Scope ranges from monthly oversight to full outsourced accounting department functionality.')},
        {_key: key(), heading: 'Why It Matters', body: textBlock('Self-managed accounting works at minimal scale. As transaction volume increases, regulatory requirements multiply, and reporting demands grow, the risk of errors, missed deductions, and compliance failures rises proportionally. Professional oversight mitigates these risks structurally.')},
        {_key: key(), heading: 'Common Risks', body: textBlock('Deferred engagement leads to accumulated reconciliation errors, missed filing deadlines, and undocumented tax positions. The remediation cost for years of deferred accounting consistently exceeds the cost of proactive professional engagement.')},
        {_key: key(), heading: 'Structural Best Practices', body: textBlock('Evaluate accounting needs annually against operational complexity. Engage professional support when transaction volume exceeds self-management capacity, when multi-state operations begin, when employees are hired, or when entity restructuring is under consideration.')},
        {_key: key(), heading: 'When to Seek Oversight', body: textBlock('If tax preparation creates uncertainty, if reconciliation is falling behind, if multi-state compliance is required, or if the organization is scaling — the cost of professional oversight is substantially less than the cost of accumulated errors and penalties.')},
      ],
      callout: 'The inflection point for professional accounting engagement is not a revenue threshold — it is the moment when operational complexity exceeds the owner\'s capacity to maintain compliant, accurate records.',
      ctaHeadline: 'Ready for Structured Financial Oversight?',
      internalLinks: [
        {_key: key(), text: 'Accounting System Cleanup', url: '/services#cleanup'},
        {_key: key(), text: 'Tax Services', url: '/services#tax'},
        {_key: key(), text: 'Audit & Compliance Support', url: '/services#audit'},
      ],
    },
  ]

  for (const article of articles) {
    tx.createOrReplace({_type: 'article', ...article})
  }

  // ──────────────────────────────────────────
  // External Resources
  // ──────────────────────────────────────────
  const resources = [
    {_id: 'resource-irs-portal', label: 'IRS Small Business Portal', description: 'Federal tax guidance, filing requirements, and compliance resources for business entities.', url: 'https://www.irs.gov/businesses/small-businesses-self-employed', sortOrder: 0},
    {_id: 'resource-irs-calendar', label: 'IRS Tax Calendar for Businesses', description: 'Key filing deadlines and deposit schedules for employers and self-employed individuals.', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/irs-tax-calendar-for-businesses-and-self-employed', sortOrder: 1},
    {_id: 'resource-state-tax', label: 'State Tax Agencies Directory', description: 'Direct links to every state revenue department for jurisdictional compliance.', url: 'https://www.taxadmin.org/state-tax-agencies', sortOrder: 2},
    {_id: 'resource-sba', label: 'SBA Financial Management Resources', description: 'Operational finance guidance including cash flow, budgeting, and financial planning.', url: 'https://www.sba.gov/business-guide/manage-your-business/manage-your-finances', sortOrder: 3},
  ]

  for (const r of resources) {
    tx.createOrReplace({_type: 'externalResource', ...r})
  }

  console.log('Committing transaction...')
  await tx.commit()
  console.log('Seed complete. All content imported.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
