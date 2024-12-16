export function convertToDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
}