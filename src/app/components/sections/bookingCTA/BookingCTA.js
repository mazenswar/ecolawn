// components/sections/BookingCTA/BookingCTA.js
"use client";
import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./bookingcta.scss";

/* =========================
   BOOKING CTA CONFIGURATION EXAMPLE
   Edit this section per project
   ========================= */

// const bookingConfig = {
// 	heading: "Ready to take the first step?",
// 	subheading:
// 		"Reaching out is often the hardest part. We offer a free 15 minute consultation so you can get a sense of how we work and whether it feels like a good fit. No commitment required.",
// 	steps: [
// 		{
// 			number: "01",
// 			text: "Click the button below to access our scheduling portal",
// 		},
// 		{
// 			number: "02",
// 			text: "Choose a time that works for you",
// 		},
// 		{
// 			number: "03",
// 			text: "We will confirm your consultation and send you everything you need",
// 		},
// 	],
// 	cta: {
// 		text: "Schedule a free consultation",
// 		href: "https://your-ehr-booking-link.com",
// 		variant: "primary",
// 		external: true,
// 		trackEvent: null,
// 	},
// 	note: "By clicking the button above you will be taken to our secure scheduling portal.",
// };

export default function BookingCTA({ bookingConfig }) {
	const { heading, subheading, steps, cta, note } = bookingConfig;

	return (
		<section className="block booking-cta" aria-labelledby="booking-heading">
			<div className="block__content container">
				<div className="booking-cta__layout">
					{/* Left: heading, subheading, steps */}
					<FadeUp as="div" className="booking-cta__intro" delay={0}>
						<h2 id="booking-heading">{heading}</h2>
						<p className="booking-cta__sub">{subheading}</p>

						{steps?.length > 0 && (
							<StaggerGrid
								as="ol"
								itemAs="li"
								className="booking-cta__steps"
								baseDelay={150}
								stagger={100}
							>
								{steps.map((step) => (
									<div key={step.number} className="booking-cta__step">
										<span
											className="booking-cta__step-number"
											aria-hidden="true"
										>
											{step.number}
										</span>
										<span className="booking-cta__step-text">{step.text}</span>
									</div>
								))}
							</StaggerGrid>
						)}
					</FadeUp>

					{/* Right: CTA card */}
					<FadeUp as="div" className="booking-cta__card" delay={100}>
						<div className="booking-cta__card-inner">
							<p className="booking-cta__card-label">
								Free 30 minute consultation
							</p>
							<Button
								text={cta.text}
								href={cta.href}
								variant={cta.variant ?? "primary"}
								external={cta.external ?? true}
								trackEvent={cta.trackEvent}
							/>
							{note && <p className="booking-cta__note">{note}</p>}
						</div>
					</FadeUp>
				</div>
			</div>
		</section>
	);
}
