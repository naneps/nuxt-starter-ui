import { defineStore } from 'pinia';
type Role = 'admin' | 'buyer' | 'sales' | 'warehouse'
type User = { id:number; name:string; email:string; role:Role }

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie('token', { path: '/' })

  async function fetchMe() {
    if (!token.value) { user.value = null; return }
    user.value = await $fetch<User>('/api/auth/me')
  }

  async function login(payload:{email:string; password:string}) {
    const res = await $fetch<{ token:string; user:User }>('/api/auth/login', { method:'POST', body: payload })
    token.value = res.token
    user.value  = res.user
    await navigateTo('/')
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method:'POST' }).catch(() => {})
    token.value = null; user.value = null
    await navigateTo('/login')
  }

  return { user, fetchMe, login, logout }
})
