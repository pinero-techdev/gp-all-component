module.exports = {
  title: 'Angular Guidelines',
  description: 'All the best practices you need to know to work on this project',

  themeConfig: {
    nav: [{ text: 'Home', link: '/' }, { text: 'Guide', link: '/guide/' }],
    sidebar: {
      '/guide/': [
        '',
        {
          title: 'Angular Library',
          children: ['library/introduction', 'library/create', 'library/structure'],
        },
      ],
      '/': [''],
    },
    lastUpdated: 'Last Updated',
  },
};
