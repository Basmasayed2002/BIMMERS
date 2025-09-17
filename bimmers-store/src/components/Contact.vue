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
  navigateToPrivacy: []
  navigateToTerms: []
  navigateToWishlist: []
  navigateToAccount: []
}>()

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const acceptPrivacy = ref(false)

// Validation state
const validationErrors = ref<Record<string, string>>({})

// Required fields
const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message']

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

const handleNavigateToPrivacy = () => {
  emit('navigateToPrivacy')
}

const handleNavigateToTerms = () => {
  emit('navigateToTerms')
}

const handleNavigateToWishlist = () => {
  emit('navigateToWishlist')
}

const handleNavigateToAccount = () => {
  emit('navigateToAccount')
}

// Validation function
const validateForm = () => {
  const errors: Record<string, string> = {}
  
  requiredFields.forEach(field => {
    const value = formData.value[field as keyof typeof formData.value]
    if (!value || value.trim() === '') {
      errors[field] = 'This field is required'
    }
  })
  
  // Email validation
  if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  // Privacy policy validation
  if (!acceptPrivacy.value) {
    errors.privacy = 'You must agree to the privacy policy'
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }
  
  // Simulate form submission
  alert('Message sent successfully!')
  
  // Reset form
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  acceptPrivacy.value = false
  validationErrors.value = {}
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-16">
      <!-- Contact Title -->
      <div class="text-center mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Please feel free to contact us
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          By filling out this form, you are submitting your question, complaint, or suggestion.
        </p>
      </div>

      <!-- Contact Form and Info -->
      <div class="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left Column - Contact Form -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Get in touch with us</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    First name <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="formData.firstName"
                    @input="validationErrors.firstName = ''"
                    type="text" 
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    :class="validationErrors.firstName ? 'border-red-500' : 'border-gray-300'"
                  />
                  <p v-if="validationErrors.firstName" class="text-red-500 text-sm mt-1">{{ validationErrors.firstName }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Last name <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="formData.lastName"
                    @input="validationErrors.lastName = ''"
                    type="text" 
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    :class="validationErrors.lastName ? 'border-red-500' : 'border-gray-300'"
                  />
                  <p v-if="validationErrors.lastName" class="text-red-500 text-sm mt-1">{{ validationErrors.lastName }}</p>
                </div>
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="formData.email"
                  @input="validationErrors.email = ''"
                  type="email" 
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="validationErrors.email ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">{{ validationErrors.email }}</p>
              </div>
              
              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone number <span class="text-red-500">*</span>
                </label>
                <input 
                  v-model="formData.phone"
                  @input="validationErrors.phone = ''"
                  type="tel" 
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="validationErrors.phone ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">{{ validationErrors.phone }}</p>
              </div>
              
              <!-- Message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message <span class="text-red-500">*</span>
                </label>
                <textarea 
                  v-model="formData.message"
                  @input="validationErrors.message = ''"
                  rows="4"
                  placeholder="Leave a message..."
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  :class="validationErrors.message ? 'border-red-500' : 'border-gray-300'"
                ></textarea>
                <p v-if="validationErrors.message" class="text-red-500 text-sm mt-1">{{ validationErrors.message }}</p>
              </div>
              
              <!-- Privacy Policy -->
              <div>
                <label class="flex items-start space-x-3">
                  <input 
                    v-model="acceptPrivacy"
                    @change="validationErrors.privacy = ''"
                    type="checkbox" 
                    class="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span class="text-sm text-gray-600">
                    You agree to our friendly 
                    <a href="#" @click.prevent="handleNavigateToPrivacy" class="text-orange-500 hover:underline cursor-pointer">privacy policy</a> and 
                    <a href="#" @click.prevent="handleNavigateToTerms" class="text-orange-500 hover:underline cursor-pointer">terms and conditions</a>.
                  </span>
                </label>
                <p v-if="validationErrors.privacy" class="text-red-500 text-sm mt-1">{{ validationErrors.privacy }}</p>
              </div>
              
              <!-- Submit Button -->
              <button 
                type="submit"
                class="w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors text-lg"
              >
                Send message
              </button>
            </form>
          </div>

          <!-- Right Column - Contact Information Cards -->
          <div class="space-y-6">
            <!-- Email Card 1 -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div class="flex flex-col items-start text-left">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-sm p-2 mb-4">
                  <img src="/images/Featured icon.png" alt="Email" class="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">info@ipsum.com</h3>
                  <p class="text-orange-500 font-medium mb-2">General Support & Feedback</p>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Whether you need help or want to share your thoughts, our team is always here for you.
                  </p>
                </div>
              </div>
            </div>

            <!-- Email Card 2 -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div class="flex flex-col items-start text-left">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-sm p-2 mb-4">
                  <img src="/images/Featured icon.png" alt="Email" class="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">info@ipsum.com</h3>
                  <p class="text-orange-500 font-medium mb-2">General Support & Feedback</p>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Whether you need help or want to share your thoughts, our team is always here for you.
                  </p>
                </div>
              </div>
            </div>

            <!-- Phone Card -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div class="flex flex-col items-start text-left">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-sm p-2 mb-4">
                  <img src="/images/call.png" alt="Phone" class="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">+383 49 884 555</h3>
                  <p class="text-orange-500 font-medium mb-2">Anything else</p>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Whether you need help or want to share your thoughts, our team is always here for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.476961783373!2d4.9041399!3d52.3675734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c91a1355e5%3A0x951932a9f10e40b0!2sAmsterdam%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1695123456789!5m2!1sen!2snl"
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="rounded-2xl"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter @navigate-to-about="handleNavigateToAbout" />
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
