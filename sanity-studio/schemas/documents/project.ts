import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderIcon,
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
      name: 'projectNumber',
      title: 'Project Number',
      type: 'string',
      description: 'Project number (e.g., 001, 002, etc.)',
      validation: (Rule) => Rule.required().min(3).max(10),
      fieldset: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
      fieldset: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Project Subtitle',
      type: 'string',
      description: 'Optional subtitle for the project',
      validation: (Rule) => Rule.max(100),
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
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the project',
      validation: (Rule) => Rule.max(500),
      fieldset: 'content',
    }),
    defineField({
      name: 'place',
      title: 'Project Place',
      type: 'string',
      description: 'Location or place where the project was executed',
      validation: (Rule) => Rule.max(100),
      fieldset: 'content',
    }),
    defineField({
      name: 'tags',
      title: 'Project Tags',
      type: 'array',
      description: 'Add tags for this project',
      of: [
        {
          type: 'string',
          validation: (Rule) => Rule.max(20),
        }
      ],
      options: {
        layout: 'tags',
      },
      fieldset: 'content',
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      description: 'Add images for this project',
      options: {
        layout: 'grid',
        sortable: true,
      },
      of: [
        {
          type: 'object',
          name: 'projectImage',
          title: 'Project Image',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Image Description',
              type: 'text',
              rows: 2,
              description: 'Optional description for this image',
            },
          ],
          preview: {
            select: {
              title: 'description',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'No description',
                media: media,
              }
            }
          }
        }
      ],
      fieldset: 'content',
    }),

    defineField({
      name: 'seoTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Custom title for this project page (appears in browser tab and search results)',
      validation: (Rule) => Rule.max(60),
      fieldset: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this project (appears in search results)',
      validation: (Rule) => Rule.max(160),
      fieldset: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'projectNumber',
      media: 'images.0.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle || 'No project number',
        media: media,
      }
    }
  },
  orderings: [
    {
      title: 'Project Number',
      name: 'projectNumberAsc',
      by: [{ field: 'projectNumber', direction: 'asc' }]
    },
    {
      title: 'Project Number Desc',
      name: 'projectNumberDesc',
      by: [{ field: 'projectNumber', direction: 'desc' }]
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
}) 