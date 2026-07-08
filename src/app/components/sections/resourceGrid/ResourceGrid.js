import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./resourcegrid.scss";

export default function ResourceGrid({ resourceGridConfig }) {
	const {
		id = "resource-grid",
		classNames = "",
		heading,
		subheading,
		disclaimer,
		resources,
	} = resourceGridConfig;

	return (
		<section
			className={`block resource-grid ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="resource-grid__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="resource-grid__sub">{subheading}</p>}
				</FadeUp>

				<StaggerGrid
					as="ul"
					itemAs="li"
					className="resource-grid__grid"
					role="list"
					baseDelay={150}
					stagger={100}
				>
					{resources.map((resource) => (
						<ResourceCard key={resource.id} resource={resource} />
					))}
				</StaggerGrid>

				{disclaimer && (
					<FadeUp as="p" className="resource-grid__disclaimer" delay={300}>
						{disclaimer}
					</FadeUp>
				)}
			</div>
		</section>
	);
}

function ResourceCard({ resource }) {
	return (
		<div className="resource-card">
			<h3 className="resource-card__title">
				<a
					href={resource.href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${resource.title} (opens in a new tab)`}
					className="resource-card__link"
				>
					{resource.title}
				</a>
			</h3>
			<p className="resource-card__description">{resource.description}</p>
			<p
				className="resource-card__source"
				aria-label={`Source: ${resource.source}`}
			>
				{resource.source}
			</p>
		</div>
	);
}
