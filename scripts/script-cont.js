const encabezado = `
<div class="cont-header">
    <div class="logo">
        <h1 class="titulo"><a href="#home" class="enlace-ancla">Devrel</a></h1>
    </div>
    <div class="nav-bar">
        <nav>
            <ul>
                <li><a href="#nosotros" class="enlace-ancla">NOSOTROS</a></li>
                <li><a href="#alojamiento" class="enlace-ancla">ALOJAMIENTO</a></li>
            </ul>
        </nav>
        <div class="btn-reservaciones">
            <span class="btn-text">RESERVAS</span>
        </div>
    </div>
</div>
`;

document.querySelector(".header").innerHTML = encabezado;