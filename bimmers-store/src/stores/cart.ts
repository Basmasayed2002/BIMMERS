import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  title: string
  price: number
  oldPrice: number
  image: string
  quantity: number
}

const cartItems = ref<CartItem[]>([])

export const useCart = () => {
  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        ...product,
        quantity
      })
    }
  }

  const removeFromCart = (productId: string) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const totalSavings = computed(() => {
    return cartItems.value.reduce((total, item) => total + ((item.oldPrice - item.price) * item.quantity), 0)
  })

  return {
    cartItems: computed(() => cartItems.value),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalSavings
  }
}
