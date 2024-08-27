const accessoriesList = document.getElementById('accessories-list');

// make API call to retrieve accessories from backend
fetch('/api/accessories')
    .then(response => response.json())
    .then(data => {
        // Clear the existing list items
        accessoriesList.innerHTML = '';
        data.filter(accessory => accessory.name !== 'Earbuds').forEach((accessory) => {

     
           
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${accessory.image}" alt="${accessory.name}">
                <h2>${accessory.name}</h2>
                <p>Price: $${accessory.price}</p>
            `;
            accessoriesList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
