
import mongoose from 'mongoose'




const Schema = new mongoose.Schema
    ({
        fullName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        uniqueName: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        profilePicture: {
            type: String,
            require: true,
            default: "https://imgs.search.brave.com/GVcDP9cX1YLhjAXS0-gIVZzpPpmCYLlsOHfwIOt7VfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA"
        }
    }, { timestamps: true })

const Data = mongoose.model("users", Schema)
export default Data

//..........................LOGIN.........................................................
