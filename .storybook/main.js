export default {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "storybook-addon-rslib"],
  framework: "storybook-react-rsbuild", // storybook-react-rsbuild for example
  rsbuildFinal: async (config) => ({
    ...config,
    output: {
      ...config.output,
      assetPrefix: "/react-pure-modal/",
    },
  }),
};
