// script.js

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('#navbar a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetID = this.getAttribute('href');
            const targetElement = document.querySelector(targetID);
            const navbarHeight = document.getElementById('navbar').offsetHeight;

            // Adjust scroll speed for smaller screens
            const behavior = window.innerWidth <= 480 ? 'smooth' : 'auto';

            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth' // Apply smooth scrolling
            });
        });
    });
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle MENU items visibility
function toggleMenu() {
    const menuItems = document.getElementById("menuItems");
    menuItems.classList.toggle("active"); // Toggle the 'active' class
}

// Toggle FILTER items visibility
function toggleFilter() {
    const filterItems = document.getElementById("filterItems");
    filterItems.classList.toggle("active"); // Toggle the 'active' class
}

// Enable horizontal scroll with mouse wheel for gallery with smooth scrolling
const galleries = document.querySelectorAll('#gallery');

galleries.forEach(gallery => {
    gallery.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent default vertical scrolling

        // Get the width of one image, including margin, for precise scrolling
        const imageWidth = gallery.querySelector('img').clientWidth + parseInt(window.getComputedStyle(gallery.querySelector('img')).marginRight);

        // Scroll by the width of one image for each scroll
        gallery.scrollBy({
            left: e.deltaY > 0 ? imageWidth : -imageWidth, // Scroll left or right based on scroll direction
            behavior: 'smooth' // Enable smooth scrolling behavior
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.gallery');

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        const galleryWrapper = document.createElement('div');
        galleryWrapper.className = 'gallery-wrapper';

        // Clone images for infinite effect
        images.forEach(img => {
            galleryWrapper.appendChild(img.cloneNode(true));
        });

        gallery.appendChild(galleryWrapper);

        // Calculate the width of the gallery wrapper
        const galleryWidth = galleryWrapper.scrollWidth / 2;
        let scrollPosition = 0;

        // Adjust scroll position for seamless loop
        gallery.addEventListener('scroll', () => {
            scrollPosition = gallery.scrollLeft;

            if (scrollPosition >= galleryWidth) {
                gallery.scrollLeft = 0;
            }
        });

        // Handle horizontal scroll with mouse wheel
        gallery.addEventListener('wheel', (e) => {
            e.preventDefault(); // Prevent default vertical scrolling

            const imageWidth = gallery.querySelector('img').clientWidth + parseInt(window.getComputedStyle(gallery.querySelector('img')).marginRight);

            gallery.scrollBy({
                left: e.deltaY > 0 ? imageWidth : -imageWidth,
                behavior: 'smooth'
            });
        });

        // Initial scroll position to avoid visible jump
        gallery.scrollLeft = 0;
    });
});

let activeTags = [];

function toggle(tag) {
    const toggleItem = document.querySelector(`.toggle-container .toggle-item:has(.text#${tag}-text)`);
    const toggleElement = toggleItem.querySelector('.toggle');
    const textElement = document.getElementById(`${tag}-text`);
    const index = activeTags.indexOf(tag);

    // Toggle the tag's active state
    if (index === -1) {
        activeTags.push(tag);
        toggleElement.classList.add('active');
        textElement.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);
    } else {
        activeTags.splice(index, 1);
        toggleElement.classList.remove('active');
        textElement.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    // Apply filters to both artists and gallery
    filterArtists();
    filterGallery();
}

function filterArtists() {
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        const tags = card.getAttribute('data-tags').split(' ');
        const isVisible = activeTags.length === 0 || tags.some(tag => activeTags.includes(tag));
        card.classList.toggle('active-artist', isVisible);
    });
}

function filterGallery() {
    const galleryItems = document.querySelectorAll('.gallery_product');
    galleryItems.forEach(item => {
        const itemClasses = item.className.split(' ');
        const isVisible = activeTags.length === 0 || itemClasses.some(className => activeTags.includes(className));
        item.style.display = isVisible ? 'block' : 'none';
    });
}

