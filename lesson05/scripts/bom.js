document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button');
    const list = document.querySelector('#list');
    const errorMessage = document.querySelector('#error-message');
    
    
    button.addEventListener('click', () => {
        errorMessage.textContent = '';
        
        if (input.value !='') {
            const li = document.createElement('li');
            li.textContent = input.value;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';

            li.append(deleteButton);
            list.append(li);

            deleteButton.addEventListener('click', () => {
                list.removeChild(li);
                input.focus();
            });

            input.value = '';
            input.focus();
        }
        else {
            errorMessage.textContent = 'Please enter a chapter.';
            input.focus();
        }
    });
});