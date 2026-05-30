import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'headerTagline',
      title: 'Header Tagline',
      type: 'string',
      description: 'Micro-bar text above the header',
    }),
    defineField({
      name: 'servingSince',
      title: 'Serving Since Text',
      type: 'string',
      description: 'e.g. "Serving clients since 2013"',
    }),
    defineField({
      name: 'footerScopeLine',
      title: 'Footer Scope Line',
      type: 'string',
      description: 'e.g. "Serving organizations across the United States..."',
    }),
    defineField({
      name: 'headquartersText',
      title: 'Headquarters Text',
      type: 'string',
    }),
    defineField({
      name: 'branchesText',
      title: 'Branches Text',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
