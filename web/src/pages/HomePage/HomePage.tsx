import { useState } from 'react'

import { Box, Button, Flex, Heading } from '@chakra-ui/react'

import { Metadata } from '@redwoodjs/web'

import PokemonsCell from 'src/components/PokemonsCell'

const HomePage = () => {
  const [page, setPage] = useState(1)

  return (
    <>
      <Metadata title="Home" description="Home page" />

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
          <PokemonsCell pagination={{ page }} />
        </Box>
        <Flex direction={'row'} gap="4">
          <Button isDisabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
        </Flex>
      </Flex>
    </>
  )
}

export default HomePage
