import userModel from "../model/userModel.js"
import { imageUpload, pdfFileUpload } from "../utilis/helperFile.js"
import jwtTokenSign from "../utilis/jwtToken.js"
import bycrypt from "bcrypt"
const saltRound = 10

const signUp = async (req, res) => {
    try {
        const validationU = await userModel.findOne({ email: req.body.email })
        if (validationU !== null) {
            return res.json({
                success: false,
                status: 400,
                message: "Email already exist",
                body: {}
            })
        } else {
            let imagee, pdfFilePaths = [];
           
            if (req.files && req.files.image) {
                imagee = imageUpload(req.files.image, "userImages");
            }

            const pdfFiles = req.files.pdfFile;
            if (Array.isArray(pdfFiles)) {
                pdfFilePaths = pdfFiles.map(file => pdfFileUpload(file, "userDocuments"));
            } else {
                pdfFilePaths.push(pdfFileUpload(pdfFiles, "userDocuments"));
            }

            const passwordEncrypt = await bycrypt.hash(req.body.password, saltRound)
            const data = await userModel.create({ ...req.body, password: passwordEncrypt, image: imagee, pdfFile: pdfFilePaths })
            const tokenData = await jwtTokenSign({ _id: data._id })
            data.token = tokenData.token
            data.loginTime = tokenData.decoded.iat
            return res.json({
                success: true,
                status: 200,
                message: "User created succesfully",
                body: data
            })
        }
    } catch (error) {
        console.log(error, "error")
        return res.json({
            success: false,
            status: 400,
            message: error,
            body: {}
        })
    }
}

const login = async (req, res) => {
    try {
        const findEmail = await userModel.findOne({ email: req.body.email })
        if (findEmail == null) {
            return res.json({
                success: false,
                status: 400,
                message: "Email is not valid",
                body: {}
            })
        } else {
            const passwordVerify = await bycrypt.compare(req.body.password, findEmail.password)
            if (passwordVerify == false) {
                return res.json({
                    success: false,
                    status: 400,
                    message: "Password is not correct",
                    body: {}
                })
            } else {
                const data = await userModel.findOne({ email: req.body.email })
                const tokenUpdate = await jwtTokenSign(data._id)
                data.token = tokenUpdate.token
                data.loginTime = tokenUpdate.decoded.iat
                return res.json({
                    success: true,
                    status: 200,
                    message: `Hello ${data?.name} ! Login successfully`,
                    body: data
                })
            }
        }
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

const userProfile = async (req, res) => {
    try {
        const data = await userModel.findById({ _id: req.params.id })

        const imageUrl = `http://${req.headers.host}/images/userImages/${data.image}`;

        const pdfFileUrls = data.pdfFile.map(file => `http://${req.headers.host}/userDocuments/${file}`);
        return res.json({
            success: true,
            status: 200,
            message: `Here is ${data?.name}profile`,
            body: {
                ...data.toObject(),
                image: imageUrl,
                pdfFile: pdfFileUrls,
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            status: 400,
            message: "error",
            body: {}
        })
    }
}

export default { signUp, login, userProfile }