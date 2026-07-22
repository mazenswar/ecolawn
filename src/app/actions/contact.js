// app/actions/contact.js
"use server";

import site from "../../../config/site";
import { buildQuoteRequestEmail } from "../../../config/emailTemplate";

const SERVICE_LABELS = {
	"lawn-maintenance": "Lawn Maintenance Program",
	"moisture-control": "Moisture Control add-on",
	both: "Both",
	"not-sure": "Not sure yet",
};

export async function submitContactForm(formData) {
	// Honeypot — real users never see or fill this field in; if it's
	// populated, the submission almost certainly came from a bot. Pretend
	// success so the bot doesn't know to try a different approach.
	const honeypot = formData.get("company")?.toString().trim();
	if (honeypot) {
		return { success: true };
	}

	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const phone = formData.get("phone")?.toString().trim();
	const service = formData.get("service")?.toString().trim();
	const serviceAddress = formData.get("serviceAddress")?.toString().trim();
	const message = formData.get("message")?.toString().trim();

	// Basic validation
	if (!name || !email || !phone || !service || !serviceAddress) {
		return {
			success: false,
			error: "Please fill in all required fields.",
		};
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return {
			success: false,
			error: "Please enter a valid email address.",
		};
	}

	const serviceLabel = SERVICE_LABELS[service] ?? service;
	const { subject, html, text } = buildQuoteRequestEmail({
		name,
		email,
		phone,
		serviceAddress,
		serviceLabel,
		message,
	});

	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "EcoLawn Solutions Website <noreply@ecolawn.us>",
				to: "hayden.zachariah5@gmail.com",
				reply_to: email,
				subject,
				text,
				html,
			}),
		});

		if (!res.ok) {
			throw new Error("Failed to send email");
		}

		return { success: true };
	} catch (err) {
		console.error("Contact form error:", err);
		return {
			success: false,
			error: "Something went wrong. Please try again or email us directly.",
		};
	}
}
