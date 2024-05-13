export interface AlbumModel {
  albumType: string;
  artists: Artist[];
  externalUrl: string;
  id: string;
  images: Image[];
  name: string;
  releaseData: string;
  value: number;
}

type Artist = {
  externalUrls: string;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  url: string;
  width: number;
};
