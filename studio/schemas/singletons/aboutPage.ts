import {defineType, defineField, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
        }),
        defineField({name: 'image', title: 'Team Image', type: 'image', options: {hotspot: true}}),
      ],
    }),

    defineField({
      name: 'position',
      title: 'Our Position',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),

    defineField({
      name: 'setsApart',
      title: 'What Sets Us Apart',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [{type: 'block'}],
        }),
      ],
    }),

    defineField({
      name: 'pillars',
      title: 'Structural Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),

    defineField({
      name: 'differentiators',
      title: 'Why Clearstone Differentiators',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'consultationCta',
      title: 'Consultation CTA',
      type: 'consultationCta',
    }),
  ],

  preview: {
    prepare: () => ({title: 'About Page'}),
  },
})
