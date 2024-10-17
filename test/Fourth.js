import {expect} from "chai";
import supertest from "supertest";
import qa from '../config/qa.js'
const request = supertest(qa.baseUrl);
import {giveRandomMessageForBeforeHook,
        giveRandomMessageForAfterHook,
        giveRandomMessageForBeforeEachHook,
        giveRandomMessageForAfterEachHook} from '../test/helper/user_helper.js'
let rm,rm2,rm3,rm4,token;
import dotenv from 'dotenv';

/*
copied from proj, this is how its handled in real time
if (process.env.NODE_ENV === 'staging') {
    dotenv.config({ path: '../.env.staging' });
 } else if (process.env.NODE_ENV === 'dev'){
    dotenv.config({ path: '../.env.dev' });
 } else{
    dotenv.config({ path: '../.env.prod' });
 }
 */

before(async()=>{

    rm = await giveRandomMessageForBeforeHook();
    console.log(rm);

});

after(async()=>{

    rm2 = await giveRandomMessageForAfterHook();
    console.log(rm2);
});

beforeEach(async()=>{

    rm3 = await giveRandomMessageForBeforeEachHook();
    console.log(rm3);

});

afterEach(async()=>{

    rm4 = await giveRandomMessageForAfterEachHook();
    console.log(rm4);
});

token = process.env.USER_TOKEN;

describe('Using async and await',()=>
{
  
    let userId;
    const data = {
        //creating a email id with random number evrytime
        email: `Lsr${Math.floor(Math.random()*9999)}@Lasermail.com`,
        name: 'Laser',
        gender: 'male',
        status: 'active'
    };  
    const data2 = {
        //creating a email id with random number evrytime
        name: `loffy-${Math.floor(Math.random()*9999)}`,
        status: 'inactive'
    };

    it('Post Operation',async()=>
    {
        const res = await request.post('/users').
        set("Authorization",`Bearer ${token}`).
        send(data);
        
        expect (res.body).to.be.deep.include(data);
        userId = res.body.id;
        console.log(userId);
    })

    it('Get the newly Created User',async()=>
    {
        console.log(userId);
        const res = await request.
                    get(`users/${userId}`).set("Authorization",`Bearer ${token}`);
                
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.be.deep.include(data);
                    expect(res.body.id).to.be.eq(userId);
    })

    it('Update the new User',async()=>
    {
        console.log(userId);
        const res =  await request.
                     put(`users/${userId}`).set("Authorization",`Bearer ${token}`).send(data2);
               
                     expect(res.body).to.not.be.empty;
                     console.log(res.body);
                     expect(res.body.name).to.be.eq(data2.name);
                     expect(res.body.status).to.be.eq(data2.status);

                     //Use deep include in Chai to verify all fields at once
                    expect(res.body).to.be.deep.include(data2);
    });

    it('delete Users',async()=>{
        const res = await request
                   .delete(`users/${userId}`).set("Authorization",`Bearer ${token}`);
              
                    expect(res.body).to.be.empty;
                    console.log(res.body);
    })
})

describe.only('Negative Scenarios',()=>{

    const data3 = {
        //creating a email id with random number evrytime
        email: `Lsr${Math.floor(Math.random()*9999)}@Lasermail.com`,
        name: 'fekchand',
        gender: 'male',
        status: 'active'
    }; 

    const data4 = {
        //creating a email id with random number evrytime
        email: `Lsrmail.com`,
        name: 'nekchand',
        gender: 'male',
        status: 'active'
    }; 

    it('401 Authentication Failed',async()=>{
        const res = await request.post('/users').
        send(data3);
        
    console.log(data3);    
    console.log(data4);    
    console.log(res.text);
    console.log(res.statusCode);

    expect(res.statusCode).to.eq(401);
    expect(res.text).to.eq('{"message":"Authentication failed"}');

    })

    it('422 Invalid Params',async()=>{
        const res = await request.post('/users').
        set("Authorization",`Bearer ${token}`).
        send(data4);
        
    // console.log(res.text);
    console.log(res.statusCode);

    expect(res.statusCode).to.eq(422);
    expect(res.text).to.eq('[{"field":"email","message":"is invalid"}]');

    })

    it('404 Resource does not Exist',async()=>{
        const res = await request.post('/use').
        set("Authorization",`Bearer ${token}`).
        send(data4);
        
    // console.log(res.text);
    console.log(res.statusCode);

    expect(res.statusCode).to.eq(404);
    })
})