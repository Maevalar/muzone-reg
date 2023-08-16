const select = document.querySelector('.adress__block');
const selectAdress = document.querySelector('.adress__select');
const selectItem = document.querySelectorAll('.select-adress__item');

selectAdress.addEventListener('click', function (e) {
    select.classList.toggle('_active');
    selectItem.forEach(item => {
        if (item.dataset.select == this.closest('.adress__block').querySelector('.select-adress__current').dataset.select) {
            item.style.display = 'none';
        } else { item.style.display = 'block'; };
    });
});

selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
});

function selectChoose() {
    let text = this.innerText;
    let data = this.dataset.select;
    currentElement = this.closest('.adress__block').querySelector('.select-adress__current');
    currentElement.innerText = text;
    currentElement.dataset.select = data;
    select.classList.remove('_active')
};

//=========================================
const values = document.querySelectorAll('.category-teacher__value');
const switches = document.querySelectorAll('.category-teacher__switch');

switches.forEach(item => {
    item.addEventListener('change', function () {
        const category = this.closest('.category-teacher');
        const uncheckedValue = category.querySelector('.category-teacher__value.unchecked');
        const checkedValue = category.querySelector('.category-teacher__value.checked');

        uncheckedValue.classList.toggle('_active');
        checkedValue.classList.toggle('_active');
    });
});

//============================
const options = document.querySelectorAll('.option');
const adress = document.querySelector('.adress')
const dateItems = document.querySelectorAll('.date-teachers__item')
const trashIcons = document.querySelectorAll('.option__trash');
const monthes = document.querySelectorAll('.calendar-option__month');
const teacherOptions = document.querySelectorAll('.teacher-option')

options.forEach(option => {
    option.addEventListener('click', function () {
        if (event.target.classList.contains('option__trash')) {
            var defaultText = option.dataset.default;
            option.querySelector('.option__name').textContent = defaultText;
            option.querySelector('.option__trash').classList.remove('_show');
            option.classList.remove('_trash');
            removeClasses();
        } else {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            option.classList.toggle('_active');
            option.querySelector('.option__name').textContent = option.dataset.default;
            option.querySelector('.option__trash').classList.remove('_show');

            target.classList.toggle('_active');
            adress.classList.toggle('_hiden');


            options.forEach(item => {
                if (item.getAttribute('data-target') !== targetId) {
                    item.classList.toggle('_hiden');
                }
            })
        }
    });
});

dateItems.forEach(dateItem => {
    dateItem.addEventListener('click', function () {

        if (dateItem.classList.contains('calendar__item')){
            removeClasses();
            calendar = document.querySelector('.calendar-option');
            adress.classList.add('_hiden');
            options.forEach(option => {
                if(option.dataset.target == 'time'){
                    option.classList.add('_active');
                }else{
                    option.classList.add('_hiden');
                }
                
            });
            calendar.classList.add('_active');
        }else{
            removeClasses();

            options.forEach(option => {
                
                if (option.dataset.target == 'time') {
                    var dateDay = dateItem.getAttribute('data-day');
                    var dateTime = dateItem.textContent;

                    option.querySelector('span').textContent = dateDay + ", " + dateTime;
                    option.querySelector('.option__trash').classList.add('_show');
                    option.classList.add('_trash');
                };
                if (option.dataset.target == 'teachers') {
                    const teacherOption = this.closest('.teacher-option');
                    const teacherName = teacherOption.querySelector('.teacher-info__name');
                    option.querySelector('.option__name').textContent = teacherName.getAttribute('data-teacherName');

                    option.querySelector('.option__trash').classList.add('_show');
                    option.classList.add('_trash');
                    checkBtn();
                }
            });
        }
    });
});

teacherOptions.forEach(teacherOption => {
    const info = teacherOption.querySelector('.teacher-option__info');
    info.addEventListener('click', function(){
        options.forEach(option => {
            if (option.dataset.target == 'teachers'){
                var optionName = option.querySelector('.option__name');
                var teacherName = teacherOption.querySelector('.teacher-info__name');
                optionName.textContent = teacherName.getAttribute('data-teacherName');

                removeClasses();
                option.querySelector('.option__trash').classList.add('_show');
                option.classList.add('_trash');
                checkBtn();
            }
        });
    });
});
removeClasses = function () {
    const removeActive = document.querySelectorAll('._active');
    const removeHiden = document.querySelectorAll('._hiden');

    removeActive.forEach(item => {
        item.classList.remove('_active');
    });
    removeHiden.forEach(item => {
        item.classList.remove('_hiden');
    });
}

//=================
const instruments = document.querySelectorAll('.instrument-option__name');

instruments.forEach(instrument => {
    instrument.addEventListener('click', function () {
        removeClasses();
        options.forEach(option => {
            if (option.dataset.target == 'instruments') {
                var instrumentName = instrument.textContent;
                option.querySelector('.option__name').textContent = instrumentName;
                option.querySelector('.option__trash').classList.add('_show');
                option.classList.add('_trash');
                checkBtn();
            };
        });
    });
});

