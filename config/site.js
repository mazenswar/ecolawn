// config/site.js

const site = {
	// =========================
	// EDIT THIS PER PROJECT
	// =========================
	name: "EcoLawn Solutions",
	tagline: "Reliable lawn care for North Texas homes",
	description:
		"EcoLawn Solutions provides lawn maintenance, fertilization, weed control, and moisture control for homeowners across The Colony, Frisco, McKinney, Plano, Lewisville, Grapevine, Carrollton, and Little Elm, TX.",
	url: "https://ecolawn.us",
	locale: "en_US",
	// Theme
	theme: "ecolawn", // "warm" | "clean" | "bold" | "earth" | "minimal"
	// Analytics
	analytics: {
		ga4: null, // or null to disable
		gtm: null, // "GTM-XXXXXXX" or null
	},
	// Contact
	email: "service@ecolawn.us",
	phone: "+18179133284",

	// Towns served — single source of truth, used by both the homepage
	// service-area checker and the JSON-LD areaServed field below.
	serviceAreas: [
		"The Colony",
		"Frisco",
		"McKinney",
		"Plano",
		"Lewisville",
		"Grapevine",
		"Carrollton",
		"Little Elm",
	],
	// address: {
	// 	street: "801 Route 1 PMB 1035",
	// 	city: "Edison",
	// 	state: "NJ",
	// 	zip: "08817",
	// 	country: "US",
	// },

	// Branding
	logo: {
		src: "/logo/ecolawn.png", // place in /public
		width: 200,
		height: 60,
		alt: "EcoLawn Solutions Logo",
	},

	// OG image defaults
	og: {
		width: 1200,
		height: 630,
		// Brand colors used in dynamic OG image — match the ecolawn theme
		background: "#2e5240", // brand-2, dark green
		accent: "#e8ede4", // brand-3, light sage
		text: "#ffffff",
	},

	// Social
	social: {
		twitter: null, // "@handle"
		instagram: null, // "handle"
		linkedin: null, // "handle"
	},

	// Business type for JSON-LD
	// See: https://schema.org/LocalBusiness subtypes
	businessType: "HomeAndConstructionBusiness",

	// Operating hours for JSON-LD (optional)
	// hours: [
	// 	{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "09:00", close: "17:00" },
	// ],
	hours: null,

	// Price range for JSON-LD (optional)
	// "$" | "$$" | "$$$" | "$$$$"
	// priceRange: "$$",
};

export default site;
