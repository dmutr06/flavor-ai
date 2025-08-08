/*
  Warnings:

  - You are about to drop the column `ingridients` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Recipe" DROP COLUMN "ingridients",
ADD COLUMN     "ingredients" TEXT NOT NULL;
