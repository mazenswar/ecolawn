// components/sections/FeatureGrid/FeatureGrid.js
import Button from "../../ui/Button";
import { FeatureIcon } from "./FeatureGridIcons";
import "./featuregrid.scss";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import FadeUp from "../../ui/fadeUp/FadeUp";

// variants
// accent
// icon
// card

export default function FeatureGrid({ featureGridConfig }) {
	const {
		heading,
		subheading,
		variant = "accent",
		cta,
		features,
		id = "feature-grid",
		classNames = "",
	} = featureGridConfig;

	return (
		<section
			className={`block feature-grid feature-grid--${variant} ${classNames}`}
			aria-labelledby={`${id}-heading`}
		>
			<div className="block__content container">
				<FadeUp as="div" className="feature-grid__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="feature-grid__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="feature-grid__list"
					role="list"
					stagger={100}
				>
					{features.map((feature) => (
						<div key={feature.id} className="feature-grid__item">
							{variant === "accent" && (
								<div className="feature-grid__accent" aria-hidden="true" />
							)}
							<div className="feature-grid__content">
								{feature.icon && (
									<div className="feature-grid__icon" aria-hidden="true">
										<FeatureIcon name={feature.icon} />
									</div>
								)}
								<h3 className="feature-grid__title">{feature.title}</h3>
								<p className="feature-grid__description">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</StaggerGrid>

				{cta && (
					<FadeUp
						as="div"
						className="feature-grid__footer"
						delay={features.length * 100}
					>
						<Button
							text={cta.text}
							href={cta.href}
							variant={cta.variant ?? "secondary"}
						/>
					</FadeUp>
				)}
			</div>
		</section>
	);
}
