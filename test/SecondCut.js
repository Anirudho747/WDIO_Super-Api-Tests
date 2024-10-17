import supertest from "supertest"
import {expect} from "chai";

const request = supertest('https://gorest.co.in/public/v2/');
const token = '4f81f3a9ca7260c6b6e99332ed79afcdf9961e11860d894c9778f37154224a26';

describe.skip('All in One CRUD Ops',()=>{

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

    it('Create a New User',(done)=>{
        request.post('/users').set("Authorization",`Bearer ${token}`).send(data)
        .end((err,res)=>{
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                expect(res.body.email).to.be.eq(data.email);
                expect(res.body.status).to.be.eq(data.status);
                expect(res.body.gender).to.be.eq(data.gender);

                expect (res.body).to.be.deep.include(data);
                userId = res.body.id;
                console.log(userId);
                done();
        })
    });

    it('Fetch the newly Created User',(done)=>{
        console.log(userId);
        request.
                get(`users/${userId}`).set("Authorization",`Bearer ${token}`).
                end((err,res)=>{
                    expect(res.body).not.to.be.empty;
                    // console.log(res.body);
                    expect(res.body).to.be.deep.include(data);
                    expect(res.body.id).to.be.eq(userId);
                    done();
                })
    })

    it('Update the new User',(done)=>{
        console.log(userId);
        request.
               put(`users/${userId}`).set("Authorization",`Bearer ${token}`).send(data2).
               end((err,res) => {
               expect(res.body).to.not.be.empty;
               console.log(res.body);
               expect(res.body.name).to.be.eq(data2.name);
               expect(res.body.status).to.be.eq(data2.status);

                //Use deep include in Chai to verify all fields at once
                expect(res.body).to.be.deep.include(data2);
                done();      
        })
    });

    it('delete Users',(done)=>{
        request
               .delete(`users/${userId}`).set("Authorization",`Bearer ${token}`)
               .end((err,res)=>{
                expect(res.body).to.be.empty;
                console.log(res.body);
                done();
               })
    })

    it('Check if user deleted',(done)=> {
        console.log(userId);
        let msg = "{ message: 'Resource not found' }";
        request.
                get(`users/${userId}`).set("Authorization",`Bearer ${token}`).
                end((err,res)=>{
                     expect(res.body).not.to.be.empty;
                     console.log(res.body);
                 //   expect(res.body).to.be.deep.include(data);
                 //    expect(res.body).to.be.include(msg);
                    done();
                })
    });

});