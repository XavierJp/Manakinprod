export const sanitizeName = artistName => {
  if (!artistName) {
    console.error(`invalid url : no name provided`);
  }

  let path;
  try {
    path = artistName.replace(' ', '-').toLowerCase();
    path = path.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  } catch (e) {
    console.error(e);
  }

  return path;
};

export const formatShowDate = dateEntry => {
  let dateObject;
  if (typeof dateEntry === 'string') {
    dateObject = new Date(dateEntry);
  } else {
    dateObject = dateEntry;
  }

  const m = new Intl.DateTimeFormat('fr-FR', {
    month: '2-digit',
  }).format(dateObject);
  const d = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
  }).format(dateObject);
  return `${d}.${m}`;
};
