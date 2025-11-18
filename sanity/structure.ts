import type {StructureResolver} from 'sanity/structure'
import { BiBookOpen, BiBriefcase, BiUser, BiTrophy, BiEnvelope } from 'react-icons/bi'
import { HiLightBulb } from 'react-icons/hi'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Profile (Singleton)
      S.listItem()
        .title('Profile')
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
        ),
      
      S.divider(),

      // T.I.L Section
      S.listItem()
        .title('T.I.L (Today I Learned)')
        .icon(HiLightBulb)
        .child(
          S.documentTypeList('til')
            .title('Today I Learned')
            .filter('_type == "til"')
            .defaultOrdering([{field: 'date', direction: 'desc'}])
            .canHandleIntent((intent, params) => {
              return intent === 'create' && params.type === 'til'
            })
        ),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(BiBookOpen)
        .child(
          S.documentTypeList('Post')
            .title('Blog Posts')
            .filter('_type == "Post"')
        ),

      S.divider(),

      // Projects
      S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects')
        ),

      // Work Experience
      S.listItem()
        .title('Work Experience')
        .icon(BiBriefcase)
        .child(
          S.documentTypeList('job')
            .title('Work Experience')
        ),

      S.divider(),

      // Contact Submissions
      S.listItem()
        .title('Contact Submissions')
        .icon(BiEnvelope)
        .child(
          S.documentTypeList('contact')
            .title('Contact Submissions')
            .filter('_type == "contact"')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}])
        ),

      S.divider(),

      // Heroes
      S.listItem()
        .title('Heroes')
        .icon(BiTrophy)
        .child(
          S.documentTypeList('heroe')
            .title('Heroes')
        ),

      // Author
      S.listItem()
        .title('Author')
        .icon(BiUser)
        .child(
          S.documentTypeList('author')
            .title('Author')
        ),
    ])
