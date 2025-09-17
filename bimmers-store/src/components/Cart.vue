<script setup lang="ts">
import { useCart } from '../stores/cart'
import HeaderNav from './HeaderNav.vue'
import SiteFooter from './SiteFooter.vue'

const emit = defineEmits<{
  navigateToHome: []
  navigateToProducts: []
  navigateToProduct: [productId: string]
  navigateToCheckout: []
  navigateToCart: []
  navigateToAbout: []
  navigateToContact: []
  navigateToWishlist: []
  navigateToAccount: []
}>()

const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()

const handleHomeClick = () => {
  emit('navigateToHome')
}

const handleNavigateToProducts = () => {
  emit('navigateToProducts')
}

const handleNavigateToProduct = (productId: string) => {
  emit('navigateToProduct', productId)
}

const handleCheckout = () => {
  emit('navigateToCheckout')
}

const handleNavigateToAbout = () => {
  emit('navigateToAbout')
}

const handleNavigateToCart = () => {
  emit('navigateToCart')
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

// Similar products data
const similarProducts = [
  { id: 'p1', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%' },
  { id: 'p2', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%' },
  { id: 'p3', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%' },
  { id: 'p4', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' },
  { id: 'p5', title: 'Blackline achterlichten BMW 3 serie E91 touring model 2005', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%' }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><button @click="handleHomeClick" class="hover:text-orange-500 cursor-pointer">Home</button></li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900">Shopping Cart</li>
        </ol>
      </nav>

      <!-- Cart Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Cart</h1>
      </div>

      <!-- Cart Content -->
      <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Products Column -->
        <div class="lg:col-span-2">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Products</h2>
          
          <!-- Table Container -->
          <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <!-- Table Header -->
            <div class="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div class="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                <div class="text-left">Product</div>
                <div class="text-center">Price</div>
                <div class="text-center">Quantity</div>
                <div class="text-right">Total</div>
              </div>
            </div>
            
            <!-- Product Rows -->
            <div 
              v-for="item in cartItems" 
              :key="item.id"
              class="border-b border-gray-200 last:border-b-0 px-6 py-4"
            >
              <div class="grid grid-cols-4 gap-4 items-center">
                <!-- Product Info -->
                <div class="flex items-center space-x-3">
                  <div class="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img :src="item.image" :alt="item.title" class="w-full h-full object-contain p-1" />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900 mb-1">{{ item.title }}</h3>
                    <button 
                      @click="removeFromCart(item.id)"
                      class="text-red-500 hover:text-red-700 transition-colors text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <!-- Price -->
                <div class="text-center">
                  <span class="text-sm font-medium text-gray-900">€{{ item.price.toFixed(2).replace('.', ',') }}</span>
                </div>
                
                <!-- Quantity -->
                <div class="text-center">
                  <input 
                    v-model.number="item.quantity"
                    @change="updateQuantity(item.id, item.quantity)"
                    type="number" 
                    min="1" 
                    class="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <!-- Total -->
                <div class="text-right">
                  <span class="text-sm font-medium text-gray-900">€{{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Total</h2>
            
            <!-- Promo Code -->
            <div class="mb-6">
              <div class="flex items-center space-x-2 mb-2">
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input type="checkbox" class="w-4 h-4 text-orange-500" />
              </div>
            </div>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">€{{ totalPrice.toFixed(2).replace('.', ',') }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>€{{ totalPrice.toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>

            <button 
              @click="handleCheckout"
              class="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Products Section -->
      <div v-if="cartItems.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div 
            v-for="product in similarProducts" 
            :key="product.id"
            @click="handleNavigateToProduct(product.id)"
            class="bg-white rounded-lg shadow-sm flex flex-col relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <!-- Badge -->
            <span v-if="product.badge" class="absolute top-3 left-3 text-xs px-2 py-1 rounded bg-orange-500 text-white font-medium z-10">{{ product.badge }}</span>
            
            <!-- Wishlist Icon -->
            <button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-gray-600">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            
            <!-- Product Image -->
            <div class="relative overflow-hidden rounded-t-lg bg-gray-50">
              <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain p-4" />
            </div>
            
            <!-- Product Info -->
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-sm text-gray-900 font-medium mb-3 line-clamp-2 min-h-[40px]">{{ product.title }}</h3>
              
              <!-- Price -->
              <div class="mt-auto">
                <div class="flex items-baseline gap-2">
                  <span class="text-lg font-bold text-gray-900">€ {{ product.price.toFixed(2).replace('.', ',') }}</span>
                  <span v-if="product.oldPrice" class="text-sm text-gray-500 line-through">€ {{ product.oldPrice!.toFixed(2).replace('.', ',') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="h-24 w-24 text-gray-300 mx-auto mb-4">
          <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <button 
          @click="handleNavigateToProducts"
          class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    </div>

    <!-- Footer -->
    <SiteFooter @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" />
  </div>
</template>
