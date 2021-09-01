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
    let type = 'Desconocido';

    const typeInPackage = this.data
      .slice(12, 14)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '');

    for (let key in SERVICE_TYPE) {
      if (key === typeInPackage) {
        type = SERVICE_TYPE[key as keyof typeof SERVICE_TYPE];

        break;
      }
    }

    return `0x${this.data
      .slice(12, 14)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '')} - ${type}`;
  }
}
