import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export default defineType({
	name: 'lab',
	title: 'Lab',
	type: 'document',
	icon: DocumentIcon,
	fieldsets: [
		{
			name: 'content',
			title: 'Content',
			options: { collapsible: false }
		},
		{
			name: 'seo',
			title: 'SEO Settings (Optional)',
			description: 'Custom settings for search engines. Leave empty to use site defaults.',
			options: { collapsible: true, collapsed: true }
		}
	],
	fields: [
		defineField({
			name: 'orderRank',
			title: 'Order',
			type: 'string',
			hidden: true
		}),
		defineField({
			name: 'title',
			title: 'Lab Title',
			type: 'string',
			validation: (Rule) => Rule.required().min(3).max(100),
			fieldset: 'content'
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL-friendly version of the title',
			options: {
				source: 'title',
				maxLength: 96,
				slugify: (input: string) =>
					input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/[^a-z0-9-]/g, '')
						.slice(0, 96)
			},
			validation: (Rule) => Rule.required(),
			fieldset: 'content'
		}),
		defineField({
			name: 'images',
			title: 'Lab Images',
			type: 'array',
			description: 'Drag and drop multiple images here, or click "Add item" to browse',
			options: {
				layout: 'grid',
				sortable: true
			},
			of: [
				{
					type: 'image',
					options: {
						hotspot: true
					},
					fields: [
						{
							name: 'description',
							title: 'Image Description',
							type: 'text',
							rows: 2,
							description: 'Optional description for this image'
						}
					]
				},
				// Keep old format for backward compatibility
				{
					type: 'object',
					name: 'labImage',
					title: 'Lab Image (Legacy)',
					fields: [
						{
							name: 'image',
							title: 'Image',
							type: 'image',
							options: {
								hotspot: true
							},
							validation: (Rule) => Rule.required()
						},
						{
							name: 'description',
							title: 'Image Description',
							type: 'text',
							rows: 2,
							description: 'Optional description for this image'
						}
					],
					preview: {
						select: {
							title: 'description',
							media: 'image'
						},
						prepare({ title, media }) {
							return {
								title: title || 'No description',
								media: media
							};
						}
					}
				}
			],
			fieldset: 'content'
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published Date',
			type: 'datetime',
			description: 'When this lab post was published',
			validation: (Rule) => Rule.required(),
			fieldset: 'content'
		}),
		defineField({
			name: 'content',
			title: 'Lab Content',
			type: 'text',
			rows: 10,
			description: 'The main content of the lab post',
			validation: (Rule) => Rule.required().min(10),
			fieldset: 'content'
		}),
		defineField({
			name: 'externalLink',
			title: 'Lab External link',
			type: 'url',
			description: 'external link to this blog entry',
			fieldset: 'content'
		}),
		defineField({
			name: 'seoTitle',
			title: 'Page Title',
			type: 'string',
			description: 'Custom title for this lab page (appears in browser tab and search results)',
			validation: (Rule) => Rule.max(60),
			fieldset: 'seo'
		}),
		defineField({
			name: 'seoDescription',
			title: 'Page Description',
			type: 'text',
			rows: 3,
			description: 'Brief description of this lab post (appears in search results)',
			validation: (Rule) => Rule.max(160),
			fieldset: 'seo'
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'publishedAt',
			media: 'image'
		},
		prepare({ title, subtitle, media }) {
			return {
				title: title || 'Untitled Lab',
				subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
				media: media
			};
		}
	},
	orderings: [
		{
			title: 'Published Date (Newest)',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }]
		},
		{
			title: 'Published Date (Oldest)',
			name: 'publishedAtAsc',
			by: [{ field: 'publishedAt', direction: 'asc' }]
		},
		{
			title: 'Title A-Z',
			name: 'titleAsc',
			by: [{ field: 'title', direction: 'asc' }]
		},
		{
			title: 'Title Z-A',
			name: 'titleDesc',
			by: [{ field: 'title', direction: 'desc' }]
		},
		{
			title: 'Created Date',
			name: 'createdAtDesc',
			by: [{ field: '_createdAt', direction: 'desc' }]
		}
	]
});
