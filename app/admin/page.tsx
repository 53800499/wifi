import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminStatsCards from "@/components/admin-stats-cards"
import AdminRecentSales from "@/components/admin-recent-sales"
import AdminActiveUsers from "@/components/admin-active-users"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d&apos;ensemble du système de portail Wi-Fi</p>
      </div>

      <AdminStatsCards />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ventes récentes</CardTitle>
                <CardDescription>Les dernières transactions de forfaits Wi-Fi</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AdminRecentSales />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Utilisateurs actifs</CardTitle>
                <CardDescription>Utilisateurs actuellement connectés au réseau</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminActiveUsers />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytiques</CardTitle>
              <CardDescription>Statistiques détaillées sur l&apos;utilisation du réseau</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center border-t">
              <p className="text-muted-foreground">Les graphiques d&apos;analytiques seront affichés ici</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports</CardTitle>
              <CardDescription>Générez et consultez des rapports détaillés</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center border-t">
              <p className="text-muted-foreground">Les rapports seront affichés ici</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
