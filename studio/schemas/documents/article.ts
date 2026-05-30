import {defineType, defineField, defineArrayMember} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Tax', 'Payroll', 'Compliance', 'Accounting Systems'],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Technical Brief", "Advisory Insight"',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "3 min read"',
    }),
    defineField({
      name: 'sections',
      title: 'Article Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
    defineField({
      name: 'callout',
      title: 'Callout Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
    defineField({
      name: 'internalLinks',
      title: 'Internal Links',
      type: 'array',
      of: [{type: 'internalLink'}],
    }),
  ],

  orderings: [
    {title: 'Published Date', name: 'dateDesc', by: [{field: 'publishedDate', direction: 'desc'}]},
  ],

  preview: {
    select: {title: 'title', subtitle: 'category'},
  },
})
