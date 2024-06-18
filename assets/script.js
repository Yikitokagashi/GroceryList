document.addEventListener('DOMContentLoaded', () => {
    const groceryForm = document.getElementById('groceryForm');
    const groceryTableBody = document.querySelector('#groceryTable tbody');
    const overallTotalDisplay = document.getElementById('overallTotal');

    let groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

    function updateTable() {
        groceryTableBody.innerHTML = '';
        let overallTotal = 0;

        groceryList.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = item.image;
            img.style.width = '50px';
            img.style.height = '50px';
            imgCell.appendChild(img);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            
            const totalCell = document.createElement('td');
            const total = item.price * item.quantity;
            totalCell.textContent = `$${total.toFixed(2)}`;
            
            overallTotal += total;
            
            row.appendChild(imgCell);
            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(totalCell);
            
            groceryTableBody.appendChild(row);
        });

        overallTotalDisplay.textContent = `Overall Total: $${overallTotal.toFixed(2)}`;
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
    }

    groceryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('itemName').value;
        const price = parseFloat(document.getElementById('itemPrice').value);
        const quantity = parseInt(document.getElementById('itemQuantity').value);
        const imageFile = document.getElementById('itemImage').files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const imageDataUrl = reader.result;
            groceryList.push({ name, price, quantity, image: imageDataUrl });
            updateTable();
            groceryForm.reset();
        };

        reader.readAsDataURL(imageFile);
    });

    updateTable();
});
