import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

const Goals = new Mongo.Collection('goals');

if (Meteor.isServer) {
    Meteor.methods({
        getGoalsStatus(sinceDate) {
            // Extension uses Asteroid that serializes date differently than Meteor. Must perform this check.
            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            const userGoals = Meteor.call('getGoals');

            for (const goal of userGoals) {
                const [usage] = Meteor.call('visits.getDomainUsage', goal.hostname, sinceDate);
                goal.timeSpent = usage ? usage.total : 0;
                switch (goal.quantifier) {
                    case '<':
                        goal.isFailing = goal.timeSpent > goal.timeGoal;
                        break;
                    case '>':
                        goal.isFailing = goal.timeSpent < goal.timeGoal;
                        break;
                }
            }
            return userGoals;
        }
    });
}

Meteor.methods({
    getGoals() {
        return Goals.find({owner: this.userId}).fetch();
    },
    addGoal(hostname, quantifier, timeGoal) {
        check(hostname, String);
        check(quantifier, String);
        check(timeGoal, Number);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        const date = new Date();

        return Goals.insert({
            hostname: hostname,
            quantifier: quantifier,
            timeGoal: timeGoal,
            creationDate: date,
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    removeGoal(id) {
        check(id, String);

        const goal = Goals.findOne(id);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if (goal.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Goals.remove(id);
    }
});

export default Goals;