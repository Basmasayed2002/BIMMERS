<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import HeaderNav from './HeaderNav.vue'

const emit = defineEmits<{
  navigateToHome: []
  navigateToProducts: []
  navigateToProduct: [productId: string]
  navigateToCart: []
  navigateToAbout: []
  navigateToContact: []
  navigateToWishlist: []
  navigateToAccount: []
}>()

const handleHomeClick = () => {
  emit('navigateToHome')
}

const handleNavigateToProducts = () => {
  // Already on products page, no action needed
}

const handleNavigateToProduct = (productId: string) => {
  emit('navigateToProduct', productId)
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

interface Product {
  id: string
  title: string
  price: number
  oldPrice?: number
  image: string
  badge?: string
  category: string
  group: string
  brand: string
}

const products: Product[] = [
  { id: 'p1', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%', category: 'Performance', group: 'Interior', brand: 'Sparco' },
  { id: 'p2', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%', category: 'Maintenance', group: 'Engine Parts', brand: 'Redline' },
  { id: 'p3', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%', category: 'Styling', group: 'Interior', brand: 'Alu Performance' },
  { id: 'p4', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
  { id: 'p5', title: 'Blackline achterlichten BMW 3 serie E91 touring model 2005', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
  { id: 'p6', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
  { id: 'p7', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%', category: 'Styling', group: 'Interior', brand: 'Alu Performance' },
  { id: 'p8', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%', category: 'Maintenance', group: 'Engine Parts', brand: 'Redline' },
  { id: 'p9', title: 'Blackline achterlichten BMW 3 serie E91 touring model 2005', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
  { id: 'p10', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%', category: 'Performance', group: 'Interior', brand: 'Sparco' },
  { id: 'p11', title: 'Blackline achterlichten BMW 3 serie', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
  { id: 'p12', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%', category: 'Styling', group: 'Interior', brand: 'Alu Performance' },
  { id: 'p13', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%', category: 'Performance', group: 'Interior', brand: 'Sparco' },
  { id: 'p14', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%', category: 'Maintenance', group: 'Engine Parts', brand: 'Redline' },
  { id: 'p15', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%', category: 'Styling', group: 'Exterior', brand: 'BMW' },
]

const priceRange = ref([0, 20000])
const selectedGroup = ref('')
const selectedCategory = ref('')
const selectedBrand = ref('')
const sortBy = ref('Most Popular')

// Collapsible states
const isPriceExpanded = ref(true)
const isGroupExpanded = ref(false)
const isCategoryExpanded = ref(false)
const isBrandExpanded = ref(false)

const groups = ['All Groups', 'Engine Parts', 'Body Parts', 'Interior', 'Exterior']
const categories = ['All Categories', 'Performance', 'Styling', 'Maintenance', 'Accessories']
const brands = ['All Brands', 'BMW', 'Sparco', 'Redline', 'Alu Performance']
const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Oldest']

// Computed property for filtered products
const filteredProducts = computed(() => {
  let filtered = products

  // Filter by price range
  filtered = filtered.filter(product => 
    product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
  )

  // Filter by group
  if (selectedGroup.value && selectedGroup.value !== 'All Groups') {
    filtered = filtered.filter(product => product.group === selectedGroup.value)
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== 'All Categories') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filter by brand
  if (selectedBrand.value && selectedBrand.value !== 'All Brands') {
    filtered = filtered.filter(product => product.brand === selectedBrand.value)
  }

  // Sort products
  switch (sortBy.value) {
    case 'Price: Low to High':
      filtered = filtered.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      filtered = filtered.sort((a, b) => b.price - a.price)
      break
    case 'Newest':
      filtered = filtered.sort((a, b) => b.id.localeCompare(a.id))
      break
    case 'Oldest':
      filtered = filtered.sort((a, b) => a.id.localeCompare(b.id))
      break
    default: // Most Popular
      // Keep original order
      break
  }

  return filtered
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-8">
      <div class="flex gap-8">
        <!-- Filter Sidebar -->
        <aside class="w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
          <!-- Filters Header -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Filters</h2>
            <button class="p-1 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
              </svg>
            </button>
          </div>
          
          <!-- Price Filter -->
          <div class="border-b border-gray-200 pb-4 mb-4">
            <button 
              @click="isPriceExpanded = !isPriceExpanded"
              class="flex items-center justify-between w-full text-left"
            >
              <span class="font-medium text-gray-900">Price</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="isPriceExpanded ? 'rotate-180' : ''"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div v-if="isPriceExpanded" class="mt-4">
              <div class="relative">
                <!-- Range Slider -->
                <div class="relative h-2 bg-gray-200 rounded-lg">
                  <div 
                    class="absolute h-2 bg-orange-500 rounded-lg"
                    :style="{
                      left: (priceRange[0] / 20000) * 100 + '%',
                      width: ((20000 - priceRange[0]) / 20000) * 100 + '%'
                    }"
                  ></div>
                  <input 
                    type="range" 
                    min="0" 
                    max="20000" 
                    :value="priceRange[0]"
                    @input="(event) => { const target = event.target as HTMLInputElement; priceRange[0] = Number(target.value); }"
                    class="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                    style="z-index: 2;"
                  />
                </div>
                
                <!-- Price Value positioned under handle -->
                <div class="relative mt-2">
                  <span 
                    class="absolute text-sm text-gray-600 transform -translate-x-1/2"
                    :style="{ left: (priceRange[0] / 20000) * 100 + '%' }"
                  >
                    ${{ priceRange[0].toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Group Filter -->
          <div class="border-b border-gray-200 pb-4 mb-4">
            <button 
              @click="isGroupExpanded = !isGroupExpanded"
              class="flex items-center justify-between w-full text-left"
            >
              <span class="font-medium text-gray-900">Group</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="isGroupExpanded ? 'rotate-180' : ''"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div v-if="isGroupExpanded" class="mt-4">
              <select v-model="selectedGroup" class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option v-for="group in groups" :key="group" :value="group">{{ group }}</option>
              </select>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="border-b border-gray-200 pb-4 mb-4">
            <button 
              @click="isCategoryExpanded = !isCategoryExpanded"
              class="flex items-center justify-between w-full text-left"
            >
              <span class="font-medium text-gray-900">Category</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="isCategoryExpanded ? 'rotate-180' : ''"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div v-if="isCategoryExpanded" class="mt-4">
              <select v-model="selectedCategory" class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="pb-4">
            <button 
              @click="isBrandExpanded = !isBrandExpanded"
              class="flex items-center justify-between w-full text-left"
            >
              <span class="font-medium text-gray-900">Brand</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                class="h-4 w-4 text-gray-500 transition-transform"
                :class="isBrandExpanded ? 'rotate-180' : ''"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div v-if="isBrandExpanded" class="mt-4">
              <select v-model="selectedBrand" class="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <main class="flex-1">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-gray-600">Total {{ filteredProducts.length }} results</p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Sort By:</span>
              <select v-model="sortBy" class="h-8 px-3 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product" 
              @navigate-to-product="handleNavigateToProduct"
            />
          </div>
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white text-gray-900 py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-xl font-bold text-orange-500 mb-4">BIMMERParts</h3>
            <p class="text-gray-600 mb-4">A joint venture is an application to collect fees from an agreed plan.</p>
            <button @click="handleNavigateToContact" class="bg-white text-gray-900 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">Contact Us</button>
          </div>

          <!-- About -->
          <div>
            <h4 class="font-semibold mb-4">About</h4>
            <ul class="space-y-2 text-gray-600">
              <li><a href="#" @click.prevent="handleNavigateToAbout" class="hover:text-orange-500 cursor-pointer">About us</a></li>
              <li><a href="#" class="hover:text-orange-500">Features</a></li>
              <li><a href="#" class="hover:text-orange-500">Blog</a></li>
              <li><a href="#" class="hover:text-orange-500">Download</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="font-semibold mb-4">Company</h4>
            <ul class="space-y-2 text-gray-600">
              <li><a href="#" class="hover:text-orange-500">How we work</a></li>
              <li><a href="#" class="hover:text-orange-500">Press Room</a></li>
              <li><a href="#" class="hover:text-orange-500">Jobs</a></li>
              <li><a href="#" class="hover:text-orange-500">Community</a></li>
            </ul>
          </div>

          <!-- Contact & Social -->
          <div>
            <div class="space-y-2 text-gray-600">
              <p>Bimmer Parts - Amsterdam</p>
              <p>contact@bimmer.nl</p>
              <p>+383 49 324 009</p>
            </div>
            
            <div class="mt-4 space-y-3">
              <div class="flex items-center gap-2">
                <p class="text-sm text-gray-600">We accept:</p>
                <div class="flex gap-2">
                  <img src="/images/visa.png" alt="Visa" class="h-6" />
                  <img src="/images/mastercard.png" alt="Mastercard" class="h-6" />
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <p class="text-sm text-gray-600">Follow us:</p>
                <div class="flex gap-2">
                  <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-600 hover:text-pink-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-300 mt-8 pt-8 text-center text-gray-600">
          <p>Copyright © 2025 Bimmer Parts</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Custom range slider styles */
.slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
}

.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #f97316;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-thumb::-webkit-slider-track {
  background: transparent;
  height: 8px;
  border-radius: 4px;
}

.slider-thumb::-moz-range-thumb {
  background: #f97316;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-thumb::-moz-range-track {
  background: transparent;
  height: 8px;
  border-radius: 4px;
  border: none;
}

/* Smooth transitions for collapsible sections */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}
</style>
