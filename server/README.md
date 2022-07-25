# Interform Server
Powering stellar communications via IPFS.

## Adding a new public mirror
```
cd interform-dir/interform
echo "<URL NAME>" > mirror2 # or insert appropriate mirror # here
ipfs add interform-dir/interform/mirror2
```

Beware of phishing!


## API

### Routes
#### Forms
Note: see `mocks/fashion-form.json` for an example.

POST: `/api/forms`
Request:
```
{
  name: `<form name>`,
  timestamp: `<timestamp`,
  formOptions: `<form options>`,
}
```

Response:
```
{
  success: true,
  result: {
    cid: formCid,
  },
  message: "Form added successfully",
}
```

GET: `/api/forms/<form cid>`
Response:
```
{
  success: true,
  result: {
    cid: formCid,
    content,
  },
}
```

GET: `/api/forms/address/<address>`
Response:
```
{
    "success": true,
    "address": "0xsneakerhead",
    "result": [
        {
            "address": "0xsneakerhead",
            "type": "form",
            "name": "Sneakerheadz",
            "timestamp": 1658620369907,
            "formOptions": [
                {
                    "question": "What sparked your interest in Sneakers, or more broadly, Fashion?",
                    "label": "interests",
                    "description": "a life experience, specific sneaker model, etc.",
                    "isRequired": true,
                    "type": "longinput",
                    "placeholder": ""
                },
                {
                    "question": "Do you consider yourself a sneakerhead?",
                    "label": "isSneakerhead",
                    "description": "",
                    "isRequired": true,
                    "type": "radio",
                    "options": [
                        {
                            "label": "Yes",
                            "value": "yes"
                        },
                        {
                            "label": "No",
                            "value": "no"
                        }
                    ]
                },
                {
                    "question": "How often do you wear sneakers in real life?",
                    "description": "Please select the closest option.",
                    "label": "wearCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ]
                },
                {
                    "question": "How often do you purchase digital collectibles?",
                    "description": "Please select the closest option.",
                    "label": "purchaseCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ]
                },
                {
                    "question": "What type of digital collectibles do you interact with?",
                    "description": "Select all that apply.",
                    "label": "digitalCollectibles",
                    "isRequired": true,
                    "type": "multiselect",
                    "options": [
                        {
                            "label": "NFTs",
                            "value": "nfts"
                        },
                        {
                            "label": "In-game Assets",
                            "value": "inGameAssets"
                        },
                        {
                            "label": "Digital Fashion",
                            "value": "digitalFashion"
                        },
                        {
                            "label": "On-chain passes",
                            "value": "onChainPasses"
                        }
                    ]
                },
                {
                    "question": "What would you like to see in a digital sneaker collection?",
                    "label": "openEndedPreference",
                    "description": "",
                    "isRequired": true,
                    "type": "input",
                    "placeholder": ""
                }
            ]
        }
    ]
}
```

