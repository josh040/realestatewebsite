const houses = [
    // Example house objects with relevant properties
    {
        id: 1,
        price: 250000,
        location: "City A",
        annualInsurancePrice: 1500,
        // ...other properties
    },
    {
        id: 2,
        price: 325000,
        location: "City B",
        annualInsurancePrice: 1800,
        // ...other properties
    },
    {
        id: 3,
        price: 525000,
        location: "City C",
        annualInsurancePrice: 2000,
        // ...other properties
    },
    // ...add more example homes
];
const textDescriptions = [];
// Function to filter homes based on various criteria
function filterHomes(criteria) {
    let filteredHomes = houses.slice(); // Avoid modifying original array
    let spread;
    for (let i = 0; i < houses.length; i++) {
        const house = houses[i];
        // Filter by total price (range or spread)
        if (criteria.hasOwnProperty(("location"))){
            filteredHomes = filteredHomes.filter((house) => {
                return criteria.location === house.location;
            });
        }
        if (criteria.hasOwnProperty("price")) {
            if (criteria.price.hasOwnProperty("range")) {
                filteredHomes = filteredHomes.filter((house) => {
                    return house.price >= criteria.price.range.min && house.price <= criteria.price.range.max;
                });


                if (criteria.price.range.hasOwnProperty("spread")) {
                    spread = criteria.price.range.spread
                    const minPrice = criteria.price.range.min
                    const maxPrice = criteria.price.range.max
                    const basePrice = (minPrice + maxPrice) / 2
                    if (typeof spread === 'string' && spread.endsWith('%')) {
                        // Remove the percentage sign
                        const percentage = parseFloat(spread.slice(0, -1));

                        // Calculate the actual spread value
                        spread = basePrice * (percentage / 100);
                    }
                    const iterations = (maxPrice - minPrice) / spread

                    const priceRanges = calculatePriceRanges(
                        basePrice,
                        spread,
                        iterations
                    );

                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (house.price >= range.minPrice && house.price <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                    if (house.price >= maxPrice && house.price <= (maxPrice + spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + maxPrice + " and " + (maxPrice + spread))
                    } else if (house.price <= minPrice && house.price >= (minPrice - spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + (minPrice - spread) + " and " + minPrice)
                    }
                }
// Range filtering
            }
            if (criteria.price.hasOwnProperty("spread")) {
                if (criteria.price.spread.hasOwnProperty("up")){
                    const priceRanges = calculatePriceRangesUp(
                        criteria.price.spread.basePrice,
                        criteria.price.spread.spread,
                        criteria.price.spread.iterations
                    );
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (house.price >= range.minPrice && house.price <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }
                if (criteria.price.spread.hasOwnProperty("down")) {
                    const priceRanges = calculatePriceRangesDown(
                        criteria.price.spread.basePrice,
                        criteria.price.spread.spread,
                        criteria.price.spread.iterations
                    );
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (house.price >= range.minPrice && house.price <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                }
                if (criteria.price.spread.hasOwnProperty("both")){
                    const priceRanges = calculatePriceRanges(
                        criteria.price.spread.basePrice,
                        criteria.price.spread.spread,
                        criteria.price.spread.iterations
                    );
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (house.price >= range.minPrice && house.price <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                }

            }
        }

        if (criteria.hasOwnProperty("downPayment")) {
            // Filter by down payment (range or spread)
            if (criteria.downPayment.hasOwnProperty("range")) {
// Range filtering

                const {maxDownPayment, downPaymentPercentage} = criteria.downPayment.range;
                const totalHomePrice = house.price;
                const calculatedDownPayment = totalHomePrice * (downPaymentPercentage / 100);
                filteredHomes = filteredHomes.filter((house) => {
                    return calculatedDownPayment <= maxDownPayment;
                });



                if (criteria.downPayment.range.hasOwnProperty("spread")) {
                    spread = criteria.downPayment.range.spread
                    const minPrice = criteria.downPayment.range.minDownPayment
                    const maxPrice = criteria.downPayment.range.maxDownPayment
                    const basePrice = (minPrice + maxPrice) / 2
                    if (typeof spread === 'string' && spread.endsWith('%')) {
                        // Remove the percentage sign
                        const percentage = parseFloat(spread.slice(0, -1));

                        // Calculate the actual spread value
                        spread = basePrice * (percentage / 100);
                    }
                    const iterations = (maxPrice - minPrice) / spread

                    const priceRanges = calculatePriceRanges(
                        basePrice,
                        criteria.downPayment.range.spread,
                        iterations
                    );

                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (calculatedDownPayment >= range.minPrice && calculatedDownPayment <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                    if (calculatedDownPayment >= maxPrice && calculatedDownPayment <= (maxPrice + spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + maxPrice + " and " + (maxPrice + spread))
                    } else if (calculatedDownPayment <= minPrice && calculatedDownPayment >= (minPrice - spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + (minPrice - spread) + " and " + minPrice)
                    }
                }

            }
            if (criteria.downPayment.hasOwnProperty("spread")) {
                if (criteria.downPayment.spread.hasOwnProperty("up")){
                    const priceRanges = calculatePriceRangesUp(
                        criteria.downPayment.spread.basePrice,
                        criteria.downPayment.spread.spread,
                        criteria.downPayment.spread.iterations
                    );
                    const totalHomePrice = house.price;
                    const calculatedDownPayment = totalHomePrice * (criteria.downPayment.spread.downPaymentPercentage / 100);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (calculatedDownPayment >= range.minPrice && calculatedDownPayment <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }
                if (criteria.downPayment.spread.hasOwnProperty("down")) {
                    const priceRanges = calculatePriceRangesDown(
                        criteria.downPayment.spread.basePrice,
                        criteria.downPayment.spread.spread,
                        criteria.downPayment.spread.iterations
                    );
                    const totalHomePrice = house.price;
                    const calculatedDownPayment = totalHomePrice * (criteria.downPayment.spread.downPaymentPercentage / 100);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (calculatedDownPayment >= range.minPrice && calculatedDownPayment <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                }
                if (criteria.downPayment.spread.hasOwnProperty("both")) {
                    const priceRanges = calculatePriceRanges(
                        criteria.downPayment.spread.basePrice,
                        criteria.downPayment.spread.spread,
                        criteria.downPayment.spread.iterations
                    );
                    const totalHomePrice = house.price;
                    const calculatedDownPayment = totalHomePrice * (criteria.downPayment.spread.downPaymentPercentage / 100);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (calculatedDownPayment >= range.minPrice && calculatedDownPayment <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }
// Spread filtering

            }
        }


// Filter by home insurance (range or spread)
        if (criteria.hasOwnProperty("homeInsurance")) {
            if (criteria.homeInsurance.hasOwnProperty("range")) {
                // Range filtering
                const {minPrice, maxPrice, paymentFrequency} = criteria.homeInsurance.range;
                const adjustedPrice = house.annualInsurancePrice / getPaymentMultiplier(paymentFrequency);
                filteredHomes = filteredHomes.filter((house) => {
                    return adjustedPrice >= minPrice && adjustedPrice <= maxPrice;
                });

                if (criteria.homeInsurance.range.hasOwnProperty("spread")) {
                    spread = criteria.homeInsurance.range.spread
                    const minPrice = criteria.homeInsurance.range.minPrice
                    const maxPrice = criteria.homeInsurance.range.maxPrice
                    const basePrice = (minPrice + maxPrice) / 2
                    if (typeof spread === 'string' && spread.endsWith('%')) {
                        // Remove the percentage sign
                        const percentage = parseFloat(spread.slice(0, -1));

                        // Calculate the actual spread value
                        spread = basePrice * (percentage / 100);
                    }
                    const iterations = (maxPrice - minPrice) / spread

                    const priceRanges = calculatePriceRanges(
                        basePrice,
                        spread,
                        iterations
                    );

                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (adjustedPrice >= range.minPrice && adjustedPrice <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                    if (adjustedPrice >= maxPrice && adjustedPrice <= (maxPrice + spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + maxPrice + " and " + (maxPrice + spread))
                    } else if (adjustedPrice <= minPrice && adjustedPrice >= (minPrice - spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + (minPrice - spread) + " and " + minPrice)
                    }
                }
            }
            if (criteria.homeInsurance.hasOwnProperty("spread")) {
                // Spread filtering
                if (criteria.homeInsurance.spread.hasOwnProperty("up")){
                    const priceRanges = calculatePriceRangesUp(
                        criteria.homeInsurance.spread.basePrice,
                        criteria.homeInsurance.spread.spread,
                        criteria.homeInsurance.spread.iterations
                    );
                    const adjustedPrice = house.annualInsurancePrice / getPaymentMultiplier(criteria.homeInsurance.spread.paymentFrequency);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (adjustedPrice >= range.minPrice && adjustedPrice <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }
                if (criteria.homeInsurance.spread.hasOwnProperty("down")) {
                    const priceRanges = calculatePriceRangesDown(
                        criteria.homeInsurance.spread.basePrice,
                        criteria.homeInsurance.spread.spread,
                        criteria.homeInsurance.spread.iterations
                    );
                    const adjustedPrice = house.annualInsurancePrice / getPaymentMultiplier(criteria.homeInsurance.spread.paymentFrequency);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (adjustedPrice >= range.minPrice && adjustedPrice <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                }
                if (criteria.homeInsurance.spread.hasOwnProperty("both")) {
                    const priceRanges = calculatePriceRanges(
                        criteria.homeInsurance.spread.basePrice,
                        criteria.homeInsurance.spread.spread,
                        criteria.homeInsurance.spread.iterations
                    );
                    const adjustedPrice = house.annualInsurancePrice / getPaymentMultiplier(criteria.homeInsurance.spread.paymentFrequency);
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (adjustedPrice >= range.minPrice && adjustedPrice <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }

            }
        }


// Filter by taxes (range or spread)
        if (criteria.hasOwnProperty("taxes")) {
            if (criteria.taxes.hasOwnProperty("range")) {

                const {minTaxes, maxTaxes} = criteria.taxes.range;
                const estimatedTaxes = estimateTaxes(house.price)
                filteredHomes = filteredHomes.filter((house) => {
                    return estimatedTaxes >= minTaxes && estimatedTaxes <= maxTaxes;
                });

                if (criteria.taxes.range.hasOwnProperty("spread")) {
                    spread = criteria.taxes.range.spread
                    const minPrice = criteria.taxes.range.minTaxes
                    const maxPrice = criteria.taxes.range.maxTaxes
                    const basePrice = (minPrice + maxPrice) / 2
                    if (typeof spread === 'string' && spread.endsWith('%')) {
                        // Remove the percentage sign
                        const percentage = parseFloat(spread.slice(0, -1));

                        // Calculate the actual spread value
                        spread = basePrice * (percentage / 100);
                    }
                    const iterations = (maxPrice - minPrice) / spread

                    const priceRanges = calculatePriceRanges(
                        basePrice,
                        spread,
                        iterations
                    );

                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (estimatedTaxes >= range.minPrice && estimatedTaxes <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                    if (estimatedTaxes >= maxPrice && estimatedTaxes <= (maxPrice + spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + maxPrice + " and " + (maxPrice + spread))
                    } else if (estimatedTaxes <= minPrice && estimatedTaxes >= (minPrice - spread)) {
                        textDescriptions.push(house.id + " is in the spread between " + (minPrice - spread) + " and " + minPrice)
                    }
                }
            }
            if (criteria.taxes.hasOwnProperty("spread")) {
                // Spread filtering
                if (criteria.taxes.spread.hasOwnProperty("up")){
                    const priceRanges = calculatePriceRangesUp(
                        criteria.taxes.spread.basePrice,
                        criteria.taxes.spread.spread,
                        criteria.taxes.spread.iterations
                    );
                    const estimatedTaxes = estimateTaxes(house.price)
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (estimatedTaxes >= range.minPrice && estimatedTaxes <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }
                if (criteria.taxes.spread.hasOwnProperty("down")) {
                    const priceRanges = calculatePriceRangesDown(
                        criteria.taxes.spread.basePrice,
                        criteria.taxes.spread.spread,
                        criteria.taxes.spread.iterations
                    );
                    const estimatedTaxes = estimateTaxes(house.price)
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (estimatedTaxes >= range.minPrice && estimatedTaxes <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }
                }
                if (criteria.taxes.spread.hasOwnProperty("both")) {
                    const priceRanges = calculatePriceRanges(
                        criteria.taxes.spread.basePrice,
                        criteria.taxes.spread.spread,
                        criteria.taxes.spread.iterations
                    );
                    const estimatedTaxes = estimateTaxes(house.price)
                    for (const range of priceRanges) {
                        // Check if the house price falls within the range
                        if (estimatedTaxes >= range.minPrice && estimatedTaxes <= range.maxPrice) {
                            textDescriptions.push(house.id + " is in the spread between " + range.minPrice + " and " + range.maxPrice)
                        }
                    }

                }

            }
        }
    }
    return filteredHomes;
}
function calculatePriceRanges(basePrice, spread, iterations) {
    const priceRanges = [];
    let otherPrice = basePrice
    // Check if spread is a percentage and calculate accordingly
    if (typeof spread === 'string' && spread.endsWith('%')) {
        // Remove the percentage sign
        const percentage = parseFloat(spread.slice(0, -1));

        // Calculate the actual spread value
        spread = basePrice * (percentage / 100);
    }
    if (iterations % 2 !== 0){
        // Calculate center range with spread added to maxPrice
        priceRanges.push({"minPrice": basePrice, "maxPrice": basePrice + spread});
        iterations = (iterations - 1)
    } else {
        otherPrice = (basePrice - spread)
    }
    // Calculate upward and downward spreads
    let minPrice_up;
    let maxPrice_up;
    let minPrice_down;
    let maxPrice_down;
    for (let i = 1; i <= iterations; i++) {
        minPrice_up = otherPrice + (spread * i);
        maxPrice_up = minPrice_up + spread;
        priceRanges.push({"minPrice": minPrice_up, "maxPrice": maxPrice_up});

        minPrice_down = basePrice - (spread * i);
        maxPrice_down = minPrice_down + spread;
        priceRanges.push({"minPrice": minPrice_down, "maxPrice": maxPrice_down});
        iterations = (iterations - 1)
    }
    return priceRanges;
}

function calculatePriceRangesUp(basePrice, spread, iterations) {
    const priceRangesUp = [];
    // Check if spread is a percentage and calculate accordingly
    if (typeof spread === 'string' && spread.endsWith('%')) {
        // Remove the percentage sign
        const percentage = parseFloat(spread.slice(0, -1));

        // Calculate the actual spread value
        spread = basePrice * (percentage / 100);
    }
    priceRangesUp.push({"minPrice": basePrice, "maxPrice": basePrice + spread});
    iterations = (iterations - 1)
    // Calculate upward spread
    let minPrice_up;
    let maxPrice_up;
    for (let i = 1; i <= iterations; i++) {
        minPrice_up = basePrice + (spread * i);
        maxPrice_up = minPrice_up + spread;
        priceRangesUp.push({"minPrice": minPrice_up, "maxPrice": maxPrice_up});
    }
    return priceRangesUp;
}

function calculatePriceRangesDown(basePrice, spread, iterations) {
    const priceRangesDown = [];
    // Check if spread is a percentage and calculate accordingly
    if (typeof spread === 'string' && spread.endsWith('%')) {
        // Remove the percentage sign
        const percentage = parseFloat(spread.slice(0, -1));

        // Calculate the actual spread value
        spread = basePrice * (percentage / 100);
    }
    // Calculate upward and downward spreads
    let minPrice_down;
    let maxPrice_down;
    for (let i = 1; i <= iterations; i++) {

        minPrice_down = basePrice - (spread * i);
        maxPrice_down = minPrice_down + spread;
        priceRangesDown.push({"minPrice": minPrice_down, "maxPrice": maxPrice_down});
    }
    return priceRangesDown;
}

function estimateTaxes(housePrice) {
// Replace with your preferred method for estimating taxes

// Assuming a fixed tax rate of 1% (change this based on actual rates)
    const taxRate = 0.01;

// Estimate annual taxes based on price, rate, and multiplier
    return housePrice * taxRate;
}
function getPaymentMultiplier(paymentFrequency) {
    switch (paymentFrequency.toLowerCase()) {
        case "monthly":
            return 12;
        case "quarterly":
            return 4;
        case "biannually":
            return 2;
        case "annually":
            return 1;
        default:
            throw new Error(`Invalid payment frequency: ${paymentFrequency}`);
    }
}

// Function to gather user input for filtering criteria
function gatherFilterCriteria() {
    // Prompt the user for desired filters and collect their choices
    // (implement using prompts, menus, or other input methods as needed)
    return {
        // Example:
        maxResults: 2,
        location: "City A",
        price: {
            range: {
                min: 250000,
                max: 350000,
                spread: '10%'
            },
            spread: {
                basePrice: 240000,  // Base annual insurance price
                spread: 10000,      // Spread amount
                iterations: 10,    // Number of iterations
                both: ''
            },
        },

        downPayment: {
            range: {
                maxDownPayment: 40000,
                minDownPayment: 26000,
                downPaymentPercentage: 10,
                spread:"20%"
            },
            spread: {
                basePrice: 20000,  // Base annual insurance price
                spread: 5000,      // Spread amount
                iterations: 5,    // Number of iterations
                downPaymentPercentage: 10,
                up:''
            },
        },
        homeInsurance: {
            // Choose either "range" or "spread" filtering:
            range: {
                minPrice: 0,  // Minimum annual insurance price
                maxPrice: 10000000,  // Maximum annual insurance price
                paymentFrequency: "annually",  // Payment frequency
                spread: 1000,
            },
            // OR
            spread: {
                basePrice: 1400,  // Base annual insurance price
                spread: 500,      // Spread amount
                iterations: 2,    // Number of iterations
                paymentFrequency: "annually",
                up: ''
            },
        },
        taxes: {
            range: {
                minTaxes: 0,
                maxTaxes: 1000000,
                spread: '10%',
            },
            spread: {
                basePrice: 1000,  // Base annual insurance price
                spread: '10%',      // Spread amount
                iterations: 10,
                down: ''// Number of iterations
            },
        },
        // ...collect other criteria based on user input

    };
}

// Function to display filtered homes in a user-friendly format
function displayFilteredHomes(filteredHomes, criteria = gatherFilterCriteria()) {
    // Present the filtered homes in a clear and informative way
    // (implement using console output, UI elements, or other display methods)
    textDescriptions.push("Filtered Homes:");
    if(criteria.maxResults > 0 ){

        let count = 0; // Keep track of displayed results
        const maxResults = criteria.maxResults
        for (const house of filteredHomes) {
            textDescriptions.push(`- ID: ${house.id}, Price: ${house.price}, Location: ${house.location}`);
            // ...display other relevant information

            count++;
            if (count >= maxResults) {
                break; // Stop displaying if we've reached the limit
            }
        }
    } else {
        for (const house of filteredHomes) {
            textDescriptions.push(`- ID: ${house.id}, Price: ${house.price}, Location: ${house.location}`);
            // ...display other relevant information
        }
    }
}

// Main function to test the code
export function testFilterFunctionality() {
    try {
        const criteria = gatherFilterCriteria();

        const filteredHomes = filterHomes(criteria);
        displayFilteredHomes(filteredHomes);
        return textDescriptions;
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}
testFilterFunctionality()








