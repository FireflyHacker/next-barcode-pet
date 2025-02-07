"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Barcode Pet!
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        A Tamagotchi-style digital pet that interacts with you through barcode
        scans! Take care of your pet, play games, and explore unique
        interactions.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Link className="px-6 py-3 text-lg rounded-2xl shadow-lg bg-blue-500 text-white hover:bg-blue-600" href="/game">
          Start Playing
        </Link>
      </motion.div>
    </div>
  );
}
