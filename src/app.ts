import fs from 'fs';
import { exit } from 'process';
import prompt from 'prompt-sync';

import { DUMP_PATH, START_NUMBER_REGEX } from './constants';

import { Package } from './classes/sniffer';

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
  const myPackage = new Package(fileData);

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
        console.log(`Dirección MAC destino: \t${myPackage.getFromMAC()}`);
        console.log(`Dirección MAC origen: \t${myPackage.getToMac()}`);
        console.log(`Tipo de servicio: \t${myPackage.getServiceType()}`);

        // Include only this info if the package is IPv4
        if (myPackage.getServiceType().includes('0x0800')) {
          console.log(`Versión: \t\t${myPackage.getVersion()}`);
          console.log(`Tamaño: \t\t${myPackage.getLength()}`);
          console.log(`Tipo de servicio: \t${myPackage.getServiceQuality()}`);
          console.log(`Longitud del paquete: \t${myPackage.getPackageSize()}`);
          console.log(`Identificación: \t${myPackage.getIdentification()}`);
          console.log(`Banderas: \t\t${myPackage.getFlags()}`);
        }

        waitForInput();
        break;
      }
      case '2': {
        // Continue tm
        console.log('\nPróximamente...');

        waitForInput();

        continue;

        /* console.clear();

        let firstSetResult = '';
        let secondSetResult = '';
        let additionResult = '';
        let complement = '';
        let result = '';
        let hexResult = '';

        const firstSet = [
          convertBase(myPackage.getPackageSlice(14, 16)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(16, 18)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(18, 20)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(20, 22)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(22, 24)).from(16).to(2),
        ];

        const secondSet = [
          convertBase(myPackage.getPackageSlice(24, 26)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(26, 28)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(30, 32)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(34, 36)).from(16).to(2),
          convertBase(myPackage.getPackageSlice(36, 38)).from(16).to(2),
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
        break; */
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
