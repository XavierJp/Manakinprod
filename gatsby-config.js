require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Manakin Sky dancer Rocks !`,
    siteUrl: `https://manakinprod.fr`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        excludes: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
          }`,
        resolvePages: ({ allSitePage: { edges } }) => {
          return edges.reduce((acc, edges) => {
            return [...acc, edges.node];
          }, []);
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://manakinprod.fr',
        sitemap: 'https://manakinprod.fr/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `l6zoou2d4e5q`,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Manakin Prod`,
        short_name: `Manakin Prod`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: 'src/resources/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
};
