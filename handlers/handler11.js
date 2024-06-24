const handler11 = (data)=>{
const processedData = data.reverse().toString()
return Buffer.from(processedData);
}

export default handler11;