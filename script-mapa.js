const paths = document.querySelectorAll('path');
const tooltip = document.querySelector('.tooltip');

paths.forEach((path) => {
  path.addEventListener('mouseover', (e) => {
    const name = e.target.getAttribute('data-name');
    tooltip.textContent = name; 
    tooltip.style.display = 'block';
  });

  path.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
    tooltip.style.left = x + 10 + 'px';
    tooltip.style.top = y - 30 + 'px';
  });

  path.addEventListener('mouseout', () => {
    tooltip.style.display = 'none';
  });
});

