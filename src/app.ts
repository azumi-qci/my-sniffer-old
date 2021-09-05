import fs from 'fs';
import { exit } from 'process';
import prompt from 'prompt-sync';

import { DUMP_PATH, START_NUMBER_REGEX } from './constants';

import { Sniffer } from './classes/sniffer';

// Instanciate prompt
const myPrompt = prompt();

export const main = () => {
  // Check if the file exist
  if (!fs.existsSync(DUMP_PATH)) {
    console.error(`El archivo "${DUMP_PATH}" no existe`);

    exit(-1);
  }

  let fileData = fs.readFileSync(DUMP_PATH).toString().trim();

  fileData = fileData.replace(START_NUMBER_REGEX, '');

  // Instantiate the sniffer class
  const mySniffer = new Sniffer(fileData);

  while (true) {
    console.clear();
    console.log('Bienvenido/a\n');

    console.log('Menú');
    console.log('1. Leer paquete desde un archivo');
    console.log('2. Leer paquete desde la WLAN');
    console.log('3. Salir');

    const option = myPrompt('Ingrese una opción: ');

    switch (option) {
      case '1': {
        console.clear();

        console.log('Paquete de datos\n');
        console.log(fileData + '\n');

        // Show all data
        console.log(`Dirección MAC destino: \t${mySniffer.getFromMAC()}`);
        console.log(`Dirección MAC origen: \t${mySniffer.getToMac()}`);
        console.log(`Tipo de servicio: \t${mySniffer.getServiceType()}`);

        waitForInput();
        break;
      }
      case '2': {
        console.clear();

        let firstSetResult = '';
        let secondSetResult = '';
        let additionResult = '';
        let complement = '';
        let result = '';
        let hexResult = '';

        const firstSet = [
          convertBase(mySniffer.getPackageSlice(14, 16)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(16, 18)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(18, 20)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(20, 22)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(22, 24)).from(16).to(2),
        ];

        const secondSet = [
          convertBase(mySniffer.getPackageSlice(24, 26)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(26, 28)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(30, 32)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(34, 36)).from(16).to(2),
          convertBase(mySniffer.getPackageSlice(36, 38)).from(16).to(2),
        ];

        firstSetResult = firstSet.reduce((previousValue, currentValue) => {
          return binaryAddition(previousValue, currentValue);
        });

        secondSetResult = secondSet.reduce((previousValue, currentValue) => {
          return binaryAddition(previousValue, currentValue);
        });

        additionResult = binaryAddition(firstSetResult, secondSetResult);

        // Complemento a 2
        complement = complementA1(additionResult);

        // Calculate result
        result = binaryAddition(complement, '1');
        // Convert result to hexadecimal
        hexResult = convertBase(result).from(2).to(16);

        // Show results
        console.log('- Resultado del checksum -');
        console.log('Binario: ', result);
        console.log('Hexadecimal: ', hexResult);

        waitForInput();
        break;
      }
      case '3': {
        console.log('\nSaliendo de la aplicación...');

        exit(0);
      }
      default: {
        console.log('\nLa opción ingresada no es válida');

        waitForInput();
        break;
      }
    }
  }
};

const waitForInput = (): void => {
  myPrompt('\nPresione ENTER para continuar...');
};

const convertBase = (value: string) => {
  return {
    from: (baseForm: number) => {
      return {
        to: (baseTo: number) => {
          return parseInt(value, baseForm).toString(baseTo);
        },
      };
    },
  };
};

const binaryAddition = (a: string, b: string) => {
  let result = '';
  let carry = 0;

  while (a || b || carry) {
    let sum = +a.slice(-1) + +b.slice(-1) + carry;

    if (sum > 1) {
      result = (sum % 2) + result;
      carry = 1;
    } else {
      result = sum + result;
      carry = 0;
    }

    a = a.slice(0, -1);
    b = b.slice(0, -1);
  }

  return result;
};

const complementA1 = (value: string) => {
  let result = '';

  for (let binaryValue of value) {
    if (binaryValue === '0') {
      result += '1';
    } else {
      result += '0';
    }
  }

  return result;
};
