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

const templates = {
  artist: path.resolve(`src/templates/artists/index.js`),
  agenda: path.resolve(`src/templates/agenda/index.js`),
  show: path.resolve(`src/templates/shows/index.js`),
};

const convertToUrl = name => {
  try {
    return sanitizeName(name);
  } catch (e) {
    console.error(e);
  }
};

const artistsQuery = `
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
`;

const showsQuery = `
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
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const createPageWithResults = (path, cpmnt, context) => {
    createPage({
      path: path,
      component: cpmnt,
      context: context,
    });
  };

  return await Promise.all([
    graphql(artistsQuery).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      // Create blog post pages.
      result.data.allContentfulArtists.edges.map(edge => {
        const artistPath = `/artists/${convertToUrl(edge.node.name)}`;
        const agendaPath = `/agenda/${convertToUrl(edge.node.name)}`;
        const context = {
          artistId: edge.node.id,
        };
        createPageWithResults(artistPath, templates.artist, context);
        createPageWithResults(agendaPath, templates.agenda, context);
      });

      return;
    }),
    graphql(showsQuery).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      // Create show pages.
      result.data.allContentfulShow.edges.forEach(edge => {
        const artistPath = `/artists/${convertToUrl(edge.node.artist.name)}/${
          edge.node.url
        }/`;
        const context = {
          showId: edge.node.id,
        };
        createPageWithResults(artistPath, templates.show, context);
      });

      return;
    }),
  ]);
};
