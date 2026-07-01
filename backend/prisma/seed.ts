import prisma from '../lib/prisma'

async function main() {
  console.log('🌱 Seeding database...')

  // Crear usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: '$2a$10$8K0G.0Jq8V9KqZ4K8K0G.0Jq8V9KqZ4K8K0G.0Jq8V9KqZ4K8K0G', // test123
      name: 'Usuario Prueba',
      role: 'ADMIN',
    },
  })

  console.log(`✅ Created/updated user: ${user.email}`)

  // Crear versículos de ejemplo (básico)
  const verses = [
    {
      book: 'Juan',
      chapter: 3,
      verse: 16,
      text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
      language: 'es',
      version: 'RVR1960',
    },
  ]

  for (const verse of verses) {
    await prisma.bibleVerse.upsert({
      where: {
        book_chapter_verse_language: {
          book: verse.book,
          chapter: verse.chapter,
          verse: verse.verse,
          language: verse.language,
        },
      },
      update: {},
      create: verse,
    })
  }

  console.log(`✅ Created/updated ${verses.length} bible verses`)
  console.log('✨ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
