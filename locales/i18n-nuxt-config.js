export const i18n = {
  detectBrowserLanguage: {
    useCookie: false,
    alwaysRedirect: true,
    fallbackLocale: 'en',
    // onlyOnRoot: true,
    redirectOn: 'root',  // recommended

  },
  // detectBrowserLanguage: {
  //   useCookie: true,
  //   cookieKey: 'i18n_redirected',
  //   alwaysRedirect: true,
  //   fallbackLocale: 'ru'
  // },
locales: [
  {
    name: 'En',
    code: 'en',
    iso: 'en-US',
    file: 'en.js'
  },
  {
    name: 'RU',
    code: 'ru',
    iso: 'ru-RU',
    file: 'ru.js',
  },
],
lazy: true,
langDir: 'locales/',
defaultLocale: 'en',
}