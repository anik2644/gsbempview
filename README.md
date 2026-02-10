
## Run This cmds:
npm install
npm run dev


## fix this:

Open vite.config.ts ->

  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [
        "./client", 
        "./shared",
        __dirname,  // Allow the root directory
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
