document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="home.html">Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="../index.html">Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="create.html">Create</a>
            </li>
        </ul>
    </div>
</nav>

    `;
});
