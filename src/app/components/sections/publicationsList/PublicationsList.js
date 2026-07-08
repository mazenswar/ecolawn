import FadeUp from "../../ui/fadeUp/FadeUp";
import "./publicationslist.scss";

export default function PublicationsList({ publicationsListConfig }) {
	const { id, classNames = "", heading, publications } = publicationsListConfig;

	return (
		<section
			className={`block publications-list ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp
					as="h2"
					id={`${id}-heading`}
					className="publications-list__heading"
				>
					{heading}
				</FadeUp>

				<ol className="publications-list__list" role="list">
					{publications.map((pub, i) => (
						<li key={i} className="publications-list__item">
							<FadeUp as="div" delay={i * 60}>
								{pub.label && (
									<span className="publications-list__label">{pub.label}</span>
								)}
								<p className="publications-list__citation">
									{pub.citationParts.map((part, j) =>
										part.emphasis === "bold" ? (
											<strong key={j}>{part.text}</strong>
										) : part.emphasis === "italic" ? (
											<em key={j}>{part.text}</em>
										) : (
											<span key={j}>{part.text}</span>
										),
									)}
								</p>
								{pub.href && (
									<a
										href={pub.href}
										target="_blank"
										rel="noopener noreferrer"
										className="publications-list__link"
										aria-label={`Read full publication: ${pub.ariaLabel} (opens in a new tab)`}
									>
										Read full publication
									</a>
								)}
							</FadeUp>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
