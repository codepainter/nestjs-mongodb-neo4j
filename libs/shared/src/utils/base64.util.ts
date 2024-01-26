export class Base64Util {
  static encodeFromJson(obj: object): string {
    return Buffer.from(JSON.stringify(obj)).toString('base64');
  }

  static decodeToJson(str: string): string {
    return JSON.parse(Buffer.from(str, 'base64').toString('ascii'));
  }
}
