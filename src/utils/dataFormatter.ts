///////////////////////////////
// Convert day format
///////////////////////////////

export const convertToLongDay = (dateString: any) => {
    const formattedDay = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    }).format(new Date(dateString))

    return formattedDay
}

///////////////////////////////
// Convert date format
///////////////////////////////

export const convertToDateFormat = (dateString: any) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const year = dateString.slice(0, 4);
    const month = months[dateString.slice(5, 7) - 1];
    const day = dateString.slice(8, 10);
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
};

///////////////////////////////
// Convert time format
///////////////////////////////

export const convertTimeFormat = (time: any) => {
    // Check correct time format and split into components
    time = time
    .toString()
    .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
};

///////////////////////////////
// Capitalize instructor name
///////////////////////////////

export const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

///////////////////////////////
// Format price with commas
///////////////////////////////

export const formatPrice = (price: number) => {
    return price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}