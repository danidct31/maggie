-- AlterTable
ALTER TABLE "Product" ADD COLUMN "fulfillment" TEXT NOT NULL DEFAULT 'studio';
ALTER TABLE "Product" ADD COLUMN "amazonAsin" TEXT;
