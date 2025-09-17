<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCart } from '../stores/cart'
import HeaderNav from './HeaderNav.vue'
import SiteFooter from './SiteFooter.vue'

const emit = defineEmits<{
  navigateToHome: []
  navigateToProducts: []
  navigateToCart: []
  navigateToAbout: []
  navigateToContact: []
  navigateToTerms: []
  navigateToPrivacy: []
  navigateToWishlist: []
  navigateToAccount: []
}>()

const { cartItems, totalPrice, clearCart, removeFromCart, updateQuantity } = useCart()

// Form data 
const formData = ref({
  firstName: '',
  lastName: '',
  company: '',
  city: '',
  address: '',
  address2: '',
  postCode: '',
  country: '',
  email: '',
  phone: '',
})

// Shipping and payment methods
const selectedShippingMethod = ref<'store' | 'post'>('store')
const selectedPaymentMethod = ref<'bank' | 'cash'>('bank')
const acceptTerms = ref(false)
const showTermsError = ref(false)

// Validation state
const validationErrors = ref<Record<string, string>>({})

// Required fields
const requiredFields = ['firstName', 'lastName', 'city', 'address', 'postCode', 'country', 'email', 'phone']

// Computed values
const subtotal = computed(() => totalPrice.value)
const deliveryFee = computed(() => selectedShippingMethod.value === 'post' ? 20 : 0)
const orderTotal = computed(() => subtotal.value + deliveryFee.value)

// Watch for empty cart and redirect to products
watch(() => cartItems.value.length, (newLength, oldLength) => {
  // Only redirect if cart becomes empty (not on initial load when oldLength is undefined)
  if (newLength === 0 && oldLength !== undefined && oldLength > 0) {
    emit('navigateToProducts')
  }
})

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

const handleNavigateToTerms = () => {
  emit('navigateToTerms')
}

