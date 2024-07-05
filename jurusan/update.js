document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const kodeJurusan = params.get('kodeJurusan');
    const namaJurusan = params.get('namaJurusan');

    document.getElementById('jurusanId').value = id;
    document.getElementById('kodeJurusan').value = kodeJurusan;
    document.getElementById('namaJurusan').value = namaJurusan;

    document.getElementById('jurusanForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const id = document.getElementById('jurusanId').value.trim();
        const kodeJurusan = document.getElementById('kodeJurusan').value.trim();
        const namaJurusan = document.getElementById('namaJurusan').value.trim();

        if (!id || !kodeJurusan || !namaJurusan) {
            alert('Semua field harus diisi');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/api/jurusan/${id}`, {
                kodeJurusan,
                namaJurusan
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('Jurusan berhasil diperbarui');
                window.location.href = 'home.html';
            }
        } catch (error) {
            console.error('Error updating jurusan:', error);
            alert('Terjadi kesalahan saat memperbarui jurusan');
        }
    });
});
