import Link from "next/link";
import site from "../../config/site";

export const metadata = {
	title: `Page Not Found | ${site.name}`,
	description: "The page you are looking for does not exist.",
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<main id="main-content" className="not-found__page">
			<section className="block blockTint">
				<div className="block__content container">
					<div className="not-found__inner">
						<p className="label">404</p>
						<h1>Page not found</h1>
						<p className="lead">
							The page you are looking for does not exist or may have moved.
						</p>
						<Link href="/" className="btnPrimary">
							Go back home
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
