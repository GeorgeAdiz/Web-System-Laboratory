const API_URL = 'http://localhost:4000/api/songs';

const songTitleForm = document.querySelector('#song-title');
const songArtistForm = document.querySelector('#artist');
const addButton = document.querySelector('#add-button');

let songTitleValue = '';
let songArtistValue = '';

// SONG title input
songTitleForm.addEventListener('input', function (e) {
    songTitleValue = e.target.value;
});

// SONG artist input
songArtistForm.addEventListener('input', function (e) {
    songArtistValue = e.target.value;
});

// Add button
addButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (songTitleValue && songArtistValue) {
        addSongToServer(songTitleValue, songArtistValue);
    } else {
        alert('Both fields are required!');
    }
});

// Fetch and render all songs on page load
async function fetchAndRenderSongs() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch songs');
        }
        const songs = await response.json();

        songs.forEach((song) => {
            addSongToPlaylist(song.song, song.artist, song._id);
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
        alert('Failed to fetch songs. Please try again.');
    }
}

// Add the song to the server
async function addSongToServer(title, artist) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ song: title, artist }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add song');
        }

        const newSong = await response.json();
        addSongToPlaylist(newSong.song, newSong.artist, newSong._id);
    } catch (error) {
        console.error('Error adding song:', error);
        alert('Failed to add song. Please try again.');
    }
}

// Add the song to the playlist DOM
function addSongToPlaylist(title, artist, id) {
    const li = document.createElement('li');
    li.classList.add('list-searchpart');
    li.dataset.id = id;

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

    const songInfoDiv = document.createElement('div');
    songInfoDiv.classList.add('song-info');
    songInfoDiv.appendChild(songtitle);
    songInfoDiv.appendChild(songartist);

    li.appendChild(songInfoDiv);
    li.appendChild(deleteBtn);

    const list = document.querySelector('#song-list ul');
    list.appendChild(li);
    list.appendChild(hr);

    songTitleForm.value = '';
    songArtistForm.value = '';
}

// Handle delete functionality
const list = document.querySelector('#song-list ul');

list.addEventListener('click', async function (e) {
    if (e.target.className === 'delete') {
        const li = e.target.parentElement;
        const songId = li.dataset.id;

        try {
            await deleteSongFromServer(songId);
            list.removeChild(li);
        } catch (error) {
            console.error('Error deleting song:', error);
            alert('Failed to delete song. Please try again.');
        }
    }
});

// Delete song from server
async function deleteSongFromServer(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete song');
    }
}
// Search bar functionality
const searchBar = document.querySelector('.search-song-part');

searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const songItems = list.getElementsByTagName('li');

    Array.from(songItems).forEach(function (songItem) {
        const title = songItem.querySelector('.song-title').textContent;

        if (title.toLowerCase().indexOf(term) !== -1) {
            songItem.style.display = 'flex';
        } else {
            songItem.style.display = 'none';
        }
    });

    const hrElements = list.querySelectorAll('hr');
    hrElements.forEach((hr) => {
        const prevLiVisible =
            hr.previousElementSibling && hr.previousElementSibling.style.display !== 'none';
        const nextLiVisible =
            hr.nextElementSibling && hr.nextElementSibling.style.display !== 'none';
        hr.style.display = prevLiVisible || nextLiVisible ? 'block' : 'none';
    });
});

// Fetch and render songs on page load
fetchAndRenderSongs();
