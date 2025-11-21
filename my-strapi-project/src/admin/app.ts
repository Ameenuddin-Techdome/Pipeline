import type { StrapiApp } from "@strapi/strapi/admin";
import AuthLogo from "./extensions/my-auth-logo.png";
import MenuLogo from "./extensions/my-menu-logo.png";
import favicon from "./extensions/favicon.png";

export default {
  config: {
    locales: [
      // "fr",
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    auth: {
      logo: AuthLogo,
    },
    menu: {
      logo: MenuLogo,
    },
    head: {
      favicon: favicon,
       title: "Wizlo Admin", 
    },
    translations: {
      //https://github.com/strapi/strapi/blob/develop/packages/core/admin/admin/src/translations/en.json
      en: {
        "Auth.form.welcome.title": "Welcome to Wizlo!",
        "Auth.form.welcome.subtitle": "Log in to your Wizlo account",

        "tours.overview.subtitle":
          "Follow the guided tour to get the most out of Wizlo.",
        "tours.overview.strapiCloud.label":
          "Deploy your application to Wizlo Cloud",
      },
    },
    theme: {
      light: {
        colors: {
          primary100: "#E5DAFF", // light lavender
          primary200: "#C3B5FF",
          primary500: "#A389FF", // main Wizlo purple
          primary600: "#8B6EF7",
          primary700: "#734EEB",

          neutral0: "#FFFFFF", // background
          neutral100: "#F9F8FF", // very light background
          neutral200: "#EDEBFA",
          neutral300: "#D8D6F5",
          neutral500: "#706C97", // text muted
          neutral700: "#3D3964", // dark text
          neutral800: "#2E2957",
          neutral900: "#1F1B40",

          success500: "#66CC8A",
          danger500: "#FF6B6B",
          warning500: "#FFD166",
          info500: "#5AB8FF",

          // Buttons and accents
          buttonPrimary500: "#A389FF",
          buttonPrimary600: "#8B6EF7",
          buttonPrimary700: "#734EEB",

          // Shadows and borders
          alternative100: "#F3EEFF",
          alternative200: "#E0D7FF",
          borderColor: "#E3DFFD",
        },
      },
      dark: {
        colors: {
          // Dark mode Wizlo
          primary100: "#4A3D91",
          primary200: "#6E5BC9",
          primary500: "#A389FF",
          primary600: "#B9A3FF",
          primary700: "#D1C5FF",

          neutral0: "#181627", // dark background
          neutral100: "#201D33",
          neutral200: "#2A2645",
          neutral300: "#3B3760",
          neutral500: "#A8A4C3",
          neutral700: "#D1CCE7",
          neutral800: "#E5E1FA",
          neutral900: "#F3F0FF",

          success500: "#6EE7B7",
          danger500: "#F87171",
          warning500: "#FACC15",
          info500: "#60A5FA",

          buttonPrimary500: "#A389FF",
          buttonPrimary600: "#B9A3FF",
          buttonPrimary700: "#CDBEFF",
          borderColor: "#332E5E",
        },
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);

    const style = document.createElement("style");
    style.innerHTML = `
    [data-testid="marketplace-link"],
    [data-testid="deploy-link"] {
      display: none !important;
    }
    `;
    document.head.appendChild(style);
  },
};
