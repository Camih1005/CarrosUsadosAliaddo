<script setup>
import { ref } from 'vue'

const items = ref([
  {
    id: 1,
    type: 'image',
    desktopSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/09/banner-desktop-acc-prado.jpg',
    mobileSrc: 'https://www.toyota.com.co/wp-content/uploads/2024/09/banner-mobile-acc-prado.jpg', 
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

])
</script>

<template>
  <div class="carousel-container">
    <p class="text-center" v-if="!items.length">Loading...</p>

    <!-- Mostrar carrusel solo si hay elementos disponibles :D -->
    <v-carousel v-if="items.length" show-arrows="hover">
      
      <v-carousel-item
        v-for="item in items"
        :key="item.id"
        class="carousel-item"
      >
      
        <img v-if="item.type === 'image'" :src="item.desktopSrc" :alt="item.alt" class="carousel-image desktop-image"/>
        <img v-if="item.type === 'image'" :src="item.mobileSrc" :alt="item.alt" class="carousel-image mobile-image"/>
        <img v-if="item.type === 'gif'" :src="item.desktopSrc" :alt="item.alt" class="carousel-image desktop-image"/>
        <img v-if="item.type === 'gif'" :src="item.mobileSrc" :alt="item.alt" class="carousel-image mobile-image"/>
      </v-carousel-item>
    </v-carousel>

    <!-- Else por si no hay carros disponibles -->
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
  width: 100%; 
  height: 80dvh; 
  background-color: rgba(219, 219, 219, 0.078);
}

.text-center {
  text-align: center;
  font-size: 1.2em;
  color: gray;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%; 
}


.desktop-image {
  display: block;
}

.mobile-image {
  display: none;
}


@media (max-width: 768px) {
  .desktop-image {
    display: none;
  }
  .mobile-image {
    display: block;
  }
}


.carousel-image {
  width: 100%;
  height: 100%; 
  object-fit: cover; 

}
</style>
