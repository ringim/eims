export const surveyData = {
    pages: [
      { 
        type: "radiogroup",
        name: "q1" ,
        title: 
        "1. Please tell me about the COVID-19, HIV/AIDS, TB and Malaria services you offer in this health facility:",
        description: "(Choose as many as applicable)",
        isRequired: true,
        colCount: "2",
        choices: [
            {
                value: "excellent",
                text: "Excellent",
            },
            {
                value: "good",
                text: "Good",
            },
            {
                value: "poor",
                text: "Poor",
            },
            {
                value: "other",
                text: "Other",
            }           
        ],
        placeholder: "Please specify"
      },

      {
        name:"q2",
        type: "checkboxes",
        title: "2. What resources are required to provide COVID-19, HIV/AIDS, TB and Malaria services effectively? (Choose as many as applicable)",
        choices: [
            "Human Resources", "Training", "Consumables", "Non-consumables", "Others"
        ],
        isRequired: true,
        placeholder: "Please specify"
      },

      {
        name: "q3a",
        type: "checkboxes",
        title: 
        "3a. What are the resources available (quantity) to ensure COVID-19, HIV/AIDS, TB and Malaria service delivery? ",
        choices: [
            "Human Resources", "Training", "Others"
        ],
        isRequired: true,
        placeholder: "Please specify"
      },

      {
        name: "q3b",
        type: "text",
        title: "3b. What is the level of knowledge available (quality) to ensure COVID-19, HIV/AIDS, TB and Malaria service delivery? ",
        placeholder: " ",        
      },

      {
        name: "3c. Please confirm the availability and sufficiency of these resources",
        type: "matrixdropdown",
        title: "3c. Please confirm the availability and sufficiency of these resources",
        isAllRowRequired: true,
        isRequired: true,
        columns: [
            {
                name: "col1",
                cellType: "checkbox",
                showInMultipleColumns: true,
                choices: ["Available", "Sufficient"],

            } 
        ],

        rows: [
            "Consumables", "Non-Consumables"
        ],
      },

      {
        name: "q3d",
        type: "text",
        title: "3d. Who is responsible for providing these resources?",
        placeholder: "Please specify"
      },

      {
        name: "q3e ",
        type: "checkbox",
        title: "3e. What is the level of security available in this facility? ",
        choices: [
            "Perimeter Fencing", 
            "Burglar Proof",
            "Security Personnel"
        ]
      },

      {
        name: "q4",
        type: "checkbox",
        title: " 4. What is the current monthly inflow of patients seeking COVID-19, HIV/AIDS, TB and Malaria services at the facility? ",
        choices: [
            "1 - 9 Hundred ",
            "10 - 20 thousand",
            "20 - 30 thousand",
            "Others"
        ],
        placeholder: "Please specifiy"
      },

      {
        name: "q5",
        type: "checkbox",
        title: "5. What is the monthly patients-service provider ratio? ",
        description:"(The number of patients to the number of health care provider) ? ",
        choices:[
            "2:2",
            "2:4",
            "2:6",
            "others"
        ],
        placeholder: "Please specify"
      },

      {
        name: "q6",
        type: "checkbox",
        title: "6. Can you tell me about the challenges currently faced in delivering COVID-19, HIV/AIDS, TB and Malaria services?  ",
        choices:[
            "Inadequate Skilled Personnel",
            "Stock out of malaria commodities",
            "Inadequate infrastructures",
            "Others"
        ],
        placeholder: "Please specify"

      },

      {
        name: "q7",
        type: "checkbox",
        title: "7. What is the level of community structure involvement in COVID-19, HIV/AIDS, TB and Malaria service delivery? ",
        choices:[
            "Active",
            "Non-Active",
            "Indifferent"
        ]
      },

      {
        name: "q8",
        type: "checkbox",
        title: "8. Are Personal Protective Equipment (PPE) in your facility sufficient?  ",
        choices:[
            "Sufficient",
            "Non-Sufficient",
            "None"
        ]
      },


      {
        name: "q8",
        type: "checkbox",
        title: "9 Are the community people using PPE correctly and at all times? ",
        choices:[
            "Sufficient",
            "Non-Sufficient",
            "None"
        ]
      },      

    ],
    showProgressBar: "top",
    showQuestionNumbers: "on",
}