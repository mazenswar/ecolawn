import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./addonsgrid.scss";

export default function AddonsGrid({ addonsConfig }) {
	const {
		id = "addons",
		eyebrow,
		heading,
		subheading,
		addons,
		classNames = "",
	} = addonsConfig;

	return (
		<section
			className={`block addons-grid ${classNames}`}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="addons-grid__header">
					{eyebrow && <p className="label addons-grid__eyebrow">{eyebrow}</p>}
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="addons-grid__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="addons-grid__grid"
					role="list"
					baseDelay={150}
					stagger={100}
				>
					{addons.map((addon) => (
						<div key={addon.id} className="addon-card">
							<div className="addon-card__top">
								<h3 className="addon-card__name">{addon.name}</h3>
								<p className="addon-card__description">{addon.description}</p>
							</div>
							<div className="addon-card__bottom">
								<span className="addon-card__price">{addon.price}</span>
								<span className="addon-card__compatibility">
									{addon.compatibility}
								</span>
							</div>
						</div>
					))}
				</StaggerGrid>
			</div>
		</section>
	);
}
