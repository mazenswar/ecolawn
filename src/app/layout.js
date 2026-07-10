// app/layout.js
import { generateMeta, generateJsonLd } from "../../config/metadata";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { ecoLawnHeading, ecoLawnBody } from "../../config/fonts";
import site from "../../config/site";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import "./styles/index.scss";

// Root metadata — applies to all pages unless overridden
export const metadata = generateMeta({
	title: "Lawn Care in North Texas",
	path: "/",
});

const fontClasses = `${ecoLawnHeading.variable} ${ecoLawnBody.variable}`;

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={fontClasses}>
			<body>
				{/* JSON-LD structured data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: generateJsonLd() }}
				/>

				{/* Skip navigation */}
				<a href="#main-content" className="skip-nav">
					Skip to main content
				</a>
				<Nav />

				{children}

				<Footer />
			</body>
			{/* Analytics — only renders if IDs are set */}

			{site.analytics?.gtm && <GoogleTagManager gtmId={site.analytics.gtm} />}
		</html>
	);
}
