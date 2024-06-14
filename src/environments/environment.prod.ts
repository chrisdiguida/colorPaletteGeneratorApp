const BASE_URL = 'https://api-color-palette-generator.azurewebsites.net/api/';
const APP_USERS_CONTROLLER = `${BASE_URL}appUsers/`;
const PALETTE_GENERATOR_CONTROLLER = `${BASE_URL}paletteGenerator/`;

export const environment = {
  production: true,

  api: {
    base: BASE_URL,
    appUsers: {
      signIn: `${APP_USERS_CONTROLLER}signIn`,
      signUp: `${APP_USERS_CONTROLLER}signUp`,
      getCurrentAppUser: `${APP_USERS_CONTROLLER}getCurrentAppUser`,
    },
    palettes: {
      generatePalette: `${PALETTE_GENERATOR_CONTROLLER}generatePalette`,
      getAll: `${PALETTE_GENERATOR_CONTROLLER}getAll`,
      create: `${PALETTE_GENERATOR_CONTROLLER}create`,
      updateName: `${PALETTE_GENERATOR_CONTROLLER}updateName`,
      delete: `${PALETTE_GENERATOR_CONTROLLER}delete`,
    },
  },
  localStorageNames: {
    token: 'token',
  },
};
