import {
  activityStreamFields, siteSettings
} from './fragments'

/**
 * Enum of Classes that should generate pages
 * @readonly
 * @enum {array}
 */
export const publicDocumentTypes = [
  'HumanMadeObject',
  'Actor',
  'Group',
  'Concept',
  'ObjectType',
  'Place',
  'Event'
]

export const actorsQuery = `
  {
    "items": *[_type in ["Actor", "Group"]] | order(label, desc){ 
      _id,
      _type,
      label,
      hasType[]-> {
        _id,
        label
      },
      image,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const alertQuery = `
  *[_type == "Alert"][0] | order(_createdAt desc) {
    ...
  }
`

export const conceptsQuery = `
  {
    "items": *[_type in ["Concept", "ObjectType"]] | order(label.nor desc){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const registryQuery = `
  {
    "items": *[_type in ["Concept", "ObjectType", "Actor", "Group"]] | order(label, label.nor){ 
      _id,
      _type,
      label,
      "count": count(*[references(^._id)]),
    },
    ${siteSettings}
  }
`

export const frontpageQuery = `
  {
    "frontpage": *[ _id == "frontpage" ][0] {
      _id,
      ...,
      navMenu-> {
        ...,
        items[] {
          ...,
          "route": landingPageRoute->.slug.current
        }
      },
      content[] {
        disabled != true => {
          ...
        },
        _type == 'MiradorGallery' && disabled != true => @{
          ...,
          items[] {
            "manifest": coalesce(manifestRef->.subjectOfManifest, manifestUrl),
            canvasUrl,
          },
        },
        _type == 'SingleObject'  && disabled != true => @{
          ...,
          item-> {
          "manifest": coalesce(subjectOfManifest, manifestUrl),
            canvasUrl,
          }
        },
        _type == 'Grid' => @{
          ...,
          items[] {
            ...,
            "route": landingPageRoute->.slug.current
          }
        }
      }
    },
    "latest": *[ _type == "HumanMadeObject"][0..10] {
      _id,
      label,
      hasType[]-> {
        ...
      },
      image,	
    },
    ${siteSettings}
  }
`

export const idsQuery = `
  *[_type in $publicDocumentTypes] {
    _id
  }
`

export const routesQuery = `
  *[ _type == "Route" ] {
    _id,
    _type,
    slug
  }
`

export const routeQuery = `
  {
    "route": *[ _type == "Route" && slug.current == $joinID ][0] {
      ...,
      page->{
        ...,
        navMenu->{
          ...,
          items[]{
            ...,
            "route": landingPageRoute->.slug.current
          }
        },
        body[] {
          ...,
          _type == 'PageHeader' => @{
            ...,
            "palette": illustration.image.asset->.metadata.palette{
              darkMuted,
              darkVibrant,
              dominant,
              lightMuted,
              vibrantMuted,
              muted,
              vibrant
            }
          },
          _type == 'MiradorGallery' => @{
            ...,
            items[] {
              _id,
              label,
              view,
              "owner": manifestRef->.hasCurrentOwner[]->{
                _id,
                label
              },
              "manifest": coalesce(
                manifestRef->.subjectOfManifest, 
                manifestUrl,
                "/api/manifest/" + manifestRef->._id
              ),
              canvasUrl,
            },
          },
          _type == 'SingleObject' => @{
            ...,
            view,
            item-> {
              _id,
              label,
              "owner": hasCurrentOwner[]-> {
                _id,
                label
              },
              "manifest": coalesce(
                subjectOfManifest, 
                manifestUrl,
                "/api/manifest/" + _id
              ),
              canvasUrl,
            }
          }
        },
        content[] {
          ...,
          _type == 'PageHeader' => @{
            ...,
            "palette": illustration.image.asset->.metadata.palette{
              darkMuted,
              darkVibrant,
              dominant,
              lightMuted,
              vibrantMuted,
              muted,
              vibrant
            }
          },
          _type == 'MiradorGallery' => @{
            ...,
            items[] {
              _id,
              label,
              view,
              "owner": manifestRef->.hasCurrentOwner[]->{
                _id,
                label
              },
              "manifest": coalesce(
                manifestRef->.subjectOfManifest, 
                manifestUrl,
                "/api/manifest/" + manifestRef->._id
              ),
              canvasUrl,
            },
          },
          _type == 'SingleObject' => @{
            ...,
            view,
            item-> {
              _id,
              label,
              "owner": hasCurrentOwner[]-> {
                _id,
                label
              },
              "manifest": coalesce(
                subjectOfManifest, 
                manifestUrl,
                "/api/manifest/" + _id
              ),
              canvasUrl,
            }
          }
        }
      }
    },
    ${siteSettings}
  }
`

export const humanMadeObjectsQuery = `{
  "items": *[_type == "HumanMadeObject"] | order(label){ 
    _id,
    _type,
    label,
    preferredIdentifier,
    homepage,
    hasType[]-> {
      _id,
      label
    },
    image,
    "description": referredToBy[]{
      ...
    },
    hasCurrentOwner[0]->{
      _id,
      label,
      image
    },
    "creation": activityStream[]{
      _type in ["Production", "BeginningOfExistence"] => @{
        "creators": contributionAssignedBy[]{
          "name": assignedActor->.label,
        	"_id": assignedActor->._id
        },
				timespan
      }
    },
    "aspectRatio": image.asset->.metadata.dimensions.aspectRatio,
  },
  ${siteSettings}
}`

export const typeQuery = `
  *[_id == $id][0] {
    _type
  }
`

export const eventsQuery = `{
  "items": *[_type in ["Activity", "Event"]]{
    ...,
    _id,
    label,
    hasType[]->{
      _id,
      label
    },
    timespan[]{
      ...,
      "orderDate": coalesce(date, beginOfTheBegin)
    },
    tookPlaceAt[]->{
      _id,
      label
    },
  },
  "objects": *[defined(activityStream) && _type != "HumanMadeObject"]{
    activityStream[featured == true]
      ${activityStreamFields}
  },
  ${siteSettings}
}`
