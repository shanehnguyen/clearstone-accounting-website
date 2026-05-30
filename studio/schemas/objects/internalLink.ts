import {defineType, defineField} from 'sanity'

export const internalLink = defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Link Text',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL Path',
      type: 'string',
      description: 'Internal path like /services#accounting',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'url'},
  },
})
