// components/sections/CardGrid/CardGrid.js
import Link from "next/link";
import Button from "../../ui/Button";
import "./cardgrid.scss";

export default function CardGrid({ cardGridConfig }) {
	return (
		<section
			className="block blockTint card-grid"
			aria-labelledby="card-grid-heading"
		>
			<div className="block__content container">
				<div className="card-grid__header">
					<h2 id="card-grid-heading">{cardGridConfig.heading}</h2>
					{cardGridConfig.subheading && (
						<p className="card-grid__sub">{cardGridConfig.subheading}</p>
					)}
				</div>

				<div className="card-grid__grid">
					{cardGridConfig.cards.map((card) => (
						<Link key={card.href} href={card.href} className="card">
							<div className="card__inner">
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
				</div>

				{cardGridConfig.cta && (
					<div className="card-grid__footer">
						<Button
							text={cardGridConfig.cta.text}
							href={cardGridConfig.cta.href}
							variant={cardGridConfig.cta.variant ?? "secondary"}
						/>
					</div>
				)}
			</div>
		</section>
	);
}
