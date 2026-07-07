// components/sections/PageHero/PageHero.js
import Image from "next/image";
import "./pagehero.scss";

/* =========================
   PAGE HERO CONFIGURATION
   Edit this section per project
   ========================= */

// const defaultConfig = {
// 	eyebrow: null, // optional label above heading e.g. "Our Services"
// 	heading: "Page Title",
// 	subheading:
// 		"A brief description of what this page covers. Keep it clear and welcoming.",
// 	image: null,
// 	// Optional image example:
// 	// image: {
// 	// 	src: "/page-hero.webp",
// 	// 	alt: "Descriptive alt text",
// 	// 	width: 600,
// 	// 	height: 400,
// 	// },
// 	align: "left", // "left" or "center"
// };

/* =========================
   COMPONENT
   ========================= */

export default function PageHero({ pageHeroConfig }) {
	const centered = pageHeroConfig.align === "center";

	return (
		<section
			className={`block page-hero ${centered ? "page-hero--centered" : ""}`}
			aria-labelledby="page-hero-heading"
		>
			<div className="block__content container">
				<div
					className={`page-hero__layout ${pageHeroConfig.image ? "has-image" : ""} ${pageHeroConfig.illustration ? "has-illustration" : ""}`}
				>
					{/* Copy */}
					<div className="page-hero__copy">
						{pageHeroConfig.eyebrow && (
							<p className="page-hero__eyebrow label">
								{pageHeroConfig.eyebrow}
							</p>
						)}
						<h1 id="page-hero-heading">{pageHeroConfig.heading}</h1>
						{pageHeroConfig.subheading && (
							<p className="lead">{pageHeroConfig.subheading}</p>
						)}
					</div>

					{/* Optional image */}
					{pageHeroConfig.image && (
						<figure className="page-hero__media">
							<Image
								src={pageHeroConfig.image.src}
								alt={pageHeroConfig.image.alt}
								width={pageHeroConfig.image.width}
								height={pageHeroConfig.image.height}
								priority
								sizes="(max-width: 768px) 90vw, 420px"
								style={{ width: "100%", height: "auto" }}
							/>
						</figure>
					)}
					{/* optional illustration */}

					{pageHeroConfig.illustration && !pageHeroConfig.image && (
						<figure className="page-hero__media" aria-hidden="true">
							{pageHeroConfig.illustration}
						</figure>
					)}
				</div>
			</div>
		</section>
	);
}
