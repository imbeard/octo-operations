import { StructureBuilder } from 'sanity/desk'
import { FolderIcon, CogIcon, DocumentIcon } from '@sanity/icons'

// Custom desk structure with enhanced organization
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      
      
      // Projects (multi-page)
      S.listItem()
        .title('Projects')
        .icon(FolderIcon)
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .filter('_type == "project"')
            .defaultOrdering([{field: 'projectNumber', direction: 'asc'}])
        ),
      
      // Lab (multi-page)
      S.listItem()
        .title('Lab')
        .icon(DocumentIcon)
        .child(
          S.documentTypeList('lab')
            .title('Lab Posts')
            .filter('_type == "lab"')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        ),
      
      // Divider
      S.divider(),
      
      // Settings (singleton)
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
    ]) 