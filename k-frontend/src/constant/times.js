import moment from "moment";

export const formatTime = (time) => {

    const oneYearAgo = moment().subtract(1, "year");
    const localTime = moment(time + "+08:00").local();


    return localTime.isBefore(oneYearAgo) ? localTime.format("YYYY-MM-DD") : localTime.fromNow();
};