//<!-- JavaScript for interaction -->
        // Get query parameters
        function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            return params.get('id'); 
        }

        // Sample items data
        const items = [
            { id: 1, title: "Nature Image 1", description: "Beautiful nature scene.", imagePath: "Images/Nature/ai-generated-8659507_1280.jpg", likes: 1345, dislikes: 10, comments: [{ user: "John", comment: "Amazing!" }] },
            { id: 2, title: "Future Cityscape", description: "Futuristic cityscape.", imagePath: "Images/Future/city-5312500_1280.jpg", likes: 5432, dislikes: 11, comments: [{ user: "Graham", comment: "Mind-blowing!" }] },
            { id: 3, title: "Steampunk Creation", description: "A steampunk-inspired image.", imagePath: "Images/Steampunk/ai-generated-7946718_1280.jpg", likes: 3401, dislikes: 22, comments: [{ user: "Ella", comment: "Love the details!" }] },
            { id: 4, title: "Space Landscape", description: "An artistic depiction of space.", imagePath: "Images/Space/ai-generated-9035417_1280.jpg", likes: 2910, dislikes: 18, comments: [{ user: "Dave", comment: "Stunning visual!" }] },
            { id: 5, title: "Nature Flower", description: "A beautiful flower in full bloom.", imagePath: "Images/Nature/flower-7242158_1280.jpg", likes: 3875, dislikes: 14, comments: [{ user: "Sarah", comment: "So vibrant!" }] },
            { id: 6, title: "Cars Image", description: "Futuristic car design.", imagePath: "Images/Cars/ai-generated-8674235_1280.png", likes: 4750, dislikes: 9, comments: [{ user: "Mike", comment: "Incredible design!" }] },
            { id: 7, title: "Car Image 2", description: "Another stunning car model.", imagePath: "Images/Cars/car-8514314_1280.png", likes: 3305, dislikes: 15, comments: [{ user: "Tina", comment: "Loving the retro vibes!" }] },
            { id: 8, title: "Nature Image 2", description: "A tranquil lake view.", imagePath: "Images/Nature/lake-6701636_1280.jpg", likes: 4020, dislikes: 12, comments: [{ user: "Lucas", comment: "Feels so peaceful." }] },
            { id: 9, title: "Space Image 2", description: "A view of outer space with vibrant colors.", imagePath: "Images/Space/ai-generated-9035437_1280.jpg", likes: 2680, dislikes: 20, comments: [{ user: "Jill", comment: "I could stare at this for hours!" }] },
            { id: 10, title: "Steampunk Image 2", description: "Another steampunk masterpiece.", imagePath: "Images/Steampunk/ai-generated-7946718_1280.jpg", likes: 3132, dislikes: 19, comments: [{ user: "Alex", comment: "Incredible detail!" }] },
            
            { id: 11, title: "Future City Image 2", description: "Another view of a futuristic city.", imagePath: "Images/Future/crystal-8920268_1280.jpg", likes: 2850, dislikes: 13, comments: [{ user: "Nathan", comment: "Feels like the future is here!" }] },
            { id: 12, title: "Nature Image 3", description: "A waterfall surrounded by nature.", imagePath: "Images/Nature/water-8100724_1280.jpg", likes: 4980, dislikes: 7, comments: [{ user: "Isabel", comment: "Nature at its finest!" }] },
            { id: 13, title: "Space Image 3", description: "Another glimpse of the universe.", imagePath: "Images/Space/space-11099_1280.jpg", likes: 3580, dislikes: 16, comments: [{ user: "Peter", comment: "Makes me want to go to space!" }] },
            { id: 14, title: "Steampunk Image 3", description: "A retro-futuristic creation.", imagePath: "Images/Steampunk/generated-7558201_1280.jpg", likes: 3760, dislikes: 14, comments: [{ user: "Mark", comment: "Fascinating style!" }] },
            { id: 15, title: "Nature Flower 2", description: "Another beautiful flower.", imagePath: "Images/Nature/water-lily-8991682_1280.png", likes: 2540, dislikes: 10, comments: [{ user: "Linda", comment: "So delicate and pretty." }] },
            { id: 16, title: "Cars Image 3", description: "A futuristic car ready to race.", imagePath: "Images/Cars/car-5548242_1280.jpg", likes: 3225, dislikes: 13, comments: [{ user: "Steven", comment: "Looks fast and sleek!" }] },
            { id: 17, title: "Space Image 4", description: "A nebula in deep space.", imagePath: "Images/Space/space-7709489_1280.jpg", likes: 4150, dislikes: 17, comments: [{ user: "Anna", comment: "So colorful!" }] },
            { id: 18, title: "Steampunk Image 4", description: "A vintage steampunk machine.", imagePath: "Images/Steampunk/vintage-4273640_1280.jpg", likes: 2710, dislikes: 12, comments: [{ user: "Oscar", comment: "The gears are so cool!" }] },
            { id: 19, title: "Future City Image 3", description: "A futuristic city with trains.", imagePath: "Images/Future/train-8239077_1280.jpg", likes: 2900, dislikes: 11, comments: [{ user: "Gina", comment: "Feels so realistic!" }] },
            { id: 20, title: "Space Image 5", description: "A breathtaking view of the stars.", imagePath: "Images/Space/stars-67616_1280.jpg", likes: 5010, dislikes: 9, comments: [{ user: "Ben", comment: "This makes me dream!" }] }         
        ];

// Ensure the search results disappear when clicking outside
document.addEventListener('click', (event) => {
    const searchInput = document.getElementById('search');
    const searchResults = document.getElementById('search-results');

    if (
        !searchResults.contains(event.target) && // If click is outside search results
        event.target !== searchInput // And not on the search input itself
    ) {
        searchResults.style.display = 'none'; // Hide search results
    }
});

