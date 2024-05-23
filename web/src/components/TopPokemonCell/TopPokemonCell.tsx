import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'
import type {
  FindTopPokemonsQuery,
  FindTopPokemonsQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PokeCard from '../PokeCard/PokeCard'

export const QUERY: TypedDocumentNode<
  FindTopPokemonsQuery,
  FindTopPokemonsQueryVariables
> = gql`
  query FindTopPokemonsQuery {
    topPokemons: myPokemonTops {
      Pokemon {
        id
        name
        stats {
          stat
          val
        }
        image
        description
        likes
        types
        isTop
        isLiked
      }
    }
  }
`

export const Loading = () => (
  <SimpleGrid columns={{ base: 2, lg: 3, xl: 4 }} spacing={4}>
    {[...Array(12).keys()].map((num) => {
      return (
        <Box key={num}>
          <Skeleton height="400px" width="350px" />
        </Box>
      )
    })}
  </SimpleGrid>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTopPokemonsQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  topPokemons,
}: CellSuccessProps<FindTopPokemonsQuery, FindTopPokemonsQueryVariables>) => {
  return (
    <SimpleGrid columns={{ base: 2, lg: 3, xl: 4 }} spacing={4}>
      {topPokemons.map((item) => {
        return (
          <Box key={item.Pokemon.id}>
            <PokeCard refetchQueries={[QUERY]} pokemon={item.Pokemon} />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
