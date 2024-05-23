/*
  Warnings:

  - A unique constraint covering the columns `[userId,pokemonId]` on the table `PokemonLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,pokemonId]` on the table `PokemonTop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PokemonLike_userId_pokemonId_key` ON `PokemonLike`(`userId`, `pokemonId`);

-- CreateIndex
CREATE UNIQUE INDEX `PokemonTop_userId_pokemonId_key` ON `PokemonTop`(`userId`, `pokemonId`);
