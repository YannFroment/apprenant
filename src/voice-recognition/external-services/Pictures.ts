import { Pictures } from '../domain/Pictures';
import { createClient } from 'pexels';

const client = createClient(
  'MxfAMFGikKpGKlWfKig5KPiffb7pimPKlKsAN7QBTMRBVsdujYQiws9j',
);

export const pictures: Pictures = {
  get: async (searchKey) => {
    const picture = await client.photos.search({
      query: searchKey,
      per_page: 1,
    });
    console.log(picture.photos);
    return picture.photos[0].url;
  },
};
