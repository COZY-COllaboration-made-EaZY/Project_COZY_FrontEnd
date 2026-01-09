// utils/isErrorCode.ts
import { ERROR_MESSAGE_MAP } from '@/constants/errorMessage';

export function isErrorCode(
    code: string
): code is keyof typeof ERROR_MESSAGE_MAP {
    return code in ERROR_MESSAGE_MAP;
}