#### Entries
POST: `/api/entries`
Request:
```
{
  formCid: `<long ipfs entry cid here>`,
  response: `<JSON data containing the user's response/entry`
}
```

Response:
```
{
  success: true,
  result: {
    entryCid,
    formCid,
  },
  message: "Entry added successfully",
}
```

GET: `/api/entries/<entry cid>`
Response:
```
{
  success: true,
  result: {
    cid: entryCid,
    content,
  },
}
```

GET: `/api/entries/form/formCid`
Response:
```
{
    "success": true,
    "address": "0xsneakerhead",
    "result": [
        {
            "name": "Sneakerheadz",
            "formCid": "QmUz2hc31Z1MDj5Lvxvxpv7DtR5LhRhbqp1uNPncti7Lki",
            "address": "0xsneakerhead",
            "response": [
                {
                    "question": "What sparked your interest in Sneakers, or more broadly, Fashion?",
                    "label": "interests",
                    "description": "a life experience, specific sneaker model, etc.",
                    "isRequired": true,
                    "type": "longinput",
                    "placeholder": "",
                    "answer": "yooooo"
                },
                {
                    "question": "Do you consider yourself a sneakerhead?",
                    "label": "isSneakerhead",
                    "description": "",
                    "isRequired": true,
                    "type": "radio",
                    "options": [
                        {
                            "label": "Yes",
                            "value": "yes"
                        },
                        {
                            "label": "No",
                            "value": "no"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "How often do you wear sneakers in real life?",
                    "description": "Please select the closest option.",
                    "label": "wearCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "How often do you purchase digital collectibles?",
                    "description": "Please select the closest option.",
                    "label": "purchaseCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "What type of digital collectibles do you interact with?",
                    "description": "Select all that apply.",
                    "label": "digitalCollectibles",
                    "isRequired": true,
                    "type": "multiselect",
                    "options": [
                        {
                            "label": "NFTs",
                            "value": "nfts"
                        },
                        {
                            "label": "In-game Assets",
                            "value": "inGameAssets"
                        },
                        {
                            "label": "Digital Fashion",
                            "value": "digitalFashion"
                        },
                        {
                            "label": "On-chain passes",
                            "value": "onChainPasses"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "What would you like to see in a digital sneaker collection?",
                    "label": "openEndedPreference",
                    "description": "",
                    "isRequired": true,
                    "type": "input",
                    "placeholder": "",
                    "answer": "yooooo"
                }
            ],
            "type": "entry",
            "timestamp": 1658620369907
        }
    ]
}
```

GET: `/api/entries/form/formCid`
Response:
```
{
    "success": true,
    "formCid": "QmUz2hc31Z1MDj5Lvxvxpv7DtR5LhRhbqp1uNPncti7Lki",
    "result": [
        {
            "name": "Sneakerheadz",
            "formCid": "QmUz2hc31Z1MDj5Lvxvxpv7DtR5LhRhbqp1uNPncti7Lki",
            "address": "0xsneakerhead",
            "response": [
                {
                    "question": "What sparked your interest in Sneakers, or more broadly, Fashion?",
                    "label": "interests",
                    "description": "a life experience, specific sneaker model, etc.",
                    "isRequired": true,
                    "type": "longinput",
                    "placeholder": "",
                    "answer": "yooooo"
                },
                {
                    "question": "Do you consider yourself a sneakerhead?",
                    "label": "isSneakerhead",
                    "description": "",
                    "isRequired": true,
                    "type": "radio",
                    "options": [
                        {
                            "label": "Yes",
                            "value": "yes"
                        },
                        {
                            "label": "No",
                            "value": "no"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "How often do you wear sneakers in real life?",
                    "description": "Please select the closest option.",
                    "label": "wearCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "How often do you purchase digital collectibles?",
                    "description": "Please select the closest option.",
                    "label": "purchaseCadence",
                    "isRequired": true,
                    "type": "select",
                    "options": [
                        {
                            "label": "Once a day",
                            "value": "daily"
                        },
                        {
                            "label": "A few times a week",
                            "value": "fewWeekly"
                        },
                        {
                            "label": "Once a week",
                            "value": "weekly"
                        },
                        {
                            "label": "Twice a month",
                            "value": "bimonthly"
                        },
                        {
                            "label": "Once a month",
                            "value": "monthly"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "What type of digital collectibles do you interact with?",
                    "description": "Select all that apply.",
                    "label": "digitalCollectibles",
                    "isRequired": true,
                    "type": "multiselect",
                    "options": [
                        {
                            "label": "NFTs",
                            "value": "nfts"
                        },
                        {
                            "label": "In-game Assets",
                            "value": "inGameAssets"
                        },
                        {
                            "label": "Digital Fashion",
                            "value": "digitalFashion"
                        },
                        {
                            "label": "On-chain passes",
                            "value": "onChainPasses"
                        }
                    ],
                    "answer": "yooooo"
                },
                {
                    "question": "What would you like to see in a digital sneaker collection?",
                    "label": "openEndedPreference",
                    "description": "",
                    "isRequired": true,
                    "type": "input",
                    "placeholder": "",
                    "answer": "yooooo"
                }
            ],
            "type": "entry",
            "timestamp": 1658620369907
        }
    ]
}
```
