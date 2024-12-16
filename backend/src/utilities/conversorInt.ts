export function convertToInt(input){
    var processedLine = input.replace("R$", "").replace(" ", "").replace(".", "").replace(",", ".")
    return processedLine
}