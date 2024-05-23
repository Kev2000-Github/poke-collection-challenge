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

import { useAuth } from 'src/auth'
import useUserLikesModal from 'src/hooks/use-user-likes-modal'

interface Pokemon {
  id: number
  name: string
  image: string
  description: string
  types: string[]
  stats: PokemonStats
  isTop: boolean
  likes: number
  isLiked: boolean
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

const color = 'green.300'

export default function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const { onOpen } = useUserLikesModal()
  return (
    <Box
      w={'350px'}
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
          onToggleLike={() => {}}
          onToggleTop={() => {}}
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
  onToggleTop,
}: {
  data: Pokemon
  onToggleTop: (isTop: boolean) => void
  onToggleLike: (isLiked: boolean) => void
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
            flex="1"
            bg={isLiked ? 'red.400' : color}
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
        <Divider borderColor={color} />
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
            <Divider borderColor={color} />
            <Text opacity={0.6} fontSize="medium" fontWeight={400}>
              {likes}
            </Text>
          </Stack>
          <Stack spacing="1">
            <Heading fontSize="xl" as="h2" fontWeight={600}>
              Favorite
            </Heading>
            <Divider borderColor={color} />
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
            bg={color}
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
      bg={color}
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
