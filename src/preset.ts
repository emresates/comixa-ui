import type { Config } from "tailwindcss";

/** Tailwind preset for comixa-ui — see README for consumer setup. */
const comicPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#5C5C5C",
        },
        paper: {
          DEFAULT: "#FFFDF5",
          cream: "#FFF3D6",
        },
        comic: {
          yellow: "#FFE566",
          red: "#FF4D4D",
          blue: "#4D9FFF",
          green: "#5BD67A",
          pink: "#FF7AB6",
          orange: "#FF9F43",
        },
      },
      fontFamily: {
        comic: ['"Bangers"', '"Comic Sans MS"', "cursive"],
        body: ['"Comic Neue"', "ui-rounded", "system-ui", "sans-serif"],
      },
      boxShadow: {
        comic: "4px 4px 0 0 #1A1A1A",
        "comic-sm": "2px 2px 0 0 #1A1A1A",
        "comic-lg": "6px 6px 0 0 #1A1A1A",
        "comic-pop": "6px 6px 0 0 #FFE566",
      },
      keyframes: {
        "comic-pop": {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "60%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "comic-button-pop": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "45%": { transform: "scale(1.08) rotate(-1deg)" },
          "75%": { transform: "scale(0.98) rotate(1deg)" },
        },
        "comic-button-shake": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "18%": { transform: "translateX(-4px) rotate(-2deg)" },
          "36%": { transform: "translateX(4px) rotate(2deg)" },
          "54%": { transform: "translateX(-3px) rotate(-1deg)" },
          "72%": { transform: "translateX(3px) rotate(1deg)" },
        },
        "comic-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-3px) rotate(-1deg)" },
          "40%": { transform: "translateX(3px) rotate(1deg)" },
          "60%": { transform: "translateX(-2px)" },
          "80%": { transform: "translateX(2px)" },
        },
        "comic-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-2deg)" },
          "75%": { transform: "rotate(2deg)" },
        },
        "comic-overlay-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "comic-overlay-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "comic-dialog-in": {
          "0%": {
            transform: "scale(0.55) rotate(-6deg) translateY(18px)",
            opacity: "0",
          },
          "55%": {
            transform: "scale(1.08) rotate(2deg) translateY(-4px)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) rotate(0deg) translateY(0)",
            opacity: "1",
          },
        },
        "comic-dialog-out": {
          "0%": {
            transform: "scale(1) rotate(0deg) translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.7) rotate(4deg) translateY(12px)",
            opacity: "0",
          },
        },
        "comic-letter-in": {
          "0%": {
            transform: "translateY(0.55em) rotate(-8deg)",
            opacity: "0",
          },
          "60%": {
            transform: "translateY(-0.08em) rotate(2deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "1",
          },
        },
        "comic-caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "comic-highlight-wipe": {
          "0%": { backgroundSize: "0% 100%" },
          "100%": { backgroundSize: "100% 100%" },
        },
      },
      animation: {
        "comic-pop": "comic-pop 0.35s ease-out both",
        "comic-button-pop": "comic-button-pop 0.32s ease-out both",
        "comic-button-shake": "comic-button-shake 0.42s ease-in-out both",
        "comic-shake": "comic-shake 0.4s ease-in-out",
        "comic-wiggle": "comic-wiggle 0.5s ease-in-out infinite",
        "comic-overlay-in": "comic-overlay-in 0.2s ease-out both",
        "comic-overlay-out": "comic-overlay-out 0.18s ease-in both",
        "comic-dialog-in":
          "comic-dialog-in 0.42s cubic-bezier(0.34, 1.45, 0.64, 1) both",
        "comic-dialog-out": "comic-dialog-out 0.2s ease-in both",
        "comic-letter-in":
          "comic-letter-in 0.45s cubic-bezier(0.34, 1.45, 0.64, 1) both",
        "comic-caret-blink": "comic-caret-blink 1s steps(1) infinite",
        "comic-highlight-wipe": "comic-highlight-wipe 0.7s ease-out both",
      },
    },
  },
};

export default comicPreset;
