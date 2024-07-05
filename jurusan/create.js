document.getElementById('jurusanForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const kodeJurusan = document.getElementById('kodeJurusan').value.trim();
    const namaJurusan = document.getElementById('namaJurusan').value.trim();

    if (!kodeJurusan || !namaJurusan) {
        alert('Semua field harus diisi');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/jurusan', {
            kodeJurusan,
            namaJurusan
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            alert('Jurusan berhasil dibuat');
            document.getElementById('jurusanForm').reset();
        }
    } catch (error) {
        console.error('Error creating jurusan:', error);
        alert('Terjadi kesalahan saat membuat jurusan');
    }
});
