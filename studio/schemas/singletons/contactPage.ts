import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'howItWorks',
      title: 'How It Works Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{type: 'processStep'}],
        }),
      ],
    }),

    defineField({
      name: 'credibilityItems',
      title: 'Credibility Bar Items',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short credential statements shown above the form',
    }),

    defineField({
      name: 'walkAwayItems',
      title: 'Walk Away Items',
      type: 'array',
      of: [{type: 'string'}],
      description: 'What the client will walk away with after consultation',
    }),

    defineField({
      name: 'contactEmail',
      title: 'Direct Contact Email',
      type: 'string',
      description: 'Shown in the contact strip below the form',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Contact Page'}),
  },
})
