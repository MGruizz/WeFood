<h1 align="center">WeFood</h1>
<p align="center">
  <a href="https://github.com/MGruizz/WeFood"><strong>Explorar el proyecto »</strong></a>
</p>

<div align="center">
  <a href="https://github.com/MGruizz/WeFood">
    <img src="https://github.com/MGruizz/WeFood/tree/master/src/assets/imagenes/WeFood_Logo_Edit.png" alt="Logo" width="80" height="80">
  </a>
</div>

## Acerca del proyecto

Aplicación web tipo red social sobre recetas saludables, en la que los usuarios pueden publicar sus recetas, ver las de otras personas e interactuar entre sí.
Cuenta con opciones de creación de cuenta, inicio de sesión, acceso a perfil de usuario, publicación y edición de receta, y visualización de recetas publicadas en la aplicación.


## Detalles del código
Las vistas se encuentran en [pages](https://github.com/MGruizz/WeFood/tree/master/src/app/pages).
La aplicación cuenta con 2 formularios reactivos disponibles en las vistas de [login](https://github.com/MGruizz/WeFood/tree/master/src/app/pages/login) y [creacion-usuario](https://github.com/MGruizz/WeFood/tree/master/src/app/pages/creacion-usuario).

La vista info-recetas requiere ser accedida mediante uno de sus componentes padre (Inicio o perfil) para poder mostar los detalles ya que necesita que se le carguen datos antes. Esa vista se pobla mediante un observable.

## Requerimientos

Antes de ejecutar proyecto, escribir comando npm install para instalar todas las dependencias ubicadas en package.json.
<br>
Se debe tener la bd conectada y la api escuchando request para que el front funcione correctamente.
<br>
Luego ejecutar con comando ng serve y hacer uso normal de la aplicacion (se requiere estar registrado para poder logearse correctamente).

Para acceder al perfil, se requiere estar logeado o sino sera redireccionado al login.
<br>
Se puede acceder al inicio por url sin estar logeado.



## Tecnologias

En esta sección estarán listadas las tecnologias (lenguaje, frameworks y librerías) utilizadas en este proyecto.

* [Angular CLI](https://github.com/angular/angular-cli)
* [TypeScript](https://www.typescriptlang.org/)
* [Html](https://html.com/)
* [Css](https://www.w3schools.com/css/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Programadores

* Miguel Guerrero
* Sebastián Moyano
* Bastián Sepúlveda
