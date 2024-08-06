document.getElementById('lookup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;

    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // skip header row
            let section = 'ID not found';
            rows.forEach(row => {
                const [csvId, csvSection] = row.split(',');
                if (csvId === id) {
                    section = `${csvSection}`;
                }
            });
            document.getElementById('result').innerText = section;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
