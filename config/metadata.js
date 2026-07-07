// config/metadata.js
import site from "./site";

/**
 * Generates merged metadata for any page.
 * Pass page-specific overrides and they merge with site defaults.
 *
 * Usage in any page.js:
 *
 * import { generateMeta } from "@/config/metadata";
 * export const metadata = generateMeta({
 *   title: "About Us",
 *   description: "Learn about our story and approach.",
 *   path: "/about",
 * });
 */

export function generateMeta({
	title,
	description,
	path = "",
	image,
	noIndex = false,
} = {}) {
	const pageTitle = title ? `${title} | ${site.name}` : site.name;
	const pageDescription = description || site.description;
	const pageUrl = `${site.url}${path}`;
	const ogImage =
		image ||
		`${site.url}/api/og?title=${encodeURIComponent(title || site.name)}`;

	return {
		title: pageTitle,
		description: pageDescription,
		metadataBase: new URL(site.url),

		alternates: {
			canonical: pageUrl,
		},

		robots: noIndex
			? { index: false, follow: false }
			: { index: true, follow: true },

		openGraph: {
			title: pageTitle,
			description: pageDescription,
			url: pageUrl,
			siteName: site.name,
			locale: site.locale,
			type: "website",
			images: [
				{
					url: ogImage,
					width: site.og.width,
					height: site.og.height,
					alt: pageTitle,
				},
			],
		},

		twitter: {
			card: "summary_large_image",
			title: pageTitle,
			description: pageDescription,
			images: [ogImage],
			...(site.social.twitter && { creator: site.social.twitter }),
		},
	};
}

/**
 * Generates JSON-LD structured data for the business.
 * Add this to your root layout or home page.
 *
 * Usage:
 * import { generateJsonLd } from "@/config/metadata";
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateJsonLd() }} />
 */

export function generateJsonLd(overrides = {}) {
	const base = {
		"@context": "https://schema.org",
		"@type": site.businessType,
		name: site.name,
		description: site.description,
		url: site.url,
		logo: `${site.url}${site.logo.src}`,
		...(site.email && { email: site.email }),
		...(site.phone && { telephone: site.phone }),
		...(site.address && {
			address: {
				"@type": "PostalAddress",
				streetAddress: site.address.street,
				addressLocality: site.address.city,
				addressRegion: site.address.state,
				postalCode: site.address.zip,
				addressCountry: site.address.country,
			},
		}),
		...(site.priceRange && { priceRange: site.priceRange }),
		...(site.hours && {
			openingHoursSpecification: site.hours.map((h) => ({
				"@type": "OpeningHoursSpecification",
				dayOfWeek: h.days,
				opens: h.open,
				closes: h.close,
			})),
		}),
		...(site.social.instagram && {
			sameAs: [
				site.social.instagram &&
					`https://instagram.com/${site.social.instagram}`,
				site.social.linkedin &&
					`https://linkedin.com/company/${site.social.linkedin}`,
				site.social.twitter && `https://twitter.com/${site.social.twitter}`,
			].filter(Boolean),
		}),
	};

	return JSON.stringify({ ...base, ...overrides }, null, 2);
}
