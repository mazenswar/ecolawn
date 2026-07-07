"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main id="main-content" className="error__page">
			<section className="block blockTint" aria-labelledby="error-heading">
				<div className="block__content container">
					<div className="error__inner">
						<p className="label">Something went wrong</p>
						<h1 id="error-heading">An unexpected error occurred</h1>
						<p className="lead">
							We are sorry about that. You can try again or go back to the home
							page.
						</p>
						<div className="row">
							<button type="button" className="btnPrimary" onClick={reset}>
								Try again
							</button>
							<Link href="/" className="btnSecondary">
								Go back home
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
