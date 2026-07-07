import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./components/sections/hero/Hero";
import CardGrid from "./components/sections/cardGrid/CardGrid";
import TwoColumn from "./components/sections/twoColumn/TwoColumn";
import Steps from "./components/sections/steps/Steps";
import BookingCTA from "./components/sections/bookingCTA/BookingCTA";

// const heroConfig = {
// 	heading: "Your Heading Here",
// 	subheading:
// 		"A brief description of what you do and who you serve. Keep it clear and human.",
// 	cta: {
// 		text: "Get started",
// 		href: "/contact",
// 		variant: "primary",
// 	},
// 	image: {
// 		src: "/home/profile-hero.jpg",
// 		alt: "Descriptive alt text",
// 		width: 400,
// 		height: 400,
// 	},
// 	caption: {
// 		name: "Your Name",
// 		title: "Licensed Clinical Psychologist",
// 	},
// };

// VARIANT A
// const heroConfig = {
// 	variant: "split-contained",
// 	eyebrow: "Currently accepting new clients",
// 	heading: "A space to be heard, supported, and understood.",
// 	subheading:
// 		"Individual therapy for adults navigating anxiety, life transitions, and relationship challenges. Virtual sessions across New Jersey.",
// 	cta: {
// 		text: "Book a free consultation",
// 		href: "/contact",
// 		variant: "primary",
// 	},
// 	ctaSecondary: { text: "Learn more", href: "/about", variant: "secondary" },
// 	images: {
// 		portrait: {
// 			src: "/hero/variant-abd.jpg",
// 			alt: "Dr. Sarah Mitchell, Licensed Therapist",
// 		},
// 	},
// 	caption: {
// 		name: "Dr. Sarah Mitchell",
// 		title: "Licensed Clinical Social Worker",
// 	},
// };

// VARIANT B

// const heroConfig = {
// 	variant: "split-rectangular",
// 	eyebrow: "Virtual therapy · New Jersey",
// 	heading: "Therapy that meets you where you are.",
// 	subheading:
// 		"You don't have to navigate this alone. I work with adults facing anxiety, burnout, and major life changes in a warm, judgment-free space.",
// 	cta: { text: "Get started", href: "/contact", variant: "primary" },
// 	ctaSecondary: { text: "How it works", href: "/services", variant: "ghost" },
// 	images: {
// 		portrait: { src: "/hero/variant-abd.jpg" },
// 	},
// 	caption: {
// 		name: "Dr. Sarah Mitchell",
// 		title: "LCSW · Anxiety & Life Transitions",
// 	},
// };

// VARIANT C

// const heroConfig = {
// 	variant: "full-bleed",
// 	eyebrow: "Individual & couples therapy",
// 	heading: "Find your way back to yourself.",
// 	subheading:
// 		"A private, compassionate practice offering evidence-based therapy for adults in New Jersey.",
// 	cta: {
// 		text: "Schedule a consultation",
// 		href: "/contact",
// 		variant: "primary",
// 	},
// 	images: {
// 		background: { src: "/hero/variant-c.jpg", alt: "" },
// 	},
// 	caption: null,
// };

// VARIANT D

// const heroConfig = {
// 	variant: "asymmetric",
// 	heading: "Rooted in care. Grounded in evidence.",
// 	subheading:
// 		"Therapy for adults who are ready to do the work. Specializing in anxiety, trauma, and identity.",
// 	cta: { text: "Book a consultation", href: "/contact", variant: "primary" },
// 	images: {
// 		portrait: { src: "/hero/variant-abd.jpg", alt: "Therapy office interior" },
// 	},
// 	caption: { name: "Dr. Sam Mitchell", title: "Licensed Psychologist" },
// };

// VARIANT E

// const heroConfig = {
// 	variant: "centered",
// 	eyebrow: "Welcoming new clients",
// 	heading: "Therapy for the whole person.",
// 	subheading:
// 		"A warm, affirming space for adults seeking support with anxiety, relationships, and personal growth. Currently offering virtual sessions across New Jersey.",
// 	cta: { text: "Start your journey", href: "/contact", variant: "primary" },
// 	ctaSecondary: {
// 		text: "Meet your therapist",
// 		href: "/about",
// 		variant: "secondary",
// 	},
// 	images: {
// 		portrait: { src: "/hero/variant-e.jpg", alt: "Calm therapy office space" },
// 	},
// 	caption: null,
// };

// VARIANT F

const heroConfig = {
	variant: "background-hero",
	eyebrow: "Now accepting new clients",
	heading: "You deserve a space that feels safe.",
	subheading:
		"Individual therapy for adults navigating anxiety, burnout, and life transitions. Virtual sessions across New Jersey.",
	cta: {
		text: "Book a free consultation",
		href: "/contact",
		variant: "primary",
	},
	ctaSecondary: { text: "Learn more", href: "/about", variant: "secondary" },
	images: {
		landscape: { src: "/hero/variant-e.jpg", alt: "" },
		portrait: {
			src: "/hero/variant-abd.jpg",
			alt: "Calm therapy office space",
		},
		background: { src: "/hero/variant-c.jpg", alt: "" },
	},
};

////////////////////////
///////////////////////
//////////////////////
//////////////////////
////////////////////
///////////////////

const cardGridConfig = {
	heading: "What We Can Help With",
	subheading:
		"We are here to offer care and perspective as you navigate your journey.",
	cta: {
		text: "See all services",
		href: "/services",
		variant: "secondary",
	},
	cards: [
		{
			title: "Individual Therapy",
			description:
				"A brief description of this service and how it helps your clients.",
			href: "/services/one",
			cta: "Learn more",
		},
		{
			title: "Couples Therapy",
			description:
				"A brief description of this service and how it helps your clients.",
			href: "/services/two",
			cta: "Learn more",
		},
		{
			title: "Groups",
			description:
				"A brief description of this service and how it helps your clients.",
			href: "/services/three",
			cta: "Learn more",
		},
	],
};

const twoColumnConfig = {
	heading: "Our Approach",
	paragraphs: [
		"First paragraph of content. Describe your approach, philosophy, or whatever this section is about.",
		"Second paragraph with more detail. Keep it concise and human.",
	],
	list: [
		"First key point about your approach or offering",
		"Second key point that reinforces your value",
		"Third key point that builds trust",
	],
	cta: {
		text: "Learn more",
		href: "/about",
		variant: "secondary",
	},
	image: {
		src: "/assets/nurture.jpg",
		alt: "Descriptive alt text for the image",
		width: 400,
		height: 400,
	},
	imagePosition: "right", // "left" or "right"
};

export default function Home() {
	return (
		<main id="main-content" className="home__page">
			<Hero heroConfig={heroConfig} />
			<CardGrid cardGridConfig={cardGridConfig} />
			<TwoColumn twoColumnConfig={twoColumnConfig} />
			<Steps />
			<BookingCTA />
		</main>
	);
}
