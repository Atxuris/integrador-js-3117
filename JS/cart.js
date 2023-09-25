const cardsContainer = document.getElementById("info-cards-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesElement = document.getElementById("totales");
const reiniciarCarritoElement = document.getElementById("reiniciar");


function crearTarjetasDeHelados() {
  cardsContainer.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("helados"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevoHelado = document.createElement("div");
      nuevoHelado.classList = "tarjeta-producto";
      nuevoHelado.innerHTML = `
      <img src="../assets/img/${producto.id}.jpg">
      <h3>${producto.nombre}</h3>
      <h3>$${producto.precio}</h3>
      <div class="comprar">
      <button>-</button>
      <span class="cantidad">${producto.cantidad}</span>
      <button>+</button>
      </div>
      <button id="button">Agregar al carrito</button>
    `;
      cardsContainer.appendChild(nuevoHelado);
      nuevoHelado
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
          cuentaElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
      nuevoHelado
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          restarAlCarrito(producto);
          crearTarjetasDeHelados();
          actualizarTotales();
        });
    });
  }
}

crearTarjetasDeHelados();
actualizarTotales();

function actualizarTotales(){
  const productos = JSON.parse(localStorage.getItem("helados"));
  let unidades = 0;
  let precio = 0;
  if(productos && productos.length > 0);
  productos.forEach(producto =>{
    unidades += producto.cantidad;
    precio += producto.precio * producto.cantidad;
  })
  unidadesElement.innerText = unidades;
  precioElement.innerText = precio;
}

function revisarMensajeVacio(){
  const productos = JSON.parse(localStorage.getItem("helados"));
  carritoVacioElement.classList.toggle("escondido",productos && productos.length > 0);
  totalesElement.classList.toggle("escondido",!(productos && productos.length > 0));
}

revisarMensajeVacio();

reiniciarCarritoElement.addEventListener("click",reiniciarCarrito);
function reiniciarCarrito(){
  localStorage.removeItem("helados");
  actualizarTotales();
  crearTarjetasDeHelados();
}
