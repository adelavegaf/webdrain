import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

const Visits = new Mongo.Collection('visits');

if (Meteor.isServer) {

    Meteor.methods({
        'visits.timeSpentSince'(sinceDate) {

            // Extension uses Asteroid that serializes date differently than Meteor. Must perform this check.
            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            return Visits.aggregate(
                {
                    $match: {
                        dateAccessed: {
                            $gte: sinceDate
                        },
                        owner: Meteor.userId()
                    }
                },
                {
                    $group: {
                        _id: '$hostname',
                        total: {$sum: '$timeSpent'}
                    }
                }
            );
        }
    });

    Meteor.methods({
        'visits.frequencySince'(sinceDate) {

            // Extension uses Asteroid that serializes date differently than Meteor. Must perform this check.
            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            return Visits.aggregate(
                {
                    $match: {
                        dateAccessed: {
                            $gte: sinceDate
                        },
                        owner: Meteor.userId()
                    }
                },
                {
                    $group: {
                        _id: '$hostname',
                        total: {$sum: 1}
                    }
                }
            );
        }
    });

    Meteor.methods({
        'visits.getDomainUsage'(hostname, sinceDate) {

            // Extension uses Asteroid that serializes date differently than Meteor. Must perform this check.
            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            return Visits.aggregate(
                {
                    $match: {
                        dateAccessed: {
                            $gte: sinceDate
                        },
                        hostname: hostname,
                        owner: Meteor.userId()
                    }
                },
                {
                    $group: {
                        _id: {
                            year: {$year: '$dateAccessed'},
                            month: {$month: '$dateAccessed'},
                            day: {$dayOfMonth: '$dateAccessed'},
                        },
                        total: {$sum: '$timeSpent'}
                    }
                }
            );
        }
    });
}

Meteor.methods({
    'visits.insert'(hostname, timeSpent) {
        check(hostname, String);
        check(timeSpent, Number);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        const now = new Date();
        return Visits.insert({
            hostname: hostname,
            dateAccessed: now,
            timezoneOffset: now.getTimezoneOffset(),
            timeSpent: timeSpent,
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'visits.update'(id, timeSpent) {
        check(id, String);
        check(timeSpent, Number);

        const visit = Visits.findOne(id);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (visit.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Visits.update({
            '_id': id
        }, {
            $inc: {
                timeSpent: timeSpent
            }
        });
    },
    'visits.remove'(id) {
        check(id, String);

        const visit = Visits.findOne(id);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (visit.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Visits.remove(id);
    }
});

export default Visits;