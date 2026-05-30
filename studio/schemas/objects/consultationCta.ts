import {defineType, defineField} from 'sanity'

export const consultationCta = defineType({
  name: 'consultationCta',
  title: 'Consultation CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      validation: (r) => r.required().min(1).max(5),
    }),
  ],
})
