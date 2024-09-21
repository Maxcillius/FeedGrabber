/*
  Warnings:

  - Added the required column `token_expiration` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialAccount" ADD COLUMN     "token_expiration" TIMESTAMP(3) NOT NULL;
