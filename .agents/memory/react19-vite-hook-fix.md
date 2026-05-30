---
name: React 19 + Vite invalid hook call fix
description: Fix for "Cannot read properties of null (reading 'useState')" when splitting a single-file React 19 app into multiple component files in a Vite pnpm workspace.
---

## The Rule
When splitting a React 19 Vite app into multiple files (e.g., extracting a `Layout.tsx` that uses hooks), you must:
1. Add `import React` (namespace import) alongside named hook imports in any file that uses `React.X` types OR has complex re-exported hooks (wouter, framer-motion).
2. Add `"react/jsx-runtime"` to `resolve.dedupe` in vite.config.ts.
3. Add `optimizeDeps.include: ["react", "react-dom", "react/jsx-runtime", "framer-motion", "wouter"]`.

## Why
Vite's pre-bundling can create a situation where the React module's `exports` object is `null` during initialization of a complex component file. This happens due to circular dependency resolution order in Vite's CJS-to-ESM pre-bundling when multiple hook-heavy packages (framer-motion, wouter) are all imported in the same file. The `optimizeDeps.include` forces Vite to pre-bundle all these together, ensuring React is fully initialized before any component code runs.

The `React.ReactNode` type reference (without `import React`) also causes SWC/Babel to treat React ambiguously in certain edge cases.

## How to Apply
Add to `vite.config.ts`:
```ts
resolve: {
  dedupe: ["react", "react-dom", "react/jsx-runtime"],
},
optimizeDeps: {
  include: ["react", "react-dom", "react/jsx-runtime", "framer-motion", "wouter"],
},
```

In any complex component file that imports from multiple hook-heavy libraries:
```ts
import React, { useState, useEffect, type ReactNode } from "react";
// Never use React.ReactNode in type positions — use imported ReactNode instead
```
