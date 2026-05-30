/**
 * Phase 2 seed — populates remaining singletons (about, services, industries,
 * contact, knowledge, privacy, terms).
 *
 * Usage:
 *   $env:SANITY_PROJECT_ID="0vv8rbrl"
 *   $env:SANITY_AUTH_TOKEN="<token>"
 *   cd studio && npx tsx seed-phase2.ts
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

const client: SanityClient = createClient({projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false})

async function uploadImage(filePath: string) {
  const fullPath = path.resolve(__dirname, '..', filePath)
  const buffer = fs.readFileSync(fullPath)
  const ext = path.extname(fullPath).slice(1)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(fullPath),
    contentType: ext === 'avif' ? 'image/avif' : ext === 'jpg' ? 'image/jpeg' : `image/${ext}`,
  })
  return {_type: 'image' as const, asset: {_type: 'reference' as const, _ref: asset._id}}
}

function k(): string {
  return Math.random().toString(36).slice(2, 10)
}

function tb(text: string) {
  return [{
    _type: 'block', _key: k(), style: 'normal', markDefs: [],
    children: [{_type: 'span', _key: k(), text, marks: []}],
  }]
}

function tbWithLink(prefix: string, linkText: string, href: string, suffix: string) {
  const linkKey = k()
  return [{
    _type: 'block', _key: k(), style: 'normal',
    markDefs: [{_type: 'link', _key: linkKey, href}],
    children: [
      {_type: 'span', _key: k(), text: prefix, marks: []},
      {_type: 'span', _key: k(), text: linkText, marks: [linkKey]},
      {_type: 'span', _key: k(), text: suffix, marks: []},
    ],
  }]
}

async function seed() {
  console.log('Uploading images...')
  const aboutImage = await uploadImage('src/assets/about-team.jpg')
  console.log('Images uploaded.')

  const tx = client.transaction()

  // ── About Page ──
  tx.createOrReplace({
    _id: 'aboutPage', _type: 'aboutPage',
    story: {
      heading: 'Our Story',
      body: [
        ...tb('Clearstone was founded in 2013 with a simple goal: give growing businesses access to the kind of financial oversight usually reserved for large enterprises — without the cost of building an internal department.'),
        ...tb('In the early years, we worked closely with small businesses and startups, helping them build clean financial systems, stay compliant, and make better decisions with their numbers. As our clients grew, so did we — expanding our capabilities to support organizations operating across multiple states and industries.'),
        ...tb('Today, Clearstone serves businesses, nonprofits, and public entities throughout the United States. What started as a small practice has grown into a full outsourced accounting department — built around long-term relationships, structured reporting, and year-round accountability.'),
      ],
      image: aboutImage,
    },
    position: {
      heading: 'Our Position',
      body: [
        ...tb('Clearstone exists because most accounting firms are built to react — at tax season, at audit time, at crisis. We are built to prevent. Every engagement is structured for ongoing oversight, compliance control, and executive-level visibility.'),
        ...tb('Our clients operate across entities, states, and regulatory environments. They need a firm that matches their complexity — not one that adds to it.'),
      ],
    },
    setsApart: {
      heading: 'What Sets Us Apart',
      body: [
        ...tb("We don't offer transactional bookkeeping. We build and operate the financial control layer that complex organizations require — with the accountability, documentation standards, and reporting rigor of an institutional-grade finance function."),
        ...tb('Every client gets a dedicated point of contact, a defined scope of engagement, and structured reporting from day one. No junior-staff handoffs. No gaps in accountability.'),
      ],
    },
    pillars: [
      {_key: k(), title: 'Assessment & Gap Analysis', description: 'We evaluate your current financial infrastructure, identify compliance gaps, and define the scope of engagement before any work begins.'},
      {_key: k(), title: 'System Structuring & Controls', description: 'Chart of accounts, internal controls, and reporting frameworks are built or restructured to institutional standards.'},
      {_key: k(), title: 'Ongoing Oversight & Reporting', description: 'Monthly operations, reconciliation, and executive-level reporting — delivered with the consistency of an in-house department.'},
      {_key: k(), title: 'Audit & Compliance Readiness', description: 'Documentation standards, regulatory alignment, and audit preparation are maintained year-round — not scrambled at deadline.'},
    ],
    differentiators: [
      'Structured reporting from day one',
      'Multi-state payroll and tax expertise',
      'Dedicated point of contact — no junior-staff runaround',
      'Audit-ready systems and documentation standards',
      'Year-round oversight, not seasonal reactivity',
    ],
    consultationCta: {
      headline: 'Your Accounting Department — Without the Overhead',
      paragraph: 'Clearstone operates as a permanent extension of your finance function. We bring the structure, accountability, and expertise of an in-house department — without the overhead.',
      bullets: [
        'Dedicated point of contact and year-round oversight',
        'Scalable infrastructure that evolves with your operations',
        'Transparent scope, clear accountability, no gaps',
      ],
    },
  })

  // ── Services Page ──
  tx.createOrReplace({
    _id: 'servicesPage', _type: 'servicesPage',
    comparison: {
      heading: 'Why Clearstone Is Structurally Different',
      description: 'Most accounting firms react at tax time. Clearstone operates as a structured financial control layer — reducing compliance risk, strengthening reporting, and providing oversight year-round.',
      typicalFirmLabel: 'Typical CPA Firm',
      typicalFirmItems: [
        'Reactive, tax-season focused',
        'Transactional bookkeeping',
        'Limited multi-state coordination',
        'Minimal internal controls',
        'Fragmented services',
      ],
      clearstonLabel: 'Clearstone',
      clearstoneItems: [
        'Proactive, year-round oversight',
        'Full outsourced accounting department',
        'Multi-entity & multi-state compliance structure',
        'Audit-ready documentation & standardized controls',
        'Integrated executive reporting',
      ],
    },
    coreBookkeeping: {
      heading: 'Our Core Bookkeeping Services',
      cards: [
        {_key: k(), title: 'Reconciliations', items: ['Bank & credit card reconciliation', 'Invoice-to-payment matching', 'Intercompany reconciliation', 'Month-end close procedures']},
        {_key: k(), title: 'Accounts Payable & Receivable', items: ['Vendor payment processing', 'Invoice generation & tracking', 'Aging report management', 'Collections support']},
        {_key: k(), title: 'Payroll', items: ['Multi-state payroll processing', 'Benefits administration', 'Tax withholding & filings', 'Compliance with federal & state codes']},
      ],
    },
    additionalServicesHeading: 'Additional Accounting Services',
    howWeEngage: {
      heading: 'How We Engage',
      description: 'Clearstone operates as an extension of your organization — not as a seasonal vendor. Every engagement is structured for ongoing accountability and measurable outcomes.',
      steps: [
        {_key: k(), stepNumber: '01', title: 'Assessment', description: 'We evaluate your current financial infrastructure, identify risk areas, and define the scope of engagement.'},
        {_key: k(), stepNumber: '02', title: 'Implementation', description: 'Systems are restructured, processes are standardized, and reporting frameworks are established.'},
        {_key: k(), stepNumber: '03', title: 'Ongoing Oversight', description: 'Monthly operations, compliance monitoring, and executive reporting — delivered with consistency.'},
      ],
    },
    consultationCta: {
      headline: "Let's Build Your Financial Infrastructure",
      paragraph: 'Every engagement begins with a diagnostic review. We evaluate your systems, identify compliance gaps, and recommend the precise scope of service your organization requires.',
      bullets: [
        'Individual & business tax services under one roof',
        'Full-service bookkeeping, payroll & HR outsourcing',
        'Audit-ready documentation from day one',
      ],
    },
  })

  // ── Industries Page ──
  tx.createOrReplace({
    _id: 'industriesPage', _type: 'industriesPage',
    closingCta: {
      heading: 'Financial Infrastructure That Matches Your Regulatory Environment',
      description: 'We assess your compliance exposure and build the structured financial control layer your operations demand.',
    },
    consultationCta: {
      headline: 'Compliance Architecture for Complex Organizations',
      paragraph: 'Complex organizations require accounting infrastructure that matches their regulatory environment. We assess your compliance exposure and build the financial control layer your operations demand.',
      bullets: [
        'Multi-entity and multi-state compliance architecture',
        'Industry-specific regulatory alignment',
        'Institutional-grade reporting and documentation',
      ],
    },
  })

  // ── Contact Page ──
  tx.createOrReplace({
    _id: 'contactPage', _type: 'contactPage',
    howItWorks: {
      heading: 'How It Works',
      steps: [
        {_key: k(), stepNumber: '01', title: 'Infrastructure Assessment', description: "We review your books, compliance posture, and reporting architecture to surface what's broken or missing."},
        {_key: k(), stepNumber: '02', title: 'Risk & Opportunity Analysis', description: 'We map exposure across jurisdictions and identify where tighter controls reduce liability.'},
        {_key: k(), stepNumber: '03', title: 'Clear Action Plan', description: 'You receive a prioritized roadmap — defined deliverables, timelines, and structural changes required.'},
      ],
    },
    credibilityItems: [
      'Serving clients since 2013',
      'Multi-state compliance expertise',
      'Institutional-grade reporting',
    ],
    walkAwayItems: [
      'Defined compliance exposure across entities and jurisdictions',
      'Identified reporting weaknesses and documentation gaps',
      'Prioritized structural roadmap with defined deliverables',
      'Clear next-step recommendations tied to your operations',
      'Realistic scope assessment — including whether Clearstone is the right fit',
    ],
    contactEmail: 'support@clearstoneteam.com',
  })

  // ── Knowledge Page ──
  tx.createOrReplace({
    _id: 'knowledgePage', _type: 'knowledgePage',
    categories: ['Tax', 'Payroll', 'Compliance', 'Accounting Systems'],
    resourcesHeading: 'Authoritative External Resources',
    ctaSection: {
      heading: 'Need Structured Financial Oversight?',
      description: 'Schedule a consultation to assess your compliance exposure and reporting infrastructure.',
    },
  })

  // ── Privacy Policy ──
  tx.createOrReplace({
    _id: 'privacyPolicy', _type: 'privacyPolicy',
    lastUpdated: '2026-01-01',
    sections: [
      {_key: k(), heading: '1. Information We Collect', body: tb('We collect personal information you voluntarily provide when you submit a consultation request or subscribe to our newsletter. This may include your name, email address, phone number, organization name, and state(s) of operation. We also automatically collect certain technical data such as IP address, browser type, and pages visited.')},
      {_key: k(), heading: '2. How We Use Your Information', body: tb('We use the information we collect to respond to your inquiries, deliver our accounting and compliance services, send relevant communications you\'ve opted into, and improve our website experience. We do not sell, rent, or trade your personal information to third parties.')},
      {_key: k(), heading: '3. Data Security', body: tb('We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.')},
      {_key: k(), heading: '4. Cookies', body: tb('Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.')},
      {_key: k(), heading: '5. Third-Party Services', body: tb('We may use third-party service providers to assist in operating our website and delivering services. These providers are contractually obligated to protect your information and use it only for the purposes we specify.')},
      {_key: k(), heading: '6. Your Rights', body: tb('You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, contact us at support@clearstoneteam.com.')},
      {_key: k(), heading: '7. Changes to This Policy', body: tb('We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of our website constitutes acceptance of the revised policy.')},
      {_key: k(), heading: '8. Contact', body: tbWithLink('If you have questions about this Privacy Policy, contact us at ', 'support@clearstoneteam.com', 'mailto:support@clearstoneteam.com', '.')},
    ],
  })

  // ── Terms of Service ──
  tx.createOrReplace({
    _id: 'termsOfService', _type: 'termsOfService',
    lastUpdated: '2026-01-01',
    sections: [
      {_key: k(), heading: '1. Acceptance of Terms', body: tb('By accessing and using the Clearstone website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.')},
      {_key: k(), heading: '2. Services', body: tb('Clearstone provides accounting, bookkeeping, payroll, tax, and compliance services. The specific scope of services is defined in individual client engagement agreements. Information on this website is for general informational purposes and does not constitute professional advice.')},
      {_key: k(), heading: '3. Use of Website', body: tb('You agree to use this website only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their use of the website. You may not attempt to gain unauthorized access to any part of the website or its related systems.')},
      {_key: k(), heading: '4. Intellectual Property', body: tb('All content on this website — including text, graphics, logos, and images — is the property of Clearstone and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written consent.')},
      {_key: k(), heading: '5. Disclaimer', body: tb('The information provided on this website is for general informational purposes only and should not be relied upon as professional accounting, tax, or legal advice. You should consult with a qualified professional before making financial decisions based on information found on this website.')},
      {_key: k(), heading: '6. Limitation of Liability', body: tb('Clearstone shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided herein.')},
      {_key: k(), heading: '7. Governing Law', body: tb('These Terms of Service are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.')},
      {_key: k(), heading: '8. Contact', body: tbWithLink('For questions regarding these Terms of Service, contact us at ', 'support@clearstoneteam.com', 'mailto:support@clearstoneteam.com', '.')},
    ],
  })

  console.log('Committing transaction...')
  await tx.commit()
  console.log('Phase 2 seed complete.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
