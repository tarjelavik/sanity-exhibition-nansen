import {getFrontpage} from '../lib/api'
import Layout from '../components/Layout'
import RenderSections from '../components/Sections/RenderSection'
import { Container } from '@chakra-ui/react'

export default function Index({data, preview}) {
  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container maxW="4xl" p="10">
        {data.frontpage.content && <RenderSections sections={data.frontpage.content} />}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getFrontpage(preview)
  return {
    props: {data, preview},
  }
}
