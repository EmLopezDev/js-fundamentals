/*
Promise concurrency in JavaScript refers to the execution of multiple asynchronous operations at the
same time, without waiting for each one to finish before starting the next.

Because JavaScript is single-threaded, it cannot execute synchronous CPU tasks in parallel. Instead,
promise concurrency achieves "parallelism" at the I/O level by initiating multiple asynchronous
operations (like network requests, file reads, or timers) and letting the underlying environment
(the browser or Node.js runtime) manage them concurrently in the background.

The Two Modes of Concurrency

To put this concept into perspective, think of how promises handle time:

- Sequential (No Concurrency): You await each promise one after the other. If you have 3 API
  requests that take 2 seconds each, the total execution time is 6 seconds.
- Concurrent: You kick off all 3 promises simultaneously using a combinator like Promise.all(). The
  environment processes them at the same time, bringing the total execution time down to just 2
  seconds (the time of the slowest single request).

*/

/*
In complex apps, you rarely handle promises one by one. JavaScript provides four built-in methods to
manage arrays of concurrent promises, each behaving differently:

1. Promise.all()

- Behavior: Takes an array of promises and waits for all of them to fulfill. If any single promise
  rejects, the entire operation short-circuits and rejects immediately with that error.
- Use Case: Batching multiple independent API requests where you absolutely need all the data before
  you can render the UI.
- Example: Fetching a user's profile info and their dashboard settings simultaneously.
*/

const fetchProfile = () => Promise.resolve({ name: "Alex", id: 101 });
const fetchSettings = () => Promise.resolve({ theme: "dark", notifications: true });

async function loadDashboard() {
    try {
        // Both requests run concurrently
        const [profile, settings] = await Promise.all([fetchProfile(), fetchSettings()]);
        console.log(`Loaded ${profile.name}'s dashboard in ${settings.theme} mode.`);
    } catch (error) {
        console.error("Dashboard failed to load because a critical request failed:", error);
    }
}

loadDashboard();

/*
2. Promise.allSettled()

- Behavior: Waits for every single promise to finish, regardless of whether it fulfills or rejects.
  It never short-circuits. It returns an array of objects describing the outcome of each promise ({
  status: 'fulfilled', value: ... } or { status: 'rejected', reason: ... }).
- Use Case: Running bulk operations where individual failures are acceptable and shouldn't ruin the
  entire batch (e.g., uploading a gallery of photos).
- Example: Sending out a batch of email notifications where you want to log which ones failed
  without stopping the rest.
*/

const sendEmailA = () => Promise.resolve("Email A sent successfully");
const sendEmailB = () => Promise.reject("Email B failed: Invalid address");
const sendEmailC = () => Promise.resolve("Email C sent successfully");

async function dispatchNotifications() {
    const results = await Promise.allSettled([sendEmailA(), sendEmailB(), sendEmailC()]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Task ${index + 1}: Success -> ${result.value}`);
        } else {
            console.error(`Task ${index + 1}: Failed -> ${result.reason}`);
        }
    });
}

dispatchNotifications();

/*
3. Promise.race()
- Behavior: Settles as soon as the very first promise settles. Whichever promise finishes
  first—whether it fulfills OR rejects—determines the final outcome.
- Use Case: Enforcing a strict network timeout. If the API request takes too long, the timeout
  promise loses the race and throws an error.
- Example: Aborting an asset download if it takes longer than 2 seconds.
*/

const downloadAsset = () =>
    new Promise((resolve) => setTimeout(() => resolve("Asset downloaded!"), 5000));

const timeout = () =>
    new Promise((_, reject) => setTimeout(() => reject("Request timed out!"), 2000));

async function fetchWithTimeout() {
    try {
        // Whichever triggers first wins the race
        const result = await Promise.race([downloadAsset(), timeout()]);
        console.log(result);
    } catch (error) {
        console.error("Error:", error); // Will log "Request timed out!" after 2 seconds
    }
}

fetchWithTimeout();

/*
4. Promise.any()
- Behavior: Settles as soon as the first promise fulfills (succeeds). It ignores rejections unless
  all input promises fail, in which case it rejects with an AggregateError containing all the
  individual errors.
- Use Case: Querying multiple redundant resources, locations, or fallback servers where you only
  need one successful response.
- Example: Pinging three different data mirrors to fetch a configuration file, taking whichever
  answers successfully first.
*/

const brokenMirror = () => Promise.reject("Server 1 down");
const slowMirror = () =>
    new Promise((resolve) => setTimeout(() => resolve("Config from Server 2"), 1000));
const fastMirror = () =>
    new Promise((resolve) => setTimeout(() => resolve("Config from Server 3"), 200));

async function loadConfig() {
    try {
        // Ignores brokenMirror, takes fastMirror because it's the quickest to succeed
        const fastestConfig = await Promise.any([brokenMirror(), slowMirror(), fastMirror()]);
        console.log("Loaded:", fastestConfig);
    } catch (error) {
        console.error("All mirrors failed:", error.errors);
    }
}

loadConfig();
