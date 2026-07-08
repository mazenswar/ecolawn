"use client";

import { useEffect } from "react";

let mailerLiteScriptLoaded = false;

export default function MailerLiteForm() {
	useEffect(() => {
		window.ml =
			window.ml ||
			function () {
				(window.ml.q = window.ml.q || []).push(arguments);
			};
		window.ml("account", "2048836");

		if (mailerLiteScriptLoaded) return;

		const script = document.createElement("script");
		script.src = "https://assets.mailerlite.com/js/universal.js";
		script.async = true;
		document.body.appendChild(script);
		mailerLiteScriptLoaded = true;
	}, []);

	return (
		<div
			role="region"
			aria-labelledby="mailerlite-form-label"
			className="mailerlite-wrap"
		>
			<p id="mailerlite-form-label" className="sr-only">
				Waitlist signup form
			</p>
			<div className="ml-embedded" data-form="ABTOcN" />
		</div>
	);
}
