const cardsContainer = document.getElementById("info-cards-container");

function crearTarjetasDeHelados(productos){
  productos.forEach(producto => {
    const nuevoHelado = document.createElement("div");
    nuevoHelado.classList = "tarjeta-producto"; 
    nuevoHelado.innerHTML = `
      <img src="../assets/img/${producto.id}.jpg">
      <h3>${producto.nombre}</h3>
      <h3>$${producto.precio}</h3>
      <button id="button">Agregar al carrito</button>
    `
    cardsContainer.appendChild(nuevoHelado);
    nuevoHelado.getElementsByTagName("button")[0].addEventListener("click",()=> agregarAlCarrito(producto))
  });
}



crearTarjetasDeHelados(helados);