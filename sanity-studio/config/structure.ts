import { StructureBuilder } from 'sanity/desk';
import { FolderIcon, CogIcon, DocumentIcon } from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// Custom desk structure with enhanced organization
export const structure = (S: StructureBuilder, context: any) =>
	S.list()
		.title('Content')
		.items([
			// Projects (multi-page with drag-and-drop ordering)
			orderableDocumentListDeskItem({
				type: 'project',
				title: 'Projects',
				icon: FolderIcon,
				S,
				context
			}),

			// Lab (multi-page with drag-and-drop ordering)
			orderableDocumentListDeskItem({
				type: 'lab',
				title: 'Lab',
				icon: DocumentIcon,
				S,
				context
			}),

			// Divider
			S.divider(),

			// Settings (singleton)
			S.listItem()
				.title('Settings')
				.icon(CogIcon)
				.child(S.document().schemaType('settings').documentId('settings'))
		]);
