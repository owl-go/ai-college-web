import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户基本信息
  const userInfo = ref({
    province: '',
    subject: '', // 文/理/新高考
    score: '',
    rank: '',
    name: ''
  })
  
  // 推荐结果
  const recommendationResult = ref({
    rush: [], // 冲刺
    stable: [], // 稳定
    safe: [] // 保底
  })
  
  // 志愿表
  const wishlist = ref([])
  
  // 计算属性
  const isUserInfoComplete = computed(() => {
    return userInfo.value.province && 
           userInfo.value.subject && 
           userInfo.value.score && 
           userInfo.value.rank
  })
  
  // 方法
  const updateUserInfo = (info) => {
    userInfo.value = { ...userInfo.value, ...info }
  }
  
  const setRecommendationResult = (result) => {
    recommendationResult.value = result
  }
  
  const addToWishlist = (school) => {
    const exists = wishlist.value.find(item => item.id === school.id)
    if (!exists) {
      wishlist.value.push(school)
    }
  }
  
  const removeFromWishlist = (schoolId) => {
    const index = wishlist.value.findIndex(item => item.id === schoolId)
    if (index > -1) {
      wishlist.value.splice(index, 1)
    }
  }
  
  const clearWishlist = () => {
    wishlist.value = []
  }
  
  return {
    userInfo,
    recommendationResult,
    wishlist,
    isUserInfoComplete,
    updateUserInfo,
    setRecommendationResult,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
  }
})
