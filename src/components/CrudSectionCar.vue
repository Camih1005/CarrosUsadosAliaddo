<template>
    <v-container>
      <h1 class="text-h3 mb-6 text-center">Administración de Vehículos</h1>
  
      <v-alert v-if="errorMessage" type="error" class="mb-4">
        {{ errorMessage }}
      </v-alert>
  
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
  
      <v-row v-else>
        <v-col v-for="car in paginatedCars" :key="car.id" cols="12" sm="6" md="4" lg="3">
          <v-card class="mx-auto" max-width="344">
            <div class="image-container">
              <v-img
                :src="car.imagen"
                height="150px"
                width="150px"
                class="mx-auto mt-4"
                cover
              ></v-img>
            </div>
  
            <v-card-title>{{ car.modelo }}</v-card-title>
  
            <v-card-text>
              <div><strong>Modelo:</strong> {{ car.modelo }}</div>
              <div><strong>Marca:</strong> {{ car.marca }}</div>
              <div><strong>Año:</strong> {{ car.año }}</div>
              <div><strong>Precio:</strong> ${{ car.valor }}</div>
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="orange" variant="text" @click="openEditModal(car)">
                Editar
              </v-btn>
              <v-btn color="red" variant="text" @click="confirmDelete(car.id)">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
        class="mt-4"
      ></v-pagination>
  
      <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title class="headline">Editar Vehículo</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateCar">
              <v-text-field
                v-model="carToEdit.nombre"
                label="Nombre"
                required
              ></v-text-field>
              <v-text-field
                v-model="carToEdit.marca"
                label="Marca"
                required
              ></v-text-field>
              <v-text-field
                v-model="carToEdit.modelo"
                label="Modelo"
                required
              ></v-text-field>
              <v-text-field
                v-model="carToEdit.año"
                label="Año"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="carToEdit.valor"
                label="Precio"
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="carToEdit.imagen"
                label="URL de Imagen"
              ></v-text-field>
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-btn text @click="showModal = false">Cancelar</v-btn>
            <v-btn color="green" text @click="updateCar" :loading="loading">Actualizar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Confirmation Dialog -->
      <v-dialog v-model="showDeleteConfirmation" max-width="300">
        <v-card>
          <v-card-title class="headline">Confirmar Eliminación</v-card-title>
          <v-card-text>
            ¿Está seguro de que desea eliminar este vehículo?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" text @click="showDeleteConfirmation = false">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="executeDelete">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useFetch } from '../Apis/Api';
  
  const { list, update, remove } = useFetch();
  
  const cars = ref([]);
  const carToEdit = ref(null);
  const showModal = ref(false);
  const loading = ref(false);
  const errorMessage = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 8;
  const showDeleteConfirmation = ref(false);
  const carIdToDelete = ref(null);
  
  const totalPages = computed(() => Math.ceil(cars.value.length / itemsPerPage));
  
  const paginatedCars = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return cars.value.slice(start, end);
  });
  
  const fetchCarsData = async () => {
    try {
      loading.value = true;
      const data = await list('/cars');
      cars.value = data;
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
      errorMessage.value = 'Error al cargar los vehículos. Por favor, intente de nuevo.';
    } finally {
      loading.value = false;
    }
  };
  
  const openEditModal = (car) => {
    carToEdit.value = { ...car };
    showModal.value = true;
  };
  
  const updateCar = async () => {
    try {
      loading.value = true;
      errorMessage.value = '';
      
      const response = await update(`/cars/${carToEdit.value.id}`, carToEdit.value);
      console.log('Respuesta de actualización:', response);
  
      if (response) {
        const index = cars.value.findIndex(car => car.id === carToEdit.value.id);
        if (index !== -1) {
          cars.value[index] = { ...response };
        }
        showModal.value = false;
      } else {
        throw new Error('No se recibió respuesta del servidor');
      }
    } catch (error) {
      console.error('Error al actualizar el carro:', error);
      errorMessage.value = 'Error al actualizar el vehículo. Por favor, intente de nuevo.';
    } finally {
      loading.value = false;
    }
  };
  
  const confirmDelete = (id) => {
    carIdToDelete.value = id;
    showDeleteConfirmation.value = true;
  };
  
  const executeDelete = async () => {
    if (carIdToDelete.value) {
      try {
        loading.value = true;
        errorMessage.value = '';
        
        await remove(`/cars/${carIdToDelete.value}`);
        cars.value = cars.value.filter(car => car.id !== carIdToDelete.value);
        
        if (paginatedCars.value.length === 0 && currentPage.value > 1) {
          currentPage.value--;
        }
        
        showDeleteConfirmation.value = false;
      } catch (error) {
        console.error('Error al eliminar el carro:', error);
        errorMessage.value = 'Error al eliminar el vehículo. Por favor, intente de nuevo.';
      } finally {
        loading.value = false;
      }
    }
  };
  
  const handlePageChange = (page) => {
    currentPage.value = page;
  };
  
  onMounted(fetchCarsData);
  </script>
  
  <style scoped>
  .v-container {
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 3rem;
  }
  
  .v-card {
    transition: transform 0.3s;
  }
  
  .v-card:hover {
    transform: translateY(-5px);
  }
  
  .image-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  @media (min-width: 1024px) {
    .v-container {
      min-height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;
    }
  }
  </style>
  
  