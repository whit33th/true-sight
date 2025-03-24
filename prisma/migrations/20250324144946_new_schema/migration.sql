/*
  Warnings:

  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tag` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `platform` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_clerkId_key";

-- DropIndex
DROP INDEX "User_uuid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
DROP COLUMN "updatedAt",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "tag" SET NOT NULL,
ALTER COLUMN "platform" SET NOT NULL;
