module.exports = {
    siteMetadata: {
      title: `Manakin Sky dancer Rocks !`
    },
    plugins: [
      `gatsby-plugin-sass`,
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