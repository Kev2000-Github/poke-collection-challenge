import { useState } from 'react'

import { StarIcon } from '@chakra-ui/icons'
import {
  Heading,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Divider,
  Grid,
  IconButton,
} from '@chakra-ui/react'

import { TypedDocumentNode, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import useUserLikesModal from 'src/hooks/use-user-likes-modal'
interface Pokemon {
  id: number
  name: string
  image: string
  description: string
  types: string[]
  stats: PokemonStats
  isTop?: boolean
  likes: number
  isLiked?: boolean
}

type PokemonStats = { stat: string; val: number }[]

type FaceCardProps = {
  onFlip: () => void
}

interface CardLayoutProps {
  types: Pokemon['types']
  children: React.ReactNode
  wrapperCss?: React.CSSProperties
}

const CREATE_POKEMON_LIKE = gql`
  mutation CreatePokemonLike($input: CreatePokemonLikeInput!) {
    createPokemonLike(input: $input) {
      id
    }
  }
`

const DELETE_POKEMON_LIKE = gql`
  mutation DeletePokemonLike($input: DeletePokemonLikeInput!) {
    deletePokemonLike(input: $input) {
      id
    }
  }
`

const ADD_POKEMON_TOP = gql`
  mutation CreatePokemonTop($input: CreatePokemonTopInput!) {
    createPokemonTop(input: $input) {
      id
    }
  }
`

const REMOVE_POKEMON_TOP = gql`
  mutation DeletePokemonTop($input: DeletePokemonTopInput!) {
    deletePokemonTop(input: $input) {
      id
    }
  }
`

const getColor = (types: string[]) => {
  for (const type of types) {
    switch (type) {
      case 'fire':
        return 'red.300'
      case 'water':
        return 'blue.300'
      case 'poison':
        return 'purple.300'
      case 'electric':
        return 'yellow.300'
      case 'ground':
        return 'orange.300'
      case 'grass':
        return 'green.300'
      case 'normal':
        return 'gray.300'
      case 'fairy':
        return 'pink.300'
    }
  }
  return 'green.300'
}

interface Props {
  pokemon: Pokemon
  refetchQueries?: TypedDocumentNode[]
}

export default function PokeCard({ pokemon, refetchQueries }: Props) {
  const { currentUser } = useAuth()
  const [createPokemonLike, { loading }] = useMutation(CREATE_POKEMON_LIKE, {
    refetchQueries: [...refetchQueries],
  })
  const [deletePokemonLike, { loading: isLoadingLikeRemoval }] = useMutation(
    DELETE_POKEMON_LIKE,
    {
      refetchQueries: [...refetchQueries],
    }
  )
  const [createPokemonTop, { loading: isLoadingAddPokemonTop }] = useMutation(
    ADD_POKEMON_TOP,
    {
      refetchQueries: [...refetchQueries],
    }
  )
  const [removePokemonTop, { loading: isLoadingRemovePokemonTop }] =
    useMutation(REMOVE_POKEMON_TOP, {
      refetchQueries: [...refetchQueries],
    })

  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const { onOpen } = useUserLikesModal()

  const onToggleLike = async (isLiked: boolean) => {
    try {
      const input = {
        pokemonId: pokemon.id,
        userId: currentUser.id,
      }
      if (isLiked) {
        await createPokemonLike({ variables: { input } })
        toast.success('Liked')
      } else {
        await deletePokemonLike({ variables: { input } })
        toast.success('Unliked')
      }
    } catch (error) {
      console.error('Failed to like pokemon', error)
    }
  }

  const onToggleTop = async (isTop: boolean) => {
    try {
      const input = {
        pokemonId: pokemon.id,
        userId: currentUser.id,
      }
      if (isTop) {
        await createPokemonTop({ variables: { input } })
        toast.success('added pokemon as favorite')
      } else {
        await removePokemonTop({ variables: { input } })
        toast.success('removed pokemon as favorite')
      }
    } catch (error) {
      toast.error(error.message)
      console.error('something failed', error)
    }
  }

  return (
    <Box
      w={'330px'}
      h={'500px'}
      position={'relative'}
      css={{ perspective: '1000px' }}
      boxShadow={'2xl'}
      overflow={'hidden'}
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        transition="ease-in-out"
        transitionDuration={'600ms'}
        sx={{
          transformStyle: 'preserve-3d',
          transform: isDetailsVisible ? 'rotateY(-180deg)' : '',
        }}
      >
        <FrontPokeCard
          data={pokemon}
          onFlip={() => setIsDetailsVisible(true)}
          onToggleLike={onToggleLike}
          isLikeLoading={loading || isLoadingLikeRemoval}
          isTopLoading={isLoadingAddPokemonTop || isLoadingRemovePokemonTop}
          onToggleTop={onToggleTop}
        />
        <BackPokeCard
          data={pokemon}
          onFlip={() => setIsDetailsVisible(false)}
          onOpenPopularity={() => onOpen(pokemon.id)}
        />
      </Box>
    </Box>
  )
}

const FrontPokeCard = ({
  data: { description, image, name, types, isTop, isLiked },
  onFlip,
  onToggleLike,
  isLikeLoading,
  isTopLoading,
  onToggleTop,
}: {
  data: Pokemon
  onToggleTop: (isTop: boolean) => void
  onToggleLike: (isLiked: boolean) => void
  isLikeLoading: boolean
  isTopLoading: boolean
} & FaceCardProps) => {
  const { isAuthenticated } = useAuth()
  return (
    <CardLayout types={types}>
      <Flex direction="row" justify="space-between">
        <Box>
          <Heading as="h1" size="xl">
            {name}
          </Heading>
          <Heading
            sx={{ opacity: 0.6 }}
            fontWeight={400}
            textTransform="uppercase"
            as="h3"
            size="smaller"
            pl="1"
          >
            Basic{' '}
            <Heading as="span" opacity={1} fontWeight={500} fontSize="inherit">
              #73
            </Heading>{' '}
            / 151
          </Heading>
        </Box>
        {isAuthenticated && (
          <IconButton
            isLoading={isTopLoading}
            variant="link"
            size="md"
            onClick={() => onToggleTop(!isTop)}
            color={isTop ? '#ECC94B' : 'whitesmoke'}
            rounded="100%"
            aria-label="favorite button"
            icon={<StarIcon />}
          />
        )}
      </Flex>
      <Flex justify={'end'} position="relative">
        <Image zIndex={1} w={'250px'} objectFit={'cover'} src={image} />
        <Box
          position="absolute"
          bottom="3"
          right="1"
          rounded="100%"
          w={'70%'}
          h="50px"
          bg="whitesmoke"
          opacity="0.8"
          boxShadow="xl"
          zIndex={0}
        />
      </Flex>

      <Box mt="auto">
        <Stack mb={2}>
          <Heading
            pb={4}
            fontSize="small"
            fontWeight={500}
            fontFamily={'body'}
            opacity={0.6}
          >
            {description}
          </Heading>
        </Stack>
        <Flex mt="auto" gap="4">
          <Button
            size={'sm'}
            onClick={() => onToggleLike(!isLiked)}
            isLoading={isLikeLoading}
            flex="1"
            bg={isLiked ? 'red.400' : getColor(types)}
            color={'white'}
            rounded={'md'}
            _hover={
              isAuthenticated && {
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }
            }
            isDisabled={!isAuthenticated}
          >
            {isLiked ? 'Unlike' : 'Like'}
          </Button>
          <Button
            size={'sm'}
            onClick={onFlip}
            flex="1"
            variant={'ghost'}
            color="white"
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'xl',
            }}
          >
            Flip
          </Button>
        </Flex>
      </Box>
    </CardLayout>
  )
}

