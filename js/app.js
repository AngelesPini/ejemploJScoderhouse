// array vacio donde se almacenarán mis productos seleccionados
let miCompra = [];

// obtengo el espacio donde se van a mostrar mis objetos
const productos = document.getElementById('productos');

// obtengo el espacio donde se verá mi carrito
const productosElegidos = document.getElementById('mi-compra');

// mi botón para que mi carrito abra y cierre
let botonCarrito = document.getElementById('abrir-carrito');


const agregados = document.getElementById('agregados')

const precioTotal = document.getElementById('precioTotal');





// llamo a la funcion de mostrar mis cards y le paso como parametro mi array
mostrarProductos(cards);


// creo mi funcion para mostrar
function mostrarProductos(array){
    // dentro de mi contenedor productos le digo que principalmente va a tener un elemento html que será contenedor de cada producto
    productos.innerHTML = '';

    // voy a recorrer mi array e indicarle que cada objeto será un producto
    for(const Producto of array){
        let contenedor = document.createElement('div');
        // asigno una classname a ese contenedor
        contenedor.className = 'producto';
        // y creo cada card
        contenedor.innerHTML = `
        <div class="contenedorPaquete">
            <h5>${Producto.nombre}</h5>
            <img src="${Producto.img}" alt="">
            <div class="textoPaquete">
                <p>${Producto.descripcion}</p>
                <span>${Producto.promo}</span>
            </div>
            <p class="precio">${Producto.precio}</p>
        </div>
        <button id="botonElegir${Producto.id}">Seleccionar</button>       
        `
        //^ en mi boton llamo a mi ID, super importante para que se sume a mi carrito con sus detalles, ya que el ID es unico

        // le digo que cada objeto será un elemnto HTML hijo
        productos.appendChild(contenedor)



        let botonElegir = document.getElementById(`botonElegir${Producto.id}`)
        botonElegir.addEventListener('click', ()=>{
            console.log(`Elegido ${Producto.nombre}`);
            alert(`agregado ${Producto.nombre}`)
            // llamo a la funcion que agrega mis productos
            agregarProductos(Producto.id)

        })
    }

}

// funcion para agregar productos
function agregarProductos(id){
    // creo una variable que me permita encontrar mis productos con facilidad
    let add = miCompra.find(item => item.id == id)

    // a esta variable le agrego condiciones    
    if(add){

        // le pido que lea la cantidad de mi item a agregado
        add.cantidad = add.cantidad+1
        console.log(add.cantidad)
        console.log(document.getElementById(`cantidad${add.id}`))
        document.getElementById(`cantidad${add.id}`).innerHTML = `<p id=cantidad${add.id}> Cantidad : ${add.cantidad}</p>`

        // actualiza mi carrito porfa
        actualizarCarrito()
    }else{

        // creo una nueva variable y le asigno parametros
        let productoAgrgar = cards.find(elemento => elemento.id == id)

        // le pido que muestre y agregue
        miCompra.push(productoAgrgar)

        // tambien actualiza porfa
        actualizarCarrito()


        // creo el div que lo va a mostrar
        let div = document.createElement('div')
        div.className = 'compra'

        // le digo lo que tiene que mostrar (en este caso lo que agregué a mi carrito)
        div.innerHTML=`
        <div class="contenedorProductos">
        <h5>${productoAgrgar.nombre}</h5>
        <img src="${productoAgrgar.img}" alt="">
        <div class="textoPaquete">
            tiene promocion?: <span>${productoAgrgar.promo}</span>
            cantidad: <span>${productoAgrgar.cantidad}</span>
        </div>
        <p class="precio">${productoAgrgar.precio}</p>
        <button id="eliminar${productoAgrgar.id}" class="btn-eliminar">eliminar</button>
    </div>
        `
        //le digo que a productos elegidos debe agregarle las condiciones de mi variable "div"
        productosElegidos.appendChild(div)

        // le pido que elimine mi producto del carrito creando una variable
        let trash = document.getElementById(`eliminar${productoAgrgar.id}`)

                // le digo que esta variable se va a ejecutar cuando YO se lo pida, a traves de una arrow function con "REMOVE"
                trash.addEventListener('click',() =>{
                    console.log(productoAgrgar.nombre + ' ELIMINADO');
                    trash.parentElement.remove()
        
                    // le pido a mi array que almacena los prodcutos que filtre el id del objeto que quiero eliminar
                    miCompra=miCompra.filter(elemento=>elemento.id != productoAgrgar.id)
                    

                    // de vuelta actualizacion
                    actualizarCarrito()
        
                    // que el cambio se almacene en mi storage si elimino un producto
                    localStorage.setItem('compraProducto', JSON.stringify(miCompra))
                })
    }

        // que los agregados se almacenen en mi storage
        localStorage.setItem('compraProducto', JSON.stringify(miCompra))
}

// actualizar carrito

function actualizarCarrito(){
    // porfa reduce los agregados a un solo valor
    agregados.innerHTML = miCompra.reduce((acc,el) => acc + el.cantidad, 0)
    precioTotal.innerText = miCompra.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
    }

// salvar storage

function salvar (){
    let salvarStorage = JSON.parse(localStorage.getItem('compraProducto'))
    
    if(salvarStorage){
        salvarStorage.forEach(element =>{
            agregarProductos(element.id)

        });
    }
}
salvar();