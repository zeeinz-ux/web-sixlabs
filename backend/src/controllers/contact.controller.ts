import { Request, Response } from "express";
import { contactSchema } from "../schemas/contact.schema";
import { appendLead } from "../services/googleSheets.service";

export async function submitContact(req: Request, res: Response) {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.flatten(),
    });
  }

  await appendLead(parsed.data);

  return res.status(200).json({
    success: true,
    message: "Lead submitted successfully",
  });
}
