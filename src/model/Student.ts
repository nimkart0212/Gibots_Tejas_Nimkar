import * as mongoose from 'mongoose';
import {model} from'mongoose';

const studentSchema=new mongoose.Schema({
    Name:{type: String, required:true},
    Age:{type:Number, required:true},
    Marks:{type:Number,required:true}
})

export default model('student',studentSchema);