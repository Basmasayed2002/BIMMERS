<script setup lang="ts">
import { useCart } from '../stores/cart'

interface Props {
  variant?: 'transparent' | 'solid'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'transparent'
})

const emit = defineEmits<{
  navigateToProducts: []
  navigateToHome: []
  navigateToCart: []
  navigateToAbout: []
  navigateToContact: []
  navigateToWishlist: []
  navigateToAccount: []
}>()

const { totalItems } = useCart()

const handleAutoPartsClick = () => {
  emit('navigateToProducts')
}

const handleHomeClick = () => {
  emit('navigateToHome')
}

const handleCartClick = () => {
  emit('navigateToCart')
}

const handleAboutClick = () => {
  emit('navigateToAbout')
}

const handleContactClick = () => {
  emit('navigateToContact')
}

const handleWishlistClick = () => {
  emit('navigateToWishlist')
}

const handleAccountClick = () => {
  emit('navigateToAccount')
}
</script>

<template>
  <header 
    class="w-full z-50"
    :class="props.variant === 'transparent' ? 'absolute top-0 left-0 right-0 bg-transparent' : 'relative bg-white shadow-sm border-b'"
  >
    <div 
      class="container mx-auto px-6 md:px-10 h-16 flex items-center gap-6"
      :class="props.variant === 'transparent' ? 'text-white' : 'text-gray-900'"
    >
      <!-- Left: Brand -->
      <a href="#" @click.prevent="handleHomeClick" class="flex items-center gap-2 min-w-[160px] cursor-pointer">
        <span class="text-[20px] font-semibold text-[#ff6a00]">BIMMERParts</span>
      </a>

      <!-- Main nav -->
      <nav 
        class="hidden lg:flex items-center gap-6 text-[14px]"
        :class="props.variant === 'transparent' ? 'text-white/90' : 'text-gray-700'"
      >
        <a 
          href="#" 
          @click.prevent="handleAutoPartsClick"
          class="flex items-center gap-1 cursor-pointer"
          :class="props.variant === 'transparent' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'"
        >
          BMW Series
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M12 15a.75.75 0 01-.53-.22l-4-4a.75.75 0 111.06-1.06L12 13.19l3.47-3.47a.75.75 0 111.06 1.06l-4 4A.75.75 0 0112 15z" clip-rule="evenodd"/></svg>
        </a>
        <a 
          href="#" 
          @click.prevent="handleAutoPartsClick" 
          class="cursor-pointer"
          :class="props.variant === 'transparent' ? 'hover:text-white' : 'hover:text-orange-500'"
        >
          Auto Parts
        </a>
        <a 
          href="#" 
          @click.prevent="handleAboutClick"
          class="cursor-pointer"
          :class="props.variant === 'transparent' ? 'hover:text-white' : 'hover:text-orange-500'"
        >
          About Us
        </a>
        <a 
          href="#" 
          @click.prevent="handleContactClick"
          class="cursor-pointer"
          :class="props.variant === 'transparent' ? 'hover:text-white' : 'hover:text-orange-500'"
        >
          Contact
        </a>
      </nav>

      <!-- Center: Search -->
      <div class="flex-1">
        <form role="search" class="relative">
          <input 
            type="text" 
            placeholder="Search products" 
            class="w-full h-12 pl-4 pr-14 rounded-full text-[15px] focus:outline-none"
            :class="props.variant === 'transparent' ? 'bg-white/95 border border-white/60' : 'bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent'"
          />
          <button 
            type="submit" 
            class="absolute right-2 top-1 h-10 w-10 rounded-full flex items-center justify-center"
            :class="props.variant === 'transparent' ? 'bg-white text-gray-600 hover:bg-gray-100' : 'bg-transparent text-gray-400 hover:text-gray-600'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 104.243 11.964l4.271 4.272a.75.75 0 101.06-1.06l-4.272-4.272A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z" clip-rule="evenodd"/></svg>
          </button>
        </form>
      </div>

      <!-- Right: Icons -->
      <div class="flex items-center gap-2">
        <button 
          @click="handleCartClick"
          class="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer relative transition-colors"
          :class="props.variant === 'transparent' ? 'bg-transparent border border-white hover:bg-white/10' : 'bg-transparent border border-gray-300 hover:bg-gray-50'"
          aria-label="Cart"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            class="h-5 w-5"
            :class="props.variant === 'transparent' ? 'text-white' : 'text-gray-600'"
          >
            <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7.5 7.5h9a2.5 2.5 0 012.5 2.5v7A2.5 2.5 0 0116.5 19.5h-9A2.5 2.5 0 015 17V10a2.5 2.5 0 012.5-2.5z"/>
              <path d="M9 7.5V6a3 3 0 016 0v1.5"/>
              <circle cx="9.5" cy="11" r="0.75"/>
              <circle cx="14.5" cy="11" r="0.75"/>
            </g>
          </svg>
          
          <!-- Cart Badge -->
          <span 
            v-if="totalItems > 0"
            class="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium bg-orange-500 text-white"
          >
            {{ totalItems > 99 ? '99+' : totalItems }}
          </span>
        </button>
        <button 
          @click="handleWishlistClick"
          class="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
          :class="props.variant === 'transparent' ? 'bg-transparent border border-white hover:bg-white/10' : 'bg-transparent border border-gray-300 hover:bg-gray-50'"
          aria-label="Wishlist"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5" 
            class="h-5 w-5"
            :class="props.variant === 'transparent' ? 'text-white' : 'text-gray-600'"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.462 2.25 9A5.25 5.25 0 0112 6.708 5.25 5.25 0 0121.75 9c0 3.462-2.438 6.36-4.739 8.507a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003-.003.001a.75.75 0 01-.678 0l-.003-.001z"/>
          </svg>
        </button>
        <button 
          @click="handleAccountClick"
          class="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer"
          :class="props.variant === 'transparent' ? 'bg-transparent border border-white hover:bg-white/10' : 'bg-transparent border border-gray-300 hover:bg-gray-50'"
          aria-label="Account"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.5" 
            class="h-5 w-5"
            :class="props.variant === 'transparent' ? 'text-white' : 'text-gray-600'"
          >
            <path d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM4.5 20.25a7.5 7.5 0 0115 0"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>


