import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminActiveUsers() {
  const activeUsers = [
    {
      id: "1",
      device: "Samsung Galaxy S21",
      plan: "Forfait Standard",
      progress: 75,
      timeRemaining: "6h restantes",
    },
    {
      id: "2",
      device: "iPhone 13",
      plan: "Forfait Premium",
      progress: 95,
      timeRemaining: "6j 18h restantes",
    },
    {
      id: "3",
      device: "Laptop Dell",
      plan: "Forfait Basique",
      progress: 25,
      timeRemaining: "15m restantes",
    },
    {
      id: "4",
      device: "iPad Pro",
      plan: "Forfait Standard",
      progress: 50,
      timeRemaining: "12h restantes",
    },
  ]

  return (
    <div className="space-y-6">
      {activeUsers.map((user) => (
        <div key={user.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{user.device}</p>
              <p className="text-xs text-muted-foreground">{user.plan}</p>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              Actif
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Temps restant</span>
              <span>{user.timeRemaining}</span>
            </div>
            <Progress value={user.progress} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
