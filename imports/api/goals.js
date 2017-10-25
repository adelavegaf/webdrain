import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

const Goals = new Mongo.Collection('goals');

function augmentGoalWithStatus(goal, sinceDate) {
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

if (Meteor.isServer) {
    Meteor.methods({
        getGoalsStatus(sinceDate) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            // Extension uses Asteroid that serializes date differently than Meteor. Must perform this check.
            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            const userGoals = Meteor.call('getGoals');

            for (const goal of userGoals) {
                augmentGoalWithStatus(goal, sinceDate);
            }

            return userGoals;
        },
        getGoalStatus(sinceDate, hostname) {

            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }

            if (!(sinceDate instanceof Date)) {
                sinceDate = new Date(sinceDate);
            }

            const [goal] = Meteor.call('getGoal', hostname);

            if (!goal) {
                throw new Meteor.Error('No goal associated with this hostname');
            }

            augmentGoalWithStatus(goal, sinceDate);

            return goal;
        }
    });
}

Meteor.methods({
    getGoals() {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        return Goals.find({owner: this.userId}).fetch();
    },
    getGoal(hostname) {
        check(hostname, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        return Goals.find({owner: this.userId, hostname: hostname}).fetch();
    },
    addGoal(hostname, quantifier, timeGoal) {
        check(hostname, String);
        check(quantifier, String);
        check(timeGoal, Number);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        const [goal] = Meteor.call('getGoal', hostname);

        if (goal) {
            throw new Meteor.Error('This hostname already has a goal');
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

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        const goal = Goals.findOne(id);

        if (goal.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Goals.remove(id);
    }
});

export default Goals;