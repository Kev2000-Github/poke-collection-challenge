import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  Heading,
} from '@chakra-ui/react'

import UsersLikePokemonCell from 'src/components/UsersLikePokemonCell'
import useUserLikesModal from 'src/hooks/use-user-likes-modal'

const LikesModal = () => {
  const { isOpen, onClose, id } = useUserLikesModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as="h4" fontSize={'large'} fontWeight={600}>
            Pokemon Popularity
          </Heading>
        </ModalHeader>
        <ModalBody>{id && <UsersLikePokemonCell id={id} />}</ModalBody>

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
