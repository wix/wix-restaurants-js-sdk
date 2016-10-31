import ChargeV2 from '../../src/openrest4js-helpers/ChargeV2.js';
import { expect } from 'chai';
import moment from 'moment';
import { helpers, fixtures } from '../../src/index.js';

const { Charge, Time } = helpers;

describe('openrest4js-helpers: ChargesV2', () => {

    describe('isApplicable', () => {

        it('returns whether or not a charge is applicable based on delivery type, platform, minimum, and time', () => { 
            const now = moment();

            const charge = fixtures.ChargeV2().
                deliveryTypes(['delivery']).
                platforms(['mobileweb', 'web']).
                deliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                val();

            expect(ChargeV2.isApplicable({
                charge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.true;

            expect(ChargeV2.isApplicable({
                charge, orderItems:[], deliveryType:'takeout', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            expect(ChargeV2.isApplicable({
                charge, orderItems:[], deliveryType:'delivery', deliveryTime:now.clone().add(3, 'hours'), platform:'mobileweb'})).to.be.false;

            const closedCharge = fixtures.ChargeV2().
                deliveryTypes(['delivery']).
                platforms(['mobileweb', 'web']).
                deliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                close().
                val();

            expect(ChargeV2.isApplicable({
                charge:closedCharge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            const minCharge = fixtures.ChargeV2().
                deliveryTypes(['delivery']).
                platforms(['mobileweb', 'web']).
                deliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                min(1000).
                val();

            expect(ChargeV2.isApplicable({
                charge:minCharge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            expect(ChargeV2.isApplicable({
                charge:minCharge, orderItems:[{price:1000}], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.true;
        });
    });

    describe('isDisplayable', () => {
        it('returns whether or not a charge should be displayed in the cart based on delivery type, platform, and time', () => { 
            const now = moment();

            const charge = fixtures.ChargeV2().
                displayConditionDeliveryTypes(['delivery']).
                displayConditionPlatforms(['mobileweb', 'web']).
                displayConditionDeliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                val();

            expect(ChargeV2.isDisplayable({
                charge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.true;

            expect(ChargeV2.isDisplayable({
                charge, orderItems:[], deliveryType:'takeout', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            expect(ChargeV2.isDisplayable({
                charge, orderItems:[], deliveryType:'delivery', deliveryTime:now.clone().add(3, 'hours'), platform:'mobileweb'})).to.be.false;

            const closedCharge = fixtures.ChargeV2().
                displayConditionDeliveryTime(['delivery']).
                displayConditionPlatforms(['mobileweb', 'web']).
                displayConditionDeliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                close().
                val();

            expect(ChargeV2.isDisplayable({
                charge:closedCharge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            const minCharge = fixtures.ChargeV2().
                displayConditionDeliveryTypes(['delivery']).
                displayConditionPlatforms(['mobileweb', 'web']).
                displayConditionDeliveryTime(fixtures.Availability().addWeeklyFromDate({start:now.clone().subtract(1, 'hours'), end:now.clone().add(1, 'hours')}).val()).
                displayConditionMin(1000).
                val();

            expect(ChargeV2.isDisplayable({
                charge:minCharge, orderItems:[], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.false;

            expect(ChargeV2.isDisplayable({
                charge:minCharge, orderItems:[{price:1000}], deliveryType:'delivery', deliveryTime:now, platform:'mobileweb'})).to.be.true;
        });
    });

    describe.skip('calculateAmount', () => {
        it('Correctly calculates the total of a charge (TODO)', () => {
        });
    });

});