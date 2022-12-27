const mongoose = require('mongoose');
const { exists } = require('./User');
const User = require('./User');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost/ods",
()=>{
    console.log('Connected');
}
);

async function main(){
    try{
        const user = new User({
            name: "Mukul Bindal",
            age: 24,
            email: 'bidaAJHK@gail.com',
            address: {
                street: '1320 RLN main',
                city: 'Kanpur'
            },
            hobbies: ['eat', 'code', 'sleep']
        });
        user.friend = "63a155a7dc40f8e366c9ae1c";
        
        await user.save();
        console.log(user);
        console.log(await User.count());
    } catch(e){
        console.log(e.message);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected')
    }
}

async function test(){
    console.log('------------------------------')
    try{
        // const user = await User.deleteOne({
        //     name: 'MUKUL'
        // });
        //const user = await User.where('age').gte(24).populate('friend').limit(1);
        //user[0].say();
        const user = await User.findById('63a15978d905186fd27e9c47');
        await user.save();
        console.log(user);
        console.log(await User.count());
    } catch(e){
        console.log(e.message);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected')
    }
    console.log('------------------------------')
}
//main();
test();