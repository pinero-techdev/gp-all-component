module.exports = {
  title: 'Gp All Component',
  description: 'This is the documentation site for the project',

  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: {
      '/': [
        '',
        '/structure',
        '/building',
        '/development',
        {
          title: 'Library Components',
          children: [
            '/components/main-menu',
            '/components/empty',
            '/components/loading-indicator',
            '/components/multi-language',
            '/components/redirect',
            '/components/form-wrapper/checkbox-field',
            '/components/form-wrapper/img-field',
            '/components/form-wrapper/text-field',
            '/components/table-wrapper/table-crud'
          ],
        },
      ],
    },
    lastUpdated: 'Last Updated',
  },
};
