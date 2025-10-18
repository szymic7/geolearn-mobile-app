export function getProgressColor(progress = 0)
{
    const normalized = Math.min(Math.max(progress, 0), 1);

    let r, g, b;
    if (normalized < 0.5)
    {
        // red → yellow
        const ratio = normalized / 0.5;
        r = 255;
        g = Math.round(255 * ratio);
        b = 0;
    }
    else
    {
        // yellow → green
        const ratio = (normalized - 0.5) / 0.5;
        r = Math.round(255 * (1 - ratio));
        g = 255;
        b = 0;
    }

    return `rgb(${r}, ${g}, ${b})`;
}