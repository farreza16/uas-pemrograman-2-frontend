document.addEventListener('DOMContentLoaded', function() {
    const kelasSelect = document.getElementById('kelas');
    const guruSelect = document.getElementById('guru');

    // Fetch available Kelas
    axios.get('http://localhost:8080/api/kelas')
        .then(response => {
            response.data.forEach(kelas => {
                const option = document.createElement('option');
                option.value = kelas.id;
                option.textContent = kelas.namaKelas;
                kelasSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the Kelas!', error);
        });

    // Fetch available Guru
    axios.get('http://localhost:8080/api/guru')
        .then(response => {
            response.data.forEach(guru => {
                const option = document.createElement('option');
                option.value = guru.id;
                option.textContent = guru.nama;
                guruSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the Guru!', error);
        });

    // Handle form submission
    document.getElementById('createJadwalForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const jadwalPelajaran = {
            kelas: { id: kelasSelect.value },
            guru: { id: guruSelect.value },
            hari: document.getElementById('hari').value,
            jamMulai: document.getElementById('jamMulai').value,
            jamSelesai: document.getElementById('jamSelesai').value
        };

        axios.post('http://localhost:8080/api/jadwalpelajaran', jadwalPelajaran)
            .then(response => {
                alert('Jadwal Pelajaran created successfully');
                window.location.href = 'list.html';
            })
            .catch(error => {
                console.error('There was an error creating the Jadwal Pelajaran!', error);
            });
    });
});
