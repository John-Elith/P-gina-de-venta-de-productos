// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE PRODUCTOS ---
    // Un array de objetos, donde cada objeto es un producto con sus propiedades.
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Vajilla de Cerámica',
            precio: 85000,
            imagen: 'https://images.pexels.com/photos/1813503/pexels-photo-1813503.jpeg',
            categoria: 'hogar',
            descripcion: 'Juego de vajilla de 16 piezas en cerámica de alta calidad, perfecto para 4 personas. Diseño moderno y elegante.'
        },
        {
            id: 2,
            nombre: 'Sábanas de Algodón',
            precio: 120000,
            imagen: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
            categoria: 'hogar',
            descripcion: 'Juego de sábanas tamaño Queen, 100% algodón de 400 hilos. Suavidad y confort garantizados.'
        },
        {
            id: 3,
            nombre: 'Mesa de Centro Moderna',
            precio: 350000,
            imagen: 'https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg',
            categoria: 'hogar',
            descripcion: 'Mesa de centro con estructura de metal y superficie de madera. Estilo industrial para tu sala.'
        },
        {
            id: 4,
            nombre: 'Zapatos Deportivos',
            precio: 250000,
            imagen: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            categoria: 'personal',
            descripcion: 'Zapatos para correr con tecnología de amortiguación avanzada. Ligeros y transpirables.'
        },
        {
            id: 5,
            nombre: 'Laptop Ultrabook',
            precio: 2800000,
            imagen: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            categoria: 'tecnologia',
            descripcion: 'Laptop delgada y potente con procesador Core i7, 16GB de RAM y 512GB SSD. Ideal para trabajo y estudio.'
        },
        {
            id: 6,
            nombre: 'Smartphone de Gama Alta',
            precio: 1900000,
            imagen: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            categoria: 'tecnologia',
            descripcion: 'El último smartphone con pantalla OLED de 6.7 pulgadas, cámara triple de 108MP y batería de larga duración.'
        },
        {
            id: 7,
            nombre: 'Kit de Útiles Escolares',
            precio: 45000,
            imagen: 'https://images.pexels.com/photos/5088026/pexels-photo-5088026.jpeg',
            categoria: 'escolar',
            descripcion: 'Completo kit escolar con cuadernos, lápices, colores, regla y todo lo necesario para el regreso a clases.'
        },
        {
            id: 8,
            nombre: 'Ventilador de Techo',
            precio: 180000,
            imagen: 'https://images.pexels.com/photos/12700431/pexels-photo-12700431.jpeg',
            categoria: 'hogar',
            descripcion: 'Ventilador de torre silencioso con 3 velocidades y control remoto. Diseño elegante que ahorra espacio.'
        }

    ];

    // --- VARIABLES Y ELEMENTOS DEL DOM ---
    let carrito = []; // Array para guardar los productos del carrito
    const divisa = 'COP'; // Moneda (Pesos Colombianos)
    const contenedorProductos = document.querySelector('#contenedor-productos');
    
    // Elementos del Carrito
    const iconoCarrito = document.querySelector('.icono-carrito');
    const modalCarrito = document.querySelector('#modal-carrito');
    const cerrarCarrito = document.querySelector('#cerrar-carrito');
    const itemsCarrito = document.querySelector('#items-carrito');
    const precioTotal = document.querySelector('#precio-total');
    const contadorCarrito = document.querySelector('#contador-carrito');

    // Elementos del Modal de Detalles
    const modalProducto = document.querySelector('#modal-producto');
    const cerrarDetalle = document.querySelector('#cerrar-detalle');
    const modalDetalleContenido = document.querySelector('#modal-detalle-contenido');

    // Elementos de los Filtros
    const filtroCategoria = document.querySelector('#filtro-categoria');
    const filtroPrecio = document.querySelector('#filtro-precio');

    // --- FUNCIONES ---

    /**
     * Formatea un número como moneda colombiana (COP).
     * @param {number} numero - El número a formatear.
     * @returns {string} El número formateado como string de moneda.
     */
    function formatearMoneda(numero) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: divisa, minimumFractionDigits: 0 }).format(numero);
    }

    /**
     * Dibuja todos los productos en el DOM. Puede recibir una lista de productos filtrada.
     * @param {Array} productos - El array de productos a mostrar. Por defecto, usa la base de datos completa.
     */
    function renderizarProductos(productos = baseDeDatos) {
        contenedorProductos.innerHTML = ''; // Limpia el contenedor
        productos.forEach((producto) => {
            // Crea la tarjeta del producto
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-producto');
            
            // Crea el contenido HTML de la tarjeta
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" data-id="${producto.id}">
                <div class="info-producto">
                    <h3>${producto.nombre}</h3>
                    <p class="categoria">${producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}</p>
                    <p class="precio">${formatearMoneda(producto.precio)}</p>
                    <button class="btn-agregar" data-id="${producto.id}">
                        <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            `;
            
            // Añade la tarjeta al contenedor
            contenedorProductos.appendChild(tarjeta);
        });
    }

    /**
     * Añade un producto al carrito de compras.
     * @param {Event} evento - El evento de click del botón.
     */
    function agregarProductoAlCarrito(evento) {
        // Obtiene el ID del producto desde el botón presionado
        const idProducto = parseInt(evento.target.dataset.id);
        
        // Busca si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.id === idProducto);

        if (itemExistente) {
            // Si ya existe, aumenta la cantidad
            itemExistente.cantidad++;
        } else {
            // Si no existe, lo busca en la base de datos y lo añade al carrito
            const producto = baseDeDatos.find(p => p.id === idProducto);
            carrito.push({ ...producto, cantidad: 1 });
        }
        
        // Actualiza la visualización del carrito
        renderizarCarrito();
    }

    /**
     * Dibuja todos los productos que están en el carrito en el modal.
     */
    function renderizarCarrito() {
        itemsCarrito.innerHTML = ''; // Limpia el contenedor del carrito
        if (carrito.length === 0) {
            itemsCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        }
        else {
            carrito.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-carrito');
                itemDiv.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="info-item-carrito">
                        <h4>${item.nombre}</h4>
                        <p>${formatearMoneda(item.precio)} x ${item.cantidad}</p>
                    </div>
                    <div class="controles-item-carrito">
                        <button class="btn-restar" data-id="${item.id}">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-sumar" data-id="${item.id}">+</button>
                    </div>
                    <button class="btn-eliminar-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                `;
                itemsCarrito.appendChild(itemDiv);
            });
        }
        // Actualiza el precio total y el contador del ícono
        actualizarTotalYContador();
    }

    /**
     * Actualiza el precio total del carrito y el contador del ícono.
     */
    function actualizarTotalYContador() {
        const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
        const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
        
        precioTotal.textContent = formatearMoneda(total);
        contadorCarrito.textContent = totalItems;
    }

    /**
     * Maneja los clics en los botones del carrito (sumar, restar, eliminar).
     * @param {Event} evento - El evento de click.
     */
    function manejarEventosCarrito(evento) {
        const id = parseInt(evento.target.dataset.id);
        
        if (evento.target.classList.contains('btn-sumar')) {
            const item = carrito.find(i => i.id === id);
            if (item) item.cantidad++;
        }

        if (evento.target.classList.contains('btn-restar')) {
            const item = carrito.find(i => i.id === id);
            if (item && item.cantidad > 1) {
                item.cantidad--;
            } else if (item && item.cantidad === 1) {
                // Si la cantidad es 1, elimina el item
                carrito = carrito.filter(i => i.id !== id);
            }
        }

        if (evento.target.classList.contains('btn-eliminar-item') || evento.target.parentElement.classList.contains('btn-eliminar-item')) {
             const idEliminar = parseInt(evento.target.closest('.btn-eliminar-item').dataset.id);
            carrito = carrito.filter(i => i.id !== idEliminar);
        }

        renderizarCarrito();
    }

    /**
     * Muestra los detalles de un producto en un modal.
     * @param {Event} evento - El evento de click en la imagen del producto.
     */
    function mostrarDetalleProducto(evento) {
        if (evento.target.tagName === 'IMG') {
            const id = parseInt(evento.target.dataset.id);
            const producto = baseDeDatos.find(p => p.id === id);

            if (producto) {
                modalDetalleContenido.innerHTML = `
                    <span class="cerrar-modal" id="cerrar-detalle-interno">&times;</span>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">${formatearMoneda(producto.precio)}</p>
                    <p class="categoria">Categoría: ${producto.categoria}</p>
                    <p class="descripcion">${producto.descripcion}</p>
                    <button class="btn-agregar" data-id="${producto.id}">
                        <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                    </button>
                `;
                modalProducto.style.display = 'block';

                // Añadir evento de cierre al nuevo botón
                document.getElementById('cerrar-detalle-interno').addEventListener('click', () => {
                    modalProducto.style.display = 'none';
                });
                 // Añadir evento al botón de agregar dentro del modal
                modalDetalleContenido.querySelector('.btn-agregar').addEventListener('click', agregarProductoAlCarrito);
            }
        }
    }

    /**
     * Aplica los filtros de categoría y precio.
     */
    function aplicarFiltros() {
        const categoriaSeleccionada = filtroCategoria.value;
        const precioSeleccionado = filtroPrecio.value;

        let productosFiltrados = baseDeDatos;

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todos') {
            productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaSeleccionada);
        }

        // Filtrar por precio
        if (precioSeleccionado !== 'todos') {
            productosFiltrados = productosFiltrados.filter(producto => producto.precio < parseInt(precioSeleccionado));
        }

        renderizarProductos(productosFiltrados);
    }


    // --- EVENT LISTENERS (ESCUCHADORES DE EVENTOS) ---

    // Clicks en el contenedor de productos (para agregar al carrito o ver detalles)
    contenedorProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            agregarProductoAlCarrito(e);
        }
        if (e.target.tagName === 'IMG') {
            mostrarDetalleProducto(e);
        }
    });

    // Abrir y cerrar el modal del carrito
    iconoCarrito.addEventListener('click', () => {
        modalCarrito.style.display = 'block';
        renderizarCarrito();
    });

    cerrarCarrito.addEventListener('click', () => {
        modalCarrito.style.display = 'none';
    });

    // Cerrar el modal de detalle
    cerrarDetalle.addEventListener('click', () => {
        modalProducto.style.display = 'none';
    });

    // Cerrar modales si se hace clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target == modalCarrito) {
            modalCarrito.style.display = 'none';
        }
        if (e.target == modalProducto) {
            modalProducto.style.display = 'none';
        }
    });

    // Eventos para los botones dentro del carrito
    itemsCarrito.addEventListener('click', manejarEventosCarrito);

    // Eventos para los filtros
    filtroCategoria.addEventListener('change', aplicarFiltros);
    filtroPrecio.addEventListener('change', aplicarFiltros);

    // --- INICIALIZACIÓN ---
    // Renderiza los productos por primera vez al cargar la página
    renderizarProductos();
});
