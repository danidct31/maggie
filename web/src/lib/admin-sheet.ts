import { mkdir, readFile, writeFile, access } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "admin");
const META_PATH = path.join(DATA_DIR, "sheet-meta.json");
const FILE_PATH = path.join(DATA_DIR, "shared-sheet.bin");

export type SheetMeta = {
  fileName: string | null;
  uploadedAt: string | null;
  shareUrl: string | null;
};

const emptyMeta: SheetMeta = {
  fileName: null,
  uploadedAt: null,
  shareUrl: null,
};

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function readSheetMeta(): Promise<SheetMeta> {
  try {
    const raw = await readFile(META_PATH, "utf8");
    return { ...emptyMeta, ...JSON.parse(raw) };
  } catch {
    return { ...emptyMeta };
  }
}

async function writeSheetMeta(meta: SheetMeta) {
  await ensureDir();
  await writeFile(META_PATH, JSON.stringify(meta, null, 2), "utf8");
}

export async function saveShareUrl(shareUrl: string | null) {
  const meta = await readSheetMeta();
  meta.shareUrl = shareUrl?.trim() || null;
  await writeSheetMeta(meta);
  return meta;
}

export async function saveUploadedSheet(fileName: string, bytes: Buffer) {
  await ensureDir();
  await writeFile(FILE_PATH, bytes);
  const meta = await readSheetMeta();
  meta.fileName = fileName;
  meta.uploadedAt = new Date().toISOString();
  await writeSheetMeta(meta);
  return meta;
}

export async function readUploadedSheet(): Promise<{
  meta: SheetMeta;
  bytes: Buffer;
} | null> {
  const meta = await readSheetMeta();
  if (!meta.fileName) return null;
  try {
    await access(FILE_PATH);
    const bytes = await readFile(FILE_PATH);
    return { meta, bytes };
  } catch {
    return null;
  }
}
