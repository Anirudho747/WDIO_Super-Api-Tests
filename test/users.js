import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public/v2/');
const token = '4f81f3a9ca7260c6b6e99332ed79afcdf9961e11860d894c9778f37154224a26';
const id = 7472262;
const page = 3;
const gender = 'male';
const sttus = 'active';

describe.skip('Get',()=> {
    it('Get All users',()=> {
        request
               .get(`users?acess-token=${token}`).end((err,res)=>{
                expect(res.body).to.not.be.empty;
 //               console.log(res.body);
                console.log(err);
               })
    });

    it.skip('Get/users negative flow',(done)=> {
        request
               .get(`users?acess-token=${token}`).end((err,res)=>{
                expect(res.body).to.be.empty;
                console.log(err);
                done();
               })
    });
    
    it('Get 1 user as per ID',(done)=> {
        request
               .get(`users/${id}?acess-token=${token}`).end((err,res)=>{
                expect(res.body).not.to.be.empty;
                console.log(res.body);
                expect(res.body.id).to.be.eq(7472262);
                done();
               })
    });

    it('Get filtered users as per page,gender and status',(done)=> {
        request
               .get(`users?acess-token=${token}/page=${page}&gender=${gender}&status=${sttus}`).end((err,res)=>{
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                res.body.forEach((element) => {
                    expect(element.gender).to.eq('male');
                    expect(element.status).to.eq('active');
                });
                done();
               })
    });

    it('Negative test case for filters',(done)=> {
        //will filter for male but will apply filter for female
        request
               .get(`users?acess-token=${token}/page=${page}&gender=${gender}&status=${sttus}`).end((err,res)=>{
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                res.body.forEach((element) => {
                    expect(element.gender).to.eq('female');
                    expect(element.status).to.eq('active');
                });
                done();
               })
    });

});

describe.skip('post',()=>{
    const data = {
        //creating a email id with random number evrytime
        email: `tztz${Math.floor(Math.random()*9999)}@zeemail.com`,
        name: 'Tazer',
        gender: 'male',
        status: 'active'
    };
    it('Create new users',(done)=>{
        request
               .post(`users`).set("Authorization",`Bearer ${token}`).send(data)
               .end((err,res) => {
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                expect(res.body.email).to.be.eq(data.email);
                expect(res.body.status).to.be.eq(data.status);
                expect(res.body.gender).to.be.eq(data.gender);

                //Use deep include in Chai to verify all fields at once
                expect(res.body).to.be.deep.include(data);
                done();
               })
    })

    it('Negative test case for validating just created users',(done)=>{
        request
               .post(`users`).set("Authorization",`Bearer ${token}`).send(data)
               .end((err,res) => {
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                expect(res.body.email).to.be.eq(data.email);
                expect(res.body.status).to.be.eq(data.status);
                expect(res.body.gender).to.be.eq(data.gender);

                //Change data before verification to fail the test case
                data.email = 'tztz@zeemail.com';
                expect(res.body).to.be.deep.include(data);
                done();
               })
    })
})

describe('put',()=>{
    const data = {
        //creating a email id with random number evrytime
        name: `loffy-${Math.floor(Math.random()*9999)}`,
        status: 'active'
    };
    it('Update users',(done)=>{
        request
               .put(`users/7473144`).set("Authorization",`Bearer ${token}`).send(data)
               .end((err,res) => {
                expect(res.body).to.not.be.empty;
                console.log(res.body);
                expect(res.body.name).to.be.eq(data.name);
                expect(res.body.status).to.be.eq(data.status);

                //Use deep include in Chai to verify all fields at once
                expect(res.body).to.be.deep.include(data);
                done();
               })
    })
})