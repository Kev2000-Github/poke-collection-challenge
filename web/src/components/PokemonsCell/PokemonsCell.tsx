import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'
import type { PokemonsQuery, PokemonsQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import PokeCard from '../PokeCard/PokeCard'

export const QUERY: TypedDocumentNode<
  PokemonsQuery,
  PokemonsQueryVariables
> = gql`
  query PokemonsQuery($pagination: PaginationInput!) {
    getPokemons(pagination: $pagination) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  getPokemons: pokemons,
}: CellSuccessProps<PokemonsQuery>) => {
  return (
    <SimpleGrid columns={{ base: 2, lg: 3, xl: 4 }} spacing={4}>
      {pokemons.map((item) => {
        return (
          <Box key={item.id}>
            <PokeCard pokemon={item} />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
