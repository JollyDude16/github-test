import { HANDLER_ID, TOTAL_LENGTH_SIZE } from "./constants.js"

export const readHeader = (buffer) =>{
    return {
 length:buffer.readUInt32BE(0),// 4파이트 만큼 읽는다 offset = 0
 handlerId:buffer.readUInt16BE(TOTAL_LENGTH_SIZE),
    };
};

export const writeHeader = (length, handlerId) =>{
    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID
    const buffer = Buffer.alloc(headerSize);
    buffer.writeUInt32BE(length + headerSize, 0);
    buffer. writeUInt16BE(handlerId, TOTAL_LENGTH_SIZE);

    return buffer;
}