const Productos = 
[
{
    id:123,  
    nombre: "REMERA ESSENTIALS",
    precio: 15000,
    categoria: "remeras",
    imagen: "./img/Remera.jpg"
},
{
    id:456,  
    nombre: "BUZO ESSENTIALS",
    precio: 20000,
    categoria: "buzos",
    imagen: "img/Buzo.jpg"
},
{
    id:789,  
    nombre: "PANTALON ESSENTIALS",
    precio: 19000,
    categoria: "pantalones",
    imagen: "img/Pantalon.jpg"
},

]

const container = document.querySelector("#container")
const contenedorProductos = document.querySelector(".contenedorProductos")

const cargarProductos =(array)=> {

    if (array.length !== 0){
        let productos = ""
        contenedorProductos.innerHTML = ""
        array.forEach(producto => {
            productos = `<div class="text-center">
                            <img class="img-fluid imgProducto" src="${producto.imagen}" alt="">
                            <h4>${producto.nombre}</h4>
                            <div class="d-flex justify-content-around align-items-center">
                                <h5>$${producto.precio}</h5>
                                <button id="${producto.id}" class="btnCarrito"><i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                        </div>`
                    contenedorProductos.innerHTML += productos
        })
    }
    else{
        contenedorProductos.innerHTML = `<div>
        Producto no encontrado
        </div>`
    } 
}
    
cargarProductos(Productos)



let carrito = []
let total = 0

const actualizarCarrito =()=>{
    let carritoContenedor = document.querySelector("#carrito")

    let container = document.querySelector("#carritoContenedor")
    if(container){
        container.parentNode.removeChild(container)
    }

    let div = document.createElement("div")
    div.innerHTML= `<h2 class="tituloCarrito text-center">Carrito</h2>`
    div.setAttribute("id","carritoContenedor")
    for (const producto of carrito) {
        producto.subTotal = producto.cantidad * producto.precio
        div.innerHTML+=`
        <div class="itemCarrito container d-flex justify-content-around">
            <h6>Producto: ${producto.nombre}</h6>
            <h6>Precio: $${producto.precio}</h6>
            <h6>Cantidad: ${producto.cantidad}</h6>
            <h6>Subtotal: $${producto.subTotal}</h5>
        </div>`
    }
    const idTotal = document.querySelector(".idTotal")
    idTotal.innerHTML = `<h5 class="text-center">Total: $${total}</h5>`
    carritoContenedor.appendChild(div)

}



const eventoBoton = () =>{
    const botones = document.querySelectorAll(".btnCarrito") 
    for (const boton of botones) {
        boton.addEventListener("click",()=>{
            let producto = carrito.find(prod => prod.id == boton.id)
            if(producto){
                producto.cantidad++
                total += producto.precio
            }
            else{
                let producto = Productos.find(prod=> prod.id == boton.id)
                if(producto){
                    let nuevoProducto = {
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        categoria: producto.categoria,
                        imagen: producto.imagen,
                        cantidad: 1,
                        subTotal:0,
                    }
                    total += producto.precio  
                    carrito.push(nuevoProducto)
                }
               
            }
            

            actualizarCarrito()
        })
    }  
}
eventoBoton()

const buscar = document.querySelector("#buscar")

const filtrarProductos=()=>{
    buscar.value = buscar.value.toUpperCase()
    if (buscar.value !== ""){
        const resultado = Productos.filter(producto=> producto.nombre.includes(buscar.value))
        resultado.length !== 0 ? cargarProductos(resultado) : cargarProductos(resultado)
    }
    else{
        console.log("Entro al else")
        cargarProductos(Productos)
    }
    
}


buscar.addEventListener("input",filtrarProductos)