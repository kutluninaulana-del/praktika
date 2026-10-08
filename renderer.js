// renderer.js
console.log("Renderer.js загружен");

function renderProperty(property) {
  var article = document.createElement('article');
  article.className = 'card';
  article.dataset.id = property.id; // Для модального окна

  var figure = document.createElement('figure');
  var img = document.createElement('img');
  img.src = property.imageUrl;
  img.alt = 'Фото ' + property.name;
  var figcaption = document.createElement('figcaption');
  figcaption.textContent = property.name;
  figure.appendChild(img);
  figure.appendChild(figcaption);

  var pDesc = document.createElement('p');
  pDesc.textContent = property.description;

  var pStatus = document.createElement('p');
  pStatus.className = 'badge badge-' + property.status.toLowerCase();
  pStatus.textContent = property.status;

  var pPriority = document.createElement('p');
  pPriority.className = 'priority priority-' + property.priority.toLowerCase();
  pPriority.textContent = 'Приоритет: ' + property.priority;

  var pDate = document.createElement('p');
  var time = document.createElement('time');
  time.dateTime = property.startDate;
  time.textContent = new Date(property.startDate).toLocaleDateString('ru-RU');
  pDate.textContent = 'Начало: ';
  pDate.appendChild(time);

  var address = document.createElement('address');
  address.textContent = property.address;

  article.appendChild(figure);
  article.appendChild(pDesc);
  article.appendChild(pStatus);
  article.appendChild(pPriority);
  article.appendChild(pDate);
  article.appendChild(address);

  return article;
}

// Аналогично для renderBuilding (сокращенно для экономии места, добавляем те же поля)
function renderBuilding(building) {
  var article = document.createElement('article');
  article.className = 'card';
  article.dataset.id = building.id;

  var h3 = document.createElement('h3');
  h3.textContent = building.name;

  var pDesc = document.createElement('p');
  pDesc.textContent = building.description;

  var pStatus = document.createElement('p');
  pStatus.className = 'badge badge-' + building.status.toLowerCase();
  pStatus.textContent = building.status;

  var pPriority = document.createElement('p');
  pPriority.className = 'priority priority-' + building.priority.toLowerCase();
  pPriority.textContent = 'Приоритет: ' + building.priority;

  article.appendChild(h3);
  article.appendChild(pDesc);
  article.appendChild(pStatus);
  article.appendChild(pPriority);

  return article;
}

function renderApartmentRow(apartment) {
  var tr = document.createElement('tr');
  tr.dataset.id = apartment.id;

  var tdNumber = document.createElement('td');
  tdNumber.textContent = apartment.number;
  tdNumber.setAttribute('data-label', 'Номер'); // <-- ДОБАВИТЬ

  var tdArea = document.createElement('td');
  tdArea.textContent = apartment.area + ' м²';
  tdArea.setAttribute('data-label', 'Площадь'); // <-- ДОБАВИТЬ

  var tdPrice = document.createElement('td');
  tdPrice.textContent = apartment.price.toLocaleString('ru-RU') + ' ₽';
  tdPrice.setAttribute('data-label', 'Цена'); // <-- ДОБАВИТЬ

  var tdStatus = document.createElement('td');
  var spanStatus = document.createElement('span');
  spanStatus.className = 'badge badge-' + apartment.status.toLowerCase();
  spanStatus.textContent = apartment.status;
  tdStatus.appendChild(spanStatus);
  tdStatus.setAttribute('data-label', 'Статус'); // <-- ДОБАВИТЬ

  tr.appendChild(tdNumber);
  tr.appendChild(tdArea);
  tr.appendChild(tdPrice);
  tr.appendChild(tdStatus);

  return tr;
}