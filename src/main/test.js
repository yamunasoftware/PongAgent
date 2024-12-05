/* TEST FRAMEWORK */
// Test Execution Wrapper Function:
function testExecution(tests) {
    const execution = runTests(tests);
    if (execution[1] > 0) {
        console.log('Ending Deployment...');
        process.exit(1);
    }
}
// Runs the Overall Tests:
function runTests(tests) {
    let passed = 0, failed = 0, time = 0;
    for (let i = 0; i < tests.length; i++) {
        const results = executeTest(tests[i], passed, failed);
        passed = results[0];
        failed = results[1];
        time += results[2];
    }
    console.log("\nPassed: " + passed);
    console.log("Failed: " + failed);
    console.log("Tested in " + roundTime(time) + "s");
    return [passed, failed, time];
}
// Execute Test Function:
function executeTest(test, passed, failed) {
    console.log("\nRunning " + test.name + "...");
    const testStartTime = performance.now();
    let testResult = test();
    const testTimeDelta = performance.now() - testStartTime;
    if (testResult) {
        passed++;
        console.log("PASSED in " + roundTime(testTimeDelta) + "s");
    }
    else {
        failed++;
        console.log("FAILED in " + roundTime(testTimeDelta) + "s");
    }
    return [passed, failed, testTimeDelta];
}
// Execution Time Rounding Function:
function roundTime(time) {
    const value = time / 1000;
    return Math.round(value * 1000) / 1000;
}
/* TEST CASES */
// Test Weights Function:
function testWeights() {
    const environment = new Environment();
    const lastWeights = JSON.stringify(environment.update());
    let assertion = false;
    for (let i = 0; i < 10000; i++) {
        const currentWeights = environment.update();
        if (JSON.stringify(currentWeights) !== lastWeights) {
            assertion = true;
        }
        else {
            assertion = false;
        }
    }
    return assertion;
}
// Test Movement Function:
function testMovement() {
    const environment = new Environment();
    const lastPosition = JSON.stringify(environment.getPosition());
    let assertion = false;
    for (let i = 0; i < 10000; i++) {
        environment.update();
        const currentPosition = environment.getPosition();
        if (JSON.stringify(currentPosition) !== lastPosition) {
            assertion = true;
        }
        else {
            assertion = false;
        }
    }
    return assertion;
}
// Test Opposition Function:
function testOpposition() {
    const environment = new Environment();
    const lastOpposition = JSON.stringify(environment.getOppositionPosition());
    let assertion = false;
    for (let i = 0; i < 10000; i++) {
        const currentOpposition = environment.update();
        if (JSON.stringify(currentOpposition) !== lastOpposition) {
            assertion = true;
        }
        else {
            assertion = false;
        }
    }
    return assertion;
}
// Test Scores Function:
function testScores() {
    const environment = new Environment();
    const lastScores = JSON.stringify(environment.getScores());
    let assertion = false;
    for (let i = 0; i < 10000; i++) {
        environment.update();
        const currentScores = environment.getScores();
        if (JSON.stringify(currentScores) !== lastScores) {
            assertion = true;
        }
        else {
            assertion = false;
        }
    }
    return assertion;
}
/* -------------------------------------------------------------------------------- */
import Environment from './main.js';
testExecution([testWeights, testMovement, testOpposition, testScores]);
