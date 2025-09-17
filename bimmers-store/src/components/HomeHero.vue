<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  image: string
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Buy Your Dream Car Here Easily & Safely',
  subtitle: 'ALL PRODUCTS ON SALE',
  ctaLabel: 'Shop Now',
  ctaHref: '#products',
})

const emit = defineEmits<{
  navigateToProducts: []
  navigateToCart: []
  searchParts: [selectedCar: any]
  searchByLicensePlate: [licensePlate: string]
}>()

const activeTab = ref<'car' | 'tires'>('car')
const currentSlide = ref(0)

// BMW Car data structure
const bmwData = {
  brands: [
    { id: 'bmw', name: 'BMW' }
  ],
  models: {
    bmw: [
      { id: '1-series', name: '1 Serie' },
      { id: '2-series', name: '2 Serie' },
      { id: '3-series', name: '3 Serie' },
      { id: '4-series', name: '4 Serie' },
      { id: '5-series', name: '5 Serie' },
      { id: '6-series', name: '6 Serie' },
      { id: '7-series', name: '7 Serie' },
      { id: '8-series', name: '8 Serie' },
      { id: 'x1', name: 'X1' },
      { id: 'x2', name: 'X2' },
      { id: 'x3', name: 'X3' },
      { id: 'x4', name: 'X4' },
      { id: 'x5', name: 'X5' },
      { id: 'x6', name: 'X6' },
      { id: 'x7', name: 'X7' },
      { id: 'z3', name: 'Z3' },
      { id: 'z4', name: 'Z4' },
      { id: 'i3', name: 'i3' },
      { id: 'i4', name: 'i4' },
      { id: 'i8', name: 'i8' },
      { id: 'm2', name: 'M2' },
      { id: 'm3', name: 'M3' },
      { id: 'm4', name: 'M4' },
      { id: 'm5', name: 'M5' },
      { id: 'm8', name: 'M8' }
    ]
  },
  types: {
    '1-series': [
      { id: '116i', name: '116i' },
      { id: '118i', name: '118i' },
      { id: '120i', name: '120i' },
      { id: '125i', name: '125i' },
      { id: 'M135i', name: 'M135i' }
    ],
    '2-series': [
      { id: '218i', name: '218i' },
      { id: '220i', name: '220i' },
      { id: '225i', name: '225i' },
      { id: 'M240i', name: 'M240i' }
    ],
    '3-series': [
      { id: '316i', name: '316i' },
      { id: '318i', name: '318i' },
      { id: '320i', name: '320i' },
      { id: '325i', name: '325i' },
      { id: '330i', name: '330i' },
      { id: '335i', name: '335i' },
      { id: 'M340i', name: 'M340i' }
    ],
    '4-series': [
      { id: '420i', name: '420i' },
      { id: '430i', name: '430i' },
      { id: '440i', name: '440i' },
      { id: 'M440i', name: 'M440i' }
    ],
    '5-series': [
      { id: '520i', name: '520i' },
      { id: '525i', name: '525i' },
      { id: '530i', name: '530i' },
      { id: '535i', name: '535i' },
      { id: '540i', name: '540i' },
      { id: 'M550i', name: 'M550i' }
    ],
    'x1': [
      { id: 'sDrive18i', name: 'sDrive18i' },
      { id: 'sDrive20i', name: 'sDrive20i' },
      { id: 'xDrive20i', name: 'xDrive20i' },
      { id: 'xDrive25i', name: 'xDrive25i' }
    ],
    'x3': [
      { id: 'sDrive20i', name: 'sDrive20i' },
      { id: 'xDrive20i', name: 'xDrive20i' },
      { id: 'xDrive30i', name: 'xDrive30i' },
      { id: 'M40i', name: 'M40i' }
    ],
    'x5': [
      { id: 'xDrive30i', name: 'xDrive30i' },
      { id: 'xDrive40i', name: 'xDrive40i' },
      { id: 'xDrive50i', name: 'xDrive50i' },
      { id: 'M50i', name: 'M50i' }
    ],
    'm2': [
      { id: 'M2', name: 'M2' },
      { id: 'M2 Competition', name: 'M2 Competition' },
      { id: 'M2 CS', name: 'M2 CS' }
    ],
    'm3': [
      { id: 'M3', name: 'M3' },
      { id: 'M3 Competition', name: 'M3 Competition' },
      { id: 'M3 CS', name: 'M3 CS' }
    ],
    'm4': [
      { id: 'M4', name: 'M4' },
      { id: 'M4 Competition', name: 'M4 Competition' },
      { id: 'M4 CS', name: 'M4 CS' }
    ],
    'i4': [
      { id: 'eDrive40', name: 'eDrive40' },
      { id: 'M50', name: 'M50' }
    ]
  }
}

