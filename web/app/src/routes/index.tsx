import { createFileRoute, Link } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTodayLogs, useNutritionStats } from "@/hooks/useNutrition"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Settings, Coffee, Sun, Moon, Cookie, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme/use-theme"

export const Route = createFileRoute("/")({
    component: Index,
})

const mealTypeConfig = {
    breakfast: {
        icon: Coffee,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
    lunch: {
        icon: Sun,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    dinner: {
        icon: Moon,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    snack: {
        icon: Cookie,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
} as const

type MealType = keyof typeof mealTypeConfig

function formatTime(time: string): string {
    const [hours, minutes] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
}

function getMealType(time: string): MealType {
    const [hours] = time.split(":")
    const hour = Number.parseInt(hours)
    
    if (hour >= 5 && hour < 11) return "breakfast"
    if (hour >= 11 && hour < 15) return "lunch"
    if (hour >= 15 && hour < 20) return "snack"
    return "dinner"
}

function Index() {
    const { theme, setTheme } = useTheme()
    const { data: stats, isLoading: statsLoading } = useNutritionStats()
    const { data: logs, isLoading: logsLoading } = useTodayLogs()

    if (statsLoading || logsLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-muted-foreground">Loading...</div>
            </div>
        )
    }

    if (!stats || !logs) {
        return null
    }

    // Apple Fitness-style rings: percentage values (0-100)
    // Order from inside to outside: Fat, Protein, Carbs, Calories
    // All rings have the same thickness (12% width) with 2% spacing between them
    const rings = [
        {
            name: "Fat",
            value: Math.min((stats.fat / stats.fatGoal) * 100, 100),
            fill: "#FF9500", // Apple orange
            innerRadius: "48%",
            outerRadius: "60%",
        },
        {
            name: "Protein",
            value: Math.min((stats.protein / stats.proteinGoal) * 100, 100),
            fill: "#34C759", // Apple green
            innerRadius: "62%",
            outerRadius: "74%",
        },
        {
            name: "Carbs",
            value: Math.min((stats.carbs / stats.carbsGoal) * 100, 100),
            fill: "#007AFF", // Apple blue
            innerRadius: "76%",
            outerRadius: "88%",
        },
        {
            name: "Calories",
            value: Math.min((stats.caloriesEaten / stats.caloriesGoal) * 100, 100),
            fill: "#FF3B30", // Apple red
            innerRadius: "90%",
            outerRadius: "100%",
        },
    ]

    return (
        <div className="min-h-screen bg-background p-4 pb-8">
            <div className="mx-auto max-w-lg space-y-4">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Today</h1>
                        <p className="text-muted-foreground text-sm">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="focus:ring-ring outline-none focus:ring-2 rounded-full">
                                <Avatar className="size-10 cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                    <AvatarFallback>SK</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Settings />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault()
                                    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                                    setTheme(isDark ? "light" : "dark")
                                }}
                            >
                                {(() => {
                                    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                                    return isDark ? (
                                        <>
                                            <Sun />
                                            Light Mode
                                        </>
                                    ) : (
                                        <>
                                            <Moon />
                                            Dark Mode
                                        </>
                                    )
                                })()}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Stats Card with Apple Fitness-style Rings */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center gap-8">
                            {/* Activity Rings - Stacked concentric rings like Apple Fitness */}
                            <div className="relative w-48 h-48 shrink-0">
                                {rings.map((ring) => {
                                    // Calculate end angle based on percentage
                                    // Start at -90 (top), fill clockwise based on percentage
                                    // 0% = -90, 50% = 90, 100% = 270
                                    const percentage = Math.min(ring.value, 100)
                                    const endAngle = -90 + (percentage * 360) / 100
                                    
                                    return (
                                        <div key={ring.name} className="absolute inset-0">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadialBarChart
                                                    cx="50%"
                                                    cy="50%"
                                                    startAngle={-90}
                                                    endAngle={endAngle}
                                                    innerRadius={ring.innerRadius}
                                                    outerRadius={ring.outerRadius}
                                                    data={[{ name: ring.name, value: 100 }]}
                                                >
                                                    <RadialBar
                                                        dataKey="value"
                                                        cornerRadius={10}
                                                        fill={ring.fill}
                                                        background={{ fill: "hsl(var(--muted))", opacity: 0.15 }}
                                                    />
                                                </RadialBarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Stats Legend */}
                            <div className="flex-1 space-y-4">
                                {rings.map((ring) => {
                                    const statsDataMap: Record<string, { value: number; goal: number; unit: string }> = {
                                        Calories: { value: stats.caloriesEaten, goal: stats.caloriesGoal, unit: "kcal" },
                                        Protein: { value: stats.protein, goal: stats.proteinGoal, unit: "g" },
                                        Carbs: { value: stats.carbs, goal: stats.carbsGoal, unit: "g" },
                                        Fat: { value: stats.fat, goal: stats.fatGoal, unit: "g" },
                                    }
                                    const statsData = statsDataMap[ring.name]

                                    if (!statsData) return null

                                    return (
                                        <div key={ring.name} className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full shrink-0"
                                                style={{ backgroundColor: ring.fill }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-semibold text-foreground">{ring.name}</div>
                                                <div className="text-base font-semibold" style={{ color: ring.fill }}>
                                                    {statsData.value} / {statsData.goal} {statsData.unit}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Log Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold text-foreground">Today&apos;s Food</CardTitle>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                <Link to="/search">
                                    <Plus className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {logs
                                .slice()
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .map((log) => {
                                    const mealType = getMealType(log.time)
                                    const config = mealTypeConfig[mealType]
                                    const MealIcon = config.icon

                                    return (
                                        <div
                                            key={log.id}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors"
                                        >
                                            {/* Meal icon */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                                                <MealIcon className={`w-5 h-5 ${config.color}`} />
                                            </div>

                                            {/* Food details */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{log.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatTime(log.time)} · P: {log.protein}g · C: {log.carbs}g · F: {log.fat}g
                                                </p>
                                            </div>

                                            {/* Calories */}
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-semibold text-foreground">{log.calories}</p>
                                                <p className="text-xs text-muted-foreground">kcal</p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>

                        {logs.length === 0 && (
                            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                No food logged today. Tap + to add.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
