import { NextRequest } from "next/server";
import { readJsonBody, jsonResponse, field, isValidEmail } from "@/utils/api";

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 200;

export async function POST(req: NextRequest) {
  const body = await readJsonBody(req);
  if (!body) {
    return jsonResponse("Error: malformed or oversized request body", 400);
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const message = field(body, "message");
  const token = field(body, "token");

  if (!name || name.length > MAX_NAME_LENGTH) {
    return jsonResponse("Error: a name is required", 400);
  }
  if (!isValidEmail(email)) {
    return jsonResponse("Error: a valid email is required", 400);
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse("Error: a message is required", 400);
  }
  if (!token) {
    return jsonResponse("Error: captcha verification required", 400);
  }

  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
  const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
  const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

  const data = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    accessToken: EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: name,
      from_email: email,
      message,
      referPage: field(body, "referPage"),
      "g-recaptcha-response": token,
    },
  };

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Send failed with status ${response.status}`);
    }

    return jsonResponse(response.status, 200);
  } catch (error: unknown) {
    // Log detail server-side; return something generic to the caller so
    // upstream error text is not echoed back to the client.
    console.error("contact send failed:", error);
    return jsonResponse("An unknown error occurred", 500);
  }
}
