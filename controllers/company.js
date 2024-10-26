import Company from '../models/company.js';

export default async function uploadCompanyData(req, res) {
    let company = Company.findOne({ name: req.body.name })
    if (company) return res.status(400).send('Company already exists');

    company = new Company({
        name: req.body.name,
        description: req.body.description,
        website_url: req.body.website_url
    })

    company.save()
        .then((resp) => { return res.status(200).send("Company profile created")} )
        .catch((err) => { return res.status(400).send("Company profile could not be saved")} )
}