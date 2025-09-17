<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { ref } from 'vue'

interface Product {
  id: string
  title: string
  price: number
  oldPrice?: number
  image: string
  badge?: string
}

const props = defineProps<{ title: string; products: Product[] }>()

const emit = defineEmits<{
  navigateToProduct: [productId: string]
}>()

const handleProductClick = (productId: string) => {
  emit('navigateToProduct', productId)
}

const activeTab = ref('General')

const tabs = [
  { id: 'General', label: 'General' },
  { id: 'BMW Parts', label: 'BMW Parts' },
  { id: 'Accessories', label: 'Accessories' },
  { id: 'Exterior', label: 'Exterior' }
]
</script>

<template>
  <section class="w-full bg-white py-16">
    <div class="container mx-auto px-6 md:px-10">
      <!-- Title -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">{{ props.title }}</h2>
      </div>
      
      <!-- Navigation Tabs - Only show for On Sale -->
      <div v-if="props.title === 'On Sale'" class="mb-8">
        <div class="flex justify-between border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="pb-4 text-sm font-medium transition-colors"
            :class="activeTab === tab.id 
              ? 'text-orange-500 border-b-2 border-orange-500' 
              : 'text-gray-600 hover:text-gray-900'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ProductCard 
          v-for="p in props.products" 
          :key="p.id" 
          :product="p" 
          @navigate-to-product="handleProductClick"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>


