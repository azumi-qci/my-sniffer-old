import { ARRAY_PARSER_REGEX } from '../constants';

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
    return `0x${this.data
      .slice(12, 14)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '')}`;
  }
}
