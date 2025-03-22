import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Name is required"],
        trim: true,
        maxLength: [100, "Name can not exceed 100 characters"],
        
        minLength: [2, 'Name must be at least 2 characters']
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min:[0,'Price must be at least 0'],

    },
    currency:{
        type: String,
        required: [true, 'Currency is required'],
        enum: ['USD','EUR','BDT'],
        default: 'USD'
    },
    frequency:{
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
        required: [true, 'Frequency is required']

    },
    category:{
        type: String,
        enum: ['business','entertainment','general','health','science','sports','technology'],
        required: [true, 'Category is required']
    },
    status:{
        type: String,
        enum: ["active", "cancelled","expired"],
        default: "active"
    },
    paymenMethod:{
        type: String,
        enum: ['credit card','paypal','stripe'],
        required: [true, 'Payment Method is required'],
        trim: true,
    },
    startDate:{
        type: Date,
        required: [true, 'Start Date is required'],
        validate:{
            validator: (v) => v <= new Date(),
            message: 'Start Date must be a past date'
        },
        default: Date.now

        },
    renewalDate:{
        type: Date,
        validate:{
            validator: function(v) {
                return v >= this.startDate;
            },
            message: 'Renewal Date must be greater than Start Date'
        },

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true,
    }
       
}, {timestamps: true});

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriod = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        }
        const startDate = new Date(this.startDate);
        const frequency = this.frequency;
        this.renewalDate = new Date(startDate)
        this.renewalDate.setDate(startDate.getDate() + renewalPeriod[frequency])
    };

    if(this.renewalDate < new Date()){
        this.status = 'expired'
    }
    next();
})

const Subscription = mongoose.model('Subscription',subscriptionSchema);
export default Subscription;
//  Now, let’s create a new file called  subscription.controller.js  in the  controllers  folder and add the following code to it.
