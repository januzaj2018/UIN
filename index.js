document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('id').value.trim();

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // skip header row
            let section = 'ИИН не найден';
            rows.forEach(row => {
                const [csvId, csvSection] = row.split(',');
                if (csvId.trim() === id) {
                    section = csvSection.trim(); // Trim any extra spaces
                }
            });

            console.log(typeof(section)); // For debugging purposes

            document.getElementById('section').innerText = `Секция: ${section}`;

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
                "11": "Конференц зал Library"
            };

            // Check if the section is a valid key in the dictionary
            const place = sectionToPlace[section] || "Unknown place";
            document.getElementById('place').innerHTML = `Өтетін орны: ${place}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
