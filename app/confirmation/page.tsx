"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, Wifi, Share2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import ConfettiExplosion from "@/components/confetti-explosion"
import CountdownTimer from "@/components/countdown-timer"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const token = searchParams.get("token")

  const [timeRemaining, setTimeRemaining] = useState(3600) // 1 heure en secondes par défaut
  const [progress, setProgress] = useState(100)
  const [isConnected, setIsConnected] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCopiedBadge, setShowCopiedBadge] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!token) {
      router.push("/")
      return
    }

    // Afficher les confettis après un court délai
    setTimeout(() => {
      setShowConfetti(true)
    }, 500)

    // Simuler la connexion au réseau
    const connectTimeout = setTimeout(() => {
      setIsConnected(true)
      toast({
        title: "Connexion établie",
        description: "Vous êtes maintenant connecté à Internet",
      })
    }, 2000)

    // Simuler le décompte du temps
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          toast({
            title: "Session expirée",
            description: "Votre session Wi-Fi est terminée",
            variant: "destructive",
          })
          return 0
        }

        // Notification 5 minutes avant expiration
        if (prev === 300) {
          toast({
            title: "Attention",
            description: "Votre session expire dans 5 minutes",
            variant: "default",
          })
        }

        const newTime = prev - 1
        setProgress((newTime / 3600) * 100)
        return newTime
      })
    }, 1000)

    return () => {
      clearTimeout(connectTimeout)
      clearInterval(interval)
    }
  }, [token, router, toast])

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      setShowCopiedBadge(true)
      setTimeout(() => setShowCopiedBadge(false), 2000)
      toast({
        title: "Code copié",
        description: "Le code d'accès a été copié dans le presse-papier",
      })
    }
  }

  if (!token) {
    return null // Redirection en cours
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-green-500/20 to-blue-500/20 blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {showConfetti && <ConfettiExplosion />}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-0 bg-slate-800/50 backdrop-blur-xl overflow-hidden shadow-xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="rounded-full bg-gradient-to-r from-green-400 to-green-600 p-3">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl text-white">Paiement Confirmé</CardTitle>
              <CardDescription className="text-slate-300">Votre accès Internet est maintenant actif</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Badge
                  variant="outline"
                  className={`${
                    isConnected
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "border-slate-600 text-slate-300 bg-slate-800/50"
                  } px-3 py-1.5 text-sm transition-all duration-500`}
                >
                  <AnimatePresence mode="wait">
                    {isConnected ? (
                      <motion.div
                        key="connected"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Wifi className="h-4 w-4 mr-1.5" />
                        Connecté
                      </motion.div>
                    ) : (
                      <motion.div
                        key="connecting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />
                        Connexion en cours...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Temps restant</span>
                  <CountdownTimer seconds={timeRemaining} />
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-slate-700" ref={progressRef}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border border-slate-700 rounded-md p-4 bg-slate-800/80"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-300">Code d&apos;accès</span>
                  <div className="relative">
                    <Button variant="ghost" size="sm" onClick={copyToken} className="h-8 px-2 text-slate-300">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <AnimatePresence>
                      {showCopiedBadge && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -top-8 -left-6 bg-green-500 text-white text-xs px-2 py-1 rounded"
                        >
                          Copié!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="font-mono text-sm bg-slate-900 border border-slate-700 rounded p-2 text-center text-blue-400">
                  {token}
                </div>
                <p className="text-xs text-slate-400 mt-2">Conservez ce code pour vous reconnecter si nécessaire</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-md bg-blue-900/20 p-4 border border-blue-800/30"
              >
                <div className="flex items-start">
                  <Wifi className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-300">Information importante</h4>
                    <p className="text-xs text-blue-300/80 mt-1">
                      Vous ne pouvez utiliser ce code que sur un seul appareil à la fois. Si vous vous connectez sur un
                      autre appareil, celui-ci sera automatiquement déconnecté.
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3">
              <Link href="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                >
                  Retour à l&apos;accueil
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-slate-300 flex items-center gap-2"
                onClick={() => {
                  toast({
                    title: "Partage",
                    description: "Fonctionnalité de partage en cours de développement",
                  })
                }}
              >
                <Share2 className="h-4 w-4" />
                Partager ce forfait
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Besoin d&apos;aide ? Contactez le support au 97000000
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
