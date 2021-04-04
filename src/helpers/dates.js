const convertIsoDateStr = (isoDate) => {
    const jsDate = new Date(isoDate);
    const readableTime = jsDate.toLocaleTimeString('en-GB', {timeZone: 'UTC'});
    return readableTime;
}

export {
    convertIsoDateStr
}