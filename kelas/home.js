document.addEventListener('DOMContentLoaded', function() {
    const kelasTable = document.getElementById('kelasTable').getElementsByTagName('tbody')[0];

    function loadKelas() {
        axios.get('http://localhost:8080/api/kelas')
            .then(response => {
                console.log('Kelas data:', response.data); // Debugging line
                kelasTable.innerHTML = '';
                response.data.forEach(kelas => {
                    const row = kelasTable.insertRow();
                    row.insertCell(0).textContent = kelas.id;
                    row.insertCell(1).textContent = kelas.namaKelas;
                    row.insertCell(2).textContent = kelas.jurusan.namaJurusan;

                    const actionsCell = row.insertCell(3);
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Update';
                    updateButton.classList.add('btn', 'btn-warning', 'mr-2');
                    updateButton.onclick = function() {
                        window.location.href = `update.html?id=${kelas.id}`;
                    };
                    actionsCell.appendChild(updateButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.onclick = function() {
                        axios.delete(`http://localhost:8080/api/kelas/${kelas.id}`)
                            .then(() => loadKelas())
                            .catch(error => console.error('Error deleting kelas:', error));
                    };
                    actionsCell.appendChild(deleteButton);
                });
            })
            .catch(error => console.error('Error loading kelas:', error));
    }

    loadKelas();
});
