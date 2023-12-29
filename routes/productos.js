const express = require("express");
const route = express.Router();

//simulacion de base de datos
let productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 10.99
    },
    {
        id: 2,
        nombre: 'Producto 2',
        precio: 19.99
    },
    {
        id: 3,
        nombre: 'Producto 3',
        precio: 5.99
    },
];

//mostrar productos
route.get('/',(req, res, next)=>{
    try {
        res.json(productos); 
    } catch (error) {
        next(error);
    }
    
});

//muestro producto por id
route.get('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const producto = productos.find((p) => p.id == id);

        if (!producto){
            const error = new Error ('Producto no encontrado');
            error.status = 404;
            throw error;
        }
        res.json(producto);
    } catch (error) {
        next(error);
    }
    
});

//creo un producto
route.post('/',(req, res, next)=>{
    try {
        const {nombre, precio} = req.body;

        const nuevoProducto = {
            id: productos.length +1,
            nombre,
            precio,
        }
        productos.push(nuevoProducto);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        next(error);
    }
    
});

//modificar producto
route.put('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const {nombre, precio} = req.body;

        const producto = productos.find((p)=> p.id == id);

        if (!producto) {
            const error = new Error ('Producto no encontrado');
            error.status = 404;
            throw error;
        }   
        
        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        res.json(producto);
        
    } catch (error) {
        next(error);
    }
    
});

//borrar producto
route.delete('/:id',(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const index = productos.findIndex((p)=> p.id == id);
    
        if (index == -1) {
            const error = new Error ('Producto no encontrado');
            error.status = 404;
            throw error;
        }
            const productoEliminado = productos.splice(index, 1);
            res.json(productoEliminado[0]);
        
    } catch (error) {
        next(error);
    }
  
});

module.exports = route;
