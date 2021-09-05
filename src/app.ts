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
