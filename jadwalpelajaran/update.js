document.addEventListener("DOMContentLoaded", function () {
    const id = new URLSearchParams(window.location.search).get("id");
    const updateForm = document.getElementById("updateForm");

    // Fetch and populate Kelas options
    axios.get('http://localhost:8080/api/kelas')
        .then(response => {
            const kelasSelect = document.getElementById('kelas');
            response.data.forEach(kelas => {
                const option = document.createElement('option');
                option.value = kelas.id;
                option.textContent = kelas.namaKelas;
                kelasSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching kelas:', error));

    // Fetch and populate Guru options
    axios.get('http://localhost:8080/api/guru')
        .then(response => {
            const guruSelect = document.getElementById('guru');
            response.data.forEach(guru => {
                const option = document.createElement('option');
                option.value = guru.id;
                option.textContent = guru.nama;
                guruSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching guru:', error));

    // Fetch and populate the form with existing jadwal data
    axios.get(`http://localhost:8080/api/jadwalpelajaran/${id}`)
        .then(response => {
            const jadwal = response.data;
            document.getElementById('id').value = jadwal.id;
            document.getElementById('kelas').value = jadwal.kelas.id;
            document.getElementById('guru').value = jadwal.guru.id;
            document.getElementById('hari').value = jadwal.hari;
            document.getElementById('jamMulai').value = jadwal.jamMulai;
            document.getElementById('jamSelesai').value = jadwal.jamSelesai;
        })
        .catch(error => console.error('Error fetching jadwal pelajaran:', error));

    // Handle form submission
    updateForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const updatedJadwal = {
            id: document.getElementById('id').value,
            kelas: { id: document.getElementById('kelas').value },
            guru: { id: document.getElementById('guru').value },
            hari: document.getElementById('hari').value,
            jamMulai: document.getElementById('jamMulai').value,
            jamSelesai: document.getElementById('jamSelesai').value
        };

        axios.put(`http://localhost:8080/api/jadwalpelajaran/${id}`, updatedJadwal)
            .then(response => {
                alert('Jadwal Pelajaran updated successfully');
                window.location.href = 'list.html';
            })
            .catch(error => console.error('Error updating jadwal pelajaran:', error));
    });
});
