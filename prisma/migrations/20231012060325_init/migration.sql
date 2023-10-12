-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "testNumber" TEXT NOT NULL,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_testNumber_key" ON "test"("testNumber");
