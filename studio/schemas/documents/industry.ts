import {defineType, defineField} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'approachLabel',
      title: 'Approach Label',
      type: 'string',
      description: 'e.g. "Control Framework", "Accountability Infrastructure"',
    }),
    defineField({
      name: 'riskDescription',
      title: 'Risk Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'bullets',
      title: 'Capability Bullets',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (r) => r.required().integer().min(0),
    }),
  ],

  orderings: [
    {title: 'Sort Order', name: 'sortOrderAsc', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],

  preview: {
    select: {title: 'title', subtitle: 'approachLabel'},
  },
})
