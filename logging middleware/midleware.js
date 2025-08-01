const fetch = require('node-fetch');

/**
 * Logs a message to the test server.
 * @param {string} stack
 * @param {string} level
 * @param {string} packageName
 * @param {string} message
 */
async function log(stack, level, packageName, message) {
    const logPayload = {
        stack,
        level,
        package: packageName,
        message
    };

    try {
        const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logPayload)
        });
        // Check if response is JSON
        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch {
            result = text;
        }
        console.log('Log sent:', result);
    } catch (error) {
        console.error('Logging failed:', error);
    }
}

module.exports = log;

log('testStack', 'info', 'testPackage', 'This is a test log message');