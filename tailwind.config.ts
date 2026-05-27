import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#002D59",
          dark: "#001E3D",
          light: "#0A3D6E"
        },
        accent: {
          DEFAULT: "#FFD500",
          light: "#FFE04D",
          dark: "#E6BF00"
        },
        ink: {
          DEFAULT: "#221F20",
          light: "#3A3637"
        },
        neutral: {
          DEFAULT: "#F7F8FA",
          light: "#FFFFFF",
          dark: "#E9ECEF"
        }
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        kicker: "0.18em"
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0, 45, 89, 0.25)",
        glow: "0 0 0 1px rgba(255, 213, 0, 0.6), 0 20px 40px -20px rgba(0, 45, 89, 0.35)"
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(20px, -30px, 0) rotate(8deg)" }
        },
        "float-slower": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(-30px, 20px, 0) rotate(-6deg)" }
        },
        "draw-underline": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" }
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "float-slow": "float-slow 14s ease-in-out infinite",
        "float-slower": "float-slower 20s ease-in-out infinite",
        "draw-underline": "draw-underline 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "bounce-soft": "bounce-soft 1.8s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
