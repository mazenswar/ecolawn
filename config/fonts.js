// config/fonts.js
import {
	Space_Grotesk,
	Poppins,
	Outfit,
	Fraunces,
	Inter,
} from "next/font/google";

// Headings
export const ecoLawnHeading = Poppins({
	subsets: ["latin"],
	variable: "--font-eco-heading",
	weight: ["600", "700"],
	display: "swap",
});

// Body — clean and highly readable at small sizes, industry-standard workhorse.
export const ecoLawnBody = Inter({
	subsets: ["latin"],
	variable: "--font-eco-body",
	weight: ["400", "600"],
	display: "swap",
});
