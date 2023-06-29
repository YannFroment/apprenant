export type Backend = {
  get: (url: string) => Promise<string>;
};
