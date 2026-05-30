import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
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
    prepare: () => ({title: 'Privacy Policy'}),
  },
})
