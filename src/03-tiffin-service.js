/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
    // Your code here
    const dailyRate = {
        veg: 80,
        nonveg: 120,
        jain: 90
    }
    if (!dailyRate[mealType] || name === "" || !name) {
        return null;
    }
    return {
        name: name,
        mealType: mealType,
        days: days,
        dailyRate: dailyRate[mealType],
        totalCost: dailyRate[mealType] * days
    }

}

export function combinePlans(...plans) {
    const listOfPlans = [...plans];
    if (listOfPlans.length > 0) {
        const totalCustomers = listOfPlans.length;
        let initailCost = 0
        const totalRevenue = listOfPlans.forEach((e) => { initailCost += e.totalCost });
        const totalVeg = listOfPlans.filter(plan => plan.mealType === "veg").length
        const totalNonVeg = listOfPlans.filter(plan => plan.mealType === "nonveg").length
        const totalJains = listOfPlans.filter(plan => plan.mealType === "jain").length
        const mealBreakdown = {
            veg: totalVeg,
            nonveg: totalNonVeg,
            jain: totalJains
        }
        return {
            totalCustomers: totalCustomers,
            totalRevenue: initailCost,
            mealBreakdown: mealBreakdown
        }
    }
    else {
        return null;
    }
}

export function applyAddons(plan, ...addons) {
    // * 3. applyAddons(plan, ...addons)
    // * - plan: { name, mealType, days, dailyRate, totalCost }
    // * - Each addon: { name: "raita", price: 15 }
    // * - Add each addon price to dailyRate
    // * - Recalculate totalCost = new dailyRate * days
    // * - Return NEW plan object(don't modify original)
    // * - addonNames: array of addon names added
    // * - Agar plan null hai, return null

    if (typeof plan === "object" && plan !== null && !Array.isArray(plan)) {
        let newPlan = {...plan};
        const addonList = [...addons];
        addonList.forEach((addon) => { newPlan.dailyRate += addon.price });
        newPlan.totalCost = newPlan.dailyRate * newPlan.days;
        newPlan.addonNames = addonList.map(addon=>addon.name)
        return newPlan;
    } else {
        return null;
    }
}
