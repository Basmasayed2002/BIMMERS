<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderNav from './HeaderNav.vue'
import ProductCard from './ProductCard.vue'
import { useCart } from '../stores/cart'

// Define props
const props = defineProps<{
  product: {
    id: string
    title: string
    price: number
    oldPrice: number
    image: string
    badge: string
  } | null
}>()

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

// Cart functionality
const { addToCart } = useCart()

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

const handleNavigateToProduct = (productId: string) => {
  emit('navigateToProduct', productId)
}

// Enhanced product data with additional details
const enhancedProduct = computed(() => {
  if (!props.product) return null
  
  // Generate additional product details based on the product
  const productDetails = {
    id: props.product.id,
    title: props.product.title,
    code: (() => {
      // Get product-specific codes based on product ID
      const productCodes = {
        'p1': 'SPR001',
        'p2': 'RLN002', 
        'p3': 'ALU003',
        'p4': 'GRI004',
        'p5': 'BLK005',
        'p6': 'GRI006',
        'p7': 'ALU007',
        'p8': 'RLN008',
        'p9': 'BLK009',
        'p10': 'SPR010',
        'p11': 'BLK011',
        'p12': 'ALU012',
        'p13': 'SPR013',
        'p14': 'RLN014',
        'p15': 'GRI015'
      }
      
      // Return specific code for the product, or default if not found
      return productCodes[props.product.id as keyof typeof productCodes] || `BMW${props.product.id.toUpperCase()}`
    })(),
    price: props.product.price,
    oldPrice: props.product.oldPrice,
    discount: Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100),
    savings: props.product.oldPrice - props.product.price,
    images: (() => {
      // Get product-specific images based on product ID
      const productImages = {
        'p1': ['/images/sparco.png', '/images/sparco2.png', '/images/sparco3.png'],
        'p2': ['/images/redline schroefset.png'],
        'p3': ['/images/Alu1.png', '/images/Alu2.png', '/images/Alu3.png'],
        'p4': ['/images/Glazend zwarte grillen met.png', '/images/glazend2.png', '/images/glazend3.png'],
        'p5': ['/images/Blackline achterlichten BMW 3 serie.png'],
        'p6': ['/images/Glazend zwarte grillen met.png', '/images/glazend2.png', '/images/glazend3.png'],
        'p7': ['/images/Alu1.png', '/images/Alu2.png', '/images/Alu3.png'],
        'p8': ['/images/redline schroefset.png'],
        'p9': ['/images/Blackline achterlichten BMW 3 serie.png'],
        'p10': ['/images/sparco.png', '/images/sparco2.png', '/images/sparco3.png'],
        'p11': ['/images/Blackline achterlichten BMW 3 serie.png'],
        'p12': ['/images/Alu1.png', '/images/Alu2.png', '/images/Alu3.png'],
        'p13': ['/images/sparco.png', '/images/sparco2.png', '/images/sparco3.png'],
        'p14': ['/images/redline schroefset.png'],
        'p15': ['/images/Glazend zwarte grillen met.png', '/images/glazend2.png', '/images/glazend3.png']
      }
      
      // Return specific images for the product, or default images if not found
      return productImages[props.product.id as keyof typeof productImages] || [
        props.product.image,
        '/images/hero.jpg',
        '/images/2025bmwm2coupe13.jpg',
        '/images/BMW_M2_2025_Lifestyle_v7.jpg'
      ]
    })(),
    rating: 4.5,
    reviews: Math.floor(Math.random() * 200) + 50,
    inStock: true,
    stockCount: Math.floor(Math.random() * 20) + 5,
    brand: 'BMW',
    category: 'Performance Parts',
    group: 'Accessories',
    description: `Premium BMW ${props.product.title.toLowerCase()} voor verbeterde voertuigprestaties en esthetiek.`,
    features: [
      'Hoogwaardige materialen en constructie',
      'Directe montage mogelijk',
      'Verbeterde voertuiguitstraling',
      'Geoptimaliseerde prestaties',
      'Weerbestendige coating'
    ],
    specifications: {
      'Materiaal': 'Aluminium/Kunststof',
      'Kleur': 'Zwart',
      'Gewicht': '2.5 kg',
      'Afmetingen': '120 x 45 x 8 cm',
      'Compatibiliteit': 'BMW Series',
      'Installatie': 'Directe montage'
    },
    additionalInfo: `De esthetiek van uw BMW speelt een cruciale rol in de algehele uitstraling en waarde. Moderne BMW-onderdelen zijn niet alleen functioneel, maar dragen ook bij aan de visuele aantrekkingskracht van uw voertuig. Van aerodynamische verbeteringen tot stijlvolle accessoires, elk onderdeel is zorgvuldig ontworpen om zowel prestaties als esthetiek te optimaliseren.

Materialen zoals aluminium, kunststof en staal worden gebruikt voor verschillende componenten, elk met hun eigen voordelen voor duurzaamheid, gewicht en prestaties. LED-verlichting biedt niet alleen betere zichtbaarheid, maar ook een moderne uitstraling. Velgen en banden beïnvloeden niet alleen de rijprestaties, maar ook de algehele uitstraling van het voertuig.

Accessoires zoals spoilers, dakdragers en grille decoraties kunnen de persoonlijkheid van uw BMW versterken en tegelijkertijd praktische voordelen bieden. Het is belangrijk om te kiezen voor onderdelen die passen bij uw voertuig en uw persoonlijke stijl.`
  }
  
  return productDetails
})

