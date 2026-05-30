import {defineType, defineField} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons'

export const industriesPage = defineType({
  name: 'industriesPage',
  title: 'Industries Page',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'closingCta',
      title: 'Closing CTA Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
      ],
    }),

    defineField({
      name: 'consultationCta',
      title: 'Consultation CTA',
      type: 'consultationCta',
    }),
  ],

  preview: {
    prepare: () => ({title: 'Industries Page'}),
  },
})
