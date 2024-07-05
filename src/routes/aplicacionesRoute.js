const express = require("express");
const router = express.Router();
const apliController =require('../controllers/aplicacionesController');
const multer = require ('multer')


const storage = multer.diskStorage({ //almacenamiento, con un metodo dentro, recibe un objeto
    destination: (req,file, cb) =>{ //cb es collback
        cb(null,`public/img/`) // null para manejo de errores, segundo param donde se guardan los archivos q se van subiendo
        // `public/uploads/${carpetaDinamica}` //para subir archivos de forma dinamica, segun el tipo de archivo el destino de carpata varia
    },
    filename: (req, file, cb) =>{
        cb(null,Date.now() + "_" + file.originalname) //nombre con el cual se va a guardar el archivo
    }    
} );

const uploadFile= multer ({storage}) //objeto q tiene multer ejecutado con la conf interna para manipular los archivos q llegan

/*const isLogged = (req, res, next)=>{
	if(!req.session.userId){ //si no hay session activa redirecciona a la pag login
		return res.redirect('/login.html')
	}
	next()
}*/
router.get('/aplicaciones', apliController.getAllAplic);
router.post('/aplicaciones',uploadFile.single('archivo') ,apliController.createAplic);
router.get('/modificar/:id', apliController.getModificarById);
router.put('/modificar', apliController.updateAplicById);
router.delete('/aplicaciones', apliController.deleteAplicById);


router.get('/developer/:DNI', apliController.infoDeveloper)

module.exports=router;

