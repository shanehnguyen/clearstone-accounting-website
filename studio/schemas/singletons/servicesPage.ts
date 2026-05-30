import {defineType, defineField, defineArrayMember} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'comparison',
      title: 'Comparison Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({name: 'typicalFirmLabel', title: 'Typical Firm Label', type: 'string'}),
        defineField({
          name: 'typicalFirmItems',
          title: 'Typical Firm Items',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({name: 'clearstonLabel', title: 'Clearstone Label', type: 'string'}),
        defineField({
          name: 'clearstoneItems',
          title: 'Clearstone Items',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),

    defineField({
      name: 'coreBookkeeping',
      title: 'Core Bookkeeping Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
                defineField({
                  name: 'items',
                  title: 'Items',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
              ],
              preview: {select: {title: 'title'}},
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'additionalServicesHeading',
      title: 'Additional Services Heading',
      type: 'string',
    }),

    defineField({
      name: 'howWeEngage',
      title: 'How We Engage Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{type: 'processStep'}],
        }),
      ],
    }),

    defineField({
      name: 'consultationCta',
      title: 'Consultation CTA',
      type: 'consultationCta',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Services Page'}),
  },
})
