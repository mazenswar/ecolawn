// app/actions/contact.js
"use server";

import site from "../../../config/site";

const SERVICE_LABELS = {
	"lawn-maintenance": "Lawn Maintenance Program",
	"moisture-control": "Moisture Control add-on",
	"not-sure": "Not sure yet",
};

export async function submitContactForm(formData) {
	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const phone = formData.get("phone")?.toString().trim();
	const service = formData.get("service")?.toString().trim();
	const zip = formData.get("zip")?.toString().trim();
	const squareFootage = formData.get("squareFootage")?.toString().trim();
	const message = formData.get("message")?.toString().trim();

	// Basic validation
	if (!name || !email || !phone || !service || !zip) {
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

	if (!/^\d{5}$/.test(zip)) {
		return {
			success: false,
			error: "Please enter a valid 5-digit zip code.",
		};
	}

	const serviceLabel = SERVICE_LABELS[service] ?? service;

	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "EcoLawn Solutions Website <noreply@binswar.com>",
				to: site.email,
				reply_to: email,
				subject: `New quote request from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nZip code: ${zip}\nService: ${serviceLabel}\nApprox. square footage: ${squareFootage || "Not provided"}\n\nMessage:\n${message || "(none)"}`,
				html: `
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Phone:</strong> ${phone}</p>
					<p><strong>Zip code:</strong> ${zip}</p>
					<p><strong>Service:</strong> ${serviceLabel}</p>
					<p><strong>Approx. square footage:</strong> ${squareFootage || "Not provided"}</p>
					<br />
					<p><strong>Message:</strong></p>
					<p>${(message || "(none)").replace(/\n/g, "<br />")}</p>
				`,
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
