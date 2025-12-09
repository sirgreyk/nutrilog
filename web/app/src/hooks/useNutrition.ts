import { useQuery } from '@tanstack/react-query'
import type { FoodLog, NutritionStats } from '@/types/nutrition'

// Mock API data
const mockFoodLogs: FoodLog[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    calories: 320,
    protein: 12,
    carbs: 54,
    fat: 7,
    time: '08:30',
  },
  {
    id: '2',
    name: 'Chicken Salad',
    calories: 450,
    protein: 42,
    carbs: 28,
    fat: 18,
    time: '12:45',
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    calories: 150,
    protein: 15,
    carbs: 12,
    fat: 4,
    time: '15:20',
  },
  {
    id: '4',
    name: 'Salmon with Rice',
    calories: 580,
    protein: 38,
    carbs: 62,
    fat: 15,
    time: '19:00',
  },
  {
    id: '5',
    name: 'Protein Shake',
    calories: 200,
    protein: 24,
    carbs: 18,
    fat: 3,
    time: '21:00',
  },
]

// Mock API functions
const fetchTodayLogs = async (): Promise<FoodLog[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockFoodLogs
}

const fetchNutritionStats = async (): Promise<NutritionStats> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  const logs = mockFoodLogs
  const caloriesEaten = logs.reduce((sum, log) => sum + log.calories, 0)
  const protein = logs.reduce((sum, log) => sum + log.protein, 0)
  const carbs = logs.reduce((sum, log) => sum + log.carbs, 0)
  const fat = logs.reduce((sum, log) => sum + log.fat, 0)

  const caloriesGoal = 2200
  const proteinGoal = 150
  const carbsGoal = 250
  const fatGoal = 70

  return {
    caloriesEaten,
    caloriesGoal,
    caloriesLeft: caloriesGoal - caloriesEaten,
    protein,
    proteinGoal,
    carbs,
    carbsGoal,
    fat,
    fatGoal,
  }
}

// React Query hooks
export const useTodayLogs = () => {
  return useQuery({
    queryKey: ['todayLogs'],
    queryFn: fetchTodayLogs,
  })
}

export const useNutritionStats = () => {
  return useQuery({
    queryKey: ['nutritionStats'],
    queryFn: fetchNutritionStats,
  })
}

