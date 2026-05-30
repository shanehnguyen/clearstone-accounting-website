import type {PortableTextBlock} from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {x: number; y: number; width: number; height: number}
}

// Shared objects

export interface ConsultationCtaData {
  headline: string
  paragraph: string
  bullets: string[]
}

export interface ProcessStepData {
  _key: string
  stepNumber: string
  title: string
  description: string
}

export interface InternalLinkData {
  _key: string
  text: string
  url: string
}

// Homepage

export interface CredibilityItem {
  _key: string
  label: string
  value: string
  subtitle: string
}

export interface FeatureCard {
  _key: string
  title: string
  description: string
}

export interface FitItem {
  _key: string
  title: string
  description: string
}

export interface FaqItem {
  _key: string
  question: string
  answer: string
}

export interface HomePageData {
  hero: {
    tagline: string
    headline: string
    description: string
    ctaPrimaryText: string
    ctaSecondaryText: string
    backgroundImage: SanityImage
    mobileSubtitle: string
  }
  credibilityItems: CredibilityItem[]
  infrastructure: {
    heading: string
    body: PortableTextBlock[]
    featureCards: FeatureCard[]
  }
  servicesOverview: {
    heading: string
    description: string
  }
  risk: {
    eyebrow: string
    heading: string
    description: string
    bullets: string[]
    calloutQuote: string
    image: SanityImage
  }
  process: {
    heading: string
    steps: ProcessStepData[]
    ctaText: string
    ctaSubtext: string
  }
  fit: {
    heading: string
    items: FitItem[]
  }
  knowledgeHighlight: {
    heading: string
    description: string
  }
  faqHeading: string
  faqs: FaqItem[]
  consultationCta: ConsultationCtaData
}

// Services

export interface ServiceData {
  _id: string
  title: string
  slug: {current: string}
  category: string
  description: string
  outcome: string
  capabilities: string[]
  serviceType: 'primary' | 'supporting'
  sortOrder: number
}

// Articles

export interface ArticleData {
  _id: string
  title: string
  slug: {current: string}
  category: string
  label: string
  summary: string
  publishedDate: string
  readTime: string
  sections: {
    _key: string
    heading: string
    body: PortableTextBlock[]
  }[]
  callout: string
  ctaHeadline: string
  internalLinks: InternalLinkData[]
}

export interface ArticleListItem {
  _id: string
  title: string
  slug: {current: string}
  category: string
  summary: string
  publishedDate: string
  readTime: string
}

// Industries

export interface IndustryData {
  _id: string
  title: string
  approachLabel: string
  riskDescription: string
  bullets: string[]
  sortOrder: number
}

// Site Settings

export interface SiteSettingsData {
  companyName: string
  email: string
  phone: string
  headerTagline: string
  servingSince: string
  footerScopeLine: string
  headquartersText: string
  branchesText: string
  logo: SanityImage
}

// About Page

export interface AboutPageData {
  story: {
    heading: string
    body: PortableTextBlock[]
    image: SanityImage
  }
  position: {
    heading: string
    body: PortableTextBlock[]
  }
  setsApart: {
    heading: string
    body: PortableTextBlock[]
  }
  pillars: {_key: string; title: string; description: string}[]
  differentiators: string[]
  consultationCta: ConsultationCtaData
}

// Services Page (singleton)

export interface ServicesPageData {
  comparison: {
    heading: string
    description: string
    typicalFirmLabel: string
    typicalFirmItems: string[]
    clearstonLabel: string
    clearstoneItems: string[]
  }
  coreBookkeeping: {
    heading: string
    cards: {_key: string; title: string; items: string[]}[]
  }
  additionalServicesHeading: string
  howWeEngage: {
    heading: string
    description: string
    steps: ProcessStepData[]
  }
  consultationCta: ConsultationCtaData
}

// Industries Page (singleton)

export interface IndustriesPageData {
  closingCta: {
    heading: string
    description: string
  }
  consultationCta: ConsultationCtaData
}

// Contact Page

export interface ContactPageData {
  howItWorks: {
    heading: string
    steps: ProcessStepData[]
  }
  credibilityItems: string[]
  walkAwayItems: string[]
  contactEmail: string
}

// Knowledge Page (singleton)

export interface KnowledgePageData {
  categories: string[]
  resourcesHeading: string
  ctaSection: {
    heading: string
    description: string
  }
}

// External Resources

export interface ExternalResourceData {
  _id: string
  label: string
  description: string
  url: string
  sortOrder: number
}

// Legal Pages

export interface LegalPageData {
  lastUpdated: string
  sections: {
    _key: string
    heading: string
    body: PortableTextBlock[]
  }[]
}
