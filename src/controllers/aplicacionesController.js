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
            /*res.json(aplic)
        }catch (error){
            throw error('error')
        }finally {
            conn.releaseConnection()
        }
    },*/

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
        /*const sql = `UPDATE Aplicaciones SET Nombre=?, Descripcion=?, Precio=?, FechaLanzamiento=? WHERE AplicacionID=?`;
        const { Nombre, Descripcion, Precio, FechaLanzamiento } = req.body;
        const appmodificado = await conn.query(sql, [Nombre, Descripcion, Precio, FechaLanzamiento]);
        res.redirect('/listadoApp.html')     */
    },

    deleteAplicById: async(req, res) => {
        const eliminado = await conn.query(`DELETE FROM Aplicacion WHERE AplicacionID=?`, req.body.idEliminar)
		res.redirect('/listadoApp.html')
    },

    infoDeveloper: async(req, res)=> {
        const developerId = req.params.id;

    // Consulta SQL con INNER JOIN para obtener los datos relevantes
    const query = `
        SELECT d.Apellido, d.Nombre, d.DNI, a.Nombre AS NombreAplicacion, a.Precio, c.Nombre AS NombreCategoria, c.Descripcion
        FROM Desarrollador d
        INNER JOIN Aplicacion a ON d.DNI = a.DNI
        INNER JOIN Categoria c ON a.CategoriaID = c.CategoriaID
        WHERE d.DNI = ?
    `;  

        res.render('developer', { developerData: rows });
        }
    }


