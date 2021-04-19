import {orderBy} from 'lodash'
import {getEvents} from '../../lib/api'
import Layout from '../../components/Layout'
import {Badge, Container, Heading, Box, List, ListItem, useColorModeValue} from '@chakra-ui/react'
import Link from '../../components/Link'
import RenderActivityStreamObject from '../../components/RenderActivityStreamObject'

export default function Register({data, preview}) {
  const tagColor = useColorModeValue('blackAlpha', 'red')

  return (
    <Layout preview={preview} site={data.siteSettings}>
      <Container my="5" maxWidth="6xl">
        <Heading 
          fontSize={["2xl", "3xl", "4xl", "5xl"]}
          py="5"
          mb="5"
          borderBottom="solid 1px"
          color="gray.600"
          borderColor="gray.300"
        >
          Hendelser
        </Heading>
        
        {data.items && <RenderActivityStreamObject sections={data.items} />}

      </Container>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  let data = await getEvents(preview)
  data.items = orderBy(data.items, ['timespan[0].orderDate'])

  return {
    props: {data, preview},
  }
}
