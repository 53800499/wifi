import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AdminRecentSales() {
  const recentSales = [
    {
      id: "1",
      name: "Utilisateur 1",
      email: "user1@example.com",
      amount: "500 FCFA",
      plan: "Forfait Standard",
      date: "Il y a 10 minutes",
    },
    {
      id: "2",
      name: "Utilisateur 2",
      email: "user2@example.com",
      amount: "2000 FCFA",
      plan: "Forfait Premium",
      date: "Il y a 45 minutes",
    },
    {
      id: "3",
      name: "Utilisateur 3",
      email: "user3@example.com",
      amount: "100 FCFA",
      plan: "Forfait Basique",
      date: "Il y a 1 heure",
    },
    {
      id: "4",
      name: "Utilisateur 4",
      email: "user4@example.com",
      amount: "500 FCFA",
      plan: "Forfait Standard",
      date: "Il y a 2 heures",
    },
    {
      id: "5",
      name: "Utilisateur 5",
      email: "user5@example.com",
      amount: "100 FCFA",
      plan: "Forfait Basique",
      date: "Il y a 3 heures",
    },
  ]

  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-sky-100 text-sky-800">{sale.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{sale.amount}</p>
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">{sale.plan}</p>
              <p className="text-xs text-muted-foreground">{sale.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
