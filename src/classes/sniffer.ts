import { ARRAY_PARSER_REGEX, SERVICE_TYPE } from '../constants';

export class Sniffer {
  private data: string[];

  constructor(data: string) {
    this.data = data.split(' ');
  }

  public getFromMAC(): string {
    return this.data.slice(0, 6).toString().replace(ARRAY_PARSER_REGEX, ':');
  }

  public getToMac(): string {
    return this.data.slice(6, 12).toString().replace(ARRAY_PARSER_REGEX, ':');
  }

  public getServiceType(): string {
    const typeInPackage = this.data
      .slice(12, 14)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '');

    const type = SERVICE_TYPE[typeInPackage as keyof typeof SERVICE_TYPE];

    return `0x${this.data
      .slice(12, 14)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '')} - ${type}`;
  }

  public getPackageSlice(start: number, end: number): string {
    return this.data
      .slice(start, end)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '');
  }
}
