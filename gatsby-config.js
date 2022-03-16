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
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`path`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type SitePage, list how to resolve the fields` values
          SitePage: {
            path: node => node.path,
          },
        },
      },
    },
  ],
};
