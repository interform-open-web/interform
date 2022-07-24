# API

## Routes
### Forms
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

### Entries
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
