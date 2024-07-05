const {conn} = require('../db/db');

module.exports= {
     
    getAllAplic: async(req,res)=>{
        try{
            const [registros] =await conn.query(`SELECT * FROM Aplicacion`)
            res.json(registros);           
        }catch (error) {
			throw error
		} finally{
			conn.releaseConnection()
		}
    },
            
    createAplic: async (req, res) => {
        const sql = `INSERT INTO Aplicacion (NombreAplicacion, Descripcion, Precio, FechaLanzamiento, DNI, CategoriaID, logo) VALUES (?,?,?,?,?,?,?);`
        const appNueva= await conn.query(sql, [req.body.NombreAplicacion, req.body.Descripcion, req.body.Precio, req.body.FechaLanzamiento, req.body.DNI, parseInt(req.body.CategoriaID), req.file.filename])
    /   res.redirect('/listadoApp.html')
    },
   
    getModificarById: async (req, res) => { //muestra la informacion a modificar
        try {
            // Realiza la consulta para obtener la información a modificar
            const [modificar] = await conn.query(`SELECT * FROM Aplicacion WHERE AplicacionID=?`, [req.params.id]);   
            console.log(modificar)                    
            // Renderiza la vista 'modificar' y pasa los datos necesarios a la plantilla EJS
            res.render('modificar', {
                tituloDePagina: 'Modificar Aplicacion Cargada',
                registro: modificar[0]
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en el servidor');
        }},
       
    updateAplicById: async (req, res) => { //realiza la modificacion
        const sql = `UPDATE Aplicacion SET NombreAplicacion=?, Descripcion=?, Precio=?, FechaLanzamiento=?, DNI=?, CategoriaID=?, logo=? WHERE AplicacionID=?`
        const { AplicacionID, NombreAplicacion, Descripcion, Precio, FechaLanzamiento, DNI, CategoriaID, logo } = req.body
        const appmodificado = await conn.query(sql, [NombreAplicacion, Descripcion, Precio, FechaLanzamiento, DNI, CategoriaID, logo, AplicacionID]);
        try {
           await conn.query(sql, [NombreAplicacion, Descripcion, Precio, FechaLanzamiento, DNI, CategoriaID, logo,  req.params.id]);
             res.redirect('/ListadoApp.html');
         } catch (error) {
             console.error(error);
             res.status(500).send('Error en el servidor');
         }        
    },

    deleteAplicById: async(req, res) => {
        const eliminado = await conn.query(`DELETE FROM Aplicacion WHERE AplicacionID=?`, req.body.idEliminar)
		res.redirect('/listadoApp.html')
    },

    infoDeveloper: async(req, res)=> {
        const devId = req.params.DNI;
    try {
        const [rows] = await conn.query('SELECT d.DNI, d.Nombre, d.Apellido, d.Pais, d.telefono, d.FechaRegistro, a.AplicacionID, a.NombreAplicacion, a.Descripcion AS DescripcionAplicacion, a.Precio, a.FechaLanzamiento, c.CategoriaID, c.NombreCategoria, c.Descripcion AS DescripcionCategoria FROM     Desarrollador d JOIN Aplicacion a ON d.DNI = a.DNI JOIN Categoria c ON a.CategoriaID = c.CategoriaID WHERE d.DNI = ?', [devId]);
        if (rows.length === 0) {
            res.status(404).send('Desarrollador no encontrado');
            return;
        }
        res.render('developer', { developer: rows[0] });
    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error en el servidor');
    }
    }
}
       
/* CONSULTA EN LA BASE DE DATOS

'SELECT d.DNI, d.Nombre, d.Apellido, d.Pais, d.telefono, d.FechaRegistro, a.AplicacionID, a.NombreAplicacion, a.Descripcion AS DescripcionAplicacion, a.Precio, a.FechaLanzamiento, c.CategoriaID, c.NombreCategoria, c.Descripcion AS DescripcionCategoria FROM     Desarrollador d JOIN Aplicacion a ON d.DNI = a.DNI JOIN Categoria c ON a.CategoriaID = c.CategoriaID WHERE d.DNI 1111'*/