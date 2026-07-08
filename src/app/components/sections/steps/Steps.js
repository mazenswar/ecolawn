// /* =========================
//    STEPS CONFIGURATION
//    Edit this section per project
//    ========================= */

// const stepsConfig = {
// 	heading: "How It Works",
// 	subheading:
// 		"A simple, straightforward process from first contact to ongoing care.",
// 	steps: [
// 		{
// 			id: "step-1",
// 			title: "Step One Title",
// 			description:
// 				"Describe what happens in this step. Keep it clear and human.",
// 		},
// 		{
// 			id: "step-2",
// 			title: "Step Two Title",
// 			description: "Describe what happens in this step.",
// 		},
// 		{
// 			id: "step-3",
// 			title: "Step Three Title",
// 			description: "Describe what happens in this step.",
// 		},
// 		{
// 			id: "step-4",
// 			title: "Step Four Title",
// 			description: "Describe what happens in this step.",
// 		},
// 	],
// };

// components/sections/Steps/Steps.js
import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./steps.scss";

export default function Steps({ stepsConfig }) {
	const {
		heading,
		subheading,
		steps,
		classNames = "",
		cta = true,
	} = stepsConfig;

	return (
		<section
			id="steps"
			className={`block steps ${classNames}`}
			aria-labelledby="steps-heading"
		>
			<div className="block__content container">
				<FadeUp as="div" className="steps__header">
					<h2 id="steps-heading">{heading}</h2>
					{subheading && <p className="steps__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid as="ol" itemAs="li" className="steps__list" stagger={120}>
					{steps.map((step, index) => (
						<div key={step.id} className="steps__item">
							<div className="steps__number" aria-hidden="true">
								{index + 1}
							</div>
							<div className="steps__content">
								<h3 className="steps__title">{step.title}</h3>
								<p className="steps__description">{step.description}</p>
							</div>
						</div>
					))}

					{cta ? (
						<Button
							className="steps__cta"
							text="See our full process"
							href="/services/websites/process"
							variant="secondary"
						/>
					) : null}
				</StaggerGrid>
			</div>
		</section>
	);
}
/**
 * Unified Button component
 *
 * Props:
 * - text: string (required)
 * - href: string (required for link buttons)
 * - variant: "primary" | "secondary" | "ghost" (default: "primary")
 * - onClick: function (optional, for non-link buttons)
 * - external: boolean (opens in new tab, default: false)
 * - trackEvent: object (optional GTM dataLayer push before navigation)
 *     { event: "event_name", ...additionalData }
 * - disabled: boolean (default: false)
 * - className: string (optional additional classes)
 * - type: "button" | "submit" | "reset" (only used when no href)
 */
