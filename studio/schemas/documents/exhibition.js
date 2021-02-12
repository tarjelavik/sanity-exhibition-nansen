import {FaGlasses} from 'react-icons/fa'
import {
  editorialState,
  accessState,
  referredToBy,
  labelSingleton,
  identifiedBy,
  language,
  tookPlaceAt,
} from '../props'
import {defaultFieldsets} from '../fieldsets'
import {coalesceLabel} from '../helpers/helpers'

export default {
  title: 'Exhibition',
  name: 'exhibition',
  description: 'Should be fetched from KulturNav',
  type: 'document',
  initialValue: {
    editorialState: 'draft',
    accessState: 'secret',
  },
  icon: FaGlasses,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    labelSingleton,
    identifiedBy,
    language,
    {
      name: 'creator',
      title: 'Skaper',
      titleEN: 'Author',
      description:
        'Registrer en eller flere aktører som har skapt dette dokumentet, gjerne med hvilken rolle de hadde.',
      type: 'array',
      of: [
        {
          type: 'contributionAssignment',
        },
      ],
    },
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{type: 'creation'}, {type: 'move'}],
    },
    tookPlaceAt,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: coalesceLabel(title),
      }
    },
  },
}
