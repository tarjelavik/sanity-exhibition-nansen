import {imageBuilder} from '../../lib/sanity'
import dynamic from 'next/dynamic'
import {Grid, Container, Box, Image, Center, Heading, Text} from '@chakra-ui/react'
import PortableTextBlock from '../PortableTextBlock'

export default function Illustration(props) {
  if (!props && !props.image) {
    return null
  }
  
  const {image} = props

  return (
    <Container maxW={["3xl", "3xl", "3xl", "6xl"]}>
      <Grid
        maxW={["xl", "xl", "xl", "6xl"]}
        my={10}
        gridGap={5}
        alignContent="start"
        gridTemplateAreas={{base: '"image" "metadata"', lg: '"image metadata"'}}
        gridTemplateColumns={{base: '100%', lg: '10fr 4fr'}}
      >
        <Box gridArea="image">
          <Image
            h="100%"
            width="100%"
            src={imageBuilder.image(image).height(500).width(1000).url()}
            alt={''}
          />
        </Box>

        <Box fontFamily="Montserrat" gridArea="metadata" pr="10">
          <Text fontSize={{base: "sm", sm: "sm", md: "md", xl: "md"}} >
            Bildetekst ikke implementert
          </Text>
          {/* <Heading 
            fontFamily="Montserrat" 
            fontWeight="semibold" 
            color="red.600" 
            fontSize={{base: "sm", sm: "sm", md: "md", xl: "xl"}} 
            mb={1}
          >
            {title}
          </Heading>

          {description && (
            <PortableTextBlock 
              fontSize={{base: "sm", sm: "sm", md: "md", xl: "md"}} 
              fontWeight="200" 
              blocks={description} 
            />
          )} */}
        </Box>
      </Grid>
    </Container>
  )
}
