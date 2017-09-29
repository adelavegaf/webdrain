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
    'visits.insert'(domain, accessedTimestamp, timeSpent) {
        check(domain, String);
        check(accessedTimestamp, Match.Integer);
        check(timeSpent, Match.Integer);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Visits.insert({
            domain: domain,
            dateAccessedTimestamp: accessedTimestamp,
            timeSpent: timeSpent,
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'visits.remove'(visitId) {
        check(visitId, String);

        const visit = Visits.findOne(visitId);

        if (visit.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Visits.remove(visitId);
    },
});

export default Visits;