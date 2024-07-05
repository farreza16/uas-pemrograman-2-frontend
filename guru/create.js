document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const guru = {
            nama: document.getElementById('nama').value,
            nip: document.getElementById('nip').value,
            alamat: document.getElementById('alamat').value,
            nomorTelepon: document.getElementById('nomorTelepon').value
        };

        axios.post('http://localhost:8080/api/guru', guru)
            .then(() => {
                alert('Guru created successfully!');
                window.location.href = 'home.html';
            })
            .catch(error => console.error('Error creating guru:', error));
    });
});
