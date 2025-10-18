import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  const gridItems = Array.from({ length: 12 });

  return (
    <div className="hidden lg:flex relative overflow-hidden items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 p-16 rounded-3xl">
      {/* --- Floating Background Blobs --- */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-primary/30 blur-3xl"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full bg-secondary/30 blur-3xl"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- Animated Grid Background --- */}
      <div className="relative z-10 grid grid-cols-4 gap-4 mb-8 opacity-90">
        {gridItems.map((_, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-2xl bg-primary/20 backdrop-blur-md shadow-md"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 0.6,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* --- Center Text / Branding --- */}
      <motion.div
        className="relative z-20 max-w-md text-center"
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <img
          src="/logo.png"
          alt="App Logo"
          className="mx-auto mb-5 w-20 h-20 drop-shadow-md"
        />
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg leading-relaxed">{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default AuthImagePattern;
