(function() {
  const publicationsContainer = document.querySelector('.card-body');
  if (!publicationsContainer) return;
  
  publicationsContainer.innerHTML = '<p>Loading publications...</p>';
  
  fetch('../data/publications.json')
    .then(response => {
      if (!response.ok) throw new Error(`Load failed: ${response.status}`);
      return response.json();
    })
    .then(pubData => {
      let html = '<h3>All Publications</h3>';
      
      pubData.forEach(yearGroup => {
        html += `<h5>${yearGroup.year}</h5>`;
        html += '<ul class="list-unstyled">';
        
        yearGroup.items.forEach(pub => {
          html += `
            <li class="publication-item">
              <a href="${pub.link}" class="publication-link" target="_blank" rel="noopener">
                ${pub.authors}<br>
                <strong>${pub.title}</strong><br>
                <em>${pub.journal}</em>
              </a>
            </li>
          `;
        });
        
        html += '</ul>';
      });
      
      publicationsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Publications load error:', error);
      publicationsContainer.innerHTML = '<p>Publications temporarily unavailable.</p>';
    });
})();