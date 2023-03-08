/**
 * @param {{ (): Promise<any>; (): any; }} generateFn
 * @param {{ (thingToTestAndUse: any): Promise<void> }} testFn
 * @param {{ (): boolean; (): any; }} isSolnFoundFn
 * @param {{ (steps: number): Promise<void> }} updateFn
 * @param {number} updateIntervalInSeconds
 */
export async function generateAndTest(
  generateFn,
  testFn,
  isSolnFoundFn,
  updateFn,
  updateIntervalInSeconds
) {
  let currentTime = Date.now();
  const updateIntervalInMilliseconds = updateIntervalInSeconds * 1000;
  let numOfStepsElapsed = 0;
  while (!isSolnFoundFn()) {
    if (Date.now() - currentTime > updateIntervalInMilliseconds) {
      await updateFn(numOfStepsElapsed);
      currentTime = Date.now();
    }
    const candSln = await generateFn();
    await testFn(candSln);
    numOfStepsElapsed++;
  }
  await updateFn(numOfStepsElapsed);
}