const BackPokeCard = ({
  data: { stats, types, likes, isTop },
  onFlip,
  onOpenPopularity,
}: { data: Pokemon; onOpenPopularity: () => void } & FaceCardProps) => {
  const renderIsTop = () => {
    if (isTop)
      return (
        <Text
          opacity={0.6}
          fontSize="medium"
          color="green.400"
          fontWeight={500}
        >
          Yes
        </Text>
      )
    return (
      <Text opacity={0.6} fontSize="medium" color="red.400" fontWeight={500}>
        No
      </Text>
    )
  }

  return (
    <CardLayout
      types={types}
      wrapperCss={{ transform: 'rotateY(180deg) translateZ(1px)' }}
    >
      <Stack bg="#252525" h="100%" p="2" color="whitesmoke">
        <Heading fontSize="2xl" as="h2" fontWeight={600}>
          Basic Stats
        </Heading>
        <Divider borderColor={getColor(types)} />
        <Grid pt="4" templateColumns="repeat(3, 1fr)" gap={4}>
          {stats.map((stat, idx) => {
            return (
              <Box
                key={idx}
                textAlign="center"
                bg="whitesmoke"
                rounded="10"
                color="black"
              >
                <Text
                  fontSize="small"
                  textTransform={'capitalize'}
                  fontWeight={600}
                >
                  {stat.stat}
                </Text>
                <Text fontSize="small" fontWeight={400}>
                  {stat.val}
                </Text>
              </Box>
            )
          })}
        </Grid>
        <Flex pt="8" direction="row" justify="space-around" textAlign="center">
          <Stack spacing="1">
            <Heading fontSize="xl" as="h2" fontWeight={600}>
              Likes
            </Heading>
            <Divider borderColor={getColor(types)} />
            <Text opacity={0.6} fontSize="medium" fontWeight={400}>
              {likes}
            </Text>
          </Stack>
          <Stack spacing="1">
            <Heading fontSize="xl" as="h2" fontWeight={600}>
              Favorite
            </Heading>
            <Divider borderColor={getColor(types)} />
            {renderIsTop()}
          </Stack>
        </Flex>
        <Flex mt="auto" gap="4">
          <Button
            size={'sm'}
            onClick={onFlip}
            flex="1"
            variant={'ghost'}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'xl',
            }}
          >
            Flip back
          </Button>
          <Button
            size={'sm'}
            flex="1"
            bg={getColor(types)}
            color="white"
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'xl',
            }}
            onClick={onOpenPopularity}
          >
            Popularity
          </Button>
        </Flex>
      </Stack>
    </CardLayout>
  )
}

const CardLayout: React.FC<CardLayoutProps> = ({
  types,
  children,
  wrapperCss,
}) => {
  return (
    <Flex
      p={1}
      bg={getColor(types)}
      position="absolute"
      w="100%"
      h="100%"
      direction={'column'}
      css={{ backfaceVisibility: 'hidden', ...wrapperCss }}
    >
      <Box color="black" py={2} pl={2}>
        <Heading
          textTransform={'uppercase'}
          fontSize="small"
          fontWeight={500}
          as="h3"
        >
          {types.join(' / ')}
        </Heading>
      </Box>
      <Flex
        gap="1"
        direction="column"
        flex="1"
        bg="#252525"
        p={2}
        color="whitesmoke"
        position="relative"
      >
        {children}
      </Flex>
    </Flex>
  )
}
