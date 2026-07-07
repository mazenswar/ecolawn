"use client";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import Button from "../../ui/Button";
import "./ongoingsupport.scss";

export default function OngoingSupport({ ongoingSupportConfig }) {
	const {
		id = "ongoing-support",
		eyebrow,
		heading,
		subheading,
		items,
		cta,
		classNames = "",
	} = ongoingSupportConfig;

	return (
		<section
			className={`block ongoing-support ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="ongoing-support__card">
					<div className="ongoing-support__header">
						{eyebrow && (
							<p className="label ongoing-support__eyebrow">{eyebrow}</p>
						)}
						<h2 id={`${id}-heading`}>{heading}</h2>
						{subheading && <p className="ongoing-support__sub">{subheading}</p>}
					</div>

					<StaggerGrid
						as="ul"
						itemAs="li"
						className="ongoing-support__list"
						role="list"
						baseDelay={150}
						stagger={80}
					>
						{items.map((item) => (
							<div key={item.id} className="ongoing-support__item">
								<span className="ongoing-support__check" aria-hidden="true">
									<IconCheck />
								</span>
								<span>{item.text}</span>
							</div>
						))}
					</StaggerGrid>

					{cta && (
						<FadeUp as="div" className="ongoing-support__cta" delay={500}>
							<Button
								text={cta.text}
								href={cta.href}
								variant={cta.variant ?? "primary"}
								external={cta.external ?? false}
							/>
						</FadeUp>
					)}
				</FadeUp>
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
