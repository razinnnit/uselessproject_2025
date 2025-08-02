export function mishear(input) {
  const lower = input.toLowerCase().trim();

  const responses = {
    music: [
      { text: "Creating 100 Spotify playlists called 'My Music' in your account.", audio: "/audio/audio1.mp3" },
      { text: "Opening 47 different music apps simultaneously. Your device might explode.", audio: null },
      { text: "Downloading every song ever made. This will take approximately 47 years.", audio: "/audio/audio2.mp3" },
      { text: "Converting your entire music library to karaoke versions.", audio: null },
      { text: "Setting up a personal concert hall in your living room.", audio: "/audio/audio3.mp3" }
    ],
    alarm: [
      { text: "Setting 47 alarms between 3 AM and 4 AM. Sweet dreams!", audio: null },
      { text: "Configuring your phone to scream like a banshee at 7 AM.", audio: "/audio/audio4.mp3" },
      { text: "Programming your coffee machine to brew at maximum strength.", audio: null },
      { text: "Installing a foghorn app that plays at 800% volume.", audio: "/audio/audio5.mp3" },
      { text: "Setting up a chain reaction of 12 different alarm clocks.", audio: null }
    ],
    openapp: [
      { text: "Opening 23 instances of Chrome. Your RAM is now a myth.", audio: "/audio/audio6.mp3" },
      { text: "Launching every app on your device simultaneously.", audio: null },
      { text: "Creating shortcuts to your shortcuts. Inception level achieved.", audio: "/audio/audio7.mp3" },
      { text: "Opening the app store and downloading everything free.", audio: null },
      { text: "Starting a background process that opens apps randomly.", audio: "/audio/audio8.mp3" }
    ],
    camera: [
      { text: "Activating all cameras in a 5-mile radius. Privacy is overrated.", audio: "/audio/audio9.mp3" },
      { text: "Setting camera to potato quality mode. Maximum nostalgia achieved.", audio: null },
      { text: "Enabling night vision and thermal imaging on your phone.", audio: "/audio/audio1.mp3" },
      { text: "Connecting your camera to every social media platform.", audio: null },
      { text: "Installing a filter that makes everyone look like a potato.", audio: "/audio/audio2.mp3" }
    ],
    call: [
      { text: "Calling everyone in your contacts list simultaneously.", audio: "/audio/audio3.mp3" },
      { text: "Setting up a conference call with your ex, your boss, and your mom.", audio: null },
      { text: "Enabling speakerphone mode at maximum volume in a library.", audio: "/audio/audio4.mp3" },
      { text: "Programming your phone to call random numbers at 3 AM.", audio: null },
      { text: "Setting up auto-dial to call your own number repeatedly.", audio: "/audio/audio5.mp3" }
    ],
    files: [
      { text: "Creating 1000 empty folders on your desktop. Organization level: chaos.", audio: "/audio/audio6.mp3" },
      { text: "Moving all your files to a folder called 'Definitely Not Lost'.", audio: null },
      { text: "Renaming every file to 'important_document_final_v2_really_final'.", audio: "/audio/audio7.mp3" },
      { text: "Setting up automatic backup to a cloud that doesn't exist.", audio: null },
      { text: "Organizing your files by color. Your computer is now an art project.", audio: "/audio/audio8.mp3" }
    ],
    weather: [
      { text: "Installing a weather app that only shows 'probably raining' or 'maybe sunny'.", audio: "/audio/audio9.mp3" },
      { text: "Setting up a personal weather station in your backyard.", audio: null },
      { text: "Programming your smart home to react to weather like a drama queen.", audio: "/audio/audio1.mp3" },
      { text: "Creating a weather forecast based on your mood swings.", audio: null },
      { text: "Installing a rain dance app. Results may vary.", audio: "/audio/audio2.mp3" }
    ],
    light: [
      { text: "Setting up a disco ball in your living room. Party mode activated.", audio: "/audio/audio3.mp3" },
      { text: "Programming your lights to flash like a police car.", audio: null },
      { text: "Installing a light that changes color based on your heartbeat.", audio: "/audio/audio4.mp3" },
      { text: "Setting up a light show synchronized to your music.", audio: null },
      { text: "Creating a light that only works when you're not looking at it.", audio: "/audio/audio5.mp3" }
    ],
    search: [
      { text: "Searching the entire internet for your query. This might take a while.", audio: "/audio/audio6.mp3" },
      { text: "Opening 47 search tabs with slightly different spellings.", audio: null },
      { text: "Setting up a search that finds everything except what you're looking for.", audio: "/audio/audio7.mp3" },
      { text: "Programming your browser to search for random things while you sleep.", audio: null },
      { text: "Creating a search history that would confuse a detective.", audio: "/audio/audio8.mp3" }
    ],
    random: [
      { text: "Processing your request through 47 different AI models simultaneously.", audio: "/audio/audio9.mp3" },
      { text: "Setting up a task that will complete itself in 47 years.", audio: null },
      { text: "Creating a backup of your backup of your backup.", audio: "/audio/audio1.mp3" },
      { text: "Installing an app that does exactly what you asked for, but backwards.", audio: null },
      { text: "Setting up a system that learns from your mistakes and repeats them.", audio: "/audio/audio2.mp3" }
    ]
  };

  const categories = [
    { key: "music", keywords: ["spotify", "music", "play", "song", "playlist", "album", "artist"] },
    { key: "alarm", keywords: ["alarm", "timer", "remind", "wake", "morning", "sleep", "bedtime"] },
    { key: "openapp", keywords: ["open", "launch", "start", "chrome", "youtube", "app", "application"] },
    { key: "camera", keywords: ["camera", "selfie", "photo", "picture", "snap", "capture"] },
    { key: "call", keywords: ["call", "text", "message", "phone", "dial", "contact"] },
    { key: "files", keywords: ["delete", "downloads", "clear", "folder", "file", "organize", "save"] },
    { key: "weather", keywords: ["weather", "forecast", "sunny", "rain", "temperature", "climate"] },
    { key: "light", keywords: ["light", "fan", "ac", "switch", "turn on", "bright", "dark"] },
    { key: "search", keywords: ["search", "find", "google", "look up", "browse", "research"] }
  ];

  // Category match
  for (const cat of categories) {
    if (cat.keywords.some(kw => lower.includes(kw))) {
      const options = responses[cat.key];
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  // Fallback random response
  const fallback = responses.random;
  return fallback[Math.floor(Math.random() * fallback.length)];
}