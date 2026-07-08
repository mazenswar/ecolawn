"use client";
import { useState } from "react";
import FadeUp from "../../ui/fadeUp/FadeUp";
import "./servicearea.scss";

export default function ServiceArea({ serviceAreaConfig }) {
	const {
		id = "service-area",
		heading,
		subheading,
		towns,
		zips,
		nearbyPrefixes = [],
		successMessage,
		nearbyMessage,
		outsideMessage,
		classNames = "",
	} = serviceAreaConfig;

	const [zip, setZip] = useState("");
	const [result, setResult] = useState(null); // null | "in" | "nearby" | "out" | "invalid"

	function handleSubmit(e) {
		e.preventDefault();
		const trimmed = zip.trim();

		if (!/^\d{5}$/.test(trimmed)) {
			setResult("invalid");
			return;
		}

		if (zips.includes(trimmed)) {
			setResult("in");
			return;
		}

		if (nearbyPrefixes.includes(trimmed.slice(0, 3))) {
			setResult("nearby");
			return;
		}

		setResult("out");
	}

	return (
		<section
			id={id}
			className={`block service-area ${classNames}`.trim()}
			aria-labelledby={`${id}-heading`}
		>
			<div className="block__content container">
				<FadeUp as="div" className="service-area__card">
					<h2 id={`${id}-heading`}>{heading}</h2>
					{subheading && <p className="service-area__sub">{subheading}</p>}

					<form onSubmit={handleSubmit} className="service-area__form">
						<label htmlFor="service-area-zip" className="sr-only">
							Enter your zip code
						</label>
						<input
							id="service-area-zip"
							name="zip"
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							maxLength={5}
							placeholder="Enter your zip code"
							value={zip}
							onChange={(e) => {
								setZip(e.target.value.replace(/[^\d]/g, ""));
								setResult(null);
							}}
						/>
						<button type="submit" className="btnPrimary">
							Check my zip code
						</button>
					</form>

					{result && (
						<p
							className={`service-area__result service-area__result--${result}`}
							role="status"
						>
							{result === "invalid" && "Please enter a valid 5-digit zip code."}
							{result === "in" && successMessage}
							{result === "nearby" && nearbyMessage}
							{result === "out" && outsideMessage}
						</p>
					)}

					<p className="service-area__towns">
						Serving {towns.slice(0, -1).join(", ")} &amp;{" "}
						{towns[towns.length - 1]}, TX.
					</p>
				</FadeUp>
			</div>
		</section>
	);
}
