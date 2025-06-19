document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('login-message');
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const logoutButton = document.getElementById('logout-button');
    const satelliteList = document.getElementById('satellite-list');
    const realtimeButton = document.getElementById('realtime-button');
    const historyDateInput = document.getElementById('history-date');
    const getDataButton = document.getElementById('get-data-button');
    const mapContainer = document.getElementById('map-container');
    const metricData = document.getElementById('metric-data');
    const alertsList = document.getElementById('alerts-list');

    // --- Login/Logout Logic ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Simple validation (for demonstration purposes only)
        if (username === 'gemini' && password === '1234') {
            loginMessage.textContent = '';
            loginContainer.style.display = 'none';
            dashboardContainer.style.display = 'flex'; // Show dashboard
            alert('התחברת בהצלחה!');
            // For a real application, you'd set a session/token here
        } else {
            loginMessage.textContent = 'שם משתמש או סיסמה שגויים.';
        }
    });

    logoutButton.addEventListener('click', () => {
        dashboardContainer.style.display = 'none';
        loginContainer.style.display = 'block'; // Show login again
        usernameInput.value = ''; // Clear inputs
        passwordInput.value = '';
        loginMessage.textContent = '';
        alert('התנתקת בהצלחה.');
    });

    // --- Dashboard Functionality (simulated) ---
    realtimeButton.addEventListener('click', () => {
        alert('מציג נתונים בזמן אמת...');
        simulateSatelliteData('realtime');
    });

    getDataButton.addEventListener('click', () => {
        const selectedSatellites = Array.from(satelliteList.querySelectorAll('input:checked'))
                                        .map(checkbox => checkbox.dataset.satellite);
        const historyDate = historyDateInput.value;

        if (selectedSatellites.length === 0) {
            alert('בחר לפחות לוויין אחד.');
            return;
        }

        if (!historyDate && selectedSatellites.includes('Sentinel')) {
            alert('אנא בחר תאריך עבור לוויין Sentinel (נתונים היסטוריים).');
            return;
        }

        alert(`קבלת נתונים עבור: ${selectedSatellites.join(', ')} בתאריך: ${historyDate || 'זמן אמת'}`);
        simulateSatelliteData('historical', selectedSatellites, historyDate);
    });

    function simulateSatelliteData(type, satellites = [], date = '') {
        mapContainer.innerHTML = '<p>טוען נתונים למפה...</p>';
        metricData.textContent = 'טוען נתונים...';
        alertsList.innerHTML = '<li>טוען התראות...</li>';

        // Simulate API call delay
        setTimeout(() => {
            mapContainer.innerHTML = '<p>המפה עודכנה עם נתונים חדשים.</p><br> (סימולציה בלבד)';
            metricData.textContent = `נתוני מדדים מעודכנים מ-${type === 'realtime' ? 'זמן אמת' : date}`;

            alertsList.innerHTML = ''; // Clear old alerts
            const newAlerts = [
                'התראה: פעילות חריגה באזור X (לוויין Maxar).',
                'עדכון: נתוני טמפרטורה גבוהים מהרגיל באזור Y (לוויין Sentinel).',
                'אין התראות חדשות חשובות.',
                'התראה: זיהוי אובייקט לא מזוהה באזור Z (לוויין ICEYE).'
            ];
            newAlerts.forEach(alert => {
                const li = document.createElement('li');
                li.textContent = alert;
                alertsList.appendChild(li);
            });

            if (type === 'realtime') {
                alertsList.innerHTML += '<li>(נתוני זמן אמת)</li>';
            } else if (date) {
                alertsList.innerHTML += `<li>(נתונים לתאריך: ${date})</li>`;
            }

        }, 2000); // Simulate 2 seconds delay
    }
});