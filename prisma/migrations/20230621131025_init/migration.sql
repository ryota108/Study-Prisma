-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "other_memo" TEXT,
    "capacity" INTEGER NOT NULL,
    "official" TEXT,
    "youtube" TEXT,
    "close" TEXT NOT NULL,
    "open" TEXT NOT NULL,
    "card" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "private_room" BOOLEAN NOT NULL,
    "catch" TEXT NOT NULL,
    "party_capacity" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "midnight" BOOLEAN NOT NULL,
    "charter" BOOLEAN NOT NULL,
    "original" BOOLEAN NOT NULL,
    "budgetId" TEXT,
    "genreId" TEXT,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
