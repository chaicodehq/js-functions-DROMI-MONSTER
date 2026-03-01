/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
    // Your code here
    let festivals = 0;
    let festivalNames = [];
    function addFestival(name, date, type) {
        let checked = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
        if (!checked || typeof type !== "string" || typeof name !== "string" || name === "" || type === "") {
            return -1;
        }
        if ((type === "religious" || type === "national" || type === "cultural") && !festivalNames.some((n) => n.name === name) ) {
            festivals++;
            festivalNames.push({
                name: name,
                date: date,
                type: type,
            });
            return festivals;
        }
        else {
            return -1;
        }
    }
    function removeFestival(name) {
        if (festivalNames.some((n) => n.name === name)) {
            festivalNames = festivalNames.filter((e) => (e.name !== name));
            festivals--;
            return true;
        }
        return false;
    }
    function getAll() {
        return [...festivalNames];
    }
    function getByType(type) {
        return festivalNames.filter(festival => festival.type === type);
    }
    function getUpcoming(currentDate, n = 3) {

        // let refinedDate = Number(currentDate.split("-")[2]);
        let AllupcomingFestivals = festivalNames.filter((e) => e.date >= currentDate).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        let upcomingFestivals = [] , i =0;
        while (i < n && i < AllupcomingFestivals.length) {
            upcomingFestivals.push(AllupcomingFestivals[i]);
            i++;
        }
        console.log(AllupcomingFestivals);
        return upcomingFestivals.sort((a, b) => a.date - b.date);

    }
    function getCount() {
        return festivals;
    }

    return {
        addFestival,
        removeFestival,
        getAll,
        getByType,
        getUpcoming,
        getCount,
    }
}
