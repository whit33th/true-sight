const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    cssnano:
      process.env.NODE_ENV === "production" ? { preset: "default" } : false,
  },
};
export default config;
