import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./ratecards.scss";

export default function RateCards({ rateCardsConfig }) {
	const {
		id = "rate-cards",
		classNames = "",
		heading,
		intro,
		rates,
		footnote,
	} = rateCardsConfig;

	return (
		<section
			className={`block rate-cards ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="rate-cards__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{intro && <p className="rate-cards__intro">{intro}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="rate-cards__grid"
					role="list"
					baseDelay={100}
					stagger={100}
				>
					{rates.map((rate) => (
						<div key={rate.id} className="rate-card">
							<p className="rate-card__label">{rate.label}</p>
							<p className="rate-card__price">
								<span className="rate-card__price-symbol" aria-hidden="true">
									$
								</span>
								{rate.price}
							</p>
							{rate.note && <p className="rate-card__note">{rate.note}</p>}
						</div>
					))}
				</StaggerGrid>

				{footnote && <p className="rate-cards__footnote">{footnote}</p>}
			</div>
		</section>
	);
}
