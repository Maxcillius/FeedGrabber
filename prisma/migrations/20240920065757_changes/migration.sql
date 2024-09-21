/*
  Warnings:

  - The primary key for the `SocialAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SocialAccount` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "SocialAccount" DROP CONSTRAINT "SocialAccount_id_fkey";

-- AlterTable
ALTER TABLE "SocialAccount" DROP CONSTRAINT "SocialAccount_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SocialAccount" ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
