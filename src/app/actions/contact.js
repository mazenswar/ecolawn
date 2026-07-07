// app/actions/contact.js
"use server";

export async function submitContactForm(formData) {
	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const message = formData.get("message")?.toString().trim();

	// Basic validation
	if (!name || !email || !message) {
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

	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "Contact Form <noreply@binswar.com>",
				to: "mazen@binswar.com",
				reply_to: email,
				subject: `New inquiry from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
				html: `
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<br />
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, "<br />")}</p>
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
