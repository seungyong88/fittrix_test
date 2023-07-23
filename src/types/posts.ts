type Author = {
  username: string;
  image: any;
  url: string | null | undefined;
  _type: string;
  _ref: string;
}

type Image = {
  url: string | undefined;
  _type: string;
  asset: {
    _type: string;
    _ref: string;
  }
  _key: string;
} 

export type Comment = {
  author: any;
  comment: string;
  createdAt: string;
  updatedAt: string;
  url: string | null | undefined;
}

export type FullPost = {
  comments: Comment[];
  commentsCount: number;
  exercise: string;
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  comment: string;
  images: Image[];
  author: Author;
}
