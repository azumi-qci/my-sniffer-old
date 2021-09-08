import { ARRAY_PARSER_REGEX, SERVICE_TYPE } from '../constants';
import { convertBase } from '../functions';

export class Package {
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

  public getVersion = (): string => {
    const byte = this.data.slice(14, 15).toString();

    return byte[0];
  };

  public getLength = (): string => {
    const byte = this.data.slice(14, 15).toString();

    return `${parseInt(byte[1]) * 4} bytes`;
  };

  public getServiceQuality = (): string => {
    const byte = this.data.slice(15, 16).toString();

    return byte;
  };

  public getPackageSize = (): string => {
    const bytes = this.data
      .slice(16, 18)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '');

    const lengthInDecimals = convertBase(bytes).from(16).to(10);

    return `${lengthInDecimals.toString()} bytes`;
  };

  public getIdentification = (): string => {
    const bytes = this.data
      .slice(18, 20)
      .toString()
      .replace(ARRAY_PARSER_REGEX, ' ');

    return bytes;
  };

  public getPackageSlice(start: number, end: number): string {
    return this.data
      .slice(start, end)
      .toString()
      .replace(ARRAY_PARSER_REGEX, '');
  }
}
