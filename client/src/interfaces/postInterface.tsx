import { User } from './userInterface'

export interface Post {
  _id: string;
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
  createdBy: User[];
  date: string;
  chat: {
    createdBy: string;
    comment: string;
    date: string;
  }[];
  tags: string[];
  followers: string[];
}