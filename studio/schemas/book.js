// -----------------------------------------------------------------------------
// Sanity schema for a Library book.
//
// Copy this file into your Sanity Studio project's schema folder and register
// it (see ../README.md). It matches the shape the website's Library page reads
// via src/lib/libraryStore.js:
//   book -> title, author, language, topic, year, pages, summary,
//           fullBookPdf, previewPdf, chapters[]
//   chapter -> title, pages, pdf (download), previewPdf (read online)
// -----------------------------------------------------------------------------
export default {
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'author', title: 'Author', type: 'string' },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'e.g. Sanskrit, Prakrit, Hindi, Gujarati',
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'e.g. Philosophy, Spirituality, Ritual',
    },
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'pages',
      title: 'Total pages',
      type: 'number',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    },
    {
      name: 'fullBookPdf',
      title: 'Full book PDF (download whole book)',
      type: 'file',
      options: { accept: '.pdf' },
    },
    {
      name: 'previewPdf',
      title: 'Preview PDF (optional — short excerpt to read online)',
      description: 'If empty, the full book PDF is used for the online reader.',
      type: 'file',
      options: { accept: '.pdf' },
    },
    {
      name: 'chapters',
      title: 'Chapters',
      description:
        'Optional. Split the book into parts, each with its own PDF so readers can download one at a time.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          fields: [
            {
              name: 'title',
              title: 'Chapter title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'pages', title: 'Pages', type: 'number' },
            {
              name: 'pdf',
              title: 'Chapter PDF (download)',
              type: 'file',
              options: { accept: '.pdf' },
            },
            {
              name: 'previewPdf',
              title: 'Chapter preview PDF (optional — read online)',
              description: 'If empty, the chapter PDF is used for the online reader.',
              type: 'file',
              options: { accept: '.pdf' },
            },
          ],
          preview: {
            select: { title: 'title', pages: 'pages' },
            prepare: ({ title, pages }) => ({
              title,
              subtitle: pages ? `${pages} pp.` : '',
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', author: 'author', language: 'language' },
    prepare: ({ title, author, language }) => ({
      title,
      subtitle: [author, language].filter(Boolean).join(' · '),
    }),
  },
}
