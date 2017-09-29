import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';

const Visits = new Mongo.Collection('visits');

if (Meteor.isServer) {
    Meteor.publish('visits', function tasksPublication() {
        return Visits.find({owner: this.userId});
    });
}

Meteor.methods({
    'visits.insert'(domain, dateAccessedTimestamp, timeSpent) {
        check(domain, String);
        check(dateAccessedTimestamp, Number);
        check(timeSpent, Number);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Visits.insert({
            domain: domain,
            dateAccessedTimestamp: dateAccessedTimestamp,
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

        if (visit.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Visits.remove(id);
    },
});

export default Visits;