(function() {
  const grantsContainer = document.querySelector('.card-body');
  if (!grantsContainer) return;
  
  grantsContainer.innerHTML = '<p>Loading grants...</p>';
  
  fetch('../data/grants.json')
    .then(response => {
      if (!response.ok) throw new Error(`Load failed: ${response.status}`);
      return response.json();
    })
    .then(grantData => {
      let html = '<h3>Current and Past Funding Support</h3>';
      
      grantData.forEach(yearGroup => {
        html += `<h4>${yearGroup.year}</h4>`;
        html += '<ul class="list-unstyled">';
        
        yearGroup.items.forEach(grant => {
          html += `
            <li class="grant-item">
              <a class="grant-item-link" target="_blank" rel="noopener">
                ${grant.award}<br>
                <strong>${grant.title}</strong><br>
                <em>${grant.location}</em>
              </a>
            </li>
          `;
        });
        
        html += '</ul>';
      });
      
      grantsContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Grants load error:', error);
      grantsContainer.innerHTML = '<p>Grants temporarily unavailable.</p>';
    });
})();