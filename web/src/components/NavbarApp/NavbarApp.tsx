import { ReactNode } from 'react'

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Link,
  Stack,
} from '@chakra-ui/react'

import { routes, Link as RWLink } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Link
    as={RWLink}
    to={path}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Link>
)

export default function NavbarApp() {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const Links = [
    { name: 'Dashboard', path: routes.home() },
    { name: 'my Top Pokemons', path: routes.topPokemon() },
  ]

  return (
    <Box bg="white" px={4}>
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={2}
        px={4}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink path={link.path} key={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        {isAuthenticated ? (
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={currentUser.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            w="100%"
          >
            <Button
              as={RWLink}
              to={routes.login()}
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
            >
              Sign In
            </Button>
            <Button
              as={RWLink}
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
        )}
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink path={link.path} key={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
