import React from "react";

import * as Survey from "survey-react";

import "survey-react/modern.css";
import useRemoteForm from "./hooks/useRemoteForm";
import "./index.css";
import api from "./services/api";
import { Upload } from "./services/upload";

Survey.StylesManager.applyTheme("modern");

const SurveyComponent = () => {
  const form = useRemoteForm();
  const residentialPlusPlans = [
    {
      title: "Mango Duo-Play",
      price: "₦15,357",
      burstable: 10,
      "Storge Space": "25GB"
    },
    {
      title: "Mango Tri-Play",
      price: "₦25,595",
      burstable: 15,
      "Storge Space": "50GB"
    },
    {
      title: "Mango U-Play",
      price: "₦35,833",
      burstable: 20,
      "Storge Space": "75GB"
    }
  ];
  const residentialPlans = [
    { title: "Mango Basic", price: "₦12,286", burstable: 10 },
    { title: "Mango Plus", price: "₦17,405", burstable: 15 },
    { title: "Mango Premium", price: "₦22,524", burstable: 20 },
    { title: "Mango Premium +", price: "₦30,718", burstable: 30 }
  ];
  const corporatePlans = [
    { title: "Mango SME", price: "₦ 25,595", burstable: 25 },
    {
      title: "Mango Corporate Basic",
      price: "₦ 40,952",
      burstable: 35
    },
    {
      title: "Mango Corporate Plus",
      price: "₦ 46,071",
      burstable: 40
    },
    {
      title: "Mango Corporate Premium",
      price: "₦ 51,190",
      burstable: 45
    }
  ];
  const json = {
    title: "Customer Onboarding",
    description:
      "Please provide the following information to setup your account",
    logo:
      "https://mangonet.com.ng/wp-content/uploads/2019/11/mangonet-logo-e1573208220118.png",
    logoFit: "contain",
    logoHeight: 86,
    logoWidth: 180,
    textUpdateMode: "onTyping",
    completedHtml:
      "<p>Your registration has been received. We will contact you shortly.</p>",
    triggers: [
      {
        type: "copyvalue",
        expression: "{copyAddress} = 'Yes' and {address} notempty",
        setToName: "billingAddress",
        fromName: "address"
      },
      {
        type: "copyvalue",
        expression: "{copyAddress} = 'Yes' and {firstName} notempty",
        setToName: "billingFirstName",
        fromName: "firstName"
      },
      {
        type: "copyvalue",
        expression: "{copyAddress} = 'Yes' and {lastName} notempty",
        setToName: "billingLastName",
        fromName: "lastName"
      },
      {
        type: "copyvalue",
        expression: "{copyAddress} = 'Yes' and {email} notempty",
        setToName: "billingEmail",
        fromName: "email"
      },
      {
        type: "copyvalue",
        expression: "{copyAddress} = 'Yes' and {phone} notempty",
        setToName: "billingPhone",
        fromName: "phone"
      },

      //

      {
        type: "setvalue",
        expression: "{copyAddress} = 'No'",
        setToName: "billingAddress",
        fromName: ""
      },
      {
        type: "setvalue",
        expression: "{copyAddress} = 'No'",
        setToName: "billingFirstName",
        fromName: ""
      },
      {
        type: "setvalue",
        expression: "{copyAddress} = 'No'",
        setToName: "billingLastName",
        fromName: ""
      },
      {
        type: "setvalue",
        expression: "{copyAddress} = 'No'",
        setToName: "billingEmail",
        fromName: ""
      },
      {
        type: "setvalue",
        expression: "{copyAddress} = 'No'",
        setToName: "billingPhone",
        fromName: ""
      }
    ],
    pages: [
      {
        name: "page1",
        navigationDescription: "Choose your plan",
        elements: [
          {
            type: "boolean",
            name: "mode",
            title: "What type of registration do you want?",
            isRequired: true,
            labelTrue: "Business",
            labelFalse: "Residential",
            defaultValue: false,
            hideNumber: true
          },
          {
            type: "panel",
            title: "Choose a plan",
            elements: [
              {
                type: "radiogroup",
                hideNumber: true,
                isRequired: true,
                name: "plan1",
                visibleIf: "{mode} = false",
                title: "Residential Plans",
                choices: [...residentialPlans, ...residentialPlusPlans].map(
                  ({ title, price, burstable }) => ({
                    value: title,
                    text: `${title} ${price} ${burstable}Mbps`
                  })
                ),
                colCount: 2
              },
              {
                type: "radiogroup",
                hideNumber: true,
                isRequired: true,
                visibleIf: "{mode} = true",
                name: "plan2",
                title: "Corporate Plans",
                choices: corporatePlans.map(({ title, price, burstable }) => ({
                  value: title,
                  text: `${title} ${price} ${burstable}Mbps`
                })),
                colCount: 2
              }
            ]
          },
          {
            type: "panel",
            name: "residential",
            elements: [
              {
                isRequired: true,
                type: "text",
                name: "firstName",
                title: "First Name"
              },
              {
                isRequired: true,
                type: "text",
                name: "lastName",
                startWithNewLine: false,
                title: "Last Name"
              },
              {
                type: "panel",
                elements: [
                  {
                    type: "radiogroup",
                    name: "gender",
                    isRequired: true,
                    startWithNewLine: false,
                    title: "Gender",
                    choices: [
                      {
                        value: "Male",
                        text: "Male"
                      },
                      {
                        value: "Female",
                        text: "Female"
                      }
                    ],
                    colCount: 2
                  }
                ]
              },
              {
                type: "panel",
                elements: [
                  {
                    type: "text",
                    isRequired: true,
                    name: "dob",
                    titleLocation: "hidden",
                    inputType: "date"
                  }
                ],
                title: "Date of Birth"
              },
              {
                type: "text",
                isRequired: true,
                name: "phone",
                title: "Telephone (mobile) number",
                inputType: "tel"
              },
              {
                type: "text",
                isRequired: true,
                name: "email",
                title: "Email",
                inputType: "email"
              },
              {
                type: "text",
                isRequired: true,
                name: "address",
                startWithNewLine: false,
                title: "Address"
              },
              {
                type: "panel",
                elements: [
                  {
                    type: "radiogroup",
                    isRequired: true,
                    name: "residency",
                    startWithNewLine: false,
                    title: "Residency Type",
                    choices: [
                      {
                        value: "Single",
                        text: "Single"
                      },
                      {
                        value: "Multiple",
                        text: "Multiple"
                      }
                    ],
                    colCount: 2
                  }
                ]
              }
            ],
            title: "Contact Information",
            showNumber: true,
            showQuestionNumbers: "off"
          },
          {
            type: "panel",
            elements: [
              {
                type: "radiogroup",
                name: "copyAddress",
                title: "is your contact address the same as billing",
                choices: ["Yes", "No"],
                isRequired: true,
                colCount: 0
              },
              {
                type: "panel",
                elements: [
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingFirstName",
                    enableIf: "{copyAddress} != 'Yes'",
                    title: "First Name"
                  },
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingLastName",
                    enableIf: "{copyAddress} != 'Yes'",
                    startWithNewLine: false,
                    title: "Last Name"
                  },
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingCompany",
                    title: "Company",
                    visibleIf: "{mode} = true"
                  },
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingPhone",
                    enableIf: "{copyAddress} != 'Yes'",
                    title: "Telephone (mobile) number",
                    inputType: "tel"
                  },
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingEmail",
                    enableIf: "{copyAddress} != 'Yes'",
                    title: "Email",
                    inputType: "email"
                  },
                  {
                    type: "text",
                    isRequired: true,
                    name: "billingAddress",
                    enableIf: "{copyAddress} != 'Yes'",
                    startWithNewLine: false,
                    title: "Address"
                  }
                ]
              }
            ],
            title: "Billing Information",
            showNumber: true,
            showQuestionNumbers: "off"
          },
          {
            type: "panel",
            elements: [
              {
                type: "file",
                title: "Please upload your passport photograph",
                name: "passport",
                storeDataAsText: false,
                showPreview: true,
                isRequired: true,
                imageWidth: 150,
                maxSize: 1024000 * 4
              },
              {
                type: "file",
                title: "Please upload your government identification",
                name: "identification",
                storeDataAsText: false,
                isRequired: true,
                showPreview: true,
                imageWidth: 150,
                maxSize: 1024000 * 4
              },
              {
                type: "file",
                title: "Please upload your Utility Bill (Proof of Address)",
                name: "utility",
                storeDataAsText: false,
                isRequired: true,
                showPreview: true,
                imageWidth: 150,
                maxSize: 1024000 * 4
              },
              {
                type: "file",
                title:
                  "Please upload your company's certificate of incorporation",
                name: "incorporation",
                storeDataAsText: false,
                isRequired: true,
                showPreview: true,
                visibleIf: "{mode} = true",
                imageWidth: 150,
                maxSize: 1024000 * 4
              },
              {
                type: "file",
                title: "Please upload an introductory letter for your company",
                description:
                  "This letter should introduce you as the contact for your company",
                name: "letter",
                storeDataAsText: false,
                visibleIf: "{mode} = true",
                isRequired: true,
                showPreview: true,
                imageWidth: 150,
                maxSize: 1024000 * 4
              }
            ],
            title: "Documents and Photos",
            showNumber: true,
            showQuestionNumbers: "off"
          }
        ]
      },
      {
        name: "page2",
        title:
          "Please pick a date and time for our installers to inspect your location",
        elements: [
          {
            type: "text",
            isRequired: true,
            name: "inspectionDay",
            title: "Inspection Day",
            description:
              "Please pick a day when we can inspect your address for installation",
            inputType: "date"
          },
          {
            type: "text",
            isRequired: true,
            name: "inspectionTime",
            title: "Inspection Time",
            description:
              "Please pick a time when we can inspect your address for installation",
            inputType: "time"
          }
        ]
      }
    ]
  };
  const survey = new Survey.Model(json);
  survey.onUploadFiles.add(function (survey, options) {
    const file = options.files[0];
    Upload("form", form.id, options.name, file, () => {})
      .then((res) => {
        options.callback("success", [{ content: res.data.url, file }]);
      })
      .catch((err) => {
        window.alert(
          `Uploading your ${options.name} failed. Please try again.`
        );
      });
  });
  survey.onComplete.add(function (result) {
    const answers = {};
    Object.keys(result.data).forEach((name) => {
      const answer = result.data[name];
      if (["plan1", "plan2"].includes(name)) {
        answers["plan"] = answer;
      } else if (["inspectionDay", "dob"].includes(name)) {
        const unsplit = answer.split("-");
        answers[name + "Full"] = answer;
        answers[name] = {
          day: unsplit[0],
          month: unsplit[1],
          year: unsplit[2]
        };
      } else if (name === "mode") {
        if (answer === true) {
          answers[name] = "business";
        } else {
          answers[name] = "residential";
        }
      } else {
        answers[name] = Array.isArray(answer) ? answer[0].contennt : answer;
      }
    });
    return api.put("store/form/" + form.id, answers);
  });
  if (!form) return null;
  return <Survey.Survey model={survey} />;
};

export default SurveyComponent;
