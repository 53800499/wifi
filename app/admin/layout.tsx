import type React from "react"
import type { Metadata } from "next"
import AdminSidebar from "@/components/admin-sidebar"

export const metadata: Metadata = {
  title: "Administration - Portail Wi-Fi",
  description: "Interface d'administration du portail Wi-Fi",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
    </div>
  )
}
