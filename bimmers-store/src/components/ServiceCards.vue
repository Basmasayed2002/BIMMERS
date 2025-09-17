<script setup lang="ts">
interface ServiceCard {
  icon: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
}

const emit = defineEmits<{
  navigateToProducts: []
}>()

const services: ServiceCard[] = [
  {
    icon: 'package',
    title: 'Original Products',
    description: 'Whether you have a team of 2 or 200, our shared team',
    ctaText: 'View Products',
    ctaHref: '#products'
  },
  {
    icon: 'lightning',
    title: 'Fast Delivery',
    description: 'Whether you have a team of 2 or 200, our shared team',
    ctaText: 'View Products',
    ctaHref: '#products'
  },
  {
    icon: 'support',
    title: 'Dedicated Support',
    description: 'Whether you have a team of 2 or 200, our shared team',
    ctaText: 'Contact Us',
    ctaHref: '#contact'
  }
]

const handleCtaClick = (service: ServiceCard) => {
  if (service.ctaText === 'View Products') {
    emit('navigateToProducts')
  }
  // For other CTAs like "Contact Us", you could add more logic here
}
</script>

<template>
  <section class="w-full bg-white py-16">
    <div class="container mx-auto px-6 md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="service in services" 
          :key="service.title"
          class="flex flex-col items-center text-center space-y-4 border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
        >
          <!-- Icon -->
          <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <!-- Package Icon -->
            <svg v-if="service.icon === 'package'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-white">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            
            <!-- Lightning Icon -->
            <svg v-else-if="service.icon === 'lightning'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-white">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
            </svg>
            
            <!-- Support Icon -->
            <svg v-else-if="service.icon === 'support'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-white">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
              <path d="M16 11l2 2-2 2"/>
              <path d="M8 11l-2 2 2 2"/>
            </svg>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>

          <!-- Description -->
          <p class="text-sm text-gray-600 leading-relaxed">{{ service.description }}</p>

          <!-- CTA Link -->
          <button 
            @click="handleCtaClick(service)" 
            class="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
          >
            <span class="text-sm font-medium">{{ service.ctaText }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
