"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Key, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [accessCode, setAccessCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!accessCode.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un code d'accès",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler une vérification du code d'accès
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Rediriger vers la page de confirmation avec le token
      router.push(`/confirmation?token=${accessCode}`)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Code d'accès invalide ou expiré",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-0"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-0 bg-slate-800/50 backdrop-blur-xl overflow-hidden shadow-xl">
            <CardHeader className="space-y-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <div className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-3">
                  <Key className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl text-center text-white">Connexion Wi-Fi</CardTitle>
              <CardDescription className="text-center text-slate-300">
                Entrez votre code d&apos;accès pour vous connecter à Internet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accessCode" className="text-slate-300">
                      Code d&apos;accès
                    </Label>
                    <Input
                      id="accessCode"
                      placeholder="Entrez votre code d'accès"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      required
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="relative z-10 flex items-center justify-center">Se connecter</span>
                    )}
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-center text-sm text-slate-400">
                <p>Vous n&apos;avez pas de code d&apos;accès ?</p>
                <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Achetez un forfait Wi-Fi
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
