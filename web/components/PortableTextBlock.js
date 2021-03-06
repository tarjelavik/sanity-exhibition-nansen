import React from 'react'
import NextLink from 'next/link'
import {Heading, Link, Text} from '@chakra-ui/react'
import { BigText, Hero, Iframe, InstagramPost, PageHeader,Quote, MiradorGallery, SectionText, SingleLevelChart, SingleObject, Social, SubStory, TimelineSection, TwoColumn, Video, IllustrationWithCaption, ExhibitionElement } from './Sections'

const BlockContent = require('@sanity/block-content-to-react')

export default function PortableTextBlock(props) {
  if (!props.blocks || !Array.isArray(props.blocks) || !props.blocks.length) {
    return null
  }

  const {
    blocks,
    fontSize = {base: 'lg', sm: 'xl', md: 'xl', xl: 'xl'}, 
    lineHeight=['1.3', '1.4'], 
    fontWeight = 'normal',
    fontFamily,
    ...rest
  } = props

  const getFontSize = (level) => {
    switch(level) {
    case 'h2' :
      return {base: 'lg', sm: '2xl', md: '3xl', xl: '4xl'}
    case 'h3' :
      return {base: 'md', sm: 'xl', md: '2xl', xl: '3xl'}
    default : return null
    }
  }

  const BlockRenderer = (props) => {
    if(!props) {return null}
    const {style = 'normal'} = props.node

    if (/^h\d/.test(style)) {
      const level = style
      return(<Heading as={level} fontSize={getFontSize(level)}>{props.children}</Heading>)
    }

    if (style === 'blockquote') {
      return <blockquote>- {props.children}</blockquote>
    }

    return (
      <Text 
        maxWidth={['lg', null, 'xl', null ]}
        fontSize={fontSize} 
        lineHeight={lineHeight} 
        fontWeight={fontWeight} 
        fontFamily={fontFamily} 
        {...rest}
      >
        {props.children}
      </Text>
    )
    // Fall back to default handling
    // return BlockContent.defaultSerializers.types.block(props)
  }

  const serializers = {
    marks: {
      internalLink: ({mark, children}) => {
        const {reference} = mark
        const href = `/id/${reference._ref}`
        const text = children.length ? children[0] : children
        return (
          <Link as={NextLink} href={href}>
            {text}
          </Link>
        )
      },
      link: ({mark, children}) => {
        // console.log(children)
        // Read https://css-tricks.com/use-target_blank/
        const {blank, href} = mark
        const text = children.length ? children[0] : children
        return blank ? (
          <Link href={href} isExternal>
            {text}
          </Link>
        ) : (
          <Link href={href}>
            {text}
          </Link>
        )
      },
    },
    types: {
      code: (props) => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      block: BlockRenderer,
      BigText: (props) => (<BigText {...props.node} />),
      ExhibitionElement: (props) => (<ExhibitionElement {...props.node} />),
      Hero: (props) => (<Hero {...props.node} />),
      Iframe: (props) => (<Iframe {...props.node} />),
      IllustrationWithCaption: (props) => (<IllustrationWithCaption {...props.node} />),
      InstagramPost: (props) => (<InstagramPost {...props.node} />),
      MiradorGallery: (props) => (<MiradorGallery {...props.node} />),
      PageHeader: (props) => (<PageHeader {...props.node} />),
      Quote: (props) => (<Quote {...props.node} />),
      SectionText: (props) => (<SectionText {...props.node} />),
      SingleLevelChart: (props) => (<SingleLevelChart {...props.node} />),
      SingleObject: (props) => (<SingleObject {...props.node} />),
      Social: (props) => (<Social {...props.node} />),
      SubStory: (props) => (<SubStory {...props.node} />),
      TimelineSection: (props) => (<TimelineSection {...props.node} />),
      TwoColumn: (props) => (<TwoColumn {...props.node} />),
      Video: (props) => (<Video {...props.node} />),
      Place: (props) => (
        <div>
          <h2>Demo: referanse til dokument i en Portable Text blokk</h2>
          <p>
            <Link as={NextLink} href={`/id/${props.node._id}`}>{props.node.label.no}</Link>
          </p>
        </div>
      )
    },
  }

  return <BlockContent blocks={blocks} serializers={serializers} />
}
