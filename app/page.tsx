"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Clock, Zap, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import WifiAnimation from "@/components/wifi-animation"
import { cn } from "@/lib/utils"

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plans = [
    {
      id: "basic",
      name: "Basique",
      price: "100",
      duration: "1 heure",
      speed: "1 Mbps",
      description: "Idéal pour une utilisation rapide",
      color: "from-amber-400 to-orange-500",
      shadowColor: "shadow-amber-500/20",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "standard",
      name: "Standard",
      price: "500",
      duration: "24 heures",
      speed: "5 Mbps",
      description: "Parfait pour une journée complète",
      popular: true,
      color: "from-sky-400 to-blue-600",
      shadowColor: "shadow-blue-500/20",
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      id: "premium",
      name: "Premium",
      price: "2000",
      duration: "7 jours",
      speed: "10 Mbps",
      description: "Pour une utilisation prolongée",
      color: "from-violet-400 to-purple-600",
      shadowColor: "shadow-purple-500/20",
      icon: <Zap className="h-5 w-5" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  const handleSelectPlan = (id: string) => {
    setSelectedPlan(id)
    setTimeout(() => {
      window.location.href = `/payment/${id}`
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <WifiAnimation />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Connectez-vous au Wi-Fi
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Choisissez un forfait pour accéder à Internet. Paiement rapide et sécurisé par Mobile Money.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full border-0 bg-slate-800/50 backdrop-blur-xl overflow-hidden relative group",
                  plan.popular ? "ring-2 ring-blue-500" : "",
                  plan.shadowColor,
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b",
                    plan.color,
                    "opacity-5 group-hover:opacity-10",
                  )}
                ></div>

                {plan.popular && (
                  <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-1 text-xs font-medium text-white">
                    Populaire
                  </div>
                )}

                <CardContent className="p-6 pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br",
                        plan.color,
                      )}
                    >
                      {plan.icon}
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-700 text-slate-300 px-2 py-1 text-xs bg-slate-800/50"
                    >
                      {plan.speed}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">Forfait {plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-1">FCFA</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-300">
                      <Clock className="h-4 w-4 mr-2 text-slate-400" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Zap className="h-4 w-4 mr-2 text-slate-400" />
                      <span>{plan.speed}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Wifi className="h-4 w-4 mr-2 text-slate-400" />
                      <span>Connexion immédiate</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={cn(
                      "w-full relative overflow-hidden group bg-gradient-to-r transition-all duration-300",
                      plan.color,
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Sélectionner
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm">
            Déjà un forfait actif ?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Connectez-vous ici
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
