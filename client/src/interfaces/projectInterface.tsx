import { User } from './userInterface'

export interface Project {
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
  createdBy: string;
  date: string;
  chat: {
    createdBy: string;
    comment: string;
    date: string;
  }[];
  tags: string[];
  followers: string[];
}

export const initialProjectState = {
  _id: '',
  id: '',
  title: '',
  description: '',
  image: '',
  updates: [{
    id: '',
    title: '',
    description: '',
    date: '',
    image: undefined,
    video: undefined,
    chat: []
  }],
  author: '',
  createdBy: '',
  date: '',
  chat: [{
    createdBy: '',
    comment: '',
    date: '',
  }],
  tags: [],
  followers: []
}