import {defineType, defineField} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: ComponentIcon,
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
      title: 'Category Label',
      type: 'string',
      description: 'Uppercase category like "ACCOUNTING SERVICES"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      description: 'One-line outcome statement',
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Supporting', value: 'supporting'},
        ],
        layout: 'radio',
      },
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
    select: {title: 'title', subtitle: 'serviceType'},
    prepare: ({title, subtitle}) => ({
      title,
      subtitle: subtitle === 'primary' ? 'Primary Service' : 'Supporting Service',
    }),
  },
})
