module.exports = {
    siteMetadata: {
      title: `Manakin Sky dancer Rocks !`
    },
    plugins: [
      {
        resolve: `gatsby-plugin-google-fonts`,
        options: {
          fonts: [
            `roboto:100,300,400,500`,
          ]
        }
      },
      `gatsby-plugin-sass`,
    ]
  }