// data.js
console.log("Data.js загружен");

var imagePaths = [
  "images/4.jpg", "images/2.jpg", "images/8.jpg", "images/3.jpg", 
  "images/5.jpg", "images/7.jpg", "images/6.jpg", "images/1.jpg",
  "images/9.jpg", "images/10.jpg", "images/12.jpg", "images/11.jpg",
  "images/15.jpg", "images/14.jpg", "images/13.jpg"
];


var properties = [];
var buildings = [];
var apartments = [];

var priorities = ["Высокий", "Средний", "Низкий"];
var responsibles = ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."];

for (var i = 1; i <= 15; i++) {
  properties.push({
    id: "prop-" + i,
    name: "Жилой Комплекс 'Северный-" + i + "'",
    description: "Современный ЖК комфорт-класса. Очередь " + i + ".",
    status: ["Проект", "Строительство", "Сдан"][i % 3],
    priority: priorities[i % 3],
    responsible: responsibles[i % 3],
    startDate: new Date(2024, i, 1).toISOString(),
    address: "г. Москва, ул. Строителей, д. " + i,
    imageUrl: imagePaths[i - 1],
    features: ["Паркинг", "Детский сад"]
  });

  buildings.push({
    id: "build-" + i,
    name: "Корпус " + i,
    description: "Монолитный корпус переменной этажности.",
    status: ["Котлован", "Каркас", "Отделка", "Сдан"][i % 4],
    priority: priorities[i % 3],
    responsible: responsibles[i % 3],
    completionDate: new Date(2025, i, 15).toISOString(),
    propertyId: "prop-" + i,
    floors: 10 + (i % 10),
    hasParking: i % 2 === 0
  });

  apartments.push({
    id: "apt-" + i,
    number: "" + (100 + i),
    description: "Просторная квартира с панорамными окнами.",
    status: ["Свободна", "Бронь", "Продана"][i % 3],
    priority: priorities[i % 3],
    responsible: responsibles[i % 3],
    price: 8000000 + i * 500000,
    area: 35 + i * 2.5,
    buildingId: "build-" + i,
    finishing: { type: "White Box", balcony: true }
  });
}