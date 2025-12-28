<script setup lang="ts">
const { register, isAuthenticated } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    await register(name.value, email.value, password.value, passwordConfirmation.value)
    navigateTo('/dashboard')
  } catch (e: any) {
    error.value = e.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  if (isAuthenticated.value) {
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <div class="container">
    <h1>Register</h1>

    <form @submit.prevent="handleSubmit" data-testid="register-form">
      <div v-if="error" class="error" data-testid="error-message">
        {{ error }}
      </div>

      <div class="field">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          data-testid="name-input"
          required
        />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          data-testid="email-input"
          required
        />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          data-testid="password-input"
          required
        />
      </div>

      <div class="field">
        <label for="password_confirmation">Confirm Password</label>
        <input
          id="password_confirmation"
          v-model="passwordConfirmation"
          type="password"
          data-testid="password-confirmation-input"
          required
        />
      </div>

      <button type="submit" :disabled="loading" data-testid="register-button">
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
    </form>

    <p class="login-link">
      Already have an account?
      <NuxtLink to="/login" data-testid="login-link">Login here</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.field {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover:not(:disabled) {
  background: #2563eb;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}
</style>
