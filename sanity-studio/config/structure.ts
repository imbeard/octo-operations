import { StructureBuilder } from 'sanity/desk'
import { FolderIcon, CogIcon } from '@sanity/icons'

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