/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",        // ม่วงอมทองเป็น default (เปลี่ยนได้)
        temple: {
          gold: "#D4AF37",
          saffron: "#F59E0B",
          deep: "#7C3E00",
          ink: "#1F2937",
          paper: "#FAFAF9",
        }
      },
      fontFamily: {
        display: ["Noto Sans Thai", "Inter", "system-ui", "sans-serif"],
        body: ["Noto Sans Thai", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px rgba(0,0,0,.06)",
        gold: "0 10px 30px rgba(212,175,55,.25)",
      },
      backgroundImage: {
        "radial-temple":
          "radial-gradient(1200px 600px at 10% -10%, rgba(212,175,55,0.15), transparent 40%), radial-gradient(900px 500px at 110% 10%, rgba(245,158,11,0.12), transparent 40%)",
      }
    },
  },
  plugins: [],
}
