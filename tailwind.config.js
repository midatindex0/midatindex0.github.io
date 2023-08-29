/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans"],
        "mono": ["Space Mono"]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"],
  }
}

