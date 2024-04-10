export default interface IUser {
  _id?: SYS_ID;
  email: string;
  password: string;
  google_client_id: string;
  google_client_secret: string;
  google_redirect_url: string;
  google_api_key: string;
  google_tokens: /* eslint-disable-line*/ any;
}
