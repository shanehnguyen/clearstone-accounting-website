import {defineType, defineField, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
        defineField({name: 'headline', title: 'Headline', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'ctaPrimaryText', title: 'Primary CTA Text', type: 'string'}),
        defineField({name: 'ctaSecondaryText', title: 'Secondary CTA Text', type: 'string'}),
        defineField({name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'mobileSubtitle', title: 'Mobile Subtitle Bar', type: 'string'}),
      ],
    }),

    // Credibility Bar
    defineField({
      name: 'credibilityItems',
      title: 'Credibility Bar Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        }),
      ],
      validation: (r) => r.max(4),
    }),

    // Financial Infrastructure
    defineField({
      name: 'infrastructure',
      title: 'Financial Infrastructure Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
          description: 'Rich text body paragraphs',
        }),
        defineField({
          name: 'featureCards',
          title: 'Feature Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
              ],
              preview: {select: {title: 'title'}},
            }),
          ],
          validation: (r) => r.max(4),
        }),
      ],
    }),

    // Services Overview
    defineField({
      name: 'servicesOverview',
      title: 'Services Overview Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
      ],
    }),

    // Risk & Positioning
    defineField({
      name: 'risk',
      title: 'Risk & Positioning Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow Text', type: 'string'}),
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
        defineField({
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({name: 'calloutQuote', title: 'Callout Quote', type: 'string'}),
        defineField({name: 'image', title: 'Section Image', type: 'image', options: {hotspot: true}}),
      ],
    }),

    // Process
    defineField({
      name: 'process',
      title: 'Process Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{type: 'processStep'}],
          validation: (r) => r.max(5),
        }),
        defineField({name: 'ctaText', title: 'CTA Button Text', type: 'string'}),
        defineField({name: 'ctaSubtext', title: 'CTA Subtext', type: 'string'}),
      ],
    }),

    // Fit Section
    defineField({
      name: 'fit',
      title: 'Built For Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
              ],
              preview: {select: {title: 'title'}},
            }),
          ],
        }),
      ],
    }),

    // Knowledge Highlight
    defineField({
      name: 'knowledgeHighlight',
      title: 'Knowledge Highlight Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
      ],
    }),

    // FAQ
    defineField({name: 'faqHeading', title: 'FAQ Heading', type: 'string'}),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),

    // Consultation CTA
    defineField({
      name: 'consultationCta',
      title: 'Consultation CTA',
      type: 'consultationCta',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
