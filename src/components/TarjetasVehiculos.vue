<template>
    <v-sheet class="mx-auto" elevation="8" max-width="1000">
      <!-- Filtro de tipo de vehículo -->
      <v-select 
        v-model="selectedType" 
        :items="vehicleTypes" 
        label="Seleccionar tipo de vehículo" 
        @change="fetchCarsData" 
        class="mb-4" 
        id="about" 
      />
    
      <!-- tarjetas -->
      <v-slide-group v-model="model" class="pa-4" show-arrows>
        <v-slide-group-item 
          v-for="(item, index) in filteredCars" 
          :key="index" 
          v-slot="{ isSelected, selectedClass }"
        >
          <v-card 
            :class="['ma-4', selectedClass]" 
            color="white" 
            height="100" 
            width="100" 
            @click="toggleExpansion(item)"
          >
            <!-- Imagen de la API -->
            <v-img 
              v-if="item.imagen" 
              :src="item.imagen" 
              height="150" 
              alt="Imagen del auto" 
            />
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    
      <!-- Expansión con el modelo seleccionado -->
      <v-expand-transition>
        <v-sheet v-if="expandedCar" height="300" class="pa-4">
          <v-row>
            <!-- Imagen del vehículo a un lado cuando se expande -->
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-img 
                v-if="expandedCar.imagen" 
                :src="expandedCar.imagen" 
                height="300" 
                alt="Imagen ampliada del auto" 
                class="rounded" 
              />
            </v-col>
    
            <!-- Detalles del vehículo a la derecha -->
            <v-col cols="12" md="6">
              <div class="d-flex flex-column align-center justify-center">
                <h3>{{ expandedCar.nombre }}</h3>
                <p><strong>Modelo:</strong> {{ expandedCar.modelo }}</p>
                <p><strong>Marca:</strong> {{ expandedCar.marca }}</p>
                <p><strong>Año:</strong> {{ expandedCar.año }}</p>
                <p><strong>Precio:</strong> ${{ expandedCar.valor }}</p>
                <v-btn @click="openModal(expandedCar)">Pedir Test Drive</v-btn>
                <img 
                  src="https://tiendaonlinemini.vtexassets.com/arquivos/SellosLegales-Cortos-Negros-sin-colision.png" 
                  height="100" 
                  alt="Sellos legales" 
                />
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
    
    <!-- Formulario -->
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline d-flex justify-between align-center">
          Formulario de Contacto
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img 
            v-if="selectedCar?.imagen" 
            :src="selectedCar.imagen" 
            height="150" 
            alt="Imagen del auto" 
          />
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.nombre"
              label="Nombre"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="formData.apellido"
              label="Apellido"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              v-model="formData.correo"
              label="Correo electrónico"
              :rules="[rules.required, rules.email]"
              required
              type="email"
            />
            <v-text-field
              v-model="formData.telefono"
              label="Teléfono"
              :rules="[rules.required, rules.numeric]"
              required
              type="tel"
            />
            <v-text-field
              v-model="formData.cedula"
              label="Cédula"
              :rules="[rules.required, rules.numeric]"
              required
            />
            <v-text-field
              v-model="formData.ciudad"
              label="Ciudad"
              :rules="[rules.required]"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeModal">Cerrar</v-btn>
          <v-btn color="primary" @click="submitForm">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
    <!-- Modal de agradecimiento -->
    <v-dialog v-model="thankYouDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Gracias por tu interés</v-card-title>
        <v-card-text>
          <p>¡Pronto nos pondremos en contacto contigo!</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeThankYouModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useFetch } from '../Apis/Api';
  
  const { list, submitForm: apiSubmitForm } = useFetch();
  
  const model = ref(null);
  const cars = ref([]);
  const filteredCars = ref([]);
  const selectedType = ref(null);
  const expandedCar = ref(null);
  const dialog = ref(false);
  const selectedCar = ref(null);
  const thankYouDialog = ref(false);
  const form = ref(null);
  
  const formData = reactive({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    cedula: '',
    ciudad: '',
  });
  
  const rules = {
    required: value => !!value || 'Este campo es obligatorio.',
    email: value => /.+@.+\..+/.test(value) || 'El correo electrónico no es válido.',
    numeric: value => /^[0-9]+$/.test(value) || 'Solo se permiten números.',
  };
  
  const vehicleTypes = ['Camioneta', 'SUV', 'Deportivo'];
  
  const fetchCarsData = async () => {
    try {
      const ruta = selectedType.value ? `/cars?tipo=${selectedType.value}` : '/cars';
      const data = await list(ruta);
      cars.value = data;
      filterCars();
    } catch (error) {
      console.error('Error al obtener los datos de la API:', error);
    }
  };
  
  const filterCars = () => {
    if (selectedType.value) {
      filteredCars.value = cars.value.filter(car => car.tipo === selectedType.value);
    } else {
      filteredCars.value = cars.value;
    }
  };
  
  const toggleExpansion = car => {
    expandedCar.value = expandedCar.value === car ? null : car;
  };
  
  const openModal = car => {
    selectedCar.value = car;
    dialog.value = true;
  };
  
  const closeModal = () => {
    dialog.value = false;
    selectedCar.value = null;
    if (form.value) {
      form.value.reset();
    }
  };
  
  const closeThankYouModal = () => {
    thankYouDialog.value = false;
  };
  
  const submitForm = async () => {
    const { valid } = await form.value.validate();
    
    if (valid) {
      try {
        const formDataToSend = {
          ...formData,
          carro: selectedCar.value.id
        };
  
        const result = await apiSubmitForm(formDataToSend);
        console.log('Respuesta de la API:', result);
  
        closeModal();
        thankYouDialog.value = true;
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
      }
    } else {
      console.log('El formulario no es válido');
    }
  };
  
  onMounted(fetchCarsData);
  </script>
  
  <style scoped>
  p {
    padding: 3px;
  }
  </style>
  
  