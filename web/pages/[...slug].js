import {CMS_NAME} from '../lib/constants'
import {getRoute, getRoutes} from '../lib/api'
import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sections from '../components/Sections/Sections'
import {Heading} from '@chakra-ui/react'
import PortableTextBlock from '../components/PortableTextBlock'

export default function Page({data, preview}) {
  const {content, body} = data.route.page
  return (
    <>
      <Layout preview={preview} site={data.siteSettings}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>

        {/* A Page  */}
        {content && <Sections sections={content} />}

        {/* If LinguisticDocument the content is in the body field */}
        {body && <PortableTextBlock blocks={body}/>}
      </Layout>
    </>
  )
}

export async function getStaticProps({params, preview = false}) {
  const data = await getRoute(preview, params.slug)
  return {
    props: {data, preview},
  }
}

export async function getStaticPaths() {
  const routes = await getRoutes()
  return {
    paths:
      routes?.map((item) => ({
        params: {
          slug: item.slug.current.split('/'),
        },
      })) || [],
    fallback: false,
  }
}
