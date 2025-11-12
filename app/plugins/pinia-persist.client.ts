// plugins/pinia-persist.client.ts
import { createPersistedState } from 'pinia-plugin-persistedstate'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(createPersistedState())
})
