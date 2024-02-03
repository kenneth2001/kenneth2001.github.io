const notes = [
    {'title': 'Homebrew - Basic', 'file': './notes/Homebrew - Basic.html', 'last_updated': '2024-02-03', 'tag': ['mac']}, 
    {'title': 'Conda - Basic', 'file': './notes/Conda - Basic.html', 'last_updated': '2024-01-21', 'tag': ['conda', 'python']}, 
    {'title': 'Git - Basic', 'file': './notes/Git - Basic.html', 'last_updated': '2024-02-02', 'tag': ['git']}
]


let sortOrder = {
    title: 'asc',
    last_updated: 'asc'
};

// Revised loadNotes function
function loadNotes(notesToDisplay = notes) {
    const tableBody = document.getElementById('notesBody');
    tableBody.innerHTML = ''; // Clear the table body
    notesToDisplay.forEach(note => {
        // let tagsHtml = note.tag.map(t => `<span class="tag-${t.toLowerCase()}">${t}</span>`).join(' ');
        let row = `<tr>
            <td><a href="#" onclick="loadNoteContent('${note.file}', event)">${note.title}</a></td>
            <td>${note.last_updated}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to load note content into the noteDisplay area
function loadNoteContent(filePath, event) {
    event.preventDefault(); // Prevent default anchor behavior

    const noteDisplayIframe = document.getElementById('note-display');
    const container = document.querySelector('.row.flex-fill');
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    noteDisplayIframe.src = filePath;

    // For mobile view, hide the table container and show the note display
    if (isMobile) {
        container.classList.add('sidebar-hidden');
        document.body.classList.add('note-selected');
    }
}


function sortTable(column) {
    notes.sort((a, b) => {
        if (column === 'title') {
            return sortOrder[column] === 'asc' ?
                a.title.localeCompare(b.title) :
                b.title.localeCompare(a.title);
        } else if (column === 'last_updated') {
            return sortOrder[column] === 'asc' ?
                new Date(a.last_updated) - new Date(b.last_updated) :
                new Date(b.last_updated) - new Date(a.last_updated);
        }
    });

    // Toggle sort order for next click
    sortOrder[column] = sortOrder[column] === 'asc' ? 'desc' : 'asc';

    // Re-render the sorted notes
    const tableBody = document.getElementById('notesBody');
    tableBody.innerHTML = '';
    notes.forEach(note => {
        let tagsHtml = note.tag.map(t => `<span class="tag-${t.toLowerCase()}">${t}</span>`).join(' ');
        let row = `<tr>
                    <td><a href="${note.file}" target="_blank">${note.title}</a></td>
                    <td>${note.last_updated}</td>
                    <td>${tagsHtml}</td>
                </tr>`;
        tableBody.innerHTML += row;
    });

    updateSortIndicators(column, sortOrder[column]);

    // If sortTable is called directly (not by a click event), sortOrder needs to be set to 'asc' initially
    if (!sortOrder[column]) {
        sortOrder[column] = 'asc';
    }

    loadNotes(notes)
}

function updateSortIndicators(sortedColumn, order) {
    // Clear existing indicators
    document.querySelectorAll("#notesTable th span").forEach(span => span.textContent = '');

    // Set the indicator for the currently sorted column
    const indicator = order === 'asc' ? '↑' : '↓';
    document.querySelector(`#sortIndicator-${sortedColumn}`).textContent = indicator;
}

function searchNotes() {
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    const selectedTag = document.getElementById('tagFilter').value;

    const filteredNotes = notes.filter(note => {
        const matchesSearchText = searchText === "" || note.title.toLowerCase().includes(searchText) ||
            note.last_updated.toLowerCase().includes(searchText) ||
            note.tag.some(tag => tag.toLowerCase().includes(searchText));

        const matchesTag = selectedTag === "" || note.tag.includes(selectedTag);

        return matchesSearchText && matchesTag;
    });

    loadNotes(filteredNotes);
}

// Function to populate the tag filter dropdown
function populateTagFilter() {
    const allTags = [...new Set(notes.flatMap(note => note.tag))];
    const tagFilter = document.getElementById('tagFilter');
    allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        tagFilter.appendChild(option);
    });
}

function filterNotes() {
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    const selectedTag = document.getElementById('tagFilter').value;

    const filteredNotes = notes.filter(note => {
        const matchesSearchText = searchText === "" || note.title.toLowerCase().includes(searchText) ||
            note.last_updated.toLowerCase().includes(searchText) ||
            note.tag.some(tag => tag.toLowerCase().includes(searchText));

        const matchesTag = selectedTag === "" || note.tag.includes(selectedTag);

        return matchesSearchText && matchesTag;
    });

    loadNotes(filteredNotes);
}

function searchNotes() {
    filterNotes();
}

function filterByTag() {
    filterNotes();
}

function toggleTable() {
    var tableContainer = document.querySelector('.table-container');
    var toggleBtn = document.getElementById('toggleTableBtn');
    if (tableContainer.style.display === "none") {
        tableContainer.style.display = "block";
        toggleBtn.textContent = 'Hide Table';
    } else {
        tableContainer.style.display = "none";
        toggleBtn.textContent = 'Show Table';
    }
}

function toggleSidebar() {
    var container = document.querySelector('.row.flex-fill');
    var toggleButton = document.querySelector('.sidebar-toggle');

    container.classList.toggle('sidebar-hidden');
    toggleButton.classList.toggle('sidebar-toggle-left');

    // Check if the sidebar is being shown (meaning we are hiding the note and showing the list)
    if (!container.classList.contains('sidebar-hidden') && window.innerWidth < 768) {
        // Remove the class that indicates a note is selected
        document.body.classList.remove('note-selected');
    }

    // Update the arrow direction based on the sidebar visibility
    if (container.classList.contains('sidebar-hidden')) {
        toggleButton.innerHTML = "&gt;"; // Right arrow when sidebar is hidden
    } else {
        toggleButton.innerHTML = "&lt;"; // Left arrow when sidebar is visible
    }
}

// Update window.onload to also populate the tag filter
window.onload = function () {
    loadNotes();
    populateTagFilter();
    sortTable('title'); // Add this line to sort by title on page load
};
