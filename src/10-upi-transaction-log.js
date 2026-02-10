/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
    // Your code here
    // console.log(transactions);

    if (
        !Array.isArray(transactions) ||
        transactions.length === 0 ||
        transactions === null
    )
        return null;

    transactions = transactions
        .filter((transaction) => transaction.amount > 0)
        .filter((transaction) =>
            ["credit", "debit"].includes(transaction.type),
        );

    if (transactions.length === 0) return null;

    const totalCredit = transactions
        .filter((transaction) => transaction.type === "credit")
        .map((transaction) => transaction.amount)
        .reduce((acc, amt) => acc + amt, 0);
    const totalDebit = transactions
        .filter((transaction) => transaction.type === "debit")
        .map((transaction) => transaction.amount)
        .reduce((acc, amt) => acc + amt, 0);

    const netBalance = totalCredit - totalDebit;

    const transactionAmounts = transactions.map(
        (transaction) => transaction.amount,
    );

    const totalAmount = transactionAmounts.reduce(
        (acc, amount) => acc + amount,
        0,
    );
    const transactionCount = transactionAmounts.length;
    const avgTransaction = totalAmount / transactionCount;

    const highestTransaction =
        transactions[
            transactionAmounts.indexOf(Math.max(...transactionAmounts))
        ];

    const categoryBreakdown = {};

    transactions.forEach((transaction) => {
        if (categoryBreakdown.hasOwnProperty(transaction.category)) {
            categoryBreakdown[transaction.category] += transaction.amount;
        } else {
            categoryBreakdown[transaction.category] = transaction.amount;
        }
    });

    const allAbove100 = transactionAmounts.every((amt) => amt > 100);
    const hasLargeTransaction = transactionAmounts.some((amt) => amt > 1000);

    const mostOftenObj = {};
    transactions.forEach((transaction) => {
        if (mostOftenObj.hasOwnProperty(transaction.to)) {
            mostOftenObj[transaction.to] += 1;
        } else {
            mostOftenObj[transaction.to] = 1;
        }
    });
    const mostOftenArray = Object.entries(mostOftenObj);
    const mostOftenCount = mostOftenArray.map((mst) => mst[1]);
    const mostOftenContact =
        mostOftenArray[mostOftenCount.indexOf(Math.max(...mostOftenCount))][0];

    return {
        totalCredit,
        totalDebit,
        netBalance,
        transactionCount,
        avgTransaction,
        highestTransaction,
        categoryBreakdown,
        allAbove100,
        hasLargeTransaction,
        frequentContact: mostOftenContact,
    };
}
