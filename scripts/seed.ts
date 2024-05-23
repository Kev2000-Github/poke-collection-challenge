import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import CryptoJS from 'crypto-js'

function hashPassword(text: string, salt?: string) {
  const useSalt = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()

  return [
    CryptoJS.PBKDF2(text, useSalt, { keySize: 256 / 32 }).toString(),
    useSalt,
  ]
}

const getUserData: (
  data: Omit<Prisma.UserCreateArgs['data'], 'salt' | 'hashedPassword'>
) => Prisma.UserCreateArgs['data'] = (data) => {
  const [hashedPassword, salt] = hashPassword('12345')
  return {
    ...data,
    salt,
    hashedPassword,
  }
}

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const data: Prisma.UserCreateArgs['data'][] = [
      getUserData({
        username: 'albertoMendez',
        fullName: 'Alberto Mendoza',
        pokemonLike: {
          create: [
            { pokemonId: 1 },
            { pokemonId: 2 },
            { pokemonId: 3 },
            { pokemonId: 4 },
            { pokemonId: 5 },
          ],
        },
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      }),
      getUserData({
        username: 'carlitos',
        fullName: 'Carlos Rodriguez',
        pokemonLike: {
          create: [
            { pokemonId: 1 },
            { pokemonId: 2 },
            { pokemonId: 3 },
            { pokemonId: 4 },
            { pokemonId: 5 },
          ],
        },
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      }),
      getUserData({
        username: 'juanitos',
        fullName: 'Juan Manzano',
        pokemonLike: {
          create: [
            { pokemonId: 1 },
            { pokemonId: 2 },
            { pokemonId: 3 },
            { pokemonId: 4 },
            { pokemonId: 5 },
          ],
        },
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      }),
      getUserData({
        username: 'drake',
        fullName: 'drake bell',
        pokemonLike: {
          create: [
            { pokemonId: 1 },
            { pokemonId: 2 },
            { pokemonId: 3 },
            { pokemonId: 4 },
            { pokemonId: 5 },
          ],
        },
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      }),
    ]
    console.log(
      "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
    )

    if ((await db.user.count()) === 0) {
      // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
      // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
      await Promise.all(
        data.map(async (data: Prisma.UserCreateArgs['data']) => {
          const record = await db.user.create({ data })
          console.log(record)
        })
      )
    } else {
      console.log('Users already seeded')
    }

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/auth-dbauth-api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (const user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
