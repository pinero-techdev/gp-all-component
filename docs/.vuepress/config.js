module.exports = {
  title: 'Gp All Component',
  description: 'This is the documentation site for the project',

  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: {
      '/': [
        '',
        {
          title: 'Library Components',
          children: [
            '/components/main-menu',
            '/components/table-wrapper/table-crud'
          ],
        },
      ],
    },
    lastUpdated: 'Last Updated',
  },
};
