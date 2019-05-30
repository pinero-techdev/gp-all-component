module.exports = {
  title: 'Gp All Component',
  description: 'This is the documentation site for the project',

  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: {
      '/': [
        '',
        '/deploy',
        '/doc',
        '/tests',
        {
          title: 'Library Components',
          children: [
            '/components/form-wrapper/form-dropdown',
            '/components/form-wrapper/form-switch',
            '/components/form-wrapper/form-time',
            '/components/forgot-password',
            '/components/login',
            '/components/main-menu',
            '/components/multi-select',
            '/components/table-wrapper/table-crud',
            '/components/topbar',
          ],
        },
      ],
    },
    lastUpdated: 'Last Updated',
  },
};
