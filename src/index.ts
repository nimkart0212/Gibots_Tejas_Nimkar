import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariable } from './environments/env';
import Student from './model/student';

let app:express.Application=express(); //express()--> Calling constructor of express 
let port =3000;
let mongoDBUrl='mongodb+srv://nimkart_0212:rVf1hkOPKi9iwQ0A@mongodbtest.xedzf.mongodb.net/MongodbTest?retryWrites=true&w=majority';

let stu=[];
let studentData=[
        [{
            "Name":"Ajinkya",
            "Age":"25",
            "Marks":"80"
        },
        {
            "Name":"Krishna",
            "Age":"23",
            "Marks":"90"
        }],
        [{
            "Name":"Ananta",
            "Age":"28",
            "Marks":"100"
        },
        {
            "Name":"Pruthvi",
            "Age":"24",
            "Marks":"120"
        }]
    ]

/*Start Server */
app.listen(port,()=>{
    console.log("Server running at 3000");
});

/*Connection between Server and MongoDB */
mongoose.connect(getEnvironmentVariable().db_url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("MongoDB is connected");
}).catch((error)=>{
    console.log(error);
});

function sorting(){
    studentData.map((stddata)=>{
        if(Array.isArray(stddata)){
                stddata.map((interstu)=>{
                stu.push(interstu);                
            })
        }
        else{
            stu.push(stddata);
        }
    });
}

app.post('/api/adddata',(req,res)=>{
    sorting();
    stu.map((stud)=>{
        const student= new Student(stud)
        student.save().then().catch((error)=>{
            res.send(error);
    })
    });

})

app.get('/api/ascending',(req,res)=>{
    let temp;
    sorting();
    for(let i=0; i<stu.length;i++){
        for(let j=i;j<stu.length;j++){
            if(parseInt(stu[i].Marks) > parseInt(stu[j].Marks)){
                temp=stu[i];
                stu[i]=stu[j];
                stu[j]=temp
            }
        }
    }
    //console.log(stu)
    res.send(stu);
})

app.get('/api/sumofallmarks',(req,res)=>{
    let sum=0;
    sorting();
    stu.map((stuMark)=>{
        sum +=parseInt(stuMark.Marks) 
    })
    res.send("Sum of all Marks:- "+sum.toString());
})