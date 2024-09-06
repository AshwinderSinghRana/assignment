import mongoose from "mongoose"

const userModel = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    gender: { type:  Number, enum:[0,1,2]},     //0-male,1-female,2-other
    martialStatus: { type: Number, enum:[0,1] },  //0-not married, 1-for married
    spouse: { type: String, default: "" },
    address: { type: String, default: "" },
    image: { type: String, default: "" },
    pdfFile: [{ type: String, default: "" }],
    mobile: { type: Number, default: 0 },
    password: { type: String, default: "" },
    token: { type: String, default: "" },
    loginTime: { type: Number, default: 0 },
})

const userSchema = mongoose.model("user", userModel)

export default userSchema