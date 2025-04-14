// lib/parseUserAgent.js

export function parseUserAgent(agent) {
    if (!agent) return 'unknown';

    let browser = 'unknown';
    let os = 'unknown';

    // Определяем браузер с учетом различных вариантов
    if (/SamsungBrowser/i.test(agent)) {
        browser = 'Samsung Internet';
    } else if (/OPR|Opera/i.test(agent)) {
        browser = 'Opera';
    } else if (/Edg/i.test(agent)) {
        browser = 'Edge';
    } else if (/Chrome/i.test(agent)) {
        browser = 'Chrome';
    } else if (/Firefox/i.test(agent)) {
        browser = 'Firefox';
    } else if (/Safari/i.test(agent) && !/Chrome/i.test(agent)) {
        browser = 'Safari';
    } else if (/MSIE|Trident/i.test(agent)) {
        browser = 'Internet Explorer';
    }

    // Определяем операционную систему, добавив дополнительные проверки
    if (/Windows NT/i.test(agent)) {
        os = 'Windows';
    } else if (/Android/i.test(agent)) {
        os = 'Android';
    } else if (/iPhone|iPad|iPod/i.test(agent)) {
        os = 'iOS';
    } else if (/Mac OS X/i.test(agent)) {
        os = 'macOS';
    } else if (/Linux/i.test(agent)) {
        os = 'Linux';
    }

    return `${browser}, ${os}`;
}
