import {timespanAsString} from '../helpers/helpers'

export default {
  name: 'Alert',
  type: 'document',
  title: 'Varsel',
  titleEN: 'Alert',
  fieldsets: [
    {
      name: 'validPeriod',
      title: 'Gyldig fra og til dato',
      options: {collapsible: false, collapsed: false, columns: 2},
    },
  ],
  fields: [
    {
      name: 'content',
      type: 'simpleBlockContent',
      title: 'Innhold',
      titleEN: 'Content',
      description: 'Beskriv varselet',
      descriptionEN: 'Describe what the alert is all about',
      options: {
        jsonld: {
          context: {
            '@type': '@json'
          }
        }
      },
    },
    {
      name: 'showAlert',
      type: 'boolean',
      title: 'Skal varselet være offentlig?',
      titleEN: 'Should the alert be public?',
      options: {
        jsonld: {
          context: {
            "@type": "http://www.w3.org/2001/XMLSchema#boolean"
          }
        }
      },
    },
    {
      name: 'validFrom',
      type: 'date',
      title: 'Gyldig fra',
      titleEN: 'Valid from',
      fieldset: 'validPeriod',
      options: {
        jsonld: {
          context: {
            "@type": "http://www.w3.org/2001/XMLSchema#date"
          }
        }
      },
    },
    {
      name: 'validTo',
      type: 'date',
      title: 'Gyldig til',
      titleEN: 'Valid to',
      fieldset: 'validPeriod',
      options: {
        jsonld: {
          context: {
            "@type": "http://www.w3.org/2001/XMLSchema#date"
          }
        }
      },
    },
  ],
  preview: {
    select: {
      content: 'content',
      bb: 'validFrom',
      ee: 'validTo',
      showAlert: 'showAlert',
    },
    prepare(selection) {
      const {content, bb, ee, showAlert} = selection
      const block = content[0]
      const eb = '',
        date = '',
        be = ''
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      const isPublic = showAlert === true ? 'Offentlig' : 'Ikke synlig'

      return {
        title: block
          ? block.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        subtitle: `${isPublic ? isPublic + ': ' : ''}${timespan}`,
      }
    },
  },
}
