export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

/**
 * Sends a contact-form inquiry.
 * LOVABLE INTEGRATION: replace the body with a call to a backend function that
 * (1) saves the row to a `contact_submissions` table and
 * (2) emails it to masha.harry5@gmail.com (e.g. via Resend).
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  console.info("contact submission", payload);
  await new Promise((r) => setTimeout(r, 600));
}
