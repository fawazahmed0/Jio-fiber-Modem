// Refer https://serialport.io/docs


// Crack password in serial mode
// Run this after 1-2mins of booting the modem
// made for GEPON generic modem
// Can be converted to dictionary attack or brute attack
// 18 attempts /min
// If the program stops, then the last password entered was the correct one

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const Delimiter = require('@serialport/parser-delimiter')
const port = new SerialPort('COM7', {
    baudRate: 115200
  })
const user = 'root'
const pass = 'root'

const enterkey = `
`;
//const parser = port.pipe(new Readline());
// delimiter for login and password thing
const parser = port.pipe(new Delimiter({ delimiter: ':' }))

port.write(enterkey)

parser.on('data',  function (data) {
  console.log('Data:', data.toString())
  if(data.toString().toLowerCase().includes('login')){
    console.log("Trying for login ",user)
  port.write(user+enterkey)
  }

  if(data.toString().toLowerCase().includes('password')){
    console.log("Trying for pass ",user)
  port.write(pass+enterkey)
  }

})
  