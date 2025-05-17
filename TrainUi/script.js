document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('results');
    const noResultsElement = document.getElementById('noResults');
    const loadingElement = document.querySelector('.loading');

    // Example station codes for demonstration
    const popularStations = {
        'NDLS': 'New Delhi',
        'CST': 'Mumbai Central',
        'HWH': 'Howrah',
        'MAS': 'Chennai Central',
        'BNC': 'Bangalore',
        'PNBE': 'Patna',
        'ALD': 'Allahabad Junction',
        'JAT': 'Jammu Tawi',
        'BCT': 'Mumbai Central',
        'SC': 'Secunderabad'
    };

    // Set default values for demonstration
    document.getElementById('sourceCode').value = 'NDLS';
    document.getElementById('destinationCode').value = 'CST';

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const sourceCode = document.getElementById('sourceCode').value.trim().toUpperCase();
        const destinationCode = document.getElementById('destinationCode').value.trim().toUpperCase();
        
        if (!sourceCode || !destinationCode) {
            alert('Please enter both source and destination station codes');
            return;
        }

        // Clear previous results
        resultsContainer.innerHTML = '';
        noResultsElement.style.display = 'none';
        
        // Show loading indicator
        loadingElement.style.display = 'block';

        // Make API call
        fetchTrains(sourceCode, destinationCode);
    });

    function fetchTrains(sourceCode, destinationCode) {
        // Construct the API URL
        const apiUrl = `http://localhost:8080/search/by-code?sourceCode=${sourceCode}&destinationCode=${destinationCode}`;
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Hide loading indicator
                loadingElement.style.display = 'none';
                
                if (data && data.length > 0) {
                    displayTrains(data);
                } else {
                    noResultsElement.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loadingElement.style.display = 'none';
                
                // For demonstration purposes, show a mock result if API is not available
                if (sourceCode === 'NDLS' && destinationCode === 'CST') {
                    const mockData = [
                        {
                            "id": 1,
                            "train": {
                                "id": 1,
                                "trainName": "Rajdhani Express",
                                "trainNumber": "12306"
                            },
                            "source": {
                                "id": 1,
                                "stationName": "New Delhi",
                                "stationCode": "NDLS"
                            },
                            "destination": {
                                "id": 2,
                                "stationName": "Mumbai Central",
                                "stationCode": "CST"
                            },
                            "departureTime": "06:00",
                            "arrivalTime": "14:00"
                        }
                    ];
                    displayTrains(mockData);
                } else {
                    noResultsElement.style.display = 'block';
                }
            });
    }

    function displayTrains(trains) {
        trains.forEach(train => {
            // Calculate journey duration
            const departureTime = convertTimeToMinutes(train.departureTime);
            const arrivalTime = convertTimeToMinutes(train.arrivalTime);
            let durationMinutes = arrivalTime - departureTime;
            
            // Handle overnight journeys
            if (durationMinutes < 0) {
                durationMinutes += 24 * 60;
            }
            
            const durationHours = Math.floor(durationMinutes / 60);
            const remainingMinutes = durationMinutes % 60;
            const durationText = `${durationHours}h ${remainingMinutes}m`;

            const trainCard = document.createElement('div');
            trainCard.className = 'train-card';
            trainCard.style.display = 'block';
            
            trainCard.innerHTML = `
                <div class="train-info">
                    <div class="train-name">
                        <h2>${train.train.trainName}</h2>
                        <span class="train-number">Train No: ${train.train.trainNumber}</span>
                    </div>
                </div>
                <div class="journey">
                    <div class="station source">
                        <div class="time">${formatTime(train.departureTime)}</div>
                        <div class="station-name">${train.source.stationName}</div>
                        <div class="station-code">${train.source.stationCode}</div>
                    </div>
                    <div class="journey-line"></div>
                    <div class="duration">${durationText}</div>
                    <div class="station destination">
                        <div class="time">${formatTime(train.arrivalTime)}</div>
                        <div class="station-name">${train.destination.stationName}</div>
                        <div class="station-code">${train.destination.stationCode}</div>
                    </div>
                </div>
            `;
            
            resultsContainer.appendChild(trainCard);
        });
    }
    
    function convertTimeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }
    
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    }
});