//============







//====
var Cal = function (divId) {

    //Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    this.DaysOfWeek = [
        'П',
        'В',
        'С',
        'Ч',
        'П',
        'С',
        'Н',
        'П',
        'В',
        'С',
        'Ч',
        'П',
        'С',
        'Н',
        'П',
        'В',
        'С',
        'Ч',
        'П',
        'С',
        'Н',
        'П',
        'В',
        'С',
        'Ч',
        'П',
        'С',
        'Н',
        'П',
        'В',
        'С',
        'Ч',
        'П',
        'С',
        'Н',
    ];

    // Месяцы начиная с января
    this.Months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

    //Устанавливаем текущий месяц, год
    var d = new Date();

    this.currMonth = d.getMonth('9');
    this.currYear = d.getFullYear('22');
    this.currDay = d.getDate('3');
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};



// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {

    var d = new Date()
        // Первый день недели в выбранном месяце 
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Запись выбранного месяца и года
    var currenttMonth = d.getMonth();

    html += '<thead><tr>';
    if (m != currenttMonth) {
        html += '<td colspan="2" class="monthes">' + '<p class="prevMonth">' + this.Months[m - 1] + '</p>' + '</td>';
        html += '<td colspan="5" class="monthes">' + '<p class="currentMonth">' + this.Months[m] + '</p>' + '</td>';
        html += '<td colspan="2" class="monthes">' + '<p class="nextMonth">' + this.Months[m + 1] + '</p>' + '</td>';
    }
    else {
        html += '<td colspan="2" class="monthes">' + '<p class="prevMonth">' + '</p>' + '</td>';
        html += '<td colspan="5" class="monthes">' + '<p class="currentMonth">' + this.Months[m] + '</p>' + '</td>';
        html += '<td colspan="2" class="monthes">' + '<p class="nextMonth">' + this.Months[m + 1] + '</p>' + '</td>';
    }
    html += '</tr></thead>';


    // заголовок дней недели
    var currentDay = d.getDate()

    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    var i = 1;

    html += '</tr>';
    // Записываем дни

    do {

        var dow = new Date(y, m, i).getDay();
        // Начать новую строку в понедельник
        if (dow == 1) {
        }

        // Если первый день недели не понедельник показать последние дни предидущего месяца
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + '<p>' + i + '</p>' + '<div class="bg">' + '</div>' + '</td>';
        }
        // закрыть строку в воскресенье
        if (dow == 0) {

        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';


    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html; 
    const calendarDays = document.querySelectorAll('.normal');
    calendarDays.forEach(calendarDay => {
        calendarDay.addEventListener('click', function () {
            calendarDays.forEach(item => {
                item.classList.remove('_selected');
            });
            calendarDay.classList.toggle('_selected');
        });
    });
};
// При загрузке окна
window.onload = function () {
    console.log('click');

    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('nextMonth').onclick = function () {
        c.nextMonth();
    };
    getId('prevMonth').onclick = function () {
        c.previousMonth();
    };
}

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}


//========
const calendarNames = document.querySelectorAll('.calendar-time__name');
const calendarTimes = document.querySelectorAll('.calendar-time__item');
const calendarButton = document.querySelector('.calendar-option__button');


calendarNames.forEach(calendarName => {
    calendarName.addEventListener('click', function () {
        calendarName.parentElement.classList.toggle('_active');
    });
});

calendarTimes.forEach(calendarTime => {
    calendarTime.addEventListener('click', function () {
        calendarTimes.forEach(item => {
            item.classList.remove('_selected');
        });
        calendarTime.classList.toggle('_selected');
        if (document.querySelector('._selected')) {
            calendarButton.classList.add('_active');
            calendarButton.addEventListener('click', function () {
                removeTime();
                removeClasses();
                var selectedItems = document.querySelectorAll('._selected');
                selectedItems.forEach(selectedItem => {
                    options.forEach(option => {
                        if (option.dataset.target == 'time') {
                            var optionName = option.querySelector('.option__name');
                            if (optionName.textContent == option.dataset.default) {
                                optionName.textContent = '';
                            }
                            if (optionName.textContent == '') {
                                optionName.textContent += selectedItem.textContent;
                                optionName.textContent += ' ';
                            }
                            else {
                                optionName.textContent += document.querySelector('.currentMonth').textContent + ' ';
                                optionName.textContent += selectedItem.textContent;
                            }
                            option.classList.add('_trash');
                            option.querySelector('.option__trash').classList.add('_show');
                        }
                    });
                });
            });
        }
    });

});

const optionButton = document.querySelector('.option-button');
checkBtn = function(){
    y = 0;
    options.forEach(option => {
        var optionName = option.querySelector('.option__name');
        if(optionName.textContent != option.dataset.default){
            y += 1;
        }
    })
    if(y == 3){
        optionButton.classList.add('_active');
    }
    console.log(y);
}

removeTime = function(){
    options.forEach(option =>{
        if(option.dataset.target == 'time'){
            var optionName = option.querySelector('.option__name');
            optionName.textContent = '';
        }
    });
}