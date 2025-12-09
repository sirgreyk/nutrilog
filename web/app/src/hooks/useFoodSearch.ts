import { useQuery } from '@tanstack/react-query'
import type { FoodItem } from '@/types/nutrition'

// Mock food database
const mockFoodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    calories: 231,
    protein: 43.5,
    carbs: 0,
    fat: 5,
    servingSize: '100g',
  },
  {
    id: '2',
    name: 'Brown Rice',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    servingSize: '100g',
  },
  {
    id: '3',
    name: 'Salmon Fillet',
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    servingSize: '100g',
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    brand: 'Fage',
    calories: 100,
    protein: 10,
    carbs: 6,
    fat: 0,
    servingSize: '100g',
  },
  {
    id: '5',
    name: 'Banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fat: 0.3,
    servingSize: '1 medium',
  },
  {
    id: '6',
    name: 'Oatmeal',
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fat: 1.4,
    servingSize: '100g',
  },
  {
    id: '7',
    name: 'Eggs',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    servingSize: '2 large',
  },
  {
    id: '8',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    servingSize: '100g',
  },
  {
    id: '9',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    servingSize: '100g',
  },
  {
    id: '10',
    name: 'Sweet Potato',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    servingSize: '100g',
  },
  {
    id: '11',
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 50,
    servingSize: '100g',
  },
  {
    id: '12',
    name: 'Quinoa',
    calories: 120,
    protein: 4.4,
    carbs: 22,
    fat: 1.9,
    servingSize: '100g',
  },
  {
    id: '13',
    name: 'Tuna',
    calories: 144,
    protein: 30,
    carbs: 0,
    fat: 1,
    servingSize: '100g',
  },
  {
    id: '14',
    name: 'Spinach',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    servingSize: '100g',
  },
  {
    id: '15',
    name: 'Chicken Thigh',
    calories: 209,
    protein: 26,
    carbs: 0,
    fat: 10,
    servingSize: '100g',
  },
  {
    id: '16',
    name: 'Cottage Cheese',
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fat: 4.3,
    servingSize: '100g',
  },
  {
    id: '17',
    name: 'Apple',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    servingSize: '1 medium',
  },
  {
    id: '18',
    name: 'Whole Wheat Bread',
    calories: 247,
    protein: 13,
    carbs: 41,
    fat: 4.2,
    servingSize: '100g',
  },
  {
    id: '19',
    name: 'Turkey Breast',
    calories: 135,
    protein: 30,
    carbs: 0,
    fat: 1,
    servingSize: '100g',
  },
  {
    id: '20',
    name: 'Black Beans',
    calories: 132,
    protein: 8.9,
    carbs: 24,
    fat: 0.5,
    servingSize: '100g',
  },
]

// Mock API function
const searchFoods = async (query: string): Promise<FoodItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  if (!query.trim()) {
    return []
  }
  
  const lowerQuery = query.toLowerCase()
  return mockFoodDatabase.filter(
    (food) =>
      food.name.toLowerCase().includes(lowerQuery) ||
      food.brand?.toLowerCase().includes(lowerQuery)
  )
}

// React Query hook
export const useFoodSearch = (query: string) => {
  return useQuery({
    queryKey: ['foodSearch', query],
    queryFn: () => searchFoods(query),
    enabled: query.length > 0,
  })
}

