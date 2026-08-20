import { NextRequest } from "next/server";
import { readJsonBody, jsonResponse, field, isValidEmail } from "@/utils/api";

export async function POST(req: NextRequest) {
	const body = await readJsonBody(req);
	if (!body) {
		return jsonResponse("Error: malformed or oversized request body", 400);
	}

	const email = field(body, "email");
	if (!isValidEmail(email)) {
		return jsonResponse("Error: no valid email found in request", 400);
	}

	const captchaValue = field(body, "captchaValue");
	if (!captchaValue) {
		return jsonResponse("Error: captcha verification required", 400);
	}

	const EO_LIST_ID = process.env.EO_LIST_ID;
	const EO_KEY = process.env.EO_KEY;
	const EO_ENDPOINT = `https://emailoctopus.com/api/1.6/lists/${EO_LIST_ID}/contacts`;

	const CAPTCHA_SECRET_KEY = process.env.RECAPTCHA_V2_SECRET_KEY;
	const CAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

	try {
		// Send the secret in the POST body, not the query string, so it does not
		// end up in proxy/access logs or referrer headers.
		const responseCaptcha = await fetch(CAPTCHA_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				secret: CAPTCHA_SECRET_KEY ?? "",
				response: captchaValue,
			}),
		});

		const captchaResult = await responseCaptcha.json();

		if (!captchaResult.success) {
			// A failed captcha is a client problem, not a server fault.
			return jsonResponse("Error: captcha verification failed", 400);
		}

		const data = {
			api_key: EO_KEY,
			email_address: email,
			fields: {
				Referrer: field(body, "referrer") || "unknown/direct",
			},
			status: "SUBSCRIBED",
		};

		const response = await fetch(EO_ENDPOINT, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Subscribe failed with status ${response.status}`);
		}

		return jsonResponse(response.status, 200);
	} catch (error: unknown) {
		// Log detail server-side; return something generic to the caller so
		// upstream error text is not echoed back to the client.
		console.error("newsletter subscribe failed:", error);
		return jsonResponse("An unknown error occurred", 500);
	}
}
