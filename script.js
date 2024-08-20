document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('id').value.trim(), 10);


    fetch('assets/data.csv')
        .then(response => response.text())
        .then(text => {
            const rows = text.trim().split('\n');
            const headers = rows[0].split(',').map(header => header.trim());

            const data = rows.slice(1).map(row => {
                const values = row.split(',').map(value => value.trim());
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = values[index];
                });
                return item;
            });

            const item = data.find(entry => parseInt(entry.ID, 10) === id);
            if (item) {
                document.getElementById('name').innerText = `${item.Name}`;
                document.getElementById('section').innerText = `${item.Section}`;
                document.getElementById('place').innerText = `${item.Place}`;
                document.getElementById('success-icon').style.display = 'block';
            } else {
                document.getElementById('name').innerText = 'ID not found';
                document.getElementById('section').innerText = '';
                document.getElementById('place').innerText = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('name').innerText = 'Error loading data';
            document.getElementById('section').innerText = '';
            document.getElementById('place').innerText = '';
        });
});


const events = [
    {time: "08:00-09:00", description: "Тіркелу", place: "Фойе"},
    {time: "09:00-09:45", description: "«Мастер - дәріс», Хартман Дуглас, Мичиган мемлекттің университетінің профессоры", place: "«MAIN HALL»"},
    {time: "10:00-12:30", description: "Секциялық отырыстар",place:"12 секция"},
    {time: "12:30-14:00", description: "Үзіліс",place:""},
    {time: "14:00", description: "Цифрлық көрме жұмысымен танысу",place:"Жоғарғы атриум"},
    {time: "14:30-14:50", description: "«Қазақстан мұғалімі» ұлттық премиясының Үздік-50 финалистінің тұсаукесері",place:"«MAIN HALL»"},
    {time: "15:00-16:00", description: "Пленарлық сессия, Бірінші сессия",place:"«MAIN HALL»"},
    {time: "16:00-17:00", description: "Пленарлық сессия, Екінші сессия",place:"«MAIN HALL»"},
    {time: "17:00", description: "Тамыз Саммиті жұмысының жабылуы",place:"«MAIN HALL»"}
];

function displayEvents() {
    const eventsTable = document.getElementById('events');
    events.forEach(event => {
        const eventRow = document.createElement('tr');
        eventRow.innerHTML = `<td>${event.time}</td><td>${event.description}</td><td>${event.place}</td>`;
        eventsTable.appendChild(eventRow);
    });
}

function switchLanguage(lang) {
    const translations = {
        kz: {
            heading: '«DIGITAL KAZAKHSTAN: ЗАМАНАУИ БІЛІМ БЕРУ» педагогтердің республикалық тамыз саммиті',
            label: 'тіркелу үшін ЖСН жазыңыз',
            button: 'Іздеу',
            section: 'Бөлім:',
            place: 'Орны:',
            eventsHeading: 'Саммит бағдарламасы',
            eventsTime: 'Уақыты',
            eventsDescription: 'Іс-шара',
            pdfDownload: 'Документтер',
            pdfView: 'Саммит материалдары',
            resultName: 'Аты-жөні:'
        },
        ru: {
            heading: 'Республиканский августовский саммит педагогов «DIGITAL KAZAKHSTAN: ОБРАЗОВАНИЕ В НОВОЙ РЕАЛЬНОСТИ»',
            label: 'укажите ИИН для регистрации',
            button: 'Поиск',
            section: 'Секция:',
            place: 'Место:',
            eventsHeading: 'Программа саммита',
            eventsTime: 'Время',
            eventsDescription: 'Мероприятие',
            pdfDownload: 'Документы',
            pdfView: 'Материалы саммита',
            resultName: 'ФИО:'
        }
    };
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
}

displayEvents();
switchLanguage('kz');