console.log("Main.js загружен");

document.addEventListener('DOMContentLoaded', function() {

  // ===== 1. ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ =====
  var propertiesContainer = document.querySelector('#properties-list');
  var buildingsContainer = document.querySelector('#buildings-list');
  var apartmentsBody = document.querySelector('#apartments-body');
  var modalOverlay = document.querySelector('#modal-overlay');
  var modalTitle = document.querySelector('#modal-title');
  var modalBody = document.querySelector('#modal-body');
  var modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');

  // ===== 2. ФУНКЦИЯ РЕНДЕРА ВСЕХ ДАННЫХ =====
  function renderAll() {
    propertiesContainer.innerHTML = '';
    buildingsContainer.innerHTML = '';
    apartmentsBody.innerHTML = '';

    properties.forEach(function(item) {
      propertiesContainer.appendChild(renderProperty(item));
    });
    buildings.forEach(function(item) {
      buildingsContainer.appendChild(renderBuilding(item));
    });
    apartments.forEach(function(item) {
      apartmentsBody.appendChild(renderApartmentRow(item));
    });
  }
  renderAll();

  // ===== 3. ФИЛЬТРАЦИЯ =====
  var searchInput = document.querySelector('#search-input');
  var statusSelect = document.querySelector('#status-select');
  var priorityCheckboxes = document.querySelectorAll('.priority-filter');
  var filtersForm = document.querySelector('#filters-form');

  function applyFilters() {
    var searchText = searchInput.value.toLowerCase();
    var statusValue = statusSelect.value;
    var selectedPriorities = Array.from(priorityCheckboxes)
      .filter(function(cb) { return cb.checked; })
      .map(function(cb) { return cb.value; });

    var filteredProps = properties.filter(function(item) {
      var matchSearch = item.name.toLowerCase().includes(searchText);
      var matchStatus = statusValue === 'all' || item.status === statusValue;
      var matchPriority = selectedPriorities.length === 0 || selectedPriorities.includes(item.priority);
      return matchSearch && matchStatus && matchPriority;
    });

    propertiesContainer.innerHTML = '';
    filteredProps.forEach(function(item) {
      propertiesContainer.appendChild(renderProperty(item));
    });
  }

  searchInput.addEventListener('input', applyFilters);
  statusSelect.addEventListener('change', applyFilters);
  priorityCheckboxes.forEach(function(cb) {
    cb.addEventListener('change', applyFilters);
  });
  filtersForm.addEventListener('reset', function() {
    setTimeout(applyFilters, 0);
  });

  // ===== 4. СОРТИРОВКА ТАБЛИЦЫ =====
  var tableHeaders = document.querySelectorAll('#apartments-table th[data-sort]');
  tableHeaders.forEach(function(th) {
    th.addEventListener('click', function() {
      var key = th.dataset.sort;
      var isAsc = th.classList.contains('asc');

      tableHeaders.forEach(function(h) { h.classList.remove('asc', 'desc'); });
      th.classList.add(isAsc ? 'desc' : 'asc');

      var sorted = apartments.slice().sort(function(a, b) {
        if (key === 'number') return isAsc ? b.number.localeCompare(a.number) : a.number.localeCompare(b.number);
        if (key === 'area') return isAsc ? b.area - a.area : a.area - b.area;
        if (key === 'price') return isAsc ? b.price - a.price : a.price - b.price;
      });

      apartmentsBody.innerHTML = '';
      sorted.forEach(function(item) {
        apartmentsBody.appendChild(renderApartmentRow(item));
      });
    });
  });

  // ===== 5. МОДАЛЬНОЕ ОКНО =====
  function openModal(title, contentHTML) {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    var focusable = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');document.body.style.overflow = '';
  }

  modalCloseBtns.forEach(function(btn) {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
      var focusable = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Открытие модалки по клику на карточку ЖК
  propertiesContainer.addEventListener('click', function(e) {
    var card = e.target.closest('.card');
    if (card) {
      var id = card.dataset.id;
      var item = properties.find(function(p) { return p.id === id; });
      if (item) {
        var content = '<p><strong>ID:</strong> ' + item.id + '</p>' +
                      '<p><strong>Описание:</strong> ' + item.description + '</p>' +
                      '<p><strong>Адрес:</strong> ' + item.address + '</p>' +
                      '<p><strong>Ответственный:</strong> ' + item.responsible + '</p>';
        openModal(item.name, content);
      }
    }
  });

  // ===== 6. МОБИЛЬНОЕ МЕНЮ (БУРГЕР) =====
  var burgerBtn = document.querySelector('.burger-btn');
  var sidebar = document.querySelector('.sidebar');

  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    sidebar.classList.toggle('open');
    burgerBtn.classList.toggle('active');
    overlay.classList.toggle('active');

    if (sidebar.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  burgerBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleMenu();
    }
  });

  // ===== 7. ПЕРЕКЛЮЧАТЕЛЬ ВИДА (СЕТКА / СПИСОК) =====
  var viewRadios = document.querySelectorAll('input[name="view"]');

  viewRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.value === 'list') {
        propertiesContainer.classList.remove('grid-list');
        propertiesContainer.classList.add('list-view');
      } else {
        propertiesContainer.classList.remove('list-view');
        propertiesContainer.classList.add('grid-list');
      }
    });
  });

}); // КОНЕЦ DOMContentLoaded