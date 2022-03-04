export const getMenuData: any[] = [
  // VB:REPLACE-START:MENU-CONFIG
  {
    title: 'Home',
    key: '__dashboard',
    url: '/home',
    icon: 'fe fe-home',
  },
  {
    title: 'Tutorials',
    key: 'pxo5b',
    url: '/tutorials',
    icon: 'fe fe-book-open',
  },
  {
    title: 'Q & A',
    key: 'pxo5b',
    icon: 'fe fe-edit-3',
    children: [
      {
        title: 'Ask Questions',
        key: 'exxjo53',
        url: '/ask',
      },
      {
        title: 'Answers',
        key: 'exxjo5e3',
        url: '/questions',
      },
    ],
  },
  {
    title: 'Subjects',
    key: 'pxo5b',
    url: '/subjects',
    icon: 'fe fe-briefcase',
  },
  {
    title: 'Teachers',
    key: 'osk3u',
    url: '/mgf',
    icon: 'fe fe-feather',
    children: [
      {
        title: 'Join Tadya teacher',
        key: 'exxjo5',
        url: '/auth/teacher/join',
      },
      {
        title: 'Create tutorial',
        key: 'exxjo5ws',
        url: '/tutoral/create',
      },
    ],
  },
  // {
  //   title: 'Students',
  //   key: 'o9b8f',
  //   url: '/me',
  //   icon: 'fe fe-activity',
  //   children: [
  //     {
  //       title: 'Ask Question',
  //       key: 'appnddsar',
  //       url: '/ask',
  //     },
  //   ],
  // },
  {
    title: 'Accounts',
    key: '2hfvfk',
    url: '/user',
    icon: 'fe fe-users',
    children: [
      {
        title: 'Dashboard',
        key: 'oalt1lm',
        url: '/profile',
      },
    ],
  },

  // VB:REPLACE-END:MENU-CONFIG
]
