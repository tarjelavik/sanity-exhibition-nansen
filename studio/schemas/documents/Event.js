import {timespanAsString, coalesceLabel} from '../helpers/helpers'
import {FaCalendar} from 'react-icons/fa'
import {
  timespan,
  editorialState,
  accessState,
  referredToBy,
  labelSingleton,
  tookPlaceAt,
} from '../props'

export default {
  name: 'Event',
  type: 'document',
  title: 'Event',
  initialValue: {
    editorialState: 'review',
    accessState: 'secret',
  },
  icon: FaCalendar,
  fieldsets: [
    {
      name: 'state',
      title: 'Status',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'minimum',
      title: 'Basic metadata',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'timelineMedium',
      title: 'Hovedbilde (brukt i tidslinke)',
      options: {collapsible: true, collapsed: true},
    },
    {
      name: 'relations',
      title: 'Relations to other stuff',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    {
      ...referredToBy,
      fieldset: 'minimum',
    },
    {
      ...timespan,
      fieldset: 'minimum',
    },
    {
      ...tookPlaceAt,
      fieldset: 'minimum',
    },
    {
      name: 'hasType',
      title: 'Klassifisert som',
      titleEN: 'Classified as',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'EventType'}],
        },
      ],
      validation: (Rule) => Rule.required(),
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
      name: 'media',
      title: 'Media',
      titleEN: 'Media',
      type: 'MediaObject',
      fieldset: 'timelineMedium',
      options: {
        jsonld: {
          context: {
            '@type': '@json'
          }
        }
      },
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Lokasjon',
      titleEN: 'Location',
      description: 'Where the hell did this happen?!',
      options: {
        jsonld: {
          context: {
            '@type': '@json'
          }
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      bb: 'timespan.0.beginOfTheBegin',
      eb: 'timespan.0.endOfTheBegin',
      date: 'timespan.0.date',
      be: 'timespan.0.beginOfTheEnd',
      ee: 'timespan.0.endOfTheEnd',
      type: 'hasType.0.label',
    },
    prepare(selection) {
      const {title, type, bb, eb, date, be, ee} = selection
      const timespan = timespanAsString(bb, eb, date, be, ee, 'nb')
      console.log(type)
      return {
        title: title,
        subtitle: `${coalesceLabel(type)} ${timespan}`,
      }
    },
  },
}
