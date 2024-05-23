import {
  Box,
  Heading,
  Text,
  Avatar,
  List,
  ListItem,
  Stack,
  Flex,
} from '@chakra-ui/react'
import type {
  FindUsersLikePokemonQuery,
  FindUsersLikePokemonQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindUsersLikePokemonQuery,
  FindUsersLikePokemonQueryVariables
> = gql`
  query FindUsersLikePokemonQuery($id: Int!) {
    usersLikePokemon: pokemonLikesByPokemonId(pokemonId: $id) {
      totalLikes
      usersWhoLiked {
        id
        pokemonId
        User {
          id
          fullName
          username
          avatar
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUsersLikePokemonQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  usersLikePokemon: { totalLikes, usersWhoLiked },
}: CellSuccessProps<
  FindUsersLikePokemonQuery,
  FindUsersLikePokemonQueryVariables
>) => {
  return (
    <Box>
      <Heading as="h4" fontSize={'medium'} fontWeight={600}>
        People who liked this pokemon{' '}
        <Text as="span" opacity={0.5}>
          ({totalLikes})
        </Text>
      </Heading>
      <List height={'60vh'} overflowY={'auto'}>
        {usersWhoLiked.map(({ User: user }, idx) => (
          <ListItem key={idx}>
            <Flex
              w="100%"
              p="4"
              rounded="sm"
              direction="row"
              justify="start"
              gap="2"
            >
              <Avatar name={user.username} src={user.avatar} />
              <Stack spacing="1" ml="4">
                <Heading fontSize={'medium'} fontWeight={500} as="h4">
                  @{user.username}
                </Heading>
                <Text fontSize="small" opacity={0.6}>
                  {user.fullName}
                </Text>
              </Stack>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
