/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#28b0e2",
        
"secondary": "#6bebbe",
        
"accent": "#d76ff7",
        
"neutral": "#202837",
        
"base-100": "#fcfcfd",
        
"info": "#b3bff9",
        
"success": "#ef58c4",
        
"warning": "#f7a426",
        
"error": "#ee2024",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

