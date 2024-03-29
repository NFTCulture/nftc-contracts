import chalk from 'chalk';

/**
 * Check to see if a check indicates the test should be skipped.
 *
 * @param context
 * @param defaultConfigurationCheck
 * @returns boolean - true if the check passes, or false if the test should be skipped.
 */
export function skipIfDefault(context: Mocha.Context, defaultConfigurationCheck: boolean) {
    return skipIfDefaultForTest(context, defaultConfigurationCheck, true);
}

export function skipIfDefaultForTest(
    context: Mocha.Context,
    defaultConfigurationCheck: boolean,
    allowSkip = true
): boolean {
    if (!defaultConfigurationCheck) {
        console.log(chalk.yellow(`DEFAULT CONFIGURATION CHECK would have failed ...`));
        if (allowSkip) context.skip();
        return false;
    }
    return true;
}
