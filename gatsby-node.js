const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const artistPageTemplate = path.resolve(`src/templates/artists/index.js`);
    const agendaPageTemplate = path.resolve(`src/templates/agenda/index.js`);
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
            path = edge.node.name.replace(' ', '-').toLowerCase();
            path = path.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    );
  });
};
