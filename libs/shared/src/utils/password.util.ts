import * as bcryptjs from 'bcryptjs';

export class PasswordUtil {
  static hash(password: string, saltNum = 10): string {
    const salt = bcryptjs.genSaltSync(this.getRandomInt(saltNum));
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
  }

  static compare(password: string, compareTo: string): boolean {
    return bcryptjs.compareSync(password, compareTo);
  }

  private static getRandomInt(max = 10) {
    return Math.floor(Math.random() * max);
  }
}
