interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
}

const state = reactive<AuthState>({
  user: null,
  token: null,
})

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const isAuthenticated = computed(() => !!state.token)

  async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    const response = await $fetch<{ user: User; token: string }>(`${apiBase}/api/register`, {
      method: 'POST',
      body: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    })

    state.user = response.user
    state.token = response.token

    return response
  }

  async function login(email: string, password: string) {
    const response = await $fetch<{ user: User; token: string }>(`${apiBase}/api/login`, {
      method: 'POST',
      body: { email, password },
    })

    state.user = response.user
    state.token = response.token

    return response
  }

  async function logout() {
    if (!state.token) return

    await $fetch(`${apiBase}/api/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })

    state.user = null
    state.token = null
  }

  async function fetchUser() {
    if (!state.token) return null

    const user = await $fetch<User>(`${apiBase}/api/user`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    })

    state.user = user
    return user
  }

  return {
    user: computed(() => state.user),
    token: computed(() => state.token),
    isAuthenticated,
    register,
    login,
    logout,
    fetchUser,
  }
}
