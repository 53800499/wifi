"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CountdownTimer({ seconds }: { seconds: number }) {
  const [timeString, setTimeString] = useState("")

  useEffect(() => {
    const updateTimeString = () => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = seconds % 60

      setTimeString(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`,
      )
    }

    updateTimeString()
  }, [seconds])

  return (
    <motion.span
      key={timeString}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono text-sm font-medium text-white"
    >
      {timeString}
    </motion.span>
  )
}
