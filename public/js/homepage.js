const cards = document.querySelectorAll('.card');

// Add on click handler to every post in homepage
cards.forEach((card) => {
    card.addEventListener('click', (event) => {
        // Retrieve post ID from card (post)
        const postId = event.currentTarget.getAttribute('data-post-id');
        
        // Forward user to the individual post page that will display its comments
        document.location.assign(`/posts/${postId}`);
    });
});