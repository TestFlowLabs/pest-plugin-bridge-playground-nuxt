<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, logout, isAuthenticated } = useAuth()

async function handleLogout() {
  await logout()
  navigateTo('/login')
}

watchEffect(() => {
  if (!isAuthenticated.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="container">
    <h1>Dashboard</h1>

    <div v-if="user" class="user-info" data-testid="user-info">
      <p>Welcome, <strong data-testid="user-name">{{ user.name }}</strong>!</p>
      <p>Email: <span data-testid="user-email">{{ user.email }}</span></p>
    </div>

    <button @click="handleLogout" data-testid="logout-button" class="logout-btn">
      Logout
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.user-info {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.user-info p {
  margin: 10px 0;
}

.logout-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.logout-btn:hover {
  background: #dc2626;
}
</style>
