import {coalesceLabel} from '../helpers/helpers'

export default {
  name: 'Dimension',
  type: 'object',
  title: 'Dimensjon',
  titleEN: 'Dimension',
  fields: [
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'reference',
      to: [{type: 'DimensionType'}],
      validation: (Rule) => Rule.required(),
      options: {
        jsonld: {
          context: {
            '@type': '@id'
          }
        }
      },
    },
    {
      name: 'value',
      title: 'Verdi',
      titleEN: 'Value',
      type: 'number',
      options: {
        jsonld: {
          context: {
            "@type": "xsd:number"
          }
        }
      },
    },
    {
      name: 'hasUnit',
      title: 'Måleenhet',
      titleEN: 'Measurement unit',
      description: 'WIP, should use API',
      type: 'reference',
      to: [{type: 'MeasurementUnit'}],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'hasType.label',
      value: 'value',
      unit: 'hasUnit.label',
    },
    prepare(selection) {
      const {type, value, unit} = selection
      return {
        title: `${coalesceLabel(type)}: ${value || ''} ${coalesceLabel(unit) || ''}`,
      }
    },
  },
}
