import { type SchemaTypeDefinition } from 'sanity'
import page from '../schemas/documents/page'
import project from '../schemas/documents/project'
import settings from '../schemas/documents/settings'
import lab from '../schemas/documents/lab'
import imageBlock from '../schemas/blocks/imageBlock'
import galleryBlock from '../schemas/blocks/galleryBlock'

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  project,
  settings,
  lab,
  imageBlock,
  galleryBlock,
] 