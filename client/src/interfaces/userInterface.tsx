export interface User {
  _id: string;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  picturePath?: string;
  following: string[];
  createdPosts: string[];
}

export interface UserContextInterface {
  user: User | null;
  setUser: (user: User | null) => void;
}