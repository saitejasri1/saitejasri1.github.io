import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TypeAnimation } from "react-type-animation";

// Bubble component for individual bubbles
const Bubble = ({ index }: { index: number }) => {
  const size = Math.random() * 15 + 8; // Size between 8-23px
  const left = Math.random() * 100; // Random horizontal position
  const delay = Math.random() * 2; // Random delay for animation start

  return (
    <motion.div
      className="absolute bottom-0 rounded-full bg-primary/10" // Increased opacity slightly
      style={{
        width: size,
        height: size,
        left: `${left}%`,
      }}
      initial={{ y: 0, opacity: 0.1 }} // Start with some opacity
      animate={{
        y: [0, -500], // Reduced travel distance for more visible bubbles
        x: [0, Math.sin(index) * 20], // Gentle wobble
        opacity: [0.1, 0.3, 0], // Increased opacity range
      }}
      transition={{
        duration: 8 + Math.random() * 4, // Faster animation
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Increased number of bubbles slightly */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Bubble key={i} index={i} />
      ))}

      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Sai Tejasri Yerramsetti
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground"
        >
          <TypeAnimation
            sequence={[
              "Data Scientist",
              1000,
              "AI Engineer",
              1000,
              "ML Enthusiast",
              1000,
            ]}
            repeat={Infinity}
            speed={50}
            cursor={true}
            style={{ display: 'inline-block' }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Passionate about leveraging AI and machine learning to solve real-world problems.
          Experienced in developing innovative solutions using cutting-edge technologies.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity"
                initial={false}
                animate={{ scale: [1, 2], opacity: [0, 0.1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </Button>
          </Link>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute left-10 top-20 w-8 h-8 border-2 border-primary/30 rounded-full"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute right-20 bottom-20 w-6 h-6 bg-primary/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}