import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./app/router";
import { i18n } from "./i18n";
import { useAuthStore } from "./stores/auth.store";
import { useUiStore } from "./stores/ui.store";
import { useItineraryStore } from "./stores/itinerary.store";
import { useMapStore } from "./stores/map.store";
import "@/styles/tailwind.scss";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);

const authStore = useAuthStore();
const uiStore = useUiStore();
const itineraryStore = useItineraryStore();
const mapStore = useMapStore();

authStore.init();
uiStore.initTheme();
itineraryStore.loadAll();
mapStore.loadLayers();

app.mount("#app");
