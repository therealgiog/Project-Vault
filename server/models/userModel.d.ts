import { Document, Model } from 'mongoose';

export interface isUser extends Document {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  picturePath?: string;
  following: string[];
  createdPosts: isPost[];
}

declare const User: Model<isUser>;

export default User;