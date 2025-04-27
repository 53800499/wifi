"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Smartphone, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import PaymentAnimation from "@/components/payment-animation"

const plans = {
  basic: {
    name: "Forfait Basique",
    price: "100 FCFA",
    duration: "1 heure",
    speed: "1 Mbps",
    color: "from-amber-400 to-orange-500",
  },
  standard: {
    name: "Forfait Standard",
    price: "500 FCFA",
    duration: "24 heures",
    speed: "5 Mbps",
    color: "from-sky-400 to-blue-600",
  },
  premium: {
    name: "Forfait Premium",
    price: "2000 FCFA",
    duration: "7 jours",
    speed: "10 Mbps",
    color: "from-violet-400 to-purple-600",
  },
}

export default function PaymentPage({ params }: { params: { planId: string } }) {
  const { planId } = params
  const plan = plans[planId as keyof typeof plans]
  const router = useRouter()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("mtn")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState(0)

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setPaymentStep(1)
        setTimeout(() => {
          setPaymentStep(2)
          setTimeout(() => {
            router.push(`/confirmation?token=${generateRandomToken()}`)
          }, 1500)
        }, 2000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isProcessing, router])

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">Forfait non trouvé</h1>
        <p className="mt-4">Le forfait que vous recherchez n&apos;existe pas.</p>
        <Link href="/">
          <Button className="mt-6">Retour à l&apos;accueil</Button>
        </Link>
      </div>
    )
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro de téléphone",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
  }

  const generateRandomToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
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
            Retour aux forfaits
          </Link>
        </motion.div>

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <PaymentAnimation step={paymentStep} />
            <h2 className="text-2xl font-bold mt-6 mb-2">
              {paymentStep === 0
                ? "Traitement du paiement..."
                : paymentStep === 1
                  ? "Vérification..."
                  : "Paiement confirmé !"}
            </h2>
            <p className="text-slate-300">
              {paymentStep === 0
                ? "Veuillez patienter pendant que nous traitons votre paiement."
                : paymentStep === 1
                  ? "Nous vérifions votre transaction et préparons votre accès."
                  : "Votre accès Wi-Fi est prêt. Redirection en cours..."}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={item}>
              <Card className="border-0 bg-slate-800/50 backdrop-blur-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-white">Récapitulatif de la commande</CardTitle>
                  <CardDescription className="text-slate-400">Détails du forfait sélectionné</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="font-medium text-slate-300">Forfait</span>
                    <span className="text-white">{plan.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="font-medium text-slate-300">Durée</span>
                    <span className="text-white">{plan.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="font-medium text-slate-300">Vitesse</span>
                    <span className="text-white">{plan.speed}</span>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <span className="text-slate-300">Total</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      {plan.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 bg-slate-800/50 backdrop-blur-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-white">Méthode de paiement</CardTitle>
                  <CardDescription className="text-slate-400">
                    Choisissez votre mode de paiement préféré
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment}>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-2 border border-slate-700 rounded-md p-3 cursor-pointer hover:bg-slate-700/30 transition-colors">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn" className="flex items-center cursor-pointer text-white">
                          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mr-2">
                            <Smartphone className="h-4 w-4 text-black" />
                          </div>
                          MTN Mobile Money
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border border-slate-700 rounded-md p-3 cursor-pointer hover:bg-slate-700/30 transition-colors">
                        <RadioGroupItem value="moov" id="moov" />
                        <Label htmlFor="moov" className="flex items-center cursor-pointer text-white">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                            <Smartphone className="h-4 w-4 text-white" />
                          </div>
                          Moov Money
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="mt-6 space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">
                        Numéro de téléphone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Ex: 97000000"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                      <p className="text-xs text-slate-400">
                        Entrez le numéro associé à votre compte{" "}
                        {paymentMethod === "mtn" ? "MTN Mobile Money" : "Moov Money"}
                      </p>
                    </div>

                    <div className="mt-6 p-3 border border-slate-700 rounded-md bg-slate-800/50">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <Shield className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">Paiement sécurisé</h4>
                          <p className="text-xs text-slate-400 mt-1">
                            Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons pas vos données
                            bancaires.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Payer maintenant
                        <CreditCard className="ml-2 h-4 w-4" />
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-700 pt-4">
                  <p className="text-xs text-slate-400 text-center">
                    Vos paiements sont sécurisés. En continuant, vous acceptez nos conditions d&apos;utilisation.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
