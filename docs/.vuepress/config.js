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
        '/deploy',
        '/doc',
        '/tests',
        {
          title: 'Library Components',
          children: [
            '/components/login',
            '/components/forgot-password',
            '/components/main-menu',
            '/components/empty',
            '/components/multi-select',
            '/components/loading-indicator',
            '/components/multi-language',
            '/components/redirect',
            '/components/topbar',
            '/components/rating',
            '/components/form-wrapper/checkbox-field',
            '/components/form-wrapper/form-dropdown',
            '/components/form-wrapper/form-switch',
            '/components/form-wrapper/form-time',
            '/components/form-wrapper/img-field',
            '/components/form-wrapper/text-field',
            '/components/table-wrapper/table-crud',
          ],
        },
      ],
    },
    lastUpdated: 'Last Updated',
  },
  lastUpdated: 'Last Updated',
};