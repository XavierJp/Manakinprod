export const sanitizeName = (artistName) => {
  if (!artistName) {
      console.error (`invalid url : no name provided`);
  }

  let path;
  try {
    path = artistName.replace(' ','-').toLowerCase();
    path = path.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  } catch(e) {
    console.error(e)
  }

  return path;
} 