// Image gallery state
const currentImageIndex = ref(0)

// Product tabs
const activeTab = ref('additional-info')

const tabs = [
  { id: 'additional-info', label: 'Additional information' },
  { id: 'details', label: 'Details' },
  { id: 'ratings', label: 'Ratings' }
]

// Quantity selector
const quantity = ref(1)

// Similar products - get from all available products, excluding current product
const similarProducts = computed(() => {
  if (!props.product) return []
  
  // All available products (matching the ones in App.vue)
  const allProducts = [
    { id: 'p1', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%' },
    { id: 'p2', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%' },
    { id: 'p3', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%' },
    { id: 'p4', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' },
    { id: 'p5', title: 'Blackline achterlichten BMW 3 serie E91 touring model 2005', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%' },
    { id: 'p6', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' },
    { id: 'p7', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%' },
    { id: 'p8', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%' },
    { id: 'p9', title: 'Blackline achterlichten BMW 3 serie E91 touring model 2005', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%' },
    { id: 'p10', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%' },
    { id: 'p11', title: 'Blackline achterlichten BMW 3 serie', price: 319.95, oldPrice: 420.00, image: '/images/Blackline achterlichten BMW 3 serie.png', badge: '-20%' },
    { id: 'p12', title: 'Alu Performance Pedalen Set passend voor BMW 3 serie', price: 39.95, oldPrice: 60.00, image: '/images/Alu performance.png', badge: '-20%' },
    { id: 'p13', title: 'Sparco sprint+ L FIA Zwart', price: 319.95, oldPrice: 420.00, image: '/images/sparco.png', badge: '-20%' },
    { id: 'p14', title: 'Redline schroefset passend voor BMW 1 serie F20 en F21', price: 329.95, oldPrice: 420.00, image: '/images/redline schroefset.png', badge: '-20%' },
    { id: 'p15', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' }
  ]
  
  // Filter out current product and return first 5 similar products
  return allProducts
    .filter(product => product.id !== props.product!.id)
    .slice(0, 5)
})

// Methods
const nextImage = () => {
  if (enhancedProduct.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % enhancedProduct.value.images.length
  }
}

const prevImage = () => {
  if (enhancedProduct.value) {
    currentImageIndex.value = currentImageIndex.value === 0 ? enhancedProduct.value.images.length - 1 : currentImageIndex.value - 1
  }
}

const selectImage = (index: number) => {
  currentImageIndex.value = index
}


const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  if (enhancedProduct.value) {
    addToCart({
      id: enhancedProduct.value.id,
      title: enhancedProduct.value.title,
      price: enhancedProduct.value.price,
      oldPrice: enhancedProduct.value.oldPrice,
      image: enhancedProduct.value.images[0]
    }, quantity.value)
  }
}

const handleBuyNow = () => {
  if (enhancedProduct.value) {
    // Add to cart first
    addToCart({
      id: enhancedProduct.value.id,
      title: enhancedProduct.value.title,
      price: enhancedProduct.value.price,
      oldPrice: enhancedProduct.value.oldPrice,
      image: enhancedProduct.value.images[0]
    }, quantity.value)
    
    // Navigate to cart
    emit('navigateToCart')
  }
}

// Computed
const currentImage = computed(() => enhancedProduct.value?.images[currentImageIndex.value] || '')
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <HeaderNav variant="solid" @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleHomeClick" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />

    <!-- Main Content -->
    <div v-if="enhancedProduct" class="container mx-auto px-6 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><button @click="handleHomeClick" class="hover:text-orange-500 cursor-pointer">Home</button></li>
          <li class="text-gray-400">/</li>
          <li><button @click="handleNavigateToProducts" class="hover:text-orange-500 cursor-pointer">Products</button></li>
          <li class="text-gray-400">/</li>
          <li class="text-gray-900">{{ enhancedProduct.title }}</li>
        </ol>
      </nav>

      <!-- Product Details -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <!-- Product Images -->
        <div class="flex space-x-4">
          <!-- Thumbnail Navigation -->
          <div class="flex flex-col items-center space-y-2">
            <!-- Up Arrow -->
            <button 
              v-if="enhancedProduct.images.length > 1"
              @click="prevImage"
              class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-gray-600">
                <path fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Thumbnails -->
            <div class="flex flex-col space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
              <button 
                v-for="(image, index) in enhancedProduct.images" 
                :key="index"
                @click="selectImage(index)"
                class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0"
                :class="currentImageIndex === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'"
              >
                <img :src="image" :alt="`${enhancedProduct.title} ${index + 1}`" class="w-full h-full object-contain p-2" />
              </button>
            </div>
            
            <!-- Down Arrow -->
            <button 
              v-if="enhancedProduct.images.length > 1"
              @click="nextImage"
              class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-gray-600">
                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <!-- Main Image -->
          <div class="relative aspect-square bg-gray-50 rounded-lg overflow-hidden flex-1">
            <img :src="currentImage" :alt="enhancedProduct.title" class="w-full h-full object-contain p-8" />
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Title & Rating -->
          <div>
            <div class="mb-2">
              <span class="text-lg font-bold text-gray-900">{{ enhancedProduct.brand }}</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-4">{{ enhancedProduct.title }}</h1>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-sm text-gray-600 underline">Beoordeel</span>
              <span class="text-sm text-gray-600">.</span>
              <span class="text-sm text-gray-600">Oorsprong van het merk:</span>
              <img src="/images/Margin.png" alt="Flag" class="h-4" />
              <span class="text-sm text-gray-600">.</span>
              <span class="text-sm text-gray-900 font-bold underline">Code: #{{ enhancedProduct.code }}</span>
            </div>
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <div class="flex items-baseline space-x-3">
              <span class="text-lg text-gray-500 line-through">{{ enhancedProduct.oldPrice.toFixed(2).replace('.', ',') }}€</span>
              <span class="text-2xl font-bold text-gray-900">€{{ enhancedProduct.price.toFixed(2).replace('.', ',') }}</span>
              <span class="text-sm text-gray-600">TAX Included</span>
            </div>
            <p class="text-orange-500">Je betaalt {{ enhancedProduct.price.toFixed(2).replace('.', ',') }} € <span class="border border-orange-300 rounded-lg px-2 py-1 bg-orange-50">-{{ enhancedProduct.discount }}%</span></p>
          </div>

          <!-- Quantity & Stock -->
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Quantity</p>
            <div class="flex items-center space-x-4">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button @click="decrementQuantity" class="px-3 py-2 hover:bg-gray-50">-</button>
                <input v-model="quantity" type="number" min="1" class="w-16 text-center border-0 focus:outline-none" />
                <button @click="incrementQuantity" class="px-3 py-2 hover:bg-gray-50">+</button>
              </div>
              <button class="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg text-sm font-medium">In Stock</button>
            </div>
          </div>

          <!-- Divider Line -->
          <div class="border-t border-gray-200"></div>

          <!-- Payment Options -->
          <div class="space-y-3">
            <p class="text-sm text-gray-600">Payment:</p>
            <div class="flex items-center space-x-6">
              <img src="/images/Container.png" alt="Betaal contant" class="h-10" />
              <img src="/images/Containerbetaal.png" alt="Betaal online" class="h-10" />
              <img src="/images/Containermet.png" alt="Betaal met bankoverschrijving" class="h-10" />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button 
              @click="handleBuyNow"
              class="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Buy now</span>
            </button>
            <button 
              @click="handleAddToCart"
              class="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Product Tabs -->
      <div class="mb-16">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 text-sm font-medium transition-colors"
              :class="activeTab === tab.id 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-gray-900'"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="py-8">
          <!-- Additional Information -->
          <div v-if="activeTab === 'additional-info'" class="prose max-w-none">
            <p class="text-gray-700 leading-relaxed">{{ enhancedProduct.additionalInfo }}</p>
          </div>

          <!-- Details -->
          <div v-if="activeTab === 'details'" class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-4">Features</h3>
              <ul class="space-y-2">
                <li v-for="feature in enhancedProduct.features" :key="feature" class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-green-500">
                    <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Specifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(value, key) in enhancedProduct.specifications" :key="key" class="flex justify-between py-2 border-b border-gray-100">
                  <span class="font-medium text-gray-600">{{ key }}:</span>
                  <span class="text-gray-900">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ratings -->
          <div v-if="activeTab === 'ratings'" class="space-y-6">
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <div class="text-4xl font-bold text-gray-900">{{ enhancedProduct.rating }}</div>
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div class="text-sm text-gray-600">{{ enhancedProduct.reviews }} reviews</div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">5 stars</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 70%"></div>
                </div>
                <span class="text-sm text-gray-600">70%</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">4 stars</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 20%"></div>
                </div>
                <span class="text-sm text-gray-600">20%</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">3 stars</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 10%"></div>
                </div>
                <span class="text-sm text-gray-600">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Similar Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <ProductCard 
            v-for="similarProduct in similarProducts" 
            :key="similarProduct.id" 
            :product="similarProduct" 
            @navigate-to-product="handleNavigateToProduct"
          />
        </div>
      </div>
    </div>

    <!-- No Product Found -->
    <div v-else class="container mx-auto px-6 py-8 text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Product niet gevonden</h1>
      <p class="text-gray-600 mb-6">Het opgevraagde product kon niet worden gevonden.</p>
      <button 
        @click="handleNavigateToProducts"
        class="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Terug naar producten
      </button>
    </div>

    <!-- Footer -->
    <footer class="bg-white text-gray-900 py-12 border-t border-gray-200">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-xl font-bold text-orange-500 mb-4">BIMMERParts</h3>
            <p class="text-gray-600 mb-4">A joint venture is an application to collect fees from an agreed plan.</p>
            <button class="bg-white text-gray-900 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">Contact Us</button>
          </div>

          <!-- About -->
          <div>
            <h4 class="font-semibold mb-4">About</h4>
            <ul class="space-y-2 text-gray-600">
              <li><a href="#" class="hover:text-orange-500">About us</a></li>
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
            <h4 class="font-semibold mb-4">Contact Details & Social Media</h4>
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
                  <a href="#" class="text-gray-600 hover:text-orange-500">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" class="text-gray-600 hover:text-orange-500">
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
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
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose p {
  margin-bottom: 1rem;
}

.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>
