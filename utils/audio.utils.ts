// utils/audio.utils.ts
let audioUnlocked = false;

export const unlockAudio = () => {
    if (!audioUnlocked) {
        const audio = new Audio("/notify.mp3");
        audio.play()
            .then(() => {
                audio.pause();
                audio.currentTime = 0;
                audioUnlocked = true;
            })
            .catch(() => { });
    }
};

export const playNotificationSound = () => {
    if (!audioUnlocked) return;
    const audio = new Audio("/notify.mp3");
    audio.play().catch((err) => console.error("Audio play failed:", err));
};
