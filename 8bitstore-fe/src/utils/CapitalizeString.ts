const capitalizeString = (stringIn: string) => {
    return stringIn
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export default capitalizeString;