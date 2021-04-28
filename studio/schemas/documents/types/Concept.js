import {FaTag} from 'react-icons/fa'
import {editorialState, accessState, label, altLabel, wasOutputOf, sameAs} from '../../props'
import {defaultFieldsets} from '../../fieldsets'
import {coalesceLabel} from '../../helpers/helpers'

export default {
  name: 'Concept',
  title: 'Concept',
  type: 'document',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaTag,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    altLabel,
    {
      name: 'broader',
      title: 'Overordnet term',
      titleEN: 'Broader',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'Concept'}]}],
    },
    /* {
      name: 'narrower',
      title: 'Underordnet term',
      titleEN: 'Narrower',
      description: 'Trenger vi narrower? Blir mye å registrere...',
      type: 'array',
      of: [
        {type: 'reference', to: [{type: 'typeClass'}]}
      ]
    }, */
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description: 'Events and activities connected to this object',
      type: 'array',
      of: [{type: 'Creation'}],
    },
    sameAs,
    wasOutputOf
  ],
  preview: {
    select: {
      title: 'label',
      broader: 'broader',
    },
    prepare(selection) {
      const {title, broader} = selection
      return {
        title: coalesceLabel(title),
        subtitle: coalesceLabel(broader)
          ? `⬆️` + coalesceLabel(broader)
          : '🔝 Overordnet type/konsept',
      }
    },
  },
}
