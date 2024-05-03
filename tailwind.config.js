/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "home-image": "url('/home-image.jpg')",
        "auth-image": "url('/auth-image.jpg')",
      },
    },
  },
  plugins: [],
};
