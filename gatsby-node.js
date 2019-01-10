const path = require('path');

const sanitizeName = artistName => {
  if (!artistName) {
    console.error(`invalid url : no name provided`);
  }

  let path;
  try {
    path = artistName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/([^a-zA-Z0-9])/g, ' ')
      .split(' ')
      .filter(Boolean)
      .join('-')
      .toLowerCase();
  } catch (e) {
    console.error(e);
  }
  return path;
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const artistPageTemplate = path.resolve(`src/templates/artists/index.js`);
    const agendaPageTemplate = path.resolve(`src/templates/agenda/index.js`);
    const showPageTemplate = path.resolve(`src/templates/shows/index.js`);
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          query artistsForPath {
            allContentfulArtists {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create blog post pages.
        result.data.allContentfulArtists.edges.forEach(edge => {
          let path = '';
          try {
            path = sanitizeName(edge.node.name);
          } catch (e) {
            console.error(e);
          }
          createPage({
            path: `artists/${path}`, // required
            component: artistPageTemplate,
            context: {
              artistId: edge.node.id,
            },
          });
          createPage({
            path: `agenda/${path}`, // required
            component: agendaPageTemplate,
            context: {
              artistId: edge.node.id,
            },
          });
        });

        return;
      }),
      graphql(
        `
          query showsForPath {
            allContentfulShow {
              edges {
                node {
                  id
                  name
                  url
                  artist {
                    id
                    name
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create blog post pages.
        result.data.allContentfulShow.edges.forEach(edge => {
          let showPath = '';
          try {
            artistPath = sanitizeName(edge.node.artist.name);
          } catch (e) {
            console.error(e);
          }
          createPage({
            path: `artists/${artistPath}/${edge.node.url}`, // required
            component: showPageTemplate,
            context: {
              showId: edge.node.id,
            },
          });
        });

        return;
      }),
    );
  });
};
