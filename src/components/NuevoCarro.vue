<template>
    <div>
      <v-btn
        color="primary"
        @click="dialog = true"
        class="mb-4"
      >
        Agregar Nuevo Carro
      </v-btn>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Agregar Nuevo Carro</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm" ref="form">
              <v-text-field
                v-model="newCar.marca"
                label="Marca"
                :rules="[v => !!v || 'La marca es requerida']"
                required
              ></v-text-field>
              <v-text-field
                v-model="newCar.modelo"
                label="Modelo"
                :rules="[v => !!v || 'El modelo es requerido']"
                required
              ></v-text-field>
              <v-text-field
                v-model="newCar.color"
                label="Color"
                :rules="[v => !!v || 'El color es requerido']"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newCar.año"
                label="Año"
                type="number"
                :rules="[
                  v => !!v || 'El año es requerido',
                  v => (v && v > 1900 && v <= new Date().getFullYear()) || 'Año inválido'
                ]"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newCar.puertas"
                label="Número de Puertas"
                type="number"
                :rules="[
                  v => !!v || 'El número de puertas es requerido',
                  v => (v && v > 0 && v <= 6) || 'Número de puertas inválido'
                ]"
                required
              ></v-text-field>
              <v-text-field
                v-model.number="newCar.valor"
                label="Valor"
                type="number"
                :rules="[v => !!v || 'El valor es requerido']"
                required
              ></v-text-field>
              <v-text-field
                v-model="newCar.imagen"
                label="URL de la Imagen"
                :rules="[v => !!v || 'La URL de la imagen es requerida']"
                required
              ></v-text-field>
              <v-select
                v-model="newCar.tienda"
                :items="tiendas"
                item-title="text"
                item-value="value"
                label="Tienda"
                :rules="[v => !!v || 'La tienda es requerida']"
                required
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="submitForm">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useFetch } from '../Apis/Api';
  
  const { list } = useFetch(); 
  
  const dialog = ref(false);
  const form = ref(null);
  
  const newCar = ref({
    marca: '',
    modelo: '',
    color: '',
    año: null,
    puertas: null,
    valor: null,
    imagen: '',
    tienda: null
  });
  
  const tiendas = [
    { text: 'Tienda 1', value: 1 },
    { text: 'Tienda 2', value: 2 },
    { text: 'Tienda 3', value: 3 }
  ];
  
  const emit = defineEmits(['car-added']);
  
  const submitForm = async () => {
    const { valid } = await form.value.validate();
    
    if (valid) {
      try {
        const response = await list('/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCar.value)
        });
        console.log('Carro agregado:', response);
        emit('car-added', response);
        dialog.value = false;
        resetForm();
      } catch (error) {
        console.error('Error al agregar el carro:', error);
      }
    }
  };
  
  const resetForm = () => {
    newCar.value = {
      marca: '',
      modelo: '',
      color: '',
      año: null,
      puertas: null,
      valor: null,
      imagen: '',
      tienda: null
    };
    form.value.reset();
  };
  </script>