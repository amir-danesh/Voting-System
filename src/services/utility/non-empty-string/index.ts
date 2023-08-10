export type ValidateString = {
    state: boolean;
    message: string;
    statusCode: 200 | 400;
};

export const isNonEmptyString = (str: unknown, asField: string = "field"): ValidateString => {
    if (str === undefined) {
        return {
            state: false,
            message: `${asField} is required`,
            statusCode: 400,
        };
    }

    if (typeof str !== "string") {
        return {
            state: false,
            message: `${asField} should be a string`,
            statusCode: 400,
        };
    }

    if (str.length === 0) {
        return {
            state: false,
            message: `${asField} cannot be empty`,
            statusCode: 400,
        };
    }

    return {
        state: true,
        message: `${asField} is ok`,
        statusCode: 200,
    };
};