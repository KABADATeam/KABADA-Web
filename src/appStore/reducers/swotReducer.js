export const swotReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCHING_SWOT_SUCCESS":
            return {
                strengthWeakness: swOfSWOT,
                opportunityThreat: otOfSWOT
            };
        case "UPDATE_SWOT_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};


const swOfSWOT = [
    {
        key: 1,
        name: 'Land',
        strengths: true,
        weakness: false,
        info: "a"
    },
    {
        key: 2,
        name: 'Facilities and equipment',
        strengths: false,
        weakness: true,
        info: "a"
    },
    {
        key: 3,
        name: 'Vehicles',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 4,
        name: 'Inventory',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 5,
        name: 'Skills and experience of employees',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 6,
        name: 'Corporate image',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 7,
        name: 'Patents',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 8,
        name: 'Trademarks',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 9,
        name: 'Copyrights',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 10,
        name: 'Operational processes',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 11,
        name: 'Management processes',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 12,
        name: 'Supporting processes',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 13,
        name: 'Product design',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 14,
        name: 'Product assortment',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 15,
        name: 'Packaging and labelling',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 16,
        name: 'Complementary and after-sales service',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 17,
        name: 'Guarantees and warranties',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 18,
        name: 'Return of goods',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 19,
        name: 'Price',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 20,
        name: 'Discounts',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 21,
        name: 'Payment terms',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 22,
        name: 'Customer convenient access to products',
        strengths: false,
        weakness: false,
        info: "a"
    },
    {
        key: 23,
        name: 'Advertising, PR and sales promotion',
        strengths: false,
        weakness: false,
        info: "a"
    },
];

const otOfSWOT = [
    {
        key: 1,
        name: 'Arrival of new technology',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: true,
        isOpportunity: true,
        isBoth: true,
        info: "a",
    },
    {
        key: 2,
        name: 'New regulations',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: true,
        isOpportunity: true,
        isBoth: false,
        info: "a",
    },
    {
        key: 3,
        name: 'Unfulfilled customer need',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: false,
        isOpportunity: true,
        isBoth: false,
        info: "a",
    },
    {
        key: 4,
        name: 'Taking business courses (training)',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: false,
        isOpportunity: true,
        isBoth: false,
        info: "a",
    },
    {
        key: 5,
        name: 'Trend changes',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: true,
        isOpportunity: false,
        isBoth: false,
        info: "",
    },
    {
        key: 6,
        name: 'New substitute products',
        checkedOpportunities: false,
        checkedThreats: false,
        isThreat: true,
        isOpportunity: false,
        isBoth: false,
        info: "",
    },
];