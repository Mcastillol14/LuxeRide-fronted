<template>
  <section class="news-section">
    <h2 class="section-title mb-4">
      <i class="pi pi-globe me-2"></i>
      Novedades Eco-Friendly
    </h2>

    <div class="row">
      <div v-for="article in displayedNews" :key="article.id" class="col-md-4 mb-4">
        <div class="card">
          <Panel :header="article.title" toggleable>
            <img :src="article.image" :alt="article.title" class="card-img-top mb-2" />
            <p class="news-date text-muted">
              <i class="pi pi-calendar me-2"></i>{{ article.date }}
            </p>
            <p class="news-summary">{{ article.summary }}</p>
          </Panel>
        </div>
      </div>
    </div>

    <div class="text-center mt-3">
      <Button
        :label="showAll ? 'Ver menos' : 'Ver todas las noticias'"
        icon="pi pi-list"
        class="custom-button"
        @click="toggleNews"
      />
    </div>
  </section>
</template>

<script setup>
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import { ref, computed } from 'vue';

const allNews = [
  {
    id: 1,
    title: "Innovación en Energía Solar",
    date: "2025-02-20",
    summary: "Nuevas tecnologías están revolucionando la energía solar y haciéndola más accesible.",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Reducción del Plástico en los Océanos",
    date: "2025-02-18",
    summary: "Nuevas iniciativas buscan reducir la contaminación plástica en mares y océanos.",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Movilidad Eléctrica en Aumento",
    date: "2025-02-15",
    summary: "El uso de vehículos eléctricos sigue creciendo en todo el mundo con nuevas inversiones.",
    image: "https://images.unsplash.com/photo-1617886322009-e02db73a70ee?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Reciclaje Inteligente",
    date: "2025-02-12",
    summary: "Nuevas tecnologías están optimizando la recolección y el procesamiento de residuos reciclables.",
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    title: "Energía Eólica en Crecimiento",
    date: "2025-02-10",
    summary: "La energía eólica sigue ganando terreno como alternativa limpia y renovable a los combustibles fósiles.",
    image: "https://images.unsplash.com/photo-1615209853186-e4bd66602508?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    title: "Agricultura Sostenible",
    date: "2025-02-08",
    summary: "Nuevas prácticas agrícolas están reduciendo el impacto ambiental de la producción de alimentos.",
    image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const showAll = ref(false);
const displayedNews = computed(() => showAll.value ? allNews : allNews.slice(0, 3));
const toggleNews = () => showAll.value = !showAll.value;
</script>

<style scoped>
.news-section {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.section-title {
  color: #1B5E20;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.card-img-top {
  height: 180px;
  object-fit: cover;
  width: 100%;
}

.news-date {
  font-size: 0.9rem;
}

.news-summary {
  color: #555;
}

.custom-button {
  border: none !important;
  border-radius: 20px !important;
  padding: 10px 20px;
  background-color: #2E7D32;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #1B5E20;
}
button:focus{
  box-shadow: none !important;
  outline: none !important;
}
@media (max-width: 768px) {
  .card-img-top {
    height: 160px;
  }
}
</style>
