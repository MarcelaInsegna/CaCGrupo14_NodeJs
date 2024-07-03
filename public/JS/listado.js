document.querySelector('body').onload = async  () => {
	const res = await fetch('/aplicaciones'); //solicitud al servidor
	const datos = await res.json(); //convierte de json a objeto
	let listaHTML = document.querySelector('#aplicaciones-lista') //lista de app guardadas
	
    listaHTML.innerHTML = '' //limpio la lista 
	
	datos.forEach(registro => {

        const fecha = new Date(registro.FechaLanzamiento);
        const fechaFormateada = `${('0' + fecha.getDate()).slice(-2)}/${('0' + (fecha.getMonth() + 1)).slice(-2)}/${fecha.getFullYear()}`;

		//const aplicacionesHTLM 
        listaHTML.innerHTML += `
        <form method="POST" action="/aplicaciones?_metodo=DELETE" style="display:flex">
		    
			<h4>${registro.NombreAplicacion}</h4>
			<h4>${registro.Descripcion}</h4>
			<h4>${registro.Precio}</h4>
            <h4>${fechaFormateada}</h4>
            <h4>${registro.DNI}</h4>    
            <h4>${registro.CategoriaID}</h4>
            <h4>${registro.logo}</h4> 
                             

			<input type="hidden" name="idEliminar" value="${registro.AplicacionID}">
            
			<h4><button><a href="/modificar/${registro.AplicacionID}">Modificar</a></h4>

			<h4><input type="submit" value="Eliminar"></h4>

		</form>`;
        //listaHTML.innerHTML+=aplicacionesHTLM;
	})
};

