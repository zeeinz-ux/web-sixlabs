import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { env } from "../config/env";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(process.cwd(), env.GOOGLE_SERVICE_ACCOUNT),
    "utf8",
  ),
);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function appendLead(data: {
  name: string;
  email: string;
  service?: string;
  message: string;
}) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEETS_ID,
    range: "Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          `LEAD-${Date.now()}`,
          new Date().toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          data.name,
          data.email,
          data.service || "-",
          "New",
          "Website",
          data.message,
        ],
      ],
    },
  });
}
