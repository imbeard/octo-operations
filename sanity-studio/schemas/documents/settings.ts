import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton configuration - only one settings document should exist
  fieldsets: [
    {
      name: 'general',
      title: 'General Settings',
      options: { collapsible: false }
    },

    {
      name: 'services',
      title: 'Services',
      options: { collapsible: false }
    },
    {
      name: 'contact',
      title: 'Contact Information',
      options: { collapsible: false }
    }
  ],
  fields: [
    // General Settings
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required(),
      fieldset: 'general'
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of your site (appears in search results)',
      validation: Rule => Rule.max(160),
      fieldset: 'general'
    }),
    defineField({
      name: 'siteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Your website address (e.g., https://octo-operations.com)',
      validation: Rule => Rule.required(),
      fieldset: 'general'
    }),
    
    // Services
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: '360 Concepts & Ideation', value: '360-concepts-ideation' },
              { title: 'Creative Production', value: 'creative-production' },
              { title: 'Brand Strategy', value: 'brand-strategy' },
              { title: 'Octo Initiative', value: 'octo-initiative' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required().min(1),
      fieldset: 'services'
    }),
    
    // Contact Information
    defineField({
      name: 'contactEmail',
      title: 'Email',
      type: 'string',
      description: 'Contact email address',
      initialValue: 'mail@octo-operations.com',
      validation: (Rule) => Rule.required().email(),
      fieldset: 'contact'
    }),
    defineField({
      name: 'contactAddress',
      title: 'Address',
      type: 'string',
      description: 'Street address',
      initialValue: 'England Street',
      validation: (Rule) => Rule.required(),
      fieldset: 'contact'
    }),
    defineField({
      name: 'contactLocation',
      title: 'Location',
      type: 'string',
      description: 'City, postal code and country',
      initialValue: '89123 London (GB)',
      validation: (Rule) => Rule.required(),
      fieldset: 'contact'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'General configuration, services and contact information'
      }
    }
  }
}) 