document.addEventListener('DOMContentLoaded', function() {
    const guruTable = document.getElementById('guruTable').getElementsByTagName('tbody')[0];

    function loadGuru() {
        axios.get('http://localhost:8080/api/guru')
            .then(response => {
                guruTable.innerHTML = '';
                response.data.forEach(guru => {
                    const row = guruTable.insertRow();
                    row.insertCell(0).textContent = guru.id;
                    row.insertCell(1).textContent = guru.nama;
                    row.insertCell(2).textContent = guru.nip;
                    row.insertCell(3).textContent = guru.alamat;
                    row.insertCell(4).textContent = guru.nomorTelepon;

                    const actionsCell = row.insertCell(5);
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Update';
                    updateButton.classList.add('btn', 'btn-warning', 'mr-2');
                    updateButton.onclick = function() {
                        window.location.href = `update.html?id=${guru.id}`;
                    };
                    actionsCell.appendChild(updateButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.onclick = function() {
                        axios.delete(`http://localhost:8080/api/guru/${guru.id}`)
                            .then(() => loadGuru())
                            .catch(error => console.error('Error deleting guru:', error));
                    };
                    actionsCell.appendChild(deleteButton);
                });
            })
            .catch(error => console.error('Error loading guru:', error));
    }

    loadGuru();
});
