import Link from "next/link";
import StaggerGrid from "../../ui/staggerGrid/StaggerGrid";
import Image from "next/image";
import "./eventgrid.scss";

export default function EventGrid({ eventGridConfig }) {
	const { id = "event-grid", classNames = "", events } = eventGridConfig;

	return (
		<section className={`block event-grid ${classNames}`.trim()} id={id}>
			<div className="block__content container">
				<StaggerGrid
					as="ul"
					itemAs="li"
					className="event-grid__list"
					role="list"
					baseDelay={100}
					stagger={100}
				>
					{events.map((event) => (
						<Link
							key={event.id}
							href={event.href}
							className="event-card"
							aria-label={`${event.name}, ${event.status === "upcoming" ? "upcoming" : "past"} event, view details`}
						>
							<div className="event-card__top">
								<h2 className="event-card__name">{event.name}</h2>
								<span
									className={`event-card__badge event-card__badge--${event.status}`}
								>
									{event.status === "upcoming" ? "Upcoming" : "Past"}
								</span>
							</div>

							<div className="event-card__detail">
								<span className="event-card__icon" aria-hidden="true">
									📍
								</span>
								<span>{event.location}</span>
							</div>

							<div className="event-card__detail">
								<span className="event-card__icon" aria-hidden="true">
									📅
								</span>
								<span>{event.date}</span>
							</div>

							<div className="event-card__detail">
								<span className="event-card__icon" aria-hidden="true">
									🕐
								</span>
								<span>{event.time}</span>
							</div>

							{event.logo && (
								<div className="event-card__logo">
									<Image
										src={event.logo.src}
										alt={event.logo.alt}
										width={400}
										height={200}
									/>
								</div>
							)}
						</Link>
					))}
				</StaggerGrid>
			</div>
		</section>
	);
}
