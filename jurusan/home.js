document.addEventListener('DOMContentLoaded', function() {
    fetchJurusan();
});

async function fetchJurusan() {
    try {
        const response = await axios.get('http://localhost:8080/api/jurusan', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const jurusanTable = document.getElementById('jurusanTable').getElementsByTagName('tbody')[0];
            jurusanTable.innerHTML = '';

            response.data.forEach(jurusan => {
                const row = jurusanTable.insertRow();
                row.insertCell(0).innerText = jurusan.id;
                row.insertCell(1).innerText = jurusan.kodeJurusan;
                row.insertCell(2).innerText = jurusan.namaJurusan;
                row.insertCell(3).innerHTML = `
                    <button class="btn btn-warning" onclick="editJurusan(${jurusan.id}, '${jurusan.kodeJurusan}', '${jurusan.namaJurusan}')">Update</button>
                    <button class="btn btn-danger" onclick="deleteJurusan(${jurusan.id})">Delete</button>
                `;
            });
        }
    } catch (error) {
        console.error('Error fetching jurusan:', error);
        alert('Terjadi kesalahan saat mengambil data jurusan');
    }
}

async function deleteJurusan(id) {
    if (!confirm('Apakah anda yakin ingin menghapus jurusan ini?')) return;

    try {
        const response = await axios.delete(`http://localhost:8080/api/jurusan/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            alert('Jurusan berhasil dihapus');
            fetchJurusan();
        }
    } catch (error) {
        console.error('Error deleting jurusan:', error);
        alert('Terjadi kesalahan saat menghapus jurusan');
    }
}

function editJurusan(id, kodeJurusan, namaJurusan) {
    window.location.href = `update.html?id=${id}&kodeJurusan=${kodeJurusan}&namaJurusan=${namaJurusan}`;
}
