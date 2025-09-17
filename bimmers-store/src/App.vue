<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import HomeHero from './components/HomeHero.vue'
import ServiceCards from './components/ServiceCards.vue'
import BrandsRow from './components/BrandsRow.vue'
import ProductSection from './components/ProductSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ProductListing from './components/ProductListing.vue'
import ProductDetail from './components/ProductDetail.vue'
import Cart from './components/Cart.vue'
import Checkout from './components/Checkout.vue'
import AboutUs from './components/AboutUs.vue'
import Contact from './components/Contact.vue'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import TermsAndConditions from './components/TermsAndConditions.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const currentPage = ref<'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'about' | 'contact' | 'privacy' | 'terms' | 'login' | 'register'>('home')
const currentProductId = ref<string | null>(null)


const handleNavigateToProducts = () => {
  currentPage.value = 'products'
  // Scroll to top when navigating to products page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToHome = () => {
  currentPage.value = 'home'
  // Scroll to top when navigating to home page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToProductDetail = (productId: string) => {
  currentProductId.value = productId
  currentPage.value = 'product-detail'
  // Scroll to top when navigating to product detail
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToCart = () => {
  currentPage.value = 'cart'
  // Scroll to top when navigating to cart
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToCheckout = () => {
  currentPage.value = 'checkout'
  // Scroll to top when navigating to checkout
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToAbout = () => {
  currentPage.value = 'about'
  // Scroll to top when navigating to about page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToContact = () => {
  currentPage.value = 'contact'
  // Scroll to top when navigating to contact page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToPrivacy = () => {
  currentPage.value = 'privacy'
  // Scroll to top when navigating to privacy page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToTerms = () => {
  currentPage.value = 'terms'
  // Scroll to top when navigating to terms page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToWishlist = () => {
  // For now, redirect to products page since we don't have a wishlist page
  currentPage.value = 'products'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToAccount = () => {
  // Redirect to login page
  currentPage.value = 'login'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToLogin = () => {
  currentPage.value = 'login'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigateToRegister = () => {
  currentPage.value = 'register'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Handle product search from HomeHero
const handleSearchParts = (selectedCar: any) => {
  console.log('Searching parts for:', selectedCar)
  // Navigate to products page with car filter
  currentPage.value = 'products'
  // Scroll to top when navigating to products page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearchByLicensePlate = (licensePlate: string) => {
  console.log('Searching parts for license plate:', licensePlate)
  // Navigate to products page with license plate filter
  currentPage.value = 'products'
  // Scroll to top when navigating to products page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Get current product for detail page
const currentProduct = computed(() => {
  if (!currentProductId.value) return null
  // First check allProducts, then onSale to avoid duplicates
  return allProducts.find(p => p.id === currentProductId.value) || 
         onSale.find(p => p.id === currentProductId.value) || null
})

const onSale = [
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
  { id: 'p15', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' },
]

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
  { id: 'p15', title: 'Glanzend zwarte grillen met verlichting passend', price: 359.95, oldPrice: 420.00, image: '/images/Glazend zwarte grillen met.png', badge: '-20%' },
]
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Home Page -->
    <div v-if="currentPage === 'home'">
      <HeaderNav @navigate-to-products="handleNavigateToProducts" @navigate-to-home="handleNavigateToHome" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />
      <HomeHero 
        image="/images/hero.jpg" 
        title="Buy Your Dream Car<br>Here Easily & Safely" 
        subtitle="All products on sale" 
        @navigate-to-products="handleNavigateToProducts"
        @search-parts="handleSearchParts"
        @search-by-license-plate="handleSearchByLicensePlate"
      />
      <ServiceCards @navigate-to-products="handleNavigateToProducts" />
      <BrandsRow />
      <ProductSection title="On Sale" :products="onSale" @navigate-to-product="handleNavigateToProductDetail" />
      <ProductSection title="All Products" :products="allProducts" @navigate-to-product="handleNavigateToProductDetail" />
      <SiteFooter @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" />
    </div>

    <!-- Product Listing Page -->
    <div v-if="currentPage === 'products'">
      <ProductListing @navigate-to-home="handleNavigateToHome" @navigate-to-products="handleNavigateToProducts" @navigate-to-product="handleNavigateToProductDetail" @navigate-to-cart="handleNavigateToCart" @navigate-to-about="handleNavigateToAbout" @navigate-to-contact="handleNavigateToContact" @navigate-to-wishlist="handleNavigateToWishlist" @navigate-to-account="handleNavigateToAccount" />
    </div>

    <!-- Product Detail Page -->
    <div v-if="currentPage === 'product-detail'">
      <ProductDetail 
        :product="currentProduct" 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-product="handleNavigateToProductDetail"
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Cart Page -->
    <div v-if="currentPage === 'cart'">
      <Cart 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-product="handleNavigateToProductDetail"
        @navigate-to-checkout="handleNavigateToCheckout"
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Checkout Page -->
    <div v-if="currentPage === 'checkout'">
      <Checkout 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-terms="handleNavigateToTerms"
        @navigate-to-privacy="handleNavigateToPrivacy"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- About Us Page -->
    <div v-if="currentPage === 'about'">
      <AboutUs 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Contact Page -->
    <div v-if="currentPage === 'contact'">
      <Contact 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-privacy="handleNavigateToPrivacy"
        @navigate-to-terms="handleNavigateToTerms"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Privacy Policy Page -->
    <div v-if="currentPage === 'privacy'">
      <PrivacyPolicy 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Terms and Conditions Page -->
    <div v-if="currentPage === 'terms'">
      <TermsAndConditions 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
      />
    </div>

    <!-- Login Page -->
    <div v-if="currentPage === 'login'">
      <Login 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
        @navigate-to-register="handleNavigateToRegister"
      />
    </div>

    <!-- Register Page -->
    <div v-if="currentPage === 'register'">
      <Register 
        @navigate-to-home="handleNavigateToHome" 
        @navigate-to-products="handleNavigateToProducts" 
        @navigate-to-cart="handleNavigateToCart"
        @navigate-to-about="handleNavigateToAbout"
        @navigate-to-contact="handleNavigateToContact"
        @navigate-to-wishlist="handleNavigateToWishlist"
        @navigate-to-account="handleNavigateToAccount"
        @navigate-to-login="handleNavigateToLogin"
      />
    </div>
  </main>
</template>

<style scoped>
</style>
