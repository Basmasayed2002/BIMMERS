<script setup lang="ts">
interface Product {
  id: string
  title: string
  price: number
  oldPrice?: number
  image: string
  badge?: string
}

const props = defineProps<{ product: Product }>()

const emit = defineEmits<{
  navigateToProduct: [productId: string]
}>()

const handleProductClick = (product: Product) => {
  emit('navigateToProduct', product.id)
}
</script>

<template>
  <article 
    @click="handleProductClick(props.product)"
    class="bg-white rounded-lg shadow-sm flex flex-col relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
  >
    <!-- Badge -->
    <span v-if="props.product.badge" class="absolute top-3 left-3 text-xs px-2 py-1 rounded bg-orange-500 text-white font-medium z-10">{{ props.product.badge }}</span>
    
    <!-- Wishlist Icon -->
    <button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-gray-600">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
    
    <!-- Product Image -->
    <div class="relative overflow-hidden rounded-t-lg bg-gray-50">
      <img :src="props.product.image" :alt="props.product.title" class="w-full h-48 object-contain p-4" />
    </div>
    
    <!-- Product Info -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-sm text-gray-900 font-medium mb-3 line-clamp-2 min-h-[40px]">{{ props.product.title }}</h3>
      
      <!-- Price -->
      <div class="mt-auto">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold text-gray-900">€ {{ props.product.price.toFixed(2).replace('.', ',') }}</span>
          <span v-if="props.product.oldPrice" class="text-sm text-gray-500 line-through">€ {{ props.product.oldPrice!.toFixed(2).replace('.', ',') }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
</style>


