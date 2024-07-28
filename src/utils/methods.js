import { COLORS } from '../constants';

// To print console logs
export function print(msg1, msg2, type) {
    if (type == 1)
        console.log(COLORS.CONSOLE_GREEN, msg1, COLORS.CONSOLE_WHITE, msg2);
    else if (type == 0)
        console.log(COLORS.CONSOLE_RED, msg1, COLORS.CONSOLE_WHITE, msg2);
    else
        console.log(msg1 + msg2);
}
