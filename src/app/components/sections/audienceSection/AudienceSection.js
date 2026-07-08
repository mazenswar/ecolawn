import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./audiencesection.scss";

function IconCheck() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M4 12l6 6L20 6" />
		</svg>
	);
}

function AudienceItem({ item }) {
	return (
		<>
			<span className="audience__check" aria-hidden="true">
				<IconCheck />
			</span>
			<span>{item.text}</span>
		</>
	);
}

export default function AudienceSection({ audienceConfig }) {
	const {
		id = "audience",
		heading,
		body,
		variant = "split",
		items,
		cta,
		classNames = "",
	} = audienceConfig;

	return (
		<section
			id={id}
			className={`block audience audience--${variant} ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
		>
			<div className="block__content container">
				{/* Split variant — left and right animate in parallel */}
				{variant === "split" && (
					<div className="audience__split">
						<FadeUp as="div" className="audience__left" delay={0}>
							<h2 id={`${id}-heading`}>{heading}</h2>
							{body && <p className="audience__body">{body}</p>}
							{cta && (
								<div className="audience__cta">
									<Button
										text={cta.text}
										href={cta.href}
										variant={cta.variant ?? "primary"}
									/>
								</div>
							)}
						</FadeUp>
						<FadeUp as="div" className="audience__right" delay={50}>
							<StaggerGrid
								as="ul"
								itemAs="li"
								className="audience__list"
								role="list"
								baseDelay={150}
								stagger={80}
							>
								{items.map((item) => (
									<div key={item.id} className="audience__item">
										<AudienceItem item={item} />
									</div>
								))}
							</StaggerGrid>
						</FadeUp>
					</div>
				)}

				{/* Typographic variant — sequences top to bottom */}
				{variant === "typographic" && (
					<div className="audience__typographic">
						<FadeUp as="h2" id={`${id}-heading`} delay={0}>
							{heading}
						</FadeUp>
						{body && (
							<FadeUp as="p" className="audience__body" delay={100}>
								{body}
							</FadeUp>
						)}
						<StaggerGrid
							as="ul"
							itemAs="li"
							className="audience__list"
							role="list"
							baseDelay={200}
							stagger={80}
						>
							{items.map((item) => (
								<div key={item.id} className="audience__item">
									<AudienceItem item={item} />
								</div>
							))}
						</StaggerGrid>
						{cta && (
							<FadeUp
								as="div"
								className="audience__cta"
								delay={200 + items.length * 80}
							>
								<Button
									text={cta.text}
									href={cta.href}
									variant={cta.variant ?? "primary"}
								/>
							</FadeUp>
						)}
					</div>
				)}

				{/* Card variant — card fades as a unit, no internal stagger */}
				{variant === "card" && (
					<div className="audience__card-wrap">
						<FadeUp as="h2" id={`${id}-heading`} delay={0}>
							{heading}
						</FadeUp>
						{body && (
							<FadeUp as="p" className="audience__body" delay={100}>
								{body}
							</FadeUp>
						)}
						<FadeUp as="div" className="audience__card" delay={200}>
							<ul className="audience__list" role="list">
								{items.map((item) => (
									<li key={item.id} className="audience__item">
										<AudienceItem item={item} />
									</li>
								))}
							</ul>
						</FadeUp>
						{cta && (
							<FadeUp as="div" className="audience__cta" delay={300}>
								<Button
									text={cta.text}
									href={cta.href}
									variant={cta.variant ?? "primary"}
								/>
							</FadeUp>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
