/** @type {import("tailwindcss").Config} */
// Tailwind 4 is CSS-first; globals.css loads this compatibility config with @config.
module.exports = {
  theme: {
    extend: {
      colors: {
        waypoint: {
          ink: "#202a29",
          muted: "#8a9290",
          paper: "#f7f7f3",
          line: "#eceee8",
          green: "#315f52",
          "green-dark": "#244a40",
          sage: "#dcebe3",
          peach: "#f8e5d9",
          lilac: "#e9e3f3",
        },
      },
    },
  },
};
