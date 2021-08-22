export const getMenuData: any[] = [
  // VB:REPLACE-START:MENU-CONFIG
  {
    title: 'Dashboards',
    key: '__dashboard',
    url: '/dashboard',
    icon: 'fe fe-home',
  },
  {
    title: 'Business',
    key: 'rvrtr',
    url: '/business',
    icon: 'fe fe-airplay',
    children: [
      {
        title: 'Uploads',
        key: 'gdxr7',
        url: '/business/uploads',
        icon: 'fe fe-upload',
      },
      {
        title: 'Data Entry',
        key: 'zucw6',
        url: '/business/data',
        icon: 'fe fe-file-plus',
      },
    ],
  },
  {
    title: 'Admin',
    key: '5l0hz',
    url: '/admin',
    icon: 'fe fe-star',
    children: [
      {
        title: 'Users',
        key: 'nlygf',
        url: '/admin/users',
        icon: 'fe fe-user',
      },
      {
        title: 'Review',
        key: '0bidi5',
        url: '/admin/reviews',
        icon: 'fe fe-align-justify',
      },
      {
        title: 'Audit Trail',
        key: 'ith22p',
        url: '/admin/audit',
        icon: 'fe fe-pause',
      },
    ],
  },

  // VB:REPLACE-END:MENU-CONFIG
]
