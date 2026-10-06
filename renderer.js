export const createCard = (item) => {
  const el = document.createElement('article');
  const h = document.createElement('h3'); h.textContent = item.title;
  const p = document.createElement('p'); p.textContent = item.desc;
  const t = document.createElement('time'); 
  t.setAttribute('datetime', item.date); 
  t.textContent = item.date;
  
  el.append(h, p, t);
  return el;
};

export const createRow = (item) => {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td'); td1.textContent = item.id;
  const td2 = document.createElement('td'); td2.textContent = item.status;
  
  tr.append(td1, td2);
  return tr;
};