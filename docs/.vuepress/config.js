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
          title: 'General Components',
          children: [
            '/components/login',
            '/components/forgot-password',
            '/components/empty',
            '/components/dynamic',
            '/components/main-menu',
            '/components/multi-language',
            '/components/multi-select',
            '/components/loading-indicator',
            '/components/rating',
            '/components/redirect',
            '/components/topbar'
          ],
        },
        {
          title: 'Form Components',
          children: [
            '/components/form-wrapper/form-checkbox-field',
            '/components/form-wrapper/form-calendar-field',
            '/components/form-wrapper/form-dropdown-field',
            '/components/form-wrapper/form-dropdown-related-field',
            '/components/form-wrapper/form-switch-field',
            '/components/form-wrapper/form-img-field',
            '/components/form-wrapper/form-text-field',
            '/components/form-wrapper/form-text-area-field',
            '/components/form-wrapper/form-time-field',
            '/components/form-wrapper/form-wysiwyg-field'
          ]
        },
        {
          title: 'Table Components',
          children: [
            '/components/table-wrapper/table-crud',
            '/components/table-wrapper/table-frame'
          ]
        }
      ],
    },
    lastUpdated: 'Last Updated',
  },
  lastUpdated: 'Last Updated',
};
