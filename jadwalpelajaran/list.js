document.addEventListener('DOMContentLoaded', function() {
    axios.get('http://localhost:8080/api/jadwalpelajaran')
        .then(response => {
            const jadwalList = document.getElementById('jadwalList');
            response.data.forEach(jadwal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${jadwal.id}</td>
                    <td>${jadwal.kelas ? jadwal.kelas.namaKelas : ''}</td>
                    <td>${jadwal.guru ? jadwal.guru.nama : ''}</td>
                    <td>${jadwal.hari}</td>
                    <td>${jadwal.jamMulai}</td>
                    <td>${jadwal.jamSelesai}</td>
                    <td>
                        <button onclick="deleteJadwal(${jadwal.id})">Delete</button>
                        <a href="update.html?id=${jadwal.id}">Update</a>
                    </td>
                `;
                jadwalList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was an error retrieving the Jadwal Pelajaran!', error);
        });
});

function deleteJadwal(id) {
    axios.delete(`http://localhost:8080/api/jadwalpelajaran/${id}`)
        .then(response => {
            alert('Jadwal Pelajaran deleted successfully');
            window.location.reload();
        })
        .catch(error => {
            console.error('There was an error deleting the Jadwal Pelajaran!', error);
        });
}
