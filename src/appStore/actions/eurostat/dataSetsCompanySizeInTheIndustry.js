/* 
    V92100	Persons employed per enterprise - number  	 	
    V92110	Gross operating surplus/turnover (gross operating rate) - percentage
*/


export const dataSetsCompanySize = {
    "B": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "B05", "B06", "B07", "B08", "B09", "B-N_X_K" ],
                variables: ["V92100", "V92110"]
            },
        ]
    },
    "C": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C30", "C31", "C32" ],
                variables: ["V92100", "V92110"]
            }
        ]
    },
    "F": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "F41", "F411", "F4110", "F412" ],
                variables: ["V92100", "V92110"]
            }
        ]
    },
    "M": {
        dataSets: [
            {
                tableCode: "bd_9pm_r2",
                industries: [ "M","M69", "M70", "M71", "M72", "M73", "M74", "M75" ],
                variables: ["V92100", "V92110"]
            }
        ]
    },
    "S": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "S95" ],
                variables: ["V92100", "V92110"]
            },
        ]
    },
    "I": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: ["I", "I55", "I551-I553", "I56", "I561_I563"],
                variables: ["V92100", "V92110"]
            }
        ]
    },
    "J": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: ["J", "J58", "J59", "J60", "J61", "J62", "J63"],
                variables: [ "V92100", "V92110"]
            }
        ]
    },
    "N": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: ["N", "N77", "N771_N772", "N78", "N79", "N80", "N81", "N82"],
                variables: ["V92100", "V92110"]
            }          
        ]
    }, 
    "D": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "D", "D35" ],
                variables: [ "V92100", "V92110" ]
            }
        ]
    },
	"G": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "G", "G45", "G46", "G47" ],
                variables: [ "V92100", "V92110" ]
            }
        ]
    },
	"H": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "H", "H49", "H50", "H51", "H52", "H53" ],
                variables: [ "V92100", "V92110"]
            }
        ]
    },
	"E": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "E", "E36", "E37", "E38", "E39" ],
                variables: [ "V92100", "V92110" ]
            },
        ]
    },
	"L": {
        dataSets: [
            {
                tableCode: "sbs_na_sca_r2",
                industries: [ "L", "L68" ],
                variables: [ "V92100", "V92110" ]
            },
        ]
    }
}