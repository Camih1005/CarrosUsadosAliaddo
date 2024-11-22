<script setup>
import { ref } from 'vue'

// Ref para almacenar los objetos con imágenes y GIFs
const items = ref([
  {
    id: 1,
    type: 'image', // Puedes usar 'image' o 'gif' para diferenciar el tipo
    desktopSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/09/banner-desktop-acc-prado.jpg', // URL de la imagen de escritorio
    mobileSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/09/banner-mobile-acc-prado.jpg', // URL de la imagen móvil
    alt: 'Imagen 1'
  },
  {
    id: 2,
    type: 'gif',
    desktopSrc: 'https://tiendaonlinebmw.vtexassets.com/assets/vtex.file-manager-graphql/images/3c8840c6-bf2b-4a5c-aeed-1d89bf7a41fe___ad7513142588d1e3830af1ac1bcc4c12.jpg',
    mobileSrc: 'https://tiendaonlinebmw.vtexassets.com/assets/vtex.file-manager-graphql/images/344bc192-fe5b-4560-b6c4-6303ed0451ed___a817fff73bc408e6035325907dc38bcb.jpg',
    alt: 'GIF 1'
  },
  {
    id: 3,
    type: 'image',
    desktopSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/08/banner-desktop-genuinos_27-08.jpg',
    mobileSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/08/banner-mobile-genuinos_27-08.jpg',
    alt: 'Imagen 2'
  },
  {
    id: 4,
    type: 'gif',
    desktopSrc: 'https://www.ford.com.co/content/ford/co/es_co/home/jcr:content/par/mboxcontainer_403677784/generalParsys/billboard_651692748/imageComponent/image.imgs.full.high.jpg',
    mobileSrc: 'https://www.ford.com.co/content/dam/Ford/website-assets/latam/co/homepage/secondary-billboards/fco-homepage-billboard-electricos.jpg/jcr:content/renditions/small.jpeg',
    alt: 'GIF 2'
  },
  // Agrega más elementos según sea necesario
])
</script>

<template>
  <div class="carousel-container">
    <p class="text-center" v-if="!items.length">Loading...</p>

    <!-- Mostrar carrusel solo si hay elementos disponibles -->
    <v-carousel v-if="items.length" show-arrows="hover">
      <!-- Iteramos sobre la lista de elementos (imágenes y gifs) -->
      <v-carousel-item
        v-for="item in items"
        :key="item.id"
        class="carousel-item"
      >
        <!-- Mostrar imagen o gif según el tipo y el tamaño de la pantalla -->
        <img v-if="item.type === 'image'" :src="item.desktopSrc" :alt="item.alt" class="carousel-image desktop-image"/>
        <img v-if="item.type === 'image'" :src="item.mobileSrc" :alt="item.alt" class="carousel-image mobile-image"/>
        <img v-if="item.type === 'gif'" :src="item.desktopSrc" :alt="item.alt" class="carousel-image desktop-image"/>
        <img v-if="item.type === 'gif'" :src="item.mobileSrc" :alt="item.alt" class="carousel-image mobile-image"/>
      </v-carousel-item>
    </v-carousel>

    <!-- Mensaje si no hay elementos disponibles -->
    <div v-else class="text-center">
      <p>No hay elementos disponibles.</p>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Asegura que ocupe todo el ancho disponible */
  height: 80dvh; /* Asegura que el contenedor tenga una altura de 100dvh */
  background-color: rgba(219, 219, 219, 0.078);
}

.text-center {
  text-align: center;
  font-size: 1.2em;
  color: gray;
}

/* Estilo para asegurar que las imágenes y GIFs tengan el mismo tamaño */
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Hace que cada item ocupe todo el ancho del contenedor */
  height: 100%; /* Asegura que el carrusel ocupe toda la altura disponible */
}

/* Estilo para las imágenes de escritorio */
.desktop-image {
  display: block;
}

.mobile-image {
  display: none;
}

/* Estilo para las imágenes móviles */
@media (max-width: 768px) {
  .desktop-image {
    display: none;
  }
  .mobile-image {
    display: block;
  }
}

/* Estilo de la imagen para que se ajuste y se centre correctamente */
.carousel-image {
  width: 100%; /* Hace que la imagen ocupe todo el ancho del contenedor */
  height: 100%; /* Hace que la imagen ocupe toda la altura disponible */
  object-fit: cover; /* Asegura que la imagen ocupe todo el espacio sin perder relación de aspecto */

}
</style>
