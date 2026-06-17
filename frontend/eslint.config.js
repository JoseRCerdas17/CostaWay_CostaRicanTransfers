import nextPlugin from "eslint-config-next";

const config = [
  ...nextPlugin,
  {
    rules: {
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;