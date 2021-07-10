export const getMenuData: any[] = [
  // VB:REPLACE-START:MENU-CONFIG
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'L&K Management',
    key: 'pxo5b',
    url: '/lkm',
    icon: 'fe fe-book-open',
    children: [
      {
        title: 'Interview Guide',
        key: 'h7aad',
        url: '/lkm/interviews',
      },
      {
        title: 'My Stories',
        key: 'rniyi9',
        url: '/lkm/mystories',
      },
      {
        title: 'Stories of Change',
        key: 'tx7k6w',
        url: '/lkm/soc',
      },
    ],
  },
  {
    title: 'Matching Grant Facility',
    key: 'osk3u',
    url: '/mgf',
    icon: 'fe fe-briefcase',
  },
  {
    title: 'Monitoring and Evaluation',
    key: 'o9b8f',
    url: '/me',
    icon: 'fe fe-activity',
  },
  {
    title: 'Capacity Building',
    key: '65z1s9',
    url: '/cbb',
    icon: 'fe fe-package',
  },
  {
    title: 'Market Data',
    key: '80pi8',
    url: '/market',
    icon: 'fe fe-bar-chart-2',
  },
  {
    title: 'Reports',
    key: 'cwm04g',
    url: '/reports',
    icon: 'fe fe-file-text',
  },
  {
    title: 'User Administration',
    key: '2hfvfk',
    url: '/user',
    icon: 'fe fe-users',
  },

  // VB:REPLACE-END:MENU-CONFIG
]
