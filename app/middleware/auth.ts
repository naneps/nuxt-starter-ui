import { useAuthStore } from "~/stores/auth/auth.store"

export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie<string | null>('token', { path: '/' })
  const auth = useAuthStore()

  // Auto-inject token saat DEV (biar langsung dianggap login)
  if (import.meta.dev && !token.value) {
    token.value = 'dev-token'
  }

  // izinkan halaman login tanpa cek
  if (to.path === '/auth') return

  if (!token.value) return navigateTo('/auth')

  if (!auth.user) {
    try { await auth.fetchMe() } catch {
      await auth.logout()
      return navigateTo('/auth')
    }
    if (!auth.user) return navigateTo('/auth')
  }

  // role-based (opsional): definisikan roles di definePageMeta({ roles: [...] })
  const need = (to.meta.roles as string[] | undefined) ?? []
  if (need.length && auth.user && !need.includes(auth.user.role)) {
    return navigateTo('/403')
  }
})
