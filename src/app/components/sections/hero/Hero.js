// components/sections/Hero/Hero.js
import Image from "next/image";
import Button from "../../ui/Button";
import "./hero.scss";
import FadeUp from "../../ui/fadeUp/FadeUp";

/* =========================
   HERO CONFIGURATION EXAMPLE
   ========================= */

// const heroConfig = {
// 	eyebrow: "Optional label above heading", // or null
// 	heading: "Main heading",
// 	subheading: "Supporting text",
// 	cta: { text, href, variant },
// 	ctaSecondary: { text, href, variant }, // or null
// 	images: {
// 		landscape: { src, alt: "" }, // background image, decorative
// 	},
// };

/* =========================
   COMPONENT — Background Hero
   Full-width background image with text overlay.
   ========================= */

export default function Hero({ heroConfig }) {
	const img = heroConfig.images?.landscape || heroConfig.images?.background;

	return (
		<section
			className={`hero hero--background ${img ? "" : "hero--no-image"}`.trim()}
			aria-labelledby="hero-heading"
		>
			{img && (
				<div className="hero__bg-image">
					<Image
						src={img.src}
						alt=""
						fill
						priority
						sizes="100vw"
						style={{ objectFit: "cover", objectPosition: "center" }}
					/>
				</div>
			)}
			{img && <div className="hero__bg-overlay" aria-hidden="true" />}
			<div className="container hero__bg-content">
				<div className="hero__copy hero__copy--light">
					<HeroCopy config={heroConfig} />
				</div>
			</div>
		</section>
	);
}

/* ── Shared sub-components ──────────────────────────────────── */

// HeroCopy renders the heading, eyebrow, subheading, and CTA buttons.
// The h1 carries id="hero-heading" so the section can reference it
// via aria-labelledby="hero-heading".

function HeroCopy({ config }) {
	return (
		<>
			{config.eyebrow && (
				<FadeUp as="p" delay={0} className="hero__eyebrow label">
					{config.eyebrow}
				</FadeUp>
			)}

			<FadeUp
				as="h1"
				delay={config.eyebrow ? 100 : 0}
				className="hero__heading"
				id="hero-heading"
			>
				{config.heading}
			</FadeUp>

			{config.subheading && (
				<FadeUp
					as="p"
					delay={config.eyebrow ? 200 : 100}
					className="hero__subheading lead"
				>
					{config.subheading}
				</FadeUp>
			)}

			{config.cta && (
				<FadeUp
					as="div"
					delay={config.eyebrow ? 300 : 200}
					className="hero__actions"
				>
					<Button
						text={config.cta.text}
						href={config.cta.href}
						variant={config.cta.variant ?? "primary"}
						external={config.cta.external ?? false}
					/>
					{config.ctaSecondary && (
						<Button
							text={config.ctaSecondary.text}
							href={config.ctaSecondary.href}
							variant={config.ctaSecondary.variant ?? "secondary"}
							external={config.ctaSecondary.external ?? false}
						/>
					)}
				</FadeUp>
			)}
		</>
	);
}
