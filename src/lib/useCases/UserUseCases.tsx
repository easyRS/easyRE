import CryptoJS from 'crypto-js';
import IUser from '../domain/entities/IUser';
import UserRepository from '../domain/repositories/UserRepository';
import AbstractUseCases from './AbstractUseCases';

export default class UserUseCases extends AbstractUseCases<
  IUser,
  UserRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): UserRepository {
    return new UserRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IUser {
    return {
      email: object.email as string,
      password: object.password as string,
      google_client_id: object.google_client_id as string,
      google_client_secret: object.google_client_secret as string,
      google_redirect_url: object.google_redirect_url as string,
      google_api_key: object.google_api_key as string,
      google_tokens: object.google_tokens as Record<
        string,
        /* eslint-disable-line*/ any
      >
    };
  }

  /* eslint-disable-line*/ encryptField(fieldValue: String): string {
    const salt = CryptoJS.lib.WordArray.random(16);
    const derivedKey = CryptoJS.PBKDF2(fieldValue as string, salt, {
      keySize: 64 / 32, // Output size in words
      iterations: 1000 // Number of iterations
    }).toString(CryptoJS.enc.Hex);
    return salt.toString() + derivedKey;
  }

  /* eslint-disable-line*/ decryptField(encryptedValue: String): string {
    const storedHashedPassword = encryptedValue;
    return storedHashedPassword.slice(32);
  }

  async create(unknownObj: Record<string, unknown>): Promise<IUser> {
    const hashedPassword = this.encryptField(unknownObj.password as string);
    const newUser = {
      ...unknownObj,
      password: hashedPassword
    };
    return super.create(newUser);
  }

  async loginUser(email: string, password: string): Promise<IUser> {
    const user = await this.findByQuery({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const storedHashedPassword = user.password;
    const salt = CryptoJS.enc.Hex.parse(storedHashedPassword.slice(0, 32));
    const storedDerivedKey = storedHashedPassword.slice(32);

    const derivedKey = CryptoJS.PBKDF2(password, salt, {
      keySize: 64 / 32, // Output size in words
      iterations: 1000 // Number of iterations
    }).toString(CryptoJS.enc.Hex);

    const passwordsMatch = derivedKey === storedDerivedKey;

    if (!passwordsMatch) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}
