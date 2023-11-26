// Importa web3.js
import Web3 from 'web3';

// Crea una instancia de web3 y establece el proveedor
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

// Ahora puedes usar la instancia de web3 en tu componente
web3.eth.getBlockNumber()
  .then((blockNumber) => {
    console.log('Número de bloque actual:', blockNumber);
  })
  .catch((error) => {
    console.error('Error al obtener el número de bloque:', error);
  });

// Puedes exportar la instancia de web3 si la necesitas en otros lugares
export { web3 };
