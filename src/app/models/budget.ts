export interface Budget {
    numPages: number;
    numLanguages: number;
    productSelections: { [key: string]: boolean };
    name?: string;
    email?: string;
    phone?: string;
}