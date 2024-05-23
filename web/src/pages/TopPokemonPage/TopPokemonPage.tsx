import { Flex, Heading, Box } from '@chakra-ui/react'

import { Metadata } from '@redwoodjs/web'

import TopPokemonCell from 'src/components/TopPokemonCell'

const TopPokemonPage = () => {
  return (
    <>
      <Metadata title="TopPokemon" description="TopPokemon page" />

      <Flex
        direction={'column'}
        alignItems={'center'}
        gap={8}
        w="100%"
        h="100%"
        p="4"
      >
        <Heading
          textAlign="center"
          textTransform="uppercase"
          as="h1"
          fontSize="2xl"
        >
          Pokemon Library
        </Heading>
        <Box w="fit-content">
          <TopPokemonCell />
        </Box>
      </Flex>
    </>
  )
}

export default TopPokemonPage
