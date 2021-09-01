import fs from 'fs';
import { exit } from 'process';

import { DUMP_PATH, START_NUMBER_REGEX } from './constants';

import { Sniffer } from './classes/sniffer';

export const main = () => {
  // Check if the file exist
  if (!fs.existsSync(DUMP_PATH)) {
    console.error(`El archivo "${DUMP_PATH}" no existe`);

    exit(-1);
  }

  const fileData = fs.readFileSync(DUMP_PATH).toString().trim();

  // Instantiate the sniffer class
  const mySniffer = new Sniffer(fileData.replace(START_NUMBER_REGEX, ''));

  console.clear();
  console.log('Paquete de datos\n');
  console.log(fileData + '\n');

  console.log('Cabezera Ethernet\n');

  // Show all data
  console.log(`Dirección MAC destino: \t${mySniffer.getFromMAC()}`);
  console.log(`Dirección MAC origen: \t${mySniffer.getToMac()}`);
  console.log(`Tipo de servicio: \t${mySniffer.getServiceType()}`);
};
