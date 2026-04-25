document.addEventListener('DOMContentLoaded', () => {
  const projectLinks = document.querySelectorAll('.project-link, .subproject-link');

  projectLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const imageId = link.getAttribute('data-image');
      if (imageId) {
        const targetImg = document.getElementById(imageId);
        if (targetImg) {
          // Сначала убираем active у всех, чтобы не было наслоений
          document.querySelectorAll('.preview-img').forEach(img => img.classList.remove('active'));
          // Добавляем active нужной
          targetImg.classList.add('active');
        }
      }
    });

    link.addEventListener('mouseleave', () => {
      document.querySelectorAll('.preview-img').forEach(img => img.classList.remove('active'));
    });
  });

  // Логика аккордеона (твоя без изменений, просто почищенная)
  document.querySelectorAll('.project-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.project-item');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.project-item.is-open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('is-open');
      });

      item.classList.toggle('is-open');
    });
  });
});

