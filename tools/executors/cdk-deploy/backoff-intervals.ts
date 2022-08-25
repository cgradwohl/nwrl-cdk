/**
 * 1. - 5 0 (retry 5 )
 *
 * 6. 1 min
 * 7. 1 min
 * 8. 2 min
 * 9. 3 min
 * 10. 5 min
 * 11. 10 min
 *
 * 12. - 15. 15 min until max 72 hours
 *
 * dump into another longer term DLQ ?
 *  how do you initiate bulk redelivery?
 *
 *
 *
 * concerns:
 *  - 120k inflight messages
 *  - fairness and blocking
 *
 *
 *
 * Chris Cycle:
 *    Webook:
 *    1. retry mechanism
 *    2. longer term DLQ, ability to drain the LT_DLQ back onto the main Queue
 *    3. implement specific intervals for Free, Business and Enterprise tiers
 *
 * Alex Cycle:
 *    1. 3 days @ 10%
 *    2. 1 day @ 20%
 *
 *
 */
