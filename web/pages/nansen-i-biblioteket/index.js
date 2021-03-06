import {getPhysicalExhibitionCopy} from '../../lib/api'
import Head from 'next/head'
import {Box, Container, Image, Link, Heading, Text, SimpleGrid, List, ListItem} from '@chakra-ui/react'
import PortableTextBlock from '../../components/PortableTextBlock'
import Layout from '../../components/Layout'
import { imageBuilder } from '../../lib/sanity'

export default function PhysicalExhibition({data, preview}) {
  const {item, siteSettings} = data
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Head>
        <title>{item.label} – {siteSettings.title}</title>
      </Head>

      <Container gridArea="main" my="5" maxWidth="full">
        <Heading 
          pb="5"
          mb="5"
          borderBottom="solid 1px"
          color="gray.600"
          borderColor="gray.300"
          fontSize={['2xl', '3xl', '4xl', '5xl']}
        >
          {item.label}
        </Heading>

        {/* If LinguisticDocument the content is in the body field */}
        {item.referredToBy && <PortableTextBlock blocks={item.referredToBy[0].body}/> }
      </Container>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getPhysicalExhibitionCopy(preview)
  return {
    props: {data, preview},
  }
}
