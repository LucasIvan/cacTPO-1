const encabezado = `
<div class="cont-header">
    <div class="logo">
        <h1 class="titulo"><a href="index.html">Devrel</a></h1>
    </div>
    <div class="nav-bar">
        <nav>
            <ul>
                <li><a href="./alojamiento.html">ALOJAMIENTO</a></li>
                <li><a href="./nosotros.html">NOSOTROS</a></li>
                <li><a href="./contacto.html">CONTACTO</a></li>
            </ul>
        </nav>
        <button>RESERVACIONES</button>
    </div>
</div>
`;

document.querySelector(".header").innerHTML = encabezado;