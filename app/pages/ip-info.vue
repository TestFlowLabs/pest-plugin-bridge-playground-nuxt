<script setup lang="ts">
interface IpInfo {
  country_name: string
  city: string
  region: string
  ip: string
  error?: string
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const ipInfo = ref<IpInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchIpInfo() {
  loading.value = true
  error.value = null

  try {
    const response = await $fetch<IpInfo>(`${apiBase}/api/ip-info`)
    ipInfo.value = response
  }
  catch (e: unknown) {
    error.value = 'Unable to fetch location'
    console.error('Failed to fetch IP info:', e)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchIpInfo()
})
</script>

<template>
  <div class="container">
    <h1>IP Geolocation</h1>
    <p class="subtitle">
      Demonstrates backend HTTP mocking with Bridge::fake()
    </p>

    <div v-if="loading" class="loading" data-testid="loading">
      Loading location data...
    </div>

    <div v-else-if="error" class="error" data-testid="error">
      {{ error }}
    </div>

    <div v-else-if="ipInfo" class="info-card" data-testid="ip-info">
      <div class="info-row">
        <span class="label">Country:</span>
        <span class="value" data-testid="country">{{ ipInfo.country_name }}</span>
      </div>
      <div class="info-row">
        <span class="label">City:</span>
        <span class="value" data-testid="city">{{ ipInfo.city }}</span>
      </div>
      <div class="info-row">
        <span class="label">Region:</span>
        <span class="value" data-testid="region">{{ ipInfo.region }}</span>
      </div>
      <div class="info-row">
        <span class="label">IP:</span>
        <span class="value" data-testid="ip">{{ ipInfo.ip }}</span>
      </div>
    </div>

    <div class="nav-links">
      <NuxtLink to="/" data-testid="home-link">
        Back to Home
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.loading {
  padding: 20px;
  color: #666;
}

.error {
  padding: 20px;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 8px;
}

.info-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #64748b;
}

.value {
  color: #1e293b;
}

.nav-links {
  margin-top: 30px;
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
