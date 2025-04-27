"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, CheckCircle2, Loader2 } from "lucide-react"

export default function PaymentAnimation({ step }: { step: number }) {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-blue-500/30"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <CreditCard className="h-10 w-10 text-blue-500" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center"
            >
              <CheckCircle2 className="h-12 w-12 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
