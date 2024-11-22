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
    width: 90vw;  
    height: 120px; 
    margin: auto;
    overflow: hidden;
  }
  
  .slider .slide-track {
    display: flex;
    animation: scroll 30s linear infinite;
    width: calc(200px * 14);  
  }
  
  .slider .slide {
    width: 200px; 
    height: 100%; 
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  
  .slider .slide img {
    width: 100px;  
    height: 100px; 
    object-fit: contain; 
    padding: 5px; 
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 7)); 
    }
  }
  </style>
  