"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, WifiOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Types pour les utilisateurs
interface User {
  id: string
  token: string
  deviceId: string
  plan: string
  startTime: Date
  endTime: Date
  isActive: boolean
}

export default function UsersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  // Données fictives pour les utilisateurs
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      token: "abc123def456",
      deviceId: "Samsung Galaxy S21",
      plan: "Forfait Standard",
      startTime: new Date(Date.now() - 3600000), // 1 heure avant
      endTime: new Date(Date.now() + 82800000), // 23 heures après
      isActive: true,
    },
    {
      id: "2",
      token: "ghi789jkl012",
      deviceId: "iPhone 13",
      plan: "Forfait Premium",
      startTime: new Date(Date.now() - 7200000), // 2 heures avant
      endTime: new Date(Date.now() + 604800000), // 7 jours après
      isActive: true,
    },
    {
      id: "3",
      token: "mno345pqr678",
      deviceId: "Laptop Dell",
      plan: "Forfait Basique",
      startTime: new Date(Date.now() - 1800000), // 30 minutes avant
      endTime: new Date(Date.now() + 1800000), // 30 minutes après
      isActive: true,
    },
  ])

  const handleDisconnectUser = (userId: string) => {
    if (confirm("Êtes-vous sûr de vouloir déconnecter cet utilisateur ?")) {
      const updatedUsers = users.map((user) => (user.id === userId ? { ...user, isActive: false } : user))

      setUsers(updatedUsers)

      toast({
        title: "Utilisateur déconnecté",
        description: "L'utilisateur a été déconnecté avec succès",
      })
    }
  }

  const handleRefreshSession = (userId: string) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, isActive: true } : user))

    setUsers(updatedUsers)

    toast({
      title: "Session rafraîchie",
      description: "La session de l'utilisateur a été rafraîchie avec succès",
    })
  }

  const filteredUsers = users.filter(
    (user) =>
      user.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Expiré"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) {
      const days = Math.floor(hours / 24)
      return `${days} jour${days > 1 ? "s" : ""} restant${days > 1 ? "s" : ""}`
    }

    return `${hours}h ${minutes}m restant${hours > 1 || minutes > 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
        <p className="text-muted-foreground">Suivez et gérez les sessions utilisateurs actives</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par token, appareil ou forfait..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions Utilisateurs</CardTitle>
          <CardDescription>Liste des utilisateurs actuellement connectés ou récemment connectés</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Appareil</TableHead>
                <TableHead>Forfait</TableHead>
                <TableHead>Temps restant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs">{user.token}</TableCell>
                    <TableCell>{user.deviceId}</TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell>{formatTimeRemaining(user.endTime)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {user.isActive ? "Connecté" : "Déconnecté"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.isActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnectUser(user.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <WifiOff className="mr-2 h-4 w-4" />
                            Déconnecter
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleRefreshSession(user.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reconnecter
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
