import { Types } from 'mongoose';

export default interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  google_client_id: string;
  google_client_secret: string;
  google_redirect_url: string;
  google_api_key: string;
  google_tokens: /* eslint-disable-line*/ any;
}
