import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFoodSearch } from "@/hooks/useFoodSearch"
import { Search, Plus } from "lucide-react"
import type { FoodItem } from "@/types/nutrition"

export const Route = createFileRoute("/search")({
    component: SearchPage,
})

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const { data: results, isLoading } = useFoodSearch(searchQuery)

    const handleAddFood = (food: FoodItem) => {
        // TODO: Implement add to log functionality
        console.log("Add food:", food)
    }

    return (
        <div className="min-h-screen bg-background p-4 pb-8">
            <div className="mx-auto max-w-2xl space-y-4">
                {/* Search Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Search Food</h1>
                    <p className="text-muted-foreground text-sm">
                        Find and add foods to your nutrition log
                    </p>
                </div>

                {/* Search Input */}
                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search for food..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Search Results */}
                {searchQuery && (
                    <div className="space-y-2">
                        {isLoading ? (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center text-muted-foreground">
                                        Searching...
                                    </div>
                                </CardContent>
                            </Card>
                        ) : results && results.length > 0 ? (
                            results.map((food) => (
                                <FoodResultCard
                                    key={food.id}
                                    food={food}
                                    onAdd={handleAddFood}
                                />
                            ))
                        ) : (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center text-muted-foreground">
                                        No results found for "{searchQuery}"
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!searchQuery && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center text-muted-foreground">
                                Start typing to search for foods
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

function FoodResultCard({ food, onAdd }: { food: FoodItem; onAdd: (food: FoodItem) => void }) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                            <h3 className="text-base font-semibold text-foreground truncate">
                                {food.name}
                            </h3>
                            {food.brand && (
                                <span className="text-xs text-muted-foreground shrink-0">
                                    {food.brand}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                            Serving: {food.servingSize}
                        </p>
                        <div className="flex gap-4 text-xs">
                            <div>
                                <span className="text-muted-foreground">Calories: </span>
                                <span className="font-semibold text-foreground">{food.calories}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">P: </span>
                                <span className="font-semibold text-foreground">{food.protein}g</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">C: </span>
                                <span className="font-semibold text-foreground">{food.carbs}g</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">F: </span>
                                <span className="font-semibold text-foreground">{food.fat}g</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => onAdd(food)}
                        className="shrink-0"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

