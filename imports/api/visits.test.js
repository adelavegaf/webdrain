import {Meteor} from 'meteor/meteor';
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {sinon} from 'meteor/practicalmeteor:sinon';
import {chai} from 'meteor/practicalmeteor:chai';
import Visits from './visits';

if (Meteor.isServer) {
    describe('Visits Client-Server Methods', () => {

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

        it('Can insert a visit', () => {
            const id = Meteor.call('visits.insert', 'example.com', 0);
            const visits = Visits.find({}).fetch();
            chai.assert.equal(visits.length, 1);
            chai.assert.equal(visits[0]._id, id);
        });

        it('Can update a visit', () => {
            Meteor.call('visits.insert', 'example.com', 0, () => {
                const [visit] = Visits.find({}).fetch();
                Meteor.call('visits.update', visit._id, 100, () => {
                    const [updatedVisit] = Visits.find({}).fetch();
                    chai.assert.equal(updatedVisit.timeSpent, 100);
                });
            });
        });

        it('Can remove a visit', () => {
            Meteor.call('visits.insert', 'example.com', 0, () => {
                const [visit] = Visits.find({}).fetch();
                Meteor.call('visits.remove', visit._id, () => {
                    const visits = Visits.find({}).fetch();
                    chai.assert.equal(visits.length, 0);
                });
            });
        });
    });

    describe('Visits Server Aggregation Methods', () => {

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

        it('can get time spent on each domain', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const visits = Meteor.call('visits.timeSpentSince', yesterday);
            chai.assert.equal(visits.length, 2);
        });

        it('can get domain visit frequency', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const visits = Meteor.call('visits.frequencySince', yesterday);
            chai.assert.equal(visits.length, 2);
        });

        it('can get domain usage over time', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const visits = Meteor.call('visits.getDomainUsage', 'example.com', yesterday);
            chai.assert.equal(visits.length, 1);
            chai.assert.equal(visits[0].total, 200);
        });
    });
}