export function getTrackDuration(durationMs) {
    let total = durationMs/1000/60;
    
    return `${Math.floor(total)}:${Math.floor((total-Math.floor(total))*60)}`;
} 