// Selected values
const selectedBrand = ref('')
const selectedModel = ref('')
const selectedType = ref('')
const licensePlate = ref('')

// Computed properties for dropdown options
const availableModels = computed(() => {
  if (!selectedBrand.value) return []
  return bmwData.models[selectedBrand.value as keyof typeof bmwData.models] || []
})

const availableTypes = computed(() => {
  if (!selectedModel.value) return []
  return bmwData.types[selectedModel.value as keyof typeof bmwData.types] || []
})

const selectedCar = computed(() => {
  if (!selectedBrand.value || !selectedModel.value || !selectedType.value) return null
  
  const brand = bmwData.brands.find(b => b.id === selectedBrand.value)
  const model = bmwData.models[selectedBrand.value as keyof typeof bmwData.models]?.find(m => m.id === selectedModel.value)
  const type = bmwData.types[selectedModel.value as keyof typeof bmwData.types]?.find(t => t.id === selectedType.value)
  
  return {
    brand: brand?.name,
    model: model?.name,
    type: type?.name,
    fullName: `${brand?.name} ${model?.name} ${type?.name}`
  }
})

// Methods
const resetModel = () => {
  selectedModel.value = ''
  selectedType.value = ''
}

const resetType = () => {
  selectedType.value = ''
}

const searchParts = () => {
  if (selectedCar.value) {
    emit('searchParts', selectedCar.value)
  }
}

const searchByLicensePlate = () => {
  if (licensePlate.value && licensePlate.value.length >= 6) {
    emit('searchByLicensePlate', licensePlate.value.toUpperCase())
  }
}

const handleLicensePlateKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    searchByLicensePlate()
  }
}

const formatLicensePlate = (value: string) => {
  // Remove spaces and convert to uppercase
  return value.replace(/\s/g, '').toUpperCase()
}

// Carousel images
const carouselImages = [
  '/images/hero.jpg',
  '/images/2025bmwm2coupe13.jpg',
  '/images/BMW_M2_2025_Lifestyle_v7.jpg',
  '/images/P90439365_lowRes_bmw-i4-m50-9-2021.jpg',
  '/images/P90498926-bmw-s-ultimate-driving-experience-returns-with-expanded-list-of-u-s-cities-for-2023-600px.jpg'
]

let autoSlideInterval: number | null = null

