import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  List,
  ListItem,
  Text,
  Avatar,
  Flex,
  Stack,
  Heading,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const data = [
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
  {
    username: 'albertoMendez',
    name: 'Alberto Mendoza',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  },
]

const LikesModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h4" fontSize={'medium'} fontWeight={600}>
            People who liked this pokemon{' '}
            <Text as="span" opacity={0.5}>
              (100)
            </Text>
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List height={'60vh'} overflowY={'scroll'}>
            {data.map((user, idx) => (
              <ListItem key={idx}>
                <Flex
                  w="100%"
                  p="4"
                  rounded="sm"
                  direction="row"
                  justify="start"
                  gap="2"
                >
                  <Avatar name={user.name} src={user.avatar} />
                  <Stack spacing="1" ml="4">
                    <Heading fontSize={'medium'} fontWeight={500} as="h4">
                      @{user.username}
                    </Heading>
                    <Text fontSize="small" opacity={0.6}>
                      {user.name}
                    </Text>
                  </Stack>
                </Flex>
              </ListItem>
            ))}
          </List>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LikesModal
