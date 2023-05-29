const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('click', (event) => {
        const postId = event.currentTarget.getAttribute('data-post-id');
        
        document.location.assign(`/posts/${postId}`);
    });
});