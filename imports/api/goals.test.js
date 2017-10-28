import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {chai} from 'meteor/practicalmeteor:chai';
import Visits from './visits';
import Goals from './goals';

if (Meteor.isServer) {
    describe('Goals Client-Server Methods', () => {

        beforeEach(() => {
            resetDatabase();
            sinon.stub(Meteor, 'userId');
            sinon.stub(Meteor, 'user');
            Meteor.user.returns({
                username: 'fakeUsername'
            });
            Meteor.userId.returns('12345');
        });

        afterEach(() => {
            Meteor.userId.restore();
            Meteor.user.restore();
            resetDatabase();
        });

        it('Can get all goals', () => {
            Meteor.call('addGoal', 'example.com', '<', 100000, () => {
                Meteor.call('getGoals', (goals) => {
                    chai.assert.equal(goals.length, 1);
                });
            });
        });

        it('Can get a specific goal', () => {
            Meteor.call('addGoal', 'example.com', '<', 100000, () => {
                Meteor.call('getGoal', 'example.com', (goal) => {
                    chai.assert.equal(goal.hostname, 'example.com');
                    chai.assert.equal(goal.quantifier, '<');
                    chai.assert.equal(goal.timeGoal, 100000);
                });
            });
        });

        it('Can insert a goal', () => {
            const id = Meteor.call('addGoal', 'example.com', '<', 100000);
            const goals = Goals.find({}).fetch();
            chai.assert.equal(goals.length, 1);
            chai.assert.equal(goals[0]._id, id);
        });

        it('Can remove a goal', () => {
            const id = Meteor.call('addGoal', 'example.com', '<', 100000);
            Meteor.call('removeGoal', id);
            const goals = Goals.find({}).fetch();
            chai.assert.equal(goals.length, 0);
        });
    });

    describe('Goals Server Aggregation Methods', () => {

        beforeEach(() => {
            resetDatabase();
            sinon.stub(Meteor, 'userId');
            sinon.stub(Meteor, 'user');
            Meteor.user.returns({
                username: 'fakeUsername'
            });
            Meteor.userId.returns('12345');

            Meteor.call('visits.insert', 'example.com', 200);
            Meteor.call('visits.insert', 'fake.com', 100);
        });

        afterEach(() => {
            Meteor.userId.restore();
            Meteor.user.restore();
            resetDatabase();
        });

        it('can get all goals status', () => {
            Meteor.call('addGoal', 'example.com', '<', 100000, () => {
                Meteor.call('visits.insert', 'example.com', 1000000, () => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    Meteor.call('getGoalsStatus', yesterday, (goalsStatus) => {
                        chai.assert.equal(goalsStatus.length, 1);
                    });
                });
            });
        });

        it('can get a specific goal status', () => {
            Meteor.call('addGoal', 'example.com', '<', 100000, () => {
                Meteor.call('visits.insert', 'example.com', 1000000, () => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    Meteor.call('getGoalStatus', yesterday, 'example.com', (goalStatus) => {
                        chai.assert.equal(goalStatus.isFailing, true);
                        chai.assert.equal(goalStatus.timeSpent, 1000000);
                    });
                });
            });
        });
    });
}