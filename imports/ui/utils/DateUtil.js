const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 365;

export default class DateUtil {
    static getLastWeekArray() {
        const lastWeek = [];
        for (let i = 0; i < 8; i++) {
            const date = this.getCleanCurrentDate();
            date.setDate(date.getDate() - 7 + i);
            lastWeek.push({date: date, timeSpent: 0});
        }
        return lastWeek;
    }

    static getToday() {
        return this.getCleanCurrentDate();
    }

    static getFirstDayOfPastWeek() {
        const date = this.getCleanCurrentDate();
        date.setDate(date.getDate() - DAYS_IN_WEEK);
        return date;
    }

    static getFirstDayOfPastMonth() {
        const date = this.getCleanCurrentDate();
        date.setDate(date.getDate() - DAYS_IN_MONTH);
        return date;
    }

    static getFirstDayOfPastYear() {
        const date = this.getCleanCurrentDate();
        date.setDate(date.getDate() - DAYS_IN_YEAR);
        return date;
    }

    static getCleanCurrentDate() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    static getFurthestDate() {
        // Dec 31 1899
        return new Date(0, 0, 0);
    }
}