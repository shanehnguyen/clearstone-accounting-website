import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const externalResource = defineType({
  name: 'externalResource',
  title: 'External Resource',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (r) => r.required(),
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
    select: {title: 'label', subtitle: 'url'},
  },
})
