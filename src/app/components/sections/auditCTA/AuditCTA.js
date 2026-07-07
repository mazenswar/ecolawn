"use client";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import Button from "../../ui/Button";
import "./auditcta.scss";

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

export default function AuditCTA({ auditCtaConfig }) {
	const {
		id = "audit-cta",
		eyebrow,
		heading,
		body,
		items,
		card,
		classNames = "",
	} = auditCtaConfig;

	return (
		<section
			className={`block audit-cta ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<div className="audit-cta__layout">
					<FadeUp as="div" className="audit-cta__copy" delay={0}>
						{eyebrow && <p className="label audit-cta__eyebrow">{eyebrow}</p>}
						<h2 id={`${id}-heading`}>{heading}</h2>
						{body && <p className="audit-cta__body">{body}</p>}
						{items?.length > 0 && (
							<StaggerGrid
								as="ul"
								itemAs="li"
								className="audit-cta__list"
								role="list"
								baseDelay={200}
								stagger={80}
							>
								{items.map((item) => (
									<div key={item.id} className="audit-cta__item">
										<span className="audit-cta__check" aria-hidden="true">
											<IconCheck />
										</span>
										<span>{item.text}</span>
									</div>
								))}
							</StaggerGrid>
						)}
					</FadeUp>

					<FadeUp as="div" className="audit-cta__card-wrap" delay={150}>
						<div className="audit-cta__card">
							<div className="audit-cta__card-top">
								<p className="audit-cta__card-label">{card.label}</p>
								<p className="audit-cta__card-price">{card.price}</p>
								<p className="audit-cta__card-description">
									{card.description}
								</p>
							</div>
							<div className="audit-cta__card-bottom">
								<Button
									text={card.cta.text}
									href={card.cta.href}
									variant={card.cta.variant ?? "primary"}
									external={card.cta.external ?? false}
								/>
							</div>
						</div>
					</FadeUp>
				</div>
			</div>
		</section>
	);
}
