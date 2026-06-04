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
  let nextIdString = "LEAD-001"; // Fallback jika sheet masih kosong atau belum ada header

  try {
    // 1. Ambil data baris yang sudah ada dari Kolom A untuk menghitung total baris
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: env.GOOGLE_SHEETS_ID,
      range: "Leads!A:A", // Hanya membaca kolom A saja biar cepat dan hemat kuota API
    });

    const rows = response.data.values;

    if (rows && rows.length > 0) {
      // Jika sudah ada baris (termasuk baris header), nomor urut barunya adalah total baris saat ini.
      // Misal: Baru ada Header saja (1 baris), maka rows.length = 1. Nomor urut berikutnya = 1 -> LEAD-001
      // Misal: Sudah ada Header + 2 data (3 baris), maka rows.length = 3. Nomor urut berikutnya = 3 -> LEAD-003
      const nextNumber = rows.length;

      // Format angka menjadi 3 digit padding (misal: 1 menjadi 001, 12 menjadi 012)
      const paddedNumber = String(nextNumber).padStart(3, "0");
      nextIdString = `LEAD-${paddedNumber}`;
    }
  } catch (err) {
    console.error(
      "Gagal mengambil baris lama untuk generate ID, menggunakan fallback:",
      err,
    );
    // Jika gagal baca (misal internet mati/sheet belum dibuat), dia akan tetap pakai LEAD-001 atau kombinasi random aman
    nextIdString = `LEAD-${Math.floor(100 + Math.random() * 900)}`;
  }

  // 2. Masukkan data ke baris baru menggunakan ID berurutan yang sudah dibuat
  await sheets.spreadsheets.values.append({
    spreadsheetId: env.GOOGLE_SHEETS_ID,
    range: "Leads!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          nextIdString, // Hasilnya akan menjadi "LEAD-001", "LEAD-002", dst.
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

  try {
    // 3. Ambil metadata spreadsheet untuk mendapatkan sheetId agar bisa auto-resize
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: env.GOOGLE_SHEETS_ID,
    });

    const targetSheet = spreadsheet.data.sheets?.find(
      (sheet) => sheet.properties?.title === "Leads",
    );

    if (targetSheet && targetSheet.properties?.sheetId !== undefined) {
      const sheetId = targetSheet.properties.sheetId;

      // 4. Trigger otomatis resize/auto-fit lebar kolom (Kolom A sampai H)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: env.GOOGLE_SHEETS_ID,
        requestBody: {
          requests: [
            {
              autoResizeDimensions: {
                dimensions: {
                  sheetId: sheetId,
                  dimension: "COLUMNS",
                  startIndex: 0,
                  endIndex: 8,
                },
              },
            },
          ],
        },
      });
    }
  } catch (err) {
    console.error("Gagal melakukan auto-resize kolom:", err);
  }
}
