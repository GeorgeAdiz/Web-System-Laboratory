const songTitleForm = document.querySelector('#add-song-title'); 
const songArtistForm = document.querySelector('#add-artist'); 
const addButton = document.querySelector('#add-button');

let songTitleValue = '';
let songArtistValue = '';

// SONG title input
songTitleForm.addEventListener('input', function(e) {
    songTitleValue = e.target.value;
});

// SONG artist input
songArtistForm.addEventListener('input', function(e) {
    songArtistValue = e.target.value;
});

// Add button
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if both title and artist are filled
    if (songTitleValue && songArtistValue) {
        addSongToPlaylist(songTitleValue, songArtistValue);
    } else {
        alert('Both fields are required!');
    }
});

// add the SONG to the playlist
function addSongToPlaylist(title, artist) {
    // Create new list item
    const li = document.createElement('li');
    li.classList.add('list-searchpart'); 

    const songtitle = document.createElement('p');
    const songartist = document.createElement('small');
    const deleteBtn = document.createElement('button');
    const hr = document.createElement('hr');

    
    songtitle.textContent = title;
    songartist.textContent = artist;
    deleteBtn.textContent = 'Delete';

    
    deleteBtn.classList.add('delete');
    songtitle.classList.add('song-title');
    songartist.classList.add('artist');

    // Create a wrapper div for title and artist
    const songInfoDiv = document.createElement('div');
    songInfoDiv.classList.add('song-info');
    songInfoDiv.appendChild(songtitle);
    songInfoDiv.appendChild(songartist);

    // Append elements to the <li>
    li.appendChild(songInfoDiv);  
    li.appendChild(deleteBtn);

    
    const list = document.querySelector('#song-list ul');
    list.appendChild(li);
    list.appendChild(hr);

    // Reset the forms after adding
    songTitleForm.reset();
    songArtistForm.reset();

    // Clear the stored values
    songTitleValue = '';
    songArtistValue = '';
}

// Handle the delete functionality
const list = document.querySelector('#song-list ul');

list.addEventListener('click', function(e) {
    if (e.target.className === 'delete') {
        const li = e.target.parentElement;
        const hr = li.nextElementSibling;

        if (hr && hr.tagName === 'HR') {
            hr.parentNode.removeChild(hr);
        }
        list.removeChild(li);
    }
});

// searchbar
const searchBar = document.querySelector('.search-song-part'); 
const List = document.querySelector('#song-list ul');

searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase(); 
    const songItems = list.getElementsByTagName('li'); 

    Array.from(songItems).forEach(function(songItem) {
        const title = songItem.querySelector('.song-title').textContent; 

        // Check if the title contains the search term
        if (title.toLowerCase().indexOf(term) !== -1) {
            songItem.style.display = 'flex';
        } else {
            songItem.style.display = 'none';
        }
    });

    // Ensure HRs remain visible
    const hrElements = list.querySelectorAll('hr');
    hrElements.forEach(hr => {
        // Control visibility of HR based on previous and next li visibility
        const prevLiVisible = hr.previousElementSibling && hr.previousElementSibling.style.display !== 'none';
        const nextLiVisible = hr.nextElementSibling && hr.nextElementSibling.style.display !== 'none';
        hr.style.display = (prevLiVisible || nextLiVisible) ? 'block' : 'none';
    });
});