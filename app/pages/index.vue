<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>

<template>
  <div class="container">
    <h1>Welcome to Bridge Playground</h1>

    <div v-if="isAuthenticated" class="nav-links">
      <NuxtLink to="/dashboard" data-testid="dashboard-link">Go to Dashboard</NuxtLink>
    </div>

    <div v-else class="nav-links">
      <NuxtLink to="/login" data-testid="login-link">Login</NuxtLink>
      <NuxtLink to="/register" data-testid="register-link">Register</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.nav-links a {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.nav-links a:hover {
  background: #2563eb;
}
</style>
