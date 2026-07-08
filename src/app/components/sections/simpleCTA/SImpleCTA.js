import Button from "../../ui/Button";
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./simplecta.scss";

export default function SimpleCTA({ simpleCtaConfig }) {
	const { id = "simple-cta", classNames = "", text, cta } = simpleCtaConfig;

	return (
		<section className={`block simple-cta ${classNames}`.trim()} id={id}>
			<div className="block__content container">
				<FadeUp as="div" className="simple-cta__inner">
					{text && <p className="simple-cta__text">{text}</p>}
					<Button
						text={cta.text}
						href={cta.href}
						variant={cta.variant || "primary"}
						external={cta.external}
					/>
				</FadeUp>
			</div>
		</section>
	);
}
