const apiUrl = 'http://localhost:8080/api/jadwalpelajaran';

// Create Jadwal Pelajaran
document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = {
        kelas: document.getElementById('kelas').value,
        guru: document.getElementById('guru').value,
        hari: document.getElementById('hari').value,
        jamMulai: document.getElementById('jamMulai').value,
        jamSelesai: document.getElementById('jamSelesai').value
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Jadwal Pelajaran created successfully');
        window.location.href = 'list.html';
    })
    .catch(error => console.error('Error:', error));
});

// List Jadwal Pelajaran
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('jadwalList')) {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const jadwalList = document.getElementById('jadwalList');
            data.forEach(jadwal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${jadwal.id}</td>
                    <td>${jadwal.kelas}</td>
                    <td>${jadwal.guru}</td>
                    <td>${jadwal.hari}</td>
                    <td>${jadwal.jamMulai}</td>
                    <td>${jadwal.jamSelesai}</td>
                    <td>
                        <button onclick="editJadwal(${jadwal.id})">Edit</button>
                        <button onclick="deleteJadwal(${jadwal.id})">Delete</button>
                    </td>
                `;
                jadwalList.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }
});

// Edit Jadwal Pelajaran
function editJadwal(id) {
    fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('id').value = data.id;
        document.getElementById('kelas').value = data.kelas;
        document.getElementById('guru').value = data.guru;
        document.getElementById('hari').value = data.hari;
        document.getElementById('jamMulai').value = data.jamMulai;
        document.getElementById('jamSelesai').value = data.jamSelesai;
        window.location.href = 'update.html';
    })
    .catch(error => console.error('Error:', error));
}

// Update Jadwal Pelajaran
document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const data = {
        kelas: document.getElementById('kelas').value,
        guru: document.getElementById('guru').value,
        hari: document.getElementById('hari').value,
        jamMulai: document.getElementById('jamMulai').value,
        jamSelesai: document.getElementById('jamSelesai').value
    };
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Jadwal Pelajaran updated successfully');
        window.location.href = 'list.html';
    })
    .catch(error => console.error('Error:', error));
});

// Delete Jadwal Pelajaran
function deleteJadwal(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Jadwal Pelajaran deleted successfully');
            window.location.reload();
        } else {
            alert('Failed to delete Jadwal Pelajaran');
        }
    })
    .catch(error => console.error('Error:', error));
}
