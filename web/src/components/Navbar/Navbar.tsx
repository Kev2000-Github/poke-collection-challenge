import { Box, Flex, Button, Stack } from '@chakra-ui/react'

import { Link } from '@redwoodjs/router'
import { routes } from '@redwoodjs/router'

export default function Navbar() {
  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
        justify={'end'}
      >
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          w="100%"
        >
          <Button
            as={Link}
            to={routes.login()}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            to={routes.signup()}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            _hover={{
              bg: 'green.300',
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
