import { Request, Response } from "express";
import { contactSchema } from "../schemas/contact.schema";
import { appendLead } from "../services/googleSheets.service";

export async function submitContact(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.error("[submitContact] Error:", error);

    return res.status(500).json({
      success: false,
      error: {
        code: "SERVER_ERROR",
        message: "Failed to submit contact form",
      },
    });
  }
}
