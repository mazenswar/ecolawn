// app/layout.js
import { generateMeta, generateJsonLd } from "../../config/metadata";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import {
	warmBody,
	warmHeading,
	cleanBody,
	cleanHeading,
	boldBody,
	boldHeading,
	earthBody,
	earthHeading,
	minimalBody,
	minimalHeading,
} from "../../config/fonts";
import site from "../../config/site";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import "./styles/index.scss";
import DesignPanel from "./components/ui/designPanel/DesignPanel";

// Root metadata — applies to all pages unless overridden
export const metadata = generateMeta({
	path: "/",
});

// Load fonts for the active theme

const fontClasses = [
	warmBody.variable,
	warmHeading.variable,
	cleanBody.variable,
	cleanHeading.variable,
	boldBody.variable,
	boldHeading.variable,
	earthBody.variable,
	earthHeading.variable,
	minimalBody.variable,
	minimalHeading.variable,
].join(" ");

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			data-theme="clean"
			data-font="editorial"
			data-style="split-contained"
			data-shape="round"
			data-spacing="airy"
			className={fontClasses}
		>
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
				<DesignPanel />
				<Nav />

				{children}

				<Footer />
			</body>
			{/* Analytics — only renders if IDs are set */}
			{site.analytics?.ga4 && <GoogleAnalytics gaId={site.analytics.ga4} />}
			{site.analytics?.gtm && <GoogleTagManager gtmId={site.analytics.gtm} />}
		</html>
	);
}