const handleShopNowClick = () => {
  emit('navigateToProducts')
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? carouselImages.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <!-- Carousel Images -->
    <div class="absolute inset-0 transition-transform duration-1000 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(image, index) in carouselImages" :key="index" class="absolute inset-0 w-full h-full bg-cover bg-center" :style="{ backgroundImage: `url(${image})`, left: `${index * 100}%` }"></div>
    </div>
    
    <!-- Dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <!-- Content with relative positioning -->
    <div class="relative z-10 flex flex-col md:flex-row gap-6 min-h-[700px] py-16">
      <!-- Left: hero content, half width on desktop -->
      <div class="relative flex-1 flex items-center pl-20 md:pl-24">
        <div class="text-white select-none">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" v-html="props.title"></h1>
          
           <!-- 35% SALE -->
           <div class="mt-8 md:mt-10 flex items-baseline">
             <span class="text-6xl md:text-7xl font-bold leading-none">35</span>
             <span class="text-7xl md:text-8xl font-bold text-orange-500 leading-none">%</span>
             <span class="text-4xl md:text-5xl font-bold leading-none ml-2">SALE</span>
           </div>

           <!-- Separator line -->
           <div class="mt-6 w-528 h-px bg-gray-600"></div>

           <!-- CTA -->
           <button @click="handleShopNowClick" class="mt-8 inline-flex items-center gap-3 px-6 h-10 rounded-lg bg-transparent text-white text-sm font-semibold shadow hover:bg-white/10 cursor-pointer">
             <span class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-black"><path d="m9 18 6-6-6-6"/></svg>
             </span>
             {{ props.ctaLabel }}
           </button>
        </div>
      </div>

      <!-- Right controls column (separate) -->
      <aside class="w-full md:w-[400px] md:shrink-0 flex items-center justify-center md:justify-end pr-20 md:pr-24">
        <div class="w-full max-w-[400px] bg-white/30 backdrop-blur-sm rounded-xl border border-white shadow-lg p-5">
          <!-- Segmented control within single border; left active also has its own border -->
          <div class="rounded-lg border border-gray-200 p-1 flex items-center gap-1 bg-white">
            <button
              class="flex-1 h-9 rounded-md text-[13px] font-medium transition-colors"
              :class="activeTab === 'car' ? 'bg-white border border-gray-300 text-gray-900' : 'bg-transparent text-gray-600'"
              @click="activeTab = 'car'"
            >
              Personenwagen
            </button>
            <button
              class="flex-1 h-9 rounded-md text-[13px] font-medium transition-colors"
              :class="activeTab === 'tires' ? 'bg-white border border-gray-300 text-gray-900' : 'bg-transparent text-gray-600'"
              @click="activeTab = 'tires'"
            >
              Autobanden
            </button>
          </div>

          <p class="mt-4 text-s text-white">Zoek onderdelen op kenteken</p>
          
          <!-- Kenteken-stijl zoekbalk -->
          <div class="mt-2 relative w-full h-16 bg-yellow-400 rounded-lg overflow-hidden shadow-lg border-2 border-gray-800">
            <!-- EU blauwe band -->
            <div class="absolute left-0 top-0 w-16 h-full bg-blue-600 flex items-center justify-center">
              <!-- EU Frame afbeelding -->
              <img src="/images/EU Frame.png" alt="EU Frame" class="w-full h-full object-contain" />
            </div>
            
            <!-- Input veld -->
            <input 
              v-model="licensePlate"
              @keyup="handleLicensePlateKeyup"
              @input="licensePlate = formatLicensePlate(licensePlate)"
              type="text" 
              placeholder="AL-KS-BS" 
              class="absolute left-16 right-12 top-0 h-full bg-transparent text-black text-lg font-bold text-center placeholder-gray-600 focus:outline-none tracking-widest"
              maxlength="8"
            />
            
            <!-- Search button -->
            <button 
              @click="searchByLicensePlate"
              :disabled="!licensePlate || licensePlate.length < 6"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              title="Zoek op kenteken"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-white">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
          
          <!-- License plate search feedback -->
          <div v-if="licensePlate && licensePlate.length >= 6" class="mt-2 p-2 bg-blue-100 rounded-lg border border-blue-300">
            <p class="text-xs text-blue-800">
              <span class="font-medium">Kenteken:</span> {{ licensePlate }}
            </p>
            <p class="text-xs text-blue-700 mt-1">
              Druk op Enter of klik op het zoek-icoon om onderdelen te zoeken
            </p>
          </div>

          <p class="mt-4 text-s text-white">Of selecteer hier uw auto</p>
          <div class="mt-2 space-y-3">
            <div>
              <label class="text-[14px] text-white">Selecteer Merk</label>
              <select 
                v-model="selectedBrand" 
                @change="resetModel"
                class="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecteer Merk</option>
                <option v-for="brand in bmwData.brands" :key="brand.id" :value="brand.id">
                  {{ brand.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-[14px] text-white">Selecteer Model</label>
              <select 
                v-model="selectedModel" 
                @change="resetType"
                :disabled="!selectedBrand"
                class="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Selecteer Model</option>
                <option v-for="model in availableModels" :key="model.id" :value="model.id">
                  {{ model.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="text-[14px] text-white">Selecteer Type</label>
              <select 
                v-model="selectedType" 
                :disabled="!selectedModel"
                class="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Selecteer Type</option>
                <option v-for="type in availableTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
            
            <!-- Selected car info -->
            <div v-if="selectedCar" class="mt-4 p-3 bg-green-100 rounded-lg border border-green-300">
              <p class="text-sm font-medium text-green-800">Geselecteerde auto:</p>
              <p class="text-sm text-green-700">{{ selectedCar.fullName }}</p>
            </div>
            
            <!-- Search button -->
            <button 
              @click="searchParts"
              :disabled="!selectedCar"
              class="mt-4 w-full h-10 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Zoek Onderdelen
            </button>
          </div>

          <img src="/images/Group.png" alt="Payments" class="mt-4 w-full" />
        </div>
      </aside>
    </div>

    <!-- Navigation arrows -->
    <button @click="prevSlide" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide" aria-label="Previous" class="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center hover:bg-white z-20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M15.53 4.47a.75.75 0 010 1.06L9.06 12l6.47 6.47a.75.75 0 11-1.06 1.06l-7-7a.75.75 0 010-1.06l7-7a.75.75 0 011.06 0z" clip-rule="evenodd"/></svg>
    </button>
    <button @click="nextSlide" @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide" aria-label="Next" class="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center hover:bg-white z-20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M8.47 4.47a.75.75 0 000 1.06L14.94 12l-6.47 6.47a.75.75 0 101.06 1.06l7-7a.75.75 0 000-1.06l-7-7a.75.75 0 00-1.06 0z" clip-rule="evenodd"/></svg>
    </button>

    <!-- Pagination dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      <button 
        v-for="(_, index) in carouselImages" 
        :key="index"
        @click="goToSlide(index)"
        @mouseenter="stopAutoSlide" 
        @mouseleave="startAutoSlide"
        class="h-2 w-2 rounded-full transition-all duration-300 hover:scale-125"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<style scoped>
</style>


