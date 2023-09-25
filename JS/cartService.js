function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("helados"));
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("helados",JSON.stringify([nuevoProducto]));
        cuenta = 1; 
    } else {
        const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1;
        } else {
            nuevaMemoria[indiceProducto]. cantidad ++;
            cuenta = nuevaMemoria[indiceProducto].cantidad;
        }
        localStorage.setItem("helados",JSON.stringify(nuevaMemoria));
    }
    actualizarNuevoCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("helados"));
    const indiceProducto = memoria.findIndex(helado => helado.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem("helados",JSON.stringify(memoria));
    actualizarNuevoCarrito();
}

/**toma un producto, le agrega cantidad 1 y lo retorna */
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cuenta-cart");
function actualizarNuevoCarrito(){
    const memoria = JSON.parse(localStorage.getItem("helados"));
    if(memoria && memoria.length > 0){
      const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0 );
      cuentaCarritoElement.innerText = cuenta;
      console.log(cuenta);
    } else{
      cuentaCarritoElement.innerText = 0;
    }
}

actualizarNuevoCarrito();