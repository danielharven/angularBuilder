import store from 'store'
import * as actions from './actions'

const STORED_SETTINGS = (storedSettings: object) => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}
/*
*
*   "vb": "1.0.0",
  "timestamp": 1629538905941,
  "settings": {
    "authProvider": "jwt",
    "logo": "DNPRC",
    "version": "air",
    "theme": "default",
    "locale": "en-US",
    "isSidebarOpen": false,
    "isSupportChatOpen": false,
    "isMobileView": false,
    "isMobileMenuOpen": false,
    "isMenuCollapsed": false,
    "isPreselectedOpen": false,
    "preselectedVariant": "waves",
    "menuLayoutType": "top",
    "routerAnimation": "slide-fadein-right",
    "menuColor": "white",
    "authPagesColor": "gray",
    "isAuthTopbar": true,
    "primaryColor": "#005000",
    "leftMenuWidth": 256,
    "isMenuUnfixed": false,
    "isMenuShadow": false,
    "isTopbarFixed": false,
    "isTopbarSeparated": false,
    "isGrayTopbar": false,
    "isContentMaxWidth": false,
    "isAppMaxWidth": false,
    "isGrayBackground": true,
    "isCardShadow": true,
    "isSquaredBorders": false,
    "isBorderless": false,
    "layoutMenu": "classic",
    "layoutTopbar": "none",
    "layoutBreadcrumbs": "v1",
    "layoutFooter": "v1",
    "flyoutMenuType": "flyout",
    "flyoutMenuColor": "blue"
* */

export const initialState: object = {
  ...STORED_SETTINGS({
    // Read docs for available values: https://docs.visualbuilder.cloud
    // VB:REPLACE-START:SETTINGS
    authProvider: 'jwt',
    logo: 'DNRPC',
    version: 'air',
    theme: 'default',
    locale: 'en-US',
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    isPreselectedOpen: false,
    preselectedVariant: 'waves',
    menuLayoutType: 'top',
    routerAnimation: 'slide-fadein-right',
    menuColor: 'white',
    authPagesColor: 'gray',
    isAuthTopbar: true,
    primaryColor: '#007000',
    leftMenuWidth: 256,
    isMenuUnfixed: false,
    isMenuShadow: false,
    isTopbarFixed: false,
    isTopbarSeparated: false,
    isGrayTopbar: false,
    isContentMaxWidth: false,
    isAppMaxWidth: false,
    isGrayBackground: true,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
    layoutMenu: 'classic',
    layoutTopbar: 'none',
    layoutBreadcrumbs: 'v1',
    layoutFooter: 'v1',
    layoutMenuType: 'top',
    flyoutMenuType: 'flyout',
    flyoutMenuColor: 'blue',
    // VB:REPLACE-END:SETTINGS
  }),
}

export function reducer(state = initialState, action: actions.Actions): object {
  switch (action.type) {
    case actions.SET_STATE:
      const key = Object.keys(action.payload)[0]
      store.set(`app.settings.${key}`, action.payload[key])
      return { ...state, ...action.payload }
    case actions.CHANGE_SETTING_BULK:
      const settings = {}
      Object.keys(action.payload).forEach(key => {
        store.set(`app.settings.${key}`, action.payload[key])
        settings[key] = action.payload[key]
      })
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const getSettings = (state: any) => state
