const links = document.querySelectorAll('.project-link');
const container = document.getElementById('hover-img-container');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const imgUrl = link.getAttribute('data-img');
        container.style.backgroundImage = `url(${imgUrl})`;
        container.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        container.classList.remove('active');
    });
    const links = document.querySelectorAll('.project-link');
const previews = document.querySelectorAll('.preview-img');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const id = link.getAttribute('data-image');
        const targetImg = document.getElementById(id);
        if (targetImg) targetImg.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        const id = link.getAttribute('data-image');
        const targetImg = document.getElementById(id);
        if (targetImg) targetImg.classList.remove('active');
    });
});
});
document.querySelectorAll('.project-link').forEach(link => {
    const hoverImage = document.getElementById('hover-image');

    link.addEventListener('mouseenter', () => {
        const imageUrl = link.getAttribute('data-image');
        if (imageUrl) {
            hoverImage.src = imageUrl;
            hoverImage.classList.add('active');
        }
    });

    link.addEventListener('mouseleave', () => {
        hoverImage.classList.remove('active');
    });
});