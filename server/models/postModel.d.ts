import { Document, Model } from 'mongoose';

export interface isPost extends Document {
  id: string;
  title: string;
  description: string;
  image: string;
  updates: {
    id: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    video?: string;
    chat: string[];
  }[];
  author: string;
  createdBy: isUser[];
  date: string;
  chat: {
    createdBy: string;
    comment: string;
    date: string;
  }[];
  tags: string[];
  followers: string[];
}

declare const Post: Model<isPost>;

export default Post;
