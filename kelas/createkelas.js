document.addEventListener('DOMContentLoaded', function() {
    // Load Jurusan options
    axios.get('http://localhost:8080/api/jurusan')
        .then(response => {
            const jurusanSelect = document.getElementById('jurusanId');
            response.data.forEach(jurusan => {
                const option = document.createElement('option');
                option.value = jurusan.id;
                option.textContent = jurusan.namaJurusan;
                jurusanSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading jurusan:', error));

    // Handle form submission
    document.getElementById('kelasForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const namaKelas = document.getElementById('namaKelas').value;
        const jurusanId = document.getElementById('jurusanId').value;

        axios.post('http://localhost:8080/api/kelas', {
            namaKelas,
            jurusan: {
                id: jurusanId
            }
        })
        .then(response => {
            alert('Kelas created successfully!');
            window.location.href = 'home.html';
        })
        .catch(error => console.error('Error creating kelas:', error));
    });
});