// Function to handle search and display results
function searchImages() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    searchResults.innerHTML = ''; // Clear previous results
    searchResults.style.display = 'none'; // Hide results initially

    items.forEach(item => {
        if (item.id.toString() === searchInput || item.title.toLowerCase().includes(searchInput)) {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<a href="artitem.html?id=${item.id}">${item.title}</a>`;
            resultItem.style.padding = '5px'; // Style the result item
            resultItem.style.cursor = 'pointer'; // Change cursor to pointer
            resultItem.onclick = () => window.location.href = `artitem.html?id=${item.id}`; // Navigate on click
            searchResults.appendChild(resultItem);
            searchResults.style.display = 'block'; // Show results
        }
    });
}

// Add event listener for Enter keypress
const input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission if in a form
        const firstResult = document.querySelector('#search-results a'); // Get the first result
        if (firstResult) {
            window.location.href = firstResult.href; // Redirect to the first search result
        }
    }
});




// Ensure the correct item is found based on the query parameter
const itemId = getQueryParams();
const selectedItem = items.find(item => item.id === parseInt(itemId));

if (selectedItem) {
    document.getElementById('item-title').textContent = selectedItem.title;
    document.getElementById('item-description').textContent = selectedItem.description;
    document.getElementById('item-image').src = selectedItem.imagePath;
    document.getElementById('like-count').textContent = selectedItem.likes;
    document.getElementById('dislike-count').textContent = selectedItem.dislikes;

    // Load existing comments
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = ''; // Clear previous comments
    selectedItem.comments.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${comment.user}:</strong> ${comment.comment}`;
        commentList.appendChild(listItem);
    });
} else {
    console.error('Item not found!');
}


// Like and Dislike Functionality
document.getElementById('like-btn').addEventListener('click', () => {
    item.likes++;
    document.getElementById('like-count').innerText = item.likes;
});

document.getElementById('dislike-btn').addEventListener('click', () => {
    item.dislikes++;
    document.getElementById('dislike-count').innerText = item.dislikes;
});

// Star Rating Functionality
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', function () {
        const ratingValue = this.getAttribute('data-value');
        stars.forEach(s => s.style.color = '#000'); // Reset star colors
        for (let i = 0; i < ratingValue; i++) {
            stars[i].style.color = '#f39c12'; // Highlight selected stars
        }
        alert(`You rated this ${ratingValue} stars!`);
    });
});

// Comment Submission Logic
document.getElementById('submit-comment').addEventListener('click', () => {
    const userName = document.getElementById('comment-name').value.trim();
    const commentText = document.getElementById('comment-text').value.trim();

    if (userName && commentText) {
        const newComment = document.createElement('li');
        newComment.innerHTML = `<strong>${userName}:</strong> ${commentText}`;
        document.getElementById('comment-list').appendChild(newComment);

        // Clear input fields after submission
        document.getElementById('comment-name').value = '';
        document.getElementById('comment-text').value = '';
    } else {
        alert('Please fill in both fields.');
    }
});

// automatically detect the current page and apply the .active class
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Light box
const images = document.querySelectorAll('#gallery img');
images.forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('lightbox');
        modal.innerHTML = `<img src="${image.src}" alt="Enlarged Image">`;
        document.body.appendChild(modal);
        modal.addEventListener('click', () => modal.remove());
    });
});

// Search function for the gallery items
function searchContent() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = ''; // Clear previous results

    // Filter items based on search input (title or description)
    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchInput) || 
        item.description.toLowerCase().includes(searchInput)
    );

    // Display results in a dropdown-like menu
    filteredItems.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<a href="artitem.html?id=${item.id}">${item.title}</a>`;
        searchResultsDiv.appendChild(resultItem);
    });

    // Show results if there are any
    searchResultsDiv.style.display = filteredItems.length > 0 ? 'block' : 'none';
}

// Get the ID from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get item details and display on artitem.html
function displayItemDetails() {
    const itemId = getQueryParam('id');
    const item = items.find(item => item.id == itemId);

    if (item) {
        document.getElementById('item-title').textContent = item.title;
        document.getElementById('item-description').textContent = item.description;
        document.getElementById('item-image').src = item.imagePath;
        document.getElementById('item-likes').textContent = `Likes: ${item.likes}`;
        document.getElementById('item-dislikes').textContent = `Dislikes: ${item.dislikes}`;
        document.getElementById('item-comments').innerHTML = item.comments.map(comment => 
            `<div><strong>${comment.user}</strong>: ${comment.comment}</div>`
        ).join('');
    }
}

// Get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); 
}

// Function to play the audio when the button is clicked
function playAudio() {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;  // Reset audio to the start if clicked again
    audio.play();

    // Redirect to profiles.html after the audio has finished playing
    audio.onended = function() {
        window.location.href = 'profiles.html';
    };
    // Optionally: Redirect after a fixed time delay if you don't want to wait for the audio to finish
    // setTimeout(function() {
    //     window.location.href = 'profiles.html';
    // }, 2000);  // 2000ms = 2 seconds
}

