<script setup lang="ts">
import { ref } from 'vue'
import HeaderNav from './HeaderNav.vue'
import SiteFooter from './SiteFooter.vue'

const emit = defineEmits<{
  navigateToHome: []
  navigateToProducts: []
  navigateToCart: []
  navigateToAbout: []
  navigateToContact: []
  navigateToWishlist: []
  navigateToAccount: []
  navigateToRegister: []
}>()

// Form data
const formData = ref({
  email: '',
  password: ''
})

// Form validation
const validationErrors = ref<Record<string, string>>({})
const showPassword = ref(false)

// Methods
const handleHomeClick = () => {
  emit('navigateToHome')
}

const handleNavigateToProducts = () => {
  emit('navigateToProducts')
}

const handleNavigateToCart = () => {
  emit('navigateToCart')
}

const handleNavigateToAbout = () => {
  emit('navigateToAbout')
}

const handleNavigateToContact = () => {
  emit('navigateToContact')
}

const handleNavigateToWishlist = () => {
  emit('navigateToWishlist')
}

const handleNavigateToAccount = () => {
  emit('navigateToAccount')
}

const handleNavigateToRegister = () => {
  emit('navigateToRegister')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  const errors: Record<string, string> = {}
  
  if (!formData.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!formData.value.password) {
    errors.password = 'Password is required'
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleLogin = () => {
  if (!validateForm()) {
    return
  }
  
  // Simulate login
  alert('Login successful!')
  emit('navigateToHome')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div class="container mx-auto px-4 md:px-6 py-12">
      <div class="max-w-md mx-auto">
        <!-- Login Form -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Login to your account</h1>
          <p class="text-gray-600 mb-6">
            Don't have an account? 
            <button @click="handleNavigateToRegister" class="text-orange-500 hover:underline font-medium">Create account</button>
          </p>
          
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input 
                v-model="formData.email"
                @input="validationErrors.email = ''"
                type="email" 
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                :class="validationErrors.email ? 'border-red-500' : 'border-gray-300'"
              />
              <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">{{ validationErrors.email }}</p>
            </div>
            
            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input 
                  v-model="formData.password"
                  @input="validationErrors.password = ''"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="validationErrors.password ? 'border-red-500' : 'border-gray-300'"
                />
                <button 
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <p v-if="validationErrors.password" class="text-red-500 text-sm mt-1">{{ validationErrors.password }}</p>
            </div>
            
            <!-- Forgot Password -->
            <div class="text-right">
              <a href="#" class="text-sm text-orange-500 hover:underline">Forgot your password?</a>
            </div>
            
            <!-- Login Button -->
            <button 
              type="submit"
              class="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" />
  </div>
</template>

<style scoped>
</style>
