<template>
  <!-- Contenedor principal con borde -->
   <div id ="inventory"></div>
  <v-container class="pa-sm-6 pa-md-12 border rounded-lg" fluid>
    <!-- Sección principal de bienvenida -->
    <v-responsive class="text-center mx-auto border rounded-lg pa-4" max-width="700">
      <p class="font-weight-medium text-primary">Compra tu auto usado de forma segura</p>

      <p class="mt-2 text-h5 font-weight-bold text-md-h4">
        Autos certificados al mejor precio
      </p>

      <p class="mt-4 text-body-1 text-medium-emphasis">
        Encuentra tu próximo vehículo en nuestra concesionaria. Ofrecemos 
        inspección técnica completa, opciones de financiamiento, y una amplia variedad 
        de marcas y modelos. ¡Conduce tu auto ideal hoy mismo!
      </p>

      <!-- Botón principal con acción -->
      <v-btn
        color="primary"
        class="mt-4 text-white"
        @click="goToInventory"
      >
        Ver inventario completo
      </v-btn>
    </v-responsive>

    <!-- Sección de características con borde -->
    <v-row class="mt-8 border rounded-lg pa-4">
      <v-col
        v-for="(item, i) in features"
        :key="i"
        class="d-flex"
        cols="12"
        md="4"
      >
        <!-- Cada característica con borde -->
        <v-responsive class="mx-auto border rounded-lg pa-4" max-width="500" width="100%">
          <v-list-item
            class="px-0"
            rounded="lg"
            :subtitle="item.subtitle"
          >
            <template #title>
              <p class="text-body-2 font-weight-bold pb-2">
                <v-icon
                  class="mr-2"
                  color="primary"
                  :icon="item.icon"
                  size="small"
                />
                {{ item.title }}
              </p>
            </template>

            <!-- Botón de acción dentro de cada característica -->
            <v-chip
              append-icon="mdi-arrow-right"
              class="mt-6"
              color="primary"
              size="small"
              @click="handleAction(item.action)"
            >
              {{ item.buttonText }}
            </v-chip>
          </v-list-item>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: "Explorar inventario",
          subtitle: "Descubre todos los autos disponibles, con fotos y detalles técnicos.",
          icon: "mdi-car",
          buttonText: "Ver autos",
          action: "exploreInventory"
        },
        {
          title: "Planes de financiamiento",
          subtitle: "Opciones de crédito flexibles y accesibles para todos.",
          icon: "mdi-cash-multiple",
          buttonText: "Solicitar financiamiento",
          action: "applyFinancing"
        },
        {
          title: "Garantía extendida",
          subtitle: "Asegura tu tranquilidad con nuestra garantía adicional.",
          icon: "mdi-shield-check",
          buttonText: "Conoce más",
          action: "viewWarranty"
        },
        {
          title: "Vende tu auto",
          subtitle: "Te compramos tu auto usado al mejor precio del mercado.",
          icon: "mdi-currency-usd",
          buttonText: "Vender ahora",
          action: "sellCar"
        },
        {
          title: "Revisión técnica",
          subtitle: "Todos nuestros vehículos están certificados y revisados a detalle.",
          icon: "mdi-wrench",
          buttonText: "Saber más",
          action: "viewTechnical"
        },
        {
          title: "Asesoramiento personalizado",
          subtitle: "Nuestros expertos te ayudan a elegir el auto perfecto.",
          icon: "mdi-account-circle",
          buttonText: "Hablar con un asesor",
          action: "contactAdvisor"
        }
      ]
    };
  },
  methods: {
    goToInventory() {
      // Navegar al inventario completo
      this.$router.push("/inventory");
    },
    handleAction(action) {
      // Acciones según el botón clicado
      switch (action) {
        case "exploreInventory":
          this.$router.push("/inventory");
          break;
        case "applyFinancing":
          this.$router.push("/financing");
          break;
        case "viewWarranty":
          this.$router.push("/warranty");
          break;
        case "sellCar":
          this.$router.push("/sell");
          break;
        case "viewTechnical":
          this.$router.push("/technical-review");
          break;
        case "contactAdvisor":
          this.$router.push("/contact");
          break;
        default:
          console.warn("Acción no definida:", action);
      }
    }
  }
};
</script>

<style scoped>
.text-primary {
  color: #ff00006c; /* Azul representativo */
}

/* Opcional: estilo adicional para bordes */
.border {
  border: 2px solid #3d3d3d63;
}

.rounded-lg {
  border-radius: 12px;
}
</style>
