const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarproducto);

    carrito.addEventListener('click', eliminarproducto); 

    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito= []; 
        limpiarHTML();
         
    })
}


//funciones

function agregarproducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosproducto(productoSeleccionado)
    }

}
function eliminarproducto(e){
if(e.target.classList.contains('borrar-producto')){
const productoId= e.target.getAttribute('data-id'); 
let producto= articulosCarrito.find(producto=> producto.id === productoId); 
if(producto.cantidad>1){

articulosCarrito= articulosCarrito.map(producto=>{
    if(producto.id=== productoId){
        console.log('2');
        producto.cantidad--; 
        return producto
    }else{
        return producto
    }
})
}else{   
    console.log('3');
articulosCarrito= articulosCarrito.filter(producto=> producto.id!== productoId);
}
//mostrar carrito modificado
carritoHTML(); 
}
}

function leerDatosproducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto=> producto.id ===infoProducto.id); 
    if(existe){
        const productos= articulosCarrito.map(producto=>{
            if(producto.id=== infoProducto.id){
                producto.cantidad++
                return producto
            }else{
                return producto
            }
        });
        articulosCarrito= [...productos]

    }else{
      articulosCarrito.push(infoProducto)  
    }
    
    
    carritoHTML()

}

//mostrar carrito de compras
function carritoHTML() {

    //limpiar html
    limpiarHTML()

    articulosCarrito.forEach(({titulo, precio, cantidad, imagen, id}) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width =100>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${id}" >X</a>
        </td>`;

        contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}