// Firebase Configuration

const firebaseConfig = {
    apiKey: "AIzaSyB6gVDqNlnNEE8bjKbLRVbZPDygdifg024",
    authDomain: "recruitment-toggle.firebaseapp.com",
    databaseURL: "https://recruitment-toggle-default-rtdb.firebaseio.com",
    projectId: "recruitment-toggle",
    storageBucket: "recruitment-toggle.appspot.com",
    messagingSenderId: "725552854770",
    appId: "1:725552854770:web:4e68f58987318eea58426b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function togglePanel(panelId) {
    const panelRef = db.ref('panels/' + panelId);

    // Get current state of the panel
    panelRef.once('value').then(snapshot => {
        const isActive = snapshot.val() || false;
        // Toggle the state
        panelRef.set(!isActive);
    });
}
// Listen for changes in panel states
const panelIds = ['panel1', 'panel2', 'panel3', 'panel4', 'panel5', 'panel6', 'panel7', 'panel8', 'panel9', 'panel10'];

panelIds.forEach(panelId => {
    const panelRef = db.ref('panels/' + panelId);
    panelRef.on('value', snapshot => {
        const isActive = snapshot.val();
        const button = document.querySelector(`#${panelId} button`);
        if (isActive) {
            button.classList.remove('inactive');
            button.classList.add('active');
        } else {
            button.classList.remove('active');
            button.classList.add('inactive');
        }
    });
});