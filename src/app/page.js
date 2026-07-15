import React from "react";
import site from "../../config/site";
import { formatPhone } from "../../config/formatPhone";
import Hero from "./components/sections/hero/Hero";
import TwoColumn from "./components/sections/twoColumn/TwoColumn";
import ContactForm from "./components/sections/contactForm/ContactForm";

const heroConfig = {
	eyebrow: "North Texas Lawn Care",
	heading:
		"Fertilization, Weed Control, Insect Control & Moisture Control",
	subheading:
		"Professional lawn care in the North DFW area, including surface and sub-surface insect protection.",
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

const lawnMaintenanceConfig = {
	id: "services",
	eyebrow: "Our Services",
	heading: "Lawn Maintenance Program",
	paragraphs: [
		"A healthy, beautiful lawn starts with the right care throughout the year. Our Lawn Maintenance program is designed to keep your grass green, healthy, and protected with a customized treatment plan tailored to your lawn's needs.",
		"With scheduled applications and professional care, we take the guesswork out of lawn maintenance so you can enjoy a thick, healthy lawn all season long.",
	],
	list: [
		"Fertilization: Regular applications of premium fertilizers to encourage strong root development, vibrant color, and healthy growth.",
		"Weed Control: Targeted pre-emergent and post-emergent treatments to prevent and eliminate common weeds, helping your lawn stay clean and weed-free.",
		"Insect Control: Treatments to help protect your lawn from damaging insects that can weaken or destroy healthy turf.",
	],
	cta: {
		text: "Get a custom quote",
		href: "#quote",
		variant: "secondary",
	},
};

const moistureControlConfig = {
	id: "moisture-control",
	eyebrow: "Our Services",
	heading: "Moisture Control",
	paragraphs: [
		"Our Moisture Control treatment helps your lawn make the most of every watering by improving moisture retention in the soil and delivering water directly to the grass's root zone. This allows your lawn to stay healthier while using less water, potentially reducing irrigation by up to 50%.",
		"This treatment is an excellent option for homeowners looking to conserve water while maintaining a lush, healthy lawn throughout the growing season.",
	],
	list: [
		"Reduces watering needs by up to 50%",
		"Delivers moisture directly to the root system",
		"Promotes deeper, healthier root growth",
		"Helps reduce the risk of fungal diseases caused by excess surface moisture",
		"Improves your lawn's resilience during hot, dry, and drought conditions",
	],
	cta: {
		text: "Get a custom quote",
		href: "#quote",
		variant: "secondary",
	},
	classNames: "blockTint",
};

const aboutConfig = {
	id: "about",
	eyebrow: "About EcoLawn Solutions",
	heading: "Meet Zach Hayden",
	paragraphs: [
		"My name is Zach Hayden, and I am the owner and operator of the business. With over five years of experience in the lawn care industry, I have gained the knowledge and hands-on experience needed to provide dependable, high-quality lawn care services.",
		"After years of working in the industry, I decided to take the next step and start my own business. My goal is simple: to provide reliable service, quality work, and attention to detail that customers can count on. I take pride in every property I work on and look forward to helping my customers keep their lawns looking their best.",
	],
};

function Home() {
	return (
		<main id="main-content">
			<Hero heroConfig={heroConfig} />
			<TwoColumn twoColumnConfig={lawnMaintenanceConfig} />
			<TwoColumn twoColumnConfig={moistureControlConfig} />
			<TwoColumn twoColumnConfig={aboutConfig} />
			<ContactForm />
		</main>
	);
}

export default Home;
