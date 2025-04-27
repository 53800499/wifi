"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Types pour les forfaits
interface Plan {
  id: string
  name: string
  price: number
  duration: number // en heures
  speed: number // en Mbps
  active: boolean
}

export default function PlansPage() {
  const { toast } = useToast()
  const [plans, setPlans] = useState<Plan[]>([
    { id: "1", name: "Forfait Basique", price: 100, duration: 1, speed: 1, active: true },
    { id: "2", name: "Forfait Standard", price: 500, duration: 24, speed: 5, active: true },
    { id: "3", name: "Forfait Premium", price: 2000, duration: 168, speed: 10, active: true },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState<Omit<Plan, "id" | "active">>({
    name: "",
    price: 0,
    duration: 0,
    speed: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "name" ? value : Number(value),
    })
  }

  const handleAddPlan = () => {
    if (!formData.name || formData.price <= 0 || formData.duration <= 0 || formData.speed <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      })
      return
    }

    const newPlan: Plan = {
      id: Date.now().toString(),
      ...formData,
      active: true,
    }

    setPlans([...plans, newPlan])
    resetForm()
    setIsDialogOpen(false)

    toast({
      title: "Forfait ajouté",
      description: `Le forfait ${newPlan.name} a été ajouté avec succès`,
    })
  }

  const handleEditPlan = () => {
    if (!editingPlan) return

    if (!formData.name || formData.price <= 0 || formData.duration <= 0 || formData.speed <= 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs correctement",
        variant: "destructive",
      })
      return
    }

    const updatedPlans = plans.map((plan) => (plan.id === editingPlan.id ? { ...plan, ...formData } : plan))

    setPlans(updatedPlans)
    resetForm()
    setEditingPlan(null)
    setIsDialogOpen(false)

    toast({
      title: "Forfait modifié",
      description: `Le forfait a été modifié avec succès`,
    })
  }

  const handleDeletePlan = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce forfait ?")) {
      const updatedPlans = plans.filter((plan) => plan.id !== id)
      setPlans(updatedPlans)

      toast({
        title: "Forfait supprimé",
        description: "Le forfait a été supprimé avec succès",
      })
    }
  }

  const handleToggleActive = (id: string) => {
    const updatedPlans = plans.map((plan) => (plan.id === id ? { ...plan, active: !plan.active } : plan))

    setPlans(updatedPlans)

    const plan = updatedPlans.find((p) => p.id === id)
    toast({
      title: plan?.active ? "Forfait activé" : "Forfait désactivé",
      description: `Le forfait ${plan?.name} a été ${plan?.active ? "activé" : "désactivé"}`,
    })
  }

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      speed: plan.speed,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      duration: 0,
      speed: 0,
    })
  }

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours} heure${hours > 1 ? "s" : ""}`
    if (hours === 24) return "1 jour"
    if (hours < 168) return `${hours / 24} jours`
    return `${hours / 24 / 7} semaine${hours > 168 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Forfaits</h1>
          <p className="text-muted-foreground">Créez, modifiez et gérez les forfaits Wi-Fi disponibles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPlan(null)
                resetForm()
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Ajouter un forfait
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Modifier le forfait" : "Ajouter un forfait"}</DialogTitle>
              <DialogDescription>
                {editingPlan
                  ? "Modifiez les détails du forfait existant"
                  : "Créez un nouveau forfait Wi-Fi pour vos utilisateurs"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nom du forfait</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Forfait Standard"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durée (heures)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="speed">Vitesse (Mbps)</Label>
                <Input
                  id="speed"
                  name="speed"
                  type="number"
                  value={formData.speed}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={editingPlan ? handleEditPlan : handleAddPlan}>
                {editingPlan ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des forfaits</CardTitle>
          <CardDescription>Gérez les forfaits disponibles pour vos utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prix (FCFA)</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Vitesse</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>{formatDuration(plan.duration)}</TableCell>
                  <TableCell>{plan.speed} Mbps</TableCell>
                  <TableCell>
                    <Button
                      variant={plan.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleActive(plan.id)}
                      className={plan.active ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {plan.active ? "Actif" : "Inactif"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
