export enum VariableType {
    Any = "any",
    Number = "number",
    String = "string",
    Boolean = "boolean",
    Color = "color",
    Array = "Array",
    Sprite = "Sprite",
    Iterable = "Iterable"
}

export const DefaultVariableValues = {
    [VariableType.Any]: 0 as any,
    [VariableType.Number]: 0,
    [VariableType.String]: "",
    [VariableType.Boolean]: false,
    [VariableType.Color]: "#000000" as `#${string}`,
    [VariableType.Array]: [] as any[],
    [VariableType.Sprite]: null,
    [VariableType.Iterable]: [] as any[] | string
};

export type Variable = {
    value: any;
    visible: boolean;
    types: VariableType[];
}

export function isVariableType<T extends VariableType>(
    type: T,
    value: unknown
): value is typeof DefaultVariableValues[T] {
    switch (type) {
        case VariableType.Any:
            return true;
        case VariableType.Number:
            return typeof value === "number";
        case VariableType.String:
            return typeof value === "string";
        case VariableType.Boolean:
            return typeof value === "boolean";
        case VariableType.Color:
            return typeof value === "string" && /^#[0-9a-f]{6}$/.test(value);
        case VariableType.Array:
            return Array.isArray(value);
        case VariableType.Sprite:
            return String(value) === "[object Sprite]";
        case VariableType.Iterable:
            return Array.isArray(value) || typeof value === "string";
        default:
            throw new Error(`Unknown variable type: ${type}`);
    }
}

export function getVariableType(value: unknown): VariableType {
    if (typeof value === "number") {
        return VariableType.Number;
    }

    if (typeof value === "string") {
        if (/^#[0-9a-f]{6}$/.test(value)) {
            return VariableType.Color;
        }
        return VariableType.String;
    }

    if (typeof value === "boolean") {
        return VariableType.Boolean;
    }

    if (Array.isArray(value)) {
        return VariableType.Array;
    }

    if (String(value) === "[object Sprite]") {
        return VariableType.Sprite;
    }

    return VariableType.Any;
}