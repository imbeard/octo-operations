import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  // Add fieldset for better organization
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Settings (Optional)',
      description: 'Custom settings for search engines. Leave empty to use site defaults.',
      options: { collapsible: true, collapsed: true }
    },
    {
      name: 'content',
      title: 'Content',
      options: { collapsible: false }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
      fieldset: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.max(200),
      fieldset: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this page (appears in search results)',
      validation: (Rule) => Rule.max(160),
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Custom title for this page (appears in browser tab and search results)',
      validation: (Rule) => Rule.max(60),
      fieldset: 'seo',
    }),

    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add content sections to build your page',
      options: {
        layout: 'list',
        sortable: true,
      },
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          type: 'imageBlock',
        },
        {
          type: 'galleryBlock',
        },
      ],
      fieldset: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Page',
        subtitle: subtitle || 'No subtitle',
      }
    }
  },
  // Add orderable configuration
  orderings: [
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
}) 