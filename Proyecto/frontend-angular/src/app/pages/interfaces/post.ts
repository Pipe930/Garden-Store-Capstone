import { ReactionEnum } from "@core/enums/reaction.enum";

type TagType = {
  idTag: number;
  name: string;
}

export interface Post {
  idPost: number;
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: string;
  published: boolean;
  content: string;
  likes: number;
  dislikes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  tags: TagType[];
}

export interface ListPostsResponse {

  statusCode: number;
  message: string;
  currentPage: number;
  totalPages: number;
  data: Post[];
}

export interface PostResponse {
    statusCode: number;
    data: Post;
}

export interface CreatePost {

  title: string;
  subtitle: string;
  file: string;
  filename: string;
  typeFormat: string;
  published: boolean;
  content: string;
  tags: TagType[];
}

export interface UpdatePost extends CreatePost{}

export interface Tag {
  idTag: number;
  name: string;
}

export interface AdminTag extends Tag {
  description: string;
}

export interface ListTagResponse {

  statusCode: number;
  data: Tag[];
}

export interface TagResponse {
  statusCode: number;
  data: Tag;
}

export interface CreateReaction {
  idPost: number;
  reaction: ReactionEnum;
}

export interface Reaciton {
  idReaction: number;
  reaction: ReactionEnum;
  idPost: number;
  idUser: number;
}

export interface ReactionResponse {
  statusCode: number;
  data: Reaciton;
}

export const postJson: Post = {

  idPost: 0,
  title: '',
  subtitle: '',
  slug: '',
  thumbnail: '',
  published: false,
  content: '',
  likes: 0,
  dislikes: 0,
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  tags: []
}
