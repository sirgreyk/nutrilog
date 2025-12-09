export interface FoodLog {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
}

export interface NutritionStats {
  caloriesEaten: number
  caloriesGoal: number
  caloriesLeft: number
  protein: number
  proteinGoal: number
  carbs: number
  carbsGoal: number
  fat: number
  fatGoal: number
}

export interface MacroBreakdown {
  name: string
  value: number
  fill: string
}

export interface FoodItem {
  id: string
  name: string
  brand?: string
  calories: number
  protein: number
  carbs: number
  fat: number
  servingSize: string
}

