const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../templates/config.json');
const {
	Client,
	LocalAuth
} = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const {
	enviarMensajeRecibido,update_status_bot
} = require('../webhook')
const{enviarQr} = require('../../controller/envio_qr_controller')
const puppeteer = require('puppeteer');
const { response } = require('express');
let clienteWSP = null

const inicializarWSP = async (clientId,res,flag_api) => {  
  try{
    const browser = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox', '--disable-setuid-sandbox',        
      ]
    });
    clienteWSP = new Client({
      //webVersionCache:{type:'remote',remotePath:'https://raw.githubusercontent.com/wppconnect-team/wa-version/8683b0fb9a177dda0dcb6a65a254acb887be45dd/html/2.2412.54.html'},
      authStrategy: new LocalAuth({
        clientId: clientId,
      }),    
      puppeteer: {
        browserWSEndpoint: await browser.wsEndpoint(),
        args: [
          '--no-sandbox',        
        ]      
      }
    })
  }catch(error){
    console.log('Error al inicializar el cliente', error)
  }
      
  clienteWSP.on('qr', (qr) => {
    console.log(flag_api)
    if (flag_api){
      flag_api = false
      qrcode.generate(qr, { small: true });
      
      enviarQr(clientId,qr,res);
    }   
  })

  clienteWSP.on('authenticated', () => {  
      console.log('Autenticado!')
  })

  clienteWSP.on('auth_failure', (msg) => {
    console.error('Error de autenticación', msg)
  })

  clienteWSP.on('loading_screen', (porcentaje, mensaje) => {    
    console.log(`Cargando: ${porcentaje} - ${mensaje}`)
  })

  clienteWSP.on('message_create', (message) => {
    let clientId = JSON.parse(fs.readFileSync (filePath, 'utf8')).clientId;
    clientId='521'+clientId;  
    const author=message.author;    
    if (message.fromMe && typeof author!=='undefined') {
      number_to = message.to.split('@')[0];
      if (message.body.includes('🤖🤖')) {
        console.log('Activar robot')
        update_status_bot(number_to,true)
      }else{
        console.log('Desactivar robot')
        update_status_bot(number_to,false)
      }      
    }    
  })

  clienteWSP.on('message', message => {
    if (message.from!='status@broadcast'){
      console.log('Mensaje recibido', message.from, message.body)
      enviarMensajeRecibido(message.from, message.body)
    }    
  })  
  
  await clienteWSP.initialize()  
}

const enviarMensajeWSP = async (numero, mensaje) => {
	try {
		numero = numero + '@c.us'
    console.log(mensaje)
		const respuesta = await clienteWSP.sendMessage(numero, mensaje)
		return respuesta
	} catch (error) {
		const mensajeError = `Error al enviar mensaje a ${numero}`
		console.error(mensajeError, error)
		return false
	}
}
let response_webhook;
const statusCheck = async () => {
  let estado='DISCONNECTED'
  try {
    estado= await clienteWSP.getState()
    // console.log(estado)    
  } catch (error) {
    const mensajeError = `Error al obtener el estado del cliente`    
    // console.error(mensajeError, error)
    estado='DISCONNECTED'    
  }
  console.log(estado)
  if (estado === 'CONNECTED') {
    response_webhook = {
      status: 'connected'
    }
    return response_webhook
  }else{
    response_webhook = {
      status: 'disconnected'
    }
    return response_webhook
  }
}

module.exports = {
	inicializarWSP,
	enviarMensajeWSP,
  statusCheck
}