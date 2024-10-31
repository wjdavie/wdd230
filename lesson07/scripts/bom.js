document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button');
    const list = document.querySelector('#list');
    const errorMessage = document.querySelector('#error-message');

    let chaptersArray = getChapterList() || [];

    chaptersArray.forEach(chapter => {
        displayList(chapter);        
    });
    
    
    button.addEventListener('click', () => {
        errorMessage.textContent = '';
        
        if (input.value !='') {
            displayList(input.value);
            chaptersArray.push(input.value);
            setChapterList();
            input.value = '';
            input.focus();
        } else {
            errorMessage.textContent = 'Please enter a chapter.';
            input.focus();
        }
    });

    function displayList(item) {
        let li = document.createElement('li');
        let deletebutton = document.createElement('button');
        li.textContent = item;
        deletebutton.textContent = '❌';
        deletebutton.classList.add('delete');
        li.append(deletebutton);
        list.append(li);

        deletebutton.addEventListener('click', function () {
            list.removeChild(li);
            deleteChapter(li.textContent);
            input.focus();
        });
    }

    function setChapterList() {
        localStorage.setItem('myList', JSON.stringify(chaptersArray));
    }

    function getChapterList() {
        return JSON.parse(localStorage.getItem('myList'));
    }

    function deleteChapter(chapter) {
        chapter = chapter.slice(0,chapter.length - 1);
        chaptersArray = chaptersArray.filter((item) => item !== chapter);
        setChapterList();
    }
});