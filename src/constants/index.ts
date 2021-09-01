export const DUMP_PATH = 'tramaenhexdump.txt';

export const START_NUMBER_REGEX = /^[(0-9)(A-E)]{4}  /gm;

export const ARRAY_PARSER_REGEX = /,/g;

export const SERVICE_TYPE = {
  '0800': 'Internet Protocol version 4 (IPv4)',
  '0806': 'Address Resolution Protocol (ARP)',
  '0842': 'Wake-on-LAN',
  '22F3': 'IETF TRILL Protocol',
  '6003': 'DECnet Phase IV',
  '8035': 'Resverse Address Resolution Protocol',
  '809B': 'AppleTalk (Ethertalk)',
  '80F3': 'AppleTalk Address Resolution Protocol (AARP)',
  '8100':
    'VLAN-tagged frame (IEEE 802.1Q) and Shortest Path Bridging IEEE 802.1aq',
  '8137': 'IPX',
  '68DD': 'Internet Protocol Version 6 (IPv6)',
  '8808': 'Ethernet flow control',
  '8819': 'CobraNet',
  '8847': 'MPLS unicast',
  '8848': 'MPLS multicast',
  '8863': 'PPPoE Discovery Stage',
  '8864': 'PPPoE Discovery Stage',
  '8870': 'Jumbo Frames (proposed)',
  '887B': 'HomePlug 1.0 MME',
  '888E': 'EAP over LAN (IEEE 802.1X)',
  '8892': 'PROFINET Protocol',
  '889A': 'HyperSCSI (SCSI over Etherner)',
  '88A2': 'ATA over Ethernet',
  '88A4': 'EtherCAT Protocol',
  '88A8':
    'Provider Bridging (IEEE 802.1ad) & Shortest Path Brigging IEEE 802.1aq',
  '88AB': 'Ethernet Powerlink',
  '88CC': 'Link Layer Discovery Protocol (LLDP)',
  '88CD': 'SERCOS III',
  '88E1': 'HomePlug AV MME',
  '88E3': 'Media Redudancy Protocol (IEC622439-2)',
  '88E5': 'MAC security (IEEE 802.1AE)',
  '88E7': 'Provider Backbone Bridges (PBB) (IEEE 802.1ah)',
  '88F7': 'Precision Time Protocol (PTP) over Ethernet (IEEE 1588)',
  '8902': 'IEEE 802.1ag Connectivity Fault Management',
  '8906': 'Fibre Channel over Ethernet (FCoE)',
  '8914': 'FCoE Initialization Protocol',
  '8915': 'RDMA over Converged Ethernet (RoCE)',
  '891D': 'TTEthernet Protocol Control Frame (TTE)',
  '892F': 'High-availability Seamless Redudancy (HSR)',
  '9000': 'Ethernet Configuration Testing Protocol',
};