const handleNavigateToPrivacy = () => {
  emit('navigateToPrivacy')
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
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleOrderNow = () => {
  // Validate form first
  if (!validateForm()) {
    return
  }
  
  if (!acceptTerms.value) {
    showTermsError.value = true
    return
  }
  
  // Reset error state
  showTermsError.value = false
  
  // Simulate order processing
  alert(`Order successful! Total: €${orderTotal.value.toFixed(2).replace('.', ',')}`)
  clearCart()
  emit('navigateToHome')
}

</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div class="container mx-auto px-4 md:px-6 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><button @click="handleHomeClick" class="hover:text-orange-500 cursor-pointer">Home</button></li>
          <li class="text-gray-400">/</li>
          <li><button @click="handleNavigateToCart" class="hover:text-orange-500 cursor-pointer">Cart</button></li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900">Check Out</li>
        </ol>
      </nav>

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Check Out</h1>
        <h2 class="text-2xl font-bold text-orange-500 mt-2">BIMMERParts</h2>
      </div>

      <!-- Checkout Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column: Secure Checkout & Your Cart -->
        <div class="space-y-8">
          <!-- Secure Checkout Form -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Secure Checkout</h3>
            
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      First name <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.firstName"
                      @input="validationErrors.firstName = ''"
                      type="text" 
                      placeholder="Enter your first name"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.firstName ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.firstName" class="text-red-500 text-sm mt-1">{{ validationErrors.firstName }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">Company</label>
                    <input 
                      v-model="formData.company"
                      type="text" 
                      placeholder="Enter company name (optional)"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Address <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.address"
                      @input="validationErrors.address = ''"
                      type="text" 
                      placeholder="Enter your address"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.address ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.address" class="text-red-500 text-sm mt-1">{{ validationErrors.address }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Post code <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.postCode"
                      @input="validationErrors.postCode = ''"
                      type="text" 
                      placeholder="Enter postal code"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.postCode ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.postCode" class="text-red-500 text-sm mt-1">{{ validationErrors.postCode }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.email"
                      @input="validationErrors.email = ''"
                      type="email" 
                      placeholder="Enter your email address"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.email ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">{{ validationErrors.email }}</p>
                  </div>
                </div>
                
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Last Name <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.lastName"
                      @input="validationErrors.lastName = ''"
                      type="text" 
                      placeholder="Enter your last name"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.lastName ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.lastName" class="text-red-500 text-sm mt-1">{{ validationErrors.lastName }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      City <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.city"
                      @input="validationErrors.city = ''"
                      type="text" 
                      placeholder="Enter your city"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.city ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.city" class="text-red-500 text-sm mt-1">{{ validationErrors.city }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">Address 2</label>
                    <input 
                      v-model="formData.address2"
                      type="text" 
                      placeholder="Enter additional address info (optional)"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Country <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.country"
                      @input="validationErrors.country = ''"
                      type="text" 
                      placeholder="Enter your country"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.country ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.country" class="text-red-500 text-sm mt-1">{{ validationErrors.country }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-2">
                      Phone <span class="text-red-500">*</span>
                    </label>
                    <input 
                      v-model="formData.phone"
                      @input="validationErrors.phone = ''"
                      type="tel" 
                      placeholder="Enter your phone number"
                      class="w-full text-base text-gray-900 border-0 border-b border-gray-300 pb-2 focus:outline-none focus:border-orange-500 bg-transparent"
                      :class="validationErrors.phone ? 'border-red-500' : ''"
                    />
                    <p v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">{{ validationErrors.phone }}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Your Cart -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Your Cart</h3>
            
            <div class="space-y-4">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative"
              >
                <!-- Remove button -->
                <button 
                  @click="removeFromCart(item.id)"
                  class="absolute top-3 right-3 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
                
                <!-- Product Image -->
                <div class="w-20 h-20 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-contain p-2" />
                </div>
                
                <!-- Product Info -->
                <div class="flex-1 min-w-0 pr-4">
                  <h4 class="text-sm font-medium text-gray-900 mb-2 truncate">{{ item.title }}</h4>
                  <div class="space-y-1">
                    <div class="text-sm font-bold text-gray-900">€ {{ item.price.toFixed(2).replace('.', ',') }}</div>
                    <div v-if="item.oldPrice" class="text-xs text-gray-500 line-through">€ {{ item.oldPrice.toFixed(2).replace('.', ',') }}</div>
                  </div>
                </div>
                
                <!-- Quantity Controls -->
                <div class="flex flex-col items-center space-y-2 mr-4">
                  <span class="text-sm text-gray-500">Quantity</span>
                  <div class="flex items-center bg-white border border-gray-300 rounded-lg">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-l-lg"
                    >
                      <span class="text-sm font-medium">-</span>
                    </button>
                    <span class="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-900 border-x border-gray-300">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-50 rounded-r-lg"
                    >
                      <span class="text-sm font-medium">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Order Summary & Payment -->
        <div class="space-y-8">
          <!-- Order Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Bag total</span>
                <span class="font-medium">€{{ subtotal.toFixed(2).replace('.', ',') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Bag Discount</span>
                <span class="font-medium text-green-600">-€{{ (subtotal * 0.2).toFixed(2).replace('.', ',') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Delivery Fee</span>
                <span class="font-medium">€{{ deliveryFee.toFixed(2).replace('.', ',') }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span>Order Total</span>
                  <span class="text-orange-500">€{{ orderTotal.toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping & Payment Method -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Shipping & Payment Method</h3>
            
            <!-- Select Shipping Method -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Select Shipping Method</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  @click="selectedShippingMethod = 'store'"
                  class="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                  :class="selectedShippingMethod === 'store' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium">At Our Store</span>
                </button>
                
                <button 
                  @click="selectedShippingMethod = 'post'"
                  class="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                  :class="selectedShippingMethod === 'post' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium">via Post</span>
                </button>
              </div>
            </div>

            <!-- Select Payment Method -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Select Payment Method</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  @click="selectedPaymentMethod = 'bank'"
                  class="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                  :class="selectedPaymentMethod === 'bank' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium">Bank-Transfer</span>
                </button>
                
                <button 
                  @click="selectedPaymentMethod = 'cash'"
                  class="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors"
                  :class="selectedPaymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'"
                >
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium">Cash</span>
                </button>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="mb-6">
              <p class="text-sm text-gray-600 mb-4">
                Account automatically created upon ordering for faster future checkouts and exclusive benefits.
              </p>
              
              <div>
                <label class="flex items-start space-x-3 cursor-pointer">
                  <input 
                    v-model="acceptTerms"
                    @change="showTermsError = false"
                    type="checkbox" 
                    class="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <span class="text-sm text-gray-600">
                    I accept the 
                    <a href="#" @click.prevent="handleNavigateToTerms" class="text-orange-500 hover:underline cursor-pointer font-medium">Terms and Conditions</a>
                    and 
                    <a href="#" @click.prevent="handleNavigateToPrivacy" class="text-orange-500 hover:underline cursor-pointer font-medium">Privacy Policy</a>
                    <span class="text-red-500">*</span>
                  </span>
                </label>
                <p v-if="showTermsError" class="text-red-500 text-sm mt-2">
                  Please accept the Terms and Conditions and Privacy Policy to continue.
                </p>
              </div>
            </div>

            <!-- Order Now Button -->
            <button 
              @click="handleOrderNow"
              class="w-full flex items-center justify-center p-4 border-2 border-orange-500 bg-orange-50 rounded-lg transition-colors hover:bg-orange-100"
            >
              <span class="text-lg font-medium text-orange-500">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" />
  </div>
</template>

<style scoped>
</style>
