import {consultationCta} from './objects/consultationCta'
import {processStep} from './objects/processStep'
import {internalLink} from './objects/internalLink'

import {siteSettings} from './singletons/siteSettings'
import {homePage} from './singletons/homePage'
import {aboutPage} from './singletons/aboutPage'
import {servicesPage} from './singletons/servicesPage'
import {industriesPage} from './singletons/industriesPage'
import {contactPage} from './singletons/contactPage'
import {knowledgePage} from './singletons/knowledgePage'
import {privacyPolicy} from './singletons/privacyPolicy'
import {termsOfService} from './singletons/termsOfService'

import {service} from './documents/service'
import {industry} from './documents/industry'
import {article} from './documents/article'
import {externalResource} from './documents/externalResource'

export const schemaTypes = [
  // Objects
  consultationCta,
  processStep,
  internalLink,
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  industriesPage,
  contactPage,
  knowledgePage,
  privacyPolicy,
  termsOfService,
  // Documents
  service,
  industry,
  article,
  externalResource,
]
