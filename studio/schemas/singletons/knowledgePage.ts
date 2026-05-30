import {defineType, defineField} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const knowledgePage = defineType({
  name: 'knowledgePage',
  title: 'Knowledge Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'categories',
      title: 'Filter Categories',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Category filter labels. "All" is added automatically.',
    }),

    defineField({
      name: 'resourcesHeading',
      title: 'External Resources Heading',
      type: 'string',
    }),

    defineField({
      name: 'ctaSection',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
      ],
    }),
  ],

  preview: {
    prepare: () => ({title: 'Knowledge Page'}),
  },
})
