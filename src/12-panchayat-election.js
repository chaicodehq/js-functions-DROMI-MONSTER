/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
    // Your code here
    // let voter = {};
    let alreadyRegistered = new Set();
    let alreadyVoted = {};
    let whohavevoted = new Set();
    candidates.forEach((voter) => { alreadyVoted[voter.id] = 0 })

    function registerVoter(voter) {
        if (typeof voter !== "object" || Array.isArray(voter) || voter === null || voter.age < 18 || (Object.keys(voter).length) !== 3) {
            return false;
        }
        if (!alreadyRegistered.has(voter.id)) {
            alreadyRegistered.add(voter.id);
            return true;
        }
        return false;
    }
    function castVote(voterId, candidateId, onSuccess, onError) {
        if (!alreadyRegistered.has(voterId)) {
            return onError("not in voterList")
        }
        if (whohavevoted.has(voterId)) {
            return onError("have alredy voted");
        }
        if (!alreadyVoted.hasOwnProperty(candidateId)) {
            return onError("Candidate does not exist");
        }

        alreadyVoted[candidateId]++;
        whohavevoted.add(voterId);
        return onSuccess({ voterId, candidateId })
    }

    function getResults(sortFn) {
        let result = candidates.map((candi) => ({ ...candi, votes: alreadyVoted[candi.id] }))
        if (sortFn) {
            return result.sort(sortFn);
        }
        return result.sort((a, b) => b.votes - a.votes);
    }
    function getWinner() {
        let result = candidates.map(
            (candi) => (
                {
                    ...candi,
                    votes: alreadyVoted[candi.id]
                })).reduce((prev, curr) => (curr.votes > prev.votes) ? curr : prev);
        if (result.votes > 0) {
            return result;
        }
        return null;

    }
    return {
        registerVoter,
        castVote,
        getResults,
        getWinner
    }
}

export function createVoteValidator(rules) {
    // Your code here
    return function (voter) {
        let reasons = [];
        if (rules.requiredFields) {
            rules.requiredFields.forEach((rule) => {
                if (!voter.hasOwnProperty(rule)) {
                    reasons.push(`voter doesent have ${rule}`);
                }
            })
        }
        if (rules.minAge && voter.age < rules.minAge) {
            reasons.push("under age")
        }
        if (reasons.length > 0) {
            return {
                valid: false,
                reason: reasons.join(", ")
            }
        }
        return {
            valid: true,
            reason: null,
        }
    }
}

export function countVotesInRegions(regionTree) {
    // Your code here
    if (typeof regionTree !== "object" || regionTree === null || Array.isArray(regionTree)) {
        return 0;
    }
    let total = regionTree.votes || 0
    if (regionTree.subRegions && Array.isArray(regionTree.subRegions)) {
        for (let subRegion of regionTree.subRegions) {
            total += countVotesInRegions(subRegion);
        }
    }
    return total
}

export function tallyPure(currentTally, candidateId) {
    // Your code here
    let newTally = { ...currentTally };
    newTally[candidateId] = newTally[candidateId] ? newTally[candidateId] + 1 : 1
    return newTally
}
