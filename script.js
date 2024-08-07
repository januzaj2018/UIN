const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw8n5epzzG67daKECYgPhwgCNLgv3UoikTjqADIB5iiUcL1lfwjjF_BABOZQxwpZUtzNg/exec";

document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('id').value.trim();

    // Log the search data to Google Sheets
    fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'cors',  // Ensure CORS is enabled
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Search logged');
            } else {
                console.error('Error logging search:', data);
            }
        })
        .catch(error => {
            console.error('Error logging search:', error);
        });

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // skip header row
            let section = 'ID not found';
            rows.forEach(row => {
                const [csvId, csvSection] = row.split(',');
                if (csvId.trim() === id) {
                    section = csvSection.trim(); // Trim any extra spaces
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

            // Check if the section is a valid key in the dictionary
            const place = sectionToPlace[section] || "Unknown place";
            document.getElementById('place').innerHTML = `Place: ${place}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const events = [
    {time: "09:00", description: "Event 1"},
    {time: "10:00", description: "Event 2"},
    {time: "11:00", description: "Event 3"},
    {time: "12:00", description: "Event 4"},
    {time: "13:00", description: "Event 5"},
    {time: "14:00", description: "Event 6"},
    {time: "15:00", description: "Event 7"},
    {time: "16:00", description: "Event 8"},
    {time: "17:00", description: "Event 9"},
    {time: "18:00", description: "Event 10"},
    {time: "19:00", description: "Event 11"}
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
            heading: 'ЖСН бойынша іздеу',
            label: 'ЖСН енгізіңіз:',
            button: 'Іздеу',
            section: 'Бөлім:',
            place: 'Орны:',
            eventsHeading: 'Іс-шаралар',
            eventsTime: 'Уақыты',
            eventsDescription: 'Сипаттамасы'
        },
        en: {
            heading: 'ID Lookup',
            label: 'Enter ID:',
            button: 'Search',
            section: 'Section:',
            place: 'Place:',
            eventsHeading: 'Events',
            eventsTime: 'Time',
            eventsDescription: 'Description'
        },
        ru: {
            heading: 'Поиск по ИИН',
            label: 'Введите ИИН:',
            button: 'Поиск',
            section: 'Секция:',
            place: 'Место:',
            eventsHeading: 'Мероприятие',
            eventsTime: 'Время',
            eventsDescription: 'Описание'
        }
    };
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
}

console.log('Sending fetch request');
fetch(googleScriptUrl, {
    method: 'POST',
    mode: 'cors',  // Ensure CORS is enabled
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
})
    .then(response => {
        console.log('Received response:', response);
        return response.json();
    })
    .then(data => {
        console.log('Parsed response:', data);
        if (data.status === 'success') {
            console.log('Search logged');
        } else {
            console.error('Error logging search:', data);
        }
    })
    .catch(error => {
        console.error('Error logging search:', error);
    });

displayEvents();
switchLanguage('en');