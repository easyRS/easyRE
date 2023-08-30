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
      password: object.password as string
    };
  }

  async create(unknownObj: Record<string, unknown>): Promise<IUser> {
    const salt = CryptoJS.lib.WordArray.random(16); // Generate a random salt
    const derivedKey = CryptoJS.PBKDF2(unknownObj.password as string, salt, {
      keySize: 64 / 32, // Output size in words
      iterations: 1000 // Number of iterations
    }).toString(CryptoJS.enc.Hex);
    const hashedPassword = salt.toString() + derivedKey;
    const newUser = {
      ...unknownObj,
      password: hashedPassword
    };
    return super.create(newUser);
  }

  async loginUser(email: string, password: string): Promise<IUser> {
    /// console.log(`email ${email} password ${password}`);
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

    /* eslint-disable-line*/ console.log(
      `derivedKey= ${derivedKey} storedDerivedKey= ${storedDerivedKey}`
    );

    const passwordsMatch = derivedKey === storedDerivedKey;

    if (!passwordsMatch) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}
