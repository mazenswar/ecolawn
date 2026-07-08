import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import Button from "../../ui/Button";
import "./credentialssummary.scss";

export default function CredentialSummary({ credentialSummaryConfig }) {
	const {
		id = "credential-summary",
		classNames = "",
		heading,
		intro,
		groups,
		footer,
	} = credentialSummaryConfig;

	return (
		<section
			className={`block credential-summary ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="credential-summary__header">
					{heading && <h2 id={`${id}-heading`}>{heading}</h2>}
					{intro && <p className="credential-summary__intro">{intro}</p>}
				</FadeUp>

				<StaggerGrid
					as="div"
					itemAs="div"
					className="credential-summary__grid"
					baseDelay={100}
					stagger={100}
				>
					{groups.map((group) => (
						<div key={group.id} className="credential-summary__card">
							<h3 className="credential-summary__card-heading">
								{group.title}
							</h3>
							<ul className="credential-summary__list" role="list">
								{group.items.map((item, i) => (
									<li key={i} className="credential-summary__item">
										{item}
									</li>
								))}
							</ul>
						</div>
					))}
				</StaggerGrid>

				{footer && (
					<FadeUp as="div" className="credential-summary__footer" delay={200}>
						{footer.text && (
							<p className="credential-summary__footer-text">{footer.text}</p>
						)}
						{footer.cta && (
							<Button
								text={footer.cta.text}
								href={footer.cta.href}
								variant={footer.cta.variant || "secondary"}
							/>
						)}
					</FadeUp>
				)}
			</div>
		</section>
	);
}
