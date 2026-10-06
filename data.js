const makeData = (type) => Array.from({ length: 15 }, (_, i) => ({
  id: `${type}-${i}`,
  title: `Название ${i}`,
  desc: `Описание ${i}`,
  status: "Сдан", // Фиксированный набор
  date: "2025-01-01", // ISO 8601
  address: "Москва, ул. Ленина 1",
  extra: "Доп поле",
  nested: { floor: i + 1 } // Вложенный объект
}));

export const complexes = makeData('zhk');
export const apartments = makeData('apt');