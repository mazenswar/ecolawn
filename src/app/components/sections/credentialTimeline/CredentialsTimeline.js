import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./credentialtimeline.scss";

export default function CredentialTimeline({ credentialTimelineConfig }) {
	const {
		id,
		classNames = "",
		heading,
		intro,
		groups,
	} = credentialTimelineConfig;

	return (
		<section
			className={`block credential-timeline ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="credential-timeline__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{intro && <p className="credential-timeline__intro">{intro}</p>}
				</FadeUp>

				<StaggerGrid
					as="div"
					itemAs="div"
					className="credential-timeline__grid"
					baseDelay={100}
					stagger={100}
				>
					{groups.map((group) => (
						<div key={group.id} className="credential-timeline__card">
							<h3 className="credential-timeline__card-heading">
								{group.title}
							</h3>

							{group.dated ? (
								<ol className="credential-timeline__list" role="list">
									{group.items.map((item, i) => (
										<li key={i} className="credential-timeline__item">
											<p className="credential-timeline__dates">
												{item.dateRange}
											</p>
											<h4 className="credential-timeline__role">{item.role}</h4>
											<p className="credential-timeline__institution">
												{item.institution}
											</p>
										</li>
									))}
								</ol>
							) : (
								<ul className="credential-timeline__simple-list" role="list">
									{group.items.map((item, i) => (
										<li key={i} className="credential-timeline__simple-item">
											{item}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</StaggerGrid>
			</div>
		</section>
	);
}
