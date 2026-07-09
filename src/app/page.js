import React from "react";
import { Sprout, Droplet } from "lucide-react";
import site from "../../config/site";
import { formatPhone } from "../../config/formatPhone";
import Hero from "./components/sections/hero/Hero";
import CardGrid from "./components/sections/cardGrid/CardGrid";
import ServiceArea from "./components/sections/serviceArea/ServiceArea";
import TwoColumn from "./components/sections/twoColumn/TwoColumn";
import Steps from "./components/sections/steps/Steps";
import ContactForm from "./components/sections/contactForm/ContactForm";

const heroConfig = {
	eyebrow: "North Texas Lawn Care",
	heading: "Reliable lawn care for your North Texas lawn",
	subheading: `Fertilization, weed control, and insect protection for homes across ${site.serviceAreas.slice(0, -1).join(", ")}, and ${site.serviceAreas.at(-1)}.`,
	cta: site.phone
		? {
				text: `Call ${formatPhone(site.phone)}`,
				href: `tel:${site.phone}`,
				variant: "primary",
			}
		: {
				text: "Get a free quote",
				href: "#quote",
				variant: "primary",
			},
	ctaSecondary: {
		text: "Get a free quote",
		href: "#quote",
		variant: "secondary",
	},
	images: {
		landscape: {
			src: "/assets/green-grass.webp",
			alt: "",
		},
	},
};

const servicesConfig = {
	id: "services",
	heading: "Our services",
	subheading:
		"Straightforward lawn care, priced to fit your property — not a one-size-fits-all package.",
	cards: [
		{
			id: "lawn-maintenance",
			href: "#quote",
			icon: Sprout,
			title: "Lawn Maintenance Program",
			description:
				"Ongoing fertilization, weed control, and surface and sub-surface insect control to keep your lawn healthy through every season.",
			cta: "Get a custom quote",
		},
		{
			id: "moisture-control",
			href: "#quote",
			icon: Droplet,
			title: "Moisture Control",
			description:
				"An add-on to the maintenance program that helps your lawn hold water evenly, reducing dry patches and runoff.",
			cta: "Get a custom quote",
		},
	],
};

// Zip codes are a best-effort list for these 8 towns — verify before launch.
const serviceAreaConfig = {
	id: "service-areas",
	heading: "Do we service your area?",
	subheading:
		"We proudly serve homeowners across these North Texas communities. Enter your zip code to check.",
	towns: site.serviceAreas,
	zips: [
		"75056", // The Colony
		"75033",
		"75034",
		"75035",
		"75036", // Frisco
		"75069",
		"75070",
		"75071",
		"75072", // McKinney
		"75023",
		"75024",
		"75025",
		"75074",
		"75075",
		"75093",
		"75094", // Plano
		"75029",
		"75057",
		"75067",
		"75077", // Lewisville
		"76051", // Grapevine
		"75006",
		"75007",
		"75010", // Carrollton
		"75068", // Little Elm
	],
	// Broader North Texas / DFW zip prefixes — not an exact service area,
	// just close enough to be worth a "we're expanding" nudge instead of a hard no.
	nearbyPrefixes: ["750", "751", "752", "753", "760", "761", "762"],
	successMessage: "Yes! We service your area.",
	nearbyMessage:
		"We don't currently service this specific area, but we're expanding — reach out anyway.",
	outsideMessage: "Sorry, you're outside our service area.",
	classNames: "blockTint",
};

const aboutConfig = {
	id: "about",
	eyebrow: "About EcoLawn Solutions",
	heading: "Local, family-run lawn care",
	// Placeholder copy — swap in the owner's real founding story once available.
	paragraphs: [
		"EcoLawn Solutions is a small, local lawn care company serving North Texas homeowners with straightforward, reliable service.",
		"We keep things simple: honest pricing based on your property, dependable scheduling, and lawn care that actually works.",
	],
	cta: {
		text: "Get a free quote",
		href: "#quote",
		variant: "secondary",
	},
};

const stepsConfig = {
	heading: "How it works",
	subheading: "A simple process from first contact to ongoing care.",
	cta: false,
	classNames: "blockTint",
	steps: [
		{
			id: "step-1",
			title: "Get your free quote",
			description:
				"Tell us about your property and what you need. We'll get back to you with a straightforward quote based on your lawn's size.",
		},
		{
			id: "step-2",
			title: "We confirm scope and schedule",
			description:
				"We'll confirm the services you want and set up a schedule that works for you.",
		},
		{
			id: "step-3",
			title: "Ongoing service begins",
			description:
				"We takes care of the rest, keeping your lawn healthy all season long.",
		},
	],
};

function Home() {
	return (
		<main id="main-content">
			<Hero heroConfig={heroConfig} />
			<CardGrid cardGridConfig={servicesConfig} />
			<ServiceArea serviceAreaConfig={serviceAreaConfig} />
			<TwoColumn twoColumnConfig={aboutConfig} />
			<Steps stepsConfig={stepsConfig} />
			<ContactForm />
		</main>
	);
}

export default Home;
