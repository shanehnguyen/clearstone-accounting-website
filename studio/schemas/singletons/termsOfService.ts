import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const termsOfService = defineType({
  name: 'termsOfService',
  title: 'Terms of Service',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required()}),
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
  ],

  preview: {
    prepare: () => ({title: 'Terms of Service'}),
  },
})
