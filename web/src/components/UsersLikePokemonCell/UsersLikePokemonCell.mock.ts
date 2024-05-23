// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  usersLikePokemon: {
    totalLikes: 100,
    usersWhoLiked: [
      {
        id: 1,
        pokemonId: 1,
        User: {
          id: 1,
          fullName: 'Manuel',
          username: 'manue',
          avatar:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      },
    ],
  },
})
