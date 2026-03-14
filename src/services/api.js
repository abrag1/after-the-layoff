/**
 * Mock API service to handle email signups for the MVP launch.
 * This simulates a network request and logs the signup to localStorage
 * so that we can verify it works locally before wiring up a real backend.
 */

export const submitEmailSignup = async (email, topic = 'general') => {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      try {
        // Fetch existing signups or initialize empty array
        const existingSignupsRaw = window.localStorage.getItem('after-layoff-waitlist');
        const existingSignups = existingSignupsRaw ? JSON.parse(existingSignupsRaw) : [];
        
        // Add new signup
        const newSignup = {
          email,
          topic,
          timestamp: new Date().toISOString()
        };
        
        // Save back to local storage
        window.localStorage.setItem('after-layoff-waitlist', JSON.stringify([...existingSignups, newSignup]));
        
        // Return success
        resolve({ success: true, message: "Thank you. You've been added to the early list." });
      } catch (error) {
        console.error("Error saving email signup:", error);
        // We still resolve true in the MVP so the user sees a success state even if localStorage fails
        resolve({ success: true, message: "Thank you. You've been added to the early list." });
      }
    }, 800); // 800ms simulated delay for realism
  });
};
