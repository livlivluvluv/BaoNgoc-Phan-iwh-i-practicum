const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'process.env.HUBSPOT_ACCESS_TOKEN';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// app.get('/",async(req,res)=>{
const HUBSPOT_API_URL='https://api.hubapi.com/crm/v3/objects/pets';
const HEADERS = {
        headers: {
            Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
            'Content-Type': 'application/json'
        }
    };
try {
        const response = await axios.get(HUBSPOT_API_URL, HEADERS);
        res.render('homepage', { title: "Custom Object List", records: response.data.results });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.send("Error loading data");
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: "Update Custom Object Form" });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// app.post('/update-cobj', async (req, res) => {
    const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/pets';
    const HEADERS = {
        headers: {
            Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        await axios.post(HUBSPOT_API_URL, {
            properties: {
                name: req.body.name,
                bio: req.body.bio,
                category: req.body.category
            }
        }, HEADERS);

        res.redirect('/');
    } catch (error) {
        console.error("Error submitting data:", error);
        res.send("Error submitting data");
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
