document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const kelasId = urlParams.get('id');

    if (!kelasId) {
        alert('No Kelas ID provided');
        window.location.href = 'home.html';
    }

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

            // Load existing Kelas data after Jurusan options are populated
            return axios.get(`http://localhost:8080/api/kelas/${kelasId}`);
        })
        .then(response => {
            document.getElementById('namaKelas').value = response.data.namaKelas;
            document.getElementById('jurusanId').value = response.data.jurusan.id;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error loading data');
            window.location.href = 'home.html';
        });

    // Handle form submission
    document.getElementById('kelasForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const namaKelas = document.getElementById('namaKelas').value;
        const jurusanId = document.getElementById('jurusanId').value;

        axios.put(`http://localhost:8080/api/kelas/${kelasId}`, {
            namaKelas,
            jurusan: {
                id: jurusanId
            }
        })
        .then(response => {
            alert('Kelas updated successfully!');
            window.location.href = 'home.html';
        })
        .catch(error => console.error('Error updating kelas:', error));
    });
});
