"use client";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import Button from "../../ui/Button";
import "./pricingcards.scss";

export default function PricingCards({ pricingConfig }) {
	const {
		eyebrow,
		heading,
		subheading,
		packages,
		cta,
		id = "packages",
	} = pricingConfig;

	return (
		<section
			className="block pricing-cards"
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="pricing-cards__header">
					{eyebrow && <p className="label pricing-cards__eyebrow">{eyebrow}</p>}
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="pricing-cards__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="pricing-cards__grid"
					role="list"
					baseDelay={150}
					stagger={120}
				>
					{packages.map((pkg) => (
						<div key={pkg.id} className="pricing-card">
							<div className="pricing-card__top">
								<h3 className="pricing-card__name">{pkg.name}</h3>
								<p className="pricing-card__description">{pkg.description}</p>
							</div>

							<div className="pricing-card__pricing">
								<span className="pricing-card__price">{pkg.price}</span>
								<span className="pricing-card__structure">
									{pkg.paymentStructure}
								</span>
							</div>

							<p className="pricing-card__delivery">
								<span className="pricing-card__delivery-label">Delivery: </span>
								{pkg.delivery}
							</p>

							<ul className="pricing-card__inclusions" role="list">
								{pkg.inclusions.map((item, i) => (
									<li key={i} className="pricing-card__inclusion">
										<span className="pricing-card__check" aria-hidden="true">
											<IconCheck />
										</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</StaggerGrid>

				{cta && (
					<FadeUp as="div" className="pricing-cards__cta" delay={400}>
						<Button
							text={cta.text}
							href={cta.href}
							variant={cta.variant ?? "primary"}
							external={cta.external ?? false}
						/>
					</FadeUp>
				)}
			</div>
		</section>
	);
}

function IconCheck() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M4 12l6 6L20 6" />
		</svg>
	);
}
