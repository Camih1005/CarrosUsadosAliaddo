<template>
  <br>
    <div class="slider">
      <div class="slide-track">
        <div class="slide">
          <img src="../assets/imagenes/bmw.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/citroen.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/ford.jpg" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/honda.webp" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/mazda.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/nissan.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/renault.png" alt="">
        </div>
  
        <div class="slide">
          <img src="../assets/imagenes/vw.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/bmw.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/citroen.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/ford.jpg" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/honda.webp" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/mazda.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/nissan.png" alt="">
        </div>
        <div class="slide">
          <img src="../assets/imagenes/renault.png" alt="">
        </div>
  
        <div class="slide">
          <img src="../assets/imagenes/vw.png" alt="">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .slider {
    width: 90vw;  /* El ancho del slider */
    height: 120px; /* Altura fija para las imágenes */
    margin: auto;
    overflow: hidden;
  }
  
  .slider .slide-track {
    display: flex;
    animation: scroll 30s linear infinite;
    width: calc(200px * 14);  /* Ancho total del contenido desplazable (200px por cada imagen) */
  }
  
  .slider .slide {
    width: 200px;  /* Ancho fijo para cada imagen */
    height: 100%;  /* Asegura que cada contenedor tenga la misma altura */
    display: flex;
    justify-content: center;
    align-items: center;  /* Centra la imagen dentro del contenedor */
  }
  
  .slider .slide img {
    width: 100px;  /* Hace que la imagen ocupe todo el ancho del contenedor */
    height: 100px;  /* Hace que la imagen ocupe toda la altura del contenedor */
    object-fit: contain; 
    padding: 5px; /* Asegura que la imagen no se deforme y se ajuste al contenedor */
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 7)); /* Desplazamiento hacia la izquierda por la cantidad de imágenes */
    }
  }
  </style>
  