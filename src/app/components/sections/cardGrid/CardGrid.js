import Link from "next/link";
import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./cardgrid.scss";

export default function CardGrid({ cardGridConfig }) {
	const {
		heading,
		subheading,
		cards,
		cta,
		id = "card-grid",
		classNames = "",
	} = cardGridConfig;

	return (
		<section
			id={id}
			className={`block card-grid ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
		>
			<div className="block__content container">
				<FadeUp as="div" className="card-grid__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="card-grid__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="card-grid__grid"
					role="list"
					baseDelay={150}
					stagger={100}
				>
					{cards.map((card) => (
						<Link key={card.id ?? card.href} href={card.href} className="card">
							<div className="card__inner">
								{card.icon && (
									<div className="card__icon-wrap" aria-hidden="true">
										<card.icon className="card__icon" />
									</div>
								)}
								<h3 className="card__title">{card.title}</h3>
								<p className="card__description">{card.description}</p>
								{card.cta && (
									<span className="card__cta" aria-hidden="true">
										{card.cta} →
									</span>
								)}
							</div>
						</Link>
					))}
				</StaggerGrid>

				{cta && (
					<FadeUp as="div" className="card-grid__footer" delay={400}>
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
