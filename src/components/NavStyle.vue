<script setup>
  import { shallowRef } from 'vue'

  const drawer = shallowRef(false)
//   //RECORDAR : Esto está intentando usar el name de cada objeto en el array items, pero si la propiedad url en el array no corresponde con los nombres de las rutas definidas en el router, entonces Vue Router no encontrará ninguna ruta coincidente.

// los nombres de las rutas en items coincidan con los nombres de las rutas en tu configuración de Vue Router
  const items = [
  
    {
      text: 'Inicio',
      url: '/', 
    },
    {
      text: 'Admin',
      url: '/adm/new', 
    },
    {
      text: 'Autos',
      
    },
    {
      text: 'Servicios',
      
    },
    {
      text: 'Ventas',
      url: '/ventas', 
    },
  ]
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer" color="gray" disable-resize-watcher>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :active="i === 0"
          link
          :to="item.url" 
          :title="item.text"
        />
        <!-- PARA RECORDAR: No es name: item.url es solo item.url -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="px-md-4 transparent">
      <template #prepend>
        <v-app-bar-nav-icon v-if="$vuetify.display.smAndDown" @click="drawer = !drawer" />
      </template>

      <v-img class="me-sm-8" max-width="60" src="https://img.freepik.com/vector-premium/coche-rojo-logotipo-rojo-que-dice-coche-el_1193704-5845.jpg?semt=ais_hybrid" />

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn v-for="(item, i) in items" :key="i" :active="i === 0" class="me-2 text-none" slim :to="item.url">
          {{ item.text }} 
        </v-btn>
      </template>

      <v-spacer />

      <template #append>
        <v-btn class="ms-1" color="medium-emphasis" icon="mdi-bell-outline" />
      
      </template>
    </v-app-bar>

    <v-main height="50"></v-main>
  </v-layout>
</template>
