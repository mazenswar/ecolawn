import FadeUp from "../../ui/fadeUp/FadeUp";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import "./splitlist.scss";

function IconCheck() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M4 12l6 6L20 6" />
		</svg>
	);
}

function IconNeutral() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="12" cy="12" r="8" />
		</svg>
	);
}

function SplitColumn({ column }) {
	const isPositive = column.variant === "positive";

	return (
		<div className={`split-list__column split-list__column--${column.variant}`}>
			<div className="split-list__column-header">
				<h3 className="split-list__column-title">{column.title}</h3>
			</div>

			<StaggerGrid
				as="ul"
				itemAs="li"
				className="split-list__items"
				role="list"
				baseDelay={150}
				stagger={80}
			>
				{column.items.map((item, i) => (
					<div key={i} className="split-list__item">
						<span className="split-list__icon" aria-hidden="true">
							{isPositive ? <IconCheck /> : <IconNeutral />}
						</span>
						<span>{item}</span>
					</div>
				))}
			</StaggerGrid>

			{column.note && (
				<p className="split-list__note" role="note">
					{column.note}{" "}
					{column.noteLink && (
						<a href={column.noteLink.href} className="split-list__note-link">
							{column.noteLink.text}
						</a>
					)}
				</p>
			)}
		</div>
	);
}

export default function SplitList({ splitListConfig }) {
	const {
		id = "split-list",
		classNames = "",
		heading,
		subheading,
		columns,
	} = splitListConfig;

	return (
		<section
			className={`block split-list ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
			id={id}
		>
			<div className="block__content container">
				<FadeUp as="div" className="split-list__header">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="split-list__sub">{subheading}</p>}
				</FadeUp>

				<div className="split-list__grid">
					{columns.map((column) => (
						<FadeUp key={column.id} as="div" delay={100}>
							<SplitColumn column={column} />
						</FadeUp>
					))}
				</div>
			</div>
		</section>
	);
}
