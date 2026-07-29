import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminCookie } from "@/lib/admin-auth";
import {
  readSheetMeta,
  readUploadedSheet,
  saveShareUrl,
  saveUploadedSheet,
} from "@/lib/admin-sheet";

async function requireAdmin() {
  const jar = await cookies();
  return isAdminCookie(jar.get(ADMIN_COOKIE)?.value);
}

export async function GET(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("download") === "1") {
    const file = await readUploadedSheet();
    if (!file) {
      return NextResponse.json({ error: "No file uploaded yet" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(file.bytes), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${file.meta.fileName ?? "shared-sheet.xlsx"}"`,
      },
    });
  }

  const meta = await readSheetMeta();
  return NextResponse.json(meta);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { shareUrl?: string };
    const meta = await saveShareUrl(body.shareUrl ?? null);
    return NextResponse.json(meta);
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const name = file.name.toLowerCase();
  const allowed =
    name.endsWith(".xlsx") ||
    name.endsWith(".xls") ||
    name.endsWith(".csv") ||
    name.endsWith(".ods");
  if (!allowed) {
    return NextResponse.json(
      { error: "Upload an Excel or CSV file (.xlsx, .xls, .csv, .ods)" },
      { status: 400 },
    );
  }

  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const meta = await saveUploadedSheet(file.name, bytes);
  return NextResponse.json(meta);
}
