// components/sections/StatGrid/StatGrid.js
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./statgrid.scss";

export default function StatGrid({ statGridConfig }) {
	const {
		id = "stat-grid",
		heading,
		subheading,
		stats,
		footnote,
		classNames = "",
	} = statGridConfig;

	return (
		<section
			className={`block stat-grid ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				{(heading || subheading) && (
					<FadeUp as="div" className="stat-grid__header">
						{heading && <h2 id={`${id}-heading`}>{heading}</h2>}
						{subheading && <p className="stat-grid__sub">{subheading}</p>}
					</FadeUp>
				)}

				<StaggerGrid
					as="div"
					itemAs="div"
					className="stat-grid__grid"
					baseDelay={100}
					stagger={100}
				>
					{stats.map((stat) => (
						<div
							key={stat.id}
							className="stat-grid__card"
							aria-label={`${stat.label}: from ${stat.before} to ${stat.after}`}
						>
							<p className="stat-grid__label" aria-hidden="true">
								{stat.label}
							</p>
							<div className="stat-grid__delta" aria-hidden="true">
								<span className="stat-grid__before">{stat.before}</span>
								<svg
									className="stat-grid__arrow"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
									focusable="false"
								>
									<path d="M5 12h14" />
									<path d="M13 6l6 6-6 6" />
								</svg>
								<span className="stat-grid__after">{stat.after}</span>
							</div>
							{stat.note && (
								<p className="stat-grid__note" aria-hidden="true">
									{stat.note}
								</p>
							)}
						</div>
					))}
				</StaggerGrid>

				{footnote && <p className="stat-grid__footnote">{footnote}</p>}
			</div>
		</section>
	);
}
