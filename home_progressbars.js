let progressBars = document.querySelectorAll(".circular-progress");
let valueContainers = document.querySelectorAll(".value-container");

let progressValues = [79, 85, 43, 82, 93, 76]; // Example percentages for the progress bars
let speeds = [20, 19, 35, 20, 18, 20]; // Example speeds for the progress bars
let progress = [];

// Function to handle the intersection changes
function handleIntersection(entries, observer) {
    entries.forEach((entry, index) => {
        let progressBar = progressBars[index];
        let valueContainer = valueContainers[index];
        let progressValue = 0;
        let progressEndValue = progressValues[index];
        let speed = speeds[index];

        if (entry.isIntersecting) {
            // Reset the progress bar to 0
            clearInterval(progress[index]);

            // Start the progress bar
            progress[index] = setInterval(() => {
                progressValue++;
                valueContainer.textContent = `${progressValue}%`;
                progressBar.style.background = `conic-gradient(
          #39A2F5, #D262EE ${progressValue * 3.6}deg,
          #cadcff ${progressValue * 3.6}deg
        )`;
                if (progressValue == progressEndValue) {
                    clearInterval(progress[index]);
                }
            }, speed);
        } else {
            // Stop the progress bar if it's not visible
            clearInterval(progress[index]);
        }
    });
}

// Create an Intersection Observer instance
let observer = new IntersectionObserver(handleIntersection);

// Observe the progress bar elements
progressBars.forEach((progressBar) => {
    observer.observe(progressBar);
});
