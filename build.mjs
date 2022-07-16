#!/usr/bin/env node
import { buildSync } from "esbuild";
(() =>
	buildSync({
		entryPoints: ["index.mts"],
		external: ["./node_modules/*"],
		minify: true,
		bundle: true,
		format: "esm",
		define: { "process.env.NODE_ENV": '"production"' },
		write: true,
		platform: "node",
		keepNames: false,
		minifySyntax: true,
		minifyIdentifiers: true,
		minifyWhitespace: true,
		mangleQuoted: true,
		outdir: "dist",
		outExtension: { ".js": ".mjs" },

		treeShaking: true,
	}))();
