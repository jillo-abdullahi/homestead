/*
  Warnings:

  - You are about to drop the `ConfirmationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConfirmationToken" DROP CONSTRAINT "ConfirmationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_userId_fkey";

-- DropTable
DROP TABLE "ConfirmationToken";

-- DropTable
DROP TABLE "PasswordResetToken";
