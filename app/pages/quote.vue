<script setup lang="ts">
interface Quote {
  content: string
  author: string
}

const quote = ref<Quote | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchQuote() {
  loading.value = true
  error.value = null

  try {
    // Direct browser fetch to external API (for testing BrowserMocking)
    const response = await fetch('https://api.quotable.io/random')

    if (!response.ok) {
      throw new Error('Failed to fetch quote')
    }

    const data = await response.json()
    quote.value = {
      content: data.content,
      author: data.author,
    }
  }
  catch (e: unknown) {
    error.value = 'Unable to fetch quote'
    console.error('Failed to fetch quote:', e)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchQuote()
})
</script>

<template>
  <div class="container">
    <h1>Daily Quote</h1>
    <p class="subtitle">
      Demonstrates frontend JavaScript mocking with BrowserMocking
    </p>

    <div v-if="loading" class="loading" data-testid="loading">
      Fetching inspirational quote...
    </div>

    <div v-else-if="error" class="error" data-testid="error">
      {{ error }}
    </div>

    <div v-else-if="quote" class="quote-card" data-testid="quote">
      <blockquote class="quote-content" data-testid="quote-content">
        "{{ quote.content }}"
      </blockquote>
      <cite class="quote-author" data-testid="quote-author">
        — {{ quote.author }}
      </cite>
    </div>

    <div class="actions">
      <button class="refresh-btn" data-testid="refresh-btn" @click="fetchQuote">
        Get New Quote
      </button>
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
  max-width: 600px;
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
  padding: 40px;
  color: #666;
}

.error {
  padding: 20px;
  color: #dc2626;
  background: #fef2f2;
  border-radius: 8px;
}

.quote-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}

.quote-content {
  font-size: 1.4rem;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-style: italic;
}

.quote-author {
  font-size: 1.1rem;
  opacity: 0.9;
}

.actions {
  margin-top: 20px;
}

.refresh-btn {
  padding: 10px 20px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.refresh-btn:hover {
  background: #059669;
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
