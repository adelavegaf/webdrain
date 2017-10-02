import {Meteor} from 'meteor/meteor';

export default class Api {
    static getUsageSince(sinceTimestamp) {
        return new Promise((resolve, reject) => {
            Meteor.call('visits.timeSpentSince', sinceTimestamp, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    }
}