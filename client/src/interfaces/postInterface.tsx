export interface Post {
  title: string;
  description: string;
  tags: string[];
}

export const initialPostState = {
  title: '',
  description: '',
  tags: []
}