
# Project Setup Instructions

## Step 1: Install Dependencies

To get started, you need to install the required dependencies. Open your terminal and run the following command:

```bash
npm install
```

This will install all the dependencies listed in the `package.json` file.

## Step 2: Start Development Server

Once the dependencies are installed, you can start the development server. Run the following command:

```bash
npm run dev
```

This will start the Vite development server, and your application will be available at `http://localhost:8080/`.

## Step 3: Fix Vite Configuration (If Necessary)

If you're encountering the error related to file serving, update your `vite.config.ts` file. Modify the `server` section to allow the root directory and other required directories.

### Open `vite.config.ts` and update it as follows:

```ts
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
```

### Explanation:
- **`server.fs.allow`**: Specifies which directories Vite is allowed to serve files from. We added the root directory (`__dirname`) to ensure that the `index.html` file is accessible.
- **`server.fs.deny`**: Denies access to certain directories like `.env`, `.git`, and the `server` directory to maintain security.

## Step 4: Restart Development Server

After updating the `vite.config.ts` file, restart the Vite development server:

```bash
npm run dev
```

Your project should now be up and running. You can visit the development server at `http://localhost:8080/`.

---
Thank you for setting up the project! If you have any questions or run into issues, feel free to ask.
