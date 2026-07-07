import React from "react";
import PageHero from "../components/sections/pageHero/PageHero";

const aboutHeroConfig = {
	eyebrow: null, // optional label above heading e.g. "Our Services"
	heading: "About",
	subheading:
		"A brief description of what this page covers. Keep it clear and welcoming.",
	image: null,
	// Optional image example:
	// image: {
	// 	src: "/page-hero.webp",
	// 	alt: "Descriptive alt text",
	// 	width: 600,
	// 	height: 400,
	// },
	align: "left", // "left" or "center"
};

function AboutPage() {
	return (
		<main id="main-content" className="about__page">
			<PageHero pageHeroConfig={aboutHeroConfig} />
		</main>
	);
}

export default AboutPage;
