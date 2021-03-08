const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema

let UserSchema = Schema(

    {
        _id: { type: Schema.ObjectId, auto: true }, // Clave única generada automáticamente
        nombre: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rol: { type: String, enum: ['public', 'admin'], default: 'public' },
    },

    {
        timestamps: true, // Creará 2 campos para guardar la fecha de creación (createdAt) y última modificación
        versionKey: false
    }

)

UserSchema.pre('save', async next => {
    if (this.isModified('password') === false) {
        next()
    } else {
        const saltRounds = await bcrypt.getSalt(10)
        this.password = await bcrypt.hash(this.password, saltRounds)
        next()
    }
})


UserSchema.statics.comparePassword = async(password, receivedPassword) => {
        return await bcrypt.compare(password, receivedPassword)
    } // Nos permite comprobar si el pw del usuario coincide con el guardado en la BBDD

module.exports = mongoose.model('User', UserSchema)