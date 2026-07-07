// components/sections/ContactForm/ContactForm.js
"use client";
import { useState, useRef, useEffect } from "react";
import { submitContactForm } from "@/app/actions/contact";
import "./contactform.scss";

/* =========================
  CONTACT FORM CONFIGURATION
  Edit this section per project
   ========================= */

//    Setup notes:
// Two things needed before this works:

// Install Resend: npm install resend
// Add to your .env.local:

// RESEND_API_KEY=your_api_key_here
// Get a free API key at resend.com. No credit card needed for the free tier.

const formConfig = {
	heading: "Get in touch",
	subheading:
		"Have a question or ready to start a project? Send us a message and we will get back to you within one business day.",
	fields: {
		name: { label: "Your name", placeholder: "Jane Smith" },
		email: { label: "Email address", placeholder: "jane@yourpractice.com" },
		message: {
			label: "Message",
			placeholder: "Tell us a little about what you are looking for.",
		},
	},
	submitText: "Send message",
	successHeading: "Message received",
	successMessage:
		"Thank you for reaching out. We will be in touch within one business day.",
};

/* =========================
   COMPONENT
   ========================= */

export default function ContactForm() {
	const [status, setStatus] = useState("idle"); // idle | loading | success | error
	const [errorMessage, setErrorMessage] = useState("");
	const [errors, setErrors] = useState({});
	const formRef = useRef(null);
	const errorRef = useRef(null);
	useEffect(() => {
		if (status === "error" && errorRef.current) {
			errorRef.current.focus();
		}
	}, [status]);
	function validate(formData) {
		const errs = {};
		const name = formData.get("name")?.toString().trim();
		const email = formData.get("email")?.toString().trim();
		const message = formData.get("message")?.toString().trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!name) errs.name = "Please enter your name.";
		if (!email) errs.email = "Please enter your email address.";
		else if (!emailRegex.test(email))
			errs.email = "Please enter a valid email address.";
		if (!message) errs.message = "Please enter a message.";

		return errs;
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		const formData = new FormData(formRef.current);
		const errs = validate(formData);

		if (Object.keys(errs).length > 0) {
			setErrors(errs);
			setStatus("idle");
			return;
		}

		setErrors({});
		const result = await submitContactForm(formData);

		if (result.success) {
			setStatus("success");
			formRef.current?.reset();
		} else {
			setStatus("error");
			setErrorMessage(result.error);
		}
	}

	return (
		<section className="block contact-form" aria-labelledby="contact-heading">
			<div className="block__content container">
				<div className="contact-form__layout">
					{/* Left: heading and context */}
					<div className="contact-form__intro">
						<h2 id="contact-heading">{formConfig.heading}</h2>
						<p className="contact-form__sub">{formConfig.subheading}</p>
					</div>

					{/* Right: form or success state */}
					<div className="contact-form__body">
						{status === "success" ? (
							<div className="contact-form__success" role="alert">
								<div className="contact-form__success-icon" aria-hidden="true">
									✓
								</div>
								<h3>{formConfig.successHeading}</h3>
								<p>{formConfig.successMessage}</p>
								<button className="btnGhost" onClick={() => setStatus("idle")}>
									Send another message
								</button>
							</div>
						) : (
							<form
								ref={formRef}
								onSubmit={handleSubmit}
								noValidate
								aria-label="Contact form"
							>
								{/* Name */}
								<div className="contact-form__field">
									<label htmlFor="contact-name">
										{formConfig.fields.name.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-name"
										name="name"
										type="text"
										placeholder={formConfig.fields.name.placeholder}
										autoComplete="name"
										disabled={status === "loading"}
										aria-invalid={errors.name ? "true" : "false"}
										{...(errors.name && {
											"aria-describedby": "contact-name-error",
										})}
									/>
									{errors.name && (
										<span
											id="contact-name-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.name}
										</span>
									)}
								</div>

								{/* Email */}
								<div className="contact-form__field">
									<label htmlFor="contact-email">
										{formConfig.fields.email.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<input
										id="contact-email"
										name="email"
										type="email"
										placeholder={formConfig.fields.email.placeholder}
										autoComplete="email"
										disabled={status === "loading"}
										aria-invalid={errors.email ? "true" : "false"}
										{...(errors.email && {
											"aria-describedby": "contact-email-error",
										})}
									/>

									{errors.email && (
										<span
											id="contact-email-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.email}
										</span>
									)}
								</div>

								{/* Message */}
								<div className="contact-form__field">
									<label htmlFor="contact-message">
										{formConfig.fields.message.label}
										<span className="contact-form__required" aria-hidden="true">
											{" "}
											*
										</span>
									</label>
									<textarea
										id="contact-message"
										name="message"
										rows={5}
										placeholder={formConfig.fields.message.placeholder}
										disabled={status === "loading"}
										aria-invalid={errors.message ? "true" : "false"}
										{...(errors.message && {
											"aria-describedby": "contact-message-error",
										})}
									/>

									{errors.message && (
										<span
											id="contact-message-error"
											className="contact-form__field-error"
											role="alert"
										>
											{errors.message}
										</span>
									)}
								</div>
								{/* Error message */}
								{status === "error" && (
									<div
										className="contact-form__error"
										ref={errorRef}
										tabIndex={-1}
										role="alert"
									>
										{errorMessage}
									</div>
								)}

								{/* Submit */}
								<button
									type="submit"
									className="btnPrimary"
									disabled={status === "loading"}
									aria-busy={status === "loading"}
								>
									{status === "loading" ? "Sending..." : formConfig.submitText}
								</button>

								<p className="contact-form__note">* Required fields</p>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
