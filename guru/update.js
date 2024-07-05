document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guruId = urlParams.get('id');

    if (!guruId) {
        alert('Guru ID is required');
        window.location.href = 'home.html';
    }

    const form = document.getElementById('updateForm');

    axios.get(`http://localhost:8080/api/guru/${guruId}`)
        .then(response => {
            const guru = response.data;
            document.getElementById('nama').value = guru.nama;
            document.getElementById('nip').value = guru.nip;
            document.getElementById('alamat').value = guru.alamat;
            document.getElementById('nomorTelepon').value = guru.nomorTelepon;
        })
        .catch(error => console.error('Error fetching guru:', error));

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedGuru = {
            nama: document.getElementById('nama').value,
            nip: document.getElementById('nip').value,
            alamat: document.getElementById('alamat').value,
            nomorTelepon: document.getElementById('nomorTelepon').value
        };

        axios.put(`http://localhost:8080/api/guru/${guruId}`, updatedGuru)
            .then(() => {
                alert('Guru updated successfully!');
                window.location.href = 'home.html';
            })
            .catch(error => console.error('Error updating guru:', error));
    });
});
