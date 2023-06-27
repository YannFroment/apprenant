import { createClient, PhotosWithTotalResults } from 'pexels';

import { Pictures } from '../domain/Pictures';

const client = createClient(
  'MxfAMFGikKpGKlWfKig5KPiffb7pimPKlKsAN7QBTMRBVsdujYQiws9j',
);

export const pexelPictures: Pictures = {
  get: async (searchKey) => {
    const picture = (await client.photos.search({
      query: searchKey,
      per_page: 1,
    })) as PhotosWithTotalResults;

    return picture.photos[0].src.medium;
  },
};
