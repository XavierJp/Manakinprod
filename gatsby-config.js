module.exports = {
    siteMetadata: {
      title: `Manakin Sky dancer Rocks !`
    },
    plugins: [
      `gatsby-plugin-sass`,
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: `l6zoou2d4e5q`,
          accessToken: `9dc9304c61118a176c123a46dbe135dae690219c975be43e115b8bd10aa2a2b2`,
        },
      },
      {
        resolve: `gatsby-plugin-favicon`,
        options: {
          logo: "./src/resources/favicon.png",
          injectHTML: true,
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            twitter: false,
            yandex: false,
            windows: false
          }
        }
      }
    ]
  }