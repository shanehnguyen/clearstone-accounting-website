import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'servicesPage',
  'industriesPage',
  'contactPage',
  'knowledgePage',
  'privacyPolicy',
  'termsOfService',
])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'clearstone',
  title: 'Clearstone CMS',
  projectId: '0vv8rbrl',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Services Page')
              .id('servicesPage')
              .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
            S.listItem()
              .title('Industries Page')
              .id('industriesPage')
              .child(S.document().schemaType('industriesPage').documentId('industriesPage')),
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.listItem()
              .title('Knowledge Page')
              .id('knowledgePage')
              .child(S.document().schemaType('knowledgePage').documentId('knowledgePage')),
            S.listItem()
              .title('Privacy Policy')
              .id('privacyPolicy')
              .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
            S.listItem()
              .title('Terms of Service')
              .id('termsOfService')
              .child(S.document().schemaType('termsOfService').documentId('termsOfService')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId()!),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
