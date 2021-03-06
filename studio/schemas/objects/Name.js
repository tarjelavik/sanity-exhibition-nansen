import {timespan, referredToBy} from '../props'
import {defaultFieldsets} from '../fieldsets'
import { coalesceLabel } from '../helpers/helpers'

export default {
  name: 'Name',
  type: 'object',
  title: 'Navn',
  titleEN: 'Name',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'content',
      title: 'Navn',
      titleEN: 'Name',
      type: 'string',
    },
    {
      name: 'hasType',
      title: 'Type',
      titleEN: 'Type',
      type: 'reference',
      to: [{type: 'AppelationType'}],
      options: {
        jsonld: {
          context: {
            '@type': '@id'
          }
        }
      },
    },
    {
      name: 'part',
      title: 'Deler',
      titleEN: 'Part',
      type: 'array',
      of: [{type: 'Name'}],
      options: {
        jsonld: {
          context: {
            '@container': '@set',
            '@type': '@id'
          }
        }
      },
    },
    {
      name: 'language',
      title: 'Språk',
      titleEN: 'Language',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'Language'}]}],
      options: {
        jsonld: {
          context: {
            '@container': '@set',
            '@type': '@id'
          }
        }
      },
    },
    timespan,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'content',
      type: 'hasType.label',
      lang: 'language.0.label',
    },
    prepare(selection) {
      const {title, type, lang} = selection
      return {
        title: coalesceLabel(title),
        subtitle: `${type} ${lang ? 'på ' + coalesceLabel(lang) : ''}`,
      }
    },
  },
}
