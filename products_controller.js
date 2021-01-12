/*
When adding parameters to sql, all you have to do is pass in an array as the first argument and then the element(s) 
in the array map to $1, $2, etc... For example: dbInstance.create_product([ name, description, price, image_url ]), 
name is $1, description is $2, price is $3, and image_url is $4. Remember, if you have only one argument, you do not need to pass it in an array.
*/

module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {name, description, price, image_url} = req.body;
        dbInstance.create_product([name, description, price, image_url])
        .then(() => res.sendStatus(200))
        .catch(err => {res.status(500).send({errMessage: 'Something went wrong'})
            console.log(err)})
    },
    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {id} = req.body;
        dbInstance.read_product(id)
        .then(product => res.status(200).send(product))
        .catch(err => {res.status(500).send({errMessage: 'Something went wrong'})
            console.log(err)})
    },
    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db');
        dbInstance.read_products()
        .then(products => res.status(200).send(products))
        .catch(err => {res.status(500).send({errMessage: 'Something went wrong'})
            console.log(err)})
    },
    update: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {params, query} = req.body;
        dbInstance.update_product([params.id, query.desc])
        .then(() => res.sendStatus(200))
        .catch(err => {res.status(500).send({errMessage: 'Something went wrong'})
            console.log(err)})
    },
    delete: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {id} = req.body;
        dbInstance.delete_product(id)
        .then(() => res.sendStatus(200))
        .catch(err => {res.status(500).send({errMessage: 'Something went wrong'})
            console.log(err)})
    }
}