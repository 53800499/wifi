"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Package, CreditCard, Settings, BarChart, LogOut, Menu, X, Wifi } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      title: "Tableau de bord",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Forfaits",
      href: "/admin/plans",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Paiements",
      href: "/admin/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Statistiques",
      href: "/admin/stats",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      <div
        className={cn(
          "bg-white border-r min-h-screen w-64 flex flex-col transition-all duration-300 ease-in-out",
          isMobile && (isOpen ? "fixed inset-y-0 left-0 z-40" : "fixed -left-64"),
        )}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Wifi className="h-6 w-6 text-sky-600" />
            <span className="font-bold text-xl">Wi-Fi Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => isMobile && setIsOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start mb-1",
                  pathname === item.href
                    ? "bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>

      {isMobile && isOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
