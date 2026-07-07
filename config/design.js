// config/design.js

export const palettes = [
	{
		id: "warm",
		label: "Warm",
		description: "Terracotta & sand",
		group: "light",
		swatches: ["#c1603a", "#f5e6d3", "#fdf6ef"],
	},
	{
		id: "clean",
		label: "Clean",
		description: "Navy & crisp white",
		group: "light",
		swatches: ["#1e3a5f", "#f0f4f8", "#c8d6e5"],
	},
	{
		id: "earth",
		label: "Earth",
		description: "Forest & sage",
		group: "light",
		swatches: ["#3d6b4f", "#e8ede4", "#f7f3ee"],
	},
	{
		id: "minimal",
		label: "Minimal",
		description: "Black & white",
		group: "light",
		swatches: ["#111111", "#f5f5f5", "#e0e0e0"],
	},
	{
		id: "bold",
		label: "Bold",
		description: "Dark & electric",
		group: "dark",
		swatches: ["#00b4a6", "#d6006e", "#0f1923"],
	},
	{
		id: "fiery-ocean",
		label: "Fiery Ocean",
		description: "Crimson & deep navy",
		group: "light",
		swatches: ["#c1121f", "#003049", "#fdf0d5"],
	},
	{
		id: "golden-peachy-glow",
		label: "Golden Peachy Glow",
		description: "Sage & warm coral",
		group: "light",
		swatches: ["#e26d5c", "#ffe1a8", "#c9cba3"],
	},
	{
		id: "whispering-waves",
		label: "Whispering Waves",
		description: "Lavender & ocean blue",
		group: "light",
		swatches: ["#52b2cf", "#d1cfe2", "#d4afb9"],
	},
	{
		id: "cozy-cabin",
		label: "Cozy Cabin",
		description: "Charcoal & dusty rose",
		group: "dark",
		swatches: ["#c17c74", "#2a3d45", "#ddc9b4"],
	},
];

export const fontPairings = [
	{
		id: "editorial",
		label: "Editorial",
		description: "Elegant & literary",
		heading: "--font-warm-heading",
		body: "--font-clean-body",
	},
	{
		id: "friendly",
		label: "Friendly",
		description: "Warm & approachable",
		heading: "--font-earth-heading",
		body: "--font-earth-body",
	},
	{
		id: "clinical",
		label: "Clinical",
		description: "Precise & professional",
		heading: "--font-bold-heading",
		body: "--font-bold-body",
	},
	{
		id: "expressive",
		label: "Expressive",
		description: "Creative & distinctive",
		heading: "--font-bold-heading",
		body: "--font-warm-body",
	},
	{
		id: "modern",
		label: "Modern",
		description: "Fresh & digital",
		heading: "--font-minimal-heading",
		body: "--font-clean-body",
	},
	{
		id: "grounded",
		label: "Grounded",
		description: "Stable & calm",
		heading: "--font-earth-heading",
		body: "--font-warm-body",
	},
];

// These are the styles — each one is a complete visual personality.
// shape and spacing are applied automatically when a style is selected.
// The client just sees the label and description.
export const siteStyles = [
	{
		id: "split-contained",
		label: "Soft & Personal",
		description: "Circular portrait, warm and approachable",
		shape: "round",
		spacing: "airy",
	},
	{
		id: "split-rectangular",
		label: "Clean & Balanced",
		description: "Rectangular portrait, professional and clear",
		shape: "soft",
		spacing: "balanced",
	},
	{
		id: "full-bleed",
		label: "Dramatic & Bold",
		description: "Full viewport split, high visual impact",
		shape: "sharp",
		spacing: "compact",
	},
	{
		id: "asymmetric",
		label: "Structured & Modern",
		description: "Geometric layout, confident and grounded",
		shape: "sharp",
		spacing: "balanced",
	},
	{
		id: "centered",
		label: "Editorial & Open",
		description: "Centered layout, spacious and elegant",
		shape: "soft",
		spacing: "airy",
	},
	{
		id: "background-hero",
		label: "Immersive & Atmospheric",
		description: "Full background image with text overlay",
		shape: "sharp",
		spacing: "compact",
	},
];
