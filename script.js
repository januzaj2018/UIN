document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('id').value.trim();

    fetch('data.json')  // Fetch the JSON file
        .then(response => response.json())  // Parse the JSON file
        .then(data => {
            let section = 'ID not found';
            data.forEach(item => {
                if (item.id === id) {
                    section = item.section;
                }
            });

            document.getElementById('section').innerText = `Section: ${section}`;

            const sectionToPlace = {
                "1": "Ball room",
                "2": "Ball room",
                "3": "1009/1",
                "4": "2.003",
                "5": "Ball room",
                "6": "1010/1",
                "7": "2.004/1",
                "8": "Ball room",
                "9": "2001",
                "10": "2002/2",
                "11": "Conference hall Library"
            };

            const place = sectionToPlace[section] || "Unknown place";
            document.getElementById('place').innerHTML = `Place: ${place}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const events = [
    {time: "08:00-09:00", description: "Тіркелу"},
    {time: "09:00-09:45", description: "«Мастер - дәріс», Хартман Дуглас, Мичиган мемлекттің университетінің профессоры"},
    {time: "10:00-12:30", description: "Секциялық отырыстар"},
    {time: "12:30-14:00", description: "Үзіліс"},
    {time: "14:00", description: "Цифрлық көрме жұмысымен танысу"},
    {time: "14:30-14:50", description: "«Қазақстан мұғалімі» ұлттық премиясының Үздік-50 финалистінің тұсаукесері"},
    {time: "15:00-16:00", description: "Пленарлық сессия, Бірінші сессия"},
    {time: "16:00-17:00", description: "Пленарлық сессия, Екінші сессия"},
    {time: "17:00", description: "Тамыз Саммиті жұмысының жабылуы"}
];

function displayEvents() {
    const eventsTable = document.getElementById('events');
    events.forEach(event => {
        const eventRow = document.createElement('tr');
        eventRow.innerHTML = `<td>${event.time}</td><td>${event.description}</td>`;
        eventsTable.appendChild(eventRow);
    });
}

function switchLanguage(lang) {
    const translations = {
        kz: {
            heading: '«DIGITAL KAZAKHSTAN: ЗАМАНАУИ БІЛІМ БЕРУ» ПЕДАГОГТЕРДІҢ САММИТІ',
            label: 'тіркелу үшін ЖСН жазыңыз',
            button: 'Іздеу',
            section: 'Бөлім:',
            place: 'Орны:',
            eventsHeading: 'Іс-шаралар',
            eventsTime: 'Уақыты',
            eventsDescription: 'Сипаттамасы',
            pdfDownload: 'Документтер'
        },
        ru: {
            heading: 'САММИТ ПЕДАГОГОВ "DIGITAL KAZAKHSTAN: СОВРЕМЕННОЕ ОБРАЗОВАНИЕ"',
            label: 'укажите ИИН для регистрации',
            button: 'Поиск',
            section: 'Секция:',
            place: 'Место:',
            eventsHeading: 'Мероприятие',
            eventsTime: 'Время',
            eventsDescription: 'Описание',
            pdfDownload: 'Документы'
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