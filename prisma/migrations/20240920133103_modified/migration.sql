/*
  Warnings:

  - Changed the type of `token_expiration` on the `SocialAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SocialAccount" DROP COLUMN "token_expiration",
ADD COLUMN     "token_expiration" INTEGER NOT NULL;
