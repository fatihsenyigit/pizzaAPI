
const {mongoose} = require('../configs/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt')

const ToppingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: true,
        }
},{
   collection: 'toppings', timestamps: true 
})

module.export = mongoose.model('Topping', ToppingSchema)
