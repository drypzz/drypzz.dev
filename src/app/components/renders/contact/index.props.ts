interface TemplateDataProps extends Record<string, unknown> {
    from_name: string;
    email: string;
    message: string;
    hours: string;
    year: number;
}

export default TemplateDataProps;