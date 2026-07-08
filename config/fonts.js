// config/fonts.js
import {
	Lexend,
	Playfair_Display,
	Inter,
	DM_Sans,
	DM_Serif_Display,
	Nunito,
	Lora,
	Space_Grotesk,
} from "next/font/google";

export const warmBody = Lexend({
	subsets: ["latin"],
	variable: "--font-warm-body",
	display: "swap",
});

export const warmHeading = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-warm-heading",
	display: "swap",
});

export const cleanBody = Inter({
	subsets: ["latin"],
	variable: "--font-clean-body",
	display: "swap",
});

export const cleanHeading = Inter({
	subsets: ["latin"],
	variable: "--font-clean-heading",
	display: "swap",
	weight: ["700", "800"],
});

export const boldBody = DM_Sans({
	subsets: ["latin"],
	variable: "--font-bold-body",
	display: "swap",
});

export const boldHeading = DM_Serif_Display({
	subsets: ["latin"],
	variable: "--font-bold-heading",
	display: "swap",
	weight: ["400"],
});

export const earthBody = Nunito({
	subsets: ["latin"],
	variable: "--font-earth-body",
	display: "swap",
});

export const earthHeading = Lora({
	subsets: ["latin"],
	variable: "--font-earth-heading",
	display: "swap",
});

export const minimalBody = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-minimal-body",
	display: "swap",
});

export const minimalHeading = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-minimal-heading",
	display: "swap",
	weight: ["700"],
});

export const ecoLawn = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-minimal-heading",
	display: "swap",
	weight: ["700"],
});
