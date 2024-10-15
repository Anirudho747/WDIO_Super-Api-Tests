import supertest from 'supertest';
import {expect} from 'chai';

const request = supertest('https://gorest.co.in/public/v2/');
const token = '4f81f3a9ca7260c6b6e99332ed79afcdf9961e11860d894c9778f37154224a26';

describe('Users',()=> {
    it('Get/users',()=> {
        request
               .get(`users?acess-token=${token}`).end((err,res)=>{
                expect(res.body).to.not.be.empty;
      //          console.log(res.body);
                console.log(err);
               })
    });

    it('Get/users negative flow',(done)=> {
        request
               .get(`users?acess-token=${token}`).end((err,res)=>{
                expect(res.body).to.be.empty;
                console.log(err);
                done();
               })
    });
});