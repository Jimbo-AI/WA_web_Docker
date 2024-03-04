const fs = require('fs');
const path = require('path');
const qr_controller=(req,res)=>{
    const clientId = req.query['clientId'];   
    try{
        const qr_html = path.join(__dirname, '../templates/qr_'+clientId+'.html');
        fs.readFile(qr_html, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        });
    }
    catch(error){
        const errorController= `Error al enviar qr`;
        console.error(errorController, error);          
        res.status(400).send({mensaje:errorController});
    }
}
module.exports = {
    qr_controller
}