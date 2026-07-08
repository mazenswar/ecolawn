import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./ctabanner.scss";

/* =========================
   CTA BANNER CONFIGURATION
   Edit this section per project
   ========================= */

// const ctaBannerConfig = {
// 	heading: "Ready to get started?",
// 	subheading:
// 		"Let us build something great together. Reach out today and we will get back to you within one business day.",
// 	variant: "brand", // "brand" | "dark" | "light"
// 	cta: {
// 		text: "Get in touch",
// 		href: "https://zencare.co/provider/therapist/tanya-singh",
// 		variant: "secondary",
// 		external: true,
// 	},
// 	secondaryCta: null,
// 	// Optional second button example:
// 	// secondaryCta: {
// 	// 	text: "Learn more",
// 	// 	href: "/services",
// 	// 	variant: "ghost",
// 	// },
// };
// components/sections/CTABanner/CTABanner.js

export default function CTABanner({ ctaBannerConfig }) {
	const {
		heading,
		subheading,
		variant = "brand",
		cta,
		secondaryCta,
		classNames = "",
	} = ctaBannerConfig;

	return (
		<section
			className={`block cta-banner cta-banner--${variant} ${classNames}`}
			aria-labelledby="cta-banner-heading"
		>
			<div className="block__content container">
				<div className="cta-banner__inner">
					<FadeUp as="div" className="cta-banner__copy" delay={0}>
						<h2 id="cta-banner-heading">{heading}</h2>
						{subheading && <p className="cta-banner__sub">{subheading}</p>}
					</FadeUp>
					<FadeUp as="div" className="cta-banner__actions" delay={150}>
						<Button
							text={cta.text}
							href={cta.href}
							variant={cta.variant ?? "primary"}
							external={cta.external ?? false}
							trackEvent={cta.trackEvent}
						/>
						{secondaryCta && (
							<Button
								text={secondaryCta.text}
								href={secondaryCta.href}
								variant={secondaryCta.variant ?? "ghost"}
							/>
						)}
					</FadeUp>
				</div>
			</div>
		</section>
	);
}
