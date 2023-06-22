const express = require("express");
import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;

const prisma = new PrismaClient();
const defaultUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key={envKey}&format=json&keyword=高田馬場`;

app.use(express.json());

type BudgetCode = "B1" | "B2" | "B3" | "B4" | "B5";

type genreCode = "G1" | "G2" | "G3" | "G4" | "G5";

const getHotPepperGenreQuery = (genreNames: any) => {
  let hotPepperGenreKey;

  switch (genreNames) {
    case "G1":
      hotPepperGenreKey = "&genre=G013";
      break;
    case "G2":
      hotPepperGenreKey = "&genre=G008&count=20";
      break;
    case "G3":
      hotPepperGenreKey = "&genre=G014&count=15";
      break;
    case "G4":
      hotPepperGenreKey = "&genre=G001&count=100";
      break;
    case "G5":
      hotPepperGenreKey = "&genre=G007,G017&count=40";
      break;
  }
  return hotPepperGenreKey;
};

const getHotPepperBudgetQuery = (budgetNames: any) => {
  let hotPepperBudgetKey;
  switch (budgetNames) {
    case "B1":
      hotPepperBudgetKey = "&budget=B009,B010";
      break;
    case "B2":
      hotPepperBudgetKey = "&budget=B001,B011&count=70";
      break;
    case "B3":
      hotPepperBudgetKey = "&budget=B002&count=100";
      break;
    case "B4":
      hotPepperBudgetKey = "&budget=B003&count=55";
      break;
    case "B5":
      hotPepperBudgetKey = "&budget=B008,B004,B005&count=20";
      break;
  }
  return hotPepperBudgetKey;
};

// レストラン一覧取得
app.get("/restaurants/all", async (req: Request, res: Response) => {
  const allRestaurants = await prisma.restaurant.findMany();
  // const response = await fetch(defaultUrl);
  // const hotPepperData = await response.json();

  // const mergedData = {
  //   myRestaurants: allRestaurants,
  //   hotPepperData: hotPepperData.results,
  // };
  // res.json(mergedData)
  res.json(allRestaurants);
});

app.get("/restaurants", async (req: Request, res: Response) => {
  // 型定義
  const budgetNames = req.query.budget;
  const genreNames = req.query.genre;

  const hotPepperBudgetKey = getHotPepperBudgetQuery(budgetNames);
  const hotPepperGenreKey = getHotPepperGenreQuery(genreNames);

  try {
    res.json({
      prismaKey: budgetNames,
      hotKey: hotPepperBudgetKey,
      genreKey: genreNames,
      hotGenreKey: hotPepperGenreKey,
    });
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ホットペッパーは&id=のクエリの後にidが続く
app.get("/restaurants/:id", async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  const isOriginal = restaurantId.includes("original");

  if (isOriginal) {
    // Prismaの処理
  } else {
    //hotPepperの処理
    // fetch(defaultUrl&id=restaurantId)
  }
  res.json({ origin: isOriginal, id: restaurantId });
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
