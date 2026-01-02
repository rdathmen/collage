document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage && currentPage !== 'cards.php' && currentPage !== 'index.php') {
        fetch('../Pages/save_progress.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_page: currentPage
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Progress saved:', data);
            })
            .catch((error) => {
                console.error('Error saving progress:', error);
            });
    }
});
