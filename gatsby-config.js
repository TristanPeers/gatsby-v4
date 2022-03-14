module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        query: `
          query {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        ref: "path",
        index: ["path"],
        store: ["path"],
        normalizer: ({ data }) =>
          data.allSitePage.nodes.map((node) => ({
            path: node.path,
          })),
      },
    },
  ],
};
