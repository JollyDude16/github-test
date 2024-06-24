import net from 'net';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

// 서버에 연결할 호스트와 포트
const HOST = 'localhost';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Connected to server');


  const message = 'Hello'; 
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 11); //헤더를 작성
  const packet = Buffer.concat([header, buffer]);//헤더와 버퍼(메시지) 결합
  client.write(packet); // write 메서드로 패킷(버퍼)작성
});

client.on('data', (data) => {
  const buffer = Buffer.from (data);
  const {length, handlerId} =  readHeader(buffer);
  console.log(`Length ${length}`);
  console.log(`handlerId ${handlerId}`);

  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
  const message = buffer.slice(headerSize);
  console.log(`server 에게 받은 메시지 ${message}`);
  console.log(data);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error('Client error:', err);
});
