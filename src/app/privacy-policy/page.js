import React from "react";
import { generateMeta } from "../../../config/metadata";
import site from "../../../config/site";
import { formatPhone } from "../../../config/formatPhone";
import LegalContent from "../components/sections/legalContent/LegalContent";

const phone = formatPhone(site.phone);

export const metadata = generateMeta({
	title: "Privacy Policy",
	description:
		"How EcoLawn Solutions collects, uses, and protects the information you share through our quote request form.",
	path: "/privacy-policy",
});

const privacyConfig = {
	id: "privacy-policy",
	heading: "Privacy Policy",
	lastUpdated: "July 2026",
	intro:
		"EcoLawn Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This page explains what information we collect through this website and how we use it.",
	sections: [
		{
			id: "information-we-collect",
			heading: "Information We Collect",
			paragraphs: [
				"When you submit a quote request through our contact form, we collect:",
			],
			list: [
				"Your name",
				"Email address",
				"Phone number",
				"Service address",
				"The service you're interested in",
				"Any additional details you share in the message field",
			],
		},
		{
			id: "analytics",
			heading: "Analytics",
			paragraphs: [
				"This site uses Google Analytics to help us understand how visitors use our website, such as which pages are viewed and how visitors found us. Google Analytics collects information through cookies, including your IP address and general browsing behavior on this site. This data is aggregated and does not identify you personally. You can learn more about how Google handles this data at <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Google's Privacy Policy</a>.",
			],
		},
		{
			id: "how-we-use-your-information",
			heading: "How We Use Your Information",
			paragraphs: [
				"We use the information you provide to respond to your request, provide a quote, and follow up about our services. We do not sell, rent, or share this information with third parties for marketing purposes.",
				"Specifically, we use the information you provide to:",
			],
			list: [
				"Respond to quote requests",
				"Schedule and provide lawn care services",
				"Improve our website based on how visitors use it",
			],
		},
		{
			id: "data-retention",
			heading: "Data Retention",
			paragraphs: [
				`We retain contact form submissions for as long as needed to respond to your request and provide service. If you'd like your information removed from our records, contact us at ${phone} and we'll take care of it.`,
			],
		},
		{
			id: "your-choices",
			heading: "Your Choices",
			paragraphs: [
				"You can disable cookies in your browser settings if you'd prefer not to be tracked by Google Analytics. This won't affect your ability to use the site or submit a quote request.",
			],
		},
		{
			id: "contact-us",
			heading: "Contact Us",
			paragraphs: [
				"If you have any questions about this privacy policy or how your information is handled, contact us at:",
				`EcoLawn Solutions<br />${phone}`,
			],
		},
	],
};

export default function PrivacyPolicyPage() {
	return <LegalContent legalContentConfig={privacyConfig} />;
}
